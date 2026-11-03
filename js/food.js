/* KinFit · Food diary and scanner (like MyFitnessPal, kept simple).
   - Meals: Breakfast, Lunch, Dinner and Snacks. Add food by scanning a photo, describing it, or Quick add.
   - Scan: the photo is shrunk on the phone and sent to /api/food (a Workers AI vision model) for an
     estimate of calories, protein, carbs and fiber. Photos are never stored.
   - Adults see calories, an optional daily goal and "remaining". Child and under-18 profiles see the
     same diary without calories or goals, and only if a parent turns the scanner on (Parent controls).
   - Entries are kept for 90 days and sync with the person's profile. */

const FOOD_KEEP_DAYS=90,KCAL_MIN_GOAL=1200,KCAL_MAX_GOAL=5000;
const MEALS={b:['🍳','Breakfast'],l:['🥪','Lunch'],d:['🍝','Dinner'],s:['🍎','Snacks']};
const foodOn=(p=profile)=>p.kid?p.foodOn===true:p.foodOff!==true; // kids: off unless a parent turns it on
const showKcal=()=>!bmiYoung(); // no calories for kids and teens
const mealNow=()=>{const h=new Date().getHours()+new Date().getMinutes()/60;return h>=4.5&&h<10.5?'b':h>=11&&h<14.5?'l':h>=17&&h<21?'d':'s'};
const foodOn_day=d=>(profile.food||[]).filter(f=>f.d===d);
const foodToday=()=>foodOn_day(isoLocal());
const foodSum=list=>{const o=['p','c','f'].reduce((o,k)=>(o[k]=round1(list.reduce((a,x)=>a+(x[k]||0),0)),o),{});o.k=Math.round(list.reduce((a,x)=>a+(x.k||0),0));return o};
const MACRO={p:['💪','Protein','helps muscles repair and grow','#7c3aed'],c:['⚡','Carbs','your body\'s main fuel for workouts','#ea580c'],f:['🥦','Fiber','keeps your tummy happy and you full longer','#16a34a']};
const macroTiles=t=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">${Object.keys(MACRO).map(k=>`<div class="stat"><b style="color:${MACRO[k][3]}">${round1(t[k])}<small style="font-size:14px">g</small></b><span>${MACRO[k][0]} ${MACRO[k][1]}</span></div>`).join('')}</div>`;
const kcalTxt=n=>`${Math.round(n).toLocaleString()} cal`;
const entryLine=f=>`${showKcal()&&f.k?`<b>${kcalTxt(f.k)}</b> · `:''}P ${f.p} · C ${f.c} · F ${f.f} g`;
/* ---------- Workout calories ----------
   Estimated as (MET − 1) × body weight (kg) × hours: only the calories above resting, which the goal
   already covers. Dog walks count less than walks (slower, lots of stops). Strength work counts about 2 minutes per set at MET 3.5. Calorie-burn estimates are
   rough (wrist trackers are off by 27–93% in studies), so by default only HALF is added back. */
