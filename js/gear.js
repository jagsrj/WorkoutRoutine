/* KinFit · "My equipment": shows each exercise the way it's done with the equipment you have
   (e.g. leg press on a Smith machine plate, lat pulldown on a functional trainer),
   plus "use my own video" links for any exercise. */
const GEAR=[
  ['db','🏋️','Dumbbells'],
  ['cable','🔗','Functional trainer / cable pulleys'],
  ['smith','🏗️','Smith machine'],
  ['smithlp','🦵','Leg press plate on the Smith machine'],
  ['barbell','➖','Barbell and plates (free bar)'],
  ['ez','〰️','EZ curl bar'],
  ['bench','🛋️','Adjustable bench'],
  ['pullbar','🧗','Pull-up bar'],
  ['machines','🏢','Gym machines (leg press, leg extension, lat pulldown…)'],
];
const GEAR_PRESETS={
  ironax:{n:'🏠 Ironax home gym',d:'Functional trainer, Smith machine with leg press plate, dumbbells, EZ bar, bench, pull-up bar',g:['db','cable','smith','smithlp','ez','bench','pullbar']},
  dbonly:{n:'🏋️ Dumbbells only',d:'Dumbbells and a bench',g:['db','bench']},
};
// Equipment the normal version of each exercise needs (any one of them is enough).
const GEAR_REQ={
  leg_press:['machines'],leg_extension:['machines'],lat_pulldown:['machines'],cable_row:['machines'],calf_raise:['machines'],
  tricep_pushdown:['machines','cable'],face_pull:['machines','cable'],
  bench_press:['barbell'],incline_bench:['barbell'],back_squat:['barbell'],ohp:['barbell'],rdl:['barbell'],barbell_row:['barbell'],
  barbell_curl:['barbell'],deadlift:['barbell'],front_squat:['barbell'],close_grip_bench:['barbell'],pendlay_row:['barbell'],
  push_press:['barbell'],sumo_deadlift:['barbell'],barbell_hip_thrust:['barbell'],
  pullup:['pullbar','machines'],chin_up:['pullbar','machines'],weighted_pullup:['pullbar'],
};
const SMITH_SAFE='Set the safety stoppers first so the bar can never come down on you.';
// Other ways to do the exercise, tried in order. {use:'id'} borrows another exercise's steps.
const GEAR_VARIANTS={
  leg_press:[{need:['smith','smithlp'],name:'Leg Press (Smith machine plate)',q:'smith machine leg press attachment',
    steps:[SMITH_SAFE+' Put them just above where the plate should stop at the bottom.','Lie on your back on the floor or a flat bench under the bar, hips under the plate.','Put your feet flat on the plate, shoulder-width apart. Push up and twist the bar to unhook it.','Slowly bend your knees toward your chest until they are about 90°.','Push through your heels back up. Don\'t lock your knees. Twist the bar to hook it when you finish.'],
    tip:'Keep your lower back flat. The bar and plate already weigh something, so start light.'},
    {need:['db'],use:'goblet_squat'}],
  leg_extension:[{need:['cable','bench'],name:'Cable Leg Extension',per:'each leg',q:'cable leg extension ankle strap',
    steps:['Put an ankle strap on a low pulley. Sit on a bench facing away from the machine.','Strap one ankle and hold the sides of the bench.','Straighten your leg until it\'s almost straight and squeeze your thigh.','Lower slowly. Do all the reps, then switch legs.'],tip:'Go slowly: no swinging.'}],
  lat_pulldown:[{need:['cable'],name:'Lat Pulldown (functional trainer)',q:'functional trainer lat pulldown',
    steps:['Put both pulleys at the top. Clip on a long bar, or use two handles.','Kneel, or sit on a bench, between the towers. Grab wide.','Pull down to your upper chest, squeezing your shoulder blades together.','Let it go back up slowly until your arms are straight.'],tip:'Chest up and don\'t lean back too far.'},
    {need:['pullbar'],use:'pullup'}],
  cable_row:[{need:['cable'],name:'Seated Row (functional trainer)',q:'functional trainer seated cable row',
    steps:['Put the pulleys at the bottom and clip on a handle or two.','Sit on a bench or the floor facing the machine, knees slightly bent.','Pull the handles to your belly button, squeezing your shoulder blades together.','Let your arms go straight again slowly.'],tip:'Sit tall: don\'t rock back and forth.'},
    {need:['db','bench'],use:'db_row'}],
  calf_raise:[{need:['smith'],name:'Smith Machine Calf Raise',q:'smith machine calf raise',
    steps:[SMITH_SAFE,'Stand under the bar on your toes (on a plate or step if you have one). Unhook it.','Rise up onto your tiptoes as high as you can.','Lower your heels slowly all the way down.'],tip:'Pause for one second at the top.'},
    {need:['db'],name:'Dumbbell Calf Raise',q:'dumbbell calf raise',steps:['Hold a dumbbell in each hand. Stand on a step with heels hanging off.','Rise onto your tiptoes as high as you can.','Lower your heels slowly below the step.'],tip:'Hold a wall with one hand for balance if needed.'}],
  bench_press:[{need:['smith','bench'],name:'Bench Press (Smith machine)',q:'smith machine bench press',
    steps:[SMITH_SAFE+' Put them just above your chest.','Lie on the bench so the bar is over the middle of your chest. Grab it a bit wider than your shoulders.','Twist to unhook, lower slowly to your chest.','Press up until your arms are straight. Twist to hook when done.'],tip:'Feet flat, shoulder blades pinched together.'},
    {need:['db','bench'],use:'db_bench'},{need:['cable','bench'],name:'Cable Chest Press',q:'functional trainer cable chest press',
    steps:['Put both pulleys at chest height. Stand in the middle, one handle in each hand.','Step forward so the cables are tight. Hands next to your chest.','Press forward until your arms are straight.','Come back slowly.'],tip:'Keep your core tight.'}],
  incline_bench:[{need:['smith','bench'],name:'Incline Press (Smith machine)',q:'smith machine incline bench press',
    steps:[SMITH_SAFE,'Set the bench to a low incline under the bar.','Grab the bar a bit wider than your shoulders and twist to unhook.','Lower to your upper chest, then press up.'],tip:'A low incline (about 30°) works the upper chest best.'},
    {need:['db','bench'],use:'incline_db_press'}],
  back_squat:[{need:['smith'],name:'Squat (Smith machine)',q:'smith machine squat proper form',
    steps:[SMITH_SAFE+' Put them just below where you\'ll squat to.','Step under the bar so it rests on your upper back. Feet slightly in front of you.','Twist to unhook. Sit down and back until thighs are about level with the floor.','Push through your whole foot to stand up.'],tip:'Knees follow your toes.'},
    {need:['db'],use:'goblet_squat'}],
  front_squat:[{need:['smith'],use:'back_squat'},{need:['db'],use:'goblet_squat'}],
  ohp:[{need:['smith','bench'],name:'Seated Shoulder Press (Smith machine)',q:'smith machine seated shoulder press',
    steps:[SMITH_SAFE,'Set the bench upright under the bar. Sit tall.','Grab the bar just wider than your shoulders and twist to unhook.','Press up until your arms are straight, then lower to chin height.'],tip:'Don\'t arch your back.'},
    {need:['db'],use:'db_press'}],
  push_press:[{need:['db'],use:'db_press'}],
  rdl:[{need:['smith'],name:'Romanian Deadlift (Smith machine)',q:'smith machine romanian deadlift',
    steps:[SMITH_SAFE,'Stand holding the bar at your thighs, hands just outside your legs.','Push your hips back and slide the bar down your legs, back flat.','Stop when you feel a stretch in your hamstrings, then stand up.'],tip:'Soft knees, flat back.'},
    {need:['db'],use:'db_rdl'}],
  deadlift:[{need:['smith'],use:'rdl'},{need:['db'],use:'db_rdl'}],
  sumo_deadlift:[{need:['db'],use:'db_rdl'}],
  barbell_row:[{need:['smith'],name:'Bent-Over Row (Smith machine)',q:'smith machine bent over row',
    steps:[SMITH_SAFE,'Set the bar at knee height. Hinge forward with a flat back and grab it.','Pull the bar to your belly, squeezing your shoulder blades.','Lower slowly.'],tip:'Keep your back flat the whole time.'},
    {need:['db','bench'],use:'db_row'}],
  pendlay_row:[{need:['smith'],use:'barbell_row'},{need:['db','bench'],use:'db_row'}],
  barbell_curl:[{need:['ez'],name:'EZ Bar Curls',q:'ez bar curl',
    steps:['Stand tall holding the EZ bar on the angled grips, palms up.','Curl it up, keeping your elbows by your sides.','Lower slowly.'],tip:'No swinging.'},
    {need:['cable'],name:'Cable Curls',q:'functional trainer cable bicep curl',steps:['Put a pulley at the bottom with a bar or handle.','Stand facing the machine, palms up.','Curl up, elbows by your sides, then lower slowly.'],tip:'Squeeze at the top.'},
    {need:['db'],use:'db_curl'}],
  close_grip_bench:[{need:['smith','bench'],use:'bench_press'},{need:['db','bench'],use:'skull_crusher'}],
  barbell_hip_thrust:[{need:['smith','bench'],name:'Hip Thrust (Smith machine)',q:'smith machine hip thrust',
    steps:[SMITH_SAFE,'Sit with your upper back against the bench, bar over your hips (use a pad).','Twist to unhook and drive your hips up until your body is flat like a table.','Lower slowly.'],tip:'Chin tucked, squeeze your glutes at the top.'},{need:['db','bench'],use:'hip_thrust'}],
  pullup:[{need:['cable'],use:'lat_pulldown'}],
  chin_up:[{need:['cable'],use:'lat_pulldown'}],
  weighted_pullup:[{need:['pullbar'],use:'pullup'},{need:['cable'],use:'lat_pulldown'}],
};
const BASE_EX={};
const gearOn=()=>Array.isArray(profile.gear);
const hasGear=k=>!gearOn()||profile.gear.includes(k)||(k!=='machines'&&profile.gear.includes('machines')&&['cable'].includes(k));
// Works out how this person should do exercise id, following {use} links (at most a few hops).
function gearVersion(id,depth=0){
  const base=BASE_EX[id]||EX[id];if(!base||depth>3)return null;
  const req=GEAR_REQ[id];
  if(!req||req.some(hasGear))return depth?{from:id,ex:base}:null;
  for(const v of GEAR_VARIANTS[id]||[]){
    if(!v.need.every(hasGear))continue;
    if(v.use){const r=gearVersion(v.use,depth+1);if(r)return r;continue}
    return {from:id,ex:Object.assign({},base,{name:v.name,steps:v.steps,tip:v.tip||base.tip,q:v.q,per:v.per||base.per,bar:false,start:base.start})};
  }
  return depth?null:{missing:req};
}
// Rebuilds EX for the current person. Called on every render, so switching person or equipment just works.
function applyGear(){
  Object.keys(GEAR_REQ).forEach(id=>{if(!EX[id])return;if(!BASE_EX[id])BASE_EX[id]=EX[id];
    const r=gearVersion(id);
    if(!r)EX[id]=BASE_EX[id];
    else if(r.missing)EX[id]=Object.assign({},BASE_EX[id],{needs:r.missing});
    else EX[id]=Object.assign({},BASE_EX[id],r.ex,{e:r.ex.e||BASE_EX[id].e,m:r.ex.m||BASE_EX[id].m,variantOf:BASE_EX[id].name,figId:r.from!==id?r.from:null});
  });
  // Your own video links win over the search.
  Object.keys(EX).forEach(id=>{const ex=EX[id];if(!ex||typeof ex!=='object')return;
    const own=(profile.videos||{})[id];
    if(own){EX[id]=Object.assign({},ex,{video:'https://www.youtube.com/watch?v='+own,ownVideo:true})}
    else if(ex.ownVideo){const c=Object.assign({},ex);delete c.video;delete c.ownVideo;EX[id]=c}
    if(EX[id].q&&!EX[id].ownVideo)EX[id]=Object.assign({},EX[id],{video:YTS(EX[id].q)});
  });
}
const gearName=k=>{const g=GEAR.find(x=>x[0]===k);return g?g[2].toLowerCase():k};
function gearNote(ex){
  if(ex.needs)return `<p class="hint">⚠️ Needs ${ex.needs.map(gearName).join(' or ')}, which isn't in your equipment. Tap 🔄 Swap exercise, or change Me → My equipment.</p>`;
  if(ex.variantOf&&ex.variantOf!==ex.name)return `<p class="small muted">🏠 Your version of <b>${esc(ex.variantOf)}</b>, for your equipment.</p>`;
  return '';
}
// Accepts youtube.com/watch?v=, youtu.be/, /shorts/ and /embed/ links; keeps only the 11-character video id.
function ytId(url){
  try{const u=new URL(String(url).trim());if(u.protocol!=='https:'&&u.protocol!=='http:')return null;
    const h=u.hostname.replace(/^(www|m|music)\./,'');let id=null;
    if(h==='youtu.be')id=u.pathname.slice(1).split('/')[0];
    else if(h==='youtube.com'||h==='youtube-nocookie.com'){id=u.searchParams.get('v');if(!id){const m=u.pathname.match(/^\/(shorts|embed|live)\/([^/?#]+)/);if(m)id=m[2]}}
    return id&&/^[A-Za-z0-9_-]{11}$/.test(id)?id:null}catch(e){return null}
}
function videoSheet(id){
  const ex=EX[id],own=(profile.videos||{})[id];
  sheet(`<h2>🔗 Your video for ${esc(ex.name)}</h2>
    <p class="small muted">Find a video you like on YouTube, tap <b>Share → Copy link</b>, and paste it here. ▶ Watch will open it.</p>
    <input class="txt" id="vurl" type="url" inputmode="url" placeholder="https://youtu.be/…" value="${own?'https://youtu.be/'+own:''}" autocomplete="off" aria-label="YouTube link">
    <button class="btn" id="vsave">Save video</button>
    ${own?'<button class="btn danger" id="vdel">Remove my video</button>':''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#vsave').onclick=()=>{const v=ytId($('#vurl').value);if(!v){toast('That doesn\'t look like a YouTube link');return}
      profile.videos=Object.assign({},profile.videos,{[id]:v});saveProfile();closeLayer();render();toast('▶ Video saved');syncNow(true)};
    if($('#vdel'))$('#vdel').onclick=()=>{const o=Object.assign({},profile.videos);delete o[id];profile.videos=o;saveProfile();closeLayer();render();toast('Video removed');syncNow(true)};
  });
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-myvid]');if(b)videoSheet(b.dataset.myvid)});

function gearSummary(){
  if(!gearOn())return 'Full gym: every machine and bar.';
  const g=profile.gear;if(!g.length)return 'No equipment chosen.';
  return g.map(k=>{const x=GEAR.find(y=>y[0]===k);return x?x[1]:''}).join(' ')+' · '+g.length+' item'+(g.length===1?'':'s');
}
function gearCard(){
  return `<div class="card stack"><h2 class="h3">🏠 My equipment</h2><p class="small muted">${esc(gearSummary())}</p>
    <p class="small muted">Exercises change to match what you have, e.g. leg press on a Smith machine plate.</p>
    <button class="btn secondary" id="gearopen">Change equipment</button></div>`;
}
function gearSheet(){
  const sel=new Set(gearOn()?profile.gear:GEAR.map(g=>g[0]));let all=DB.list.length>1;
  const draw=()=>sheet(`<h2>🏠 My equipment</h2><p class="small muted">Tick what you have. Workouts show the right version of each exercise.</p>
    <div class="stack">${Object.entries(GEAR_PRESETS).map(([k,p])=>`<button class="who" data-gp="${k}" style="text-align:left"><span style="flex:1"><b>${p.n}</b><br><span class="small muted">${p.d}</span></span></button>`).join('')}
      <button class="who" data-gp="full" style="text-align:left"><span style="flex:1"><b>🏢 Full gym</b><br><span class="small muted">Everything (the normal plan)</span></span></button></div>
    <div class="stack">${GEAR.map(([k,e,n])=>`<label class="toggle"><span>${e} ${n}</span><input type="checkbox" data-gk="${k}" ${sel.has(k)?'checked':''}></label>`).join('')}</div>
    ${DB.list.length>1?`<label class="toggle"><span>Same for everyone on this phone</span><input type="checkbox" id="gall" ${all?'checked':''}></label>`:''}
    <button class="btn" id="gsave">Save</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-gk]').forEach(b=>b.onchange=()=>{b.checked?sel.add(b.dataset.gk):sel.delete(b.dataset.gk)});
    if($('#gall'))$('#gall').onchange=e=>{all=e.target.checked};
    document.querySelectorAll('[data-gp]').forEach(b=>b.onclick=()=>{sel.clear();(b.dataset.gp==='full'?GEAR.map(g=>g[0]):GEAR_PRESETS[b.dataset.gp].g).forEach(k=>sel.add(k));draw()});
    $('#gsave').onclick=()=>{
      const full=GEAR.every(g=>sel.has(g[0])),val=full?null:GEAR.map(g=>g[0]).filter(k=>sel.has(k));
      const setFor=p=>{if(val)p.gear=val;else delete p.gear};
      if(all)DB.list.forEach(p=>{if(p.id!==profile.id){setFor(p);p.updated=Date.now()}});
      setFor(profile);saveProfile();if(all)saveDB();
      // A workout already in progress keeps its exercises; only the instructions change.
      closeLayer();render();toast('🏠 Equipment saved');syncNow(true)};
  });
  draw();
}
document.addEventListener('click',e=>{if(e.target.closest('#gearopen'))gearSheet()});
