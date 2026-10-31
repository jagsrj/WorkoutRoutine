/* KinFit · Me / Settings screen and app start-up. */
/* ---------- Me / Settings ---------- */
function renderMe(v){
  const others=DB.list.filter(p=>p.id!==profile.id);
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg">
    <div class="row"><div class="ex-emoji" style="width:64px;height:64px;font-size:34px">${esc(profile.avatar||'🙂')}</div><div style="flex:1"><h1>${profile.name?esc(profile.name):'My profile'}</h1><p class="muted">${lvl().emoji} ${lvl().name} level</p></div></div>

    <div class="card stack"><h2 class="h3">👨‍👩‍👧 People on this phone</h2>
      <p class="small muted">Everyone gets their own level, workouts and badges.</p>
      <div class="stack">${DB.list.map(p=>`<button class="who ${p.id===profile.id?'sel':''}" data-pid="${p.id}"><span class="av">${esc(p.avatar||'🙂')}</span><span style="flex:1;text-align:left"><b>${esc(p.name||'No name')}</b><br><span class="small muted">${(LEVELS[p.level]||LEVELS.beginner).emoji} ${(LEVELS[p.level]||LEVELS.beginner).name}</span></span>${p.id===profile.id?'<b style="color:var(--lvl-text)">You ✓</b>':'<span class="small muted">Switch ›</span>'}</button>`).join('')}</div>
      <button class="btn secondary" id="addp">＋ Add a person</button>
    </div>

    <div class="card stack"><h2 class="h3">Name & buddy</h2><input class="txt" id="nm" maxlength="24" placeholder="Your name" value="${esc(profile.name)}">
      <div class="avatars">${AVATARS.map(a=>`<button class="${a===profile.avatar?'sel':''}" data-a="${a}">${a}</button>`).join('')}</div></div>

    <div class="stack"><div class="row between"><h2 class="h3">Your level</h2><button class="link" id="quiz">🧭 Retake the quiz</button></div>
      ${Object.keys(LEVELS).map(k=>`<button class="lvl ${k===profile.level?'sel':''}" data-l="${k}" style="--c:${LEVELS[k].color};--cd:${LEVELS[k].dark}">${levelInner(k)}<p class="small" style="margin-top:8px;font-weight:800;color:var(--cc,var(--c))">${k===profile.level?'✓ Your current level':'Tap to switch'}</p></button>`).join('')}
    </div>

    <div class="card stack"><h2 class="h3">Settings</h2>
      <p class="small muted" style="font-weight:700">WEIGHT UNITS</p><div class="seg" id="unit">${['lbs','kg'].map(u=>`<button class="${profile.unit===u?'on':''}" data-u="${u}">${u}</button>`).join('')}</div>
      <p class="small muted" style="font-weight:700">REST BETWEEN SETS</p><div class="seg" id="rest">${[['auto','Auto'],['45','45s'],['60','60s'],['90','90s'],['120','2m']].map(r=>`<button class="${String(profile.rest)===r[0]?'on':''}" data-r="${r[0]}">${r[1]}</button>`).join('')}</div>
      <p class="small muted">Auto = ${lvl().rest}s for ${lvl().name}.</p>
      <p class="small muted" style="font-weight:700">VOICE COACH</p><div class="seg">${[['0','🔇 Off'],['1','🔊 On']].map(x=>`<button class="${(voiceOn?'1':'0')===x[0]?'on':''}" data-voice="${x[0]}">${x[1]}</button>`).join('')}</div>
      <p class="small muted">Reads out exercises, rest time and countdowns during workouts.</p>
    </div>

    ${displayCard()}

    ${gearCard()}
    ${planCard()}

    ${syncCard()}

    ${photosCard()}

    ${remindersCard()}

    ${parentCard()}

    ${feedbackCard()}

    <details class="card how" style="padding:4px 18px"><summary>📖 How this plan works</summary>
      <p style="margin:4px 0 10px"><b>The week:</b> Mon Upper A · Tue Lower A · Wed active rest · Thu Upper B · Fri Lower B · Sat bonus · Sun rest.</p>
      <p style="margin-bottom:10px"><b>Getting stronger (double progression):</b></p>
      <ol><li>Each exercise has a rep range, like 8–12.</li><li>Use a weight (or version) you can do for the low number with good form.</li><li>Each workout, try for a few more reps.</li><li>When you hit the top number on every set, make it harder: add ${profile.unit==='kg'?'2.5 kg':'5 lbs'} or pick a harder version. The app tells you when!</li></ol>
      <p style="margin-bottom:10px"><b>Big picture (6 months):</b> Weeks 1–8 learn perfect form · Weeks 9–16 build muscle with more reps & weight · Weeks 17–24 push your strength.</p></details>
    <details class="card how" style="padding:4px 18px"><summary>🛡️ Safety first</summary><ol>
      <li>Warm up for 5 minutes before every workout. Use the guided warm-up!</li><li>Form first, weight second. If it looks wobbly, go lighter.</li>
      <li>Sore muscles the next day are normal. <b>Sharp pain is not</b>, so stop and tell an adult.</li>
      <li>Under 18? Lift weights with an adult or coach nearby. Under 13? Stick to Beginner bodyweight moves.</li>
      <li>Use a spotter or safety bars for bench press and squats.</li><li>Drink water, eat well, sleep lots. Rest days matter!</li>
      <li>Have a health condition or injury? Check with a doctor before starting.</li></ol></details>

    <div class="card stack"><h2 class="h3">${esc(profile.name||'Your')}${profile.name?"'s":''} data</h2><p class="small muted">Download a backup file to keep a copy, or to move to a phone without sync.</p>
      <button class="btn secondary" id="exp">⬇️ Download backup</button>
      <label class="btn secondary" style="cursor:pointer">⬆️ Restore from backup<input type="file" id="imp" accept="application/json,.json" hidden></label>
      ${others.length?`<button class="btn danger" id="rmp">Remove ${esc(profile.name||'this person')} from this phone</button>`:''}
      <button class="btn danger" id="reset">Erase everything on this phone</button></div>
    <p class="small muted center">KinFit · Made for every level 💙<br><a href="/about" class="footlink">About KinFit</a> · <a href="privacy.html" class="footlink">Privacy policy</a> · <a href="/workouts" class="footlink">Workout plans &amp; exercises</a></p>
  </div>`;
  v.querySelectorAll('[data-pid]').forEach(b=>b.onclick=()=>{if(b.dataset.pid!==profile.id)switchProfile(b.dataset.pid)});
  $('#addp').onclick=addPerson;
  $('#nm').onchange=e=>{profile.name=e.target.value.trim().slice(0,24);saveProfile();renderMe(v);toast('Saved')};
  v.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{profile.avatar=b.dataset.a;saveProfile();renderMe(v)});
  v.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>{const k=b.dataset.l;if(k===profile.level)return;
    requirePin(()=>confirmBox(`Switch to ${LEVELS[k].name}?`,'Your history stays. Your workouts will change to the new level.',`Switch to ${LEVELS[k].name} ${LEVELS[k].emoji}`,()=>{profile.level=k;saveProfile();store.del(pKey('jams_active'));libLevel=null;render();toast(`${LEVELS[k].emoji} Now on ${LEVELS[k].name}`)}),'A parent PIN is needed to change levels.')});
  $('#quiz').onclick=()=>requirePin(()=>{ob={step:2,answers:[],name:profile.name,avatar:profile.avatar,mode:'retake'};go('onboard')},'A parent PIN is needed to change levels.');
  v.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{profile.unit=b.dataset.u;saveProfile();renderMe(v)});
  v.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{profile.rest=b.dataset.r;saveProfile();renderMe(v)});
  $('#exp').onclick=exportBackup;
  $('#imp').onchange=importBackup;
  bindSync(v);
  v.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{store.set('jams_text',b.dataset.zoom);applyDisplay();renderMe(v)});
  v.querySelectorAll('[data-theme-set]').forEach(b=>b.onclick=()=>{store.set('jams_theme',b.dataset.themeSet);applyDisplay();renderMe(v)});
  $('#fbopen').onclick=feedbackSheet;
  $('#tourag').onclick=()=>{profile.toured=false;saveProfile();go('today')};
  $('#planreset').onclick=()=>requirePin(()=>confirmBox('Start the 6-month plan again?','You\'ll go back to Week 1 (Foundation). Your history and records stay.','Start again',()=>{profile.planStart=isoLocal();saveProfile();toast('📅 Week 1 starts now!');renderMe(v)}),'A parent PIN is needed to restart the plan.');
  v.querySelectorAll('#phon [data-ph]').forEach(b=>b.onclick=()=>{const on=b.dataset.ph==='1';if(on===!!profile.photos)return;requirePin(()=>{profile.photos=on;saveProfile();
    if(on){try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}toast('📸 Photos on! Find them in Progress')}else toast('Body tracking hidden. Your photos stay saved on this phone');renderMe(v)},'A parent PIN is needed to change body tracking.')});
  v.querySelectorAll('[data-voice]').forEach(b=>b.onclick=()=>{voiceOn=b.dataset.voice==='1';store.set('jams_voice',voiceOn);if(voiceOn)say('Voice coach on');renderMe(v)});
  bindReminders(v);
  v.querySelectorAll('[data-kidp]').forEach(b=>b.onclick=()=>{const on=b.dataset.kidp==='1';if(on===!!profile.kid)return;requirePin(()=>{if(on)profile.kid=true;else delete profile.kid;saveProfile();toast(on?'🧒 Child profile on':'Child profile off');renderMe(v)},'A parent PIN is needed to change this.')});
  $('#pinset').onclick=()=>requirePin(()=>pinSheet(()=>renderMe(v)),'Enter the current PIN to change it.');
  if($('#pinoff'))$('#pinoff').onclick=()=>requirePin(()=>{store.del('jams_pin');unlockedUntil=0;toast('Parent lock is off');renderMe(v)},'Enter the PIN to turn off the parent lock.');
  v.querySelectorAll('[data-cai]').forEach(b=>b.onclick=()=>{const on=b.dataset.cai==='1';if(on===(profile.coachAI!==false))return;requirePin(()=>{profile.coachAI=on;saveProfile();toast(on?'Coach AI answers on':'Coach AI answers off');renderMe(v)},'A parent PIN is needed to change Coach settings.')});
  if($('#rmp'))$('#rmp').onclick=()=>requirePin(()=>confirmBox(`Remove ${esc(profile.name||'this person')}?`,`Their workouts and badges will be deleted from this phone${syncCfg.code?' and from your synced devices':''}. Download a backup first if you want to keep them.`,'Remove',()=>{
    const p=profile;delPhotosFor(p.id).catch(()=>{});['workout_journal','jams_active','jams_chat','jams_tomb'].forEach(k=>store.del(pKey(k,p)));
    DB.list=DB.list.filter(x=>x.id!==p.id);DB.deleted.push(p.id);if(DB.legacyId===p.id)DB.legacyId=null;saveDB();
    switchProfile(DB.list[0].id);syncSoon()},true),'A parent PIN is needed to remove a person.');
  $('#reset').onclick=()=>requirePin(()=>confirmBox('Erase everything?','All people, workouts and settings on this phone will be deleted. Synced copies stay in the cloud.','Erase all',()=>{
    clearPhotos();DB.list.forEach(p=>['workout_journal','jams_active','jams_chat','jams_tomb'].forEach(k=>store.del(pKey(k,p))));
    ['workout_journal','jams_active','jams_chat','jams_profile','jams_profiles','jams_sync','jams_tomb','jams_pin','jams_remind','jams_voice','jams_bar'].forEach(k=>store.del(k));unlockedUntil=0;
    DB={current:null,list:[],deleted:[]};profile=Object.assign({},DEFAULT_P);syncCfg={code:null,last:0};chat=[];ob={step:0,answers:[],name:'',avatar:'🙂'};go('today')},true),'A parent PIN is needed to erase everything.');
}
function syncCard(){
  if(!syncCfg.code)return `<div class="card stack"><h2 class="h3">☁️ Backup & sync is off</h2>
    <p class="small muted">Turn it on so clearing your browser or losing your phone never wipes your workouts. It also lets you use the app on more than one device. No account needed, just a private recovery code.</p>
    <button class="btn secondary" id="syncon">Turn on backup & sync</button>
    <button class="link" id="syncjoin">I have a recovery code</button></div>`;
  const ago=syncCfg.last?Math.round((Date.now()-syncCfg.last)/60000):null;
  return `<div class="card stack"><h2 class="h3">☁️ Backup & sync is on</h2>
    <p class="small muted">Your recovery code. Use it to get everything back after clearing your browser, or to connect another device:</p>
    <div class="code">${syncCfg.code}</div>
    ${syncCfg.saved?'<p class="small" style="color:var(--ok);font-weight:700">✅ Saved to your passwords</p>':''}
    <button class="btn" id="savecode">🔑 ${syncCfg.saved?'Save it again':'Save to my passwords'}</button>
    <p class="small muted">🔒 Keep it private. Anyone with this code can see and change this data.</p>
    <button class="btn secondary" id="syncnow">🔄 Sync now</button>
    <p class="small muted center">${ago===null?'Not synced yet':ago<1?'Last synced just now':`Last synced ${ago<60?ago+' min':Math.round(ago/60)+' h'} ago`}</p>
    <button class="link" id="syncoff" style="padding:0;color:var(--muted)">Turn off sync on this device</button>
    <button class="link" id="synchist" style="padding:0">🕘 Restore an earlier backup</button>
    <button class="link" id="syncdel" style="padding:0;color:var(--bad)">Delete the cloud copy</button></div>`;
}
function bindSync(v){
  if($('#syncon'))$('#syncon').onclick=()=>requirePin(async()=>{syncCfg={code:newSyncCode(),last:0};saveSync();const ok=await syncNow(false);if(!ok){syncCfg={code:null,last:0};saveSync()}renderMe(v);if(ok)saveCodeSheet()},'A parent PIN is needed to change sync.');
  if($('#syncjoin'))$('#syncjoin').onclick=()=>requirePin(()=>joinSheet(()=>renderMe(v)),'A parent PIN is needed to change sync.');
  if($('#syncdel'))$('#syncdel').onclick=()=>requirePin(()=>confirmBox('Delete the cloud copy?','Everyone\'s synced data will be deleted from the cloud and sync turns off. Data on this phone stays. Other devices keep their own copy until you erase them.','Delete cloud copy',async()=>{
    try{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'delete'})});if(!r.ok)throw 0;syncCfg={code:null,last:0};saveSync();toast('☁️ Cloud copy deleted');renderMe(v)}catch(e){toast("Couldn't delete. Check your internet")}},true),'A parent PIN is needed to change sync.');
  if($('#savecode'))$('#savecode').onclick=saveCodeSheet;
  if($('#synchist'))$('#synchist').onclick=()=>requirePin(restoreHistorySheet,'A parent PIN is needed to restore a backup.');
  if($('#syncnow'))$('#syncnow').onclick=async()=>{await syncNow(false);if(route==='me')renderMe(v)};
  if($('#syncoff'))$('#syncoff').onclick=()=>requirePin(()=>confirmBox('Turn off sync?','Your data stays on this phone and in the cloud. You can turn sync back on with the same code later.','Turn off',()=>{syncCfg={code:null,last:0};saveSync();renderMe(v)}),'A parent PIN is needed to change sync.');
}
function joinSheet(after){
  sheet(`<h2>Restore with your recovery code 🔑</h2><p class="muted small">If you saved it to your passwords, tap the code box and pick it from the bar above the keyboard. You can also find it on another device under <b>Me → Backup & sync</b>.</p>
    <form id="jf" class="stack" autocomplete="on">
      <input class="txt small-in" name="username" autocomplete="username" value="${KC_USER}" aria-label="Account name">
      <div class="row" style="gap:8px"><input class="txt" id="sc" name="password" type="password" autocomplete="current-password" placeholder="XXXX-XXXX-XXXX-XXXX" autocapitalize="characters" style="font-family:ui-monospace,monospace;letter-spacing:.06em;flex:1"><button type="button" class="btn sm ghost" id="scshow" aria-label="Show code">👁</button></div>
      ${window.PasswordCredential?'<button type="button" class="btn secondary" id="kcget">🔑 Use my saved code</button>':''}
      <button class="btn" id="join" type="submit">Restore</button></form>
    <button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#scshow').onclick=()=>{const i=$('#sc');i.type=i.type==='password'?'text':'password'};
    if($('#kcget'))$('#kcget').onclick=async()=>{try{const c=await navigator.credentials.get({password:true,mediation:'optional'});if(c&&c.password)$('#sc').value=c.password;else toast('No saved code found')}catch(e){toast('No saved code found')}};
    $('#jf').onsubmit=async e=>{
      e.preventDefault();
      let c=$('#sc').value.toUpperCase().replace(/[^A-Z0-9]/g,'');
      if(c.length!==16){toast('The code has 16 letters and numbers');return}
      c=c.match(/.{4}/g).join('-');const prev=syncCfg;syncCfg={code:c,last:0,saved:true};saveSync();
      $('#join').disabled=true;$('#join').textContent='Restoring…';
      const ok=await syncNow(false);
      if(!ok){syncCfg=prev;saveSync();$('#join').disabled=false;$('#join').textContent='Restore';return}
      closeLayer();toast('☁️ Everything is back!');if(after)after();else render();
    };
  });
}
const KC_USER='KinFit';
function saveCodeSheet(){
  if(!syncCfg.code)return;
  sheet(`<h2>🔑 Save your recovery code</h2>
    <p class="muted">This code brings back <b>everyone's</b> workouts if this browser is cleared or you get a new phone. Save it in your phone's passwords so you never lose it.</p>
    <div class="code">${syncCfg.code}</div>
    <form id="kc" method="post" action="api/saved" autocomplete="on" class="stack">
      <input class="txt small-in" name="username" autocomplete="username" value="${KC_USER}" aria-label="Account name">
      <input class="txt small-in" name="password" type="password" autocomplete="new-password" value="${syncCfg.code}" aria-label="Recovery code">
      <button class="btn" type="submit">🔑 Save to my passwords</button></form>
    <p class="small muted">When your phone asks <b>"Save password?"</b>, tap <b>Save</b>. It will be saved as "${KC_USER}".</p>
    <div class="row" style="gap:8px"><button class="btn sm secondary" id="kcopy" style="flex:1">📋 Copy code</button><button class="btn sm ghost" id="kdone" style="flex:1">I saved it</button></div>
    <button class="link" id="klater" style="color:var(--muted)">Later</button>`,()=>{
    const mark=()=>{syncCfg.saved=true;saveSync()};
    $('#kc').onsubmit=async e=>{
      mark();
      if(window.PasswordCredential){e.preventDefault();
        try{await navigator.credentials.store(new PasswordCredential({id:KC_USER,password:syncCfg.code,name:KC_USER}))}catch(err){}
        closeLayer();toast('🔑 Saved to your passwords');render()}
      // Otherwise (Safari) the form really submits, which is what makes the phone offer to save it.
    };
    $('#kcopy').onclick=async()=>{try{await navigator.clipboard.writeText(syncCfg.code);toast('📋 Copied. Paste it somewhere safe, like Notes')}catch(e){toast('Copy not available. Write it down instead')}};
    $('#kdone').onclick=()=>{mark();closeLayer();toast('👍 Great!');render()};
    $('#klater').onclick=()=>{syncCfg.snooze=Date.now()+3*864e5;saveSync();closeLayer();render()};
  });
}
async function autoBackup(){
  syncCfg={code:newSyncCode(),last:0,auto:true};saveSync();
  const ok=await syncNow(true);
  if(!ok){syncCfg={code:null,last:0};saveSync();return}
  if(route==='today'&&!$('#layer').innerHTML)render();
}
function backupCard(){
  if(syncCfg.snooze&&Date.now()<syncCfg.snooze)return '';
  if(!syncCfg.code)return `<div class="card stack backup"><div class="row"><span class="big-emoji">☁️</span><div style="flex:1"><b>Protect your workouts</b><p class="small muted">Turn on backup so clearing your browser or losing your phone never wipes your progress.</p></div></div>
    <div class="row" style="gap:8px"><button class="btn sm" id="bkon" style="flex:1">Turn on backup</button><button class="btn sm ghost" id="bklater">Later</button></div></div>`;
  if(!syncCfg.saved)return `<div class="card stack backup"><div class="row"><span class="big-emoji">🔑</span><div style="flex:1"><b>Save your recovery code</b><p class="small muted">Your workouts are backed up. Save the code so you can get them back on any device.</p></div></div>
    <div class="row" style="gap:8px"><button class="btn sm" id="bksave" style="flex:1">Save code</button><button class="btn sm ghost" id="bklater">Later</button></div></div>`;
  return '';
}
// Creates a recovery code, backs everything up, then shows the code to save.
function turnOnBackup(){requirePin(async()=>{syncCfg={code:newSyncCode(),last:0};saveSync();const ok=await syncNow(false);if(!ok){syncCfg={code:null,last:0};saveSync();render();return}render();saveCodeSheet()},'A parent PIN is needed to turn on backup.')}
// Shown on the "workout done" screen until backup is on and the code is saved: the best moment to ask.
function backupNudge(){
  if(!syncCfg.code)return `<div class="card stack backup" style="text-align:left"><p><b>☁️ Back up this workout so it's never lost</b></p><p class="small muted">If the browser is cleared or the phone is lost, your workouts come back with a recovery code. Free, no sign-up.</p><button class="btn sm" id="cbk" style="width:100%">Turn on backup</button></div>`;
  if(!syncCfg.saved)return `<div class="card stack backup" style="text-align:left"><p><b>🔑 Save your recovery code</b></p><p class="small muted">Your workouts are backed up. Save the code so you can get them back on any device.</p><button class="btn sm" id="cbk" style="width:100%">Save code</button></div>`;
  return '';
}
function bindBackupNudge(){const b=$('#cbk');if(b)b.onclick=()=>{const save=!!syncCfg.code;closeLayer();go('progress');if(save)saveCodeSheet();else turnOnBackup()}}
/* ---------- "Add to Home Screen" reminder ----------
   Android/Chrome: the browser's own install prompt. iPhone/iPad: step-by-step instructions (Safari has no prompt).
   Hidden once the app is opened from the Home Screen, after "I did it", or for 7 days after "Later". */
