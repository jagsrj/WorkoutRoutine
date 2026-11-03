/* KinFit · Food scanner: snap a meal (or describe it) and get an estimate of its protein, carbs and fiber.
   The photo is shrunk on the phone and sent to /api/food, which asks a Workers AI vision model.
   Photos are never stored. Results can be added to a simple "food today" list (kept for 30 days).
   No calories, targets or good/bad labels: KinFit is used by kids too. Child profiles only see the
   scanner if a parent turns it on (Me → Parent controls). */

const FOOD_KEEP_DAYS=30;
const foodOn=(p=profile)=>p.kid?p.foodOn===true:p.foodOff!==true; // kids: off unless a parent turns it on
const foodToday=()=>(profile.food||[]).filter(f=>f.d===isoLocal());
const foodSum=list=>['p','c','f'].reduce((o,k)=>(o[k]=round1(list.reduce((a,x)=>a+(x[k]||0),0)),o),{});
const MACRO={p:['💪','Protein','helps muscles repair and grow','#7c3aed'],c:['⚡','Carbs','your body\'s main fuel for workouts','#ea580c'],f:['🥦','Fiber','keeps your tummy happy and you full longer','#16a34a']};
const macroTiles=t=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">${Object.keys(MACRO).map(k=>`<div class="stat"><b style="color:${MACRO[k][3]}">${round1(t[k])}<small style="font-size:14px">g</small></b><span>${MACRO[k][0]} ${MACRO[k][1]}</span></div>`).join('')}</div>`;

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

function foodCard(){
  if(!foodOn()||todayHidden('food'))return '';
  const L=foodToday(),t=foodSum(L);
  return `<div class="card stack" id="foodcard"><div class="row between"><h2 class="h3">🍽️ Food today</h2>${L.length?`<span class="small muted" style="font-weight:700">${plural(L.length,'meal')}</span>`:''}</div>
    ${L.length?`${macroTiles(t)}<details class="how"><summary>Meals</summary>${L.map(f=>`<div class="row between" style="padding:6px 0"><span>${esc(f.n)}</span><span class="small muted">P ${f.p} · C ${f.c} · F ${f.f} g<button class="xbtn" data-fdel="${f.id}" aria-label="Delete">🗑️</button></span></div>`).join('')}</details>`
      :`<p class="small muted">Snap a photo of your meal to see its protein, carbs and fiber.</p>`}
    <button class="btn secondary" id="foodscan">📷 Scan food</button></div>`;
}
function bindFood(v){
  if($('#foodscan'))$('#foodscan').onclick=()=>foodSheet();
  v.querySelectorAll('[data-fdel]').forEach(b=>b.onclick=()=>{const before=(profile.food||[]).slice();profile.food=before.filter(x=>x.id!==b.dataset.fdel);saveProfile();render();
    undoable('Meal deleted',()=>{profile.food=before;saveProfile();render()},()=>syncSoon())});
}