const ACT_MET={Walk:3.5,'Dog walk':3,Run:9.8,Bike:7.5,Swim:6,Cricket:4.8,Soccer:7,Basketball:6.5,Tennis:7.3,Pickleball:4.1,Dance:5,Yoga:2.5,'Martial arts':7,Stretch:2.3,Intervals:8,Other:4};
const LIFT_MET=3.5;
const EX_SHARE={off:[0,'Off'],half:[.5,'Half'],all:[1,'All']};
const exShare=()=>(EX_SHARE[profile.exAdd]||EX_SHARE.half)[0];
// Calories burned in workouts and activities on a day, or null if body weight is unknown.
function exerciseKcal(d){
  const lw=latestWeight();if(!lw)return null;
  const kg=kgOf(lw.w,lw.unit);let k=0;
  (getJournal()[d]||[]).forEach(e=>{
    if(e.kind==='activity')k+=Math.max(0,(ACT_MET[e.act]||4)-1)*kg*(e.minutes||0)/60;
    else k+=(LIFT_MET-1)*kg*workSets(e.sets).length*2/60});
  return Math.round(k);
}
const hasExercise=d=>(getJournal()[d]||[]).length>0;
// Goal − Food + Exercise = Remaining, like MyFitnessPal.
function kcalSummary(t,d=isoLocal()){
  if(!showKcal())return '';
  const g=profile.kcalGoal,burn=exerciseKcal(d),add=burn?Math.round(burn*exShare()):0;
  const hint=burn===null&&hasExercise(d)&&exShare()?`<p class="small muted">🏃 Add your weight in Body stats to count workout calories.</p>`:'';
  if(!g)return `<div class="kcalrow"><div><b>${t.k.toLocaleString()}</b><span>calories eaten</span></div>${burn?`<div><b>${burn.toLocaleString()}</b><span>burned 🏃</span></div>`:''}<button class="link small" data-kgoal>🎯 Set a daily goal</button></div>${hint}`;
  const left=g-t.k+add,cap=g+add;
  return `<div class="kcalrow"><div><b>${g.toLocaleString()}</b><span>Goal</span></div><i>−</i><div><b>${t.k.toLocaleString()}</b><span>Food</span></div>${add?`<i>+</i><div><b>${add.toLocaleString()}</b><span>Exercise</span></div>`:''}<i>=</i><div><b style="color:${left<0?'var(--warn)':'var(--ok)'}">${left.toLocaleString()}</b><span>Remaining</span></div></div>
    <div class="famBar" style="height:10px"><i style="width:${Math.min(100,t.k/cap*100)}%;${left<0?'background:var(--warn)':''}"></i></div>
    ${add&&exShare()<1?`<p class="small muted">🏃 About ${burn.toLocaleString()} burned in workouts; half is added back because burn estimates run high.</p>`:''}${hint}`;
}

// Shrink a photo to max 768px JPEG and return it as a data: URL (about 60–150 KB).
async function foodImage(file){
  const url=URL.createObjectURL(file);
  try{
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
    const k=Math.min(1,768/Math.max(img.naturalWidth,img.naturalHeight)),c=document.createElement('canvas');
    c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);
    return c.toDataURL('image/jpeg',.8);
  }finally{URL.revokeObjectURL(url)}
}
function saveFood(entry){
  const cut=isoLocal(new Date(Date.now()-FOOD_KEEP_DAYS*864e5));
  profile.food=[...(profile.food||[]).filter(f=>f.d>=cut),Object.assign({id:newId('f'),u:Date.now()},entry)].slice(-600);
  saveProfile();syncSoon();
}
const mealSeg=sel=>`<p class="small muted" style="font-weight:700">MEAL</p><div class="seg" id="fmeal">${Object.entries(MEALS).map(([k,m])=>`<button class="${k===sel?'on':''}" data-meal="${k}">${m[0]} ${m[1]}</button>`).join('')}</div>`;
const bindMealSeg=set=>document.querySelectorAll('#fmeal [data-meal]').forEach(b=>b.onclick=()=>{set(b.dataset.meal);document.querySelectorAll('#fmeal button').forEach(x=>x.classList.toggle('on',x===b))});