let installEvt=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvt=e;if(route==='today'&&!$('#layer').innerHTML)render()});
addEventListener('appinstalled',()=>{installEvt=null;store.set('jams_home',{done:true});if(route==='today')render()});
const isStandalone=()=>{try{return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){return false}};
const isIOS=()=>/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const isAndroid=()=>/Android/.test(navigator.userAgent);
function installCard(){
  const h=store.get('jams_home',{});
  if(isStandalone()||h.done||(h.snooze&&Date.now()<h.snooze))return '';
  const head=`<div class="card stack backup" id="hscard"><div class="row"><span class="big-emoji">📲</span><div style="flex:1"><b>Put KinFit on your Home Screen</b><p class="small muted">Open it in one tap like a real app, full screen, even with no internet.${isIOS()?' On iPhone it also helps keep your workouts saved.':''}</p></div></div>`;
  const later=`<button class="btn sm ghost" id="hslater">Later</button>`;
  if(installEvt)return `${head}<div class="row" style="gap:8px"><button class="btn sm" id="hsadd" style="flex:1">Add to Home Screen</button>${later}</div></div>`;
  const steps=isIOS()?['Open this page in <b>Safari</b> (if you came from WhatsApp, Messages or Instagram, tap <b>Open in Safari</b> first).','Tap the <b>Share</b> button <span aria-hidden="true">⬆️</span> (a square with an arrow).','Scroll down and tap <b>Add to Home Screen</b>, then <b>Add</b>.']
    :isAndroid()?['Tap the <b>⋮</b> menu at the top right of Chrome.','Tap <b>Add to Home screen</b> or <b>Install app</b>.','Tap <b>Add</b> or <b>Install</b>.']:null;
  if(!steps)return '';
  return `${head}<ol class="small hssteps">${steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="row" style="gap:8px"><button class="btn sm" id="hsdone" style="flex:1">I did it ✅</button>${later}</div></div>`;
}
function bindInstall(){
  if($('#hsadd'))$('#hsadd').onclick=async()=>{const e=installEvt;if(!e)return;e.prompt();try{const c=await e.userChoice;if(c&&c.outcome==='accepted')store.set('jams_home',{done:true})}catch(x){}installEvt=null;render()};
  if($('#hsdone'))$('#hsdone').onclick=()=>{store.set('jams_home',{done:true});render();toast('📲 Great! Open KinFit from your Home Screen next time')};
  if($('#hslater'))$('#hslater').onclick=()=>{store.set('jams_home',{snooze:Date.now()+7*864e5});render()};
}
function bindBackup(){
  if($('#bkon'))$('#bkon').onclick=turnOnBackup;
  if($('#bksave'))$('#bksave').onclick=saveCodeSheet;
  if($('#bklater'))$('#bklater').onclick=()=>{syncCfg.snooze=Date.now()+3*864e5;saveSync();render()};
}
function exportBackup(){
  const data={app:'jams-fitness',version:3,exported:new Date().toISOString(),profile,journal:getJournal()};
  const blob=new Blob([JSON.stringify(data,null,1)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`kinfit_${(profile.name||'backup').replace(/[^a-z0-9]+/gi,'_')}_${isoLocal()}.json`;document.body.appendChild(a);a.click();a.remove();
  toast('Backup downloaded');
}
function importBackup(e){
  const f=e.target.files[0];if(!f)return;const r=new FileReader();
  r.onload=()=>{try{
    const d=JSON.parse(r.result);const incoming=d&&d.journal?d.journal:d; // supports older backups too
    if(!incoming||typeof incoming!=='object'||Array.isArray(incoming))throw 0;
    const j=getJournal();let added=0;
    Object.keys(incoming).forEach(k=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(k)||!Array.isArray(incoming[k]))return;
      const have=new Set((j[k]||[]).map(x=>String(x.id)));
      incoming[k].forEach(en=>{if(en&&typeof en.exercise==='string'&&Array.isArray(en.sets)&&!have.has(String(en.id))){(j[k]=j[k]||[]).push(en);added++}})});
    setJournal(j);toast(`Restored ${added} entries ✅`);syncSoon();
  }catch(err){toast('That file is not a KinFit backup')}};
  r.readAsText(f);
}

