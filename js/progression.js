/* KinFit · Smarter progression: plateau alerts, weekly sets per muscle, and suggested weights.
   - Plateau: an exercise whose best estimated 1-rep max (or best reps, for bodyweight moves) hasn't gone up
     in the last 3 sessions. The fix offered is a lighter week (about 10% less), a harder version, or a swap.
   - Weekly sets: hard sets per muscle over the last 7 days (main muscle = 1 set, helpers = ½), compared with
     a range for the person's level. Under the range = needs more, over it = too much to recover from.
   - Suggested weight: worked out from recent sessions for today's rep range, never more than one small
     step above the last top weight. */

const PLATEAU_N=3;
// Smallest sensible weight jump for this weight and unit (dumbbells go up in small steps).
const weightStep=w=>profile.unit==='kg'?(w<10?1:2.5):(w<20?2.5:5);
const roundW=w=>{const s=weightStep(w);return Math.max(s,Math.round(w/s)*s)};
const isoDaysAgo=n=>{const d=new Date();d.setDate(d.getDate()-n);return isoLocal(d)};

// One exercise's sessions, oldest first: best est. 1-rep max, top weight (in the person's unit) and best reps.
function exSessions(name,j=getJournal()){
  const out=[];
  Object.keys(j).sort().forEach(d=>{const es=j[d].filter(e=>e.exercise===name&&e.kind!=='activity');if(!es.length)return;
    let er=0,w=0,r=0;
    es.forEach(e=>workSets(e.sets).forEach(s=>{const sw=toUnit(Number(s.weight)||0,e.unit),sr=Number(s.reps)||0;er=Math.max(er,e1rm(sw,sr));w=Math.max(w,sw);r=Math.max(r,sr)}));
    if(w||r)out.push({d,er,w,r})});
  return out;
}
// Is this exercise stuck? Needs 4+ sessions in the last 10 weeks, the latest within 3 weeks.
function plateauOf(name,j=getJournal()){
  const id=exByName(name),ex=EX[id];if(!ex)return null;
  const S=exSessions(name,j).filter(s=>s.d>=isoDaysAgo(70));
  if(S.length<PLATEAU_N+1||S[S.length-1].d<isoDaysAgo(21))return null;
  const weighted=!!ex.weight&&S.some(s=>s.w>0),score=s=>weighted?s.er:s.r;
  const recent=S.slice(-PLATEAU_N),before=Math.max(...S.slice(0,-PLATEAU_N).map(score)),now=Math.max(...recent.map(score));
  if(!(before>0)||now>before*1.01)return null;
  const last=recent[recent.length-1],alt=(ALT[id]||[]).find(x=>EX[x]&&x!==id);
  return {id,name,weighted,since:recent[0].d,w:last.w,deload:weighted&&last.w>0?roundW(last.w*.9):0,alt:alt?EX[alt].name:null};
}
function plateaus(){
  const j=getJournal(),names=new Set();
  Object.keys(j).filter(d=>d>=isoDaysAgo(21)).forEach(d=>j[d].forEach(e=>{if(e.kind!=='activity')names.add(e.exercise)}));
  return [...names].map(n=>plateauOf(n,j)).filter(Boolean);
}
const plateauFix=pl=>pl.weighted
  ?`Try a lighter week: <b>${pl.deload} ${profile.unit}</b> with perfect, slow reps, then build back up.${pl.alt?` Or swap to ${esc(pl.alt)} for a few weeks.`:''}`
  :`Try a harder version, lower slowly for 3 seconds on every rep, or add a set.${pl.alt?` Or swap to ${esc(pl.alt)}.`:''}`;

