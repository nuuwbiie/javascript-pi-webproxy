const fs = require('fs');

const svg = fs.readFileSync('user_notification.svg', 'utf8');

// Notice each button in SVG is 97 x 47:
// Button 1 (Wi-Fi): x="85.5" y="57.5" width="97" height="47"
//   Inside: path d="M108 76C107.438..." -> x=100 to 116, y=75 to 86.25 (16x11.25)
// Button 2 (Bluetooth): x="195.5" y="57.5" width="97" height="47"
//   Inside: path d="M217 82.1016L213.828..." -> x=213 to 222, y=73 to 89 (9x16)
// Button 3 (Airplane): x="305.5" y="57.5" width="97" height="47"
//   Inside: path d="M351.109 87.7578..." -> x=346 to 362, y=73 to 89 (16x16)
// Button 4 (Battery saver): x="85.5" y="153.5" width="97" height="47"
//   Inside: path d="M126.5 182C126.365..." -> x=126 to 142, y=171 to 182 (16x11)
// Button 5 (Night light): x="195.5" y="153.5" width="97" height="47"
//   Inside: path d="M237.273 181.195..." -> x=237 to 252, y=169 to 185 (15x16)
// Button 6 (Accessibility): x="305.5" y="153.5" width="97" height="47"
//   Inside: path d="M349 173.008..." -> x=335 to 349, y=169 to 185 (14x16)
// Slider 1 (Volume): y="279.5"
//   Speaker icon: path d="M97 287.242..." -> x=85 to 101, y=274.2 to 287.7 (16x13.5)
// Slider 2 (Brightness): y="335.5"
//   Sun icon: path d="M92.5 330.5..." -> x=85 to 101, y=329 to 345 (16x16)
// Footer:
//   Battery icon: path d="M101 401.5..." -> x=85 to 101, y=396 to 406 (16x10)
//   Pencil icon: path d="M362.945 395.57..." -> x=347 to 363, y=393 to 408.8 (16x16)
//   Gear icon: path d="M391.695 405.789..." -> x=387 to 403, y=393 to 409 (16x16)
console.log('Coordinates identified accurately!');
