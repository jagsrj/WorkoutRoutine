/* KinFit · Fun extras: family quest, grow-a-buddy, workout dice, adventure trail,
   "strength in real things", cricket mode and the parent dashboard. */

/* ---------- Shared: totals from a person's journal (optionally between two dates) ---------- */
function totals(p=profile,from,to){
  const j=getJournal(p),t={days:0,sets:0,reps:0,secs:0,kg:0,mins:0};
  Object.keys(j).forEach(d=>{if((from&&d<from)||(to&&d>to)||!j[d].length)return;t.days++;
    j[d].forEach(e=>{if(e.kind==='activity'){t.mins+=e.minutes||0;return}
      const ex=EX[exByName(e.exercise)],ws=workSets(e.sets);t.sets+=ws.length;
      ws.forEach(s=>{const r=Number(s.reps)||0;if(ex&&ex.time)t.secs+=r;else t.reps+=r;t.kg+=r*(Number(s.weight)||0)*(e.unit==='kg'?1:1/2.2046)})})});
  return t;
}
const daysAgo=d=>d?Math.round((parseIso(isoLocal())-parseIso(d))/864e5):null;
const lastActive=(p=profile)=>{const ds=workoutDates(getJournal(p));return ds.length?ds[ds.length-1]:null};

/* ---------- 1. Family quest: one shared goal a week for everyone on this phone ---------- */
const QUESTS=[
  {k:'reps',e:'🔁',n:'Rep Rally',what:'reps',per:300},
  {k:'days',e:'📅',n:'Show-Up Squad',what:'active days',per:3},
  {k:'mins',e:'⏱️',n:'Move Together',what:'active minutes',per:60},
  {k:'sets',e:'💪',n:'Set Stackers',what:'sets',per:25},
];
const FAM_COLORS=['#7c3aed','#16a34a','#ea580c','#2563eb','#ec4899','#eab308'];
function familyQuest(){
  if(DB.list.length<2)return null;
  const ws=weekStart(new Date()),from=isoLocal(ws),wk=Math.round(ws.getTime()/(7*864e5)),q=QUESTS[((wk%QUESTS.length)+QUESTS.length)%QUESTS.length];
  const parts=DB.list.map((p,i)=>{const t=totals(p,from);
    const n=q.k==='reps'?t.reps+Math.round(t.secs/3):q.k==='days'?t.days:q.k==='mins'?Math.round(t.mins+t.sets*2):t.sets;
    return {p,n,c:FAM_COLORS[i%FAM_COLORS.length]}});
  const total=parts.reduce((a,x)=>a+x.n,0),target=q.per*DB.list.length,left=6-((new Date().getDay()+6)%7);
  return {...q,parts,total,target,left,done:total>=target};
}
function questCard(){
  const Q=familyQuest();if(!Q||todayHidden('quest'))return '';
  const bar=Q.parts.filter(x=>x.n).map(x=>`<i style="width:${Math.min(100,x.n/Q.target*100)}%;background:${x.c}" title="${esc(x.p.name||'')}"></i>`).join('');
  return `<div class="card stack quest"><div class="row between"><h2 class="h3">🤝 Family quest</h2><span class="small muted" style="font-weight:700">${Q.done?'Done! 🎉':Q.left?plural(Q.left,'day')+' left':'Last day!'}</span></div>
    <p><b>${Q.e} ${Q.n}:</b> ${Q.target.toLocaleString()} ${Q.what} together this week</p>
    <div class="qbar" role="img" aria-label="${Q.total} of ${Q.target}">${bar}</div>
    <p class="small muted" style="font-weight:700">${Math.min(Q.total,Q.target).toLocaleString()} / ${Q.target.toLocaleString()}${Q.done?' · Quest complete! Everyone helped 🏆':''}</p>
    <div class="qwho">${Q.parts.map(x=>`<span><i style="background:${x.c}"></i>${esc(x.p.avatar||'🙂')} ${esc(x.p.name||'No name')} <b>${x.n.toLocaleString()}</b></span>`).join('')}</div></div>`;
}

