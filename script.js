// Force dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const hamburgerIcon = hamburger.querySelector('i');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  if (navLinks.classList.contains('show')) {
    hamburgerIcon.classList.remove('fa-bars');
    hamburgerIcon.classList.add('fa-times');
  } else {
    hamburgerIcon.classList.remove('fa-times');
    hamburgerIcon.classList.add('fa-bars');
  }
});

// Close menu when a link is clicked
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    hamburgerIcon.classList.remove('fa-times');
    hamburgerIcon.classList.add('fa-bars');
  });
});

// Scroll Animations using Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing once it has become visible
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// Form submit handling (Connecting to Node.js backend)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Grab the button to show a loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('https://formsubmit.co/ajax/alulamuzey20@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
            name: name,
            email: email, 
            message: message,
            _subject: "New Portfolio Message from " + name 
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for reaching out! Your message was sent successfully.');
        contactForm.reset();
      } else {
        alert('Oops, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Unable to connect to the server. Please check if the backend is running.');
    } finally {
      // Revert button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a.smooth-scroll, .nav-links a, .logo').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    
    // Only apply smooth scroll if it's an internal on-page hash link
    if(targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if(targetElement) {
        // Offset for fixed navbar height
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active link highlighting based on scroll
const sections = document.querySelectorAll('section, header');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', function() {
    // Open the PDF directly using window.open (works cleanly with spaces in local servers)
    const link = document.createElement('a');
    link.href = './assets/cv.pdf';
    link.download = 'Alula_Muzey_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
// Certificates Slider Logic
const track = document.getElementById('cert-slider');
const prevBtn = document.getElementById('cert-prev');
const nextBtn = document.getElementById('cert-next');
const dotsContainer = document.getElementById('cert-dots');

if (track && prevBtn && nextBtn && dotsContainer) {
  const items = Array.from(track.children);
  let currentIndex = 0;

  // Create dots
  items.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - 1; // loop back
    }
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back
    }
    updateSlider();
  });

  // Optional: Auto slide
  // setInterval(() => {
  //   nextBtn.click();
  // }, 5000);
}