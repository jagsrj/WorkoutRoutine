/* JAMS Fitness · Workouts library, custom workouts, records, muscle map, plates, activities, body, family, reminders, parent lock. */
/* =========================================================
   Pro features: custom workouts & exercises, sport plans, PRs, muscle map,
   plate calculator, effort rating, activities, body measurements, voice coach,
   family challenges, reminders, parent lock.
   ========================================================= */

/* ---------- Custom exercises live in each person's profile ---------- */
function loadCustom(){
  Object.keys(EX).forEach(k=>{if(k.startsWith('c_'))delete EX[k]});
  Object.entries(profile.customEx||{}).forEach(([k,v])=>{if(k.startsWith('c_')&&v&&v.name)EX[k]=Object.assign({e:'⭐',m:['Other'],steps:[],tip:'Move with control and good form.'},v)});
}
const exByName=n=>Object.keys(EX).find(k=>EX[k].name===n);
const newId=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);

/* ---------- Voice coach ---------- */
let voiceOn=store.get('jams_voice',true);
function say(text){
  if(!voiceOn||!('speechSynthesis' in window)||!text)return;
  try{const u=new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,''));u.rate=1;u.pitch=1.05;u.lang='en-US';speechSynthesis.speak(u)}catch(e){}
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(!b)return;const ex=EX[b.dataset.say];if(!ex)return;
  try{speechSynthesis.cancel()}catch(err){}const was=voiceOn;voiceOn=true;say(`${ex.name}. ${ex.steps.map((s,i)=>`Step ${i+1}. ${s}`).join(' ')} Tip: ${ex.tip}`);voiceOn=was});

