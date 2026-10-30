/* KinFit · Onboarding, Today, guided timer, workout, rest timer and Progress screens. */
/* ---------- Onboarding ---------- */
let ob={step:0,answers:[],name:'',avatar:'🙂'};
function renderOnboard(v){
  const s=ob.step,canCancel=(ob.mode==='add'||ob.mode==='retake')&&profile.id;
  const cancel=canCancel?`<button class="link" id="cancelob">Cancel</button>`:'';
  if(s===0){
    v.innerHTML=`${topbar()}
    <div class="stack-lg" style="padding-top:20px">
      <div class="center"><div style="font-size:72px">🏋️‍♀️</div><h1 style="margin-top:10px">Get stronger,<br>one step at a time</h1>
      <p class="muted" style="margin-top:10px">Easy-to-follow workouts for <b>Beginner</b>, <b>Intermediate</b> and <b>Expert</b>. We'll help you pick the right one.</p></div>
      <div class="stack">
        <div class="card row"><span class="big-emoji">🧭</span><div><b>Find your level</b><p class="muted small">5 quick questions</p></div></div>
        <div class="card row"><span class="big-emoji">✅</span><div><b>Follow the plan</b><p class="muted small">Tap ✓ after each set and we'll time your rest</p></div></div>
        <div class="card row"><span class="big-emoji">🏅</span><div><b>Earn badges</b><p class="muted small">Watch yourself get stronger every week</p></div></div>
      </div>
      <button class="btn" id="start">Let's go! 🚀</button>
      <button class="btn ghost" id="pick">I already know my level</button>
      <p class="small muted center">🔒 Your workouts stay on your phone. <a href="privacy.html" style="color:var(--lvl-text)">Privacy</a> · <a href="about.html" style="color:var(--lvl-text)">About</a></p>
      <button class="link" id="joinsync" style="width:100%">☁️ Used KinFit before? Restore with your recovery code</button>
    </div>`;
    $('#joinsync').onclick=()=>joinSheet();
    $('#start').onclick=()=>{ob.step=1;render()};
    $('#pick').onclick=()=>{ob.step=1;ob.skipQuiz=true;render()};
    return;
  }
  if(s===1){
    v.innerHTML=`${topbar(cancel)}<div class="stack-lg" style="padding-top:20px">
      <div><p class="small muted" style="font-weight:700;margin-bottom:8px">WHO IS THIS FOR?</p><div class="seg"><button class="${ob.kid?'':'on'}" data-kid="0" aria-pressed="${!ob.kid}">🙋 Me</button><button class="${ob.kid?'on':''}" data-kid="1" aria-pressed="${!!ob.kid}">🧒 My child</button></div></div>
      <div><h1>${ob.kid?"What's your child's name? 👋":ob.mode==='add'?'Who is joining? 👋':'What should we call you? 👋'}</h1><p class="muted" style="margin-top:8px">${ob.kid?'A first name or nickname is perfect. You\'ll answer a few questions for them next.':'A first name or nickname is perfect.'}</p></div>
      <input class="txt" id="nm" maxlength="24" placeholder="Name" value="${esc(ob.name)}" autocomplete="off">
      <div><p class="small muted" style="font-weight:700;margin-bottom:8px">PICK A BUDDY</p><div class="avatars">${AVATARS.map(a=>`<button class="${a===ob.avatar?'sel':''}" data-a="${a}">${a}</button>`).join('')}</div></div>
      <button class="btn" id="next">Next</button></div>`;
    v.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ob.avatar=b.dataset.a;ob.name=$('#nm').value;renderOnboard(v)});
    v.querySelectorAll('[data-kid]').forEach(b=>b.onclick=()=>{ob.kid=b.dataset.kid==='1';ob.name=$('#nm').value;renderOnboard(v)});
    const next=()=>{ob.name=$('#nm').value.trim();ob.answers=[];ob.step=ob.skipQuiz?99:2;render()};
    $('#next').onclick=next;$('#nm').onkeydown=e=>{if(e.key==='Enter')next()};
    if($('#cancelob'))$('#cancelob').onclick=()=>go('me');
    return;
  }
  if(s>=2&&s<2+QUIZ.length){
    const i=s-2,Q=QUIZ[i];
    v.innerHTML=`${topbar(`<button class="link" id="back">← Back</button>`)}
    <div class="stack-lg">
      <div class="dots">${QUIZ.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div><p class="muted small" style="font-weight:700">QUESTION ${i+1} OF ${QUIZ.length}${ob.kid?` · ANSWER FOR ${esc((ob.name||'YOUR CHILD').toUpperCase())}`:''}</p><h1 style="margin-top:6px">${Q.q}</h1>${Q.note?`<p class="muted small" style="margin-top:8px">${Q.note}</p>`:''}</div>
      <div class="stack">${Q.a.map((a,k)=>`<button class="opt ${ob.answers[i]===k?'sel':''}" data-k="${k}"><span class="e">${a[0]}</span>${a[1]}</button>`).join('')}</div>
    </div>`;
    v.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ob.answers[i]=+b.dataset.k;b.classList.add('sel');setTimeout(()=>{ob.step++;render()},180)});
    $('#back').onclick=()=>{if(i===0&&ob.mode==='retake')return go('me');ob.step--;render()};
    return;
  }
  if(s===2+QUIZ.length){
    const {level,reason}=scoreQuiz();
    const L=LEVELS[level];
    v.innerHTML=`${topbar(cancel)}<div class="stack-lg" style="padding-top:10px">
      <div class="center"><div style="font-size:64px">${L.emoji}</div><p class="muted" style="font-weight:700;margin-top:6px">WE RECOMMEND</p><h1 style="color:${L.color};font-size:36px">${L.name}</h1>
      <p class="muted" style="margin-top:8px">${reason}</p></div>
      ${levelCard(level,true)}
      <button class="btn" style="background:${L.color}" id="ok">Start ${L.name} ${L.emoji}</button>
      <button class="btn ghost" id="other">Choose a different level</button></div>`;
    $('#ok').onclick=()=>finishOnboard(level);
    $('#other').onclick=()=>{ob.rec=level;ob.step=99;render()};
    if($('#cancelob'))$('#cancelob').onclick=()=>go('me');
    return;
  }
  v.innerHTML=`${topbar(`<button class="link" id="back">← Back</button>`)}<div class="stack-lg">
    <div><h1>Pick a level</h1><p class="muted" style="margin-top:8px">Not sure? Choose <b>Beginner</b>. You can move up anytime.</p></div>
    <div class="stack">${Object.keys(LEVELS).map(k=>`<button class="lvl" data-l="${k}" style="--c:${LEVELS[k].color};--cd:${LEVELS[k].dark}">${levelInner(k)}${ob.rec===k?'<p class="small" style="margin-top:8px;font-weight:700;color:var(--cc,var(--c))">⭐ Recommended for you</p>':''}</button>`).join('')}</div></div>`;
  v.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>finishOnboard(b.dataset.l));
  $('#back').onclick=()=>{ob.step=ob.rec?2+QUIZ.length:1;render()};
}
function scoreQuiz(){
  const a=ob.answers;const score=[0,1,2,3].reduce((s,i)=>s+(QUIZ[i].a[a[i]]?.[2]||0),0);
  let level=score<=2?'beginner':score<=5?'intermediate':'expert';
  let reason=level==='beginner'?'The perfect place to learn great form and build a strong base.':level==='intermediate'?'You have a good base. Time to add dumbbells and machines.':'You are experienced. Barbells and bigger lifts are next.';
  const age=a[4];
  if(age===0&&level!=='beginner'){level='beginner';reason='Under 13? Bodyweight training is the safest and best way to get strong. Ask an adult to help you check your form.'}
  else if(age===1&&level==='expert'){level='intermediate';reason='You are strong! Under 18, stick with dumbbells and machines unless a coach is watching your barbell lifts.'}
  else if(age===1)reason+=' Train with an adult or coach nearby when using weights.';
  return {level,reason};
}
function levelInner(k){const L=LEVELS[k];return `<div class="t"><span style="font-size:28px">${L.emoji}</span>${L.name}</div>
  <p style="margin-top:4px;font-weight:600">${L.tagline}</p><p class="muted small" style="margin-top:2px">🧰 ${L.equipment}</p>
  <p class="small" style="margin-top:10px;font-weight:700">Choose this if:</p><ul>${L.who.map(w=>`<li>${w}</li>`).join('')}</ul>`}
