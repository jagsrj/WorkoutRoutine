// Builds plain, search-engine-friendly pages from the app's own data (js/data.js and js/gear.js):
//   /workouts (hub), /plans/<level>, /plans/<sport>-workout, /exercises (index), /exercises/<exercise>,
//   /guides/home-gym-functional-trainer, plus sitemap.xml.
// Run through scripts/build.js; never edit the generated files by hand.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const SITE = 'https://kinfit.pages.dev';

function loadData() {
  const ctx = { matchMedia: () => ({ matches: false }), document: { addEventListener() {} }, console };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8') + '\n;globalThis.__d={EX,PLANS,LEVELS,WORKOUTS,SCHEDULE,SPORTS,DAYS};', ctx);
  // gear.js only needs a few globals at load time; we just want its equipment versions.
  vm.runInContext(fs.readFileSync(path.join(root, 'js/gear.js'), 'utf8') + '\n;globalThis.__g={GEAR_VARIANTS,GEAR_REQ};', ctx);
  return Object.assign({ figSvg: ctx.figSvg, exBodyMap: ctx.exBodyMap }, ctx.__d, ctx.__g);
}

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = s => s.toLowerCase().replace(/\(.*?\)/g, m => ' ' + m.slice(1, -1) + ' ').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const legend = '<p class="small legend"><i aria-hidden="true"></i>main muscle <i class="lt" aria-hidden="true"></i>helpers</p>';
const figPair = (fig, body) => !fig && !body ? '' : `<div class="figbox${fig && body ? ' pair' : ''}">${fig || ''}${body || ''}</div>${body ? legend : ''}`;
const reps = (p, ex) => { const r = p[2] === p[3] ? p[2] : `${p[2]}–${p[3]}`; return `${p[1]} sets × ${r} ${ex.time ? 'sec' : 'reps'}${ex.per ? ' ' + ex.per : ''}`; };
let S = {}; // exercise id -> unique URL slug
const LEVEL_COLOR = { beginner: '#15803d', intermediate: '#c2410c', expert: '#6d28d9' };
const DARK = { '#15803d': '#4ade80', '#c2410c': '#fb923c', '#6d28d9': '#a78bfa' };

function page({ url, title, desc, crumbs = [], body, color = '#c2410c' }) {
  const canon = SITE + url;
  const bc = crumbs.length ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="/workouts">Workouts</a>${crumbs.map(([t, u]) => ` › ${u ? `<a href="${u}">${esc(t)}</a>` : `<span>${esc(t)}</span>`}`).join('')}</nav>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canon}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${SITE}/og.jpg">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${color}">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/pages.css">
</head>
<body style="--c:${color};--cd:${DARK[color] || '#fb923c'}">
<header class="top"><a class="logo" href="/workouts"><img src="/icon.svg" alt="" width="32" height="32">KINFIT</a><a class="open" href="/">Open the app</a></header>
<main>
${bc}
${body}
</main>
<footer>
<p><a href="/workouts">All workouts</a> · <a href="/exercises/">Exercise library</a> · <a href="/guides/home-gym-functional-trainer">Home gym guide</a> · <a href="/about">About KinFit</a> · <a href="/privacy">Privacy</a></p>
<p class="small">General fitness guidance, not medical advice. Under-18s should lift weights with an adult or coach nearby. Stop if anything hurts sharply.</p>
</footer>
</body>
</html>
`;
}

const cta = (text = 'Start this free in KinFit') => `<p><a class="cta" href="/">${esc(text)} →</a></p><p class="small">Free · No sign-up · No ads · Made for families. Timers, rest countdowns, streaks and badges on any phone. <a href="/about">Why KinFit?</a></p>`;

function exItem(D, id, p) {
  const ex = D.EX[id];
  return `<li class="exi"><a href="/exercises/${S[id]}"><span class="e" aria-hidden="true">${esc(ex.e)}</span><span><b>${esc(ex.name)}</b>${p ? `<br><span class="small">${reps(p, ex)}</span>` : ''}<br><span class="small">${esc(ex.m.join(', '))}</span></span></a></li>`;
}

function build() {
  const D = loadData(), out = {};
  const ids = Object.keys(D.EX).filter(k => !k.startsWith('_'));
  // Unique slugs: two exercises can share a name (e.g. bodyweight and weighted calf raises).
  S = {}; const taken = new Set();
  ids.forEach(id => { let sl = slug(D.EX[id].name); if (taken.has(sl)) sl = sl + '-' + (D.EX[id].weight ? 'with-weights' : slug(id)); taken.add(sl); S[id] = sl; });
  const levels = Object.keys(D.LEVELS);
  // Where each exercise is used.
  const usedIn = {};
  levels.forEach(L => Object.entries(D.PLANS[L]).forEach(([w, list]) => list.forEach(p => (usedIn[p[0]] = usedIn[p[0]] || []).push({ type: 'level', L, w, p }))));
  D.SPORTS.forEach(s => s.items.forEach(p => (usedIn[p[0]] = usedIn[p[0]] || []).push({ type: 'sport', s, p })));
  const add = (url, html) => { out[url] = html; };

  // Week schedule text, Monday first.
  const week = [1, 2, 3, 4, 5, 6, 0].map(i => { const s = D.SCHEDULE[i]; const W = D.WORKOUTS[s.k]; return `<li><b>${D.DAYS[i]}:</b> ${W ? `${W.e} ${esc(W.name)} <span class="small">(${esc(W.sub)})</span>` : `${s.e} ${esc(s.label)}`}</li>`; }).join('');

  // ---------- Level plans ----------
  levels.forEach(L => {
    const V = D.LEVELS[L], url = `/plans/${L}`;
    const workouts = Object.entries(D.WORKOUTS).map(([w, W]) => `<section class="card"><h2>${W.e} ${esc(W.name)}: ${esc(W.sub)}</h2><ol class="exl">${D.PLANS[L][w].map(p => exItem(D, p[0], p)).join('')}</ol></section>`).join('');
    add(url, page({
      url, color: LEVEL_COLOR[L],
      title: `${V.name} workout plan: free 4-day weekly routine | KinFit`,
      desc: `A free ${V.name.toLowerCase()} workout plan: 4 workouts a week (upper and lower body), ${V.equipment.toLowerCase()}. Sets, reps and how to do every exercise.`,
      crumbs: [[`${V.name} plan`]],
      body: `<h1>${V.emoji} ${esc(V.name)} workout plan</h1>