/* ---------- 2. Grow-a-buddy: a pet that grows with every active day and never goes backwards ---------- */
const BUDDY=[[0,'🥚','Egg'],[1,'🐣','Hatchling'],[5,'🐥','Chick'],[12,'🐦','Bird'],[25,'🦜','Parrot'],[50,'🦅','Eagle'],[100,'🐉','Dragon']];
function buddyInfo(p=profile){
  const n=workoutDates(getJournal(p)).length;let i=0;BUDDY.forEach((b,k)=>{if(n>=b[0])i=k});
  const nx=BUDDY[i+1],since=daysAgo(lastActive(p));
  const mood=since===null?'Waiting to hatch. Do your first workout!':since<=2?'Happy and full of energy 😊':since<=6?'Missing you a little. A workout cheers it up!':'Having a nap 💤 One workout wakes it up.';
  return {n,i,e:BUDDY[i][1],stage:BUDDY[i][2],next:nx?{e:nx[1],stage:nx[2],need:nx[0]-n,pct:(n-BUDDY[i][0])/(nx[0]-BUDDY[i][0])*100}:null,mood,name:p.buddyName||'Pip'};
}
function buddyCard(){
  if(todayHidden('buddy'))return '';
  const b=buddyInfo();
  if(profile.buddySeen===undefined){profile.buddySeen=b.i;saveProfile()}
  return `<button class="card row buddy" id="buddy" style="width:100%;text-align:left"><span class="buddy-e" aria-hidden="true">${b.e}</span><div style="flex:1"><b>${esc(b.name)} the ${b.stage}</b><p class="small muted">${b.mood}</p>
    ${b.next?`<div class="famBar"><i style="width:${b.next.pct}%"></i></div><p class="small muted">${plural(b.next.need,'more active day')} until ${b.next.e} ${b.next.stage}</p>`:'<p class="small" style="font-weight:800">Fully grown! A legend 🏆</p>'}</div></button>`;
}
function buddySheet(){
  const b=buddyInfo();
  sheet(`<h2>${b.e} ${esc(b.name)} the ${b.stage}</h2><p class="muted">Your buddy grows with every active day (workouts and sports). It never shrinks, even after a break.</p>
    <div class="ladder">${BUDDY.map((s,k)=>`<div class="${k<=b.i?'on':''}"><span>${k<=b.i?s[1]:'❔'}</span><b>${k<=b.i?s[2]:'???'}</b><small>${s[0]} ${s[0]===1?'day':'days'}</small></div>`).join('')}</div>
    <label class="small muted" style="font-weight:700">NAME YOUR BUDDY</label><input class="txt" id="bname" maxlength="16" placeholder="Pip" value="${esc(profile.buddyName||'')}">
    <button class="btn" id="bok">Save</button><button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#bok').onclick=()=>{profile.buddyName=$('#bname').value.trim().slice(0,16);saveProfile();syncSoon();closeLayer();render()};
  });
}
// After a workout: did the buddy just grow?
function buddyGrew(){const b=buddyInfo(),was=profile.buddySeen??b.i;if(b.i>was){profile.buddySeen=b.i;saveProfile();return b}if(profile.buddySeen===undefined){profile.buddySeen=b.i;saveProfile()}return null}

/* ---------- 3. Workout dice: a random 10-minute workout from your equipment and rested muscles ---------- */
const gearOkId=id=>{const r=GEAR_REQ[id];return !gearOn()||!r||r.some(hasGear)};
function rollWorkout(){
  const focus=['full','legs','arms','core','upper','cardio'][Math.floor(Math.random()*6)];
  let w=buildWorkout({mins:10,focus});w.items=w.items.filter(x=>gearOkId(x[0]));
  if(w.items.length<3)w=buildWorkout({mins:10,focus,equip:'none'});
  w.name=('🎲 '+w.name).slice(0,30);return w;
}
function diceSheet(){
  let w=rollWorkout();
  const draw=()=>{const box=$('#dicebox');if(!box)return;
    box.innerHTML=`<div class="dice spin" aria-hidden="true">🎲</div><h3 class="center">${esc(w.name.replace('🎲 ',''))}</h3>
      <div class="stack">${w.items.map(p=>`<div class="row between"><span>${EX[p[0]].e||'💪'} ${esc(EX[p[0]].name)}</span><span class="small muted">${repsText(p,EX[p[0]])}</span></div>`).join('')}</div>`};
  sheet(`<h2>🎲 Workout dice</h2><p class="small muted">Can't decide? The dice picks a 10-minute workout with your equipment, skipping tired muscles.</p>
    <div id="dicebox" class="card stack"></div>
    <button class="btn" id="dgo">▶ Start</button><div class="row" style="gap:8px"><button class="btn secondary" id="droll" style="flex:1">🎲 Roll again</button><button class="btn secondary" id="dsave" style="flex:1">⭐ Save</button></div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    draw();say('Rolling the dice!');
    $('#cancel').onclick=closeLayer;
    $('#droll').onclick=()=>{w=rollWorkout();draw()};
    $('#dsave').onclick=()=>{saveBuilt(w,false);closeLayer();render()};
    $('#dgo').onclick=()=>{closeLayer();startDice(w)};
  });
}
function startDice(w){
  const plan=w.items.map(p=>p.slice()),key='d:'+w.id,cur=store.get(pKey('jams_active'),null);
  const start=()=>{store.set(pKey('jams_active'),{key,level:profile.level,title:w.name,emoji:'🎲',plan,date:isoLocal(),started:Date.now(),items:plan.map(p=>({id:p[0],sets:freshSets(p[0],p[1],p)}))});
    go('workout',key);say(`Let's go! First up: ${EX[plan[0][0]].name}.`)};
  if(cur)confirmBox('Start a new workout?','You have another workout in progress. Starting this one will cancel it.','Start new',start);else start();
}

