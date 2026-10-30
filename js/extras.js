/* JAMS Fitness · 6-month phases, share cards, stretching, tour, display settings, monthly report, feedback, backup history. */
/* =========================================================
   System upgrades: share cards, tour, 6-month phases, stretching,
   display settings, monthly report, feedback, backup history.
   ========================================================= */

/* ---------- 6-month plan phases ---------- */
const PHASES=[
  {n:1,name:'Foundation',e:'🧱',from:1,to:8,about:'Learn perfect form and build the habit.'},
  {n:2,name:'Build',e:'📈',from:9,to:16,about:'One extra set on the first exercise to build more muscle.'},
  {n:3,name:'Strength',e:'💥',from:17,to:24,about:'Heavier weights with fewer reps (or longer holds) to get stronger.'},
];
function planStart(){
  if(profile.planStart)return profile.planStart;
  const d=workoutDates(getJournal());return d.length?d[0]:null;
}
function planWeek(){const s=planStart();if(!s)return 0;return Math.floor((weekStart(new Date())-weekStart(parseIso(s)))/(7*864e5))+1}
function phaseInfo(){
  const w=planWeek();if(!w)return null;
  if(w>24)return {w,done:true};
  const ph=PHASES.find(p=>w>=p.from&&w<=p.to);
  return {w,ph,recovery:w%4===0};
}
function phasePlan(plan){
  const info=phaseInfo();if(!info||info.done)return plan.map(p=>p.slice());
  return plan.map((p,i)=>{const ex=EX[p[0]]||{},q=p.slice();
    if(info.ph.n===2&&i===0)q[1]=Math.min(5,q[1]+1);
    if(info.ph.n===3){if(ex.time){q[2]+=10;q[3]+=10}else if(ex.weight){q[2]=Math.max(3,q[2]-2);q[3]=Math.max(q[2],q[3]-2)}}
    if(info.recovery)q[1]=Math.max(2,q[1]-1);
    return q});
}
function phaseCard(){
  const info=phaseInfo();
  if(!info)return '';
  if(info.done)return `<div class="card row"><span class="big-emoji">🎓</span><div style="flex:1"><b>You finished the 6-month plan!</b><p class="small muted">Amazing. Start a new round in Me → Your plan, or try the next level.</p></div></div>`;
  const pct=Math.round(info.w/24*100);
  return `<div class="card stack phase"><div class="row between"><b>${info.ph.e} Week ${info.w} of 24 · ${info.ph.name}</b><span class="small muted">Phase ${info.ph.n}/3</span></div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    <p class="small muted">${info.recovery?'😌 <b>Recovery week:</b> one less set on every exercise so your body can recharge. Next week you\'ll be stronger!':info.ph.about}</p></div>`;
}

