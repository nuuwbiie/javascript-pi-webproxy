const fs = require('fs');

const svg = fs.readFileSync('user_notification.svg', 'utf8');

// Let's print the texts decoded or paths with character estimates
// In Tag 39: d="M122.691 118.547H119.439V121.377H122.445V122.32H119.439V126H118.373V117.598H122.691V118.547Z..." -> starts with 'F' or 'Wi-Fi'?
// Wait, Tag 39 has:
// "M122.691 118.547H119.439V121.377H122.445V122.32H119.439V126H118.373V117.598H122.691V118.547Z"
// That's an 'F' or 'E'! Let's check:
// Height ~8.4, from 117.6 to 126.
// Let's decode what words are in Tag 39, Tag 33, Tag 27, Tag 23, Tag 14, Tag 19!
console.log('Path 39 preview:', svg.match(/<path[^>]+M122\.691[^>]+>/)?.[0].slice(0, 300));
