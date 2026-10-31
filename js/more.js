/* KinFit · Interval/circuit timer, child profiles and the offline notice. */

/* ---------- Interval & circuit timer ---------- */
const INT_PRESETS=[
  {id:'easy',n:'Easy start',e:'🌱',work:30,rest:30,rounds:6,d:'30s on, 30s rest'},
  {id:'hiit',n:'HIIT',e:'🔥',work:40,rest:20,rounds:8,d:'40s on, 20s rest'},
  {id:'tabata',n:'Tabata',e:'⚡',work:20,rest:10,rounds:8,d:'20s on, 10s rest'},
];
const clampInt=(v,lo,hi,d)=>{v=parseInt(v,10);return isNaN(v)?d:Math.max(lo,Math.min(hi,v))};
function loadIntervals(){
  const s=store.get(pKey('jams_intervals'),{})||{};
  return {work:clampInt(s.work,5,300,30),rest:clampInt(s.rest,0,300,30),rounds:clampInt(s.rounds,1,30,6),
    ex:(Array.isArray(s.ex)?s.ex:[]).filter(id=>typeof id==='string'&&EX[id]).slice(0,8),speak:s.speak!==false};
}
function intervalSteps(c){
  const steps=[{n:'Get ready',s:5,ready:true,tip:c.ex.length?`First: ${EX[c.ex[0]].name}`:`${c.rounds} rounds of ${c.work}s work`}];
  const list=c.ex.length?c.ex:[null],total=c.rounds*list.length;let k=0;
  for(let r=1;r<=c.rounds;r++)list.forEach(id=>{k++;
    const ex=id?EX[id]:null;
    steps.push({n:ex?ex.name:'Work hard! 💪',e:ex?ex.e:'🔥',fig:id&&FIG[id]?id:null,s:c.work,tip:`Round ${r} of ${c.rounds}${list.length>1?` · exercise ${list.indexOf(id)+1} of ${list.length}`:''}`});
    if(c.rest&&k<total){const nx=list[k%list.length];steps.push({n:'Rest',e:'😮‍💨',s:c.rest,tip:nx?`Next: ${EX[nx].name}`:'Breathe. Next round soon.'})}
  });
  return steps;
}
const intTotal=c=>{const n=c.rounds*Math.max(1,c.ex.length);return 5+n*c.work+(n-1)*c.rest};
function intervalSheet(){
  const c=loadIntervals();
  const draw=()=>sheet(`<h2>⏱️ Interval timer</h2>
    <p class="small muted">Work hard, rest, repeat. Beeps tell you when to switch.</p>
    <div class="chips">${INT_PRESETS.map(p=>`<button data-ip="${p.id}" class="${c.work===p.work&&c.rest===p.rest&&c.rounds===p.rounds?'on':''}">${p.e} ${p.n}</button>`).join('')}</div>
    <div class="ivrow"><span><b>Work</b><br><span class="small muted">seconds</span></span><button class="num numbtn" data-iv="work">${c.work}</button></div>
    <div class="ivrow"><span><b>Rest</b><br><span class="small muted">seconds</span></span><button class="num numbtn" data-iv="rest">${c.rest}</button></div>
    <div class="ivrow"><span><b>Rounds</b></span><button class="num numbtn" data-iv="rounds">${c.rounds}</button></div>
    <div class="stack"><b>Exercises <span class="small muted">(optional, makes it a circuit)</span></b>
      ${c.ex.map((id,i)=>`<div class="row" style="gap:8px"><span class="ex-emoji" style="width:36px;height:36px;font-size:20px">${esc(EX[id].e)}</span><span style="flex:1">${esc(EX[id].name)}</span><button class="xbtn" data-ixr="${i}" aria-label="Remove ${esc(EX[id].name)}">✕</button></div>`).join('')}
      ${c.ex.length<8?`<button class="btn sm secondary" id="ivadd">＋ Add exercise</button>`:''}</div>
    <label class="toggle"><span>🔊 Say the countdown out loud</span><input type="checkbox" id="ivspk" ${c.speak?'checked':''}></label>
    <p class="small muted center" id="ivtot">Total: about ${Math.max(1,Math.round(intTotal(c)/60))} min</p>
    <button class="btn" id="ivgo">▶ Start</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const save=()=>store.set(pKey('jams_intervals'),c);
    $('#cancel').onclick=closeLayer;
    $('#ivspk').onchange=e=>{c.speak=e.target.checked;save()};
    document.querySelectorAll('[data-ip]').forEach(b=>b.onclick=()=>{const p=INT_PRESETS.find(x=>x.id===b.dataset.ip);Object.assign(c,{work:p.work,rest:p.rest,rounds:p.rounds});save();draw()});
    document.querySelectorAll('[data-iv]').forEach(b=>b.onclick=()=>{const k=b.dataset.iv;
      const cfg={work:{title:'Work time',step:5,max:300,min:5,quick:[20,30,40,45,60],unit:'seconds'},rest:{title:'Rest time',step:5,max:300,min:0,quick:[0,10,15,20,30],unit:'seconds'},rounds:{title:'Rounds',step:1,max:30,min:1,quick:[3,4,6,8,10]}}[k];
      pickNumber(Object.assign({value:c[k]},cfg),val=>{c[k]=clampInt(val,cfg.min,cfg.max,c[k]);save();draw()})});
    document.querySelectorAll('[data-ixr]').forEach(b=>b.onclick=()=>{c.ex.splice(+b.dataset.ixr,1);save();draw()});
    if($('#ivadd'))$('#ivadd').onclick=()=>pickExercise(id=>{c.ex.push(id);save();draw()},draw);
    $('#ivgo').onclick=()=>{closeLayer();runIntervals(c)};
  });
  draw();
}
function runIntervals(c){
  const was=voiceOn;voiceOn=c.speak;
  const log=(st,finished)=>{voiceOn=was;
    const secs=finished?intTotal(c):Math.round((Date.now()-st.started)/1000),mins=Math.round(secs/60);
    if(mins<1){if(!finished)toast('Stopped. Less than a minute, so nothing was logged.');return}
    const j=getJournal(),d=isoLocal();
    (j[d]=j[d]||[]).push({id:Date.now(),exercise:'⏱️ Intervals',kind:'activity',act:'Intervals',minutes:mins,distance:0,dunit:'km',effort:2,sets:[],timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),level:profile.level,u:Date.now()});
    setJournal(j);syncNow(true);toast(`⏱️ ${plural(mins,'minute')} of intervals logged!`);
    if(finished){const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),1400)}
    if(route!=='workout')render()};
  runSequence(intervalSteps(c),{closeText:'Stop',onFinish:st=>log(st,true),onStop:st=>log(st,false)});
}
function intervalCard(){
  return `<div class="card stack"><div class="row"><span class="ex-emoji">⏱️</span><div style="flex:1"><b>Interval timer</b><p class="small muted">Work, rest, repeat. Add exercises to make a circuit.</p></div></div>
    <button class="btn sm secondary" id="ivopen">Set up intervals</button></div>`;
}
document.addEventListener('click',e=>{if(e.target.closest('#ivopen'))intervalSheet()});

/* ---------- Child profiles ---------- */
const isKid=()=>!!profile.kid;
function kidSetupPrompt(){
  if(pinIsSet()||store.get('jams_pinasked',false))return;store.set('jams_pinasked',true);
  sheet(`<h2>🔒 Set a parent PIN?</h2>
    <p class="muted">With a PIN, only you can change ${esc(profile.name||'your child')}'s level, sync, Coach settings or erase data.</p>
    <button class="btn" id="kpin">Set a PIN</button><button class="btn ghost" id="klater">Maybe later</button>`,()=>{
    $('#kpin').onclick=()=>pinSheet();$('#klater').onclick=closeLayer;
  });
}

/* ---------- Offline notice ---------- */
function showNet(){
  const el=$('#net');if(!el)return;
  if(navigator.onLine){if(el.classList.contains('show')){el.textContent='✅ Back online';el.classList.add('ok');setTimeout(()=>{el.classList.remove('show','ok')},2000)}}
  else{el.textContent='📴 You\'re offline. Workouts still save on this phone and sync later.';el.classList.remove('ok');el.classList.add('show')}
}
addEventListener('online',()=>{showNet();if(syncCfg.code)syncNow(true)});
addEventListener('offline',showNet);
showNet();