/* ---------- Share cards (image for WhatsApp, Messages...) ---------- */
async function shareImage(opts){
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  const col=lvl().color,grad=g.createLinearGradient(0,0,W,H);grad.addColorStop(0,col);grad.addColorStop(1,'#0f172a');
  g.fillStyle=grad;g.fillRect(0,0,W,H);
  g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<14;i++){g.beginPath();g.arc(Math.random()*W,Math.random()*H,40+Math.random()*120,0,7);g.fill()}
  const font=(w,s)=>`${w} ${s}px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif`;
  const center=(t,y,w,s,color='#fff')=>{g.font=font(w,s);g.fillStyle=color;g.textAlign='center';g.fillText(t,W/2,y)};
  center(opts.big||'🏆',300,'400',200);
  center(opts.title,440,'800',72);
  if(opts.sub)center(opts.sub,515,'600',40,'rgba(255,255,255,.85)');
  const st=opts.stats||[],bw=280,gap=30,x0=(W-(st.length*bw+(st.length-1)*gap))/2;
  st.forEach(([v,l],i)=>{const x=x0+i*(bw+gap);g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.roundRect?g.roundRect(x,590,bw,200,32):g.rect(x,590,bw,200);g.fill();
    g.textAlign='center';g.fillStyle='#fff';g.font=font('900',84);g.fillText(String(v),x+bw/2,700);g.font=font('600',34);g.fillStyle='rgba(255,255,255,.85)';g.fillText(l,x+bw/2,758)});
  let y=880;(opts.lines||[]).slice(0,4).forEach(t=>{center(t.length>44?t.slice(0,43)+'…':t,y,'700',42);y+=66});
  center('JAMS FITNESS',H-110,'900',44);center(location.host,H-58,'600',30,'rgba(255,255,255,.7)');
  const blob=await new Promise(r=>c.toBlob(r,'image/png'));
  const file=new File([blob],'jams-fitness.png',{type:'image/png'});
  try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:opts.text||'My workout on JAMS Fitness 💪'});return}}catch(e){if(e&&e.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='jams-fitness.png';document.body.appendChild(a);a.click();a.remove();toast('Image saved');
}
let lastDone=null;
function shareWorkout(){
  const d=lastDone||{};
  shareImage({big:d.prs&&d.prs.length?'🏆':'💪',title:`${profile.name||'I'} ${profile.name?'crushed':'crushed'} it!`,sub:`${d.e||'💪'} ${d.title||'Workout'} done`,
    stats:[[d.sets||0,'sets'],[d.mins||0,'minutes'],[weekStreak(),'week streak']],
    lines:[...(d.prs||[]).map(p=>'⭐ New record: '+p),...(d.badges||[]).map(b=>`${b.e} Badge: ${b.n}`)],text:`${profile.name||'I'} just finished ${d.title||'a workout'} on JAMS Fitness 💪`});
}
function shareProgress(){
  const j=getJournal(),ds=workoutDates(j),ws=weekStart(new Date()),wk=ds.filter(d=>parseIso(d)>=ws).length,rec=recordsTable(j);
  const best=Object.entries(rec).filter(([n,r])=>r.w).sort((a,b)=>b[1].w-a[1].w).slice(0,2).map(([n,r])=>`🏋️ ${n}: ${round1(r.w)} ${profile.unit}`);
  shareImage({big:'🔥',title:`${profile.name||'My'}${profile.name?"'s":''} progress`,sub:`${lvl().emoji} ${lvl().name} level`,stats:[[ds.length,'workouts'],[weekStreak(),'week streak'],[earnedBadges().length,'badges']],
    lines:[`📅 ${wk} active ${wk===1?'day':'days'} this week`,...best],text:'My progress on JAMS Fitness 🔥'});
}

/* ---------- Stretching & mobility ---------- */
const COOLDOWN=[
  {n:'Slow walk & deep breaths',e:'🚶',s:40,tip:'Breathe in through your nose, out through your mouth.'},
  {n:'Hamstring stretch',e:'🦵',s:40,tip:'Sit, one leg straight. Reach gently towards your toes. 20 seconds each leg.'},
  {n:'Quad stretch',e:'🦩',s:40,tip:'Stand, hold a wall, pull one heel to your bottom. 20 seconds each leg.'},
  {n:'Chest opener',e:'🫶',s:30,tip:'Clasp hands behind your back and gently lift your chest.'},
  {n:'Cross-body shoulder stretch',e:'🤗',s:40,tip:'Pull one arm across your chest. 20 seconds each side.'},
  {n:"Child's pose",e:'🧎',s:40,tip:'Kneel, sit back on your heels and stretch your arms forward on the floor.'},
  {n:'Calf stretch',fig:'calf_raise_bw',s:40,tip:'Hands on a wall, one leg back with the heel down. 20 seconds each.'},
];
const MOBILITY=[
  {n:'Neck rolls',e:'🙆',s:40,tip:'Slow half-circles. Never force it.'},
  {n:'Arm circles',fig:'_arms',s:40,tip:'Small circles getting bigger, both directions.'},
  {n:'Cat-cow',e:'🐈',s:60,tip:'On hands and knees, round your back up, then let it dip down. Slowly.'},
  {n:'Hip flexor stretch',fig:'_lunge',s:60,tip:'Half-kneel and gently push your hips forward. 30 seconds each side.'},
  {n:'Hip circles',e:'🌀',s:40,tip:'Hands on hips, big slow circles each way.'},
  {n:'Butterfly stretch',e:'🦋',s:50,tip:'Sit, soles of feet together, let your knees relax down.'},
  {n:'Thread the needle',e:'🧵',s:60,tip:'On hands and knees, slide one arm under your body and twist. 30 seconds each.'},
  {n:'Hamstring stretch',e:'🦵',s:60,tip:'Sit, one leg straight, reach gently. 30 seconds each leg.'},
  {n:'World’s greatest stretch',fig:'_lunge',s:60,tip:'Lunge, hand on the floor, twist and reach up. Switch sides halfway.'},
  {n:"Child's pose",e:'🧎',s:60,tip:'Breathe slowly and relax.'},
];
function runStretch(kind){
  const steps=kind==='cool'?COOLDOWN:MOBILITY,mins=Math.round(steps.reduce((a,s)=>a+s.s,0)/60);
  runSequence(steps,{closeText:'Stop',onFinish:()=>{
    const j=getJournal(),d=isoLocal();
    (j[d]=j[d]||[]).push({id:Date.now(),exercise:'🧘 Stretch',kind:'activity',act:'Stretch',minutes:mins,distance:0,dunit:'km',sets:[],timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),level:profile.level,u:Date.now()});
    setJournal(j);toast(`🧘 ${mins} minutes of stretching logged!`);say('Great stretching. Your muscles say thank you!');syncNow(true);if(route!=='workout')render()}});
}
function stretchCard(){
  return `<div class="card stack"><div class="row"><span class="ex-emoji">🧘</span><div style="flex:1"><b>Stretch & mobility</b><p class="small muted">Guided, with a timer. Great after workouts and on rest days.</p></div></div>
    <div class="row" style="gap:8px"><button class="btn sm secondary" style="flex:1" data-stretch="cool">5-min cool-down</button><button class="btn sm secondary" style="flex:1" data-stretch="mob">10-min mobility</button></div></div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-stretch]');if(b)runStretch(b.dataset.stretch)});

/* ---------- First-time tour ---------- */
const TOUR=[
  {sel:'.card.hero',t:"This is today's workout. Tap the button and follow along. Tap ✓ after each set and we'll time your rest. ⏱"},
  {sel:'.streakpill',t:'Your 🔥 streak: how many weeks in a row you\'ve worked out. Rest days never break it!'},
  {sel:'[data-go="library"]',t:'Workouts: every exercise with moving drawings, your own workouts and sport plans.'},
  {sel:'[data-go="ask"]',t:'Coach: ask anything about exercises or your plan. 💬'},
  {sel:'[data-go="progress"]',t:'Progress: badges, records, charts and your muscle map. 📈'},
  {sel:'[data-who]',t:'Tap here to switch between people in your family, or add someone. 👨‍👩‍👧'},
];
function maybeTour(){if(!profile.toured&&profile.id&&route==='today'&&!$('#layer').innerHTML)setTimeout(()=>{if(route==='today'&&!$('#layer').innerHTML)startTour()},600)}
function startTour(){
  let i=0;
  const step=()=>{
    while(i<TOUR.length&&!document.querySelector(TOUR[i].sel))i++;
    if(i>=TOUR.length){finish();return}
    const el=document.querySelector(TOUR[i].sel);el.scrollIntoView({block:'center'});
    setTimeout(()=>{const r=el.getBoundingClientRect(),below=r.top<window.innerHeight/2;
      $('#layer').innerHTML=`<div class="tour"><div class="tour-hole" style="left:${r.left-6}px;top:${r.top-6}px;width:${r.width+12}px;height:${r.height+12}px"></div>
        <div class="tour-tip" style="${below?`top:${Math.min(r.bottom+14,window.innerHeight-200)}px`:`bottom:${Math.max(window.innerHeight-r.top+14,16)}px`}" role="dialog" aria-live="polite">
        <p>${TOUR[i].t}</p><div class="row between" style="margin-top:12px"><button class="link" id="tskip" style="color:var(--muted)">Skip tour</button><span class="small muted">${i+1} / ${TOUR.length}</span><button class="btn sm" id="tnext">${i===TOUR.length-1?'Done 🎉':'Next'}</button></div></div></div>`;
      $('#tnext').onclick=()=>{i++;step()};$('#tskip').onclick=finish},250);
  };
  const finish=()=>{closeLayer();profile.toured=true;saveProfile();window.scrollTo(0,0)};
  step();
}

/* ---------- Display: text size & theme (this device) ---------- */
function applyDisplay(){
  const z=store.get('jams_text','1'),t=store.get('jams_theme','auto');
  document.documentElement.style.setProperty('--zoom',z);
  if(t==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=t;
}
function displayCard(){
  const z=store.get('jams_text','1'),t=store.get('jams_theme','auto');
  return `<div class="card stack"><h3>👀 Display</h3>
    <p class="small muted" style="font-weight:700">TEXT SIZE</p><div class="seg">${[['1','A'],['1.15','A+'],['1.3','A++']].map(x=>`<button class="${z===x[0]?'on':''}" data-zoom="${x[0]}" style="font-size:${14*x[0]}px">${x[1]}</button>`).join('')}</div>
    <p class="small muted" style="font-weight:700">THEME</p><div class="seg">${[['auto','📱 Auto'],['light','☀️ Light'],['dark','🌙 Dark']].map(x=>`<button class="${t===x[0]?'on':''}" data-theme-set="${x[0]}">${x[1]}</button>`).join('')}</div></div>`;
}

/* ---------- Monthly report (print / save as PDF) ---------- */
let reportMonth=null;
function renderReport(v){
  const now=new Date();reportMonth=reportMonth||`${now.getFullYear()}-${pad(now.getMonth()+1)}`;
  const [Y,M]=reportMonth.split('-').map(Number),first=new Date(Y,M-1,1),last=new Date(Y,M,0);
  const j=getJournal(),inM=d=>{const x=parseIso(d);return x>=first&&x<=last};
  const days=workoutDates(j).filter(inM),entries=days.flatMap(d=>j[d].map(e=>({...e,d})));
  const lifts=entries.filter(e=>e.kind!=='activity'),acts=entries.filter(e=>e.kind==='activity');
  const sets=lifts.reduce((a,e)=>a+(e.sets||[]).length,0),mins=acts.reduce((a,e)=>a+(e.minutes||0),0);
  const byEx={};lifts.forEach(e=>byEx[e.exercise]=(byEx[e.exercise]||0)+(e.sets||[]).length);
  const top=Object.entries(byEx).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const rec=recordsTable(j),prs=Object.entries(rec).filter(([n,r])=>inM(r.d));
  const weeks=[];for(let d=weekStart(first);d<=last;d=new Date(d.getTime()+7*864e5)){const e=new Date(d.getTime()+6*864e5);weeks.push([d,days.filter(x=>{const t=parseIso(x);return t>=d&&t<=e}).length])}
  const B=(profile.body||[]).filter(b=>inM(b.d)&&b.w).sort((a,b)=>a.d.localeCompare(b.d));
  const label=first.toLocaleDateString(undefined,{month:'long',year:'numeric'});
  v.innerHTML=`<div class="topbar noprint"><button class="link" id="rback">← Progress</button><div class="row" style="gap:6px"><button class="btn sm ghost" id="rprev" aria-label="Previous month">‹</button><button class="btn sm ghost" id="rnext" aria-label="Next month">›</button></div></div>
  <div class="report stack-lg">
    <div class="row between"><div>${logo()}<h1 style="margin-top:10px">${label} report</h1><p class="muted">${esc(profile.avatar)} ${esc(profile.name||'')} · ${lvl().emoji} ${lvl().name}</p></div></div>
    <div class="stats"><div class="stat"><b>${days.length}</b><span>active days</span></div><div class="stat"><b>${sets}</b><span>sets</span></div><div class="stat"><b>${mins}</b><span>activity min</span></div></div>
    <div class="card stack"><h3>📅 Active days per week</h3>${weeks.map(([d,n])=>`<div class="row" style="gap:10px"><span class="small" style="width:70px">${d.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span><div class="famBar" style="flex:1;height:14px"><i style="width:${n/7*100}%"></i></div><b class="small" style="width:22px;text-align:right">${n}</b></div>`).join('')}</div>
    <div class="card stack"><h3>💪 Most trained</h3>${top.length?top.map(([n,c])=>`<div class="row between"><span>${esc(n)}</span><b>${plural(c,'set')}</b></div>`).join(''):'<p class="muted small">No strength workouts this month.</p>'}</div>
    <div class="card stack"><h3>🏆 Records set this month</h3>${prs.length?prs.map(([n,r])=>`<div class="row between"><span>${esc(n)}</span><b>${r.w?round1(r.w)+' '+profile.unit+' × '+r.wr:r.reps+' reps'}</b></div>`).join(''):'<p class="muted small">No new records this month. Keep pushing!</p>'}</div>
    ${acts.length?`<div class="card stack"><h3>🏃 Activities</h3>${Object.entries(acts.reduce((m,e)=>(m[e.exercise]=(m[e.exercise]||0)+(e.minutes||0),m),{})).map(([n,m])=>`<div class="row between"><span>${esc(n)}</span><b>${m} min</b></div>`).join('')}</div>`:''}
    ${B.length>1?`<div class="card stack"><h3>⚖️ Body weight</h3><p>${round1(toUnit(B[0].w,B[0].unit))} → <b>${round1(toUnit(B[B.length-1].w,B[B.length-1].unit))} ${profile.unit}</b></p></div>`:''}
    <div class="card stack"><h3>🏅 Badges so far</h3><p>${BADGES.filter(b=>earnedBadges().includes(b.id)).map(b=>b.e+' '+b.n).join(' · ')||'None yet'}</p></div>
    <p class="small muted center">Made with JAMS Fitness · ${location.host}</p>
    <button class="btn noprint" id="rprint">🖨️ Print or save as PDF</button>
    <p class="small muted center noprint">On iPhone: tap Print, then pinch out on the preview and tap Share → Save to Files.</p>
  </div>`;
  const shift=n=>{const d=new Date(Y,M-1+n,1);reportMonth=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;renderReport(v)};
  $('#rback').onclick=()=>go('progress');$('#rprev').onclick=()=>shift(-1);$('#rnext').onclick=()=>shift(1);
  $('#rprint').onclick=()=>{try{window.print()}catch(e){toast('Printing is not available here')}};
}

/* ---------- Feedback ---------- */
function feedbackCard(){
  return `<div class="card stack"><h3>💬 Feedback</h3><p class="small muted">Found a problem or have an idea? We read everything.</p><button class="btn secondary" id="fbopen">Send feedback</button></div>`;
}
function feedbackSheet(){
  let t='idea';
  const draw=()=>sheet(`<h2>💬 Send feedback</h2>
    <div class="seg">${[['idea','💡 Idea'],['problem','🐞 Problem'],['love','❤️ Praise']].map(x=>`<button class="${t===x[0]?'on':''}" data-fbt="${x[0]}">${x[1]}</button>`).join('')}</div>
    <textarea class="txt area" id="fbm" rows="5" maxlength="1000" placeholder="${t==='problem'?'What happened? What were you trying to do?':t==='idea'?'What would make JAMS better for you?':'What do you like?'}">${esc(feedbackSheet.draft||'')}</textarea>
    <input class="txt small-in" id="fbc" maxlength="80" placeholder="Email (optional, only if you'd like a reply)" autocomplete="email">
    <p class="small muted">Kids: ask a grown-up before sharing an email. Please don't include other personal details.</p>
    <button class="btn" id="fbsend">Send</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-fbt]').forEach(b=>b.onclick=()=>{feedbackSheet.draft=$('#fbm').value;t=b.dataset.fbt;draw()});
    $('#fbsend').onclick=async()=>{const m=$('#fbm').value.trim();if(m.length<3){toast('Please write a little more');return}
      $('#fbsend').disabled=true;
      try{const r=await fetch('api/feedback',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({type:t,message:m,contact:$('#fbc').value.trim(),v:APP_VERSION})});
        if(r.status===429){toast('Thanks! You\'ve sent a lot already. Try again later');$('#fbsend').disabled=false;return}if(!r.ok)throw 0;
        feedbackSheet.draft='';closeLayer();toast('🙏 Thank you! Feedback sent')}catch(e){$('#fbsend').disabled=false;toast("Couldn't send. Check your internet")}};
  });
  draw();
}