/* ---------- 4. Adventure trail: workouts move you across Canada, with a postcard at each stop ---------- */
const KM_PER_DAY=10;
const TRAIL=[
  {km:0,e:'🏠',n:'Waterloo',f:'Your adventure starts here! Every active day moves you 10 km, and every 10 minutes of sport adds 1 km more.'},
  {km:110,e:'🗼',n:'Toronto',f:'The CN Tower is 553 metres tall. Its charity stair climb has 1,776 steps!'},
  {km:240,e:'💦',n:'Niagara Falls',f:'Niagara Falls is really three waterfalls. The biggest, Horseshoe Falls, is mostly on the Canadian side.'},
  {km:520,e:'🏝️',n:'Thousand Islands',f:'Despite the name, there are more than 1,800 islands here in the St. Lawrence River.'},
  {km:650,e:'⛸️',n:'Ottawa',f:'In winter the Rideau Canal in Canada\'s capital turns into a skating path almost 8 km long.'},
  {km:850,e:'🥯',n:'Montréal',f:'The city is named after Mount Royal, the big hill right in the middle of it.'},
  {km:1100,e:'🏰',n:'Québec City',f:'Old Québec still has its stone city walls, and you can walk along the top of them.'},
  {km:1650,e:'🦞',n:'Halifax',f:'Halifax sits on a huge harbour on the Atlantic Ocean, famous for its ships and lobster boats.'},
  {km:2600,e:'🐋',n:"St. John's",f:"St. John's is the most easterly city in North America. Whales swim past in summer!"},
];
const TRAIL_LEN=TRAIL[TRAIL.length-1].km;
function trailInfo(p=profile){
  const t=totals(p),km=t.days*KM_PER_DAY+Math.floor(t.mins/10),lap=Math.floor(km/TRAIL_LEN)+1,pos=km%TRAIL_LEN;
  let at=0;TRAIL.forEach((s,i)=>{if(pos>=s.km)at=i});
  const nx=TRAIL[at+1];
  return {km,lap,pos,at,next:nx?{...nx,left:nx.km-pos,pct:(pos-TRAIL[at].km)/(nx.km-TRAIL[at].km)*100}:null};
}
function trailCard(){
  const T=trailInfo(),s=TRAIL[T.at];
  return `<div class="card stack"><div class="row between"><h2 class="h3">🗺️ Adventure trail</h2><span class="small muted" style="font-weight:700">${T.km.toLocaleString()} km${T.lap>1?' · lap '+T.lap:''}</span></div>
    <p>${s.e} You're in <b>${s.n}</b>${T.next?`. Next stop: ${T.next.e} ${T.next.n}`:''}</p>
    ${T.next?`<div class="famBar" style="height:12px"><i style="width:${T.next.pct}%"></i></div><p class="small muted">${T.next.left} km to go · about ${plural(Math.ceil(T.next.left/KM_PER_DAY),'workout')}</p>`:''}
    <button class="btn secondary" id="opentrail">Open the map & postcards</button></div>`;
}
function renderTrail(v){
  const T=trailInfo();
  v.innerHTML=`<div class="topbar"><button class="link" id="tback">← Progress</button><span class="small muted" style="font-weight:700">${T.km.toLocaleString()} km${T.lap>1?' · lap '+T.lap:''}</span></div>
  <div class="stack-lg"><div><h1>🗺️ Adventure trail</h1><p class="muted">Waterloo to St. John's: ${TRAIL_LEN.toLocaleString()} km of Canada. Tap a stop to see its postcard.</p></div>
    <div class="trail">${TRAIL.map((s,i)=>{const got=i<=T.at,here=i===T.at;
      const seg=i<TRAIL.length-1?`<div class="tseg"><i style="height:${i<T.at?100:here&&T.next?T.next.pct:0}%"></i>${here&&T.next?`<span class="tme" style="top:${T.next.pct}%">${esc(profile.avatar||'🏃')}</span>`:''}</div>`:'';
      return `<button class="tstop ${got?'on':''} ${here?'here':''}" data-pc="${i}"><span class="tdot">${got?s.e:'🔒'}</span><span style="flex:1;text-align:left"><b>${s.n}</b><br><span class="small muted">${s.km.toLocaleString()} km${got?' · Postcard unlocked':' · '+(s.km-T.pos)+' km away'}</span></span></button>${seg}`}).join('')}</div>
    ${T.lap>1?`<p class="small muted center">🎓 You've crossed the whole trail ${plural(T.lap-1,'time')}! This is lap ${T.lap}.</p>`:''}</div>`;
  $('#tback').onclick=()=>go('progress');
  v.querySelectorAll('[data-pc]').forEach(b=>b.onclick=()=>{const i=+b.dataset.pc,s=TRAIL[i];
    if(i>T.at&&T.lap===1){toast(`🔒 ${s.km-T.pos} km to go to ${s.n}`);return}
    sheet(`<div class="postcard"><div class="pc-e">${s.e}</div><p class="small" style="font-weight:800;letter-spacing:.08em">GREETINGS FROM</p><h2>${s.n}</h2><p>${s.f}</p></div><button class="btn" id="ok">Nice!</button>`,()=>$('#ok').onclick=closeLayer)});
}

