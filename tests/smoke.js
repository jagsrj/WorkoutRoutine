// Smoke test: runs the app in a phone-sized browser and walks through the main flows.
// Run locally:  npm i playwright && npx playwright install chromium && node tests/smoke.js
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..'), PORT = 4173;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('{}'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
let failures = 0;
const check = (ok, what) => { console.log(`${ok ? '✅' : '❌'} ${what}`); if (!ok) failures++; };

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(`http://localhost:${PORT}/`);
    // Onboarding: name + quiz → level
    await page.click('#start'); await page.fill('#nm', 'Tester'); await page.click('#next');
    for (const k of [0, 0, 0, 0, 2]) { await page.click(`.opt[data-k="${k}"]`); await page.waitForTimeout(250); }
    check((await page.textContent('h1')).includes('Beginner'), 'Quiz recommends Beginner for a new exerciser');
    await page.click('#ok'); await page.waitForTimeout(300);
    check((await page.textContent('h1')).includes('Tester'), 'Today screen greets the user');
    // Start the Upper A workout from the folded list, tick a set, finish
    await page.click('details.fold summary'); await page.click('details.fold [data-start="ua"]'); await page.waitForTimeout(300);
    check(await page.isVisible('#finish'), 'Workout screen opens');
    await page.click('[data-check="0,0"]'); await page.click('[data-check="0,1"]'); await page.click('[data-check="0,2"]');
    check(await page.isVisible('.effort'), 'Effort question appears after all sets');
    await page.click('[data-eff="0,2"]');
    await page.click('#finish'); await page.waitForTimeout(500);
    check(await page.isVisible('.celebrate'), 'Celebration screen shows');
    await page.click('#done'); await page.waitForTimeout(300);
    check((await page.textContent('.stat b')).trim() === '1', 'Progress counts 1 workout');
    check(await page.isVisible('.mmap'), 'Muscle map shows');
    // Log an activity
    await page.click('#logact'); await page.click('[data-act="Run"]'); await page.click('#asave'); await page.waitForTimeout(300);
    check((await page.textContent('body')).includes('Run'), 'Activity is logged');
    // Library tabs and building a custom workout
    await page.click('[data-go="library"]');
    for (const t of ['mine', 'sports', 'all', 'plan']) { await page.click(`[data-lt="${t}"]`); await page.waitForTimeout(100); }
    await page.click('[data-lt="mine"]'); await page.click('#rnew'); await page.fill('#rn', 'Quick legs');
    await page.click('#radd'); await page.click('[data-pk="squat"]'); await page.click('#rsave'); await page.waitForTimeout(200);
    check((await page.textContent('body')).includes('Quick legs'), 'Custom workout saved');
    // Coach built-in answer
    await page.click('[data-go="ask"]'); await page.click('#sugg button:nth-child(2)');
    await page.waitForFunction(() => !document.querySelector('#typing'));
    check((await page.locator('.msg.bot').last().textContent()).includes('Squat'), 'Coach explains a squat');
  } catch (e) { console.error(e); failures++; }
  check(errors.length === 0, 'No JavaScript errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await browser.close(); server.close();
  console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
  process.exit(failures ? 1 : 0);
})();
