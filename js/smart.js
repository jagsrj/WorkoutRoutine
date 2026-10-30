/* KinFit · Coach-built workouts, goals and monthly challenges. */

/* ---------- Workout builder ---------- */
// Equipment each exercise needs (beyond a wall, chair, step or backpack).
const NEEDS_BAR_OR_RACK=new Set(['pullup','dips','knee_raise','leg_raise','chin_up','weighted_pullup']);
const MACHINES=new Set(['lat_pulldown','leg_extension','cable_row','tricep_pushdown','leg_press','face_pull']);
const homeOk=id=>id.startsWith('backpack_')||(!EX[id].weight&&!NEEDS_BAR_OR_RACK.has(id)&&id!=='ab_wheel');
function equipOk(id,equip){
  if(equip==='none')return homeOk(id);
  if(equip==='dumbbells')return homeOk(id)||(EX[id].weight&&!EX[id].bar&&!MACHINES.has(id));
  return true;
}
const levelOk=id=>profile.level==='expert'||!EX[id].bar;
const FOCUS={full:{n:'Full-body',e:'⚡',m:null},legs:{n:'Legs',e:'🦵',m:['Legs','Glutes']},arms:{n:'Arms',e:'💪',m:['Arms']},core:{n:'Core',e:'🧱',m:['Core']},
  upper:{n:'Upper-body',e:'🏋️',m:['Chest','Back','Shoulders','Arms']},cardio:{n:'Cardio',e:'❤️',m:['Heart']}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function buildPool(equip){return Object.keys(EX).filter(id=>!id.startsWith('_')&&!id.startsWith('c_')&&equipOk(id,equip)&&levelOk(id))}
function buildWorkout({mins=15,focus='full',equip,sport}={}){
  equip=equip||(profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym');
  const count=Math.max(3,Math.min(8,Math.round(mins/3.5))),sets=mins<=10?2:3,beg=profile.level==='beginner';
  const pool=buildPool(equip);let picks=[];
  if(sport){const S=SPORTS.find(s=>s.id===sport);if(S)picks=shuffle(S.items.map(x=>x[0]).filter(id=>pool.includes(id)))}
  if(picks.length<count){
    const groups=FOCUS[focus]&&FOCUS[focus].m?[FOCUS[focus].m]:[['Legs','Glutes'],['Chest','Shoulders'],['Back'],['Core'],['Heart'],['Arms']];
    const buckets=groups.map(g=>shuffle(pool.filter(id=>!picks.includes(id)&&g.some(m=>exMatches(EX[id],m)))));
    for(let r=0;picks.length<count&&r<12;r++)buckets.forEach(b=>{const id=b.find(x=>!picks.includes(x));if(id&&picks.length<count)picks.push(id)});
  }
  picks=picks.slice(0,count);
  const items=picks.map(id=>{const ex=EX[id];
    if(ex.time)return [id,sets,beg?15:20,beg?30:40];
    if(['jumping_jacks','high_knees','mountain_climber'].includes(id))return [id,sets,20,30];
    return [id,sets,beg?6:8,beg?10:12]});
  const S=sport&&SPORTS.find(s=>s.id===sport),F=FOCUS[focus]||FOCUS.full;
  return {id:newId('r'),name:`${mins}-min ${S?S.name:F.n} workout`.slice(0,30),e:S?S.e:F.e,items};
}
function parseBuildRequest(q){
  q=q.toLowerCase();
  const m=q.match(/(\d{1,2})\s*-?\s*(min|minute)/),mins=m?Math.max(5,Math.min(60,+m[1])):15;
  const focus=/\bleg|lower body|squat/.test(q)?'legs':/\barm|bicep|tricep/.test(q)?'arms':/\bcore|\babs?\b|tummy|stomach/.test(q)?'core':/upper body|chest|back|shoulder/.test(q)?'upper':/cardio|run|sweat|fast|hiit|heart/.test(q)?'cardio':'full';
  const equip=/no equipment|home|bodyweight|body weight|without/.test(q)?'none':/dumbbell/.test(q)?'dumbbells':/gym|barbell|machine/.test(q)?'gym':null;
  const sport=(SPORTS.find(s=>q.includes(s.id)||q.includes(s.name.toLowerCase()))||{}).id||null;
  return {mins,focus,equip,sport};
}
const isBuildRequest=q=>/\b(make|create|build|give|plan|design|suggest|write)\b[\s\S]{0,40}\b(workout|routine|session|training|exercises)\b/i.test(q);
// Ask the AI to pick exercises (only from our list), and fall back to the built-in builder.
async function buildWithCoach(q){
  const opts=parseBuildRequest(q),equip=opts.equip||(profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym');
  const pool=buildPool(equip);
  if(profile.coachAI!==false&&askTimes().length<20){
    try{
      const t0=askTimes();t0.push(Date.now());store.set('jams_ask_times',t0);
      const ctrl=new AbortController(),tm=setTimeout(()=>ctrl.abort(),20000);
      const r=await fetch('api/chat',{method:'POST',headers:{'content-type':'application/json'},signal:ctrl.signal,
        body:JSON.stringify({mode:'build',request:q,level:profile.level,messages:[{role:'user',content:q}],catalog:pool.map(id=>`${id}=${EX[id].name}${EX[id].time?' [time]':''}`).join('; ')})});
      clearTimeout(tm);const d=await r.json().catch(()=>({}));
      const p=d&&d.plan;
      if(r.ok&&p&&Array.isArray(p.items)){
        const seen=new Set(),items=p.items.filter(x=>Array.isArray(x)&&pool.includes(String(x[0]))&&!seen.has(x[0])&&seen.add(x[0])).slice(0,8)
          .map(x=>{const ex=EX[x[0]],cap=ex.time?90:30,lo=Math.max(1,Math.min(cap,Math.round(+x[2])||(ex.time?20:8))),hi=Math.max(lo,Math.min(cap,Math.round(+x[3])||lo+4));
            return [String(x[0]),Math.max(1,Math.min(5,Math.round(+x[1])||3)),lo,hi]});
        if(items.length>=3)return {id:newId('r'),name:cleanText(p.name,30)||'Coach workout',e:cleanEmoji(p.emoji,'✨'),items,ai:true};
      }
    }catch(e){}
  }
  return buildWorkout(Object.assign({},opts,{equip}));
}
function workoutText(w){return `Here's your **${w.e} ${w.name}**:\n${w.items.map((p,i)=>`${i+1}. ${EX[p[0]].name}: ${repsText(p,EX[p[0]])}`).join('\n')}\nWarm up first, and stop if anything hurts. Have fun! 💪`}
function saveBuilt(w,start){
  const list=(profile.routines||[]).filter(x=>x.id!==w.id);list.push({id:w.id,name:w.name,e:w.e,items:w.items});profile.routines=list.slice(-50);saveProfile();syncNow(true);
  if(start)startCustom('r',w.id);else toast('⭐ Saved to My workouts');
}
function builderSheet(){
  const st={mins:15,focus:'full',sport:'',equip:profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym'};let w=null;
  const chip=(k,v,l)=>`<button class="${String(st[k])===String(v)?'on':''}" data-b${k}="${v}">${l}</button>`;
  const draw=()=>sheet(`<h2>✨ Build me a workout</h2>
    <p class="small muted" style="font-weight:700">HOW LONG?</p><div class="chips">${[10,15,20,30].map(m=>chip('mins',m,m+' min')).join('')}</div>
    <p class="small muted" style="font-weight:700">FOCUS</p><div class="chips">${Object.entries(FOCUS).map(([k,f])=>chip('focus',k,f.e+' '+f.n)).join('')}</div>
    <p class="small muted" style="font-weight:700">FOR A SPORT? (optional)</p><div class="chips">${chip('sport','','None')}${SPORTS.map(s=>chip('sport',s.id,s.e+' '+s.name)).join('')}</div>
    <p class="small muted" style="font-weight:700">EQUIPMENT</p><div class="chips">${chip('equip','none','🏠 None')}${chip('equip','dumbbells','🏋️ Dumbbells')}${chip('equip','gym','🏟️ Full gym')}</div>
    ${w?`<div class="card stack" style="background:var(--bg)"><b>${esc(w.e)} ${esc(w.name)}</b><ol style="margin:0;padding-left:20px">${w.items.map(p=>`<li>${esc(EX[p[0]].name)}: ${repsText(p,EX[p[0]])}</li>`).join('')}</ol>
      <div class="row" style="gap:8px"><button class="btn sm ghost" id="bshuf">🔀 Shuffle</button><button class="btn sm secondary" id="bsave" style="flex:1">⭐ Save</button><button class="btn sm" id="bstart" style="flex:1">▶ Start</button></div></div>`
      :`<button class="btn" id="bgo">✨ Build it</button>`}
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    ['mins','focus','sport','equip'].forEach(k=>document.querySelectorAll(`[data-b${k}]`).forEach(b=>b.onclick=()=>{st[k]=k==='mins'?+b.dataset['b'+k]:b.dataset['b'+k];w=null;draw()}));
    const make=()=>{w=buildWorkout({mins:st.mins,focus:st.focus,equip:st.equip,sport:st.sport||null});draw()};
    if($('#bgo'))$('#bgo').onclick=make;if($('#bshuf'))$('#bshuf').onclick=make;
    if($('#bsave'))$('#bsave').onclick=()=>{saveBuilt(w,false);closeLayer();render()};
    if($('#bstart'))$('#bstart').onclick=()=>{closeLayer();saveBuilt(w,true)};
  });
  draw();
}

/* ---------- Monthly challenges ---------- */
const CHALLENGES=[
  {k:'push',e:'🙌',name:'Push-Up Power',what:'push-ups (any kind!)',target:100,match:/push-up/i},
  {k:'squat',e:'🪑',name:'Squat Squad',what:'squats (any kind)',target:150,match:/squat/i},
  {k:'days',e:'📅',name:'Show-Up Month',what:'active days',target:12,metric:'days'},
  {k:'plank',e:'🧱',name:'Plank Master',what:'seconds of planks',target:600,match:/plank/i},
  {k:'move',e:'🏃',name:'Move More',what:'active minutes (workouts, sports and stretching)',target:300,metric:'minutes'},
  {k:'lunge',e:'🦵',name:'Lunge Legend',what:'lunges',target:120,match:/lunge/i},
];
function currentChallenge(p=profile){
  const d=new Date(),c=CHALLENGES[(d.getFullYear()*12+d.getMonth())%CHALLENGES.length],L=(LEVELS[p.level]?p.level:'beginner');
  const target=c.metric==='days'?{beginner:8,intermediate:12,expert:16}[L]:Math.round(c.target*{beginner:.6,intermediate:1,expert:1.5}[L]/10)*10;
  return Object.assign({},c,{id:`${d.getFullYear()}-${pad(d.getMonth()+1)}-${c.k}`,target,month:d.toLocaleDateString(undefined,{month:'long'}),
    daysLeft:new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate()});
}
const activeMinutes=e=>e.kind==='activity'?(e.minutes||0):(e.sets||[]).length*2; // about 2 minutes per set, rest included
function challengeProgress(c,p=profile){
  const j=getJournal(p),d=new Date(),first=new Date(d.getFullYear(),d.getMonth(),1);
  const days=workoutDates(j).filter(x=>parseIso(x)>=first);
  if(c.metric==='days')return days.length;
  let n=0;days.forEach(x=>j[x].forEach(e=>{if(c.metric==='minutes')n+=activeMinutes(e);else if(c.match.test(e.exercise))(e.sets||[]).forEach(s=>n+=Number(s.reps)||0)}));
  return Math.round(n);
}
function challengeCard(){
  const c=currentChallenge(),n=challengeProgress(c),pct=Math.min(100,n/c.target*100),done=n>=c.target;
  const fam=DB.list.length>1?DB.list.filter(p=>p.id!==profile.id).map(p=>{const pc=currentChallenge(p),pn=challengeProgress(pc,p);return `<span class="badge">${esc(p.avatar||'🙂')} ${esc(p.name||'')} ${Math.min(100,Math.round(pn/pc.target*100))}%</span>`}).join(''):'';
  return `<div class="card stack chal"><div class="row between"><b>${c.e} ${c.month} challenge: ${c.name}</b>${done?'<span>🏆</span>':''}</div>
    <p class="small muted">${done?`You did it! ${n} ${c.what}. Amazing! 🎉`:`Do <b>${c.target}</b> ${c.what} this month. ${c.daysLeft} ${c.daysLeft===1?'day':'days'} left!`}</p>
    <div class="progress"><i style="width:${pct}%"></i></div><p class="small"><b>${n}</b> / ${c.target}</p>${fam?`<div>${fam}</div>`:''}</div>`;
}
function checkChallenge(){
  const c=currentChallenge();if((profile.chDone||[]).includes(c.id))return;
  if(challengeProgress(c)>=c.target){profile.chDone=[...(profile.chDone||[]),c.id].slice(-60);saveProfile();setTimeout(()=>{toast(`🏆 ${c.name} challenge complete!`);say(`Challenge complete! You are a ${c.name} champion!`)},500);syncNow(true)}
}

/* ---------- Goals ---------- */
const GOAL_TYPES={lift:'💪 Lift heavier',reps:'🔁 More reps',workouts:'📅 Workouts',minutes:'⏱ Active minutes'};
function goalProgress(g){
  const j=getJournal();
  if(g.type==='lift'||g.type==='reps'){let b=0;workoutDates(j).forEach(d=>j[d].forEach(e=>{if(e.exercise!==g.ex)return;(e.sets||[]).forEach(s=>{b=Math.max(b,g.type==='lift'?toUnit(Number(s.weight)||0,e.unit):Number(s.reps)||0)})}));return round1(b)}
  const ds=workoutDates(j).filter(d=>d>=g.start);
  if(g.type==='workouts')return ds.length;
  let n=0;ds.forEach(d=>j[d].forEach(e=>n+=activeMinutes(e)));return Math.round(n);
}
const goalTitle=g=>g.type==='lift'?`${g.ex}: ${g.target} ${profile.unit}`:g.type==='reps'?`${g.ex}: ${g.target} ${EX[exByName(g.ex)]&&EX[exByName(g.ex)].time?'seconds':'reps'} in one set`:g.type==='workouts'?`${g.target} active days`:`${g.target} active minutes`;
function goalsCard(){
  const G=profile.goals||[];
  return `<div class="card stack"><div class="row between"><h2 class="h3">🎯 Goals</h2><button class="btn sm secondary" id="goalnew">＋ New goal</button></div>
    ${G.length?G.map(g=>{const n=goalProgress(g),pct=Math.min(100,n/g.target*100),left=Math.ceil((parseIso(g.by)-parseIso(isoLocal()))/864e5);
      return `<div><div class="row between"><b class="small">${esc(goalTitle(g))}</b><button class="xbtn" data-gdel="${esc(g.id)}" aria-label="Delete goal">✕</button></div>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <p class="small muted">${g.done?`✅ Reached on ${niceDate(g.done)}! 🎉`:`${n} / ${g.target} · ${left>0?`${left} ${left===1?'day':'days'} left (by ${niceDate(g.by)})`:left===0?'due today!':'past the date. Keep going or set a new one'}`}</p></div>`}).join('')
      :`<p class="small muted">Set a goal like "Bench 135 lbs by March" or "20 workouts this term", and watch the bar fill up!</p>`}
  </div>`;
}
function checkGoals(){
  let changed=false;(profile.goals||[]).forEach(g=>{if(!g.done&&goalProgress(g)>=g.target){g.done=isoLocal();changed=true;const t=goalTitle(g);setTimeout(()=>{toast(`🎯 Goal reached: ${t}!`);say('Goal reached! Amazing work!')},700)}});
  if(changed){saveProfile();syncNow(true)}
}
function goalSheet(){
  const in8=isoLocal(new Date(Date.now()+56*864e5));
  const st={type:'workouts',ex:'',target:'',by:in8};
  const exOpts=()=>Object.keys(EX).filter(id=>!id.startsWith('_')&&(st.type==='lift'?EX[id].weight:!EX[id].weight)).map(id=>EX[id].name).sort();
  const suggest=()=>{if(st.type==='workouts')return 20;if(st.type==='minutes')return 600;if(!st.ex)return '';const cur=goalProgress({type:st.type,ex:st.ex});return cur?Math.ceil(cur*1.15/(st.type==='lift'?5:1))*(st.type==='lift'?5:1):(st.type==='lift'?20:10)};
  const draw=()=>sheet(`<h2>🎯 New goal</h2>
    <div class="chips">${Object.entries(GOAL_TYPES).map(([k,l])=>`<button class="${st.type===k?'on':''}" data-gt="${k}">${l}</button>`).join('')}</div>
    ${st.type==='lift'||st.type==='reps'?`<div><label class="small muted" style="font-weight:700">EXERCISE</label><select class="sel" id="gex"><option value="">Pick an exercise…</option>${exOpts().map(n=>`<option ${n===st.ex?'selected':''}>${esc(n)}</option>`).join('')}</select>${st.ex?`<p class="small muted" style="margin-top:6px">Your best so far: <b>${goalProgress({type:st.type,ex:st.ex})||'none yet'}</b></p>`:''}</div>`:''}
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">TARGET ${st.type==='lift'?'('+profile.unit+')':st.type==='minutes'?'(minutes)':st.type==='workouts'?'(days)':'(reps)'}</label><input class="num" id="gt" type="number" inputmode="decimal" min="1" value="${st.target||suggest()}"></div>
      <div style="flex:1"><label class="small muted" style="font-weight:700">BY</label><input class="num" id="gby" type="date" min="${isoLocal()}" value="${st.by}" style="font-size:16px"></div></div>
    <p class="small muted">💡 A good goal is a little hard but doable. Aim for about 10–20% better in 6–8 weeks.</p>
    <button class="btn" id="gsave">Set goal</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{st.target=$('#gt').value;st.by=$('#gby').value||in8;if($('#gex'))st.ex=$('#gex').value};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-gt]').forEach(b=>b.onclick=()=>{read();st.type=b.dataset.gt;st.ex='';st.target='';draw()});
    if($('#gex'))$('#gex').onchange=()=>{read();st.target='';draw()};
    $('#gsave').onclick=()=>{read();const t=parseFloat(st.target);
      if((st.type==='lift'||st.type==='reps')&&!st.ex){toast('Pick an exercise');return}
      if(!(t>0)){toast('Enter a target');return}
      profile.goals=[...(profile.goals||[]),{id:newId('g'),type:st.type,ex:st.ex,target:t,start:isoLocal(),by:st.by,done:null}].slice(-20);
      saveProfile();closeLayer();toast('🎯 Goal set. You\'ve got this!');syncNow(true);checkGoals();render()};
  });
  draw();
}
function bindGoals(v){
  if($('#goalnew'))$('#goalnew').onclick=goalSheet;
  v.querySelectorAll('[data-gdel]').forEach(b=>b.onclick=()=>{const before=(profile.goals||[]).slice();profile.goals=before.filter(g=>g.id!==b.dataset.gdel);saveProfile();render();
    undoable('Goal deleted',()=>{profile.goals=before;saveProfile();render()},()=>syncNow(true))});
}
function goalPeek(){
  const g=(profile.goals||[]).find(x=>!x.done);if(!g)return '';
  const n=goalProgress(g),pct=Math.min(100,Math.round(n/g.target*100));
  return `<button class="card row" data-go="progress" style="width:100%;text-align:left"><span class="big-emoji">🎯</span><div style="flex:1"><b>${esc(goalTitle(g))}</b><div class="progress" style="margin-top:6px"><i style="width:${pct}%"></i></div></div><b>${pct}%</b></button>`;
}
