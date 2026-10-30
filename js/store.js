/* KinFit · Storage, people, data cleaning, helpers, badges and screen router. */
/* ---------- Storage & people (profiles) ----------
   Each person has their own level, settings and history. The first person ("p1") keeps
   the original 'workout_journal' key, so history from earlier versions stays. */
const store = {
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  del(k){try{localStorage.removeItem(k)}catch(e){}},
};
/* ---------- Data cleaning (security) ----------
   Everything that comes from storage, sync or a backup file is cleaned before use,
   so stored text can never turn into code on the page. */
const cleanText=(x,max=60)=>String(x??'').replace(/[<>"`\\]/g,'').replace(/[\u0000-\u001f\u007f]/g,' ').slice(0,max);
const cleanEmoji=(x,fb)=>{x=String(x||'');return x&&x.length<=12&&!/[\x00-\x7f]/.test(x.replace(/️|‍/g,''))?x:fb};
const cleanNum=(x,max=1e6)=>{x=Number(x);return Number.isFinite(x)&&x>=0?Math.min(x,max):0};
const ISO_RE=/^\d{4}-\d{2}-\d{2}$/,ID_RE=/^[a-z0-9_]{1,48}$/i;
function sanitizeProfile(p){
  if(!p||typeof p!=='object'||!/^p[a-z0-9]{1,40}$/.test(String(p.id||'')))return null;
  const o={id:p.id,name:cleanText(p.name,24),avatar:AVATARS.includes(p.avatar)?p.avatar:'🙂',level:['beginner','intermediate','expert'].includes(p.level)?p.level:'beginner',
    unit:p.unit==='kg'?'kg':'lbs',rest:['auto','45','60','90','120'].includes(String(p.rest))?String(p.rest):'auto',
    warmups:cleanNum(p.warmups,1e5),questions:cleanNum(p.questions,1e6),updated:cleanNum(p.updated,1e14),fivesSeen:cleanNum(p.fivesSeen,1e14),
    badges:(Array.isArray(p.badges)?p.badges:[]).filter(b=>BADGES.some(x=>x.id===b)),photos:!!p.photos,toured:!!p.toured,
    todayHide:(Array.isArray(p.todayHide)?p.todayHide:[]).filter(k=>['phase','challenge','goal','family','badges','tip'].includes(k)),
    chDone:(Array.isArray(p.chDone)?p.chDone:[]).slice(-60).map(x=>cleanText(x,30)).filter(x=>/^\d{4}-\d{2}-[a-z]+$/.test(x)),
    goals:(Array.isArray(p.goals)?p.goals:[]).slice(-20).filter(g=>g&&['lift','reps','workouts','minutes'].includes(g.type)&&ISO_RE.test(String(g.start))&&ISO_RE.test(String(g.by))).map(g=>({id:cleanText(g.id,30)||newPid(),type:g.type,ex:cleanText(g.ex,60),target:cleanNum(g.target,1e6),start:g.start,by:g.by,done:ISO_RE.test(String(g.done))?g.done:null}))};
  if(ISO_RE.test(String(p.planStart)))o.planStart=p.planStart;
  if(p.coachAI===false)o.coachAI=false;
  o.customEx={};Object.entries(p.customEx&&typeof p.customEx==='object'?p.customEx:{}).slice(0,100).forEach(([k,v])=>{if(!/^c_[a-z0-9]{1,40}$/.test(k)||!v||typeof v!=='object')return;
    const name=cleanText(v.name,40);if(!name)return;
    o.customEx[k]={name,e:cleanEmoji(v.e,'⭐'),m:(Array.isArray(v.m)?v.m:[]).slice(0,6).map(x=>cleanText(x,20)).filter(Boolean),weight:!!v.weight,time:!!v.time,
      steps:(Array.isArray(v.steps)?v.steps:[]).slice(0,8).map(x=>cleanText(x,200)).filter(Boolean),tip:cleanText(v.tip,160)}});
  o.routines=(Array.isArray(p.routines)?p.routines:[]).slice(0,50).filter(r=>r&&/^r[a-z0-9]{1,40}$/.test(String(r.id))).map(r=>({id:r.id,name:cleanText(r.name,30)||'My workout',e:cleanEmoji(r.e,'💪'),
    items:(Array.isArray(r.items)?r.items:[]).slice(0,30).filter(x=>Array.isArray(x)&&ID_RE.test(String(x[0]))).map(x=>[String(x[0]),Math.max(1,Math.min(10,cleanNum(x[1])||3)),Math.max(1,cleanNum(x[2],999)||8),Math.max(1,cleanNum(x[3],999)||12)])}));
  o.body=(Array.isArray(p.body)?p.body:[]).slice(-500).filter(b=>b&&ISO_RE.test(b.d)).map(b=>({id:cleanText(b.id,30)||newPid(),d:b.d,w:cleanNum(b.w,1500),unit:b.unit==='kg'?'kg':'lbs',waist:cleanNum(b.waist,500),lu:b.lu==='cm'?'cm':'in'}));
  o.fives=(Array.isArray(p.fives)?p.fives:[]).slice(-20).filter(f=>f&&typeof f==='object').map(f=>({from:cleanText(f.from,24)||'Someone',av:AVATARS.includes(f.av)?f.av:'🙂',at:cleanNum(f.at,1e14)}));
  return o;
}
function sanitizeJournal(j){
  const out={};if(!j||typeof j!=='object'||Array.isArray(j))return out;
  Object.keys(j).forEach(d=>{if(!ISO_RE.test(d)||!Array.isArray(j[d]))return;
    const list=j[d].slice(0,300).filter(e=>e&&typeof e==='object'&&typeof e.exercise==='string').map(e=>{
      const o={id:typeof e.id==='number'?e.id:cleanText(e.id,40),exercise:cleanText(e.exercise,60),timestamp:cleanText(e.timestamp,16),unit:e.unit==='kg'?'kg':'lbs',
        sets:(Array.isArray(e.sets)?e.sets:[]).slice(0,30).map(x=>({reps:cleanNum(x&&x.reps,1e5),weight:cleanNum(x&&x.weight,5000)}))};
      if(['beginner','intermediate','expert'].includes(e.level))o.level=e.level;
      if(e.workout)o.workout=cleanText(e.workout,50);if(e.u)o.u=cleanNum(e.u,1e14);if([1,2,3].includes(e.effort))o.effort=e.effort;
      if(e.kind==='activity'){o.kind='activity';o.act=cleanText(e.act,20);o.minutes=cleanNum(e.minutes,1440);o.distance=cleanNum(e.distance,1000);o.dunit=e.dunit==='km'?'km':'mi'}
      return o}).filter(e=>e.exercise);
    if(list.length)out[d]=list});
  return out;
}
function newPid(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
const DEFAULT_P={id:null,name:'',level:null,unit:'lbs',rest:'auto',avatar:'🙂',warmups:0,questions:0,badges:[]};
let DB=store.get('jams_profiles',null);
if(!DB||!Array.isArray(DB.list)){
  const old=store.get('jams_profile',null);DB={current:null,list:[],deleted:[]};
  if(old&&old.level){const id=newPid();DB.list.push(Object.assign({},DEFAULT_P,old,{id,updated:Date.now()}));DB.current=id;DB.legacyId=id}
  store.set('jams_profiles',DB);
}
DB.list=(DB.list||[]).map(p=>Object.assign({},DEFAULT_P,sanitizeProfile(p)||{})).filter(p=>p.id);DB.deleted=(Array.isArray(DB.deleted)?DB.deleted:[]).map(x=>cleanText(x,48));
const saveDB=()=>store.set('jams_profiles',DB);
let profile=Object.assign({},DEFAULT_P,DB.list.find(p=>p.id===DB.current)||(DB.list[0]||{}));
if(profile.id)DB.current=profile.id;
// The person who was here before profiles existed keeps the original keys on this device.
const pKey=(base,p=profile)=>!p||!p.id||p.id===DB.legacyId?base:base+'_'+p.id;
function saveProfile(){if(!profile.id)return;profile.updated=Date.now();profile=Object.assign({},DEFAULT_P,sanitizeProfile(profile)||{});const i=DB.list.findIndex(p=>p.id===profile.id);if(i<0)DB.list.push(profile);else DB.list[i]=profile;saveDB()}
const okJournal=j=>(j&&typeof j==='object'&&!Array.isArray(j))?j:{};
const getJournal=(p=profile)=>sanitizeJournal(store.get(pKey('workout_journal',p),{}));
const setJournal=(j,p=profile)=>store.set(pKey('workout_journal',p),sanitizeJournal(j));
const getTomb=(p=profile)=>store.get(pKey('jams_tomb',p),[]);
const addTomb=id=>{const t=getTomb();t.push(String(id));store.set(pKey('jams_tomb'),t.slice(-2000))};

/* ---------- Helpers ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const isoLocal=(d=new Date())=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; // local date, not UTC
const parseIso=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const niceDate=s=>parseIso(s).toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
const lvl=()=>LEVELS[profile.level]||LEVELS.beginner;
const restSecs=()=>profile.rest==='auto'?lvl().rest:Number(profile.rest);
const repsText=(p,ex)=>{const r=p[2]===p[3]?p[2]:`${p[2]}–${p[3]}`;return `${p[1]} sets × ${r} ${ex.time?'sec':'reps'}${ex.per?' '+ex.per:''}`};
const toUnit=(w,from)=>{from=from||'lbs';if(from===profile.unit)return w;return profile.unit==='kg'?w/2.2046:w*2.2046};
const round1=n=>Math.round(n*10)/10;
const hello=()=>{const h=new Date().getHours();return h<12?'Good morning':h<17?'Good afternoon':'Good evening'};
const plural=(n,w)=>`${n} ${w}${n===1?'':'s'}`;

function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2400)}
function sheet(html,onMount){
  const back=document.activeElement;
  $('#layer').innerHTML=`<div class="overlay" id="ov"><div class="sheet stack" role="dialog" aria-modal="true">${html}</div></div>`;
  const first=$('#ov .sheet').querySelector('h2');if(first){first.tabIndex=-1;first.focus({preventScroll:true})}
  sheet.back=back;
  $('#ov').onclick=e=>{if(e.target.id==='ov')closeLayer()};
  if(onMount)onMount($('#ov .sheet'));
}
const closeLayer=()=>{$('#layer').innerHTML=''};
function confirmBox(title,body,okText,onOk,danger){
  sheet(`<h2>${title}</h2><p class="muted">${body}</p><button class="btn ${danger?'danger':''}" id="ok">${okText}</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;$('#ok').onclick=()=>{closeLayer();onOk()}});
}

function lastSession(name){
  const j=getJournal();const dates=Object.keys(j).sort().reverse();
  for(const d of dates){const list=(j[d]||[]).filter(e=>e.exercise===name);if(list.length)return list[list.length-1]}
  return null;
}
function workoutDates(j=getJournal()){return Object.keys(j).filter(d=>(j[d]||[]).length).sort()}
function weekStart(d){const x=new Date(d);const off=(x.getDay()+6)%7;x.setDate(x.getDate()-off);x.setHours(0,0,0,0);return x}
function weekStreak(){
  const weeks=new Set(workoutDates().map(d=>isoLocal(weekStart(parseIso(d)))));
  let w=weekStart(new Date()),n=0;
  if(!weeks.has(isoLocal(w)))w.setDate(w.getDate()-7);
  while(weeks.has(isoLocal(w))){n++;w.setDate(w.getDate()-7)}
  return n;
}

/* ---------- Badges ---------- */
function badgeStats(){
  const j=getJournal(),dates=workoutDates(j);
  const s={workouts:dates.length,sets:0,bestStreak:0,fullWeek:false,pr:false,warmups:profile.warmups||0,questions:profile.questions||0,levels:new Set(),challenges:(profile.chDone||[]).length,goals:(profile.goals||[]).filter(g=>g.done).length};
  const weekMap={},best={};
  dates.forEach(d=>{const wk=isoLocal(weekStart(parseIso(d)));weekMap[wk]=weekMap[wk]||new Set();
    j[d].forEach(e=>{s.sets+=(e.sets||[]).length;if(e.workout)weekMap[wk].add(e.workout);if(e.level)s.levels.add(e.level);
      const sets=e.sets||[];if(!sets.length)return;
      const val=Math.max(...sets.map(x=>Number(x.weight)||0))||Math.max(...sets.map(x=>Number(x.reps)||0));
      if(best[e.exercise]!==undefined&&val>best[e.exercise])s.pr=true;
      best[e.exercise]=Math.max(best[e.exercise]||0,val)})});
  s.fullWeek=Object.values(weekMap).some(w=>['ua','la','ub','lb'].every(k=>w.has(k)));
  const wks=Object.keys(weekMap).sort();let run=0,prev=null;
  wks.forEach(w=>{const d=parseIso(w);if(prev&&(d-prev)/864e5<=7.5)run++;else run=1;prev=d;s.bestStreak=Math.max(s.bestStreak,run)});
  return s;
}
function earnedBadges(){const s=badgeStats();return BADGES.filter(b=>b.t(s)).map(b=>b.id)}
function newBadges(){ // returns badges earned but not yet shown, and marks them shown
  const earned=earnedBadges(),seen=new Set(profile.badges||[]);
  const fresh=earned.filter(id=>!seen.has(id));
  if(fresh.length){profile.badges=earned;saveProfile()}
  return fresh.map(id=>BADGES.find(b=>b.id===id));
}

/* ---------- Router ---------- */
let route='today', routeArg=null;
function go(r,arg){route=r;routeArg=arg;self.__r=r;render();window.scrollTo(0,0)}
document.getElementById('tabbar').addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});

function render(){
  loadCustom();
  document.body.dataset.level=profile.level||'beginner';
  const onb=!profile.id||!profile.level||route==='onboard';
  $('#tabbar').classList.toggle('hide',onb||route==='workout');
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.go===route));
  if(route!=='workout')hideTimer();
  const v=$('#view');
  if(onb) return renderOnboard(v);
  ({today:renderToday,workout:renderWorkout,library:renderLibrary,progress:renderProgress,me:renderMe,ask:renderAsk,report:renderReport}[route]||renderToday)(v);
}
const logo=()=>`<div class="logo"><svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="16" fill="var(--lvl-text)"/><path d="M14 27h6v10h-6zM44 27h6v10h-6zM20 23h5v18h-5zM39 23h5v18h-5zM25 30h14v4H25z" fill="#fff"/></svg>KINFIT</div>`;
const topbar=(right='')=>`<div class="topbar">${logo()}${right}</div>`;
const levelPill=()=>{const n=weekStreak();return `<div class="row" style="gap:6px"><button class="pill streakpill ${n?'':'off'}" data-go="progress" aria-label="${n}-week streak">🔥 ${n}</button><button class="pill" data-who aria-label="Switch person"><span class="pname">${esc(profile.avatar||'🙂')} ${esc(profile.name||'Me')}</span></button></div>`};
function streakCard(){
  const n=weekStreak(),best=Math.max(n,badgeStats().bestStreak),j=getJournal(),ws=weekStart(new Date());
  const thisWeek=workoutDates(j).filter(d=>parseIso(d)>=ws).length,goal=3;
  const msg=thisWeek?(thisWeek>=goal?'This week is done. Amazing! 🎉':`This week counts! ${goal-thisWeek} more to hit your goal of ${goal}.`)
    :n?'Work out this week to keep your streak alive!':'Do one workout this week to start a streak!';
  return `<div class="card streak"><div class="row"><div class="flame ${n?'':'off'}">🔥</div><div style="flex:1"><div class="row between"><b style="font-size:20px">${n?n+'-week streak':'No streak yet'}</b>${best>n?`<span class="small muted">Best: ${best}</span>`:''}</div>
    <p class="small muted" style="margin-top:2px">${msg}</p>
    <div class="dots7">${Array.from({length:goal},(_,i)=>`<i class="${i<thisWeek?'on':''}"></i>`).join('')}<span class="small muted">${thisWeek}/${goal} this week</span></div></div></div></div>`;
}
document.addEventListener('click',e=>{if(e.target.closest('.streakpill'))go('progress');else if(e.target.closest('[data-who]'))whoSheet();else if(e.target.closest('[data-go-me]'))go('me')});

