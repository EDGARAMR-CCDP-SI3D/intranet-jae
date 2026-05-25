const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'web-app', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements mapping
const replacements = [
  { search: /#c5a880/g, replace: '#1E3A8A' }, // Soft gold -> Deep Corporate Blue
  { search: /#b59870/g, replace: '#1E40AF' }, // Hover gold -> Hover Blue
  { search: /#A98446/g, replace: '#2563EB' }, // Dark gold -> Vibrant Accent Blue
  { search: /Aeternum Premium/g, replace: 'Aeternum Corporativo' },
  { search: /bg-[#c5a880]/g, replace: 'bg-[#1E3A8A]' },
  { search: /text-[#c5a880]/g, replace: 'text-[#2563EB]' },
  { search: /border-[#c5a880]/g, replace: 'border-[#1E3A8A]' },
  { search: /shadow-[#c5a880]/g, replace: 'shadow-[#1E3A8A]' },
  { search: /selection:text-\[#5a4a35\]/g, replace: 'selection:text-white' },
];

let updatedContent = content;
for (const item of replacements) {
  updatedContent = updatedContent.replace(item.search, item.replace);
}

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Rebrand colors updated successfully inside App.jsx!');
