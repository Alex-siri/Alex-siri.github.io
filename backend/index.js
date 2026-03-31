const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse incoming JSON payloads

// Email Transporter Config
// NOTE: For Gmail, you will likely need an "App Password" to allow Node to successfully send emails.
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'alulamuzey@gmail.com', // Your Gmail address
        pass: 'oahwrvrqgdwloggq' // Your generated App Password (spaces removed)
    }
});

// POST Route for Contact Form
app.post('/contact', async (req, res) => {
    // Extract data from the request body
    const { name, email, message } = req.body;

    // Validate the incoming data (basic defense)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Log the data in the console 
    console.log('\n--- New Contact Form Submission ---');
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------------\n');

    try {
        // Send email to yourself
        const mailOptions = {
            from: 'alulamuzey@gmail.com',
            to: 'alulamuzey@gmail.com',
            subject: `Portfolio Contact Form: New message from ${name}`,
            text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            replyTo: email // Allows you to hit "Reply" directly to the person who sent the message
        };

        await transporter.sendMail(mailOptions);

        // Send a JSON success response back to the frontend
        res.status(200).json({ 
            success: true, 
            message: 'Message received and email sent successfully!' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Check configuration.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
