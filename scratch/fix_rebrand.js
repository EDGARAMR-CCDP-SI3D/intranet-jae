const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'web-app', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// String replacement is exact and robust
content = content.replaceAll('text-[#2563EB]enter', 'text-center');
content = content.replaceAll('lg:text-[#2563EB]xl', 'lg:text-5xl');
content = content.replaceAll('text-[#2563EB]mber-500', 'text-amber-500');
content = content.replaceAll('bg-[#1E3A8A]mber-50', 'bg-amber-50');
content = content.replaceAll('text-[#2563EB]mber-600', 'text-amber-600');
content = content.replaceAll('border-[#1E3A8A]mber-100', 'border-amber-100');
content = content.replaceAll('text-[#2563EB]mber-650', 'text-amber-650');

fs.writeFileSync(filePath, content, 'utf8');
console.log('App.jsx exact string typos fixed!');