/* ---------- 5. Strength in real things ---------- */
const THINGS=[[150000,'🐋','blue whale','blue whales'],[11000,'🚌','school bus','school buses'],[5000,'🐘','elephant','elephants'],[1500,'🚗','car','cars'],
  [450,'🐻‍❄️','polar bear','polar bears'],[250,'🎹','piano','pianos'],[30,'🐕','golden retriever','golden retrievers'],[4,'🐈','cat','cats']];
const CN_STEPS=1776;
// "3.2 polar bears", from a total in kg; reps are used for bodyweight work.
function realThing(kg,reps=0){
  if(kg>=4){const t=THINGS.find(x=>kg>=x[0]),n=kg/t[0],r=n<10?round1(n):Math.round(n);return `${t[1]} ${r.toLocaleString()} ${r===1?t[2]:t[3]}`}
  if(reps>0)return reps>=CN_STEPS?`🗼 ${round1(reps/CN_STEPS)} CN Tower stair climbs (${CN_STEPS.toLocaleString()} steps each)`:`🗼 ${Math.max(1,Math.round(reps/CN_STEPS*100))}% of the way up the CN Tower's ${CN_STEPS.toLocaleString()} steps`;
  return '';
}
const realLine=(kg,reps,when)=>{const r=realThing(kg,reps);if(!r)return '';return kg>=4?`${when} you lifted as much as ${r}!`:`${when}: ${reps.toLocaleString()} reps. That's like ${r}!`};
function realCard(){
  const t=totals(),now=new Date(),m=totals(profile,isoLocal(new Date(now.getFullYear(),now.getMonth(),1)));
  const a=realLine(t.kg,t.reps,'Altogether'),b=realLine(m.kg,m.reps,'This month');
  if(!a)return '';
  return `<div class="card stack"><h2 class="h3">🐻‍❄️ Strength in real things</h2><p>${a}</p>${b?`<p class="small muted">${b}</p>`:''}</div>`;
}

