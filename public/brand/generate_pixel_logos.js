const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'mpdao-logo.svg');
const destDir = __dirname;

if (!fs.existsSync(srcPath)) {
  console.error("Source file not found at " + srcPath);
  process.exit(1);
}

const svgContent = fs.readFileSync(srcPath, 'utf8');

const variants = [
  { name: 'mpdao-logo-pixel-black.svg', fill: '#000000', bg: null },
  { name: 'mpdao-logo-pixel-white.svg', fill: '#FFFFFF', bg: null },
  { name: 'mpdao-logo-pixel-green.svg', fill: '#10B981', bg: null },
  { name: 'mpdao-logo-pixel-red.svg', fill: '#EF4444', bg: null },
  { name: 'mpdao-logo-pixel-yellow.svg', fill: '#F59E0B', bg: null },
  { name: 'mpdao-logo-pixel-purple.svg', fill: '#8B5CF6', bg: null },
  { name: 'mpdao-logo-pixel-white-on-black.svg', fill: '#FFFFFF', bg: '#000000' },
  { name: 'mpdao-logo-pixel-black-on-white.svg', fill: '#000000', bg: '#FFFFFF' }
];

variants.forEach(variant => {
  // Crop viewBox to fit content exactly (x=30, y=48, width=428, height=160)
  let modified = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 48 428 160" width="428" height="160">\n`;
  
  if (variant.bg) {
    modified += `  <rect x="30" y="48" width="428" height="160" fill="${variant.bg}"/>\n`;
  }
  
  // Extract paths from original
  const gStartIndex = svgContent.indexOf('<g fill="white">');
  if (gStartIndex !== -1) {
    let gContent = svgContent.substring(gStartIndex);
    // Replace <g fill="white"> with the variant fill color
    gContent = gContent.replace('<g fill="white">', `<g fill="${variant.fill}">`);
    modified += `  ${gContent}`;
  } else {
    console.error("Failed to parse <g fill=\"white\"> from source svg");
    return;
  }
  
  const destPath = path.join(destDir, variant.name);
  fs.writeFileSync(destPath, modified, 'utf8');
  console.log(`Generated cropped pixel logo: ${variant.name}`);
});
