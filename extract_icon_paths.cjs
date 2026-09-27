const fs = require('fs');

const svg = fs.readFileSync('user_notification.svg', 'utf8');

function extractPath(pattern) {
  const m = svg.match(new RegExp(`<path[^>]+d="(${pattern}[^"]*)"[^>]*>`, 'i'));
  return m ? m[1] : null;
}

console.log('Extracting icon paths...');
const icons = {
  wifi: extractPath('M108 76'),
  bluetooth: extractPath('M217 82\\.1016'),
  airplane: extractPath('M351\\.109 87\\.7578'),
  batterySaver: extractPath('M126\\.5 182'),
  nightLight: extractPath('M237\\.273 181\\.195'),
  accessibility: extractPath('M349 173\\.008'),
  volume: extractPath('M97 287\\.242'),
  brightness: extractPath('M92\\.5 330\\.5'),
  gear: extractPath('M391\\.695 405\\.789'),
  pencil: extractPath('M362\\.945 395\\.57'),
  batteryTray: extractPath('M101 401\\.5'),
  chevronSmall: extractPath('M363\\.75 181\\.125'),
};

for (const [k, v] of Object.entries(icons)) {
  console.log(k, 'found:', !!v, v ? v.slice(0, 40) + '...' : '');
}

fs.writeFileSync('extracted_icons.json', JSON.stringify(icons, null, 2));