function levelCard(k,sel){return `<div class="lvl ${sel?'sel':''}" style="--c:${LEVELS[k].color};--cd:${LEVELS[k].dark}">${levelInner(k)}</div>`}
function finishOnboard(level){
  if(ob.mode==='retake'&&profile.id){profile.level=level;saveProfile();store.del(pKey('jams_active'))}
  else{
    const id=newPid();if(!DB.list.length&&!DB.legacyId)DB.legacyId=id; // first person adopts any older history
    profile=Object.assign({},DEFAULT_P,{id,name:ob.name,avatar:ob.avatar||'🙂',level,unit:profile.unit||'lbs'},ob.kid?{kid:true}:{});
    DB.current=id;saveProfile();chat=store.get(pKey('jams_chat'),[]);libLevel=null;chartEx=null;
    if(!syncCfg.code)autoBackup();
  }
  ob={step:0,answers:[],name:'',avatar:'🙂'};
  go('today');toast(`${LEVELS[level].emoji} ${profile.name||'You'}: ${LEVELS[level].name}. Let's do this!`);
}

/* ---------- Today ---------- */
function renderToday(v){
  const now=new Date(),dow=now.getDay(),sched=SCHEDULE[dow];
  const doneDates=new Set(workoutDates());
  const ws=weekStart(now);
  const strip=[1,2,3,4,5,6,0].map((d,i)=>{const dt=new Date(ws);dt.setDate(ws.getDate()+i);const s=SCHEDULE[d];
    const e=s.k in WORKOUTS?WORKOUTS[s.k].e:s.e;
    return `<div class="day ${d===dow?'today':''} ${doneDates.has(isoLocal(dt))?'done':''}"><b>${DAYS[d]}</b>${dt.getDate()}<span class="e">${e}</span></div>`}).join('');
  const active=store.get(pKey('jams_active'),null);
  const isWork=sched.k in WORKOUTS;
  const doneToday=doneDates.has(isoLocal());
  let heroHtml;
  if(active&&active.level===profile.level){
    const W=WORKOUTS[active.key]||{name:active.title,e:active.emoji};
    heroHtml=`<div class="card hero stack"><p class="muted" style="font-weight:700">⏸️ WORKOUT IN PROGRESS</p><h2>${esc(W.e)} ${esc(W.name)}</h2><button class="btn" data-start="${active.key}">Continue workout</button></div>`;
  }else if(isWork){
    const W=WORKOUTS[sched.k],plan=phasePlan(PLANS[profile.level][sched.k]);
    const mins=Math.round(plan.reduce((s,p)=>s+p[1],0)*(restSecs()+45)/60)+5;
    heroHtml=`<div class="card hero stack">
      <p class="muted" style="font-weight:700">${doneToday?'✅ DONE FOR TODAY. NICE!':"TODAY'S WORKOUT"}</p>
      <div class="row"><span class="big-emoji">${W.e}</span><div><h2>${W.name}</h2><p class="muted">${W.sub} · ${plan.length} exercises · ~${mins} min</p></div></div>
      <button class="btn" data-start="${sched.k}">${doneToday?'Do it again':'Start workout ▶'}</button></div>`;
  }else{
    heroHtml=`<div class="card hero stack"><div class="row"><span class="big-emoji">${sched.e}</span><div><h2>${sched.label}</h2><p class="muted">${sched.note}</p></div></div>
      <button class="btn" id="warmonly">Do the 5-min warm-up 🤸</button><button class="btn ghost-light" data-stretch="mob">🧘 10-min stretch & mobility</button></div>`;
  }
  const others=Object.keys(WORKOUTS).filter(k=>k!==sched.k).map(k=>{const W=WORKOUTS[k];
    return `<button class="card row" data-start="${k}" style="width:100%;text-align:left;padding:14px"><span class="ex-emoji">${W.e}</span><div style="flex:1"><b>${W.name}</b><p class="muted small">${W.sub}</p></div><span class="muted">›</span></button>`}).join('');
  const earned=earnedBadges().length;
  v.innerHTML=`${topbar(levelPill())}
  <div class="stack-lg">
    <div><h1>${hello()}${profile.name?', '+esc(profile.name):''}! ${esc(profile.avatar||'👋')}</h1><p class="muted" style="margin-top:4px">${now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</p></div>
    ${fivesCard()}
    ${heroHtml}
    ${backupCard()}
    ${streakCard()}
    ${habitsCard()}
    ${weekCard(strip,earned)}
    <button class="card row" id="logact" style="width:100%;text-align:left;padding:14px"><span class="big-emoji">🏃</span><div style="flex:1"><b>Log a sport or activity</b><p class="muted small">Walks, runs, cricket, soccer… they all count!</p></div><span class="muted" style="font-size:22px" aria-hidden="true">＋</span></button>
    <details class="card fold"><summary><b>${isWork?'Missed a day? Do a different workout':'Want to train anyway?'}</b></summary><div class="stack" style="margin-top:12px">${others}${(profile.routines||[]).map(r=>`<button class="card row" data-start="r:${r.id}" style="width:100%;text-align:left;padding:14px"><span class="ex-emoji">${r.e}</span><div style="flex:1"><b>${esc(r.name)}</b><p class="muted small">⭐ My workout · ${plural(r.items.length,'exercise')}</p></div><span class="muted">›</span></button>`).join('')}<button class="link" id="morew">Build your own or train for a sport ›</button></div></details>
    <div id="photoNudge"></div>
    ${todayHidden('tip')?'':tipOfDay()}
  </div>`;
  v.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startWorkout(b.dataset.start));
  v.querySelectorAll('button[data-go]:not(.streakpill)').forEach(b=>b.onclick=()=>go(b.dataset.go));
  if($('#warmonly'))$('#warmonly').onclick=()=>runWarmup();
  renderPhotoNudge();
  bindFamily(v);bindHabits(v);
  if($('#logact'))$('#logact').onclick=()=>activitySheet();
  if($('#tcust'))$('#tcust').onclick=customizeToday;
  v.querySelectorAll('.wrow[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  if($('#fiveok'))$('#fiveok').onclick=()=>{profile.fivesSeen=Date.now();saveProfile();render()};
  if($('#morew'))$('#morew').onclick=()=>{libTab='mine';go('library')};
  bindBackup();
  maybeTour();
  checkChallenge();checkGoals();
}
const TIPS=['💧 Drink water before, during and after your workout.','🔥 Warm up for 5 minutes first. Try the guided warm-up!','🐢 Slow and controlled beats fast and sloppy.','😴 Sleep is when your muscles get stronger. Aim for 8–10 hours if you are a kid or teen.','🛑 Sore muscles are normal. Sharp pain is not. Stop and tell an adult.','🎯 Good form first. Add weight or reps only when the moves look and feel right.','🗣️ Breathe out when you push or lift. Never hold your breath.'];
function tipOfDay(){const t=TIPS[new Date().getDate()%TIPS.length];return `<div class="card"><p class="small muted" style="font-weight:700">TIP OF THE DAY</p><p style="margin-top:4px">${t}</p></div>`}