/* ---------- Plans: level plan, my workouts, sport plans ---------- */
function startCustom(kind,id){
  const src=kind==='r'?(profile.routines||[]).find(r=>r.id===id):SPORTS.find(s=>s.id===id);if(!src)return;
  const plan=src.items.filter(p=>EX[p[0]]).map(p=>[p[0],+p[1]||3,+p[2]||8,+p[3]||+p[2]||12]);
  if(!plan.length){toast('This workout has no exercises yet');return}
  const key=kind+':'+id,cur=store.get(pKey('jams_active'),null);
  if(cur&&cur.key===key){go('workout',key);return}
  const start=()=>{
    const a={key,level:profile.level,title:src.name,emoji:src.e,plan,date:isoLocal(),started:Date.now(),items:plan.map(p=>({id:p[0],sets:freshSets(p[0],p[1])}))};
    store.set(pKey('jams_active'),a);go('workout',key);say(`Let's go! ${src.name}. First up: ${EX[plan[0][0]].name}.`);
  };
  if(cur)confirmBox('Start a new workout?','You have another workout in progress. Starting this one will cancel it.','Start new',start);else start();
}
function routineSheet(r){
  r=r?JSON.parse(JSON.stringify(r)):{id:newId('r'),name:'',e:'💪',items:[]};
  const EM=['💪','🦵','🏋️','⚡','🔥','🏃','🧘','⭐','🎯','🚀','🏏','⚽'];
  const draw=()=>sheet(`<h2>${r.name?esc(r.name):'New workout'} ✏️</h2>
    <input class="txt" id="rn" maxlength="30" placeholder="Workout name, like 'Arm day'" value="${esc(r.name)}">
    <div class="avatars">${EM.map(x=>`<button class="${x===r.e?'sel':''}" data-re="${x}">${x}</button>`).join('')}</div>
    <div class="stack">${r.items.map((p,i)=>{const ex=EX[p[0]];if(!ex)return '';return `<div class="ritem"><div class="row between"><b>${esc(ex.e)} ${esc(ex.name)}</b><span><button class="xbtn" data-up="${i}" ${i?'':'disabled'} aria-label="Move up">⬆️</button><button class="xbtn" data-dn="${i}" ${i<r.items.length-1?'':'disabled'} aria-label="Move down">⬇️</button><button class="xbtn" data-rx="${i}" aria-label="Remove">✕</button></span></div>
      <div class="row" style="gap:6px;margin-top:6px"><input class="num sm" type="number" inputmode="numeric" min="1" max="10" value="${p[1]}" data-f="1" data-i="${i}" aria-label="Sets"><span class="small muted">sets ×</span><input class="num sm" type="number" inputmode="numeric" min="1" value="${p[2]}" data-f="2" data-i="${i}" aria-label="Low"><span class="small muted">to</span><input class="num sm" type="number" inputmode="numeric" min="1" value="${p[3]}" data-f="3" data-i="${i}" aria-label="High"><span class="small muted">${ex.time?'sec':'reps'}</span></div></div>`}).join('')}</div>
    <button class="btn secondary" id="radd">＋ Add an exercise</button>
    <button class="btn" id="rsave">Save workout</button>
    ${(profile.routines||[]).some(x=>x.id===r.id)?`<button class="btn danger" id="rdel">Delete workout</button>`:''}
    <button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{r.name=$('#rn').value.trim();document.querySelectorAll('.ritem input[data-f]').forEach(x=>{r.items[x.dataset.i][x.dataset.f]=Math.max(1,parseInt(x.value)||1)})};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-re]').forEach(b=>b.onclick=()=>{read();r.e=b.dataset.re;draw()});
    document.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{read();const i=+b.dataset.up;[r.items[i-1],r.items[i]]=[r.items[i],r.items[i-1]];draw()});
    document.querySelectorAll('[data-dn]').forEach(b=>b.onclick=()=>{read();const i=+b.dataset.dn;[r.items[i+1],r.items[i]]=[r.items[i],r.items[i+1]];draw()});
    document.querySelectorAll('[data-rx]').forEach(b=>b.onclick=()=>{read();r.items.splice(+b.dataset.rx,1);draw()});
    $('#radd').onclick=()=>{read();pickExercise(id=>{const ex=EX[id];r.items.push([id,3,ex.time?20:8,ex.time?40:12]);draw()},draw)};
    $('#rsave').onclick=()=>{read();if(!r.name){toast('Give your workout a name');return}if(!r.items.length){toast('Add at least one exercise');return}
      const list=(profile.routines||[]).filter(x=>x.id!==r.id);list.push(r);profile.routines=list;saveProfile();closeLayer();toast('⭐ Workout saved');syncNow(true);if(route==='library')render()};
    if($('#rdel'))$('#rdel').onclick=()=>confirmBox('Delete this workout?','Your history stays. Only the saved workout is removed.','Delete',()=>{profile.routines=(profile.routines||[]).filter(x=>x.id!==r.id);saveProfile();syncNow(true);render()},true);
  });
  draw();
}
function pickExercise(onPick,onBack){
  let q='',f='';
  const draw=()=>{
    const list=Object.keys(EX).filter(k=>!k.startsWith('_')).map(k=>[k,EX[k]]).filter(([k,ex])=>exMatches(ex,f)&&(!q||ex.name.toLowerCase().includes(q))).sort((a,b)=>a[1].name.localeCompare(b[1].name));
    sheet(`<h2>Add an exercise</h2><input class="txt" id="pq" placeholder="🔎 Search" value="${esc(q)}" autocomplete="off">
      <div class="chips">${['',...MUSCLE_FILTERS].map(m=>`<button class="${m===f?'on':''}" data-mf="${m}">${m||'All'}</button>`).join('')}</div>
      <div class="stack">${list.map(([k,ex])=>`<button class="who" data-pk="${k}"><span class="av">${esc(ex.e)}</span><span style="flex:1;text-align:left"><b>${esc(ex.name)}</b><br><span class="small muted">${ex.m.join(', ')}${ex.weight?' · weights':''}</span></span></button>`).join('')||'<p class="muted center">No matches</p>'}</div>
      <button class="btn ghost" id="pback">Back</button>`,()=>{
      const inp=$('#pq');inp.oninput=()=>{q=inp.value.toLowerCase().trim();const pos=inp.selectionStart;draw();const n=$('#pq');n.focus();n.setSelectionRange(pos,pos)};
      document.querySelectorAll('[data-mf]').forEach(b=>b.onclick=()=>{f=b.dataset.mf;draw()});
      document.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>onPick(b.dataset.pk));
      $('#pback').onclick=onBack;
    });
  };
  draw();
}
function exerciseSheet(id){
  const cur=id?Object.assign({},profile.customEx[id]):{name:'',e:'⭐',m:[],weight:false,time:false,steps:[],tip:''};
  const EM=['⭐','💪','🦵','🏋️','🤸','🧘','🏃','🔥','🎯','🦾','🥊','🧗'],MS=['Chest','Back','Shoulders','Biceps','Triceps','Core','Legs','Glutes','Calves','Heart'];
  const draw=()=>sheet(`<h2>${id?'Edit':'New'} exercise</h2>
    <input class="txt" id="xn" maxlength="40" placeholder="Exercise name" value="${esc(cur.name)}">
    <div class="avatars">${EM.map(x=>`<button class="${x===cur.e?'sel':''}" data-xe="${x}">${x}</button>`).join('')}</div>
    <p class="small muted" style="font-weight:700">MUSCLES WORKED</p><div class="chips">${MS.map(m=>`<button class="${cur.m.includes(m)?'on':''}" data-xm="${m}">${m}</button>`).join('')}</div>
    <div class="seg"><button class="${cur.time?'':'on'}" data-xt="0">Count reps</button><button class="${cur.time?'on':''}" data-xt="1">Timed</button></div>
    <div class="seg"><button class="${cur.weight?'':'on'}" data-xw="0">No weights</button><button class="${cur.weight?'on':''}" data-xw="1">Uses weights</button></div>
    <textarea class="txt area" id="xs" rows="4" placeholder="How to do it (one step per line)">${esc(cur.steps.join('\n'))}</textarea>
    <input class="txt" id="xtip" maxlength="120" placeholder="Safety tip (optional)" value="${esc(cur.tip)}">
    <button class="btn" id="xsave">Save exercise</button>${id?`<button class="btn danger" id="xdel">Delete exercise</button>`:''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{cur.name=$('#xn').value.trim();cur.steps=$('#xs').value.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,8);cur.tip=$('#xtip').value.trim()};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-xe]').forEach(b=>b.onclick=()=>{read();cur.e=b.dataset.xe;draw()});
    document.querySelectorAll('[data-xm]').forEach(b=>b.onclick=()=>{read();const m=b.dataset.xm;cur.m=cur.m.includes(m)?cur.m.filter(x=>x!==m):[...cur.m,m];draw()});
    document.querySelectorAll('[data-xt]').forEach(b=>b.onclick=()=>{read();cur.time=b.dataset.xt==='1';draw()});
    document.querySelectorAll('[data-xw]').forEach(b=>b.onclick=()=>{read();cur.weight=b.dataset.xw==='1';draw()});
    $('#xsave').onclick=()=>{read();if(!cur.name){toast('Give it a name');return}
      if(Object.keys(EX).some(k=>k!==id&&EX[k].name.toLowerCase()===cur.name.toLowerCase())){toast('An exercise with that name already exists');return}
      if(!cur.m.length)cur.m=['Other'];if(!cur.steps.length)cur.steps=['Move slowly and with control.'];if(!cur.tip)cur.tip='Stop if anything hurts.';
      profile.customEx=Object.assign({},profile.customEx||{},{[id||newId('c_')]:cur});saveProfile();loadCustom();closeLayer();toast('⭐ Exercise saved');syncNow(true);render()};
    if($('#xdel'))$('#xdel').onclick=()=>confirmBox('Delete this exercise?','It will be removed from your saved workouts. Your history stays.','Delete',()=>{
      const c=Object.assign({},profile.customEx);delete c[id];profile.customEx=c;(profile.routines||[]).forEach(r=>r.items=r.items.filter(p=>p[0]!==id));saveProfile();loadCustom();syncNow(true);render()},true);
  });
  draw();
}

