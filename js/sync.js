/* JAMS Fitness · Backup & sync between devices. */
/* ---------- Cloud sync (optional) ----------
   A private sync code links devices. Data is merged, never overwritten. */
let syncCfg=store.get('jams_sync',{code:null,last:0});
const saveSync=()=>store.set('jams_sync',syncCfg);
function newSyncCode(){const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789',b=new Uint8Array(16);crypto.getRandomValues(b);let s='';b.forEach((x,i)=>{s+=A[x%A.length];if(i%4===3&&i<15)s+='-'});return s}
function localPayload(){
  const data={};DB.list.forEach(p=>{data[p.id]={journal:getJournal(p),tomb:getTomb(p)}});
  return {v:1,profiles:DB.list,deletedProfiles:DB.deleted,data};
}
function mergePayload(L,R){
  if(!R||!Array.isArray(R.profiles))return L;
  const deleted=[...new Set([...(L.deletedProfiles||[]),...(R.deletedProfiles||[])])];
  const byId={};[...R.profiles,...L.profiles].forEach(p=>{if(!p||!p.id||deleted.includes(p.id))return;const o=byId[p.id];if(!o||(p.updated||0)>=(o.updated||0))byId[p.id]=p});
  const data={};
  Object.keys(byId).forEach(id=>{
    const l=(L.data||{})[id]||{},r=(R.data||{})[id]||{};
    const tomb=[...new Set([...(l.tomb||[]),...(r.tomb||[])].map(String))].slice(-2000),dead=new Set(tomb);
    const jr=okJournal(r.journal),jl=okJournal(l.journal),out={};
    new Set([...Object.keys(jr),...Object.keys(jl)]).forEach(d=>{
      if(!/^\d{4}-\d{2}-\d{2}$/.test(d))return;const m={};
      [...(Array.isArray(jr[d])?jr[d]:[]),...(Array.isArray(jl[d])?jl[d]:[])].forEach(e=>{if(!e||dead.has(String(e.id)))return;const o=m[e.id];if(!o||(e.u||0)>=(o.u||0))m[e.id]=e});
      const list=Object.values(m).sort((a,b)=>a.id-b.id);if(list.length)out[d]=list});
    data[id]={journal:out,tomb};
  });
  return {v:1,profiles:Object.values(byId),deletedProfiles:deleted,data};
}
function applyPayload(P){
  DB.list=P.profiles.map(sanitizeProfile).filter(Boolean).slice(0,20).map(p=>Object.assign({},DEFAULT_P,p));DB.deleted=(P.deletedProfiles||[]).map(x=>cleanText(x,48));
  DB.list.forEach(p=>{const d=P.data[p.id]||{};setJournal(d.journal||{},p);store.set(pKey('jams_tomb',p),d.tomb||[])});
  if(!DB.list.some(p=>p.id===DB.current))DB.current=DB.list[0]?DB.list[0].id:null;
  saveDB();
  const cur=DB.list.find(p=>p.id===DB.current);profile=Object.assign({},DEFAULT_P,cur||{});
}
let syncing=false;
async function syncNow(silent){
  if(!syncCfg.code||syncing)return false;syncing=true;
  try{
    const call=async body=>{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'failed');return d};
    const remote=await call({code:syncCfg.code,op:'get'});
    const merged=mergePayload(localPayload(),remote.data);
    await call({code:syncCfg.code,op:'put',data:merged});
    applyPayload(merged);syncCfg.last=Date.now();saveSync();
    if(!silent){toast('☁️ Synced!');render()}
    return true;
  }catch(e){
    if(!silent)toast(e.message==='not_configured'?'Sync isn\'t switched on for this website yet':e.message==='rate_limited'?'Too many syncs. Try again in a bit':'Couldn\'t reach the backup. Check your internet');
    return false;
  }finally{syncing=false}
}