/* ---------- Start ---------- */
applyDisplay();
if(/[?&]saved=1/.test(location.search)){syncCfg.saved=true;saveSync();history.replaceState(null,'',location.pathname);setTimeout(()=>toast('🔑 Recovery code saved. You\'re protected!'),300)}
render();
if(syncCfg.code)syncNow(true).then(ok=>{if(ok&&route!=='workout'&&!runner&&!$('#layer').innerHTML)render()});
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

function planCard(){
  const info=phaseInfo();
  return `<div class="card stack"><h2 class="h3">📅 Your 6-month plan</h2>
    <p class="small muted">${info?(info.done?'Finished! 🎓 Start a new round whenever you like.':`Week ${info.w} of 24 · ${info.ph.e} ${info.ph.name}${info.recovery?' (recovery week)':''}`):'Starts with your first workout.'}</p>
    <ol class="small" style="margin:0;padding-left:20px"><li><b>Weeks 1–8 Foundation:</b> learn perfect form.</li><li><b>Weeks 9–16 Build:</b> an extra set to build muscle.</li><li><b>Weeks 17–24 Strength:</b> heavier, fewer reps.</li><li>Every 4th week is a lighter <b>recovery week</b>.</li></ol>
    <div class="row" style="gap:8px"><button class="btn sm secondary" id="planreset" style="flex:1">Start again</button><button class="btn sm ghost" id="tourag" style="flex:1">Show me around</button></div></div>`;
}