/* ---------- Guided runner (warm-up & timed exercises) ---------- */
let runner=null;
function runSequence(steps,opts={}){
  const st={i:0,end:0,left:steps[0].s,paused:false,started:Date.now(),stepStart:Date.now(),int:null,lock:null};runner=st;
  try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(l=>st.lock=l).catch(()=>{})}catch(e){}
  const close=(finished)=>{clearInterval(st.int);try{st.lock&&st.lock.release()}catch(e){}runner=null;closeLayer();if(finished&&opts.onFinish)opts.onFinish(st);else if(!finished&&opts.onStop)opts.onStop(st)};
  const draw=()=>{
    const s=steps[st.i],total=s.s,frac=Math.max(0,st.left)/total,R=88,C=2*Math.PI*R;
    $('#layer').innerHTML=`<div class="runner"><div class="runner-in stack-lg center">
      <div class="row between"><button class="link" id="rx">✕ ${opts.closeText||'Close'}</button><span class="small muted" style="font-weight:700">${steps.length>1?`STEP ${st.i+1} OF ${steps.length}`:''}</span></div>
      <div class="runner-fig">${s.ready?'<div style="font-size:84px">⏱️</div>':s.fig?figSvg(s.fig,'fig big'):`<div style="font-size:84px">${s.e||'💪'}</div>`}</div>
      <div><h1>${esc(s.n)}</h1>${s.tip?`<p class="muted" style="margin-top:6px">${esc(s.tip)}</p>`:''}</div>
      <div class="ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="${R}" stroke="var(--line)" stroke-width="14" fill="none"/><circle id="arc" cx="100" cy="100" r="${R}" stroke="var(--lvl-text)" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-frac)}" transform="rotate(-90 100 100)"/></svg><div class="ring-t" id="rt">${Math.ceil(st.left)}</div></div>
      <div class="row" style="justify-content:center;gap:12px">
        ${steps.length>1?`<button class="btn sm ghost" id="rprev" ${st.i?'':'disabled'}>⏮</button>`:''}
        <button class="btn sm" id="rpause" style="min-width:120px">${st.paused?'▶ Go':'⏸ Pause'}</button>
        ${opts.doneBtn&&!s.ready?`<button class="btn sm secondary" id="rdone">✓ Done</button>`:`<button class="btn sm ghost" id="rnext">⏭ Skip</button>`}
      </div></div></div>`;
    $('#rx').onclick=()=>close(false);
    $('#rpause').onclick=()=>{st.paused=!st.paused;if(!st.paused)st.end=Date.now()+st.left*1000;draw()};
    if($('#rnext'))$('#rnext').onclick=()=>next();
    if($('#rprev'))$('#rprev').onclick=()=>{st.i=Math.max(0,st.i-1);begin()};
    if($('#rdone'))$('#rdone').onclick=()=>{st.stoppedAt=Math.round((Date.now()-st.stepStart)/1000);close(true)};
  };
  const begin=()=>{st.left=steps[st.i].s;st.end=Date.now()+st.left*1000;st.stepStart=Date.now();st.paused=false;st.lastC=null;say(steps[st.i].ready?'Get ready':steps[st.i].n);draw()};
  const next=()=>{if(st.i>=steps.length-1){beep();say('Done! Great job.');close(true);return}st.i++;beep(true);begin()};
  st.int=setInterval(()=>{if(st.paused||!$('#rt'))return;st.left=(st.end-Date.now())/1000;{const c=Math.ceil(st.left);if(c<=3&&c>=1&&c!==st.lastC&&steps[st.i].s>5){st.lastC=c;say(String(c))}}
    const s=steps[st.i],R=88,C=2*Math.PI*R;$('#rt').textContent=Math.max(0,Math.ceil(st.left));
    $('#arc').setAttribute('stroke-dashoffset',C*(1-Math.max(0,st.left)/s.s));
    if(st.left<=0)next()},200);
  begin();
}
function runWarmup(onDone){
  runSequence(WARMUP,{closeText:'Stop',onFinish:()=>{profile.warmups=(profile.warmups||0)+1;saveProfile();toast('🔥 Warmed up and ready!');if(onDone)onDone();else showNewBadges()}});
}

