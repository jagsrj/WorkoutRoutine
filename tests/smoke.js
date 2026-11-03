// Smoke test: runs the app in a phone-sized browser and walks through the main flows.
// Run locally:  npm i playwright && npx playwright install chromium && node tests/smoke.js
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..', 'public'), PORT = 4173; // serve exactly what Cloudflare publishes
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
    // On Mondays Upper A is today's main workout, so it isn't in the folded list
    if (await page.locator('details.fold [data-start="ua"]').count()) { await page.click('details.fold summary'); await page.click('details.fold [data-start="ua"]'); }
    else await page.click('[data-start="ua"]');
    await page.waitForTimeout(300);
    check(await page.isVisible('#finish'), 'Workout screen opens');
    await page.click('[data-check="0,0"]'); await page.click('[data-check="0,1"]'); await page.click('[data-check="0,2"]');
    check(await page.isVisible('.effort'), 'Effort question appears after all sets');
    await page.click('[data-eff="0,2"]');
    await page.click('#finish'); await page.waitForTimeout(500);
    check(await page.isVisible('.celebrate'), 'Celebration screen shows');
    check(await page.isVisible('.celebrate #cbk'), 'Workout-done screen asks to turn on backup');
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
    await page.click('[data-go="ask"]'); await page.click('#sugg button:has-text("How do I do a squat?")');
    await page.waitForFunction(() => !document.querySelector('#typing'));
    check((await page.locator('.msg.bot').last().textContent()).includes('Squat'), 'Coach explains a squat');
    // Set types, effort and supersets
    await page.click('[data-go="today"]'); await page.click('details.fold summary'); await page.click('details.fold [data-start="ub"]'); await page.waitForTimeout(300);
    await page.click('[data-stype="0,0"]'); await page.click('[data-st="w"]'); await page.click('[data-rp="7"]'); await page.click('#ok'); await page.waitForTimeout(150);
    check((await page.textContent('[data-stype="0,0"]')).includes('Warm'), 'A set can be marked as a warm-up with effort');
    check((await page.textContent('[data-stype="0,1"]')).includes('Set 1'), 'Warm-up sets are not counted in set numbers');
    await page.click('[data-link="0"]'); await page.waitForTimeout(150);
    check(await page.isVisible('.sshead'), 'Two exercises can be joined into a superset');
    await page.click('[data-check="0,0"]'); await page.waitForTimeout(200);
    check(!(await page.evaluate(() => document.querySelector('#timer').classList.contains('show'))), 'Superset goes to the next exercise with no rest');
    await page.click('[data-check="1,0"]'); await page.waitForTimeout(200);
    check(await page.evaluate(() => document.querySelector('#timer').classList.contains('show')), 'Rest starts after the last exercise of the superset');
    await page.click('#finish'); await page.waitForTimeout(400);
    const logged = await page.evaluate(() => { const j = getJournal(), e = j[isoLocal()]; const a = e[e.length - 2], b = e[e.length - 1]; return a.sets[0].t === 'w' && a.sets[0].rpe === 7 && a.ss === 'A' && b.ss === 'A'; });
    check(logged, 'Set type, effort and superset are saved in history');
    if (await page.isVisible('#done')) await page.click('#done');
    // Recovery model and library
    const rec = await page.evaluate(() => {
      const r = {}, now = Date.now(), d = isoLocal();
      const legs = { [d]: [{ id: 1, exercise: 'Bodyweight Squats', u: now - 2 * 36e5, sets: Array(8).fill({ reps: 12, weight: 0 }) }] };
      r.tiredAfterLegs = muscleReady(now, legs).quads < 0.4;
      r.restedLater = muscleReady(now + 4 * 864e5, legs).quads > 0.99;
      r.armsStillFresh = muscleReady(now, legs).biceps > 0.99;
      r.warmupsDontTire = muscleReady(now, { [d]: [{ id: 2, exercise: 'Bodyweight Squats', u: now, sets: Array(8).fill({ reps: 12, weight: 0, t: 'w' }) }] }).quads === 1;
      const keep = getJournal(); setJournal(legs);
      const card = recoveryCard('la'); r.todayWarns = card.includes('still recovering') && /data-start="u[ab]"/.test(card);
      r.noWarnForUpper = recoveryCard('ua') === '';
      setJournal(keep);
      const ids = Object.keys(EX).filter(k => !k.startsWith('_') && !k.startsWith('c_'));
      r.bigLibrary = ids.length >= 120;
      r.everyMoveDrawn = ids.every(k => figSvg(k) && EX[k].steps.length >= 3 && EX[k].tip);
      r.hideRecoveryKept = sanitizeProfile({ id: 'pz', todayHide: ['recovery', 'bogus'] }).todayHide.join() === 'recovery';
      r.cableNotAtHome = !buildPool('none').includes('cable_fly') && !buildPool('dumbbells').includes('cable_fly') && buildPool('dumbbells').includes('db_fly');
      return r;
    });
    Object.entries(rec).forEach(([k, v]) => check(v, 'Unit: ' + k));
    // Home Screen reminder (iPhone instructions) and backup change detection
    const hs = await page.evaluate(() => {
      const r = {};
      r.canonIgnoresKeyOrder = canon({ b: 1, a: { d: 1, c: [2, 1] } }) === canon({ a: { c: [2, 1], d: 1 }, b: 1 });
      r.canonSeesChanges = canon({ a: 1 }) !== canon({ a: 2 });
      syncCfg.snooze = Date.now() + 864e5; store.del('jams_home');
      Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', configurable: true });
      go('today'); r.iphoneCardShows = !!document.querySelector('#hscard') && document.querySelector('#hscard').textContent.includes('Add to Home Screen');
      document.querySelector('#hsdone').click(); r.cardGoneAfterDone = !document.querySelector('#hscard');
      delete syncCfg.snooze;
      return r;
    });
    Object.entries(hs).forEach(([k, v]) => check(v, 'Unit: ' + k));
    await page.click('[data-go="progress"]'); await page.click('[data-mm="ready"]'); await page.waitForTimeout(150);
    check((await page.textContent('#mmcard')).includes('Ready'), 'Muscle "Ready?" tab shows');
    // Body stats & BMI: enter weight, height, age and a target through the sheet
    const bmiU = await page.evaluate(() => ({
      bmiMath: Math.round(bmiOf(70, 175) * 10) / 10 === 22.9,
      bands: bmiBand(17).n.startsWith('Below') && bmiBand(22).n === 'Healthy range' && bmiBand(27).n.startsWith('Above'),
      statsKept: JSON.stringify(sanitizeProfile({ id: 'pq', stats: { h: 175, age: 40, ageOn: '2026-01-01', goal: 23 } }).stats) === '{"h":175,"age":40,"ageOn":"2026-01-01","goal":23}',
      lowGoalDropped: !('goal' in (sanitizeProfile({ id: 'pq', stats: { h: 175, goal: 15 } }).stats || {})),
    }));
    Object.entries(bmiU).forEach(([k, v]) => check(v, 'Unit: ' + k));
    await page.evaluate(() => { profile.photos = true; profile.unit = 'kg'; saveProfile(); go('progress'); });
    await page.click('#bstats'); await page.fill('#sw', '70'); await page.fill('#shc', '175'); await page.fill('#sa', '40');
    check((await page.textContent('#sprev')).includes('22.9'), 'BMI preview updates while typing');
    await page.fill('#sg', '15'); await page.click('#ssave'); await page.waitForTimeout(150);
    check(await page.isVisible('#ssave'), 'Target BMI below 18.5 is refused');
    await page.fill('#sg', '22'); await page.click('#ssave'); await page.waitForTimeout(200);
    const statsTxt = await page.textContent('#view');
    check(statsTxt.includes('22.9') && statsTxt.includes('Healthy range') && statsTxt.includes('67.4 kg'), 'Body stats card shows BMI, range and target weight');
    await page.click('#bstats'); await page.fill('#sa', '14'); await page.waitForTimeout(100);
    check(!(await page.isVisible('#sg')), 'Target BMI is hidden for under-18s');
    await page.click('#ssave'); await page.waitForTimeout(200);
    const kidTxt = await page.textContent('#view');
    check(!kidTxt.includes('Healthy range') && kidTxt.includes('growth charts'), 'Under-18s see BMI without adult ranges');
    // Fun extras: set up a second person and some history, then check each feature
    const fun = await page.evaluate(() => {
      const r = {}, today = isoLocal(), ago = n => { const d = new Date(); d.setDate(d.getDate() - n); return isoLocal(d); };
      const kid = Object.assign({}, DEFAULT_P, { id: 'pkid1', name: 'Kiddo', level: 'expert', kid: true, avatar: '🙂' }); DB.list.push(kid); saveDB();
      const j = {}; for (let i = 0; i < 6; i++) j[ago(i)] = [{ id: 'k' + i, exercise: 'Bodyweight Squats', sets: [{ reps: 50, weight: 0 }, { reps: 50, weight: 0 }], unit: 'lbs', effort: 3, u: Date.now() - i * 864e5 }];
      setJournal(j, kid);
      r.totals = totals(kid).reps === 600 && totals(kid).days === 6;
      const Q = familyQuest(); r.questTarget = Q && Q.target === Q.per * DB.list.length && Q.parts.length === DB.list.length;
      r.buddyStage = buddyInfo(kid).stage === 'Chick' && buddyInfo(kid).next.need === 6;
      r.realThing = realThing(900) === '🐻‍❄️ 2 polar bears' && realThing(16500).includes('school bus') && realThing(0, 888).includes('50%');
      r.cricketRuns = runsFor({ reps: 150, secs: 100 }) === 60 && inningsNote(100).includes('CENTURY');
      r.trailKm = trailInfo(kid).km === 60 && trailInfo(kid).next.n === 'Toronto';
      const w = personWeek(kid); r.parentWarns = w.warn.some(x => x.includes('6 of the last 7')) && w.warn.some(x => x.includes('too hard')) && w.warn.some(x => x.includes('child profile'));
      const roll = rollWorkout(); r.diceOk = roll.items.length >= 3 && roll.items.every(x => EX[x[0]]);
      r.sanitizeFun = (s => s.cricket === true && s.buddyName === 'Rex' && s.buddySeen === 2)(sanitizeProfile({ id: 'pz', cricket: true, buddyName: 'Rex<>', buddySeen: 2 }));
      profile.cricket = true; saveProfile(); go('today');
      return r;
    });
    Object.entries(fun).forEach(([k, v]) => check(v, 'Unit: ' + k));
    check(await page.isVisible('.quest') && (await page.textContent('.quest')).includes('Kiddo'), 'Family quest shows on Today with everyone');
    check(await page.isVisible('#buddy'), 'Grow-a-buddy card shows on Today');
    await page.click('#buddy'); await page.fill('#bname', 'Rex'); await page.click('#bok'); await page.waitForTimeout(150);
    check((await page.textContent('#buddy')).includes('Rex'), 'Buddy can be renamed');
    await page.click('#dice'); await page.waitForTimeout(150);
    check(await page.locator('#dicebox .row').count() >= 3, 'Workout dice rolls a workout');
    await page.click('#dgo'); await page.waitForTimeout(300);
    check(await page.isVisible('#finish'), 'Dice workout starts');
    await page.click('[data-check="0,0"]'); await page.click('#finish'); await page.waitForTimeout(300);
    if (await page.isVisible('#fok')) await page.click('#fok');
    await page.waitForTimeout(300);
    const cele = await page.textContent('#layer');
    check(cele.includes("Today's innings"), 'Cricket innings shows on the workout-done screen');
    if (await page.isVisible('#done')) await page.click('#done'); await page.waitForTimeout(200);
    await page.evaluate(() => go('progress')); await page.waitForTimeout(150);
    const prog = await page.textContent('#view');
    check(prog.includes('Adventure trail') && prog.includes('Cricket season'), 'Progress shows the trail and cricket season');
    await page.click('#opentrail'); await page.waitForTimeout(150);
    await page.click('[data-pc="0"]'); await page.waitForTimeout(100);
    check((await page.textContent('.postcard')).includes('Waterloo'), 'Trail postcard opens');
    await page.click('#ok');
    await page.evaluate(() => go('me')); await page.click('#pdash'); await page.waitForTimeout(150);
    const dash = await page.textContent('#view');
    check(dash.includes('Family dashboard') && dash.includes('Kiddo') && dash.includes('too hard'), 'Parent dashboard shows each person with warnings');
    // Smarter progression: plateau, weekly sets per muscle, suggested weights
    const prg = await page.evaluate(() => {
      const r = {}, ago = n => { const d = new Date(); d.setDate(d.getDate() - n); return isoLocal(d); };
      const save = getJournal(), unit = profile.unit; profile.unit = 'lbs';
      const j = {}, row = (d, w, reps) => (j[d] = j[d] || []).push({ id: 'g' + d + w, exercise: 'Goblet Squats', sets: [{ reps, weight: w }, { reps, weight: w }, { reps, weight: w }], unit: 'lbs', u: 1 });
      row(ago(20), 40, 10); row(ago(14), 45, 10); row(ago(10), 45, 9); row(ago(6), 45, 10); row(ago(2), 45, 9);
      (j[ago(1)] = j[ago(1)] || []).push({ id: 'cp', exercise: 'Dumbbell Bench Press', sets: [{ reps: 10, weight: 30 }, { reps: 10, weight: 30 }], unit: 'lbs', u: 1 });
      setJournal(j);
      const pl = plateauOf('Goblet Squats'); r.plateauFound = !!pl && pl.deload === 40;
      r.noPlateauFewSessions = plateauOf('Dumbbell Bench Press') === null;
      r.suggestPlateau = suggestWeight('goblet_squat', ['goblet_squat', 3, 8, 12]).w === 40;
      const sb = suggestWeight('db_bench', ['db_bench', 3, 8, 12]); r.suggestFromHistory = sb && sb.w === 30;
      setJournal({ [ago(1)]: [{ id: 'cq', exercise: 'Dumbbell Bench Press', sets: [{ reps: 12, weight: 30 }, { reps: 12, weight: 30 }, { reps: 12, weight: 30 }], unit: 'lbs', u: 1 }] });
      r.suggestUpAfterTop = suggestWeight('db_bench', ['db_bench', 3, 8, 12]).w === 35;
      r.firstTimeStart = suggestWeight('goblet_squat', ['goblet_squat', 3, 8, 12]).w === 20;
      setJournal(j);
      const ws = weeklySets(); r.weeklySets = ws.quads === 6 && ws.chest === 2 && ws.triceps === 1;
      r.statusRanges = setStatus(4, [6, 15]).t === 'Needs more' && setStatus(10, [6, 15]).t.startsWith('Growing') && setStatus(30, [6, 15]).t === 'Too much';
      go('progress');
      r.cardsShow = !!document.querySelector('#wscard') && document.body.textContent.includes('Plateau check') && document.body.textContent.includes('Goblet Squats');
      r.hintShows = progressHint(['goblet_squat', 3, 8, 12], EX.goblet_squat).includes('No progress') && progressHint(['db_bench', 3, 8, 12], EX.db_bench).includes('Suggested: 30 lbs');
      setJournal(save); profile.unit = unit; return r;
    });
    Object.entries(prg).forEach(([k, v]) => check(v, 'Unit: ' + k));
    // Food diary & scanner (the AI reply is faked)
    await page.route('**/api/food', r => r.fulfill({ contentType: 'application/json', body: JSON.stringify({ food: true, dish: 'Chicken rice bowl', confidence: 'medium', items: [{ name: 'Chicken', portion: '120 g', calories: 198, protein: 37, carbs: 0, fiber: 0 }, { name: 'Rice', portion: '1 cup', calories: 205, protein: 4, carbs: 45, fiber: 0.6 }], total: { calories: 403, protein: 41, carbs: 45, fiber: 0.6 } }) }));
    await page.evaluate(() => { profile.food = []; delete profile.stats; delete profile.kid; delete profile.kcalGoal; saveProfile(); go('today'); });
    check(await page.isVisible('#foodcard'), 'Food card shows on Today');
    await page.click('#foodscan'); await page.fill('#fnote', 'chicken and rice bowl'); await page.click('#fgo'); await page.waitForTimeout(300);
    check((await page.textContent('#fres')).includes('403') && (await page.textContent('#fres')).includes('41'), 'Breakdown shows calories, protein, carbs and fiber');
    await page.click('#fk [data-k="0.5"]');
    check((await page.textContent('#fres')).includes('20.5') && (await page.textContent('#fres')).includes('202'), 'Portion buttons rescale the breakdown');
    await page.click('#fmeal [data-meal="l"]'); await page.click('#fadd'); await page.waitForTimeout(200);
    check((await page.textContent('#foodcard')).includes('202'), 'Calories eaten show on Today');
    await page.click('#fooddiary'); await page.waitForTimeout(150);
    const lunch = await page.locator('.meal').filter({ hasText: 'Lunch' }).textContent();
    check(lunch.includes('Chicken rice bowl') && lunch.includes('202 cal'), 'Food diary files the meal under Lunch');
    await page.click('[data-fquick="b"]'); await page.fill('#qn', 'Banana'); await page.fill('#qk', '105'); await page.fill('#qc', '27'); await page.click('#qok'); await page.waitForTimeout(150);
    check((await page.locator('.meal').filter({ hasText: 'Breakfast' }).textContent()).includes('Banana'), 'Quick add puts food in Breakfast');
    await page.locator('[data-kgoal]').first().click(); await page.fill('#kg', '800'); await page.click('#kok'); await page.waitForTimeout(100);
    check(await page.isVisible('#kok'), 'A calorie goal under 1,200 is refused');
    await page.fill('#kg', '2000'); await page.click('#kok'); await page.waitForTimeout(150);
    check((await page.textContent('#view')).includes('1,693'), 'Goal − Food = Remaining is shown');
    await page.evaluate(() => { profile.kid = true; profile.foodOn = true; saveProfile(); go('food'); });
    const kidDiary = await page.textContent('#view');
    check(!/\d cal\b/.test(kidDiary) && !kidDiary.includes('Remaining') && !kidDiary.includes('Set goal') && kidDiary.includes("doesn't count calories"), 'Child profiles see no calories or goals');
    await page.evaluate(() => { delete profile.kid; delete profile.foodOn; saveProfile(); });
    const foodU = await page.evaluate(() => {
      const r = {};
      const s = sanitizeProfile({ id: 'pf', kcalGoal: 900, food: [{ id: 'f1', d: '2026-11-03', m: 'x', n: '<b>Toast</b>', k: 99999, p: 8, c: 30, f: 2 }] });
      r.foodKept = s.food[0].n === 'bToast/b' && s.food[0].m === 's' && s.food[0].k === 10000 && !('kcalGoal' in s);
      r.kidOffByDefault = foodOn({ kid: true }) === false && foodOn({ kid: true, foodOn: true }) === true && foodOn({}) === true && foodOn({ foodOff: true }) === false;
      return r;
    });
    Object.entries(foodU).forEach(([k, v]) => check(v, 'Unit: ' + k));
    await page.evaluate(() => { profile.food = []; delete profile.kcalGoal; saveProfile(); go('today'); });
    await page.unroute('**/api/food');
    await page.evaluate(() => { DB.list = DB.list.filter(p => p.id !== 'pkid1'); saveDB(); profile.cricket = false; saveProfile(); go('today'); });
    await page.evaluate(() => { profile.photos = false; profile.unit = 'lbs'; delete profile.stats; profile.body = []; saveProfile(); go('progress'); });
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
