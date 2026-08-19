// Run with: node fix-images.cjs
// Safely swaps the 11 Unsplash photo URLs in src/data/hotspots.js
// for local image imports, and adds the import statements at the top.
// Only touches lines matching the exact known URLs — nothing else in the file changes.

const fs = require("fs");
const path = require("path");

const filePath = path.join("src", "data", "hotspots.js");

if (!fs.existsSync(filePath)) {
  console.error(`Could not find ${filePath} — run this from your project root (travel-hackathon folder).`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, "utf8");
const original = content;

// [urlFragment, varName, localFileName]
const mappings = [
  ["1506905925346-21bda4d32df4", "netarhatImg", "netarhat.jpg"],
  ["1544919982-b61976f0ba43", "betlaImg", "betla.jpg"],
  ["1432405972618-c60b0225b8f9", "hundruImg", "hundru.jpg"],
  ["1582555172866-f73bb12a2ab3", "sohraiVillageImg", "sohrai-village.jpg"],
  ["1548013146-72479768bada", "deogharImg", "deoghar.jpg"],
  ["1483347756197-71ef80e95f73", "dassamImg", "dassam.jpg"],
  ["1519046904884-53103b34b206", "jonhaImg", "jonha.jpg"],
  ["1546587348-d12660c30c50", "lodhImg", "lodh.jpg"],
  ["1609619385076-36a873425636", "deoriMandirImg", "deori-mandir.jpg"],
  ["1495616811223-4d98c6e9c869", "netarhatViewpointImg", "netarhat-viewpoint.jpg"],
  ["1470770903676-69b98201ea1c", "patratuValleyImg", "patratu-valley.jpg"],
];

let importBlock = "";
let replacedCount = 0;
let missing = [];

for (const [urlFragment, varName, fileName] of mappings) {
  const regex = new RegExp(
    `photo:\\s*"https://images\\.unsplash\\.com/photo-${urlFragment}[^"]*"`
  );
  if (regex.test(content)) {
    content = content.replace(regex, `photo: ${varName}`);
    importBlock += `import ${varName} from "../assets/locations/${fileName}";\n`;
    replacedCount++;
  } else {
    missing.push(fileName);
  }
}

if (replacedCount === 0) {
  console.error("No matching photo URLs found — file may already be updated, or content doesn't match expected format. No changes made.");
  process.exit(1);
}

content = importBlock + "\n" + content;

fs.writeFileSync(filePath, content, "utf8");

console.log(`Done — replaced ${replacedCount} of 11 photo URLs with local imports.`);
if (missing.length) {
  console.log(`Could not find/match these (left unchanged, check manually): ${missing.join(", ")}`);
}
console.log(`Backup tip: original content is only in git history now — if this looks wrong, run: git checkout -- ${filePath}`);
