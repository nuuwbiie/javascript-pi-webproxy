const fs = require('fs');

// We have the SVG from user prompt or let's read it from transcript
const readline = require('readline');

async function getLatestUserSvg() {
  const filePath = 'C:\\Users\\IRSYA\\.gemini\\antigravity\\brain\\32d90c9d-9939-47cd-8d60-d4ff68fd8476\\.system_generated\\logs\\transcript_full.jsonl';
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let latestContent = '';
  for await (const line of rl) {
    if (line.includes('<svg width=\\"488\\"')) {
      const parsed = JSON.parse(line);
      latestContent = parsed.content;
    }
  }

  if (latestContent) {
    fs.writeFileSync('user_notification.svg', latestContent);
    console.log('Saved user_notification.svg, length:', latestContent.length);
  } else {
    console.log('Not found in transcript yet');
  }
}
getLatestUserSvg();