<p class="lead">${esc(V.tagline)} Four short workouts a week: two upper-body days and two lower-body days, with rest and active days in between.</p>
<p><b>Equipment:</b> ${esc(V.equipment)}. <b>Rest between sets:</b> about ${V.rest} seconds.</p>
<h2>Is this level right for you?</h2><ul>${V.who.map(w => `<li>${esc(w)}</li>`).join('')}</ul>
<h2>Your week</h2><ul>${week}</ul>
${workouts}
<h2>How to progress</h2>
<p>Start at the low end of each rep range with perfect form. When you can do the top of the range for every set, add a little weight or a harder version. The plan runs for 24 weeks in three phases (Foundation, Build, Strength), and every 4th week is a lighter recovery week.</p>
${cta(`Start the ${V.name} plan free`)}
<p>Other levels: ${levels.filter(x => x !== L).map(x => `<a href="/plans/${x}">${esc(D.LEVELS[x].name)}</a>`).join(' · ')}</p>`,
    }));
  });

  // ---------- Sport plans ----------
  D.SPORTS.forEach(s => {
    const url = `/plans/${s.id}-workout`;
    add(url, page({
      url,
      title: `${s.name} workout: strength exercises for ${s.name.toLowerCase()} players | KinFit`,
      desc: `A free ${s.name.toLowerCase()} fitness workout with no equipment: ${s.sub.toLowerCase()}. ${s.items.length} exercises with sets, reps and step-by-step instructions.`,
      crumbs: [[`${s.name} workout`]],
      body: `<h1>${s.e} ${esc(s.name)} workout</h1>
<p class="lead">${esc(s.sub)}. No equipment needed, about 20 minutes. Do it 2–3 times a week alongside practice.</p>
<section class="card"><ol class="exl">${s.items.map(p => exItem(D, p[0], p)).join('')}</ol></section>
<p>Warm up for 5 minutes first (jog on the spot, arm circles, leg swings). Rest 45–60 seconds between sets.</p>
${cta(`Do the ${s.name} workout in KinFit`)}
<p>More sport workouts: ${D.SPORTS.filter(x => x.id !== s.id).map(x => `<a href="/plans/${x.id}-workout">${esc(x.name)}</a>`).join(' · ')}</p>`,
    }));
  });

  // ---------- Exercise pages ----------
  const exLink = id => `<a href="/exercises/${S[id]}">${esc(D.EX[id].name)}</a>`;
  ids.forEach(id => {
    const ex = D.EX[id], url = `/exercises/${S[id]}`;
    const uses = usedIn[id] || [];
    const lv = [...new Set(uses.filter(u => u.type === 'level').map(u => u.L))];
    const sp = [...new Set(uses.filter(u => u.type === 'sport').map(u => u.s))];
    const homeVer = (D.GEAR_VARIANTS[id] || []).filter(v => v.name && v.steps);
    const fig = D.figSvg(id, 'fig');
    add(url, page({
      url, color: lv[0] ? LEVEL_COLOR[lv[0]] : '#c2410c',
      title: `How to do ${ex.name}: steps, muscles worked and tips | KinFit`,
      desc: `How to do ${ex.name.toLowerCase()} with good form. Works: ${ex.m.join(', ').toLowerCase()}. ${ex.steps.length} simple steps, a form tip${ex.start ? ' and a starting weight' : ''}.`,
      crumbs: [['Exercises', '/exercises/'], [ex.name]],
      body: `<h1>${esc(ex.e)} How to do ${esc(ex.name)}</h1>
