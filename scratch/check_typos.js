const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'web-app', 'src', 'App.jsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('text-[#2563EB]')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