/* ---------- Today card ---------- */
function foodCard(){
  if(!foodOn()||todayHidden('food'))return '';
  const L=foodToday(),t=foodSum(L);
  return `<div class="card stack" id="foodcard"><div class="row between"><h2 class="h3">🍽️ Food today</h2>${L.length?`<span class="small muted" style="font-weight:700">${plural(L.length,'item')}</span>`:''}</div>
    ${L.length?`${kcalSummary(t)}${macroTiles(t)}`:`<p class="small muted">Log breakfast, lunch, dinner and snacks. Snap a photo to get the breakdown.</p>`}
    <div class="row" style="gap:8px"><button class="btn sm" id="foodscan" style="flex:1">📷 Scan</button><button class="btn sm secondary" id="foodman" style="flex:1" aria-label="Add food manually">✏️ Manual</button><button class="btn sm secondary" id="fooddiary" style="flex:1">📒 Diary</button></div></div>`;
}
function bindFood(v){
  if($('#foodscan'))$('#foodscan').onclick=()=>foodSheet(mealNow());
  if($('#foodman'))$('#foodman').onclick=()=>quickSheet(mealNow());
  if($('#fooddiary'))$('#fooddiary').onclick=()=>{foodDay=isoLocal();go('food')};
  v.querySelectorAll('[data-kgoal]').forEach(b=>b.onclick=goalSheet);
}

