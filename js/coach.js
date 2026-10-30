/* JAMS Fitness · Ask Coach chat. */
/* ---------- Coach chat ---------- */
// Built-in answers: instant, free, work offline. [keywords, answer]. Multi-word keywords count double.
const FAQ = [
  [['level','which level','choose','pick','beginner','intermediate','expert','too easy','too hard'],
   ()=>`You're on **${lvl().name}** ${lvl().emoji}. Quick guide:\n- 🌱 **Beginner**: new to exercise, fewer than 6 push-ups, or under 13.\n- 🔥 **Intermediate**: you've trained for 2–3 months and know dumbbells and machines.\n- 🏆 **Expert**: 6+ months of steady training and you know barbell lifts (adults, or teens with a coach).\nNot sure? Take the quiz in the **Me** tab 🧭`],
  [['sore','soreness','ache','achy','stiff'],
   ()=>`Feeling sore 1–2 days after a workout is normal 👍 It means your muscles are adapting.\n- Go for a walk, stretch gently, drink water and sleep well.\n- Soreness should fade in 2–3 days.\n- **Sharp pain is different.** If something hurts sharply, stop and tell an adult or doctor.`],
  [['pain','hurt','hurts','injury','injured','sharp','dizzy','chest'],
   ()=>`🛑 Please **stop exercising** and tell a parent, coach or doctor. Sharp pain, dizziness, chest pain or trouble breathing are signs to rest and get checked. Don't push through pain. Feeling sore the next day is OK, but pain while you move is not.`],
  [['how often','how many days','days a week','times a week','every day','rest day','rest days','schedule'],
   ()=>`Aim for **3–4 workouts a week** with rest days between hard days 📅\nThe plan: Mon Upper A · Tue Lower A · Wed walk or play · Thu Upper B · Fri Lower B · Sat bonus · Sun rest.\nMuscles get stronger while you **rest**, so rest days matter!`],
  [['warm','warm up','warmup','warm-up','stretch','stretching','cool down'],
   ()=>`🔥 Warm up for **5 minutes** before every workout:\n1. March or jog on the spot (1 min)\n2. Arm circles forwards and backwards (1 min)\n3. Jumping jacks (1 min)\n4. 10 bodyweight squats, then a few easy reps of your first exercise\nAfter your workout, stretch gently for a few minutes.`],
  [['heavier','add weight','more weight','increase','progress','stronger','get stronger','plateau','stuck'],
   ()=>`This app uses **double progression** 📈\n1. Each exercise has a rep range, like 8–12.\n2. Start where you can do the low number with good form.\n3. Each workout, try for a rep or two more.\n4. When you hit the **top number on every set**, add ${profile.unit==='kg'?'2.5 kg':'5 lbs'} (or a harder version).\nThe app shows a 🚀 tip when it's time!`],
  [['kid','kids','child','children','young','old enough','age','teen','teenager','safe for','12 year','13 year','14 year'],
   ()=>`Yes, exercise is great for kids and teens! 💪\n- Under 13: stick with **Beginner** bodyweight moves.\n- Under 18: use weights only with an adult or coach nearby.\n- Learn good form first and go slow.\n- Have fun, mix in sports and play, and get lots of sleep.`],
  [['water','drink','hydrate','thirsty'],
   ()=>`💧 Drink water before, during and after your workout. A few sips between sets is perfect. If you feel thirsty, dizzy or have a headache, take a break and drink.`],
  [['eat','food','protein','snack','diet','meal','breakfast','calorie','calories','lose weight','weight loss','supplement'],
   ()=>`🍎 Eating a mix of foods (fruits, veggies, grains, and protein like eggs, beans, fish or chicken) gives you energy to train. Drink water too. I can't give diet plans or calorie numbers. For that, please talk with a parent or a doctor.`],
  [['sleep','tired','sleepy','energy'],
   ()=>`😴 Sleep is when your muscles recover and grow. Kids and teens need about **8–10 hours**, adults 7–9. Feeling very tired? Take an extra rest day. That's part of training too!`],
  [['breathe','breathing','breath'],
   ()=>`🗣️ Breathe **out** when you push, lift or stand up, and breathe **in** when you lower. Never hold your breath for a long time.`],
  [['missed','miss','skipped','skip','forgot','late'],
   ()=>`No worries! 🙂 Just do the next workout in the plan. Missing one day won't undo your progress. Being consistent over weeks is what counts.`],
  [['motivation','motivated','bored','lazy','don\'t feel like','dont feel like','give up'],
   ()=>`You've got this! 🌟 Tips:\n- Just start with the warm-up. Once you begin, it gets easier.\n- Train with a friend or family member.\n- Watch your chart in **Progress** go up 📈\n- Put on your favourite music 🎵`],
  [['what is a rep','what is a set','what are reps','what are sets','rep mean','set mean','reps mean','sets mean'],
   ()=>`A **rep** is doing the move once (one squat = 1 rep). A **set** is a group of reps in a row. "3 sets × 10 reps" means: do 10 squats, rest, do 10 more, rest, and do 10 more. ✅`],
  [['how do i use','use the app','use this app','timer','tick','log','save my','track','record'],
   ()=>`Using the app is easy 📱\n1. On **Today**, tap **Start workout**.\n2. Do a set, type your reps (and weight), and tap ✓.\n3. A rest timer starts. When it beeps, do your next set.\n4. Tap **Finish workout** 🎉 and see your stats in **Progress**.`],
];
const EX_ALIASES = [
  [['push-up','push up','pushup','push-ups','pushups'],['pushup','knee_pushup','incline_pushup']],
  [['squat'],['back_squat','goblet_squat','squat']],[['plank shoulder tap','shoulder tap'],['shoulder_tap']],
  [['side plank'],['side_plank']],[['plank'],['plank']],[['lunge'],['db_lunge','reverse_lunge']],
  [['romanian','rdl'],['rdl','db_rdl']],[['deadlift'],['deadlift','rdl','db_rdl']],
  [['incline bench','incline press'],['incline_bench','incline_db_press']],[['bench press','bench'],['bench_press']],
  [['overhead press','shoulder press'],['ohp','db_press']],[['curl'],['barbell_curl','db_curl','backpack_curl']],
  [['pulldown','pull down','lat pull'],['lat_pulldown']],[['pull-up','pull up','pullup','chin up'],['pullup']],
  [['row'],['barbell_row','cable_row','backpack_row']],[['dip'],['dips','chair_dip']],
  [['glute bridge','bridge'],['glute_bridge']],[['calf'],['calf_raise','calf_raise_bw']],[['dead bug'],['dead_bug']],
  [['bird dog'],['bird_dog']],[['wall sit'],['wall_sit']],[['step up','step-up'],['step_up']],
  [['lateral raise','side raise'],['lateral_raise']],[['pushdown','tricep'],['tricep_pushdown','chair_dip']],
  [['leg press'],['leg_press']],[['leg extension'],['leg_extension']],[['hanging leg','leg raise'],['leg_raise','knee_raise']],
  [['knee raise'],['knee_raise']],[['ab wheel','rollout'],['ab_wheel']],[['sit-up','situp','sit up'],['decline_situp']],
  [['bulgarian','split squat'],['bulgarian']],
];
function exerciseAnswer(q){
  for(const [keys,ids] of EX_ALIASES){
    if(!keys.some(k=>q.includes(k)))continue;
    const mine=new Set(Object.values(PLANS[profile.level]).flat().map(p=>p[0]));
    const id=ids.find(i=>mine.has(i))||ids[0],ex=EX[id];
    return `**${esc(ex.e)} ${ex.name}** (works: ${ex.m.join(', ')})\n${ex.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n💡 ${ex.tip}\nFind the video in the **Exercises** tab ▶`;
  }
  return null;
}
function faqMatch(q){
  let best=null,score=0;
  FAQ.forEach(([keys,ans])=>{let s=0;keys.forEach(k=>{if(new RegExp('(^|[^a-z])'+k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).test(q))s+=k.includes(' ')?2:1});if(s>score){score=s;best=ans}});
  return {ans:best,score};
}
// Turn the small subset of markdown we use into safe HTML.
function md(t){
  const lines=esc(t).split('\n');let html='',list=null;
  const inline=x=>x.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
  const close=()=>{if(list){html+=`</${list}>`;list=null}};
  lines.forEach(l=>{const ul=l.match(/^\s*[-*•]\s+(.*)/),ol=l.match(/^\s*\d+[.)]\s+(.*)/);
    if(ul||ol){const tag=ul?'ul':'ol';if(list!==tag){close();html+=`<${tag}>`;list=tag}html+=`<li>${inline((ul||ol)[1])}</li>`}
    else{close();if(l.trim())html+=`<p>${inline(l)}</p>`}});
  close();return html;
}
let chat=store.get(pKey('jams_chat'),[]),chatBusy=false;
const askTimes=()=>store.get('jams_ask_times',[]).filter(t=>Date.now()-t<3600000);
const SUGGEST=['Which level should I choose?','How do I do a squat?','Is it OK to feel sore?','How do I warm up?','When should I add weight?','What is a rep and a set?'];
function renderAsk(v){
  const today=SCHEDULE[new Date().getDay()].k;
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg" style="padding-bottom:80px">
    <div><h1>Ask Coach 💬</h1><p class="muted" style="margin-top:4px">Questions about exercises, your plan or staying safe? Just ask!</p></div>
    <div class="chat" id="chat">
      <div class="msg bot">${md(`Hi${profile.name?' '+profile.name:''}! 👋 I'm Coach. Ask me how to do an exercise, which level to pick, or anything about your workouts.`)}</div>
      ${chat.map(m=>`<div class="msg ${m.role==='user'?'me':'bot'}">${m.role==='user'?esc(m.content):md(m.content)}</div>`).join('')}
    </div>
    <div class="sugg" id="sugg">${(chat.length?SUGGEST.slice(0,3):SUGGEST).map(q=>`<button>${q}</button>`).join('')}</div>
    ${chat.length?`<button class="link" id="clear" style="color:var(--muted)">🧹 Clear chat</button>`:''}
    <p class="small muted center">Coach gives general fitness tips, not medical advice. Got pain or an injury? Tell an adult or doctor.</p>
  </div>
  <div class="composer"><form id="ask"><input id="q" maxlength="500" placeholder="Type your question…" autocomplete="off" enterkeyhint="send" aria-label="Your question"><button id="send" aria-label="Send">➤</button></form></div>`;
  const scroll=()=>window.scrollTo(0,document.body.scrollHeight);scroll();
  $('#ask').onsubmit=e=>{e.preventDefault();const q=$('#q').value.trim();if(q&&!chatBusy)ask(q,today)};
  v.querySelectorAll('#sugg button').forEach(b=>b.onclick=()=>{if(!chatBusy)ask(b.textContent,today)});
  if($('#clear'))$('#clear').onclick=()=>{chat=[];store.del(pKey('jams_chat'));renderAsk(v)};
}
async function ask(q,today){
  chat.push({role:'user',content:q});chatBusy=true;profile.questions=(profile.questions||0)+1;saveProfile();
  const box=$('#chat');box.insertAdjacentHTML('beforeend',`<div class="msg me">${esc(q)}</div><div class="msg bot typing" id="typing"><span></span><span></span><span></span></div>`);
  $('#q').value='';$('#send').disabled=true;$('#sugg').classList.add('hide');window.scrollTo(0,document.body.scrollHeight);
  const lq=' '+q.toLowerCase()+' ';
  const howTo=/how|form|technique|teach|explain|what is|show|do i do|correct/.test(lq)||lq.trim().split(/\s+/).length<=4;
  const exA=howTo?exerciseAnswer(lq):null,faq=faqMatch(lq);
  let reply=null;
  if(exA)reply=exA;
  else if(faq.score>=2)reply=faq.ans();
  else if(profile.coachAI===false)reply=faq.score>=1?faq.ans():`I can answer common questions, like "how do I do a squat?" or "how do I warm up?" 🙂 (AI answers are turned off for this person.)`;
  else if(askTimes().length>=20)reply=`You've asked lots of questions this hour! 🙌 Coach needs a short break. Try again a bit later. (I can still answer common questions, like "how do I do a squat?")`;
  else{
    let limited=false;
    try{
      const t0=askTimes();t0.push(Date.now());store.set('jams_ask_times',t0);
      const W=today in WORKOUTS?WORKOUTS[today].name+': '+PLANS[profile.level][today].map(p=>EX[p[0]].name).join(', '):'rest day';
      const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),20000);
      const r=await fetch('api/chat',{method:'POST',headers:{'content-type':'application/json'},signal:ctrl.signal,
        body:JSON.stringify({messages:chat.slice(-8),level:profile.level,today:W,history:historySummary()})});
      clearTimeout(t);const d=await r.json().catch(()=>({}));
      if(r.ok&&d.reply)reply=d.reply;else if(r.status===429)limited=true;
    }catch(e){}
    if(!reply&&limited)reply=`Coach is taking a short break because lots of questions came in. 😅 Try again later! I can still answer common questions, like "how do I warm up?"`;
    if(!reply)reply=faq.score>=1?faq.ans():`Hmm, I'm not sure about that one 🤔 I can help with:\n- How to do any exercise (try "how do I do a plank?")\n- Picking your level\n- Warming up, soreness, rest and sleep\n- When to add weight\nFor anything about health or pain, please ask a parent, coach or doctor.`;
  }
  chat.push({role:'assistant',content:reply});chat=chat.slice(-40);store.set(pKey('jams_chat'),chat);chatBusy=false;
  const ty=$('#typing');if(ty){ty.classList.remove('typing');ty.removeAttribute('id');ty.innerHTML=md(reply)}
  if($('#send'))$('#send').disabled=false;
  const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),400);
  window.scrollTo(0,document.body.scrollHeight);
}
