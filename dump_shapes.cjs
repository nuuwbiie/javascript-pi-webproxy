const fs = require('fs');

const svg = fs.readFileSync('user_notification.svg', 'utf8');

// Print all elements inside the main <g data-figma-bg-blur-radius="60"> and beyond
const matches = [...svg.matchAll(/<(rect|path|line)[^>]*>/g)].map(m => m[0]);
console.log('Total SVG shapes:', matches.length);
matches.forEach((s, i) => console.log(`${i}: ${s}`));
