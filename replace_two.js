const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Stronger gold colors
css = css.replace(/--primary: #d4af37;/g, '--primary: #d19a00;'); 
// The user asked for golden colors to be a bit strong, we'll try something more vibrant
css = css.replace(/--secondary: #b8860b;/g, '--secondary: #b08000;');
css = css.replace(/--secondary-accent: #b8860b;/g, '--secondary-accent: #b08000;');

// Strong white background
css = css.replace(/--bg-color: #f3f3f3;/g, '--bg-color: #ffffff;');
css = css.replace(/--nav-bg: rgba\(243, 243, 243, 0.85\);/g, '--nav-bg: rgba(255, 255, 255, 0.85);');

// Use stronger gold for the form / project card backgrounds
css = css.replace(/--img-bg: #fdf8e8;/g, '--img-bg: transparent;'); // User wants their own backgrounds for pictures
css = css.replace(/--input-bg: #fdf8e8;/g, '--input-bg: #fbeaba;'); // Stronger gold background

// Fix project background color
css = css.replace(/\[data-theme="light"\] .project-card,\n.light-mode .project-card {\n  background-color: var\(--input-bg\);\n}/g, 
`[data-theme="light"] .project-card,
.light-mode .project-card {
  background-color: var(--input-bg);
}
[data-theme="light"] .project-img,
.light-mode .project-img {
  background: transparent;
}`);

fs.writeFileSync('style.css', css);
