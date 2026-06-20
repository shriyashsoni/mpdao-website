const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'mp-dao-logo.svg');
const destDir = __dirname;

if (!fs.existsSync(srcPath)) {
  console.error("Source file not found at " + srcPath);
  process.exit(1);
}

const svgContent = fs.readFileSync(srcPath, 'utf8');

const variants = [
  { name: 'mpdao-logo-black.svg', fill: '#000000', bg: null },
  { name: 'mpdao-logo-white.svg', fill: '#FFFFFF', bg: null },
  { name: 'mpdao-logo-green.svg', fill: '#10B981', bg: null },
  { name: 'mpdao-logo-red.svg', fill: '#EF4444', bg: null },
  { name: 'mpdao-logo-yellow.svg', fill: '#F59E0B', bg: null },
  { name: 'mpdao-logo-purple.svg', fill: '#8B5CF6', bg: null },
  { name: 'mpdao-logo-white-on-black.svg', fill: '#FFFFFF', bg: '#000000' },
  { name: 'mpdao-logo-black-on-white.svg', fill: '#000000', bg: '#FFFFFF' }
];

// Bounding box of the outline text letters:
// min_x: 78.8, max_x: 514.0 (width: 435.2)
// min_y: 217.0, max_y: 329.2 (height: 112.2)
// We will crop viewBox to "78 216 438 115" for a clean outline vector crop.

variants.forEach(variant => {
  // Build new SVG header with cropped viewBox
  let modified = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n` +
                 ` width="438.000000" height="115.000000" viewBox="78 216 438 115"\n` +
                 ` preserveAspectRatio="xMidYMid meet">\n`;
                 
  if (variant.bg) {
    modified += `  <rect x="78" y="216" width="438" height="115" fill="${variant.bg}"/>\n`;
  }
  
  // Extract the inner group <g transform="..." fill="..." stroke="...">
  const gIndex = svgContent.indexOf('<g transform="');
  if (gIndex !== -1) {
    let gContent = svgContent.substring(gIndex);
    
    // Replace the default fill color of the group
    gContent = gContent.replace(/fill="#000000"/, `fill="${variant.fill}"`);
    
    modified += `  ${gContent}`;
  } else {
    console.error("Failed to find group tag in source SVG");
    return;
  }
  
  const destPath = path.join(destDir, variant.name);
  fs.writeFileSync(destPath, modified, 'utf8');
  console.log(`Generated cropped outline logo: ${variant.name}`);
});