// Suggested weight for today, with the reason. p = plan item [id, sets, low reps, high reps].
function suggestWeight(id,p){
  const ex=EX[id];if(!ex||!ex.weight)return null;
  const S=exSessions(ex.name).filter(s=>s.w>0).slice(-3);
  if(!S.length){const m=String(ex.start||'').match(/([\d.]+)\s*(lbs|kg)/);return m?{w:roundW(toUnit(+m[1],m[2])),why:'a starting weight. Go lighter if your form wobbles'}:null}
  const last=S[S.length-1],pl=plateauOf(ex.name);
  if(pl&&pl.deload)return {w:pl.deload,why:'a lighter week to break your plateau',plateau:true};
  const ls=lastSession(ex.name),main=ls?ls.sets.filter(s=>!s.t||s.t==='f'):[];
  if(p&&main.length>=p[1]&&main.every(s=>s.reps>=p[3]))return {w:roundW(last.w+weightStep(last.w)),why:`you hit ${p[3]} reps on every set last time`};
  const target=p?Math.min(p[2]+2,p[3]):10,best=Math.max(...S.map(s=>s.er));
  let w=roundW(best/(1+Math.min(target,12)/30));
  w=Math.min(w,roundW(last.w+weightStep(last.w)));w=Math.max(w,roundW(last.w*.8));
  return {w,why:`your last ${plural(S.length,'session')}, for ${p?(p[2]===p[3]?p[2]:p[2]+'–'+p[3]):'8–12'} reps`};
}

/* ---------- Weekly sets per muscle (last 7 days) ---------- */
const SET_RANGE={beginner:[6,15],intermediate:[10,20],expert:[10,22]};
const MAJOR=['chest','upperback','shoulders','quads','hams','glutes','biceps','triceps','abs','calves'];
function weeklySets(j=getJournal()){
  const from=isoDaysAgo(6),out={};
  Object.keys(j).filter(d=>d>=from).forEach(d=>j[d].forEach(e=>{if(e.kind==='activity')return;
    const ex=EX[exByName(e.exercise)];if(!ex)return;const n=workSets(e.sets).length;if(!n)return;
    const main=new Set(MUSCLE_KEYS[ex.m[0]]||[]),help=new Set(ex.m.slice(1).flatMap(m=>MUSCLE_KEYS[m]||[]).filter(k=>!main.has(k)));
    main.forEach(k=>out[k]=(out[k]||0)+n);help.forEach(k=>out[k]=(out[k]||0)+n/2)}));
  Object.keys(out).forEach(k=>out[k]=Math.round(out[k]*2)/2);
  return out;
}
const setStatus=(n,[lo,hi])=>n<lo?{t:'Needs more',c:'var(--warn)'}:n>hi?{t:'Too much',c:'var(--bad)'}:{t:'Growing ✅',c:'var(--ok)'};
function weeklySetsCard(){
  const S=weeklySets(),R=SET_RANGE[profile.level]||SET_RANGE.beginner;
  if(!Object.keys(S).length)return '';
  const keys=[...new Set([...MAJOR,...Object.keys(S).filter(k=>S[k]>0)])],max=R[1]+6;
  return `<div class="card stack" id="wscard"><div class="row between"><h2 class="h3">📊 Sets per muscle</h2><span class="small muted" style="font-weight:700">Last 7 days</span></div>
    <p class="small muted">The sweet spot for ${lvl().name} is about <b>${R[0]}–${R[1]} hard sets</b> per muscle a week. Main muscle = 1 set, helper muscles = ½.</p>
    <div class="stack" style="gap:8px">${keys.map(k=>{const n=S[k]||0,st=setStatus(n,R);return `<div><div class="row between small"><b>${MUSCLE_LABEL[k]}</b><span>${n} <span style="color:${st.c};font-weight:800">· ${st.t}</span></span></div>
      <div class="wsbar"><span class="wszone" style="left:${R[0]/max*100}%;width:${(R[1]-R[0])/max*100}%"></span><i style="width:${Math.min(100,n/max*100)}%;background:${st.c}"></i></div></div>`}).join('')}</div>
    <p class="small muted">Shaded = the sweet spot. Too few sets and a muscle won't grow much; too many and it can't recover in time.</p></div>`;
}
function plateauCard(){
  const P=plateaus();
  if(!P.length)return '';
  return `<div class="card stack"><h2 class="h3">📉 Plateau check</h2><p class="small muted">These haven't improved in your last ${PLATEAU_N} sessions. Totally normal! A small change usually gets you moving again.</p>
    ${P.map(pl=>`<div class="pwarn small"><b>${esc(pl.name)}</b>${pl.weighted&&pl.w?` · stuck around ${round1(pl.w)} ${profile.unit}`:''}<br>${plateauFix(pl)}</div>`).join('')}</div>`;
}