/* ---------- Workout ---------- */
function startWorkout(key){
  if(key.includes(':'))return startCustom(key[0],key.slice(2));
  let a=store.get(pKey('jams_active'),null);
  if(!(a&&a.key===key&&a.level===profile.level)){
    if(!profile.planStart){profile.planStart=planStart()||isoLocal();saveProfile()}
    const plan=phasePlan(PLANS[profile.level][key]);
    a={key,level:profile.level,plan,date:isoLocal(),started:Date.now(),items:plan.map(p=>({id:p[0],sets:freshSets(p[0],p[1])}))};
    store.set(pKey('jams_active'),a);say(`Let's go! ${WORKOUTS[key].name}. First up: ${EX[plan[0][0]].name}.`);
  }
  go('workout',key);
}
function freshSets(id,n){
  const ex=EX[id],last=lastSession(ex.name);
  let w='';if(ex.weight&&last){const mx=Math.max(...last.sets.map(s=>s.weight||0));if(mx>0)w=round1(toUnit(mx,last.unit))}
  return Array.from({length:n},()=>({reps:'',weight:w,done:false}));
}
function progressHint(p,ex){
  const last=lastSession(ex.name);if(!last||!last.sets.length)return '';
  const hitTop=last.sets.length>=p[1]&&last.sets.every(s=>s.reps>=p[3]);
  if(!hitTop)return `<div class="hint">📋 Last time: ${last.sets.map(s=>s.reps+(ex.weight&&s.weight?' × '+round1(toUnit(s.weight,last.unit)):'')).join(', ')}. Try to beat it!</div>`;
  if(ex.weight)return `<div class="hint">🚀 You hit ${p[3]} reps on every set last time. Add ${profile.unit==='kg'?'2.5 kg':'5 lbs'} today!</div>`;
  return `<div class="hint">🚀 Crushed it last time! Try ${ex.time?'5 more seconds':'2 more reps'} per set${ex.time?'':' or a harder version'}.</div>`;
}
const howTo=id=>{const ex=EX[id];return `<details class="how"><summary>How to do it</summary><div class="figbox">${figSvg(id,'fig big')}</div><ol>${ex.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="tip">💡 ${esc(ex.tip)}</div>
  <a class="btn sm secondary" style="margin-bottom:12px;text-decoration:none;display:inline-flex" href="${ex.video||YTS(ex.name)}" target="_blank" rel="noopener">▶ Watch a video</a> <button class="btn sm secondary" style="margin-bottom:12px;display:inline-flex" data-say="${id}">🔊 Read aloud</button></details>`};
