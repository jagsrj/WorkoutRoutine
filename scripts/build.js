// Joins the app's scripts into one file (app.js) so phones download 1 file instead of 10.
// Edit the files in js/, then run:   node scripts/build.js
// CI runs `node scripts/build.js --check` and fails if app.js is out of date.
// js/errors.js stays separate and loads first, so it can still report a broken app.js.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const ORDER = ['data', 'store', 'screens', 'sync', 'coach', 'photos', 'features', 'gear', 'extras', 'smart', 'habits', 'more', 'me'];
let out = '/* KinFit app bundle. GENERATED FILE: do not edit. Edit js/*.js and run `node scripts/build.js`. */\n';
for (const n of ORDER) {
  const src = fs.readFileSync(path.join(root, 'js', n + '.js'), 'utf8').replace(/\s+$/, '');
  out += `\n/* ===== js/${n}.js ===== */\n${src}\n`;
}
const file = path.join(root, 'app.js');
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (cur !== out) { console.error('app.js is out of date. Run: node scripts/build.js'); process.exit(1); }
  console.log('app.js is up to date');
} else {
  fs.writeFileSync(file, out);
  console.log(`Wrote app.js (${(out.length / 1024).toFixed(0)} KB from ${ORDER.length} files)`);
}