/* ---------- Library (Workouts tab) ---------- */
let libTab='plan',libFilter='',libQuery='';
function renderLibrary(v){
  libLevel=libLevel||profile.level;
  const tabs=[['plan','📋 Plan'],['mine','⭐ Mine'],['sports','🏅 Sports'],['all','🔎 All']];
  let body='';
  if(libTab==='plan'){
    const plan=PLANS[libLevel];
    body=`${stretchCard()}<div class="seg">${Object.keys(LEVELS).map(k=>`<button class="${k===libLevel?'on':''}" data-l="${k}">${LEVELS[k].emoji} ${LEVELS[k].name}</button>`).join('')}</div>
    <p class="small muted">🧰 ${LEVELS[libLevel].equipment}</p>
    ${Object.keys(WORKOUTS).map(w=>`<div class="stack"><h3>${WORKOUTS[w].e} ${WORKOUTS[w].name} <span class="muted small">· ${WORKOUTS[w].sub}</span></h3>
      ${plan[w].map(p=>exCard(p[0],repsText(p,EX[p[0]]))).join('')}</div>`).join('')}`;
  }else if(libTab==='mine'){
    const rs=profile.routines||[],cx=Object.keys(profile.customEx||{});
    body=`<div class="stack"><h3>My workouts</h3>
      ${rs.length?rs.map(r=>`<div class="card row" style="padding:14px"><span class="ex-emoji">${r.e}</span><div style="flex:1"><b>${esc(r.name)}</b><p class="small muted">${plural(r.items.length,'exercise')}</p></div><button class="btn sm ghost" data-redit="${r.id}" aria-label="Edit">✏️</button><button class="btn sm" data-rstart="${r.id}">▶</button></div>`).join('')
        :`<div class="card empty"><div class="big-emoji">📝</div><p class="muted">Build your own workout from any exercises. Great for leg day, sports practice or a quick 10 minutes.</p></div>`}
      <button class="btn" id="rnew">＋ Create a workout</button></div>
    <div class="stack"><h3>My exercises</h3>
      ${cx.length?cx.map(k=>exCard(k,'',true)).join(''):`<p class="small muted">Can't find a move in the library? Add your own, with your own steps.</p>`}
      <button class="btn secondary" id="xnew">＋ Create an exercise</button></div>`;
  }else if(libTab==='sports'){
    body=`<p class="muted">Short workouts that make you better at your sport. They use bodyweight moves, so you can do them anywhere.</p>
    ${SPORTS.map(s=>`<div class="card stack"><div class="row"><span class="ex-emoji">${s.e}</span><div style="flex:1"><b>${s.name}</b><p class="small muted">${s.sub}</p></div></div>
      <details class="how"><summary>See the ${s.items.length} exercises</summary><ol>${s.items.map(p=>`<li>${EX[p[0]].e} ${EX[p[0]].name}: ${repsText([0,p[1],p[2],p[3]],EX[p[0]])}</li>`).join('')}</ol></details>
      <div class="row" style="gap:8px"><button class="btn sm" style="flex:1" data-sstart="${s.id}">Start ▶</button><button class="btn sm secondary" style="flex:1" data-ssave="${s.id}">⭐ Save to mine</button></div></div>`).join('')}`;
  }else{
    const list=Object.keys(EX).filter(k=>!k.startsWith('_')).filter(k=>exMatches(EX[k],libFilter)&&(!libQuery||EX[k].name.toLowerCase().includes(libQuery))).sort((a,b)=>EX[a].name.localeCompare(EX[b].name));
    body=`<input class="txt" id="lq" placeholder="🔎 Search ${Object.keys(EX).filter(k=>!k.startsWith('_')).length} exercises" value="${esc(libQuery)}" autocomplete="off">
      <div class="chips">${['',...MUSCLE_FILTERS].map(m=>`<button class="${m===libFilter?'on':''}" data-mf="${m}">${m||'All'}</button>`).join('')}</div>
      <div class="stack" id="lres">${list.map(k=>exCard(k,'',k.startsWith('c_'))).join('')||'<p class="muted center">No matches</p>'}</div>`;
  }
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg">
    <div><h1>Workouts & moves 📚</h1><p class="muted" style="margin-top:4px">Learn every move, build your own workouts, or train for your sport.</p></div>
    <div class="seg">${tabs.map(t=>`<button class="${t[0]===libTab?'on':''}" data-lt="${t[0]}">${t[1]}</button>`).join('')}</div>
    ${body}</div>`;
  v.querySelectorAll('[data-lt]').forEach(b=>b.onclick=()=>{libTab=b.dataset.lt;renderLibrary(v)});
  v.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{libLevel=b.dataset.l;renderLibrary(v)});
  v.querySelectorAll('[data-mf]').forEach(b=>b.onclick=()=>{libFilter=b.dataset.mf;renderLibrary(v)});
  v.querySelectorAll('[data-rstart]').forEach(b=>b.onclick=()=>startCustom('r',b.dataset.rstart));
  v.querySelectorAll('[data-redit]').forEach(b=>b.onclick=()=>routineSheet((profile.routines||[]).find(r=>r.id===b.dataset.redit)));
  v.querySelectorAll('[data-sstart]').forEach(b=>b.onclick=()=>startCustom('s',b.dataset.sstart));
  v.querySelectorAll('[data-ssave]').forEach(b=>b.onclick=()=>{const s=SPORTS.find(x=>x.id===b.dataset.ssave);routineSheet({id:newId('r'),name:s.name+' training',e:s.e,items:s.items.map(p=>p.slice())})});
  v.querySelectorAll('[data-xedit]').forEach(b=>b.onclick=()=>exerciseSheet(b.dataset.xedit));
  if($('#rnew'))$('#rnew').onclick=()=>routineSheet();
  if($('#xnew'))$('#xnew').onclick=()=>exerciseSheet();
  if($('#lq'))$('#lq').oninput=e=>{libQuery=e.target.value.toLowerCase().trim();const pos=e.target.selectionStart;renderLibrary(v);const n=$('#lq');n.focus();n.setSelectionRange(pos,pos)};
}
function exCard(id,target,editable){
  const ex=EX[id];
  return `<div class="card ex"><div class="ex-head"><div class="ex-emoji">${esc(ex.e)}</div><div style="flex:1"><div class="ex-title">${esc(ex.name)}</div>${target?`<div class="target">${target}</div>`:''}<div>${ex.m.map(m=>`<span class="chip">${esc(m)}</span>`).join('')}${ex.weight?'<span class="chip">🏋️ weights</span>':''}</div></div>${editable?`<button class="xbtn" data-xedit="${id}" aria-label="Edit">✏️</button>`:''}</div>
    ${howTo(id)}</div>`;
}

