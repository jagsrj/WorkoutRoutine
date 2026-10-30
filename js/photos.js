/* KinFit · Progress photos (stored only on this device). */
/* ---------- Progress photos ----------
   Stored only on this device (IndexedDB), never synced or uploaded. Off by default; each person turns it on. */
const PH={db:null};
function phDB(){
  if(PH.db)return PH.db;
  PH.db=new Promise((res,rej)=>{const r=indexedDB.open('jams_photos',1);
    r.onupgradeneeded=()=>{const s=r.result.createObjectStore('photos',{keyPath:'id'});s.createIndex('pid','pid')};
    r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
  return PH.db;
}
async function phTx(mode,fn){const db=await phDB();return new Promise((res,rej)=>{const t=db.transaction('photos',mode),s=t.objectStore('photos');let out;Promise.resolve(fn(s)).then(v=>out=v);t.oncomplete=()=>res(out);t.onerror=()=>rej(t.error)})}
const reqP=r=>new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
async function photosFor(pid=profile.id){try{return (await phTx('readonly',s=>reqP(s.index('pid').getAll(pid)))).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.id-b.id)}catch(e){return []}}
const putPhoto=p=>phTx('readwrite',s=>{s.put(p)});
const delPhoto=id=>phTx('readwrite',s=>{s.delete(id)});
async function delPhotosFor(pid){const list=await photosFor(pid);await phTx('readwrite',s=>{list.forEach(p=>s.delete(p.id))})}
const clearPhotos=()=>phTx('readwrite',s=>{s.clear()}).catch(()=>{});
// Shrink to max 1280px JPEG so photos stay small.
async function shrink(file){
  const url=URL.createObjectURL(file);
  try{
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
    const k=Math.min(1,1280/Math.max(img.naturalWidth,img.naturalHeight)),c=document.createElement('canvas');
    c.width=Math.round(img.naturalWidth*k);c.height=Math.round(img.naturalHeight*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);
    return await new Promise(res=>c.toBlob(res,'image/jpeg',.82));
  }finally{URL.revokeObjectURL(url)}
}
const urls=new Map();
const blobUrl=p=>{if(!urls.has(p.id))urls.set(p.id,URL.createObjectURL(p.blob));return urls.get(p.id)};
const daysSince=d=>Math.floor((new Date()-parseIso(d))/864e5);
const ageText=n=>n===0?'today':n===1?'1 day ago':n<14?`${n} days ago`:n<60?`${Math.round(n/7)} weeks ago`:`${Math.round(n/30)} months ago`;

async function renderPhotos(){
  const box=$('#photos');if(!box)return;
  if(!profile.photos){box.innerHTML='';return}
  const list=await photosFor();if(!$('#photos'))return;
  box.innerHTML=`<div class="card stack"><div class="row between"><h3>📸 Progress photos</h3><span class="small muted" style="font-weight:700;white-space:nowrap">🔒 Private</span></div>
    ${list.length?`<div class="pgrid">${list.slice().reverse().map(p=>`<button class="pthumb" data-ph="${p.id}"><img src="${blobUrl(p)}" alt="Progress photo from ${niceDate(p.date)}" loading="lazy"><span>${parseIso(p.date).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'2-digit'})}</span></button>`).join('')}</div>`
      :`<div class="empty"><div class="big-emoji">📷</div><p class="muted">Take your first photo today. In a few weeks you'll be able to see how far you've come!</p></div>`}
    <label class="btn secondary" style="cursor:pointer">📷 Add a photo<input type="file" id="phadd" accept="image/*" hidden></label>
    ${list.length>=2?`<button class="btn" id="phcmp">↔️ Compare before & after</button>`:''}
  </div>`;
  $('#phadd').onchange=e=>{const f=e.target.files[0];e.target.value='';if(f)addPhotoSheet(f)};
  box.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>viewPhoto(list.find(p=>String(p.id)===b.dataset.ph),list));
  if($('#phcmp'))$('#phcmp').onclick=()=>compareSheet(list);
}
async function addPhotoSheet(file){
  let blob;try{blob=await shrink(file)}catch(e){toast("Couldn't open that picture");return}
  if(!blob){toast("Couldn't open that picture");return}
  const prev=URL.createObjectURL(blob);
  sheet(`<h2>New progress photo</h2><img src="${prev}" class="pfull" alt="">
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">DATE</label><input type="date" id="pd" class="num" value="${isoLocal()}" max="${isoLocal()}" style="font-size:16px"></div>
    <div style="flex:1"><label class="small muted" style="font-weight:700">WEIGHT (optional)</label><input type="number" inputmode="decimal" step="0.1" min="0" id="pw" class="num" placeholder="${profile.unit}" style="font-size:16px"></div></div>
    <p class="small muted">💡 For the best comparisons: same spot, same light, same pose, same time of day.</p>
    <button class="btn" id="psave">Save photo</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=()=>{URL.revokeObjectURL(prev);closeLayer()};
    $('#psave').onclick=async()=>{
      $('#psave').disabled=true;
      try{await putPhoto({id:Date.now(),pid:profile.id,date:$('#pd').value||isoLocal(),w:parseFloat($('#pw').value)||null,unit:profile.unit,blob});
        URL.revokeObjectURL(prev);closeLayer();toast('📸 Photo saved');renderPhotos();
      }catch(e){$('#psave').disabled=false;toast('Not enough space on this phone to save the photo')}
    };
  });
}
function photoLine(p){return `${niceDate(p.date)} · ${ageText(daysSince(p.date))}${p.w?` · ${round1(toUnit(p.w,p.unit))} ${profile.unit}`:''}`}
function viewPhoto(p,list){
  if(!p)return;
  sheet(`<img src="${blobUrl(p)}" class="pfull" alt="Progress photo"><p style="font-weight:700">${photoLine(p)}</p>
    <div class="row" style="gap:10px"><button class="btn secondary" id="psh">⬇️ Save</button><button class="btn danger" id="pdel">🗑️ Delete</button></div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#psh').onclick=async()=>{
      const f=new File([p.blob],`progress_${p.date}.jpg`,{type:'image/jpeg'});
      try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){if(e&&e.name==='AbortError')return}
      const a=document.createElement('a');a.href=blobUrl(p);a.download=f.name;document.body.appendChild(a);a.click();a.remove();
    };
    $('#pdel').onclick=()=>confirmBox('Delete this photo?','It will be gone for good.','Delete',async()=>{await delPhoto(p.id);URL.revokeObjectURL(urls.get(p.id));urls.delete(p.id);toast('Deleted');renderPhotos()},true);
  });
}
function compareSheet(list){
  let a=list[0],b=list[list.length-1];
  const opts=sel=>list.map(p=>`<option value="${p.id}" ${p.id===sel.id?'selected':''}>${niceDate(p.date)}</option>`).join('');
  const draw=()=>{
    const gap=Math.round((parseIso(b.date)-parseIso(a.date))/864e5);
    const dw=a.w&&b.w?round1(toUnit(b.w,b.unit)-toUnit(a.w,a.unit)):null;
    sheet(`<h2>Before & after ↔️</h2>
      <div class="row" style="gap:8px"><select class="sel" id="ca">${opts(a)}</select><select class="sel" id="cb">${opts(b)}</select></div>
      <div class="cmp" id="cmp"><img src="${blobUrl(b)}" alt="After"><div class="cmp-a" id="cma"><img src="${blobUrl(a)}" alt="Before"></div><div class="cmp-h" id="cmh"></div>
        <span class="cmp-l">Before</span><span class="cmp-r">After</span></div>
      <input type="range" id="cr" min="0" max="100" value="50" aria-label="Slide to compare" class="range">
      <p class="center" style="font-weight:700">${gap>0?`${ageText(gap).replace(' ago','')} apart`:'Same day'}${dw!==null?` · ${dw>0?'+':''}${dw} ${profile.unit}`:''}</p>
      <p class="small muted center">Drag the slider to compare. Progress isn't only about looks. Strength and energy count too! 💪</p>
      <button class="btn ghost" id="cancel">Close</button>`,()=>{
      $('#cancel').onclick=closeLayer;
      const set=v=>{$('#cma').style.clipPath=`inset(0 ${100-v}% 0 0)`;$('#cmh').style.left=v+'%'};set(50);
      $('#cr').oninput=e=>set(e.target.value);
      const cmp=$('#cmp');const drag=e=>{const r=cmp.getBoundingClientRect(),x=((e.touches?e.touches[0].clientX:e.clientX)-r.left)/r.width*100;const v=Math.max(0,Math.min(100,x));$('#cr').value=v;set(v)};
      cmp.addEventListener('pointerdown',e=>{drag(e);cmp.setPointerCapture(e.pointerId)});cmp.addEventListener('pointermove',e=>{if(e.buttons)drag(e)});
      $('#ca').onchange=e=>{a=list.find(p=>String(p.id)===e.target.value);draw()};
      $('#cb').onchange=e=>{b=list.find(p=>String(p.id)===e.target.value);draw()};
    });
  };
  draw();
}
async function renderPhotoNudge(){
  const box=$('#photoNudge');if(!box||!profile.photos)return;
  const list=await photosFor();if(!$('#photoNudge'))return;
  const last=list[list.length-1],n=last?daysSince(last.date):null;
  if(last&&n<28)return;
  box.innerHTML=`<button class="card row" id="nudge" style="width:100%;text-align:left"><span class="big-emoji">📸</span><div style="flex:1"><b>${last?'Time for a progress photo?':'Take your first progress photo'}</b><p class="muted small">${last?`Your last one was ${ageText(n)}.`:'Then compare in a few weeks.'}</p></div><span class="muted">›</span></button>`;
  $('#nudge').onclick=()=>{go('progress');setTimeout(()=>{const el=$('#photos');if(el)el.scrollIntoView({behavior:'smooth'})},250)};
}
function photosCard(){
  return `<div class="card stack"><h3>📸 Body tracking</h3>
    <p class="small muted">Progress photos and body measurements (weight, waist). Photos stay <b>only on this phone</b> and are never uploaded or synced. Measurements sync with your other devices if sync is on.</p>
    <div class="seg" id="phon"><button class="${profile.photos?'':'on'}" data-ph="0">Off</button><button class="${profile.photos?'on':''}" data-ph="1">On</button></div>
    ${profile.photos?`<p class="small muted">💡 On iPhone, add this app to your Home Screen (Share → Add to Home Screen) so your photos are kept safely. Save copies of photos you want to keep forever.</p>`:''}</div>`;
}