/* ---------- Backup history (daily snapshots on the server) ---------- */
async function restoreHistorySheet(){
  let list=[];
  try{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'snapshots'})});const d=await r.json();if(!r.ok)throw 0;list=d.dates||[]}
  catch(e){toast("Couldn't load backups. Check your internet");return}
  sheet(`<h2>🕘 Earlier backups</h2><p class="muted small">Every day, a copy of your backup is kept for 30 days. Restoring replaces everything (all people) on this phone and in the cloud with that copy. Progress photos aren't affected.</p>
    <div class="stack">${list.length?list.map(d=>`<button class="who" data-snap="${d}"><span class="av">📦</span><span style="flex:1;text-align:left"><b>${niceDate(d)}</b><br><span class="small muted">As it was at the start of that day</span></span></button>`).join(''):'<p class="muted center">No earlier backups yet. They\'re made daily once you start syncing.</p>'}</div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-snap]').forEach(b=>b.onclick=()=>confirmBox(`Restore ${niceDate(b.dataset.snap)}?`,'Everything added after that day will be replaced. This can\'t be undone (but today\'s state is kept as a backup too).','Restore',async()=>{
      try{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'snapshot',date:b.dataset.snap})});const d=await r.json();if(!r.ok||!d.data)throw 0;
        applyPayload(d.data);
        const r2=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'put',data:localPayload()})});if(!r2.ok)throw 0;
        toast('📦 Backup restored');go('today')}catch(e){toast("Couldn't restore. Please try again")}},true));
  });
}
