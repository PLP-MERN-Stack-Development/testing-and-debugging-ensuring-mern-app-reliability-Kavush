const fs = require('fs');
const path = require('path');

console.log('📁 Current Project Structure:');
console.log('================================');

function scanDir(dir, indent = '') {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    if (item === 'node_modules') return; // Skip node_modules
    
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${item}/`);
      scanDir(fullPath, indent + '  ');
    } else {
      console.log(`${indent}📄 ${item}`);
    }
  });
}

// Start scanning from the server root
const rootDir = __dirname;
scanDir(rootDir);

console.log('\n🔍 Looking for route files...');
const possibleRoutesPaths = [
  './routes',
  './src/routes', 
  '../routes',
  './server/routes'
];

possibleRoutesPaths.forEach(routePath => {
  const fullPath = path.resolve(__dirname, routePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${routePath} -> ${fullPath}`);
});