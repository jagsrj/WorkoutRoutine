/* KinFit · Muscle recovery: how rested each muscle is, based on recent sets, effort and activities.
   Used by the Today screen ("your legs are still recovering, try Upper B instead"), the
   Muscle power card (Ready tab) and the workout builder (skips tired muscles when it can). */

// Hours a muscle needs to fully recover from a hard session. Big muscles take longer.
const RECOVER_H={quads:72,hams:72,glutes:72,lowerback:72,upperback:60,chest:60,shoulders:48,biceps:48,triceps:48,forearms:36,abs:36,calves:36};
const TIRED_AT=10;   // about 10 hard sets on a muscle right now = fully tired
const READY=.7,TIRED=.4;
// Sports and activities: which muscles they work, per 10 minutes, in "sets".
const ACT_LOAD={Run:{quads:.6,hams:.6,calves:.8,glutes:.4},Walk:{calves:.2},Bike:{quads:.6,glutes:.3},Swim:{upperback:.5,shoulders:.5},
  Soccer:{quads:.6,hams:.6,calves:.6},Basketball:{quads:.6,calves:.7},Cricket:{shoulders:.3,quads:.3},Tennis:{shoulders:.4,quads:.4,calves:.4},
  Pickleball:{quads:.3,calves:.3},Dance:{quads:.3,calves:.4},'Martial arts':{quads:.4,abs:.3},Intervals:{quads:.4,abs:.2}};

// Each muscle's tiredness (in sets) at time `now`.
function muscleFatigue(now=Date.now(),j=getJournal()){
  const out={},from=now-4*864e5;
  const add=(k,sets,t)=>{const h=(now-t)/36e5,left=1-h/(RECOVER_H[k]||48);if(h>=0&&left>0)out[k]=(out[k]||0)+sets*left};
  Object.keys(j).forEach(d=>{const day=parseIso(d).getTime();if(day<from-864e5)return;
    j[d].forEach(e=>{
      const t=e.u&&e.u<=now?e.u:day+18*36e5;if(t<from)return;
      if(e.kind==='activity'){const L=ACT_LOAD[e.act];if(L)Object.keys(L).forEach(k=>add(k,L[k]*(e.minutes||0)/10,t));return}
      const ex=EX[exByName(e.exercise)];if(!ex)return;
      const ws=workSets(e.sets);if(!ws.length)return;
      const rpe=ws.filter(s=>s.rpe).map(s=>s.rpe),hard=rpe.length?rpe.reduce((a,b)=>a+b,0)/rpe.length>=9:false;
      const n=ws.length*(e.effort===3?1.3:e.effort===1?.8:1)*(hard?1.15:1);
      (ex.m||[]).forEach((m,i)=>(MUSCLE_KEYS[m]||[]).forEach(k=>add(k,n*(i===0?1:.5),t)));
    })});
  return out;
}
// 0 (very tired) … 1 (fully rested) for every muscle.
function muscleReady(now=Date.now(),j){
  const f=muscleFatigue(now,j),out={};
  Object.keys(RECOVER_H).forEach(k=>out[k]=Math.max(0,1-(f[k]||0)/TIRED_AT));
  return out;
}
// Hours until a muscle is ready again (0 if ready now).
function hoursUntilReady(k){
  const j=getJournal();
  for(let h=0;h<=96;h+=3)if(muscleReady(Date.now()+h*36e5,j)[k]>=READY)return h;
  return 96;
}
// The main muscles a list of plan items works (first muscle of each exercise).
const planMuscles=plan=>[...new Set(plan.flatMap(p=>{const ex=EX[p[0]];return ex?(MUSCLE_KEYS[ex.m[0]]||[]):[]}))];
const planReadiness=(plan,R)=>{const ks=planMuscles(plan);return ks.length?Math.min(...ks.map(k=>R[k]??1)):1};
const muscleList=ks=>{const n=ks.map(k=>MUSCLE_LABEL[k].toLowerCase());return n.length>1?n.slice(0,-1).join(', ')+' and '+n[n.length-1]:n[0]||''};

// Today: if today's workout hits muscles that are still tired, say so and offer a fresher workout.
function recoveryCard(schedKey){
  if(todayHidden('recovery')||!(schedKey in WORKOUTS))return '';
  const R=muscleReady(),plan=phasePlan(PLANS[profile.level][schedKey]);
  const tired=planMuscles(plan).filter(k=>R[k]<TIRED);
  if(!tired.length)return '';
  const alt=Object.keys(WORKOUTS).filter(k=>k!==schedKey).map(k=>({k,r:planReadiness(phasePlan(PLANS[profile.level][k]),R)}))
    .filter(x=>x.r>=READY).sort((a,b)=>b.r-a.r)[0];
  const hrs=Math.max(...tired.map(hoursUntilReady)),when=hrs<=12?'later today':hrs<=30?'tomorrow':'in a couple of days';
  return `<div class="card stack recov-card"><p style="font-weight:800">😴 Your ${esc(muscleList(tired))} ${tired.length>1||/s$/.test(MUSCLE_LABEL[tired[0]])?'are':'is'} still recovering</p>
    <p class="small muted">Muscles get stronger while they rest. They should feel ready ${when}.</p>
    ${alt?`<button class="btn sm" data-start="${alt.k}" style="width:100%">Do ${WORKOUTS[alt.k].e} ${esc(WORKOUTS[alt.k].name)} instead ▶</button>`
      :`<button class="btn sm ghost-light" data-stretch="mob" style="width:100%">🧘 Do stretch & mobility instead</button>`}
    <p class="small muted">Feeling good? You can still do today's workout. Use a little less weight and stop if anything hurts.</p></div>`;
}
// Muscle power card, "Ready" tab: tiredness per muscle (higher = more tired).
function readyRows(){
  const R=muscleReady();
  return Object.keys(MUSCLE_NAMES).map(k=>[k,R[k]]).filter(r=>r[1]<.999).sort((a,b)=>a[1]-b[1]);
}
const readyText=r=>r>=READY?'✅ Ready':r>=TIRED?'🟡 Recovering':'😴 Tired';