/* ---------- Food diary screen ---------- */
let foodDay=null;
function renderFood(v){
  foodDay=foodDay||isoLocal();
  const L=foodOn_day(foodDay),t=foodSum(L),isToday=foodDay===isoLocal(),shift=n=>{const d=parseIso(foodDay);d.setDate(d.getDate()+n);return isoLocal(d)};
  v.innerHTML=`<div class="topbar"><button class="link" id="fback">← Today</button>${showKcal()?`<button class="link small" data-kgoal>🎯 ${profile.kcalGoal?'Goal '+profile.kcalGoal.toLocaleString():'Set goal'}</button>`:''}</div>
  <div class="stack-lg">
    <div class="row between"><button class="btn sm ghost" id="fprev" aria-label="Previous day">‹</button><h1 style="font-size:22px">📒 ${isToday?'Today':niceDate(foodDay)}</h1><button class="btn sm ghost" id="fnext" aria-label="Next day" ${isToday?'disabled':''}>›</button></div>
    ${showKcal()||L.length?`<div class="card stack">${kcalSummary(t,foodDay)}${macroTiles(t)}</div>`:''}
    ${Object.entries(MEALS).map(([m,[e,name]])=>{const M=L.filter(f=>(f.m||'s')===m),s=foodSum(M);
      return `<div class="card stack meal"><div class="row between"><h2 class="h3">${e} ${name}</h2>${M.length&&showKcal()?`<b>${kcalTxt(s.k)}</b>`:''}</div>
        ${M.map(f=>`<div class="row between fentry"><button class="fedit" data-fedit="${f.id}" aria-label="Edit ${esc(f.n)}"><b>${esc(f.n)}</b><span class="small muted">${entryLine(f)} ✏️</span></button><button class="xbtn" data-fdel="${f.id}" aria-label="Delete ${esc(f.n)}">🗑️</button></div>`).join('')}
        <div class="row" style="gap:8px"><button class="link" data-fadd="${m}">＋ Add food</button><button class="link" data-fquick="${m}">✏️ Add manually</button></div></div>`}).join('')}
    ${showKcal()?'':`<p class="small muted center">Growing bodies need plenty of fuel, so KinFit doesn't count calories for under-18s. Eat a variety of foods and listen to your hunger.</p>`}
  </div>`;
  $('#fback').onclick=()=>go('today');
  $('#fprev').onclick=()=>{foodDay=shift(-1);renderFood(v)};
  $('#fnext').onclick=()=>{if(!isToday){foodDay=shift(1);renderFood(v)}};
  v.querySelectorAll('[data-kgoal]').forEach(b=>b.onclick=goalSheet);
  v.querySelectorAll('[data-fadd]').forEach(b=>b.onclick=()=>foodSheet(b.dataset.fadd));
  v.querySelectorAll('[data-fedit]').forEach(b=>b.onclick=()=>{const x=(profile.food||[]).find(y=>y.id===b.dataset.fedit);if(x)quickSheet(x.m,null,x)});
  v.querySelectorAll('[data-fquick]').forEach(b=>b.onclick=()=>quickSheet(b.dataset.fquick));
  v.querySelectorAll('[data-fdel]').forEach(b=>b.onclick=()=>{const before=(profile.food||[]).slice();profile.food=before.filter(x=>x.id!==b.dataset.fdel);saveProfile();renderFood(v);
    undoable('Food deleted',()=>{profile.food=before;saveProfile();renderFood(v)},()=>syncSoon())});
}

function goalSheet(){
  if(!showKcal())return;
  sheet(`<h2>🎯 Daily calorie goal</h2><p class="small muted">Optional. Pick a number that suits you, or ask a doctor or dietitian. Most adults need somewhere around 1,800–2,800 a day, more if you're very active.</p>
    <input class="num" id="kg" type="number" inputmode="numeric" min="${KCAL_MIN_GOAL}" max="${KCAL_MAX_GOAL}" step="50" placeholder="e.g. 2200" value="${profile.kcalGoal||''}">
    <p class="small muted" style="font-weight:700">ADD WORKOUT CALORIES BACK</p><div class="seg" id="exadd">${Object.entries(EX_SHARE).map(([k,[,l]])=>`<button class="${(profile.exAdd||'half')===k?'on':''}" data-ex="${k}">${l}${k==='half'?' ✓':''}</button>`).join('')}</div>
    <p class="small muted">On workout days you can eat a bit more. Burn estimates often run high, so <b>Half</b> is the safer choice. Uses your weight from Body stats.</p>
    <button class="btn" id="kok">Save</button>${profile.kcalGoal?'<button class="btn secondary" id="koff">Remove goal</button>':''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    let ex=profile.exAdd||'half';document.querySelectorAll('#exadd [data-ex]').forEach(b=>b.onclick=()=>{ex=b.dataset.ex;document.querySelectorAll('#exadd button').forEach(x=>x.classList.toggle('on',x===b))});
    if($('#koff'))$('#koff').onclick=()=>{delete profile.kcalGoal;saveProfile();syncSoon();closeLayer();render()};
    $('#kok').onclick=()=>{const g=Math.round(parseFloat($('#kg').value));
      if(!(g>=KCAL_MIN_GOAL)){toast(`Pick ${KCAL_MIN_GOAL.toLocaleString()} or more. Going lower isn't safe without a doctor`);return}
      if(g>KCAL_MAX_GOAL){toast('Check your goal');return}
      profile.kcalGoal=g;if(ex==='half')delete profile.exAdd;else profile.exAdd=ex;saveProfile();syncSoon();closeLayer();render()};
  });
}
// Add food by typing the numbers, or fix an entry (edit = an existing diary entry; pre = values to start from).
function quickSheet(meal,pre,edit){
  const e=edit||pre||{};let m=e.m||meal||mealNow();
  const n=(id,l,v)=>`<div style="flex:1"><label class="small muted" style="font-weight:700">${l}</label><input class="num" id="${id}" type="number" inputmode="decimal" min="0" step="any" placeholder="0" value="${v?v:''}"></div>`;
  sheet(`<h2>${edit?'✏️ Edit food':'✏️ Add food manually'}</h2>
    <input class="txt" id="qn" maxlength="50" placeholder="What did you eat? e.g. Banana" value="${esc(e.n||'')}">
    ${showKcal()?`<div class="row" style="gap:10px">${n('qk','CALORIES',e.k)}</div><p class="small muted">Tip: the label on the pack shows calories per serving.</p>`:''}
    <div class="row" style="gap:10px">${n('qp','PROTEIN g',e.p)}${n('qc','CARBS g',e.c)}${n('qf','FIBER g',e.f)}</div>
    ${mealSeg(m)}
    <button class="btn" id="qok">${edit?'Save':'Add'}</button>${edit?'<button class="btn danger" id="qdel">Delete</button>':''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    bindMealSeg(x=>m=x);$('#cancel').onclick=closeLayer;
    if(edit)$('#qdel').onclick=()=>{profile.food=(profile.food||[]).filter(x=>x.id!==edit.id);saveProfile();syncSoon();closeLayer();toast('Food deleted');render()};
    $('#qok').onclick=()=>{const v=id=>{const x=$('#'+id);return x?Math.max(0,parseFloat(x.value)||0):(e[id.slice(1)]||0)},name=$('#qn').value.trim();
      if(!name){toast('Give it a name');return}
      const vals={m,n:name.slice(0,50),k:Math.min(5000,Math.round(v('qk'))),p:round1(Math.min(1000,v('qp'))),c:round1(Math.min(1000,v('qc'))),f:round1(Math.min(1000,v('qf')))};
      if(edit){profile.food=(profile.food||[]).map(x=>x.id===edit.id?Object.assign({},x,vals,{u:Date.now()}):x);saveProfile();syncSoon()}
      else saveFood(Object.assign({d:route==='food'&&foodDay?foodDay:isoLocal()},vals));
      closeLayer();toast(edit?'Saved ✅':`Added to ${MEALS[m][1]}`);render()};
  });
}

/* ---------- Scan or describe ---------- */
function foodSheet(meal){
  let img='';const m=meal||mealNow();
  sheet(`<h2>📷 Add to ${MEALS[m][0]} ${MEALS[m][1]}</h2><p class="small muted">Take a photo of your plate from above, with all the food in view. You can also just describe it.</p>
    <div class="row" style="gap:8px"><label class="btn secondary" style="flex:1;cursor:pointer">📷 Take photo<input type="file" id="fcam" accept="image/*" capture="environment" hidden></label>
      <label class="btn secondary" style="flex:1;cursor:pointer">🖼️ Choose photo<input type="file" id="fpick" accept="image/*" hidden></label></div>
    <div id="fprev"></div>
    <label class="small muted" style="font-weight:700">DETAILS (OPTIONAL)</label>
    <input class="txt" id="fnote" maxlength="200" placeholder="e.g. big bowl, brown rice, 2 eggs">
    <button class="btn" id="fgo">🔍 Get breakdown</button><button class="link" id="fq">✏️ Add manually instead</button><button class="btn ghost" id="cancel">Cancel</button>
    <p class="small muted">🔒 The photo is only used to work out the breakdown. It isn't saved anywhere.</p>`,()=>{
    $('#cancel').onclick=closeLayer;$('#fq').onclick=()=>quickSheet(m);
    const pick=async e=>{const f=e.target.files[0];if(!f)return;try{img=await foodImage(f);$('#fprev').innerHTML=`<img src="${img}" alt="Your meal" class="fprev">`}catch(err){toast("Couldn't open that photo")}};
    $('#fcam').onchange=pick;$('#fpick').onchange=pick;
    $('#fgo').onclick=async()=>{const note=$('#fnote').value.trim();
      if(!img&&note.length<3){toast('Add a photo or describe your meal');return}
      const b=$('#fgo'),reset=()=>{b.disabled=false;b.textContent='🔍 Get breakdown'};b.disabled=true;b.textContent='Looking at your meal… 🔍';
      try{
        const r=await fetch('api/food',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({image:img||undefined,note:note||undefined})});
        const d=await r.json().catch(()=>({}));
        if(d.error==='crisis'){foodCrisis();return}
        if(!r.ok||d.error)throw new Error(d.error||'failed');
        if(!d.food){toast("Hmm, I couldn't spot any food in that photo 🤔");reset();return}
        foodResult(d,img,m);
      }catch(e){reset();
        toast(e.message==='rate_limited'?'Lots of scans right now. Try again in a little while':e.message==='not_configured'?'The food scanner isn\'t switched on for this website yet':e.message==='unsafe'?'I can only help with food and meals':e.message==='bad_image'?'That photo didn\'t work. Try another one':'Couldn\'t check that meal. Check your internet and try again')}
    };
  });
}
function foodCrisis(){
  sheet(`<h2>💛 You're not alone</h2><p>What you're feeling matters. Please talk to a trusted adult (a parent, teacher or coach) right now.</p>
    <p>In Canada or the US you can call or text <b>988</b> any time. Kids and teens in Canada can call Kids Help Phone at <b>1-800-668-6868</b> or text <b>686868</b>.</p>
    <button class="btn" id="ok">OK</button>`,()=>$('#ok').onclick=closeLayer);
}
function foodResult(d,img,meal){
  let k=1,m=meal||mealNow();const kc=showKcal(),T=d.total,cal=T.calories||0;
  const draw=()=>{const t={p:T.protein*k,c:T.carbs*k,f:T.fiber*k};
    $('#fres').innerHTML=`${kc?(cal>0?`<p class="center fkcal"><b>${Math.round(cal*k).toLocaleString()}</b> calories</p>`:'<p class="small muted center">Calories couldn\'t be estimated for this one. Use Quick add if you know them.</p>'):''}${macroTiles(t)}
      <div class="stack" style="gap:6px">${d.items.map(x=>`<div class="small fitem"><b>${esc(x.name)}</b>${x.portion?` <span class="muted">· ${esc(x.portion)}${k!==1?' × '+k:''}</span>`:''}<br><span class="muted">${kc&&x.calories?Math.round(x.calories*k)+' cal · ':''}P ${round1(x.protein*k)} · C ${round1(x.carbs*k)} · F ${round1(x.fiber*k)} g</span></div>`).join('')}</div>`};
  sheet(`<h2>🍽️ ${esc(d.dish)}</h2>
    ${img?`<img src="${img}" alt="Your meal" class="fprev">`:''}
    <p class="small muted"><span class="chip">${{low:'🤔 Rough guess',medium:'👍 Good guess',high:'🎯 Confident'}[d.confidence]}</span> Estimated from ${img?'the photo':'your description'}. Portions can be off, so adjust if needed.</p>
    <p class="small muted" style="font-weight:700">HOW MUCH DID YOU EAT?</p>
    <div class="seg" id="fk">${[[.5,'½'],[1,'All of it'],[1.5,'1½×'],[2,'2×']].map(([v,l])=>`<button class="${v===1?'on':''}" data-k="${v}">${l}</button>`).join('')}</div>
    <div id="fres" class="stack"></div>
    ${mealSeg(m)}
    <details class="how"><summary>What do these do?</summary>${Object.values(MACRO).map(x=>`<p class="small">${x[0]} <b>${x[1]}</b> ${x[2]}.</p>`).join('')}</details>
    <button class="btn" id="fadd">＋ Add to diary</button><button class="btn secondary" id="fedit">✏️ Change the numbers</button><button class="btn secondary" id="fagain">📷 Scan another</button><button class="btn ghost" id="cancel">Close</button>`,()=>{
    draw();bindMealSeg(x=>m=x);
    $('#cancel').onclick=closeLayer;$('#fagain').onclick=()=>foodSheet(m);
    $('#fedit').onclick=()=>quickSheet(m,{m,n:(d.dish+(k!==1?` (${k===.5?'½':k+'×'})`:'')).slice(0,50),k:Math.round(cal*k),p:round1(T.protein*k),c:round1(T.carbs*k),f:round1(T.fiber*k)});
    document.querySelectorAll('#fk [data-k]').forEach(b=>b.onclick=()=>{k=+b.dataset.k;document.querySelectorAll('#fk button').forEach(x=>x.classList.toggle('on',x===b));draw()});
    $('#fadd').onclick=()=>{
      saveFood({d:route==='food'&&foodDay?foodDay:isoLocal(),m,n:(d.dish+(k!==1?` (${k===.5?'½':k+'×'})`:'')).slice(0,50),k:Math.round(cal*k),p:round1(T.protein*k),c:round1(T.carbs*k),f:round1(T.fiber*k)});
      closeLayer();toast(`🍽️ Added to ${MEALS[m][1]}`);render()};
  });
}