function renderWorkout(v){
  const a=store.get(pKey('jams_active'),null);if(!a){go('today');return}
  const W=WORKOUTS[a.key]||{name:a.title,e:a.emoji},plan=a.plan||PLANS[a.level][a.key];
  const total=a.items.reduce((s,it)=>s+it.sets.length,0),done=a.items.reduce((s,it)=>s+it.sets.filter(x=>x.done).length,0);
  v.innerHTML=`<div class="topbar"><button class="link" id="back">← Back</button><span class="row" style="gap:6px"><button class="pill" id="voice" aria-label="Voice coach on or off">${voiceOn?'🔊':'🔇'}</button><input type="date" id="wdate" value="${a.date}" max="${isoLocal()}" class="num" style="width:auto;height:40px;font-size:15px;padding:0 10px" aria-label="Workout date"></span></div>
  <div class="stack-lg">
    <div><p class="muted" style="font-weight:700">${esc(profile.avatar)} ${esc(profile.name||'')} · ${lvl().emoji} ${lvl().name.toUpperCase()}</p><h1>${esc(W.e)} ${esc(W.name)}</h1>
      <div class="row" style="margin-top:12px"><div class="progress" style="flex:1"><i style="width:${total?done/total*100:0}%"></i></div><b class="small">${done}/${total} sets</b></div></div>
    ${a.warm?`<div class="card small" style="background:var(--lvl-soft);border:0">✅ <b>Warmed up!</b> Now tap <b>✓</b> after each set.</div>`
      :`<div class="card stack" style="background:var(--lvl-soft);border:0"><p>🔥 <b>Warm up first!</b> 5 easy minutes so your body is ready.</p><button class="btn sm" id="warm" style="width:100%">Start guided warm-up 🤸</button><button class="link" id="skipwarm" style="padding:0">I already warmed up</button></div>`}
    ${a.items.map((it,i)=>{const p=it.p||plan[i],ex=EX[it.id],orig=it.orig||it.id,canSwap=(ALT[orig]||[]).length&&!it.sets.some(s=>s.done);
      const cols=`${ex.weight?'wt':'nowt'}${ex.time?' timed':''}`;return `
    <div class="card ex">
      <div class="ex-head"><div class="ex-emoji">${esc(ex.e)}</div><div style="flex:1"><div class="ex-title">${i+1}. ${esc(ex.name)}</div><div class="target">${repsText(p,ex)}</div>
        <div>${ex.m.map(m=>`<span class="chip">${esc(m)}</span>`).join('')}${ex.start&&!lastSession(ex.name)?`<span class="chip">Start ~${ex.start}</span>`:''}${it.orig?`<span class="chip">🔄 swapped</span>`:''}</div></div></div>
      ${progressHint(p,ex)}
      ${howTo(it.id)}
      <div class="sets">${it.sets.map((s,k)=>`
        <div class="set ${cols} ${s.done?'isdone':''}">
          <div class="n">Set ${k+1}</div>
          <div><label aria-hidden="true">${ex.time?'Seconds':'Reps'}</label><button class="num numbtn" data-pick="${i},${k},reps" aria-label="Set ${k+1} ${ex.time?'seconds':'reps'}: ${s.reps!==''?esc(s.reps):'not set'}. Tap to change">${s.reps!==''?esc(s.reps):`<span class="ph">${p[2]===p[3]?p[2]:p[2]+'–'+p[3]}</span>`}</button></div>
          ${ex.weight?`<div><label><span aria-hidden="true">Weight (${profile.unit})</span>${ex.bar?`<button class="plate-btn" data-plate="${i},${k}" aria-label="Plate calculator">🧮</button>`:''}</label><button class="num numbtn" data-pick="${i},${k},weight" aria-label="Set ${k+1} weight: ${s.weight!==''?esc(s.weight)+' '+profile.unit:'not set'}. Tap to change">${s.weight!==''?esc(s.weight):`<span class="ph">${profile.unit}</span>`}</button></div>`:''}
          ${ex.time?`<button class="check go" data-time="${i},${k}" aria-label="Start ${esc(ex.name)} timer">⏱</button>`:''}
          <button class="check" data-check="${i},${k}" aria-label="Mark set ${k+1} done">✓</button>
        </div>`).join('')}</div>
      ${it.sets.length&&it.sets.every(s=>s.done)?`<div class="effort">${it.effort?`<span class="small">Felt: <b>${EFF[it.effort]}</b></span> <button class="link" data-eff="${i},0">change</button>`:`<p class="small" style="font-weight:700">How did that feel?</p><div class="seg">${[1,2,3].map(n=>`<button data-eff="${i},${n}">${EFF[n]}</button>`).join('')}</div>`}</div>`:''}
      <div class="row between" style="margin-top:8px"><span><button class="link" data-add="${i}">＋ Set</button>${it.sets.length>1?` <button class="link" style="color:var(--muted);margin-left:10px" data-rm="${i}">− Set</button>`:''}</span>${canSwap?`<button class="link" data-swap="${i}">🔄 Swap exercise</button>`:''}</div>
    </div>`}).join('')}
    <button class="btn" id="finish">Finish workout 🎉</button>
    <button class="btn ghost" id="quit">Cancel workout</button>
  </div>`;
  const save=()=>store.set(pKey('jams_active'),a);
  const rerender=()=>{const y=scrollY;renderWorkout(v);scrollTo(0,y)};
  const markDone=(i,k)=>{const allDone=a.items.every(it=>it.sets.every(x=>x.done));if(allDone){hideTimer();toast('All sets done! Tap Finish 🎉');say('All sets done. Amazing work! Tap finish.')}else{nextSay=nextUp(a);say(`Nice! Rest ${restSecs()} seconds.`);startTimer(restSecs())}};
  v.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{
    const [i,k,f]=b.dataset.pick.split(','),it=a.items[+i],s=it.sets[+k],p=it.p||plan[+i],ex=EX[it.id],prev=it.sets[+k-1];
    if(f==='reps')return pickNumber({title:`${esc(ex.name)} · set ${+k+1}`,value:s.reps!==''?s.reps:p[2],step:ex.time?5:1,max:ex.time?900:300,
      quick:[p[2],Math.round((p[2]+p[3])/2),p[3],prev&&prev.reps],unit:(ex.time?'seconds':'reps')+(ex.per?' '+ex.per:'')},val=>{s.reps=val;save();rerender()});
    const st=profile.unit==='kg'?2.5:5,old=s.weight,w=parseFloat(s.weight)||0;
    pickNumber({title:`${esc(ex.name)} · set ${+k+1} weight`,value:s.weight,step:st,max:3000,quick:[prev&&prev.weight,w?round1(w-st):'',w?round1(w+st):''],unit:profile.unit},val=>{
      s.weight=val;it.sets.forEach((x,j)=>{if(j>+k&&!x.done&&(x.weight===''||x.weight===old))x.weight=val});save();rerender()});
  });
  $('#wdate').onchange=e=>{a.date=e.target.value||isoLocal();save()};
  const warmDone=()=>{a.warm=true;save();rerender()};
  if($('#warm'))$('#warm').onclick=()=>runWarmup(warmDone);
  if($('#skipwarm'))$('#skipwarm').onclick=warmDone;
  v.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>{
    const [i,k]=b.dataset.check.split(',').map(Number),s=a.items[i].sets[k],p=a.items[i].p||plan[i];
    if(!s.done&&s.reps==='')s.reps=String(p[2]);
    s.done=!s.done;save();rerender();if(s.done)markDone(i,k);
  });
  v.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{
    const [i,k]=b.dataset.time.split(',').map(Number),it=a.items[i],s=it.sets[k],p=it.p||plan[i],ex=EX[it.id];
    const target=parseInt(s.reps)||p[2];hideTimer();
    runSequence([{n:'Get ready…',s:3,ready:true,tip:ex.name},{n:ex.name+(ex.per?' ('+ex.per+')':''),s:target,fig:it.id,tip:ex.tip}],{doneBtn:true,closeText:'Cancel',
      onFinish:st=>{s.reps=String(st.stoppedAt!=null&&st.i===1?st.stoppedAt:target);s.done=true;save();rerender();markDone(i,k)}});
  });
  v.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const it=a.items[b.dataset.add];const l=it.sets[it.sets.length-1];it.sets.push({reps:'',weight:l?l.weight:'',done:false});save();rerender()});
  v.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{a.items[b.dataset.rm].sets.pop();save();rerender()});
  v.querySelectorAll('[data-swap]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.swap,it=a.items[i],orig=it.orig||it.id,opts=[orig,...ALT[orig]].filter(x=>x!==it.id);
    sheet(`<h2>Swap ${esc(EX[it.id].name)}</h2><p class="muted">Pick another exercise that works the same muscles. Great if it's too hard or you don't have the equipment.</p>
      <div class="stack">${opts.map(id=>{const ex=EX[id];return `<button class="who" data-to="${id}"><span class="av">${esc(ex.e)}</span><span style="flex:1;text-align:left"><b>${esc(ex.name)}</b><br><span class="small muted">${id===orig?'↩️ Back to the original':ex.weight?'Uses weights':'No equipment needed'} · ${ex.m.join(', ')}</span></span></button>`}).join('')}</div>
      <button class="btn ghost" id="cancel">Cancel</button>`,()=>{
      $('#cancel').onclick=closeLayer;
      document.querySelectorAll('[data-to]').forEach(x=>x.onclick=()=>{
        const to=x.dataset.to,base=plan[i];it.id=to;it.orig=to===orig?undefined:orig;
        it.p=to===orig||EX[to].time===EX[orig].time?undefined:[base[1],EX[to].time?20:8,EX[to].time?40:12];
        it.sets=freshSets(to,base[1]);save();closeLayer();rerender();toast(`🔄 Swapped to ${EX[to].name}`)});
    });
  });
  $('#back').onclick=()=>go('today');
  $('#quit').onclick=()=>confirmBox('Cancel this workout?','Sets you have not finished will not be saved.','Yes, cancel',()=>{store.del(pKey('jams_active'));go('today')},true);
  $('#finish').onclick=()=>finishWorkout(a);
  $('#voice').onclick=()=>{voiceOn=!voiceOn;store.set('jams_voice',voiceOn);if(voiceOn)say('Voice coach on');else try{speechSynthesis.cancel()}catch(e){}rerender()};
  v.querySelectorAll('[data-eff]').forEach(b=>b.onclick=()=>{const [i,n]=b.dataset.eff.split(',').map(Number);a.items[i].effort=n||undefined;save();rerender();if(n)say(n===1?'Nice! Next time we can make it harder.':n===3?'Good effort. Keep the same weight next time.':'Perfect.')});
  v.querySelectorAll('[data-plate]').forEach(b=>b.onclick=e=>{e.preventDefault();const [i,k]=b.dataset.plate.split(',').map(Number);platesSheet(parseFloat(a.items[i].sets[k].weight)||(profile.unit==='kg'?60:135))});
}
function finishWorkout(a){
  const j=getJournal(),date=a.date||isoLocal(),before=recordsTable(j),fresh=[];let sets=0,vol=0;
  const time=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  a.items.forEach((it,i)=>{
    const ex=EX[it.id];
    const done=it.sets.filter(s=>s.done).map(s=>({reps:parseInt(s.reps)||0,weight:ex.weight?(parseFloat(s.weight)||0):0})).filter(s=>s.reps>0||s.weight>0);
    if(!done.length)return;
    const en={id:Date.now()+i,exercise:ex.name,timestamp:time,sets:done,unit:profile.unit,level:a.level,workout:a.key,u:Date.now()};if(it.effort)en.effort=it.effort;(j[date]=j[date]||[]).push(en);fresh.push(en);
    sets+=done.length;done.forEach(s=>vol+=s.reps*s.weight);
  });
  if(!sets){toast('Tap ✓ on at least one set first');return}
  setJournal(j);store.del(pKey('jams_active'));hideTimer();
  const mins=Math.max(1,Math.round((Date.now()-a.started)/60000));
  const nb=newBadges(),prs=findPRs(before,fresh),Wd=WORKOUTS[a.key]||{name:a.title,e:a.emoji};lastDone={title:Wd.name,e:Wd.e,sets,mins:Math.max(1,Math.round((Date.now()-a.started)/60000)),prs,badges:nb};
  celebrate(sets,mins,vol,nb,prs);
  syncNow(true);
}
function badgeRow(list){return list.length?`<div class="card stack"><h2 class="h3">🎉 New ${list.length>1?'badges':'badge'}!</h2><div class="badges">${list.map(b=>`<div class="badge-i on"><span>${b.e}</span><b>${b.n}</b></div>`).join('')}</div></div>`:''}
function showNewBadges(){const nb=newBadges();if(nb.length)sheet(`${badgeRow(nb)}<button class="btn" id="ok">Awesome!</button>`,()=>$('#ok').onclick=closeLayer)}
function celebrate(sets,mins,vol,badges,prs=[]){
  const colors=['#16a34a','#ea580c','#7c3aed','#2563eb','#eab308','#ec4899'];
  const conf=Array.from({length:60},(_,i)=>`<i class="confetti" style="left:${Math.random()*100}%;background:${colors[i%6]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s"></i>`).join('');
  const praise=['Amazing work!','You crushed it!','Stronger than yesterday!','Way to go, champ!'][Math.floor(Math.random()*4)];
  $('#layer').innerHTML=`<div class="celebrate">${conf}<div class="stack-lg center" style="max-width:420px;width:100%;position:relative">
    <div style="font-size:84px">🏆</div><h1>${praise}${profile.name?'<br>'+esc(profile.name)+'!':''}</h1>
    <div class="stats"><div class="stat"><b>${sets}</b><span>sets</span></div><div class="stat"><b>${mins}</b><span>${mins===1?'minute':'minutes'}</span></div><div class="stat"><b>${weekStreak()}</b><span>week streak 🔥</span></div></div>
    ${prs.length?`<div class="card stack" style="text-align:left"><h2 class="h3">🏆 New personal ${prs.length>1?'records':'record'}!</h2>${prs.map(p=>`<p>⭐ ${esc(p)}</p>`).join('')}</div>`:''}
    ${badgeRow(badges)}
    ${vol>0?`<p class="muted">You moved <b>${Math.round(vol).toLocaleString()} ${profile.unit}</b> in total! 💪</p>`:'<p class="muted">Every rep makes you stronger. See you next time!</p>'}
    <div class="row" style="gap:8px"><button class="btn secondary" id="cshare" style="flex:1">📤 Share</button><button class="btn secondary" id="ccool" style="flex:1">🧘 Cool-down</button></div>
    <button class="btn" id="done">Done</button></div></div>`;
  $('#done').onclick=()=>{closeLayer();go('progress')};
  $('#cshare').onclick=()=>shareWorkout();
  $('#ccool').onclick=()=>{closeLayer();go('progress');runStretch('cool')};
  say(praise+(prs.length?' And you set a new personal record!':''));
}