/* ---------- 6. Cricket mode: each workout day is an innings, reps score runs ---------- */
const runsFor=t=>Math.round(t.reps/3+t.secs/10);
function cricketSeason(p=profile){
  const now=new Date(),first=isoLocal(new Date(now.getFullYear(),now.getMonth(),1)),j=getJournal(p);
  const inn=Object.keys(j).filter(d=>d>=first&&j[d].some(e=>e.kind!=='activity')).sort().map(d=>({d,r:runsFor(totals(p,d,d))})).filter(x=>x.r>0);
  const runs=inn.reduce((a,x)=>a+x.r,0),hs=inn.reduce((a,x)=>Math.max(a,x.r),0);
  return {month:now.toLocaleDateString(undefined,{month:'long'}),inn,runs,hs,avg:inn.length?round1(runs/inn.length):0,
    fifties:inn.filter(x=>x.r>=50&&x.r<100).length,hundreds:inn.filter(x=>x.r>=100).length,overs:Math.floor(inn.length/6),balls:inn.length%6};
}
const inningsNote=r=>r>=100?'CENTURY! 💯':r>=50?'Half-century! 🏏':r>=30?'Nice knock!':'Every run counts!';
function cricketCard(){
  if(!profile.cricket)return '';
  const S=cricketSeason();
  return `<div class="card stack"><div class="row between"><h2 class="h3">🏏 Cricket season</h2><span class="small muted" style="font-weight:700">${S.month}</span></div>
    <div class="stats" style="grid-template-columns:repeat(3,1fr)"><div class="stat"><b>${S.runs}</b><span>runs</span></div><div class="stat"><b>${S.hs}</b><span>high score</span></div><div class="stat"><b>${S.avg}</b><span>average</span></div></div>
    <p class="small"><b>${S.inn.length} innings</b> · ${S.fifties}× 50 · ${S.hundreds}× 💯</p>
    <p class="small" aria-label="${S.balls} of 6 balls in this over">This over: <span class="balls">${[0,1,2,3,4,5].map(i=>i<S.balls?'●':'○').join(' ')}</span> · ${plural(S.overs,'over')} done</p>
    <p class="small muted">Every workout day is an innings. 3 reps = 1 run, 10 seconds of a timed move = 1 run, and 6 innings make an over.</p></div>`;
}

