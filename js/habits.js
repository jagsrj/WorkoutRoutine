/* KinFit · Daily habits: water, sleep, stretching, screen-free time and your own, each with a streak. */
const HABIT_PRESETS=[
  {id:'water',e:'💧',n:'Drink water',t:8,unit:'glasses'},
  {id:'sleep',e:'😴',n:'Good night\'s sleep',t:1},
  {id:'stretch',e:'🧘',n:'Stretch',t:1},
  {id:'screen',e:'📵',n:'Screen-free hour',t:1},
  {id:'fruit',e:'🍎',n:'Fruit or veggies',t:5,unit:'servings'},
  {id:'read',e:'📚',n:'Read 20 minutes',t:1},
  {id:'outside',e:'🌳',n:'Play outside',t:1},
  {id:'walk',e:'🚶',n:'Go for a walk',t:1},
];
const HABIT_EMOJI=['⭐','💧','😴','🧘','📵','🍎','📚','🌳','🚶','🎹','🧹','🦷','🙏','✍️','🎨','🐶','🛏️','🥛'];
const HABIT_MAX=8;
const habits=()=>profile.habits||[];
const habitCount=(id,d=isoLocal())=>{const day=(profile.hlog||{})[d];return day&&day.c?Math.max(0,day.c[id]||0):0};
function setHabitCount(id,n,d=isoLocal()){
  const log=Object.assign({},profile.hlog||{}),day=log[d]||{c:{}};
  log[d]={u:Date.now(),c:Object.assign({},day.c,{[id]:n})};profile.hlog=log;saveProfile();
}
const habitDone=(h,d)=>habitCount(h.id,d)>=h.t;
// Days in a row the habit was done. Today only counts once it's done, so an unfinished today doesn't break the streak.
function habitStreak(h){
  const d=new Date();if(!habitDone(h,isoLocal(d)))d.setDate(d.getDate()-1);
  let n=0;while(n<400&&habitDone(h,isoLocal(d))){n++;d.setDate(d.getDate()-1)}
  return n;
}
function habitBestStreak(){
  const log=profile.hlog||{};let best=0;
  habits().forEach(h=>{let run=0,prev=null;Object.keys(log).sort().forEach(d=>{if(!habitDone(h,d))return;const t=parseIso(d);run=prev&&Math.round((t-prev)/864e5)===1?run+1:1;prev=t;best=Math.max(best,run)})});
  return best;
}
function habitTile(h){
  const c=habitCount(h.id),done=c>=h.t,st=habitStreak(h);
  const label=h.t>1?`${h.n}: ${c} of ${h.t}${h.unit?' '+h.unit:''}. Tap to add one.`:`${h.n}: ${done?'done':'not done'}. Tap to ${done?'undo':'mark done'}.`;
  return `<div class="htile ${done?'done':''}"><button class="hbtn" data-hab="${h.id}" aria-label="${esc(label)}" aria-pressed="${done}">
      <span class="he" aria-hidden="true">${done?'✅':esc(h.e)}</span><span class="hn">${esc(h.n)}</span>
      <span class="hv">${h.t>1?`${c}/${h.t}`:done?'Done!':'Tap when done'}${st>1?` · 🔥${st}`:''}</span>
      ${h.t>1?`<span class="mini" aria-hidden="true"><i style="width:${Math.min(100,c/h.t*100)}%"></i></span>`:''}</button>
    ${h.t>1&&c>0?`<button class="hminus" data-habm="${h.id}" aria-label="Remove one from ${esc(h.n)}">−</button>`:''}</div>`;
}
function habitsCard(){
  if(todayHidden('habits'))return '';
  const hs=habits();
  if(!hs.length)return `<div class="card row"><span class="big-emoji">🌱</span><div style="flex:1"><b>Build a daily habit</b><p class="small muted">Water, sleep, screen-free time… tick them off each day and grow a streak.</p></div><button class="btn sm secondary" id="hedit">Pick</button></div>`;
  const done=hs.filter(h=>habitDone(h)).length;
  return `<div class="card stack"><div class="row between"><h2 class="h3">Daily habits <span class="small muted">${done}/${hs.length}</span></h2><button class="link small" id="hedit">Edit</button></div>
    <div class="hgrid">${hs.map(habitTile).join('')}</div></div>`;
}
function bindHabits(v){
  if($('#hedit'))$('#hedit').onclick=habitsSheet;
  v.querySelectorAll('[data-hab]').forEach(b=>b.onclick=()=>{
    const h=habits().find(x=>x.id===b.dataset.hab);if(!h)return;
    const before=habits().every(x=>habitDone(x)),c=habitCount(h.id);
    setHabitCount(h.id,h.t===1?(c>=1?0:1):Math.min(h.t,c+1));
    if(habitDone(h)&&c<h.t){beep(true);const st=habitStreak(h);if(st>=2)say(`${h.n}. ${st} days in a row!`)}
    if(!before&&habits().every(x=>habitDone(x))){toast('🌟 All your habits are done today!');say('All your habits are done today. Amazing!')}
    else if(habitDone(h)&&c<h.t)toast(`${h.e} ${h.n}: done!`);
    const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),1200);
    render();syncSoon();
  });
  v.querySelectorAll('[data-habm]').forEach(b=>b.onclick=()=>{const id=b.dataset.habm;setHabitCount(id,Math.max(0,habitCount(id)-1));render();syncSoon()});
}
function habitsSheet(){
  const draw=()=>{
    const hs=habits(),ids=new Set(hs.map(h=>h.id)),full=hs.length>=HABIT_MAX;
    const custom=hs.filter(h=>!HABIT_PRESETS.some(p=>p.id===h.id));
    sheet(`<h2>🌱 Daily habits</h2><p class="small muted">Pick up to ${HABIT_MAX}. Start small: one or two is great.</p>
      <div class="stack">${HABIT_PRESETS.map(p=>`<label class="toggle"><span>${p.e} ${esc(p.n)}${p.t>1?` <span class="small muted">(${p.t} ${p.unit})</span>`:''}</span><input type="checkbox" data-hp="${p.id}" ${ids.has(p.id)?'checked':''} ${!ids.has(p.id)&&full?'disabled':''}></label>`).join('')}
      ${custom.map(h=>`<div class="toggle"><span>${esc(h.e)} ${esc(h.n)}${h.t>1?` <span class="small muted">(${h.t} a day)</span>`:''}</span><button class="xbtn" data-hrm="${h.id}" aria-label="Remove ${esc(h.n)}">✕</button></div>`).join('')}</div>
      ${full?'<p class="small muted">You have the maximum number of habits.</p>':'<button class="btn secondary" id="hnew">＋ Make your own</button>'}
      <button class="btn" id="hdone">Done</button>`,()=>{
      document.querySelectorAll('[data-hp]').forEach(b=>b.onchange=()=>{const p=HABIT_PRESETS.find(x=>x.id===b.dataset.hp);
        profile.habits=b.checked?[...habits(),Object.assign({},p)].slice(0,HABIT_MAX):habits().filter(h=>h.id!==p.id);saveProfile();draw()});
      document.querySelectorAll('[data-hrm]').forEach(b=>b.onclick=()=>{profile.habits=habits().filter(h=>h.id!==b.dataset.hrm);saveProfile();draw()});
      if($('#hnew'))$('#hnew').onclick=()=>customHabitSheet(draw);
      $('#hdone').onclick=()=>{closeLayer();render();syncSoon()};
    });
  };
  draw();
}
function customHabitSheet(back){
  const st={n:'',e:'⭐',t:1};
  const draw=()=>sheet(`<h2>Make your own habit</h2>
    <input class="txt" id="hname" maxlength="24" placeholder="e.g. Practise piano" value="${esc(st.n)}" autocomplete="off" aria-label="Habit name">
    <p class="small muted" style="font-weight:700">PICK AN ICON</p><div class="avatars">${HABIT_EMOJI.map(e=>`<button class="${e===st.e?'sel':''}" data-he="${e}" aria-label="Icon ${e}">${e}</button>`).join('')}</div>
    <div class="ivrow"><span><b>Times a day</b><br><span class="small muted">1 = just tick it off</span></span><button class="num numbtn" id="ht">${st.t}</button></div>
    <button class="btn" id="hsave">Add habit</button><button class="btn ghost" id="hback">Back</button>`,()=>{
    const read=()=>{st.n=$('#hname').value};
    document.querySelectorAll('[data-he]').forEach(b=>b.onclick=()=>{read();st.e=b.dataset.he;draw()});
    $('#ht').onclick=()=>{read();pickNumber({title:'Times a day',value:st.t,step:1,min:1,max:20,quick:[1,2,3,5,8]},v=>{st.t=Math.max(1,Math.min(20,parseInt(v,10)||1));draw()})};
    $('#hback').onclick=back;
    $('#hsave').onclick=()=>{read();const n=cleanText(st.n.trim(),24);if(!n){toast('Give your habit a name');return}
      profile.habits=[...habits(),{id:'h_'+Date.now().toString(36),e:st.e,n,t:st.t}].slice(0,HABIT_MAX);saveProfile();back()};
  });
  draw();
}
// Progress screen: the last 7 days for each habit.
function habitsProgressCard(){
  const hs=habits();if(!hs.length)return '';
  const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d});
  return `<div class="card stack"><h2 class="h3">🌱 Habits this week</h2>
    <div class="hweek"><span></span>${days.map(d=>`<span class="small muted">${d.toLocaleDateString(undefined,{weekday:'narrow'})}</span>`).join('')}<span class="small muted">🔥</span>
    ${hs.map(h=>`<span title="${esc(h.n)}" aria-label="${esc(h.n)}">${esc(h.e)}</span>${days.map(d=>{const iso=isoLocal(d),ok=habitDone(h,iso),part=!ok&&habitCount(h.id,iso)>0;
      return `<i class="${ok?'on':part?'part':''}" role="img" aria-label="${d.toLocaleDateString(undefined,{weekday:'long'})}: ${ok?'done':part?'partly done':'not done'}"></i>`}).join('')}<b class="small">${habitStreak(h)}</b>`).join('')}</div>
    <p class="small muted">Filled = done, half = started. 🔥 = days in a row.</p></div>`;
}