/* ---------- Personal records ---------- */
const e1rm=(w,r)=>w>0&&r>0?(r===1?w:w*(1+Math.min(r,12)/30)):0;
function bestOf(sets,unit){
  let w=0,er=0,reps=0,wr=0;
  (sets||[]).forEach(s=>{const kg=toUnit(Number(s.weight)||0,unit),r=Number(s.reps)||0;if(kg>w||(kg===w&&r>wr)){w=kg;wr=r}er=Math.max(er,e1rm(kg,r));reps=Math.max(reps,r)});
  return {w,wr,er,reps};
}
function recordsTable(j=getJournal()){
  const rec={};
  workoutDates(j).forEach(d=>j[d].forEach(e=>{if(e.kind==='activity'||!(e.sets||[]).length)return;const b=bestOf(e.sets,e.unit),R=rec[e.exercise]||(rec[e.exercise]={w:0,wr:0,er:0,reps:0,d:d});
    if(b.w>R.w||(b.w===R.w&&b.wr>R.wr)){R.w=b.w;R.wr=b.wr;R.d=d}if(b.er>R.er)R.er=b.er;if(b.reps>R.reps){R.reps=b.reps;if(!R.w)R.d=d}}));
  return rec;
}
function findPRs(before,entries){
  const out=[];
  entries.forEach(e=>{const prev=before[e.exercise];if(!prev)return;const b=bestOf(e.sets,e.unit),ex=EX[exByName(e.exercise)]||{};
    if(b.w>0&&b.w>prev.w)out.push(`${e.exercise}: ${round1(b.w)} ${profile.unit} × ${b.wr}`);
    else if(b.w>0&&b.er>prev.er+0.4)out.push(`${e.exercise}: est. 1-rep max ${Math.round(b.er)} ${profile.unit}`);
    else if(!b.w&&b.reps>prev.reps)out.push(`${e.exercise}: ${b.reps} ${ex.time?'seconds':'reps'}`)});
  return out;
}
function recordsCard(){
  const rec=recordsTable(),names=Object.keys(rec).sort((a,b)=>rec[b].d.localeCompare(rec[a].d));
  if(!names.length)return '';
  return `<details class="card fold"><summary><b>🏆 Personal records (${names.length})</b></summary><div class="stack" style="margin-top:12px">
    ${names.map(n=>{const R=rec[n],ex=EX[exByName(n)]||{};return `<div class="row between rec"><span><b>${esc(n)}</b><br><span class="small muted">${niceDate(R.d)}</span></span><span style="text-align:right">${R.w?`<b>${round1(R.w)} ${profile.unit}</b> × ${R.wr}<br><span class="small muted">est. 1RM ${Math.round(R.er)}</span>`:`<b>${R.reps}</b> ${ex.time?'sec':'reps'}`}</span></div>`}).join('')}
  </div></details>`;
}