/* ---------- 7. Parent dashboard: everyone's week at a glance, with gentle warnings ---------- */
function personWeek(p){
  const now=new Date(),wsI=isoLocal(weekStart(now)),j=getJournal(p),ds=workoutDates(j),t=totals(p,wsI);
  const d7=new Date();d7.setDate(d7.getDate()-6);const last7=ds.filter(d=>d>=isoLocal(d7)).length;
  const d14=new Date();d14.setDate(d14.getDate()-13);let hard=0;Object.keys(j).filter(d=>d>=isoLocal(d14)).forEach(d=>j[d].forEach(e=>{if(e.effort===3)hard++}));
  let tired=[];try{const R=muscleReady(Date.now(),j);tired=Object.keys(R).filter(k=>R[k]<TIRED)}catch(e){}
  const since=daysAgo(ds[ds.length-1]),warn=[];
  if(last7>=6)warn.push(`⚠️ Trained ${last7} of the last 7 days. A rest day helps muscles grow.`);
  if(tired.length)warn.push(`😴 Very tired right now: ${muscleList(tired)}.`);
  if(hard>=2)warn.push(`😫 Rated ${hard} exercises "too hard" in 2 weeks. Going a little lighter may help.`);
  if(p.kid&&p.level==='expert')warn.push('🏋️ On the Expert (barbell) plan as a child profile. Make sure an adult or coach is there.');
  if(since!==null&&since>=10)warn.push(`💤 No workouts for ${since} days.`);
  return {days:t.days,sets:t.sets,mins:Math.round(t.mins+t.sets*2),since,warn,buddy:buddyInfo(p)};
}
function renderParent(v){
  v.innerHTML=`<div class="topbar"><button class="link" id="pback">← Me</button></div>
  <div class="stack-lg"><div><h1>👀 Family dashboard</h1><p class="muted">This week for everyone on this phone.${pinIsSet()?'':' Tip: set a parent PIN in Me so only grown-ups can open this.'}</p></div>
  ${DB.list.map(p=>{const w=personWeek(p),L=LEVELS[p.level]||LEVELS.beginner;
    return `<div class="card stack"><div class="row"><span class="ex-emoji">${esc(p.avatar||'🙂')}</span><div style="flex:1"><b>${esc(p.name||'No name')}</b>${p.kid?' <span class="small muted">· 🧒 child</span>':''}<p class="small muted">${L.emoji} ${L.name} · ${w.buddy.e} ${esc(w.buddy.name)} the ${w.buddy.stage}</p></div></div>
      <div class="stats" style="grid-template-columns:repeat(3,1fr)"><div class="stat"><b>${w.days}</b><span>active days</span></div><div class="stat"><b>${w.sets}</b><span>sets</span></div><div class="stat"><b>${w.mins}</b><span>active min</span></div></div>
      <p class="small muted">Last active: ${w.since===null?'not yet':w.since===0?'today':w.since===1?'yesterday':w.since+' days ago'}</p>
      ${w.warn.length?w.warn.map(x=>`<p class="small pwarn">${x}</p>`).join(''):'<p class="small" style="color:var(--ok);font-weight:700">✅ All good this week</p>'}</div>`}).join('')}
  </div>`;
  $('#pback').onclick=()=>go('me');
}
const openParent=()=>requirePin(()=>go('parent'),'A parent PIN is needed to open the family dashboard.');

/* ---------- Extra lines for the "workout done" screen ---------- */
function celebrateExtras(vol){
  const out=[],kg=profile.unit==='kg'?vol:vol/2.2046;
  if(kg>=4)out.push(`<p>💪 That's as heavy as <b>${realThing(kg)}</b>!</p>`);
  if(profile.cricket){const r=runsFor(totals(profile,isoLocal(),isoLocal()));if(r)out.push(`<p>🏏 Today's innings: <b>${r} runs</b>. ${inningsNote(r)}</p>`)}
  const g=buddyGrew();if(g)out.push(`<p>${g.e} <b>${esc(g.name)} grew into a ${g.stage}!</b></p>`);
  const T=trailInfo();if(T.pos>=TRAIL[T.at].km&&T.pos-TRAIL[T.at].km<KM_PER_DAY&&T.at>0)out.push(`<p>🗺️ You reached <b>${TRAIL[T.at].e} ${TRAIL[T.at].n}</b>! A new postcard is waiting.</p>`);
  return out.length?`<div class="card stack" style="text-align:left">${out.join('')}</div>`:'';
}
