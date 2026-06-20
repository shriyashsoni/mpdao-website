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

variants.forEach(variant => {
  let modified = svgContent;
  
  // Replace fill color
  modified = modified.replace(/fill="#000000"/g, `fill="${variant.fill}"`);
  
  // Add background rect if specified
  if (variant.bg) {
    const rectTag = `\n<rect width="576" height="576" fill="${variant.bg}"/>`;
    // Insert after the open <svg> tag
    modified = modified.replace(/(<svg[^>]*>)/, `$1${rectTag}`);
  }
  
  const destPath = path.join(destDir, variant.name);
  fs.writeFileSync(destPath, modified, 'utf8');
  console.log(`Generated: ${variant.name}`);
});