/* ---------- Muscle map ---------- */
function weekMuscles(){
  const j=getJournal(),ws=weekStart(new Date()),cnt={};
  workoutDates(j).filter(d=>parseIso(d)>=ws).forEach(d=>j[d].forEach(e=>{const ex=EX[exByName(e.exercise)];if(!ex)return;const n=(e.sets||[]).length;
    new Set(ex.m.flatMap(m=>MUSCLE_KEYS[m]||[])).forEach(k=>cnt[k]=(cnt[k]||0)+n)}));
  return cnt;
}
function muscleMap(){
  const c=weekMuscles(),fill=k=>{const n=c[k]||0;return n?`fill="var(--lvl)" fill-opacity="${n>=9?1:n>=4?.7:.4}"`:'fill="var(--line)"'};
  const E=(k,x,y,rx,ry)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${fill(k)}><title>${k}: ${c[k]||0} sets</title></ellipse>`;
  const R=(k,x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" ${fill(k)}><title>${k}: ${c[k]||0} sets</title></rect>`;
  const body=(cx,front)=>`<circle cx="${cx}" cy="22" r="11" fill="var(--line)"/>`+
    E('shoulders',cx-17,46,8,6)+E('shoulders',cx+17,46,8,6)+
    (front?E('chest',cx-7,56,8,7)+E('chest',cx+7,56,8,7)+R('abs',cx-8,66,16,28)+E('biceps',cx-23,66,5,11)+E('biceps',cx+23,66,5,11)+E('quads',cx-7,120,7,21)+E('quads',cx+7,120,7,21)
      :R('upperback',cx-12,48,24,22)+R('lowerback',cx-8,72,16,18)+E('triceps',cx-23,66,5,11)+E('triceps',cx+23,66,5,11)+E('glutes',cx-7,100,8,8)+E('glutes',cx+7,100,8,8)+E('hams',cx-7,124,7,17)+E('hams',cx+7,124,7,17))+
    E('forearms',cx-26,90,4,10)+E('forearms',cx+26,90,4,10)+E('calves',cx-7,160,5,14)+E('calves',cx+7,160,5,14);
  const top=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,n])=>`${({upperback:'upper back',lowerback:'lower back',hams:'hamstrings'})[k]||k} (${n})`);
  return `<div class="card stack"><h3>💪 Muscles this week</h3>
    <svg viewBox="0 0 200 182" class="mmap" role="img" aria-label="Body map of muscles trained this week">${body(50,true)}${body(150,false)}<text x="50" y="181" text-anchor="middle" font-size="9" fill="var(--muted)">FRONT</text><text x="150" y="181" text-anchor="middle" font-size="9" fill="var(--muted)">BACK</text></svg>
    <p class="small muted">${top.length?`Most trained: ${top.join(', ')} sets. Darker = more sets.`:'Finish a workout and the muscles you worked light up here.'}</p></div>`;
}

/* ---------- Plate calculator & warm-up sets ---------- */
function platesSheet(target){
  const kg=profile.unit==='kg',PL=kg?[25,20,15,10,5,2.5,1.25]:[45,35,25,10,5,2.5];let bar=store.get('jams_bar',kg?20:45),t=target;
  const COL={45:'#dc2626',25:'#16a34a',35:'#eab308',10:'#64748b',5:'#2563eb',2.5:'#94a3b8',20:'#2563eb',15:'#eab308',1.25:'#cbd5e1'};
  const calc=x=>{let side=Math.max(0,(x-bar)/2);const out=[];PL.forEach(p=>{while(side>=p-1e-9){out.push(p);side-=p}});return {out,left:round1(side*2)}};
  const rnd=x=>Math.round(x/(kg?2.5:5))*(kg?2.5:5);
  const update=()=>{const {out,left}=calc(t);
    const warm=t>bar*1.5?[[bar,10],[rnd(t*.4),5],[rnd(t*.6),3],[rnd(t*.8),2]].filter((x,i,a)=>i===0||x[0]>a[i-1][0]&&x[0]<t):[[bar,10]];
    $('#pres').innerHTML=`<div class="barviz"><div class="barline"></div><div class="plates">${out.map(p=>`<i style="height:${30+p/(kg?25:45)*60}px;background:${COL[p]||'#64748b'}" title="${p}"></i>`).join('')||'<span class="small muted">Just the bar!</span>'}</div></div>
      <p class="center"><b>Each side:</b> ${out.length?out.join(' + ')+' '+profile.unit:'nothing, just the bar'}${left>0?`<br><span class="small muted">(${left} ${profile.unit} can't be made with standard plates)</span>`:''}</p>
      <div class="card stack" style="background:var(--bg)"><b>🔥 Warm-up sets before ${t} ${profile.unit}</b>${warm.map(([w,r])=>`<div class="row between"><span>${w===bar?'Empty bar':w+' '+profile.unit}</span><b>× ${r}</b></div>`).join('')}<p class="small muted">Rest about a minute between warm-up sets.</p></div>`;
    document.querySelectorAll('[data-bar]').forEach(b=>b.classList.toggle('on',+b.dataset.bar===bar));
  };
  sheet(`<h2>🧮 Plate calculator</h2>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">TARGET (${profile.unit})</label><input class="num" id="pt" type="number" inputmode="decimal" step="${kg?2.5:5}" value="${t}"></div>
    <div style="flex:1"><label class="small muted" style="font-weight:700">BAR</label><div class="seg">${(kg?[20,15,10]:[45,35,15]).map(b=>`<button data-bar="${b}">${b}</button>`).join('')}</div></div></div>
    <div id="pres" class="stack"></div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#pt').oninput=e=>{const x=parseFloat(e.target.value);if(x>0){t=x;update()}};
    document.querySelectorAll('[data-bar]').forEach(b=>b.onclick=()=>{bar=+b.dataset.bar;store.set('jams_bar',bar);update()});
    update();
  });
}

