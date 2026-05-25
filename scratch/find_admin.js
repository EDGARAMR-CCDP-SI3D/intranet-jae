const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'web-app', 'src', 'App.jsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('function SuperAdminModule')) {
    console.log(`SuperAdminModule defined at line: ${idx + 1}`);
  }
});
