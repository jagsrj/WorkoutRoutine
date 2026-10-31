// Joins the app's scripts into one file (app.js) so phones download 1 file instead of 10.
// Edit the files in js/, then run:   node scripts/build.js
// It also builds the search-friendly pages (plans/, exercises/, guides/, workouts.html, sitemap.xml).
// CI runs `node scripts/build.js --check` and fails if any generated file is out of date.
// js/errors.js stays separate and loads first, so it can still report a broken app.js.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const ORDER = ['data', 'store', 'screens', 'sync', 'coach', 'photos', 'features', 'gear', 'extras', 'smart', 'recovery', 'habits', 'more', 'me'];
let out = '/* KinFit app bundle. GENERATED FILE: do not edit. Edit js/*.js and run `node scripts/build.js`. */\n';
for (const n of ORDER) {
  const src = fs.readFileSync(path.join(root, 'js', n + '.js'), 'utf8').replace(/\s+$/, '');
  out += `\n/* ===== js/${n}.js ===== */\n${src}\n`;
}
// Search-friendly pages (see scripts/pages.js) are generated from the same data.
const files = Object.assign({ 'app.js': out }, require('./pages.js').build());
const GEN_DIRS = ['plans', 'exercises', 'guides'];
const existing = () => [...GEN_DIRS.flatMap(d => fs.existsSync(path.join(root, d)) ? fs.readdirSync(path.join(root, d)).map(f => d + '/' + f) : []),
  ...(fs.existsSync(path.join(root, 'workouts.html')) ? ['workouts.html'] : [])];
if (process.argv.includes('--check')) {
  const stale = Object.entries(files).filter(([f, c]) => !fs.existsSync(path.join(root, f)) || fs.readFileSync(path.join(root, f), 'utf8') !== c).map(([f]) => f);
  const extra = existing().filter(f => !(f in files));
  if (stale.length || extra.length) { console.error('Generated files are out of date. Run: node scripts/build.js\n' + [...stale, ...extra].slice(0, 10).join('\n')); process.exit(1); }
  console.log(`app.js and ${Object.keys(files).length - 1} pages are up to date`);
} else {
  existing().filter(f => !(f in files)).forEach(f => fs.unlinkSync(path.join(root, f)));
  Object.entries(files).forEach(([f, c]) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), c); });
  console.log(`Wrote app.js (${(out.length / 1024).toFixed(0)} KB from ${ORDER.length} files) and ${Object.keys(files).length - 1} pages`);
}