/* ---------- Activities (sports, cardio) ---------- */
function activitySheet(edit){
  const j=getJournal();let e=edit?(j[edit.d]||[]).find(x=>String(x.id)===String(edit.id)):null;
  const st=e?{act:e.act,e:e.exercise.split(' ')[0],min:e.minutes,dist:e.distance||'',date:edit.d,eff:e.effort||2}:{act:'Walk',e:'🚶',min:30,dist:'',date:isoLocal(),eff:2};
  const du=profile.unit==='kg'?'km':'mi';
  const draw=()=>sheet(`<h2>${e?'Edit activity':'Log an activity'} 🏃</h2>
    <div class="actgrid">${ACTIVITIES.map(([em,n])=>`<button class="${n===st.act?'sel':''}" data-act="${n}" data-ae="${em}"><span>${em}</span>${n}</button>`).join('')}</div>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">MINUTES</label><input class="num" id="am" type="number" inputmode="numeric" min="1" value="${st.min}"></div>
      <div style="flex:1"><label class="small muted" style="font-weight:700">DISTANCE (${du}, optional)</label><input class="num" id="ad" type="number" inputmode="decimal" step="0.1" min="0" value="${st.dist}"></div></div>
    <div class="chips">${[15,30,45,60,90].map(m=>`<button data-qm="${m}">${m} min</button>`).join('')}</div>
    <div><label class="small muted" style="font-weight:700">DATE</label><input class="num" id="adate" type="date" max="${isoLocal()}" value="${st.date}" style="font-size:16px"></div>
    <p class="small muted" style="font-weight:700">HOW HARD WAS IT?</p><div class="seg">${[[1,'😊 Easy'],[2,'💪 Good'],[3,'😫 Tough']].map(x=>`<button class="${st.eff===x[0]?'on':''}" data-aeff="${x[0]}">${x[1]}</button>`).join('')}</div>
    <button class="btn" id="asave">Save</button>${e?'<button class="btn danger" id="adel">Delete</button>':''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{st.min=$('#am').value;st.dist=$('#ad').value;st.date=$('#adate').value||isoLocal()};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>{read();st.act=b.dataset.act;st.e=b.dataset.ae;draw()});
    document.querySelectorAll('[data-qm]').forEach(b=>b.onclick=()=>{read();st.min=b.dataset.qm;draw()});
    document.querySelectorAll('[data-aeff]').forEach(b=>b.onclick=()=>{read();st.eff=+b.dataset.aeff;draw()});
    $('#asave').onclick=()=>{read();const min=parseInt(st.min)||0;if(min<1){toast('How many minutes?');return}
      const jj=getJournal();
      if(e){jj[edit.d]=(jj[edit.d]||[]).filter(x=>String(x.id)!==String(e.id));if(!jj[edit.d].length)delete jj[edit.d]}
      const entry={id:e?e.id:Date.now(),exercise:`${st.e} ${st.act}`,kind:'activity',act:st.act,minutes:min,distance:parseFloat(st.dist)||0,dunit:du,effort:st.eff,sets:[],
        timestamp:e?e.timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),level:profile.level,u:Date.now()};
      (jj[st.date]=jj[st.date]||[]).push(entry);setJournal(jj);closeLayer();toast(e?'Saved ✅':`${st.e} ${min} minutes logged!`);
      if(!e){say(`Nice! ${min} minutes of ${st.act.toLowerCase()} logged.`);const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),1200)}
      syncNow(true);render()};
    if($('#adel'))$('#adel').onclick=()=>{const jj=getJournal();jj[edit.d]=(jj[edit.d]||[]).filter(x=>String(x.id)!==String(e.id));if(!jj[edit.d].length)delete jj[edit.d];setJournal(jj);addTomb(e.id);closeLayer();toast('Deleted');syncNow(true);render()};
  });
  draw();
}
function activityCard(){
  const j=getJournal(),ws=weekStart(new Date());let min=0,n=0;
  workoutDates(j).filter(d=>parseIso(d)>=ws).forEach(d=>j[d].forEach(e=>{if(e.kind==='activity'){min+=e.minutes||0;n++}}));
  return `<div class="card row"><span class="big-emoji">🏃</span><div style="flex:1"><b>${min} active minutes this week</b><p class="small muted">${n?plural(n,'activity')+' logged. Sports count too!':'Played a sport or went for a walk? Log it!'}</p></div><button class="btn sm secondary" id="logact">＋ Log</button></div>`;
}

/* ---------- Body measurements (part of body tracking) ---------- */
function bodyCard(){
  if(!profile.photos)return '';
  const B=(profile.body||[]).slice().sort((a,b)=>a.d.localeCompare(b.d)),lu=profile.unit==='kg'?'cm':'in';
  const conv=(x,from,to)=>from===to?x:to==='cm'?x*2.54:x/2.54;
  const w=B.filter(b=>b.w).map(b=>({d:b.d,v:round1(toUnit(b.w,b.unit))})),wa=B.filter(b=>b.waist).map(b=>({d:b.d,v:round1(conv(b.waist,b.lu||'in',lu))}));
  const delta=a=>a.length>1?round1(a[a.length-1].v-a[0].v):null,dw=delta(w),dwa=delta(wa);
  return `<div class="card stack"><div class="row between"><h3>⚖️ Body measurements</h3><span class="small muted" style="font-weight:700">🔒 Private</span></div>
    ${B.length?`<div class="stats" style="grid-template-columns:1fr 1fr"><div class="stat"><b>${w.length?w[w.length-1].v:'–'}</b><span>${profile.unit}${dw!==null?` (${dw>0?'+':''}${dw})`:''}</span></div><div class="stat"><b>${wa.length?wa[wa.length-1].v:'–'}</b><span>waist ${lu}${dwa!==null?` (${dwa>0?'+':''}${dwa})`:''}</span></div></div>
      ${w.length>1?miniChart(w,'Body weight ('+profile.unit+')'):''}
      <details class="how"><summary>All entries</summary>${B.slice().reverse().map(b=>`<div class="row between" style="padding:6px 0"><span>${niceDate(b.d)}</span><span>${b.w?round1(toUnit(b.w,b.unit))+' '+profile.unit:''}${b.w&&b.waist?' · ':''}${b.waist?round1(conv(b.waist,b.lu||'in',lu))+' '+lu:''}<button class="xbtn" data-bdel="${b.id}" aria-label="Delete">🗑️</button></span></div>`).join('')}</details>`
      :`<p class="small muted">Track your weight and waist every couple of weeks. Strength and how you feel matter more than any number!</p>`}
    <button class="btn secondary" id="badd">＋ Add measurement</button></div>`;
}
function bodySheet(){
  const lu=profile.unit==='kg'?'cm':'in';
  sheet(`<h2>⚖️ Add measurement</h2>
    <div><label class="small muted" style="font-weight:700">DATE</label><input class="num" id="bd" type="date" max="${isoLocal()}" value="${isoLocal()}" style="font-size:16px"></div>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">WEIGHT (${profile.unit})</label><input class="num" id="bw" type="number" inputmode="decimal" step="0.1" min="0"></div>
    <div style="flex:1"><label class="small muted" style="font-weight:700">WAIST (${lu})</label><input class="num" id="bwa" type="number" inputmode="decimal" step="0.1" min="0"></div></div>
    <p class="small muted">💡 Measure at the same time of day, like first thing in the morning.</p>
    <button class="btn" id="bsave">Save</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#bsave').onclick=()=>{const w=parseFloat($('#bw').value)||0,wa=parseFloat($('#bwa').value)||0;if(!w&&!wa){toast('Enter a weight or waist measurement');return}
      profile.body=[...(profile.body||[]),{id:newId('b'),d:$('#bd').value||isoLocal(),w,unit:profile.unit,waist:wa,lu}];saveProfile();closeLayer();toast('Saved ✅');syncNow(true);render()};
  });
}
function miniChart(pts,label){
  const W=340,H=150,L=36,R=12,T=12,B=24,vals=pts.map(p=>p.v),mx=Math.max(...vals),mn=Math.min(...vals),pad=(mx-mn)*.2||1,hi=mx+pad,lo=Math.max(0,mn-pad);
  const x=i=>L+i*(W-L-R)/Math.max(1,pts.length-1),y=v=>T+(H-T-B)*(1-(v-lo)/(hi-lo));
  const path=vals.map((v,i)=>`${i?'L':'M'}${x(i)},${y(v)}`).join('');
  return `<p class="small muted" style="font-weight:700">${label}</p><svg class="chart" viewBox="0 0 ${W} ${H}">${[lo,(lo+hi)/2,hi].map(v=>`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(v)}</text>`).join('')}<path d="${path}" fill="none" stroke="var(--lvl)" stroke-width="3" stroke-linejoin="round"/>${vals.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--card)" stroke="var(--lvl)" stroke-width="2.5"/>`).join('')}<text x="${x(0)}" y="${H-6}" font-size="11" fill="var(--muted)" text-anchor="start">${parseIso(pts[0].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text><text x="${x(pts.length-1)}" y="${H-6}" font-size="11" fill="var(--muted)" text-anchor="end">${parseIso(pts[pts.length-1].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text></svg>`;
}

/* ---------- Family challenge & high-fives ---------- */
function familyCard(){
  if(DB.list.length<2)return '';
  const ws=weekStart(new Date());
  const rows=DB.list.map(p=>{const j=getJournal(p);const n=workoutDates(j).filter(d=>parseIso(d)>=ws).length;return {p,n}}).sort((a,b)=>b.n-a.n);
  const top=rows[0].n;
  return `<div class="card stack"><div class="row between"><h3>👨‍👩‍👧 Family challenge</h3><span class="small muted" style="font-weight:700">This week</span></div>
    <p class="small muted">Most active days this week wins the crown 👑</p>
    ${rows.map(({p,n},i)=>`<div class="row fam"><span class="av">${esc(p.avatar||'🙂')}</span><div style="flex:1"><b>${esc(p.name||'No name')}</b>${n&&n===top?' 👑':''}<div class="famBar"><i style="width:${top?n/Math.max(top,1)*100:0}%"></i></div></div><b style="min-width:42px;text-align:right">${n} ${n===1?'day':'days'}</b>${p.id!==profile.id?`<button class="btn sm secondary" data-five="${p.id}" aria-label="Send a high-five">🙌</button>`:'<span style="width:52px"></span>'}</div>`).join('')}
  </div>`;
}
function bindFamily(v){
  v.querySelectorAll('[data-five]').forEach(b=>b.onclick=()=>{
    const t=DB.list.find(p=>p.id===b.dataset.five);if(!t)return;
    t.fives=[...(t.fives||[]),{from:profile.name||'Someone',av:profile.avatar||'🙂',at:Date.now()}].slice(-20);t.updated=Date.now();saveDB();
    toast(`🙌 High-five sent to ${t.name||'them'}!`);say(`High five sent to ${t.name||'them'}!`);syncNow(true)});
}
function fivesCard(){
  const seen=profile.fivesSeen||0,f=(profile.fives||[]).filter(x=>x.at>seen);
  if(!f.length)return '';
  const names=[...new Set(f.map(x=>x.av+' '+x.from))];
  return `<div class="card row five"><span class="big-emoji">🙌</span><div style="flex:1"><b>${esc(names.join(', '))} sent you ${f.length>1?f.length+' high-fives':'a high-five'}!</b><p class="small muted">Keep it up!</p></div><button class="btn sm" id="fiveok">🙌</button></div>`;
}

/* ---------- Coach history summary ---------- */
function historySummary(){
  const j=getJournal(),ds=workoutDates(j).slice(-12),rec=recordsTable(j),parts=[];
  ds.forEach(d=>{parts.push(`${d}: `+j[d].map(e=>e.kind==='activity'?`${e.act} ${e.minutes} min`:`${e.exercise} ${(e.sets||[]).map(s=>s.reps+(s.weight?'x'+round1(toUnit(s.weight,e.unit)):'')).join(',')}${e.effort?` (felt ${['','easy','good','hard'][e.effort]})`:''}`).join('; '))});
  const prs=Object.keys(rec).slice(0,8).map(n=>`${n} best ${rec[n].w?round1(rec[n].w)+profile.unit+'x'+rec[n].wr:rec[n].reps}`).join('; ');
  return `Level ${profile.level}. Week streak ${weekStreak()}. Units ${profile.unit}. Recent: ${parts.join(' | ')}. Records: ${prs}`.slice(0,1400);
}

/* ---------- Reminders (calendar) ---------- */
function remindersCard(){
  const r=store.get('jams_remind',{days:['MO','TU','TH','FR'],t:'17:00'});
  const D=[['MO','M'],['TU','T'],['WE','W'],['TH','T'],['FR','F'],['SA','S'],['SU','S']];
  return `<div class="card stack"><h3>⏰ Workout reminders</h3><p class="small muted">Add a repeating reminder to your phone's calendar. You'll get a notification at workout time.</p>
    <div class="daypick">${D.map(([k,l])=>`<button class="${r.days.includes(k)?'on':''}" data-rd="${k}" aria-label="${k}">${l}</button>`).join('')}</div>
    <div class="row" style="gap:10px"><label class="small muted" style="font-weight:700">TIME</label><input class="num" id="rt" type="time" value="${r.t}" style="flex:1;font-size:17px"></div>
    <a class="btn secondary" id="rcal" href="#" style="text-decoration:none">📅 Add to my calendar</a></div>`;
}
function bindReminders(v){
  const r=store.get('jams_remind',{days:['MO','TU','TH','FR'],t:'17:00'});
  const url=()=>`api/calendar?days=${r.days.join(',')}&t=${r.t.replace(':','')}&name=${encodeURIComponent(profile.name||'')}`;
  v.querySelectorAll('[data-rd]').forEach(b=>b.onclick=()=>{const k=b.dataset.rd;r.days=r.days.includes(k)?r.days.filter(x=>x!==k):[...r.days,k];store.set('jams_remind',r);b.classList.toggle('on');$('#rcal').href=url()});
  $('#rt').onchange=e=>{r.t=e.target.value||'17:00';store.set('jams_remind',r);$('#rcal').href=url()};
  $('#rcal').href=url();
  $('#rcal').onclick=e=>{if(!r.days.length){e.preventDefault();toast('Pick at least one day')}};
}

/* ---------- Parent lock ---------- */
let unlockedUntil=0;
async function pinHash(pin){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('jams-pin:'+pin));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const pinIsSet=()=>!!store.get('jams_pin',null);
function requirePin(action,why){
  if(!pinIsSet()||Date.now()<unlockedUntil)return action();
  sheet(`<h2>🔒 Parent lock</h2><p class="muted">${why||'Ask a parent to enter the PIN.'}</p>
    <input class="txt pin" id="pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••">
    <button class="btn" id="pok">Unlock</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;$('#pin').focus();
    const go2=async()=>{if(await pinHash($('#pin').value)===store.get('jams_pin')){unlockedUntil=Date.now()+5*60000;closeLayer();action()}else{toast('Wrong PIN');$('#pin').value=''}};
    $('#pok').onclick=go2;$('#pin').onkeydown=e=>{if(e.key==='Enter')go2()};
  });
}
function pinSheet(after){
  sheet(`<h2>🔒 ${pinIsSet()?'Change':'Set'} parent PIN</h2><p class="muted small">4 digits. Keep it secret from the kids! 🤫</p>
    <input class="txt pin" id="p1" type="password" inputmode="numeric" maxlength="4" placeholder="New PIN" autocomplete="off">
    <input class="txt pin" id="p2" type="password" inputmode="numeric" maxlength="4" placeholder="Type it again" autocomplete="off">
    <button class="btn" id="psave">Save PIN</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#psave').onclick=async()=>{const a=$('#p1').value,b=$('#p2').value;if(!/^\d{4}$/.test(a)){toast('Use exactly 4 numbers');return}if(a!==b){toast("The PINs don't match");return}
      store.set('jams_pin',await pinHash(a));unlockedUntil=Date.now()+5*60000;closeLayer();toast('🔒 Parent lock is on');after&&after()};
  });
}
function parentCard(){
  return `<div class="card stack"><h3>🔒 Parent controls</h3>
    <p class="small muted">${pinIsSet()?'Parent lock is <b>on</b>. A PIN is needed to change levels, remove people, change sync, body tracking or Coach settings, or erase data.':'Set a 4-digit PIN so kids can\'t change levels, remove people or erase data.'}</p>
    <div class="row between"><span><b>Coach AI answers</b><br><span class="small muted">Off = Coach only uses its built-in answers</span></span><div class="seg" style="width:120px"><button class="${profile.coachAI===false?'on':''}" data-cai="0">Off</button><button class="${profile.coachAI===false?'':'on'}" data-cai="1">On</button></div></div>
    <button class="btn secondary" id="pinset">${pinIsSet()?'Change PIN':'Set a parent PIN'}</button>
    ${pinIsSet()?'<button class="link" id="pinoff" style="padding:0;color:var(--muted)">Turn off parent lock</button>':''}</div>`;
}

const EFF={1:'😊 Easy',2:'💪 Just right',3:'😫 Too hard'};
let nextSay='';
function nextUp(a){for(const it of a.items){const k=it.sets.findIndex(s=>!s.done);if(k>=0)return `Rest over. Next: ${EX[it.id].name}, set ${k+1}.`}return 'Rest over.'}