/* ---------- Rest timer ---------- */
let timerEnd=0,timerInt=null;
function startTimer(sec){timerEnd=Date.now()+sec*1000;$('#timer').classList.add('show');tick();clearInterval(timerInt);timerInt=setInterval(tick,250)}
function hideTimer(){clearInterval(timerInt);$('#timer').classList.remove('show')}
function tick(){const left=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));$('#timer-t').textContent=`${Math.floor(left/60)}:${pad(left%60)}`;
  if(left===10&&tick.last!==10)say('10 seconds');tick.last=left;
  if(left<=0){hideTimer();beep();toast('⏰ Rest over. Next set!');say(nextSay||'Rest over. Next set!')}}
let audioCtx=null;
// iPhones only allow sound after a tap, so "unlock" audio on the first touch; later beeps (like rest-over) then work.
['touchend','click'].forEach(ev=>document.addEventListener(ev,function unlock(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();
  const b=audioCtx.createBuffer(1,1,22050),src=audioCtx.createBufferSource();src.buffer=b;src.connect(audioCtx.destination);src.start(0)}catch(e){}document.removeEventListener(ev,unlock,true)},true));
function beep(short){try{navigator.vibrate&&navigator.vibrate(short?120:[200,100,200]);audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const c=audioCtx,o=c.createOscillator(),g=c.createGain();o.frequency.value=short?660:880;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.2,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+(short?.25:.6));o.start();o.stop(c.currentTime+.6)}catch(e){}}
$('#timer-add').onclick=()=>{timerEnd+=15000;tick()};
$('#timer-skip').onclick=hideTimer;

