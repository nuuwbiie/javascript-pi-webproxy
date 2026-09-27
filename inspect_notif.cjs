const fs = require('fs');

const svg = fs.readFileSync('user_notification.svg', 'utf8');

// Rects
const rects = [...svg.matchAll(/<rect([^>]+)>/g)].map(m => m[1]);
console.log('Total rects:', rects.length);
rects.forEach((r, i) => console.log(`Rect ${i}: ${r.trim()}`));

// Circles
const circles = [...svg.matchAll(/<circle([^>]+)>/g)].map(m => m[1]);
console.log('Total circles:', circles.length);

// What paths are text? Let's check d paths near specific y-coords
// Let's list all elements in order
const tags = [...svg.matchAll(/<([a-z0-9]+)(\s[^>]*?)?(\/?>)/gi)];
console.log('Tags summary:');
tags.forEach((t, i) => {
  const name = t[1];
  const attrs = (t[2] || '').replace(/\s+/g, ' ').trim();
  if (['rect', 'circle', 'line', 'path'].includes(name)) {
    if (name === 'path') {
      const fill = attrs.match(/fill="([^"]+)"/);
      const stroke = attrs.match(/stroke="([^"]+)"/);
      const d = attrs.match(/d="([^"]+)"/);
      console.log(`Tag ${i}: <path fill="${fill ? fill[1] : ''}" stroke="${stroke ? stroke[1] : ''}" d="${d ? d[1].slice(0, 30) : ''}...">`);
    } else {
      console.log(`Tag ${i}: <${name} ${attrs}>`);
    }
  }
});
