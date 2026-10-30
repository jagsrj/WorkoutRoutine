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
    await page.waitForSelector('.tour-tip', { timeout: 4000 }).catch(() => {});
    check(await page.isVisible('.tour-tip'), 'First-time tour appears');
    if (await page.isVisible('#tskip')) await page.click('#tskip');
    // Unit checks of core logic, run inside the app
    const u = await page.evaluate(() => {
      const r = {};
      const L = { profiles: [{ id: 'pa', name: 'A', updated: 1 }], deletedProfiles: [], data: { pa: { journal: { '2026-01-01': [{ id: 1, exercise: 'Squat', sets: [{ reps: 5, weight: 0 }], u: 1 }] }, tomb: [] } } };
      const R = { profiles: [{ id: 'pa', name: 'A2', updated: 2 }], deletedProfiles: [], data: { pa: { journal: { '2026-01-02': [{ id: 2, exercise: 'Plank', sets: [{ reps: 30, weight: 0 }], u: 1 }] }, tomb: ['1'] } } };
      const m = mergePayload(L, R);
      r.mergeDelete = !m.data.pa.journal['2026-01-01'];
      r.mergeAdd = m.data.pa.journal['2026-01-02'].length === 1;
      r.mergeNewerProfile = m.profiles[0].name === 'A2';
      const sp = sanitizeProfile({ id: 'pz', name: 'Bob<b>', avatar: '<img>', level: 'god', customEx: { c_x: { name: 'X"y', steps: ['<s>'] }, bad: { name: 'no' } } });
      r.cleanName = sp.name === 'Bobb';
      r.cleanAvatar = sp.avatar === '🙂' && sp.level === 'beginner';
      r.cleanCustom = sp.customEx.c_x.name === 'Xy' && !sp.customEx.bad && sp.customEx.c_x.steps[0] === 's';
      r.rejectBadId = sanitizeProfile({ id: '<x>' }) === null;
      r.e1rm = Math.round(e1rm(100, 10)) === 133;
      const save = profile.planStart;
      const back = w => { const d = new Date(); d.setDate(d.getDate() - 7 * (w - 1)); return isoLocal(d); };
      profile.planStart = back(10); const p2 = phasePlan([['squat', 3, 10, 15], ['plank', 3, 20, 30]]);
      r.phaseBuild = p2[0][1] === 4;
      profile.planStart = back(12); r.phaseRecovery = phasePlan([['squat', 3, 10, 15]])[0][1] === 3;
      profile.planStart = back(18); r.phaseStrength = phasePlan([['goblet_squat', 3, 10, 12]])[0][2] === 8;
      profile.planStart = save;
      return r;
    });
    Object.entries(u).forEach(([k, v]) => check(v, 'Unit: ' + k));
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
    // Security: booby-trapped saved data must never run as code
    const bad = '<img src=x onerror="window.__pwned=1">';
    await page.evaluate(b => {
      const d = JSON.parse(localStorage.getItem('jams_profiles'));
      const p = d.list[0];
      p.toured = true; p.avatar = b; p.name = 'Evil' + b;
      p.customEx = { c_evil: { name: 'Hack' + b, e: b, m: [b], steps: [b, '"><svg onload="window.__pwned=2">'], tip: b } };
      p.routines = [{ id: 'revil', name: 'R' + b, e: b, items: [['c_evil', 3, 8, 12]] }];
      p.fives = [{ from: b, av: b, at: Date.now() }];
      localStorage.setItem('jams_profiles', JSON.stringify(d));
      const j = JSON.parse(localStorage.getItem('workout_journal') || '{}');
      j['2026-01-01'] = [{ id: 'x"><img src=x onerror="window.__pwned=3">', exercise: 'Ex' + b, sets: [{ reps: 5, weight: 0 }], timestamp: b }];
      localStorage.setItem('workout_journal', JSON.stringify(j));
    }, bad);
    await page.reload(); await page.waitForTimeout(300);
    for (const tab of ['today', 'library', 'progress', 'me', 'ask']) { await page.click(`[data-go="${tab}"]`); await page.waitForTimeout(150); }
    await page.click('[data-go="library"]'); await page.click('[data-lt="mine"]'); await page.locator('details.how').first().evaluate(d => d.open = true);
    await page.click('[data-go="progress"]');
    const pwned = await page.evaluate(() => window.__pwned);
    const injected = await page.evaluate(() => document.querySelectorAll('img[src="x"], svg[onload]').length);
    check(!pwned && injected === 0, 'Booby-trapped saved data cannot run code');
  } catch (e) { console.error(e); failures++; }
  check(errors.length === 0, 'No JavaScript errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  await browser.close(); server.close();
  console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
  process.exit(failures ? 1 : 0);
})();