/* ---------- Library ---------- */
let libLevel=null;

/* ---------- Progress ---------- */
let chartEx=null;
function renderProgress(v){
  const j=getJournal(),dates=workoutDates(j);
  const totalSets=dates.reduce((s,d)=>s+j[d].reduce((a,e)=>a+(e.sets||[]).length,0),0);
  const names=[...new Set(dates.flatMap(d=>j[d].filter(e=>e.kind!=='activity'&&(e.sets||[]).length).map(e=>e.exercise)))].sort();
  if(!names.includes(chartEx))chartEx=names[0]||null;
  const lvlCount=dates.filter(d=>j[d].some(e=>e.level===profile.level)).length;
  const nextLvl=profile.level==='beginner'?'intermediate':profile.level==='intermediate'?'expert':null;
  const levelUp=nextLvl&&lvlCount>=24?`<div class="card stack" style="border:2px solid ${LEVELS[nextLvl].color}"><h2 class="h3">🎖️ Ready to level up?</h2><p class="muted">You've done ${lvlCount} workouts on ${lvl().name}. If the workouts feel easy and your form is solid, try <b>${LEVELS[nextLvl].name}</b>.</p><button class="btn sm" style="background:${LEVELS[nextLvl].color}" data-go-me>See levels</button></div>`:'';
  const ws=weekStart(new Date()),set=new Set(dates);
  let heat='';for(let w=11;w>=0;w--){let col='';for(let d=0;d<7;d++){const dt=new Date(ws);dt.setDate(ws.getDate()-w*7+d);const on=set.has(isoLocal(dt)),fut=dt>new Date();col+=`<i style="display:block;width:100%;aspect-ratio:1;border-radius:4px;background:${on?'var(--lvl-text)':fut?'transparent':'var(--line)'}"></i>`}heat+=`<div style="display:grid;gap:3px">${col}</div>`}
  const earned=new Set(earnedBadges());
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg">
    <div><h1>Your progress 📈</h1></div>
    <div class="stats"><div class="stat"><b>${dates.length}</b><span>workouts</span></div><div class="stat"><b>${weekStreak()}</b><span>week streak 🔥</span></div><div class="stat"><b>${totalSets}</b><span>sets done</span></div></div>
    <div class="row" style="gap:8px"><button class="btn sm secondary" id="openreport" style="flex:1">📄 Monthly report</button><button class="btn sm secondary" id="shareprog" style="flex:1">📤 Share progress</button></div>
    ${goalsCard()}
    ${challengeCard()}
    ${levelUp}
    ${familyCard()}
    ${activityCard()}
    ${habitsProgressCard()}
    <div class="card stack"><div class="row between"><h2 class="h3">Badges 🏅</h2><span class="small muted" style="font-weight:700">${earned.size} / ${BADGES.length}</span></div>
      <div class="badges">${BADGES.map(b=>`<button class="badge-i ${earned.has(b.id)?'on':''}" data-b="${b.id}"><span>${earned.has(b.id)?b.e:'🔒'}</span><b>${b.n}</b></button>`).join('')}</div>
      <p class="small muted">Tap a badge to see how to earn it.</p></div>
    ${muscleMap()}
    <div class="card stack"><h2 class="h3">Last 12 weeks</h2><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px">${heat}</div><p class="small muted">Each square is a day. Coloured = you worked out. Aim for 3–4 a week!</p></div>
    <div class="card stack"><h2 class="h3">How am I improving?</h2>
      ${names.length?`<select class="sel" id="exsel">${names.map(n=>`<option ${n===chartEx?'selected':''}>${esc(n)}</option>`).join('')}</select><div id="chart"></div>`:`<div class="empty"><div class="big-emoji">🌱</div><p class="muted">Finish your first workout to see your progress chart here.</p></div>`}
    </div>
    ${recordsCard()}
    ${bodyCard()}
    <div id="photos"></div>
    <div class="stack"><h2 class="h3">History</h2>${historyHtml(j,dates)}</div>
  </div>`;
  if(names.length){drawChart();$('#exsel').onchange=e=>{chartEx=e.target.value;drawChart()}}
  renderPhotos();
  bindFamily(v);
  $('#openreport').onclick=()=>{reportMonth=null;go('report')};
  bindGoals(v);checkGoals();checkChallenge();
  $('#shareprog').onclick=shareProgress;
  if($('#logact'))$('#logact').onclick=()=>activitySheet();
  if($('#badd'))$('#badd').onclick=bodySheet;
  v.querySelectorAll('[data-bdel]').forEach(b=>b.onclick=()=>{const before=(profile.body||[]).slice();profile.body=before.filter(x=>x.id!==b.dataset.bdel);saveProfile();renderProgress(v);
    undoable('Measurement deleted',()=>{profile.body=before;saveProfile();renderProgress(v)},()=>syncNow(true))});
  v.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const B=BADGES.find(x=>x.id===b.dataset.b);toast(`${earned.has(B.id)?B.e+' Earned: ':'🔒 To unlock: '}${B.d}`)});
  v.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const [d,id]=b.dataset.del.split('|');
    const jj=getJournal(),entry=(jj[d]||[]).find(e=>String(e.id)===id);if(!entry)return;
    jj[d]=jj[d].filter(e=>String(e.id)!==id);if(!jj[d].length)delete jj[d];setJournal(jj);renderProgress(v);
    undoable(`${entry.exercise} deleted`,()=>{const j2=getJournal();(j2[d]=j2[d]||[]).push(entry);setJournal(j2);renderProgress(v)},()=>{addTomb(id);syncNow(true)})});
  v.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const [d,id]=b.dataset.edit.split('|');editEntry(d,id,()=>renderProgress(v))});
}
function historyHtml(j,dates){
  if(!dates.length)return `<div class="card empty"><div class="big-emoji">📒</div><p class="muted">No workouts yet. Your history will show up here.</p></div>`;
  return dates.slice().reverse().slice(0,30).map(d=>`<div><p class="small" style="font-weight:800;color:var(--lvl-text);margin-top:6px">${niceDate(d)}</p>
    ${j[d].map(e=>`<div class="hist"><div class="row between"><b>${esc(e.exercise)}</b><span style="white-space:nowrap"><span class="small muted">${esc(e.timestamp||'')}</span><button class="xbtn" data-edit="${d}|${esc(e.id)}" aria-label="Edit">✏️</button><button class="xbtn" data-del="${d}|${esc(e.id)}" aria-label="Delete">🗑️</button></span></div>
      <div>${e.kind==='activity'?`<span class="badge">⏱ <b>${e.minutes}</b> min</span>${e.distance?`<span class="badge">📍 <b>${e.distance}</b> ${e.dunit||''}</span>`:''}`:''}${e.effort?`<span class="badge">${EFF[e.effort]}</span>`:''}${(e.sets||[]).map((s,i)=>`<span class="badge">${i+1}: <b>${Number(s.reps)||0}</b>${s.weight?` × <b>${round1(toUnit(Number(s.weight),e.unit))}</b> ${profile.unit}`:''}</span>`).join('')}</div></div>`).join('')}</div>`).join('')
    +(dates.length>30?`<p class="small muted center">Showing the latest 30 days. Download a backup to keep everything.</p>`:'');
}
function editEntry(d,id,after){
  const j=getJournal(),e=(j[d]||[]).find(x=>String(x.id)===id);if(!e)return;
  if(e.kind==='activity')return activitySheet({d,id});
  const hasW=e.sets.some(s=>s.weight)||Object.values(EX).some(x=>x.name===e.exercise&&x.weight);
  let rows=e.sets.map(s=>({reps:s.reps,weight:s.weight?round1(toUnit(Number(s.weight),e.unit)):''}));
  const draw=()=>sheet(`<h2>✏️ ${esc(e.exercise)}</h2><p class="small muted">${niceDate(d)}</p>
    <div>${rows.map((r,i)=>`<div class="set ${hasW?'wt':'nowt'}" style="grid-template-columns:54px 1fr ${hasW?'1fr ':''}44px"><div class="n">Set ${i+1}</div>
      <div><label>Reps</label><input class="num" type="number" inputmode="numeric" min="0" value="${r.reps}" data-r="${i}"></div>
      ${hasW?`<div><label>${profile.unit}</label><input class="num" type="number" inputmode="decimal" step="0.5" min="0" value="${r.weight}" data-w="${i}"></div>`:''}
      <button class="xbtn" data-x="${i}" aria-label="Remove set" style="align-self:end;height:50px">✕</button></div>`).join('')}</div>
    <button class="link" id="addrow">＋ Add set</button>
    <button class="btn" id="save">Save changes</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{document.querySelectorAll('[data-r]').forEach(x=>rows[x.dataset.r].reps=x.value);document.querySelectorAll('[data-w]').forEach(x=>rows[x.dataset.w].weight=x.value)};
    $('#cancel').onclick=closeLayer;
    $('#addrow').onclick=()=>{read();rows.push({reps:'',weight:rows.length?rows[rows.length-1].weight:''});draw()};
    document.querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>{read();rows.splice(+x.dataset.x,1);draw()});
    $('#save').onclick=()=>{read();const sets=rows.map(r=>({reps:parseInt(r.reps)||0,weight:parseFloat(r.weight)||0})).filter(s=>s.reps>0||s.weight>0);
      if(!sets.length){toast('Add at least one set, or delete the entry instead');return}
      e.sets=sets;e.unit=profile.unit;e.u=Date.now();setJournal(j);closeLayer();toast('Saved ✅');after&&after();syncNow(true)};
  });
  draw();
}
let chartMetric='w';
function drawChart(){
  const j=getJournal(),pts=[];let useW=false;
  workoutDates(j).forEach(d=>{const es=j[d].filter(e=>e.exercise===chartEx&&(e.sets||[]).length);if(!es.length)return;
    const all=es.flatMap(e=>e.sets.map(s=>({w:toUnit(Number(s.weight)||0,e.unit),r:Number(s.reps)||0})));
    const mw=Math.max(...all.map(x=>x.w));if(mw>0)useW=true;
    pts.push({d,w:mw,r:Math.max(...all.map(x=>x.r)),e:Math.max(...all.map(x=>e1rm(x.w,x.r))),v:all.reduce((t,x)=>t+x.w*x.r,0)})});
  const m=useW?chartMetric:'r',vals=pts.map(p=>round1(p[m]));
  const label={w:`Heaviest weight (${profile.unit})`,e:`Estimated 1-rep max (${profile.unit})`,v:`Total volume (${profile.unit} lifted)`,r:'Best reps / seconds'}[m];
  const W=340,H=200,L=40,R=12,T=16,B=30;const max=Math.max(...vals)*1.15||1,min=0;
  const x=i=>pts.length===1?(L+W-R)/2:L+i*(W-L-R)/(pts.length-1),y=v=>T+(H-T-B)*(1-(v-min)/(max-min));
  const grid=[0,.5,1].map(f=>{const v=min+(max-min)*f;return `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(v)}</text>`}).join('');
  const path=vals.map((v,i)=>`${i?'L':'M'}${x(i)},${y(v)}`).join('');
  const area=pts.length>1?`<path d="${path}L${x(vals.length-1)},${y(0)}L${x(0)},${y(0)}Z" fill="var(--lvl-text)" opacity=".12"/>`:'';
  const dots=vals.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="var(--card)" stroke="var(--lvl-text)" stroke-width="2.5"><title>${niceDate(pts[i].d)}: ${v}</title></circle>`).join('');
  const lbl=i=>`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${parseIso(pts[i].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text>`;
  const diff=round1(vals[vals.length-1]-vals[0]);
  $('#chart').innerHTML=`${useW?`<div class="seg" style="margin-bottom:8px">${[['w','Heaviest'],['e','Est. 1RM'],['v','Volume']].map(o=>`<button class="${o[0]===m?'on':''}" data-cm="${o[0]}">${o[1]}</button>`).join('')}</div>`:''}
  <p class="small muted" style="font-weight:700">${label}</p><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label} over time">${grid}${area}<path d="${path}" fill="none" stroke="var(--lvl-text)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}${lbl(0)}${pts.length>1?lbl(pts.length-1):''}</svg>
  <p style="margin-top:6px">${pts.length<2?'Do this exercise again to start your line! 📍':diff>0?`🎉 Up <b>${diff}</b> since you started. Keep going!`:diff===0?'Holding steady. Try to beat your best next time!':'Small dips are normal. Rest well and keep at it! 💪'}</p>
  ${m==='e'?'<p class="small muted">Estimated from your best set. It is a guess at the most you could lift once, not a target to try.</p>':''}`;
  document.querySelectorAll('[data-cm]').forEach(b=>b.onclick=()=>{chartMetric=b.dataset.cm;drawChart()});
}