<p class="lead">Works: <b>${esc(ex.m.join(', '))}</b>${ex.weight ? (ex.start ? ` · Starting weight: about ${esc(ex.start)}` : ' · Uses weights') : ' · No equipment'}${ex.time ? ' · Timed exercise' : ''}</p>
${figPair(fig, D.exBodyMap(ex))}
<h2>Step by step</h2><ol>${ex.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
<p class="tip">💡 <b>Tip:</b> ${esc(ex.tip)}</p>
${homeVer.length ? `<h2>At home: other ways to do it</h2>${homeVer.map(v => `<p>${exLinkName(v.name)}</p>`).join('')}` : ''}
${lv.length ? `<h2>In the KinFit plans</h2><ul>${uses.filter(u => u.type === 'level').map(u => `<li><a href="/plans/${u.L}">${esc(D.LEVELS[u.L].name)} plan</a>, ${esc(D.WORKOUTS[u.w].name)}: ${reps(u.p, ex)}</li>`).join('')}</ul>` : ''}
${sp.length ? `<p>Also in: ${sp.map(s => `<a href="/plans/${s.id}-workout">${esc(s.name)} workout</a>`).join(' · ')}</p>` : ''}
<p><a class="btn2" href="https://www.youtube.com/results?search_query=${encodeURIComponent('how to do ' + ex.name + ' proper form')}" rel="noopener" target="_blank">▶ Watch videos of ${esc(ex.name)}</a></p>
${cta()}`,
    }));
  });
  function exLinkName(n) { return `<a href="/exercises/${slug(n)}">${esc(n)}</a>`; }

  // ---------- Home-gym (equipment) versions ----------
  const variants = [];
  Object.entries(D.GEAR_VARIANTS).forEach(([id, list]) => list.forEach(v => { if (v.name && v.steps) variants.push({ id, v }); }));
  variants.forEach(({ id, v }) => {
    const base = D.EX[id], url = `/exercises/${slug(v.name)}`;
    if (out[url]) return;
    add(url, page({
      url,
      title: `${v.name}: how to do it at home, step by step | KinFit`,
      desc: `How to do ${v.name.toLowerCase()}, a home-gym version of ${base.name.toLowerCase()}. Works: ${base.m.join(', ').toLowerCase()}. Safety setup and ${v.steps.length} steps.`,
      crumbs: [['Exercises', '/exercises/'], [v.name]],
      body: `<h1>${esc(base.e)} ${esc(v.name)}</h1>
<p class="lead">A home-gym version of <a href="/exercises/${S[id]}">${esc(base.name)}</a>. Works: <b>${esc(base.m.join(', '))}</b>.</p>
${figPair('', D.exBodyMap(base))}
<h2>Step by step</h2><ol>${v.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
${v.tip ? `<p class="tip">💡 <b>Tip:</b> ${esc(v.tip)}</p>` : ''}
<p><a class="btn2" href="https://www.youtube.com/results?search_query=${encodeURIComponent('how to do ' + v.q + ' proper form')}" rel="noopener" target="_blank">▶ Watch videos</a></p>
<p>In KinFit, set <b>Me → My equipment</b> and your workouts automatically show this version. See the <a href="/guides/home-gym-functional-trainer">home gym guide</a>.</p>
${cta()}`,
    }));
  });

  // ---------- Home gym guide ----------
  {
    const url = '/guides/home-gym-functional-trainer';
    add(url, page({
      url,
      title: 'Home gym workouts with a functional trainer, Smith machine and dumbbells | KinFit',
      desc: 'How to do gym-machine and barbell exercises at home with a functional trainer (cable pulleys), a Smith machine with a leg press plate, and dumbbells. Step-by-step swaps.',
      crumbs: [['Home gym guide']],
      body: `<h1>🏠 Home gym workouts: functional trainer, Smith machine and dumbbells</h1>
<p class="lead">Many workout plans assume a commercial gym. If you train at home with a functional trainer (two cable towers), a Smith machine and dumbbells, here is how to do each gym exercise with what you have.</p>
<section class="card"><table><thead><tr><th>Gym exercise</th><th>Home version</th></tr></thead><tbody>
${variants.map(({ id, v }) => `<tr><td>${exLink(id)}</td><td>${exLinkName(v.name)}</td></tr>`).join('')}
</tbody></table></section>
<h2>Safety first on a Smith machine</h2>
<p>Always set the safety stoppers before you start, just above the lowest point the bar should reach. Twist the bar to unhook and hook it, and start light: the bar and attachments already weigh something.</p>
${cta('Get workouts that match your equipment')}
<p class="small">In KinFit, choose <b>Me → My equipment → Ironax home gym</b> (or tick what you have) and every workout switches to these versions automatically.</p>`,
    }));
  }

  // ---------- Exercise index ----------
  {
    const groups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs', 'Glutes', 'Heart'];
    const inGroup = (ex, f) => ex.m.some(m => m === f || (f === 'Arms' && /Biceps|Triceps|Forearms|Arms/.test(m)) || (f === 'Legs' && /Legs|Quads|Hamstrings|Calves/.test(m)) || (f === 'Core' && /Core|Abs|Obliqu/.test(m)) || (f === 'Shoulders' && /Shoulders/.test(m)) || (f === 'Heart' && /Heart|Cardio|Whole/.test(m)));
    const url = '/exercises/';
    add(url, page({
      url,
      title: `Exercise library: ${ids.length} exercises with step-by-step instructions | KinFit`,
      desc: `Free exercise library: ${ids.length} bodyweight, dumbbell, cable and barbell exercises with steps, muscles worked and form tips. Grouped by chest, back, legs, core and more.`,
      crumbs: [['Exercises']],
      body: `<h1>📚 Exercise library</h1><p class="lead">${ids.length} exercises, from no-equipment moves for beginners to barbell lifts. Each has simple steps and a form tip.</p>
${groups.map(g => { const list = ids.filter(id => inGroup(D.EX[id], g)).sort((a, b) => D.EX[a].name.localeCompare(D.EX[b].name)); return list.length ? `<section class="card"><h2>${esc(g)}</h2><ul class="exl">${list.map(id => exItem(D, id)).join('')}</ul></section>` : ''; }).join('')}
<section class="card"><h2>Home gym versions</h2><ul>${variants.map(({ v }) => `<li>${exLinkName(v.name)}</li>`).join('')}</ul></section>`,
    }));
  }

  // ---------- Hub ----------
  {
    const url = '/workouts';
    add(url, page({
      url,
      title: 'Free workout plans for beginners, intermediate and expert | KinFit',
      desc: 'Free weekly workout plans for every level, sport workouts for cricket, soccer, swimming, running and basketball, a home gym guide and an exercise library.',
      body: `<h1>Free workout plans for every level</h1>
<p class="lead">Simple weekly plans for the whole family, from no-equipment beginner workouts to barbell training. Pick a plan, or let the 5-question quiz in the app choose for you.</p>
<div class="grid">${levels.map(L => { const V = D.LEVELS[L]; return `<a class="card tile" style="--c:${LEVEL_COLOR[L]};--cd:${DARK[LEVEL_COLOR[L]]}" href="/plans/${L}"><span class="big">${V.emoji}</span><b>${esc(V.name)} plan</b><span class="small">${esc(V.tagline)}</span></a>`; }).join('')}</div>
<h2>Workouts for sports</h2><div class="grid">${D.SPORTS.map(s => `<a class="card tile" href="/plans/${s.id}-workout"><span class="big">${s.e}</span><b>${esc(s.name)}</b><span class="small">${esc(s.sub)}</span></a>`).join('')}</div>
<h2>Why KinFit?</h2>
<ul class="why"><li>✅ <b>Free</b>, with no sign-up and no ads</li><li>👨‍👩‍👧 <b>Made for families</b>: profiles for everyone, high-fives and a family leader</li><li>🧒 <b>Safe for kids</b>: bodyweight start, child profiles and a parent PIN</li><li>🏠 <b>Fits your equipment</b>: exercises adapt to what you have at home</li><li>⏱️ <b>Guided</b>: rest timers, countdowns, moving drawings and a friendly AI coach</li><li>🔒 <b>Private</b>: your data stays on your phone and it works offline</li></ul>
<p class="small"><a href="/about">More about KinFit</a></p>
<h2>Guides</h2><ul><li><a href="/guides/home-gym-functional-trainer">Home gym workouts with a functional trainer, Smith machine and dumbbells</a></li><li><a href="/exercises/">Exercise library (${ids.length} exercises)</a></li></ul>
${cta('Open KinFit free')}`,
    }));
  }

  // ---------- Sitemap ----------
  const urls = ['/', '/about', '/privacy', ...Object.keys(out).sort()];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`;

  const files = { 'sitemap.xml': sitemap };
  Object.entries(out).forEach(([u, html]) => { files[u.endsWith('/') ? u.slice(1) + 'index.html' : u.slice(1) + '.html'] = html; });
  return files;
}

module.exports = { build };
