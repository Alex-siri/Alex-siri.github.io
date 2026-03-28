const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/--secondary-accent: #1e3a5f;/g, '--secondary-accent: #b8860b;');
css = css.replace(/--img-bg: #0d1e38;/g, '--img-bg: #fdf8e8;');
css = css.replace(/--input-bg: #1a2a45;/g, '--input-bg: #fdf8e8;');
css = css.replace(/--shadow: 0 4px 15px rgba\(0, 0, 0, 0.3\);/g, '--shadow: 0 4px 15px rgba(212, 175, 55, 0.15);');
css = css.replace(/--btn-primary-text: #ffffff;/g, '--btn-primary-text: #1a1a1a;');
css = css.replace(/--hover-shadow: rgba\(30, 58, 95, 0.4\);/g, '--hover-shadow: rgba(212, 175, 55, 0.4);');
css = css.replace(/--badge-bg: rgba\(30, 58, 95, 0.2\);/g, '--badge-bg: rgba(212, 175, 55, 0.15);');
css = css.replace(/--img-gradient-start: rgba\(30, 58, 95, 0.3\);/g, '--img-gradient-start: rgba(212, 175, 55, 0.3);');
css = css.replace(/--img-gradient-end: rgba\(30, 58, 95, 0.1\);/g, '--img-gradient-end: rgba(212, 175, 55, 0.05);');

fs.writeFileSync('style.css', css);