function foodSheet(){
  let img='';
  sheet(`<h2>🍽️ Scan food</h2><p class="small muted">Take a photo of your plate from above, with all the food in view. You can also just describe it.</p>
    <div class="row" style="gap:8px"><label class="btn secondary" style="flex:1;cursor:pointer">📷 Take photo<input type="file" id="fcam" accept="image/*" capture="environment" hidden></label>
      <label class="btn secondary" style="flex:1;cursor:pointer">🖼️ Choose photo<input type="file" id="fpick" accept="image/*" hidden></label></div>
    <div id="fprev"></div>
    <label class="small muted" style="font-weight:700">DETAILS (OPTIONAL)</label>
    <input class="txt" id="fnote" maxlength="200" placeholder="e.g. big bowl, brown rice, 2 eggs">
    <button class="btn" id="fgo">🔍 Get breakdown</button><button class="btn ghost" id="cancel">Cancel</button>
    <p class="small muted">🔒 The photo is only used to work out the breakdown. It isn't saved anywhere.</p>`,()=>{
    $('#cancel').onclick=closeLayer;
    const pick=async e=>{const f=e.target.files[0];if(!f)return;try{img=await foodImage(f);$('#fprev').innerHTML=`<img src="${img}" alt="Your meal" class="fprev">`}catch(err){toast("Couldn't open that photo")}};
    $('#fcam').onchange=pick;$('#fpick').onchange=pick;
    $('#fgo').onclick=async()=>{const note=$('#fnote').value.trim();
      if(!img&&note.length<3){toast('Add a photo or describe your meal');return}
      const b=$('#fgo');b.disabled=true;b.textContent='Looking at your meal… 🔍';
      try{
        const r=await fetch('api/food',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({image:img||undefined,note:note||undefined})});
        const d=await r.json().catch(()=>({}));
        if(d.error==='crisis'){foodCrisis();return}
        if(!r.ok||d.error)throw new Error(d.error||'failed');
        if(!d.food){toast("Hmm, I couldn't spot any food in that photo 🤔");b.disabled=false;b.textContent='🔍 Get breakdown';return}
        foodResult(d,img);
      }catch(e){b.disabled=false;b.textContent='🔍 Get breakdown';
        toast(e.message==='rate_limited'?'Lots of scans right now. Try again in a little while':e.message==='not_configured'?'The food scanner isn\'t switched on for this website yet':e.message==='unsafe'?'I can only help with food and meals':e.message==='bad_image'?'That photo didn\'t work. Try another one':'Couldn\'t check that meal. Check your internet and try again')}
    };
  });
}
function foodCrisis(){
  sheet(`<h2>💛 You're not alone</h2><p>What you're feeling matters. Please talk to a trusted adult (a parent, teacher or coach) right now.</p>
    <p>In Canada or the US you can call or text <b>988</b> any time. Kids and teens in Canada can call Kids Help Phone at <b>1-800-668-6868</b> or text <b>686868</b>.</p>
    <button class="btn" id="ok">OK</button>`,()=>$('#ok').onclick=closeLayer);
}
function foodResult(d,img){
  let k=1;
  const draw=()=>{const t={p:d.total.protein*k,c:d.total.carbs*k,f:d.total.fiber*k};
    $('#fres').innerHTML=`${macroTiles(t)}
      <div class="stack" style="gap:6px">${d.items.map(x=>`<div class="row between small"><span><b>${esc(x.name)}</b>${x.portion?` <span class="muted">· ${esc(x.portion)}${k!==1?' × '+k:''}</span>`:''}</span><span class="muted">P ${round1(x.protein*k)} · C ${round1(x.carbs*k)} · F ${round1(x.fiber*k)} g</span></div>`).join('')}</div>`};
  sheet(`<h2>🍽️ ${esc(d.dish)}</h2>
    ${img?`<img src="${img}" alt="Your meal" class="fprev">`:''}
    <p class="small muted"><span class="chip">${{low:'🤔 Rough guess',medium:'👍 Good guess',high:'🎯 Confident'}[d.confidence]}</span> Estimated from ${img?'the photo':'your description'}. Portions can be off, so adjust if needed.</p>
    <p class="small muted" style="font-weight:700">HOW MUCH DID YOU EAT?</p>
    <div class="seg" id="fk">${[[.5,'½'],[1,'All of it'],[1.5,'1½×'],[2,'2×']].map(([v,l])=>`<button class="${v===1?'on':''}" data-k="${v}">${l}</button>`).join('')}</div>
    <div id="fres" class="stack"></div>
    <details class="how"><summary>What do these do?</summary>${Object.values(MACRO).map(m=>`<p class="small">${m[0]} <b>${m[1]}</b> ${m[2]}.</p>`).join('')}</details>
    <button class="btn" id="fadd">＋ Add to food today</button><button class="btn secondary" id="fagain">📷 Scan another</button><button class="btn ghost" id="cancel">Close</button>`,()=>{
    draw();
    $('#cancel').onclick=closeLayer;$('#fagain').onclick=()=>foodSheet();
    document.querySelectorAll('#fk [data-k]').forEach(b=>b.onclick=()=>{k=+b.dataset.k;document.querySelectorAll('#fk button').forEach(x=>x.classList.toggle('on',x===b));draw()});
    $('#fadd').onclick=()=>{const cut=isoLocal(new Date(Date.now()-FOOD_KEEP_DAYS*864e5));
      profile.food=[...(profile.food||[]).filter(f=>f.d>=cut),{id:newId('f'),d:isoLocal(),n:(d.dish+(k!==1?` (${k===.5?'½':k+'×'})`:'')).slice(0,50),p:round1(d.total.protein*k),c:round1(d.total.carbs*k),f:round1(d.total.fiber*k),u:Date.now()}].slice(-300);
      saveProfile();syncSoon();closeLayer();toast('🍽️ Added to food today');render()};
  });
}