function whoSheet(){
  sheet(`<h2>Who's working out? 🙋</h2>
    <div class="stack">${DB.list.map(p=>`<button class="who ${p.id===profile.id?'sel':''}" data-pid="${p.id}"><span class="av">${esc(p.avatar||'🙂')}</span><span style="flex:1;text-align:left"><b>${esc(p.name||'No name')}</b><br><span class="small muted">${(LEVELS[p.level]||LEVELS.beginner).emoji} ${(LEVELS[p.level]||LEVELS.beginner).name}</span></span>${p.id===profile.id?'<b style="color:var(--lvl-text)">✓</b>':''}</button>`).join('')}</div>
    <button class="btn secondary" id="addp">＋ Add a person</button>`,()=>{
    document.querySelectorAll('[data-pid]').forEach(b=>b.onclick=()=>{closeLayer();switchProfile(b.dataset.pid)});
    $('#addp').onclick=()=>{closeLayer();addPerson()};
  });
}
function switchProfile(id){
  const p=DB.list.find(x=>x.id===id);if(!p)return;
  profile=Object.assign({},DEFAULT_P,p);DB.current=id;saveDB();
  chat=store.get(pKey('jams_chat'),[]);libLevel=null;chartEx=null;hideTimer();
  go('today');toast(`${esc(profile.avatar)} Hi ${profile.name||'there'}!`);
}
function addPerson(){ob={step:1,answers:[],name:'',avatar:AVATARS[1+Math.floor(Math.random()*(AVATARS.length-1))],mode:'add'};go('onboard')}
