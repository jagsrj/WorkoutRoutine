/* KinFit app bundle. GENERATED FILE: do not edit. Edit js/*.js and run `node scripts/build.js`. */

/* ===== js/data.js ===== */
/* KinFit · Exercises, levels, plans, drawings, badges and other data. */
/* ---------- Levels ---------- */
const LEVELS = {
  beginner: {
    name:'Beginner', emoji:'🌱', color:'#15803d', dark:'#4ade80', rest:60,
    tagline:'No equipment. Learn the moves.',
    equipment:'Just you, a wall, a sturdy chair and a backpack',
    who:['You are new to exercise, or coming back after a long break','You can do fewer than 6 push-ups','You want to work out at home','You are under 13 (always start here!)'],
  },
  intermediate: {
    name:'Intermediate', emoji:'🔥', color:'#c2410c', dark:'#fb923c', rest:90,
    tagline:'Dumbbells & machines. Build real strength.',
    equipment:'Dumbbells, cable machines, a bench',
    who:['You have exercised regularly for at least 2–3 months','You can do 6–20 push-ups with good form','You know how to use basic gym machines','You finished the Beginner plan and it feels easy'],
  },
  expert: {
    name:'Expert', emoji:'🏆', color:'#6d28d9', dark:'#a78bfa', rest:120,
    tagline:'Barbells. Heavy lifts. Big goals.',
    equipment:'Barbell, squat rack, pull-up bar, full gym',
    who:['You have trained 3+ times a week for 6+ months','You can do 20+ push-ups and some pull-ups','You know how to squat, bench and deadlift safely','Adults only — or teens with a coach watching'],
  },
};

/* ---------- Exercise library ---------- */
const YT = id => 'https://www.youtube.com/watch?v=' + id;
const YTS = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent('how to do ' + q + ' proper form');

const EX = {
  // ---- Beginner (bodyweight) ----
  knee_pushup:{name:'Knee Push-Ups',e:'🙌',m:['Chest','Arms'],steps:['Kneel on the floor and put your hands a little wider than your shoulders.','Keep your body straight from head to knees, like a plank.','Lower your chest towards the floor, then push back up.'],tip:'Too hard? Do them standing, pushing against a wall.'},
  backpack_row:{name:'Backpack Rows',e:'🎒',m:['Back','Arms'],weight:true,steps:['Put a few books in a backpack. Hold it with both hands.','Bend forward at your hips with a flat back and soft knees.','Pull the bag up to your belly button, squeeze your back, then lower it slowly.'],tip:'Keep your back flat like a table — no rounding.'},
  shoulder_tap:{name:'Plank Shoulder Taps',e:'👋',m:['Shoulders','Core'],per:'each side',steps:['Get into a push-up position with straight arms.','Lift one hand and tap the opposite shoulder.','Put it back and switch. Try not to rock your hips.'],tip:'Spread your feet wider to make it easier.'},
  plank:{name:'Plank',e:'🧱',m:['Core'],time:true,steps:['Rest on your forearms and toes.','Make a straight line from head to heels.','Squeeze your tummy and breathe. Hold!'],tip:'Hips sagging? Drop to your knees and keep going.',video:YT('pSHjTRCQxIw')},
  squat:{name:'Bodyweight Squats',e:'🪑',m:['Legs','Glutes'],steps:['Stand with feet shoulder-width apart.','Sit back like you are sitting on a chair. Keep your chest up.','Go down until thighs are about level with the floor, then stand up.'],tip:'Use a real chair behind you until you feel confident.'},
  glute_bridge:{name:'Glute Bridges',e:'🌉',m:['Glutes','Hamstrings'],steps:['Lie on your back, knees bent, feet flat on the floor.','Push through your heels and lift your hips up high.','Squeeze your bottom at the top, then lower slowly.'],tip:'Hold the top for 2 seconds to make it harder.'},
  calf_raise_bw:{name:'Calf Raises',e:'🦶',m:['Calves'],steps:['Stand tall and hold a wall for balance.','Rise up onto your tiptoes as high as you can.','Lower your heels slowly back down.'],tip:'Stand on a step and let your heels drop below it to work harder.',video:YT('-M4-G8p8fmc')},
  dead_bug:{name:'Dead Bug',e:'🐞',m:['Core'],per:'each side',steps:['Lie on your back with arms pointing to the ceiling and knees bent up.','Slowly stretch one arm back and the opposite leg out.','Bring them back and switch sides. Keep your lower back on the floor.'],tip:'Slow is better. Breathe out as you stretch.'},
  incline_pushup:{name:'Incline Push-Ups',e:'📐',m:['Chest','Arms'],steps:['Put your hands on a bench, sturdy table or stairs.','Walk your feet back until your body is straight.','Lower your chest to the edge, then push away.'],tip:'The lower the surface, the harder it is.'},
  backpack_curl:{name:'Backpack Curls',e:'💪',m:['Biceps'],weight:true,steps:['Hold a backpack by the handle (or two water bottles).','Keep elbows tucked at your sides.','Curl it up to your shoulders, then lower slowly.'],tip:'No swinging! Keep your body still.'},
  chair_dip:{name:'Chair Dips',e:'🪑',m:['Triceps'],steps:['Sit on the edge of a sturdy chair that will not slide. Hands next to your hips.','Slide your bottom off the chair, knees bent.','Bend your elbows to lower a little, then push back up.'],tip:'Only go down a little at first. Keep shoulders away from your ears.'},
  bird_dog:{name:'Bird Dog',e:'🐕',m:['Core','Back'],per:'each side',steps:['Start on hands and knees.','Reach one arm forward and the opposite leg back.','Hold for 2 seconds, come back, switch.'],tip:'Pretend there is a cup of water on your back — do not spill it!'},
  reverse_lunge:{name:'Reverse Lunges',e:'🦵',m:['Legs','Glutes'],per:'each leg',steps:['Stand tall with feet together.','Step one foot back and bend both knees.','Push through your front foot to stand back up. Switch legs.'],tip:'Hold a wall or chair for balance.'},
  wall_sit:{name:'Wall Sit',e:'🧍',m:['Legs'],time:true,steps:['Lean your back flat against a wall.','Slide down until your knees are bent like a chair.','Hold it there. Keep breathing!'],tip:'Not as low? That is fine — go only as low as feels OK.'},
  step_up:{name:'Step-Ups',e:'🪜',m:['Legs','Glutes'],per:'each leg',steps:['Stand in front of a low, sturdy step or the bottom stair.','Step up with one foot and stand tall on top.','Step down slowly. Do all reps, then switch legs.'],tip:'Push through the heel of the foot that is on the step.',video:YT('D7KaRcUTQeE')},
  side_plank:{name:'Side Plank',e:'📏',m:['Core'],time:true,per:'each side',steps:['Lie on your side, propped up on your forearm.','Lift your hips so your body is straight.','Hold, then switch sides.'],tip:'Bend your bottom knee on the floor to make it easier.'},

  // ---- Intermediate (dumbbells & machines) ----
  pushup:{name:'Push-Ups',e:'🙌',m:['Chest','Arms','Core'],steps:['Hands a little wider than your shoulders, body straight.','Lower your chest until it nearly touches the floor.','Push back up. Elbows point slightly back, not straight out.'],tip:'Can do 20 easily? Put your feet on a bench.'},
  lat_pulldown:{name:'Lat Pulldowns',e:'⬇️',m:['Back','Biceps'],weight:true,start:'60 lbs',steps:['Sit at the machine with thighs under the pad. Grab the bar wide.','Lean back a little and pull the bar to your upper chest.','Squeeze your shoulder blades, then let the bar rise slowly.'],tip:'Pull with your elbows, not your hands.',video:YT('CAwf7n6Luuc')},
  db_press:{name:'Dumbbell Shoulder Press',e:'🏋️',m:['Shoulders','Triceps'],weight:true,start:'15 lbs each',steps:['Sit tall on a bench with back support. Dumbbells at shoulder height.','Press them up until arms are straight.','Lower slowly back to your shoulders.'],tip:'Do not arch your lower back — squeeze your tummy.',video:YT('qEwKCR5JCog')},
  db_curl:{name:'Bicep Curls',e:'💪',m:['Biceps'],weight:true,start:'15 lbs each',steps:['Stand tall holding dumbbells, palms facing forward.','Curl the weights up, keeping elbows by your sides.','Lower slowly — count to 3 on the way down.'],tip:'If you have to swing, the weight is too heavy.',video:YT('ykJmrZ5v0Oo')},
  goblet_squat:{name:'Goblet Squats',e:'🏆',m:['Legs','Glutes','Core'],weight:true,start:'20 lbs',steps:['Hold one dumbbell at your chest with both hands.','Squat down between your knees, keeping your chest tall.','Drive up through your whole foot.'],tip:'Elbows go inside your knees at the bottom.'},
  db_rdl:{name:'Dumbbell Romanian Deadlift',e:'🙇',m:['Hamstrings','Glutes','Back'],weight:true,start:'20 lbs each',steps:['Stand holding dumbbells in front of your thighs.','Push your hips back, sliding the weights down your legs. Back stays flat.','Stop when you feel a stretch behind your legs, then stand up.'],tip:'Think "hips back", not "bend down".',video:YT('JCXUYuzwNrM')},
  leg_extension:{name:'Leg Extensions',e:'🦿',m:['Quads'],weight:true,start:'60 lbs',steps:['Sit in the machine with the pad on your lower shins.','Straighten your legs fully and squeeze.','Lower slowly.'],tip:'Hold the handles and keep your bottom on the seat.',video:YT('YyvSfVjQeL0')},
  incline_db_press:{name:'Incline Dumbbell Press',e:'📐',m:['Upper Chest','Shoulders'],weight:true,start:'20 lbs each',steps:['Set a bench at a low incline. Lie back with dumbbells at chest level.','Press them up over your chest.','Lower slowly until your elbows are just below the bench.'],tip:'Keep your feet flat on the floor.',video:YT('8iPEnn-ltC8')},
  cable_row:{name:'Seated Cable Rows',e:'🚣',m:['Back','Biceps'],weight:true,start:'60 lbs',steps:['Sit tall, feet on the platform, knees slightly bent.','Pull the handle to your belly, squeezing your shoulder blades.','Let it go forward slowly without rounding your back.'],tip:'Chest up, shoulders down.',video:YT('GZbfZ033f74')},
  lateral_raise:{name:'Lateral Raises',e:'🕊️',m:['Shoulders'],weight:true,start:'10 lbs each',steps:['Stand holding light dumbbells at your sides.','Raise your arms out to the sides up to shoulder height.','Lower slowly.'],tip:'Go light! Lead with your elbows like you are pouring water.',video:YT('3VcKaXpzqRo')},
  tricep_pushdown:{name:'Tricep Pushdowns',e:'⏬',m:['Triceps'],weight:true,start:'35 lbs',steps:['Stand at a cable machine holding the bar or rope.','Keep elbows pinned to your sides.','Push down until arms are straight, then let it rise slowly.'],tip:'Only your forearms should move.',video:YT('2-LAMcpzODU')},
  db_lunge:{name:'Dumbbell Lunges',e:'🚶',m:['Legs','Glutes'],weight:true,per:'each leg',start:'15 lbs each',steps:['Hold dumbbells at your sides.','Step forward and lower until both knees are bent about 90°.','Push back up and switch legs.'],tip:'Keep your front knee over your foot, not caving in.',video:YT('D7KaRcUTQeE')},
  leg_press:{name:'Leg Press',e:'🦵',m:['Legs','Glutes'],weight:true,start:'90 lbs',steps:['Sit in the machine with feet shoulder-width on the platform.','Unlock and lower the platform until knees are bent about 90°.','Press back up without locking your knees.'],tip:'Keep your lower back pressed into the seat.'},
  calf_raise:{name:'Calf Raises',e:'🦶',m:['Calves'],weight:true,start:'65 lbs',steps:['Stand on the machine or a step holding weight.','Rise up onto your toes as high as you can.','Lower your heels below the step for a stretch.'],tip:'Pause at the top for one second.',video:YT('-M4-G8p8fmc')},
  knee_raise:{name:'Hanging Knee Raises',e:'🧗',m:['Core'],steps:['Hang from a bar (or use the captain\'s chair).','Bring your knees up towards your chest.','Lower slowly without swinging.'],tip:'Can\'t hang yet? Do lying knee tucks on the floor.'},

  // ---- Expert (barbell) ----
  bench_press:{name:'Bench Press (Barbell)',e:'🏋️',m:['Chest','Triceps','Shoulders'],weight:true,start:'75 lbs',steps:['Lie on the bench, eyes under the bar, feet flat.','Grip slightly wider than shoulders, unrack and lower to mid-chest.','Press up and slightly back over your shoulders.'],tip:'Always use a spotter or safety pins when going heavy.',video:YT('rT7DgCr-3pg')},
  pullup:{name:'Pull-Ups',e:'🧗',m:['Back','Biceps'],steps:['Hang from the bar, hands a bit wider than shoulders.','Pull your chest up towards the bar.','Lower all the way down under control.'],tip:'Can\'t do many yet? Use a band or the assisted machine.'},
  ohp:{name:'Overhead Press (Barbell)',e:'🙆',m:['Shoulders','Triceps','Core'],weight:true,start:'55 lbs',steps:['Stand with the bar on your front shoulders, hands just outside them.','Squeeze your glutes and press the bar straight overhead.','Move your head through once the bar passes your face. Lower to shoulders.'],tip:'Tight tummy, tight glutes — no leaning back.'},
  barbell_curl:{name:'Barbell Curls',e:'💪',m:['Biceps'],weight:true,start:'45 lbs',steps:['Stand holding the bar with palms up, shoulder-width.','Curl to your chest with elbows still.','Lower slowly.'],tip:'Use an EZ bar if your wrists feel strained.'},
  back_squat:{name:'Back Squat (Barbell)',e:'🦍',m:['Legs','Glutes','Core'],weight:true,start:'95 lbs',steps:['Set the bar on your upper back in a rack. Step back, feet shoulder-width.','Brace your core and sit down between your heels until thighs are parallel.','Drive up, keeping your chest tall.'],tip:'Always set the safety bars in the rack.'},
  rdl:{name:'Romanian Deadlift (Barbell)',e:'🙇',m:['Hamstrings','Glutes','Back'],weight:true,start:'95 lbs',steps:['Hold the bar at hip height, soft knees.','Push hips back, bar sliding down your thighs.','Stop at mid-shin or when your back wants to round; stand up.'],tip:'Bar stays touching your legs the whole time.',video:YT('JCXUYuzwNrM')},
  decline_situp:{name:'Weighted Decline Sit-Ups',e:'🔻',m:['Abs'],weight:true,start:'10 lbs plate',steps:['Hook feet on a decline bench, hold a plate at your chest.','Curl up until your chest is near your knees.','Lower slowly.'],tip:'Curl your spine — don\'t just yank with your hips.',video:YT('1fbU_MkV7NE')},
  incline_bench:{name:'Incline Bench Press (Barbell)',e:'📐',m:['Upper Chest','Shoulders'],weight:true,start:'65 lbs',steps:['Set the bench at about 30°. Unrack the bar.','Lower to your upper chest.','Press up over your chin.'],tip:'Use a spotter or safety arms.',video:YT('8iPEnn-ltC8')},
  barbell_row:{name:'Barbell Rows',e:'🚣',m:['Back','Biceps'],weight:true,start:'75 lbs',steps:['Hinge forward with a flat back, bar hanging at knee level.','Pull the bar to your lower ribs.','Lower under control.'],tip:'Torso stays still — no jerking up.'},
  dips:{name:'Parallel Bar Dips',e:'🤸',m:['Chest','Triceps'],steps:['Hold the bars with straight arms.','Lean slightly forward and lower until shoulders are just below elbows.','Press back up.'],tip:'Use the assisted machine if needed. Stop if shoulders hurt.'},
  deadlift:{name:'Deadlift (Barbell)',e:'⚡',m:['Whole back side','Legs','Grip'],weight:true,start:'135 lbs',steps:['Feet under the bar, grip just outside your legs.','Chest up, back flat, pull the slack out of the bar.','Push the floor away and stand tall. Lower with control.'],tip:'Form first! Film yourself or ask a coach to check.'},
  bulgarian:{name:'Bulgarian Split Squats',e:'🦩',m:['Legs','Glutes'],weight:true,per:'each leg',start:'20 lbs each',steps:['Stand in front of a bench, put one foot behind you on it.','Lower straight down until your front thigh is parallel.','Drive up through your front heel.'],tip:'Hold a wall for balance at first.'},
  leg_raise:{name:'Hanging Leg Raises',e:'🧗',m:['Core'],steps:['Hang from a bar with straight arms.','Lift straight legs up to hip height or higher.','Lower slowly without swinging.'],tip:'Bend your knees if straight legs are too hard.',video:YT('pSHjTRCQxIw')},
  ab_wheel:{name:'Ab Wheel Rollouts',e:'🛞',m:['Core'],steps:['Kneel holding an ab wheel under your shoulders.','Roll forward slowly, keeping your back flat.','Pull back with your abs.'],tip:'Only roll as far as you can without your back sagging.'},
};

/* ---------- Plans: [exerciseId, sets, repsLow, repsHigh] ---------- */
const WORKOUTS = {
  ua:{name:'Upper Body A', sub:'Push & Pull', e:'💪'},
  la:{name:'Lower Body A', sub:'Legs & Core', e:'🦵'},
  ub:{name:'Upper Body B', sub:'Chest, Back & Arms', e:'🏋️'},
  lb:{name:'Lower Body B', sub:'Legs & Balance', e:'⚡'},
};
const PLANS = {
  beginner:{
    ua:[['knee_pushup',3,6,10],['backpack_row',3,10,12],['shoulder_tap',3,6,10],['plank',3,15,30]],
    la:[['squat',3,10,15],['glute_bridge',3,10,15],['calf_raise_bw',3,12,20],['dead_bug',3,6,10]],
    ub:[['incline_pushup',3,8,12],['backpack_curl',3,10,15],['chair_dip',3,6,10],['bird_dog',3,6,10]],
    lb:[['reverse_lunge',3,6,10],['wall_sit',3,15,30],['step_up',3,8,12],['side_plank',3,10,20]],
  },
  intermediate:{
    ua:[['pushup',3,8,15],['lat_pulldown',3,10,12],['db_press',3,10,12],['db_curl',3,10,12]],
    la:[['goblet_squat',3,10,12],['db_rdl',3,10,12],['leg_extension',3,12,15],['plank',3,30,45]],
    ub:[['incline_db_press',3,10,12],['cable_row',3,10,12],['lateral_raise',3,12,15],['tricep_pushdown',3,12,15]],
    lb:[['db_lunge',3,8,10],['leg_press',3,10,12],['calf_raise',4,12,15],['knee_raise',3,10,15]],
  },
  expert:{
    ua:[['bench_press',4,6,8],['pullup',4,5,10],['ohp',3,6,8],['barbell_curl',3,8,10]],
    la:[['back_squat',4,5,8],['rdl',3,8,10],['decline_situp',3,12,15],['calf_raise',4,12,15]],
    ub:[['incline_bench',4,8,10],['barbell_row',4,8,10],['dips',3,8,12],['lateral_raise',3,12,15]],
    lb:[['deadlift',3,3,5],['bulgarian',3,8,10],['leg_raise',3,10,15],['ab_wheel',3,8,12]],
  },
};
// Sun..Sat
const SCHEDULE = [
  {k:'rest',  label:'Rest day', e:'😴', note:'Muscles grow when you rest. Sleep well and have fun!'},
  {k:'ua'}, {k:'la'},
  {k:'active',label:'Active rest', e:'🚶', note:'Go for a 20–30 minute walk, bike ride or play outside.'},
  {k:'ub'}, {k:'lb'},
  {k:'bonus', label:'Bonus day', e:'⭐', note:'Optional: play a sport, stretch, or repeat a workout you missed.'},
];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ---------- Level quiz ---------- */
const QUIZ = [
  {q:'How often do you exercise right now?', a:[['🛋️','Hardly ever',0],['🚲','1–2 times a week',1],['🏃','3+ times a week, for 6+ months',2]]},
  {q:'How many push-ups can you do in a row (good form)?', a:[['🤏','0–5',0],['✋','6–20',1],['🙌','More than 20',2]]},
  {q:'Have you used gym weights before?', a:[['🤷','Never',0],['🏋️','Yes — dumbbells & machines',1],['🦍','Yes — barbell squat, bench & deadlift',2]]},
  {q:'How long can you hold a plank?', a:[['⏱️','Less than 20 seconds',0],['⏲️','20–60 seconds',1],['🕰️','Over a minute',2]]},
  {q:'How old are you?', note:'Only used to pick a safe level. It is not saved.', a:[['🧒','Under 13',0],['🧑','13–17',1],['🧔','18 or older',2]], age:true},
];


/* ---------- Exercise drawings (animated stick figures) ----------
   Each pose lists joint points "name:x,y" in a 120×110 box (floor at y=100).
   a = start position, b = end position. The figure moves a → b → a.
   h head, s shoulder, e elbow, w hand, p hip, k knee, f foot; e2/w2/k2/f2 = far-side arm/leg. */
const POSES = {
  squat:{a:'h:55,20 s:55,30 e:70,31 w:84,31 p:55,60 k:56,80 f:55,100',b:'h:60,45 s:56,54 e:70,52 w:84,50 p:43,80 k:62,81 f:55,100'},
  goblet:{a:'h:55,20 s:55,30 e:60,44 w:64,34 p:55,60 k:56,80 f:55,100',b:'h:60,45 s:56,54 e:60,67 w:65,58 p:43,80 k:62,81 f:55,100',props:[{t:'db',at:'w'}]},
  backsquat:{a:'h:58,20 s:55,30 e:46,38 w:52,29 p:55,60 k:56,80 f:55,100',b:'h:62,45 s:56,54 e:46,62 w:53,53 p:43,80 k:62,81 f:55,100',props:[{t:'plate',at:'s'}]},
  pushup:{a:'h:95,68 s:85,72 e:85,86 w:85,100 p:56,84 k:37,91 f:18,99',b:'h:94,86 s:84,90 e:72,88 w:86,100 p:52,94 k:35,96 f:18,99'},
  kneepush:{a:'h:95,68 s:85,72 e:85,86 w:85,100 p:58,88 k:40,100 f:24,88',b:'h:94,86 s:84,90 e:72,88 w:86,100 p:60,95 k:40,100 f:24,88'},
  inclinepush:{a:'h:91,59 s:82,64 e:84,72 w:86,80 p:55,82 k:37,91 f:20,100',b:'h:89,69 s:80,74 e:70,72 w:86,80 p:54,85 k:37,92 f:20,100',props:[{t:'box',x:78,y:80,w:30,h:20}]},
  plank:{a:'h:92,76 s:82,80 e:82,99 w:96,99 p:56,88 k:37,93 f:18,99',b:'h:92,75 s:82,79 e:82,99 w:96,99 p:56,86 k:37,93 f:18,99',dur:3},
  sideplank:{a:'h:90,70 s:82,75 e:82,99 w:94,99 e2:82,62 w2:82,48 p:56,87 k:38,93 f:20,99',b:'h:90,67 s:82,72 e:82,99 w:94,99 e2:82,59 w2:82,45 p:56,81 k:38,91 f:20,99',dur:3},
  shouldertap:{a:'h:95,68 s:85,72 e:85,86 w:85,100 p:56,84 k:37,91 f:18,99',b:'h:95,68 s:85,72 e:85,86 w:85,100 e2:95,86 w2:88,74 p:56,84 k:37,91 f:18,99'},
  bridge:{a:'h:20,93 s:30,98 e:44,99 w:58,99 p:60,98 k:76,82 f:88,100',b:'h:20,93 s:31,96 e:44,99 w:58,99 p:58,80 k:77,78 f:88,100'},
  calf:{a:'h:55,20 s:55,30 e:68,40 w:80,42 p:55,60 k:56,80 f:55,100',b:'h:55,15 s:55,25 e:68,36 w:80,38 p:55,55 k:56,75 f:56,96',props:[{t:'wall',x:83}]},
  calfdb:{a:'h:55,20 s:55,30 e:55,45 w:56,59 p:55,60 k:56,80 f:55,100',b:'h:55,15 s:55,25 e:55,40 w:56,54 p:55,55 k:56,75 f:56,96',props:[{t:'db',at:'w'}]},
  deadbug:{a:'h:20,93 s:30,96 e:30,82 w:30,68 p:60,97 k:60,78 f:78,78',b:'h:20,93 s:30,96 e:30,82 w:30,68 e2:18,88 w2:6,92 p:60,97 k:60,78 f:78,78 k2:78,92 f2:98,95'},
  row:{a:'h:88,48 s:78,52 e:78,67 w:78,80 p:48,64 k:60,82 f:55,100',b:'h:88,48 s:78,52 e:64,56 w:74,64 p:48,64 k:60,82 f:55,100'},
  curl:{a:'h:55,20 s:55,30 e:57,45 w:58,59 p:55,60 k:56,80 f:55,100',b:'h:55,20 s:55,30 e:57,45 w:66,34 p:55,60 k:56,80 f:55,100'},
  chairdip:{a:'h:48,46 s:47,56 e:46,66 w:45,75 p:50,84 k:70,84 f:70,100',b:'h:53,60 s:52,69 e:38,66 w:45,75 p:53,95 k:72,90 f:74,100',props:[{t:'box',x:18,y:75,w:27,h:25}]},
  birddog:{a:'h:82,72 s:72,78 e:72,89 w:72,100 p:42,80 k:40,100 f:22,100',b:'h:82,72 s:72,78 e:72,89 w:72,100 e2:86,76 w2:100,74 p:42,80 k:40,100 f:22,100 k2:26,80 f2:8,80'},
  lunge:{a:'h:50,20 s:50,30 e:50,45 w:51,58 p:50,60 k:51,80 f:50,100',b:'h:50,40 s:50,50 e:50,65 w:51,77 p:50,80 k:68,80 f:68,100 k2:42,98 f2:24,99'},
  wallsit:{a:'h:42,48 s:42,58 e:50,70 w:60,77 p:42,80 k:62,80 f:62,100',b:'h:42,47 s:42,57 e:50,69 w:60,76 p:42,80 k:62,80 f:62,100',props:[{t:'wall',x:37}],dur:3},
  stepup:{a:'h:50,20 s:50,30 e:50,45 w:51,58 p:50,60 k:51,80 f:50,100 k2:64,66 f2:70,86',b:'h:70,8 s:70,18 e:70,33 w:71,46 p:70,48 k:64,66 f:60,84 k2:70,67 f2:72,86',props:[{t:'box',x:62,y:86,w:34,h:14}]},
  pullup:{a:'h:66,30 s:60,38 e:60,24 w:60,10 p:60,66 k:64,82 f:54,92',b:'h:64,8 s:60,20 e:50,24 w:60,10 p:60,48 k:64,64 f:54,74',props:[{t:'hbar',y:10}]},
  pulldown:{a:'h:66,32 s:60,40 e:61,27 w:62,14 p:58,70 k:78,72 f:80,92',b:'h:66,32 s:60,40 e:50,50 w:66,42 p:58,70 k:78,72 f:80,92',props:[{t:'cable',from:[62,0]},{t:'seat',x:44,y:72,w:28}]},
  ohp:{a:'h:55,20 s:55,30 e:60,43 w:60,29 p:55,60 k:56,80 f:55,100',b:'h:55,20 s:55,30 e:58,16 w:60,3 p:55,60 k:56,80 f:55,100'},
  dbpress:{a:'h:52,34 s:52,44 e:57,57 w:57,43 p:52,74 k:70,76 f:70,100',b:'h:52,34 s:52,44 e:55,30 w:57,16 p:52,74 k:70,76 f:70,100',props:[{t:'seat',x:36,y:76,w:30}]},
  latraise:{a:'h:60,18 s:60,30 e:53,44 w:51,58 e2:67,44 w2:69,58 p:60,60 k:55,80 f:52,100 k2:65,80 f2:68,100',b:'h:60,18 s:60,30 e:46,31 w:32,31 e2:74,31 w2:88,31 p:60,60 k:55,80 f:52,100 k2:65,80 f2:68,100',props:[{t:'db',at:'w'},{t:'db',at:'w2'}]},
  pushdown:{a:'h:57,20 s:56,30 e:57,45 w:69,36 p:55,60 k:56,80 f:55,100',b:'h:57,20 s:56,30 e:57,45 w:66,58 p:55,60 k:56,80 f:55,100',props:[{t:'cable',from:[76,0]}]},
  legext:{a:'h:48,40 s:50,50 e:52,64 w:58,78 p:55,80 k:73,80 f:73,100',b:'h:48,40 s:50,50 e:52,64 w:58,78 p:55,80 k:73,80 f:93,78',props:[{t:'seat',x:38,y:82,w:38},{t:'pad',at:'f'}]},
  legpress:{a:'h:22,54 s:30,62 e:42,70 w:52,76 p:50,82 k:62,62 f:80,70',b:'h:22,54 s:30,62 e:42,70 w:52,76 p:50,82 k:70,72 f:90,62',props:[{t:'seat',x:26,y:84,w:32},{t:'platform',at:'f'}]},
  hangknee:{a:'h:66,24 s:60,30 e:60,18 w:60,6 p:60,58 k:60,78 f:60,96',b:'h:66,24 s:60,30 e:60,18 w:60,6 p:60,58 k:76,54 f:78,72',props:[{t:'hbar',y:6}]},
  hangleg:{a:'h:66,24 s:60,30 e:60,18 w:60,6 p:60,58 k:60,78 f:60,96',b:'h:66,24 s:60,30 e:60,18 w:60,6 p:60,58 k:78,56 f:96,54',props:[{t:'hbar',y:6}]},
  bench:{a:'h:28,74 s:38,77 e:40,62 w:40,48 p:66,78 k:82,80 f:86,100',b:'h:28,74 s:38,77 e:30,70 w:40,64 p:66,78 k:82,80 f:86,100',props:[{t:'bench',x:20,y:81,w:54}]},
  incline:{a:'h:34,54 s:40,63 e:46,49 w:50,36 p:64,80 k:80,82 f:84,100',b:'h:34,54 s:40,63 e:34,56 w:44,50 p:64,80 k:80,82 f:84,100',props:[{t:'incline'}]},
  situp:{a:'h:20,93 s:30,96 e:38,90 w:34,86 p:60,96 k:72,80 f:86,98',b:'h:46,58 s:49,68 e:58,72 w:52,66 p:60,96 k:72,80 f:86,98'},
  hinge:{a:'h:55,20 s:55,30 e:56,45 w:57,60 p:55,60 k:56,80 f:55,100',b:'h:82,50 s:72,54 e:72,68 w:72,82 p:44,62 k:57,82 f:55,100'},
  deadlift:{a:'h:76,52 s:66,58 e:64,74 w:62,89 p:42,74 k:62,84 f:55,100',b:'h:55,20 s:55,30 e:56,45 w:57,60 p:55,60 k:56,80 f:55,100',props:[{t:'plate',at:'w'}]},
  bulgarian:{a:'h:56,22 s:56,32 e:56,47 w:57,60 p:56,62 k:62,80 f:62,100 k2:45,80 f2:30,80',b:'h:52,38 s:52,48 e:52,63 w:53,76 p:52,78 k:68,78 f:66,100 k2:42,95 f2:30,80',props:[{t:'box',x:12,y:82,w:24,h:18}]},
  dips:{a:'h:62,20 s:58,30 e:59,41 w:60,52 p:56,58 k:58,76 f:50,90',b:'h:64,34 s:60,44 e:48,46 w:60,52 p:56,72 k:58,88 f:48,98',props:[{t:'pbar',y:52}]},
  abwheel:{a:'h:72,66 s:66,74 e:67,85 w:68,94 p:44,80 k:40,100 f:24,96',b:'h:92,80 s:84,86 e:94,91 w:104,94 p:56,90 k:40,100 f:24,96',props:[{t:'wheel',at:'w'}]},
  cablerow:{a:'h:44,48 s:42,58 e:56,60 w:70,62 p:40,88 k:56,78 f:72,90',b:'h:41,48 s:40,58 e:28,64 w:44,66 p:40,88 k:56,78 f:72,90',props:[{t:'cable',from:[110,66]},{t:'seat',x:28,y:90,w:24}]},
  march:{a:'h:55,20 s:55,30 e:64,42 w:66,56 e2:46,42 w2:44,54 p:55,60 k:56,80 f:55,100 k2:68,70 f2:66,88',b:'h:55,20 s:55,30 e:46,42 w:44,54 e2:64,42 w2:66,56 p:55,60 k:68,70 f:66,88 k2:56,80 f2:55,100',dur:1.2},
  jacks:{a:'h:60,18 s:60,30 e:53,44 w:51,58 e2:67,44 w2:69,58 p:60,60 k:57,80 f:56,100 k2:63,80 f2:64,100',b:'h:60,14 s:60,26 e:50,14 w:44,2 e2:70,14 w2:76,2 p:60,56 k:50,76 f:42,96 k2:70,76 f2:78,96',dur:1},
  armcircle:{a:'h:60,18 s:60,30 e:46,31 w:32,31 e2:74,31 w2:88,31 p:60,60 k:57,80 f:56,100 k2:63,80 f2:64,100',b:'h:60,18 s:60,30 e:47,22 w:35,16 e2:73,22 w2:85,16 p:60,60 k:57,80 f:56,100 k2:63,80 f2:64,100',dur:.8},
};
// exercise → [pose, extra hand prop]
const FIG = {
  knee_pushup:['kneepush'],backpack_row:['row',{t:'bag',at:'w'}],shoulder_tap:['shouldertap'],plank:['plank'],squat:['squat'],
  glute_bridge:['bridge'],calf_raise_bw:['calf'],dead_bug:['deadbug'],incline_pushup:['inclinepush'],backpack_curl:['curl',{t:'bag',at:'w'}],
  chair_dip:['chairdip'],bird_dog:['birddog'],reverse_lunge:['lunge'],wall_sit:['wallsit'],step_up:['stepup'],side_plank:['sideplank'],
  pushup:['pushup'],lat_pulldown:['pulldown'],db_press:['dbpress',{t:'db',at:'w'}],db_curl:['curl',{t:'db',at:'w'}],goblet_squat:['goblet'],
  db_rdl:['hinge',{t:'db',at:'w'}],leg_extension:['legext'],incline_db_press:['incline',{t:'db',at:'w'}],cable_row:['cablerow'],
  lateral_raise:['latraise'],tricep_pushdown:['pushdown'],db_lunge:['lunge',{t:'db',at:'w'}],leg_press:['legpress'],calf_raise:['calfdb'],
  knee_raise:['hangknee'],bench_press:['bench',{t:'plate',at:'w'}],pullup:['pullup'],ohp:['ohp',{t:'plate',at:'w'}],
  barbell_curl:['curl',{t:'plate',at:'w',r:7}],back_squat:['backsquat'],rdl:['hinge',{t:'plate',at:'w'}],decline_situp:['situp',{t:'disc',at:'w'}],
  incline_bench:['incline',{t:'plate',at:'w'}],barbell_row:['row',{t:'plate',at:'w'}],dips:['dips'],deadlift:['deadlift'],
  bulgarian:['bulgarian',{t:'db',at:'w'}],leg_raise:['hangleg'],ab_wheel:['abwheel'],
  _march:['march'],_jacks:['jacks'],_arms:['armcircle'],_squat:['squat'],_lunge:['lunge'],_bridge:['bridge'],_inch:['pushup'],
};
const REDUCED = (()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}})();
function parsePose(str){const o={};(str||'').trim().split(/\s+/).forEach(t=>{if(!t)return;const [k,v]=t.split(':');o[k]=v.split(',').map(Number)});return o}
function figSvg(id,cls='fig'){
  if(typeof EX!=='undefined'&&EX[id]&&EX[id].variantOf)id=EX[id].figId; // equipment version: show the matching drawing, or none
  const m=id&&FIG[id];if(!m)return '';const P=POSES[m[0]];
  const A=parsePose(P.a),B=Object.assign({},A,parsePose(P.b));
  [A,B].forEach(X=>{X.e2=X.e2||X.e;X.w2=X.w2||X.w;X.k2=X.k2||X.k;X.f2=X.f2||X.f});
  const dur=(P.dur||2.4)+'s',moves=!REDUCED;
  const an=(attr,a,b)=>moves&&a!==b?`<animate attributeName="${attr}" values="${a};${b};${a}" dur="${dur}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>`:'';
  const line=(p,q,extra='')=>`<line x1="${A[p][0]}" y1="${A[p][1]}" x2="${A[q][0]}" y2="${A[q][1]}" ${extra}>${an('x1',A[p][0],B[p][0])}${an('y1',A[p][1],B[p][1])}${an('x2',A[q][0],B[q][0])}${an('y2',A[q][1],B[q][1])}</line>`;
  const at=(pt,dx,dy,tag,attrs,xa='x',ya='y')=>`<${tag} ${xa}="${A[pt][0]+dx}" ${ya}="${A[pt][1]+dy}" ${attrs}>${an(xa,A[pt][0]+dx,B[pt][0]+dx)}${an(ya,A[pt][1]+dy,B[pt][1]+dy)}</${tag}>`;
  let props='';
  [...(P.props||[]),...(m[1]?[m[1]]:[])].forEach(pr=>{
    const g='fill="var(--fig-prop)"',st='stroke="var(--fig-prop)" fill="none"';
    switch(pr.t){
      case 'box':props+=`<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="${pr.h}" rx="2" ${g}/>`;break;
      case 'seat':props+=`<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="5" rx="2" ${g}/><line x1="${pr.x+pr.w/2}" y1="${pr.y+5}" x2="${pr.x+pr.w/2}" y2="100" stroke-width="3" ${st}/>`;break;
      case 'bench':props+=`<rect x="${pr.x}" y="${pr.y}" width="${pr.w}" height="5" rx="2" ${g}/><line x1="${pr.x+6}" y1="${pr.y+5}" x2="${pr.x+6}" y2="100" stroke-width="3" ${st}/><line x1="${pr.x+pr.w-6}" y1="${pr.y+5}" x2="${pr.x+pr.w-6}" y2="100" stroke-width="3" ${st}/>`;break;
      case 'incline':props+=`<polyline points="30,66 62,87 80,87" stroke-width="5" stroke-linejoin="round" ${st}/><line x1="62" y1="87" x2="62" y2="100" stroke-width="3" ${st}/>`;break;
      case 'wall':props+=`<line x1="${pr.x}" y1="0" x2="${pr.x}" y2="100" stroke-width="4" ${st}/>`;break;
      case 'hbar':props+=`<line x1="34" y1="${pr.y}" x2="88" y2="${pr.y}" stroke-width="4" stroke-linecap="round" ${st}/>`;break;
      case 'pbar':props+=`<line x1="46" y1="${pr.y+1}" x2="80" y2="${pr.y+1}" stroke-width="4" stroke-linecap="round" ${st}/><line x1="76" y1="${pr.y+1}" x2="76" y2="100" stroke-width="3" ${st}/>`;break;
      case 'cable':props+=`<line x1="${pr.from[0]}" y1="${pr.from[1]}" x2="${A.w[0]}" y2="${A.w[1]}" stroke-width="1.5" stroke-dasharray="3 2" ${st}>${an('x2',A.w[0],B.w[0])}${an('y2',A.w[1],B.w[1])}</line>`;break;
      case 'db':props+=at(pr.at,-6,-3,'rect',`width="12" height="6" rx="2" fill="var(--fig-dark)"`);break;
      case 'bag':props+=at(pr.at,-6,-1,'rect',`width="12" height="14" rx="4" fill="var(--fig-dark)"`);break;
      case 'pad':props+=at(pr.at,-3,-4,'rect',`width="6" height="8" rx="2" fill="var(--fig-dark)"`);break;
      case 'platform':props+=at(pr.at,1,-12,'rect',`width="4" height="24" rx="2" fill="var(--fig-dark)"`);break;
      case 'plate':props+=at(pr.at,0,0,'circle',`r="${pr.r||10}" fill="var(--fig-prop)" stroke="var(--fig-dark)" stroke-width="2.5"`,'cx','cy');break;
      case 'disc':case 'wheel':props+=at(pr.at,0,0,'circle',`r="6" fill="var(--fig-prop)" stroke="var(--fig-dark)" stroke-width="2.5"`,'cx','cy');break;
    }
  });
  const back=`<g stroke="var(--lvl-text)" stroke-width="5" stroke-linecap="round" opacity=".38">${line('s','e2')}${line('e2','w2')}${line('p','k2')}${line('k2','f2')}</g>`;
  const front=`<g stroke="var(--lvl-text)" stroke-width="5.5" stroke-linecap="round">${line('s','h')}${line('s','p')}${line('p','k')}${line('k','f')}${line('s','e')}${line('e','w')}</g>`;
  const head=at('h',0,0,'circle','r="7" fill="var(--lvl-text)"','cx','cy');
  return `<svg class="${cls}" viewBox="0 -10 120 116" role="img" aria-label="Animated drawing of the exercise"><line x1="0" y1="101.5" x2="120" y2="101.5" stroke="var(--line)" stroke-width="3"/>${props}${back}${front}${head}</svg>`;
}

/* ---------- Swaps: easier / no-equipment alternatives ---------- */
const ALT = {
  knee_pushup:['incline_pushup'],incline_pushup:['knee_pushup'],pushup:['knee_pushup','incline_pushup'],backpack_row:['bird_dog'],
  shoulder_tap:['plank'],plank:['side_plank'],side_plank:['plank'],squat:['glute_bridge','wall_sit'],glute_bridge:['squat'],
  calf_raise_bw:['step_up'],dead_bug:['bird_dog'],bird_dog:['dead_bug'],backpack_curl:['backpack_row'],chair_dip:['knee_pushup'],
  reverse_lunge:['step_up','squat'],wall_sit:['squat'],step_up:['reverse_lunge'],
  lat_pulldown:['backpack_row','pullup'],db_press:['pushup'],db_curl:['backpack_curl'],goblet_squat:['squat'],db_rdl:['glute_bridge'],
  leg_extension:['wall_sit','squat'],incline_db_press:['incline_pushup','pushup'],cable_row:['backpack_row'],lateral_raise:['shoulder_tap'],
  tricep_pushdown:['chair_dip'],db_lunge:['reverse_lunge'],leg_press:['goblet_squat','squat'],calf_raise:['calf_raise_bw'],knee_raise:['dead_bug'],
  bench_press:['incline_db_press','pushup'],pullup:['lat_pulldown','backpack_row'],ohp:['db_press'],barbell_curl:['db_curl'],
  back_squat:['goblet_squat','leg_press'],rdl:['db_rdl'],decline_situp:['dead_bug'],incline_bench:['incline_db_press'],
  barbell_row:['cable_row','backpack_row'],dips:['chair_dip','pushup'],deadlift:['rdl','db_rdl'],bulgarian:['db_lunge','reverse_lunge'],
  leg_raise:['knee_raise'],ab_wheel:['plank'],
};

/* ---------- Guided warm-up (5 minutes) ---------- */
const WARMUP = [
  {n:'March on the spot',fig:'_march',s:45,tip:'Lift your knees and swing your arms.'},
  {n:'Arm circles',fig:'_arms',s:40,tip:'Small circles forward, then backward.'},
  {n:'Jumping jacks',fig:'_jacks',s:40,tip:'Too much? Step side to side instead.'},
  {n:'Slow squats',fig:'_squat',s:40,tip:'Sit back like a chair. Nice and slow.'},
  {n:'Hip circles',e:'🌀',s:30,tip:'Hands on hips. Draw big circles both ways.'},
  {n:'Lunges',fig:'_lunge',s:40,tip:'Step back gently. Switch legs each time.'},
  {n:'Glute bridges',fig:'_bridge',s:30,tip:'Squeeze at the top.'},
  {n:'Inchworm walk-outs',fig:'_inch',s:35,tip:'Bend down, walk your hands out to a plank, walk back.'},
];

/* ---------- Badges ---------- */
const BADGES = [
  {id:'first',e:'🥇',n:'First workout',d:'Finish your first workout',t:s=>s.workouts>=1},
  {id:'w5',e:'🖐️',n:'High five',d:'Finish 5 workouts',t:s=>s.workouts>=5},
  {id:'w10',e:'🔟',n:'Perfect 10',d:'Finish 10 workouts',t:s=>s.workouts>=10},
  {id:'w25',e:'🏅',n:'Committed',d:'Finish 25 workouts',t:s=>s.workouts>=25},
  {id:'w50',e:'🎖️',n:'Half century',d:'Finish 50 workouts',t:s=>s.workouts>=50},
  {id:'w100',e:'💯',n:'Legend',d:'Finish 100 workouts',t:s=>s.workouts>=100},
  {id:'st2',e:'🔥',n:'On fire',d:'Work out 2 weeks in a row',t:s=>s.bestStreak>=2},
  {id:'st4',e:'🌋',n:'Unstoppable',d:'Work out 4 weeks in a row',t:s=>s.bestStreak>=4},
  {id:'st8',e:'👑',n:'Royalty',d:'Work out 8 weeks in a row',t:s=>s.bestStreak>=8},
  {id:'full',e:'🗓️',n:'Full week',d:'Do all 4 workouts in one week',t:s=>s.fullWeek},
  {id:'sets100',e:'💪',n:'100 sets',d:'Complete 100 sets',t:s=>s.sets>=100},
  {id:'sets500',e:'🦾',n:'Iron body',d:'Complete 500 sets',t:s=>s.sets>=500},
  {id:'pr',e:'📈',n:'New record',d:'Beat your best on any exercise',t:s=>s.pr},
  {id:'warm5',e:'🤸',n:'Warm & ready',d:'Do 5 guided warm-ups',t:s=>s.warmups>=5},
  {id:'coach',e:'💬',n:'Curious mind',d:'Ask Coach 5 questions',t:s=>s.questions>=5},
  {id:'inter',e:'⬆️',n:'Level up',d:'Do a workout on Intermediate',t:s=>s.levels.has('intermediate')},
  {id:'expert',e:'🦁',n:'Beast mode',d:'Do a workout on Expert',t:s=>s.levels.has('expert')},
  {id:'chal',e:'🏆',n:'Challenge champ',d:'Complete a monthly challenge',t:s=>s.challenges>=1},
  {id:'goal',e:'🎯',n:'Goal getter',d:'Reach a goal you set',t:s=>s.goals>=1},
  {id:'habit7',e:'🌱',n:'Habit hero',d:'Keep a daily habit going 7 days in a row',t:s=>s.habitBest>=7},
];
const AVATARS=['🙂','🦁','🐯','🐼','🐨','🦊','🐸','🐵','🦄','🐲','🐬','🦖','🐱','🐶','🚀','⚽'];

/* ---------- More exercises (library expansion) ---------- */
POSES.superman={a:'h:94,94 s:84,97 e:96,97 w:108,96 p:54,98 k:34,98 f:14,98',b:'h:96,86 s:84,92 e:96,86 w:108,80 p:54,98 k:34,94 f:14,88'};
POSES.climber={a:'h:95,68 s:85,72 e:85,86 w:85,100 p:56,84 k:37,91 f:18,99 k2:70,86 f2:58,98',b:'h:95,68 s:85,72 e:85,86 w:85,100 p:56,84 k:70,86 f:58,98 k2:37,91 f2:18,99',dur:.9};
POSES.sidelunge={a:'h:60,18 s:60,30 e:56,44 w:58,56 e2:64,44 w2:62,56 p:60,60 k:55,80 f:52,100 k2:65,80 f2:68,100',b:'h:50,34 s:50,46 e:56,58 w:62,64 e2:44,58 w2:40,64 p:52,74 k:40,86 f:34,100 k2:74,80 f2:92,100'};
POSES.twist={a:'h:46,58 s:49,68 e:60,70 w:68,64 e2:58,76 w2:68,70 p:62,96 k:76,82 f:90,88',b:'h:44,58 s:49,68 e:38,72 w:30,66 e2:40,78 w2:30,72 p:62,96 k:76,82 f:90,88',dur:1.6};
POSES.burpee={a:'h:55,18 s:55,28 e:50,14 w:46,2 e2:60,14 w2:64,2 p:55,58 k:56,78 f:55,98',b:'h:95,68 s:85,72 e:85,86 w:85,100 p:56,84 k:37,91 f:18,99',dur:1.6};
POSES.flutter={a:'h:20,93 s:30,96 e:44,99 w:58,99 p:60,96 k:78,92 f:96,88 k2:78,96 f2:96,98',b:'h:20,93 s:30,96 e:44,99 w:58,99 p:60,96 k:78,96 f:96,98 k2:78,92 f2:96,88',dur:.8};
POSES.carry={a:'h:55,18 s:55,28 e:55,44 w:56,58 p:55,58 k:62,76 f:60,96 k2:50,78 f2:46,98',b:'h:58,18 s:58,28 e:58,44 w:59,58 p:58,58 k:52,78 f:48,98 k2:64,76 f2:62,96',dur:1};
POSES.frontsquat={a:'h:57,18 s:55,30 e:66,32 w:60,28 p:55,60 k:56,80 f:55,100',b:'h:57,43 s:55,55 e:66,57 w:60,53 p:43,80 k:62,81 f:55,100',props:[{t:'plate',at:'w',r:9}]};
POSES.pushpress={a:'h:55,24 s:55,34 e:60,47 w:60,33 p:55,64 k:60,82 f:55,100',b:'h:55,20 s:55,30 e:58,16 w:60,3 p:55,60 k:56,80 f:55,100',dur:1.6};
POSES.facepull={a:'h:44,48 s:42,58 e:56,58 w:70,56 p:40,88 k:56,78 f:72,90',b:'h:42,48 s:40,58 e:34,46 w:48,46 p:40,88 k:56,78 f:72,90',props:[{t:'cable',from:[110,50]},{t:'seat',x:28,y:90,w:24}]};
POSES.skull={a:'h:28,74 s:38,77 e:40,56 w:40,42 p:66,78 k:82,80 f:86,100',b:'h:28,74 s:38,77 e:40,56 w:26,64 p:66,78 k:82,80 f:86,100',props:[{t:'bench',x:20,y:81,w:54}]};
POSES.hipthrust={a:'h:20,74 s:28,80 e:40,86 w:50,92 p:52,96 k:72,82 f:84,100',b:'h:20,74 s:28,80 e:40,80 w:52,78 p:54,78 k:74,76 f:84,100',props:[{t:'box',x:6,y:80,w:24,h:20}]};

Object.assign(EX,{
  jumping_jacks:{name:'Jumping Jacks',e:'⭐',m:['Whole body','Heart'],steps:['Stand tall, arms by your sides.','Jump your feet out wide and swing your arms overhead.','Jump back to the start. Keep a steady rhythm.'],tip:'Low-impact version: step one foot out at a time.'},
  high_knees:{name:'High Knees',e:'🏃',m:['Legs','Heart'],time:true,steps:['Stand tall and run on the spot.','Bring each knee up to hip height.','Pump your arms and stay light on your toes.'],tip:'Go slower and march if you need a break.'},
  mountain_climber:{name:'Mountain Climbers',e:'⛰️',m:['Core','Shoulders','Heart'],time:true,steps:['Start in a push-up position.','Drive one knee towards your chest, then switch fast.','Keep your hips low and your hands under your shoulders.'],tip:'Go slower to keep your hips steady.'},
  superman:{name:'Superman',e:'🦸',m:['Back','Glutes'],steps:['Lie on your tummy with arms stretched in front.','Lift your arms, chest and legs a little off the floor.','Hold for 2 seconds, then lower slowly.'],tip:'Look at the floor to keep your neck relaxed.'},
  side_lunge:{name:'Side Lunges',e:'↔️',m:['Legs','Glutes'],per:'each side',steps:['Stand with feet together.','Take a big step to the side and sit back into that hip. Other leg stays straight.','Push back to the middle and switch sides.'],tip:'Keep your chest up and your heel down.'},
  sumo_squat:{name:'Sumo Squats',e:'🤼',m:['Legs','Glutes'],steps:['Stand with feet wide, toes pointing out.','Sit straight down, knees pushing out over your toes.','Stand up and squeeze your bottom.'],tip:'Hold a backpack or dumbbell to make it harder.'},
  single_leg_bridge:{name:'Single-Leg Glute Bridge',e:'🌉',m:['Glutes','Hamstrings'],per:'each leg',steps:['Lie on your back, knees bent.','Lift one foot off the floor.','Push through the other heel to lift your hips. Lower slowly.'],tip:'Keep your hips level, not tilted.'},
  crunch:{name:'Crunches',e:'🔄',m:['Abs'],steps:['Lie on your back, knees bent, hands by your ears.','Curl your shoulders up off the floor using your tummy.','Lower slowly.'],tip:"Don't pull on your neck. Imagine an apple under your chin."},
  flutter_kicks:{name:'Flutter Kicks',e:'🏊',m:['Core','Hip flexors'],time:true,steps:['Lie on your back with legs straight.','Lift your feet a little off the floor.','Kick up and down in small, fast movements.'],tip:'Press your lower back into the floor. Hands under hips can help.'},
  russian_twist:{name:'Russian Twists',e:'🌪️',m:['Core','Obliques'],per:'each side',steps:['Sit with knees bent, lean back a little.','Hold your hands together in front of your chest.','Turn your shoulders side to side, touching the floor beside your hip.'],tip:'Keep feet on the floor until this feels easy.'},
  burpee:{name:'Burpees',e:'💥',m:['Whole body','Heart'],steps:['From standing, squat down and put your hands on the floor.','Jump or step your feet back to a push-up position.','Jump or step back in, then stand up and reach high.'],tip:'Step instead of jumping to make it easier.'},
  db_row:{name:'One-Arm Dumbbell Row',e:'🚣',m:['Back','Biceps'],weight:true,per:'each arm',start:'20 lbs',steps:['Put one hand and knee on a bench, back flat.','Hold a dumbbell in the other hand, arm straight.','Pull it to your hip, then lower slowly.'],tip:'Pull your elbow back, not up.'},
  db_bench:{name:'Dumbbell Bench Press',e:'🏋️',m:['Chest','Triceps'],weight:true,start:'20 lbs each',steps:['Lie on a bench with dumbbells at chest level.','Press them up until your arms are straight.','Lower slowly to the sides of your chest.'],tip:'Feet flat and shoulder blades squeezed together.'},
  arnold_press:{name:'Arnold Press',e:'🔁',m:['Shoulders'],weight:true,start:'12 lbs each',steps:['Sit tall, dumbbells in front of your shoulders, palms facing you.','Press up while turning your palms forward.','Reverse the turn as you lower.'],tip:'Go lighter than a normal shoulder press.'},
  hammer_curl:{name:'Hammer Curls',e:'🔨',m:['Biceps','Forearms'],weight:true,start:'15 lbs each',steps:['Stand holding dumbbells with palms facing each other.','Curl up, keeping your elbows by your sides.','Lower slowly.'],tip:'No swinging. Keep your wrists straight.'},
  skull_crusher:{name:'Dumbbell Skull Crushers',e:'💀',m:['Triceps'],weight:true,start:'12 lbs each',steps:['Lie on a bench holding dumbbells above your chest.','Bend only your elbows to lower the weights beside your head.','Straighten your arms to lift back up.'],tip:'Keep your upper arms still and pointing up.'},
  face_pull:{name:'Face Pulls',e:'🎯',m:['Rear shoulders','Upper back'],weight:true,start:'25 lbs',steps:['Set a rope at face height on a cable machine.','Pull the rope towards your face, elbows high and wide.','Squeeze your shoulder blades, then return slowly.'],tip:'Great for posture. Go light and smooth.'},
  hip_thrust:{name:'Hip Thrusts',e:'🍑',m:['Glutes','Hamstrings'],weight:true,start:'45 lbs',steps:['Sit with your upper back against a bench, weight across your hips.','Push through your heels to lift your hips until your body is flat.','Squeeze your glutes at the top, then lower.'],tip:'Use a pad on the bar for comfort.'},
  farmer_carry:{name:"Farmer's Carry",e:'🧺',m:['Grip','Core','Shoulders'],weight:true,time:true,start:'25 lbs each',steps:['Pick up a heavy dumbbell in each hand.','Stand tall with shoulders back.','Walk with small, steady steps.'],tip:"Don't let the weights swing or your shoulders shrug."},
  chin_up:{name:'Chin-Ups',e:'🧗',m:['Back','Biceps'],steps:['Hang from a bar with palms facing you, shoulder-width.','Pull until your chin is over the bar.','Lower all the way down slowly.'],tip:'Use a band or the assisted machine if needed.'},
  front_squat:{name:'Front Squat (Barbell)',e:'🦍',m:['Quads','Core','Glutes'],weight:true,bar:true,start:'65 lbs',steps:['Rest the bar on the front of your shoulders, elbows high.','Sit straight down, keeping your chest tall.','Drive up through your whole foot.'],tip:'Elbows up! If they drop, the bar rolls forward.'},
  sumo_deadlift:{name:'Sumo Deadlift (Barbell)',e:'⚡',m:['Glutes','Legs','Back'],weight:true,bar:true,start:'115 lbs',steps:['Stand wide with toes out, grip the bar inside your knees.','Chest up, back flat, push your knees out.','Push the floor away and stand tall.'],tip:'Keep the bar touching your legs.'},
  close_grip_bench:{name:'Close-Grip Bench Press',e:'🏋️',m:['Triceps','Chest'],weight:true,bar:true,start:'65 lbs',steps:['Lie on the bench, hands shoulder-width on the bar.','Lower to your lower chest, elbows close to your body.','Press back up.'],tip:'Always use a spotter or safety pins.'},
  pendlay_row:{name:'Pendlay Row (Barbell)',e:'🚣',m:['Back','Biceps'],weight:true,bar:true,start:'75 lbs',steps:['Bend over with your back flat, bar on the floor.','Pull the bar explosively to your lower chest.','Lower it back to the floor each rep.'],tip:'Reset your back position every rep.'},
  push_press:{name:'Push Press (Barbell)',e:'🚀',m:['Shoulders','Legs','Triceps'],weight:true,bar:true,start:'65 lbs',steps:['Bar on your front shoulders, feet hip-width.','Dip your knees a little, then drive up with your legs.','Use that push to press the bar overhead.'],tip:"The dip is small and fast, so don't squat."},
  weighted_pullup:{name:'Weighted Pull-Ups',e:'🧗',m:['Back','Biceps'],weight:true,start:'10 lbs',steps:['Hang a weight from a belt or hold a dumbbell between your feet.','Pull your chest up to the bar.','Lower all the way down under control.'],tip:'Only add weight once you can do 10 clean pull-ups.'},
  barbell_hip_thrust:{name:'Barbell Hip Thrust',e:'🍑',m:['Glutes','Hamstrings'],weight:true,bar:true,start:'95 lbs',steps:['Upper back on a bench, bar padded across your hips.','Drive through your heels until your body is flat.','Pause and squeeze, then lower.'],tip:'Chin tucked and ribs down at the top.'},
  lateral_shuffle:{name:'Lateral Shuffle',e:'🦀',m:['Legs','Agility'],time:true,steps:['Get low in an athletic stance.','Shuffle quickly to one side for a few steps, then back.','Stay low and keep your feet apart.'],tip:"Don't let your feet touch or cross."},
});
['front_squat','sumo_deadlift','close_grip_bench','pendlay_row','push_press','barbell_hip_thrust'].forEach(k=>EX[k].bar=true);
['bench_press','back_squat','deadlift','rdl','ohp','incline_bench','barbell_row','barbell_curl'].forEach(k=>EX[k].bar=true);
Object.assign(FIG,{
  jumping_jacks:['jacks'],high_knees:['march'],mountain_climber:['climber'],superman:['superman'],side_lunge:['sidelunge'],
  sumo_squat:['sidelunge'],single_leg_bridge:['bridge'],crunch:['situp'],flutter_kicks:['flutter'],russian_twist:['twist'],burpee:['burpee'],
  db_row:['row',{t:'db',at:'w'}],db_bench:['bench',{t:'db',at:'w'}],arnold_press:['dbpress',{t:'db',at:'w'}],hammer_curl:['curl',{t:'db',at:'w'}],
  skull_crusher:['skull',{t:'db',at:'w'}],face_pull:['facepull'],hip_thrust:['hipthrust',{t:'disc',at:'p'}],farmer_carry:['carry',{t:'db',at:'w'}],
  chin_up:['pullup'],front_squat:['frontsquat'],sumo_deadlift:['deadlift'],close_grip_bench:['bench',{t:'plate',at:'w'}],
  pendlay_row:['row',{t:'plate',at:'w'}],push_press:['pushpress',{t:'plate',at:'w'}],weighted_pullup:['pullup'],
  barbell_hip_thrust:['hipthrust',{t:'plate',at:'p'}],lateral_shuffle:['sidelunge'],
});
Object.assign(ALT,{
  jumping_jacks:['high_knees'],high_knees:['jumping_jacks'],mountain_climber:['plank'],superman:['bird_dog'],side_lunge:['reverse_lunge'],
  sumo_squat:['squat'],single_leg_bridge:['glute_bridge'],crunch:['dead_bug'],flutter_kicks:['dead_bug'],russian_twist:['crunch'],burpee:['squat','jumping_jacks'],
  db_row:['backpack_row'],db_bench:['pushup'],arnold_press:['db_press'],hammer_curl:['db_curl'],skull_crusher:['chair_dip'],face_pull:['superman'],
  hip_thrust:['glute_bridge'],farmer_carry:['plank'],chin_up:['lat_pulldown'],front_squat:['goblet_squat'],sumo_deadlift:['deadlift','db_rdl'],
  close_grip_bench:['db_bench','pushup'],pendlay_row:['db_row'],push_press:['db_press'],weighted_pullup:['pullup'],barbell_hip_thrust:['hip_thrust','glute_bridge'],
  lateral_shuffle:['side_lunge'],
});
const MUSCLE_FILTERS=['Chest','Back','Shoulders','Arms','Core','Legs','Glutes','Heart'];
const exMatches=(ex,f)=>!f||ex.m.some(m=>m===f||(f==='Arms'&&/Biceps|Triceps|Forearms|Arms/.test(m))||(f==='Legs'&&/Legs|Quads|Hamstrings|Calves/.test(m))||(f==='Core'&&/Core|Abs|Obliques/.test(m))||(f==='Shoulders'&&/Shoulders/.test(m))||(f==='Chest'&&/Chest/.test(m))||(f==='Back'&&/Back/.test(m))||(f==='Heart'&&/Heart|Whole body/.test(m)));

/* ---------- Sport plans (built from the library) ---------- */
const SPORTS=[
  {id:'cricket',e:'🏏',name:'Cricket',sub:'Rotation power, quick feet, strong shoulders',items:[['high_knees',3,20,30],['russian_twist',3,10,12],['side_lunge',3,8,10],['reverse_lunge',3,8,10],['superman',3,10,12],['shoulder_tap',3,8,12],['lateral_shuffle',3,20,30]]},
  {id:'soccer',e:'⚽',name:'Soccer',sub:'Speed, agility and strong legs',items:[['high_knees',3,20,30],['squat',3,12,15],['side_lunge',3,8,10],['single_leg_bridge',3,8,10],['calf_raise_bw',3,15,20],['side_plank',3,20,30],['lateral_shuffle',3,20,30]]},
  {id:'swimming',e:'🏊',name:'Swimming',sub:'Strong back, shoulders and core',items:[['superman',3,10,12],['knee_pushup',3,8,12],['backpack_row',3,10,12],['flutter_kicks',3,20,30],['shoulder_tap',3,8,12],['plank',3,20,40]]},
  {id:'running',e:'🏃',name:'Running',sub:'Injury-proof legs and a steady core',items:[['reverse_lunge',3,8,10],['step_up',3,8,10],['single_leg_bridge',3,8,10],['calf_raise_bw',3,15,20],['side_plank',3,20,30],['dead_bug',3,8,10]]},
  {id:'basketball',e:'🏀',name:'Basketball',sub:'Jumping power and quick moves',items:[['jumping_jacks',3,20,30],['squat',3,12,15],['step_up',3,8,10],['lateral_shuffle',3,20,30],['calf_raise_bw',3,15,20],['burpee',3,6,10],['plank',3,20,40]]},
];
const ACTIVITIES=[['🚶','Walk'],['🏃','Run'],['🚴','Bike'],['🏊','Swim'],['🏏','Cricket'],['⚽','Soccer'],['🏀','Basketball'],['🎾','Tennis'],['🏓','Pickleball'],['💃','Dance'],['🧘','Yoga'],['🥋','Martial arts'],['🧘','Stretch'],['⏱️','Intervals'],['⭐','Other']];
const MUSCLE_KEYS={Chest:['chest'],'Upper Chest':['chest'],Shoulders:['shoulders'],'Rear shoulders':['shoulders','upperback'],Back:['upperback','lowerback'],'Upper back':['upperback'],'Whole back side':['upperback','lowerback','glutes','hams'],
  Biceps:['biceps'],Triceps:['triceps'],Arms:['biceps','triceps'],Forearms:['forearms'],Grip:['forearms'],Core:['abs'],Abs:['abs'],Obliques:['abs'],'Hip flexors':['quads'],
  Legs:['quads','hams','calves'],Quads:['quads'],Hamstrings:['hams'],Glutes:['glutes'],Calves:['calves'],'Whole body':['quads','chest','upperback','abs'],Agility:['quads','calves'],Heart:[]};

/* ===== js/store.js ===== */
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
// Habit ticks: {"2026-10-30": {u: time, c: {water: 3}}}, last 120 days only.
function cleanHabitLog(l){
  const o={};if(!l||typeof l!=='object'||Array.isArray(l))return o;
  Object.keys(l).filter(d=>ISO_RE.test(d)).sort().slice(-120).forEach(d=>{const day=l[d];if(!day||typeof day!=='object'||!day.c||typeof day.c!=='object')return;
    const c={};Object.entries(day.c).slice(0,20).forEach(([k,v])=>{if(/^[a-z0-9_]{1,30}$/.test(k))c[k]=Math.round(cleanNum(v,20))});o[d]={u:cleanNum(day.u,1e14),c}});
  return o;
}
function sanitizeProfile(p){
  if(!p||typeof p!=='object'||!/^p[a-z0-9]{1,40}$/.test(String(p.id||'')))return null;
  const o={id:p.id,name:cleanText(p.name,24),avatar:AVATARS.includes(p.avatar)?p.avatar:'🙂',level:['beginner','intermediate','expert'].includes(p.level)?p.level:'beginner',
    unit:p.unit==='kg'?'kg':'lbs',rest:['auto','45','60','90','120'].includes(String(p.rest))?String(p.rest):'auto',
    warmups:cleanNum(p.warmups,1e5),questions:cleanNum(p.questions,1e6),updated:cleanNum(p.updated,1e14),fivesSeen:cleanNum(p.fivesSeen,1e14),
    badges:(Array.isArray(p.badges)?p.badges:[]).filter(b=>BADGES.some(x=>x.id===b)),photos:!!p.photos,toured:!!p.toured,
    todayHide:(Array.isArray(p.todayHide)?p.todayHide:[]).filter(k=>['habits','phase','challenge','goal','family','badges','tip'].includes(k)),
    chDone:(Array.isArray(p.chDone)?p.chDone:[]).slice(-60).map(x=>cleanText(x,30)).filter(x=>/^\d{4}-\d{2}-[a-z]+$/.test(x)),
    goals:(Array.isArray(p.goals)?p.goals:[]).slice(-20).filter(g=>g&&['lift','reps','workouts','minutes'].includes(g.type)&&ISO_RE.test(String(g.start))&&ISO_RE.test(String(g.by))).map(g=>({id:cleanText(g.id,30)||newPid(),type:g.type,ex:cleanText(g.ex,60),target:cleanNum(g.target,1e6),start:g.start,by:g.by,done:ISO_RE.test(String(g.done))?g.done:null}))};
  if(ISO_RE.test(String(p.planStart)))o.planStart=p.planStart;
  if(p.coachAI===false)o.coachAI=false;
  if(p.kid===true)o.kid=true;
  o.habits=(Array.isArray(p.habits)?p.habits:[]).filter(h=>h&&/^[a-z0-9_]{1,30}$/.test(String(h.id))).slice(0,8)
    .map(h=>({id:String(h.id),e:cleanEmoji(h.e,'⭐'),n:cleanText(h.n,24)||'Habit',t:Math.max(1,Math.min(20,Math.round(cleanNum(h.t,20))||1)),...(h.unit?{unit:cleanText(h.unit,12)}:{})}));
  o.hlog=cleanHabitLog(p.hlog);
  if(Array.isArray(p.gear))o.gear=[...new Set(p.gear)].filter(k=>['db','cable','smith','smithlp','barbell','ez','bench','pullbar','machines'].includes(k));
  o.videos={};Object.entries(p.videos&&typeof p.videos==='object'?p.videos:{}).slice(0,200).forEach(([k,v])=>{if(/^[a-z0-9_]{1,48}$/i.test(k)&&/^[A-Za-z0-9_-]{11}$/.test(String(v)))o.videos[k]=String(v)});
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
  const s={workouts:dates.length,sets:0,bestStreak:0,fullWeek:false,pr:false,warmups:profile.warmups||0,questions:profile.questions||0,levels:new Set(),challenges:(profile.chDone||[]).length,goals:(profile.goals||[]).filter(g=>g.done).length,habitBest:habitBestStreak()};
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
  loadCustom();applyGear();
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

/* ===== js/screens.js ===== */
/* KinFit · Onboarding, Today, guided timer, workout, rest timer and Progress screens. */
/* ---------- Onboarding ---------- */
let ob={step:0,answers:[],name:'',avatar:'🙂'};
function renderOnboard(v){
  const s=ob.step,canCancel=(ob.mode==='add'||ob.mode==='retake')&&profile.id;
  const cancel=canCancel?`<button class="link" id="cancelob">Cancel</button>`:'';
  if(s===0){
    v.innerHTML=`${topbar()}
    <div class="stack-lg" style="padding-top:20px">
      <div class="center"><div style="font-size:72px">🏋️‍♀️</div><h1 style="margin-top:10px">Get stronger,<br>one step at a time</h1>
      <p class="muted" style="margin-top:10px">Easy-to-follow workouts for <b>Beginner</b>, <b>Intermediate</b> and <b>Expert</b>. We'll help you pick the right one.</p></div>
      <div class="stack">
        <div class="card row"><span class="big-emoji">🧭</span><div><b>Find your level</b><p class="muted small">5 quick questions</p></div></div>
        <div class="card row"><span class="big-emoji">✅</span><div><b>Follow the plan</b><p class="muted small">Tap ✓ after each set and we'll time your rest</p></div></div>
        <div class="card row"><span class="big-emoji">🏅</span><div><b>Earn badges</b><p class="muted small">Watch yourself get stronger every week</p></div></div>
        <div class="card row"><span class="big-emoji">👨‍👩‍👧</span><div><b>Bring the family</b><p class="muted small">A profile for everyone, high-fives and a parent PIN</p></div></div>
      </div>
      <p class="small muted center" style="font-weight:700">✅ Free · No sign-up · No ads · Works offline</p>
      <button class="btn" id="start">Let's go! 🚀</button>
      <button class="btn ghost" id="pick">I already know my level</button>
      <p class="small muted center">🔒 Your workouts stay on your phone. <a href="privacy.html" style="color:var(--lvl-text)">Privacy</a> · <a href="about.html" style="color:var(--lvl-text)">About</a></p>
      <button class="link" id="joinsync" style="width:100%">☁️ Used KinFit before? Restore with your recovery code</button>
      <p class="small muted center"><a href="/workouts" style="color:var(--lvl-text)">📚 Browse the free workout plans and exercise library</a></p>
    </div>`;
    $('#joinsync').onclick=()=>joinSheet();
    $('#start').onclick=()=>{ob.step=1;render()};
    $('#pick').onclick=()=>{ob.step=1;ob.skipQuiz=true;render()};
    return;
  }
  if(s===1){
    v.innerHTML=`${topbar(cancel)}<div class="stack-lg" style="padding-top:20px">
      <div><p class="small muted" style="font-weight:700;margin-bottom:8px">WHO IS THIS FOR?</p><div class="seg"><button class="${ob.kid?'':'on'}" data-kid="0" aria-pressed="${!ob.kid}">🙋 Me</button><button class="${ob.kid?'on':''}" data-kid="1" aria-pressed="${!!ob.kid}">🧒 My child</button></div></div>
      <div><h1>${ob.kid?"What's your child's name? 👋":ob.mode==='add'?'Who is joining? 👋':'What should we call you? 👋'}</h1><p class="muted" style="margin-top:8px">${ob.kid?'A first name or nickname is perfect. You\'ll answer a few questions for them next.':'A first name or nickname is perfect.'}</p></div>
      <input class="txt" id="nm" maxlength="24" placeholder="Name" value="${esc(ob.name)}" autocomplete="off">
      <div><p class="small muted" style="font-weight:700;margin-bottom:8px">PICK A BUDDY</p><div class="avatars">${AVATARS.map(a=>`<button class="${a===ob.avatar?'sel':''}" data-a="${a}">${a}</button>`).join('')}</div></div>
      <button class="btn" id="next">Next</button></div>`;
    v.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ob.avatar=b.dataset.a;ob.name=$('#nm').value;renderOnboard(v)});
    v.querySelectorAll('[data-kid]').forEach(b=>b.onclick=()=>{ob.kid=b.dataset.kid==='1';ob.name=$('#nm').value;renderOnboard(v)});
    const next=()=>{ob.name=$('#nm').value.trim();ob.answers=[];ob.step=ob.skipQuiz?99:2;render()};
    $('#next').onclick=next;$('#nm').onkeydown=e=>{if(e.key==='Enter')next()};
    if($('#cancelob'))$('#cancelob').onclick=()=>go('me');
    return;
  }
  if(s>=2&&s<2+QUIZ.length){
    const i=s-2,Q=QUIZ[i];
    v.innerHTML=`${topbar(`<button class="link" id="back">← Back</button>`)}
    <div class="stack-lg">
      <div class="dots">${QUIZ.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div>
      <div><p class="muted small" style="font-weight:700">QUESTION ${i+1} OF ${QUIZ.length}${ob.kid?` · ANSWER FOR ${esc((ob.name||'YOUR CHILD').toUpperCase())}`:''}</p><h1 style="margin-top:6px">${Q.q}</h1>${Q.note?`<p class="muted small" style="margin-top:8px">${Q.note}</p>`:''}</div>
      <div class="stack">${Q.a.map((a,k)=>`<button class="opt ${ob.answers[i]===k?'sel':''}" data-k="${k}"><span class="e">${a[0]}</span>${a[1]}</button>`).join('')}</div>
    </div>`;
    v.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{ob.answers[i]=+b.dataset.k;b.classList.add('sel');setTimeout(()=>{ob.step++;render()},180)});
    $('#back').onclick=()=>{if(i===0&&ob.mode==='retake')return go('me');ob.step--;render()};
    return;
  }
  if(s===2+QUIZ.length){
    const {level,reason}=scoreQuiz();
    const L=LEVELS[level];
    v.innerHTML=`${topbar(cancel)}<div class="stack-lg" style="padding-top:10px">
      <div class="center"><div style="font-size:64px">${L.emoji}</div><p class="muted" style="font-weight:700;margin-top:6px">WE RECOMMEND</p><h1 style="color:${L.color};font-size:36px">${L.name}</h1>
      <p class="muted" style="margin-top:8px">${reason}</p></div>
      ${levelCard(level,true)}
      <button class="btn" style="background:${L.color}" id="ok">Start ${L.name} ${L.emoji}</button>
      <button class="btn ghost" id="other">Choose a different level</button></div>`;
    $('#ok').onclick=()=>finishOnboard(level);
    $('#other').onclick=()=>{ob.rec=level;ob.step=99;render()};
    if($('#cancelob'))$('#cancelob').onclick=()=>go('me');
    return;
  }
  v.innerHTML=`${topbar(`<button class="link" id="back">← Back</button>`)}<div class="stack-lg">
    <div><h1>Pick a level</h1><p class="muted" style="margin-top:8px">Not sure? Choose <b>Beginner</b>. You can move up anytime.</p></div>
    <div class="stack">${Object.keys(LEVELS).map(k=>`<button class="lvl" data-l="${k}" style="--c:${LEVELS[k].color};--cd:${LEVELS[k].dark}">${levelInner(k)}${ob.rec===k?'<p class="small" style="margin-top:8px;font-weight:700;color:var(--cc,var(--c))">⭐ Recommended for you</p>':''}</button>`).join('')}</div></div>`;
  v.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>finishOnboard(b.dataset.l));
  $('#back').onclick=()=>{ob.step=ob.rec?2+QUIZ.length:1;render()};
}
function scoreQuiz(){
  const a=ob.answers;const score=[0,1,2,3].reduce((s,i)=>s+(QUIZ[i].a[a[i]]?.[2]||0),0);
  let level=score<=2?'beginner':score<=5?'intermediate':'expert';
  let reason=level==='beginner'?'The perfect place to learn great form and build a strong base.':level==='intermediate'?'You have a good base. Time to add dumbbells and machines.':'You are experienced. Barbells and bigger lifts are next.';
  const age=a[4];
  if(age===0&&level!=='beginner'){level='beginner';reason='Under 13? Bodyweight training is the safest and best way to get strong. Ask an adult to help you check your form.'}
  else if(age===1&&level==='expert'){level='intermediate';reason='You are strong! Under 18, stick with dumbbells and machines unless a coach is watching your barbell lifts.'}
  else if(age===1)reason+=' Train with an adult or coach nearby when using weights.';
  return {level,reason};
}
function levelInner(k){const L=LEVELS[k];return `<div class="t"><span style="font-size:28px">${L.emoji}</span>${L.name}</div>
  <p style="margin-top:4px;font-weight:600">${L.tagline}</p><p class="muted small" style="margin-top:2px">🧰 ${L.equipment}</p>
  <p class="small" style="margin-top:10px;font-weight:700">Choose this if:</p><ul>${L.who.map(w=>`<li>${w}</li>`).join('')}</ul>`}
function levelCard(k,sel){return `<div class="lvl ${sel?'sel':''}" style="--c:${LEVELS[k].color};--cd:${LEVELS[k].dark}">${levelInner(k)}</div>`}
function finishOnboard(level){
  if(ob.mode==='retake'&&profile.id){profile.level=level;saveProfile();store.del(pKey('jams_active'))}
  else{
    const id=newPid();if(!DB.list.length&&!DB.legacyId)DB.legacyId=id; // first person adopts any older history
    profile=Object.assign({},DEFAULT_P,{id,name:ob.name,avatar:ob.avatar||'🙂',level,unit:profile.unit||'lbs'},ob.kid?{kid:true}:{});
    DB.current=id;saveProfile();chat=store.get(pKey('jams_chat'),[]);libLevel=null;chartEx=null;
    if(!syncCfg.code)autoBackup();
  }
  ob={step:0,answers:[],name:'',avatar:'🙂'};
  go('today');toast(`${LEVELS[level].emoji} ${profile.name||'You'}: ${LEVELS[level].name}. Let's do this!`);
}

/* ---------- Today ---------- */
function renderToday(v){
  const now=new Date(),dow=now.getDay(),sched=SCHEDULE[dow];
  const doneDates=new Set(workoutDates());
  const ws=weekStart(now);
  const strip=[1,2,3,4,5,6,0].map((d,i)=>{const dt=new Date(ws);dt.setDate(ws.getDate()+i);const s=SCHEDULE[d];
    const e=s.k in WORKOUTS?WORKOUTS[s.k].e:s.e;
    return `<div class="day ${d===dow?'today':''} ${doneDates.has(isoLocal(dt))?'done':''}"><b>${DAYS[d]}</b>${dt.getDate()}<span class="e">${e}</span></div>`}).join('');
  const active=store.get(pKey('jams_active'),null);
  const isWork=sched.k in WORKOUTS;
  const doneToday=doneDates.has(isoLocal());
  let heroHtml;
  if(active&&active.level===profile.level){
    const W=WORKOUTS[active.key]||{name:active.title,e:active.emoji};
    heroHtml=`<div class="card hero stack"><p class="muted" style="font-weight:700">⏸️ WORKOUT IN PROGRESS</p><h2>${esc(W.e)} ${esc(W.name)}</h2><button class="btn" data-start="${active.key}">Continue workout</button></div>`;
  }else if(isWork){
    const W=WORKOUTS[sched.k],plan=phasePlan(PLANS[profile.level][sched.k]);
    const mins=Math.round(plan.reduce((s,p)=>s+p[1],0)*(restSecs()+45)/60)+5;
    heroHtml=`<div class="card hero stack">
      <p class="muted" style="font-weight:700">${doneToday?'✅ DONE FOR TODAY. NICE!':"TODAY'S WORKOUT"}</p>
      <div class="row"><span class="big-emoji">${W.e}</span><div><h2>${W.name}</h2><p class="muted">${W.sub} · ${plan.length} exercises · ~${mins} min</p></div></div>
      <button class="btn" data-start="${sched.k}">${doneToday?'Do it again':'Start workout ▶'}</button></div>`;
  }else{
    heroHtml=`<div class="card hero stack"><div class="row"><span class="big-emoji">${sched.e}</span><div><h2>${sched.label}</h2><p class="muted">${sched.note}</p></div></div>
      <button class="btn" id="warmonly">Do the 5-min warm-up 🤸</button><button class="btn ghost-light" data-stretch="mob">🧘 10-min stretch & mobility</button></div>`;
  }
  const others=Object.keys(WORKOUTS).filter(k=>k!==sched.k).map(k=>{const W=WORKOUTS[k];
    return `<button class="card row" data-start="${k}" style="width:100%;text-align:left;padding:14px"><span class="ex-emoji">${W.e}</span><div style="flex:1"><b>${W.name}</b><p class="muted small">${W.sub}</p></div><span class="muted">›</span></button>`}).join('');
  const earned=earnedBadges().length;
  v.innerHTML=`${topbar(levelPill())}
  <div class="stack-lg">
    <div><h1>${hello()}${profile.name?', '+esc(profile.name):''}! ${esc(profile.avatar||'👋')}</h1><p class="muted" style="margin-top:4px">${now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</p></div>
    ${fivesCard()}
    ${heroHtml}
    ${backupCard()}
    ${streakCard()}
    ${habitsCard()}
    ${weekCard(strip,earned)}
    <button class="card row" id="logact" style="width:100%;text-align:left;padding:14px"><span class="big-emoji">🏃</span><div style="flex:1"><b>Log a sport or activity</b><p class="muted small">Walks, runs, cricket, soccer… they all count!</p></div><span class="muted" style="font-size:22px" aria-hidden="true">＋</span></button>
    <details class="card fold"><summary><b>${isWork?'Missed a day? Do a different workout':'Want to train anyway?'}</b></summary><div class="stack" style="margin-top:12px">${others}${(profile.routines||[]).map(r=>`<button class="card row" data-start="r:${r.id}" style="width:100%;text-align:left;padding:14px"><span class="ex-emoji">${r.e}</span><div style="flex:1"><b>${esc(r.name)}</b><p class="muted small">⭐ My workout · ${plural(r.items.length,'exercise')}</p></div><span class="muted">›</span></button>`).join('')}<button class="link" id="morew">Build your own or train for a sport ›</button></div></details>
    <div id="photoNudge"></div>
    ${todayHidden('tip')?'':tipOfDay()}
  </div>`;
  v.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startWorkout(b.dataset.start));
  v.querySelectorAll('button[data-go]:not(.streakpill)').forEach(b=>b.onclick=()=>go(b.dataset.go));
  if($('#warmonly'))$('#warmonly').onclick=()=>runWarmup();
  renderPhotoNudge();
  bindFamily(v);bindHabits(v);
  if($('#logact'))$('#logact').onclick=()=>activitySheet();
  if($('#tcust'))$('#tcust').onclick=customizeToday;
  v.querySelectorAll('.wrow[data-go]').forEach(b=>b.onclick=()=>b.dataset.go==='chal'?challengeSheet():go(b.dataset.go));
  if($('#fiveok'))$('#fiveok').onclick=()=>{profile.fivesSeen=Date.now();saveProfile();render()};
  if($('#morew'))$('#morew').onclick=()=>{libTab='mine';go('library')};
  bindBackup();
  maybeTour();
  checkChallenge();checkGoals();
}
const TIPS=['💧 Drink water before, during and after your workout.','🔥 Warm up for 5 minutes first. Try the guided warm-up!','🐢 Slow and controlled beats fast and sloppy.','😴 Sleep is when your muscles get stronger. Aim for 8–10 hours if you are a kid or teen.','🛑 Sore muscles are normal. Sharp pain is not. Stop and tell an adult.','🎯 Good form first. Add weight or reps only when the moves look and feel right.','🗣️ Breathe out when you push or lift. Never hold your breath.'];
function tipOfDay(){const t=TIPS[new Date().getDate()%TIPS.length];return `<div class="card"><p class="small muted" style="font-weight:700">TIP OF THE DAY</p><p style="margin-top:4px">${t}</p></div>`}

/* ---------- Guided runner (warm-up & timed exercises) ---------- */
let runner=null;
function runSequence(steps,opts={}){
  const st={i:0,end:0,left:steps[0].s,paused:false,started:Date.now(),stepStart:Date.now(),int:null,lock:null};runner=st;
  try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(l=>st.lock=l).catch(()=>{})}catch(e){}
  const close=(finished)=>{clearInterval(st.int);try{st.lock&&st.lock.release()}catch(e){}runner=null;closeLayer();if(finished&&opts.onFinish)opts.onFinish(st);else if(!finished&&opts.onStop)opts.onStop(st)};
  const draw=()=>{
    const s=steps[st.i],total=s.s,frac=Math.max(0,st.left)/total,R=88,C=2*Math.PI*R;
    $('#layer').innerHTML=`<div class="runner"><div class="runner-in stack-lg center">
      <div class="row between"><button class="link" id="rx">✕ ${opts.closeText||'Close'}</button><span class="small muted" style="font-weight:700">${steps.length>1?`STEP ${st.i+1} OF ${steps.length}`:''}</span></div>
      <div class="runner-fig">${s.ready?'<div style="font-size:84px">⏱️</div>':(s.fig&&figSvg(s.fig,'fig big'))||`<div style="font-size:84px">${s.e||'💪'}</div>`}</div>
      <div><h1>${esc(s.n)}</h1>${s.tip?`<p class="muted" style="margin-top:6px">${esc(s.tip)}</p>`:''}</div>
      <div class="ring"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="${R}" stroke="var(--line)" stroke-width="14" fill="none"/><circle id="arc" cx="100" cy="100" r="${R}" stroke="var(--lvl-text)" stroke-width="14" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-frac)}" transform="rotate(-90 100 100)"/></svg><div class="ring-t" id="rt">${Math.ceil(st.left)}</div></div>
      <div class="row" style="justify-content:center;gap:12px">
        ${steps.length>1?`<button class="btn sm ghost" id="rprev" ${st.i?'':'disabled'}>⏮</button>`:''}
        <button class="btn sm" id="rpause" style="min-width:120px">${st.paused?'▶ Go':'⏸ Pause'}</button>
        ${opts.doneBtn&&!s.ready?`<button class="btn sm secondary" id="rdone">✓ Done</button>`:`<button class="btn sm ghost" id="rnext">⏭ Skip</button>`}
      </div></div></div>`;
    $('#rx').onclick=()=>close(false);
    $('#rpause').onclick=()=>{st.paused=!st.paused;if(!st.paused)st.end=Date.now()+st.left*1000;draw()};
    if($('#rnext'))$('#rnext').onclick=()=>next();
    if($('#rprev'))$('#rprev').onclick=()=>{st.i=Math.max(0,st.i-1);begin()};
    if($('#rdone'))$('#rdone').onclick=()=>{st.stoppedAt=Math.round((Date.now()-st.stepStart)/1000);close(true)};
  };
  const begin=()=>{st.left=steps[st.i].s;st.end=Date.now()+st.left*1000;st.stepStart=Date.now();st.paused=false;st.lastC=null;say(steps[st.i].ready?'Get ready':steps[st.i].n);draw()};
  const next=()=>{if(st.i>=steps.length-1){beep();say('Done! Great job.');close(true);return}st.i++;beep(true);begin()};
  st.int=setInterval(()=>{if(st.paused||!$('#rt'))return;st.left=(st.end-Date.now())/1000;{const c=Math.ceil(st.left);if(c<=3&&c>=1&&c!==st.lastC&&steps[st.i].s>5){st.lastC=c;say(String(c))}}
    const s=steps[st.i],R=88,C=2*Math.PI*R;$('#rt').textContent=Math.max(0,Math.ceil(st.left));
    $('#arc').setAttribute('stroke-dashoffset',C*(1-Math.max(0,st.left)/s.s));
    if(st.left<=0)next()},200);
  begin();
}
function runWarmup(onDone){
  runSequence(WARMUP,{closeText:'Stop',onFinish:()=>{profile.warmups=(profile.warmups||0)+1;saveProfile();toast('🔥 Warmed up and ready!');if(onDone)onDone();else showNewBadges()}});
}

/* ---------- Workout ---------- */
let setEditing=null; // "exercise,set" being edited after it was ticked; every other finished set stays locked
function startWorkout(key){
  setEditing=null;
  if(key.includes(':'))return startCustom(key[0],key.slice(2));
  let a=store.get(pKey('jams_active'),null);
  if(!(a&&a.key===key&&a.level===profile.level)){
    if(!profile.planStart){profile.planStart=planStart()||isoLocal();saveProfile()}
    const plan=phasePlan(PLANS[profile.level][key]);
    a={key,level:profile.level,plan,date:isoLocal(),started:Date.now(),items:plan.map(p=>({id:p[0],sets:freshSets(p[0],p[1])}))};
    store.set(pKey('jams_active'),a);say(`Let's go! ${WORKOUTS[key].name}. First up: ${EX[plan[0][0]].name}.`);
  }
  go('workout',key);
}
function freshSets(id,n){
  const ex=EX[id],last=lastSession(ex.name);
  let w='';if(ex.weight&&last){const mx=Math.max(...last.sets.map(s=>s.weight||0));if(mx>0)w=round1(toUnit(mx,last.unit))}
  return Array.from({length:n},()=>({reps:'',weight:w,done:false}));
}
function progressHint(p,ex){
  const last=lastSession(ex.name);if(!last||!last.sets.length)return '';
  const hitTop=last.sets.length>=p[1]&&last.sets.every(s=>s.reps>=p[3]);
  if(!hitTop)return `<div class="hint">📋 Last time: ${last.sets.map(s=>s.reps+(ex.weight&&s.weight?' × '+round1(toUnit(s.weight,last.unit)):'')).join(', ')}. Try to beat it!</div>`;
  if(ex.weight)return `<div class="hint">🚀 You hit ${p[3]} reps on every set last time. Add ${profile.unit==='kg'?'2.5 kg':'5 lbs'} today!</div>`;
  return `<div class="hint">🚀 Crushed it last time! Try ${ex.time?'5 more seconds':'2 more reps'} per set${ex.time?'':' or a harder version'}.</div>`;
}
const howTo=id=>{const ex=EX[id];return `${gearNote(ex)}<details class="how"><summary>How to do it</summary>${(f=>f?`<div class="figbox">${f}</div>`:'')(figSvg(id,'fig big'))}<ol>${ex.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="tip">💡 ${esc(ex.tip)}</div>
  <a class="btn sm secondary" style="margin-bottom:12px;text-decoration:none;display:inline-flex" href="${ex.video||YTS(ex.name)}" target="_blank" rel="noopener">▶ ${ex.ownVideo?'Watch my video':'Watch a video'}</a> <button class="btn sm secondary" style="margin-bottom:12px;display:inline-flex" data-say="${id}">🔊 Read aloud</button>
  <button class="link small" style="display:block" data-myvid="${id}">🔗 ${ex.ownVideo?'Change my video':'Use my own YouTube video'}</button></details>`};
function renderWorkout(v){
  const a=store.get(pKey('jams_active'),null);if(!a){go('today');return}
  const W=WORKOUTS[a.key]||{name:a.title,e:a.emoji},plan=a.plan||PLANS[a.level][a.key];
  const total=a.items.reduce((s,it)=>s+it.sets.length,0),done=a.items.reduce((s,it)=>s+it.sets.filter(x=>x.done).length,0);
  v.innerHTML=`<div class="topbar"><button class="link" id="back">← Back</button><span class="row" style="gap:6px"><button class="pill" id="voice" aria-label="Voice coach on or off">${voiceOn?'🔊':'🔇'}</button><input type="date" id="wdate" value="${a.date}" max="${isoLocal()}" class="num" style="width:auto;height:40px;font-size:15px;padding:0 10px" aria-label="Workout date"></span></div>
  <div class="stack-lg">
    <div><p class="muted" style="font-weight:700">${esc(profile.avatar)} ${esc(profile.name||'')} · ${lvl().emoji} ${lvl().name.toUpperCase()}</p><h1>${esc(W.e)} ${esc(W.name)}</h1>
      <div class="row" style="margin-top:12px"><div class="progress" style="flex:1"><i style="width:${total?done/total*100:0}%"></i></div><b class="small">${done}/${total} sets</b></div></div>
    ${a.warm?`<div class="card small" style="background:var(--lvl-soft);border:0">✅ <b>Warmed up!</b> Now tap <b>✓</b> after each set.</div>`
      :`<div class="card stack" style="background:var(--lvl-soft);border:0"><p>🔥 <b>Warm up first!</b> 5 easy minutes so your body is ready.</p><button class="btn sm" id="warm" style="width:100%">Start guided warm-up 🤸</button><button class="link" id="skipwarm" style="padding:0">I already warmed up</button></div>`}
    ${a.items.map((it,i)=>{const p=it.p||plan[i],ex=EX[it.id],orig=it.orig||it.id,canSwap=(ALT[orig]||[]).length&&!it.sets.some(s=>s.done);
      const cols=`${ex.weight?'wt':'nowt'}${ex.time?' timed':''}`;return `
    <div class="card ex">
      <div class="ex-head"><div class="ex-emoji">${esc(ex.e)}</div><div style="flex:1"><div class="ex-title">${i+1}. ${esc(ex.name)}</div><div class="target">${repsText(p,ex)}</div>
        <div>${ex.m.map(m=>`<span class="chip">${esc(m)}</span>`).join('')}${ex.start&&!lastSession(ex.name)?`<span class="chip">Start ~${ex.start}</span>`:''}${it.orig?`<span class="chip">🔄 swapped</span>`:''}</div></div></div>
      ${progressHint(p,ex)}
      ${howTo(it.id)}
      <div class="sets">${it.sets.map((s,k)=>{const key=`${i},${k}`,editing=s.done&&setEditing===key,locked=s.done&&!editing,lk=locked?' disabled':'';return `
        <div class="set ${cols} ${s.done?'isdone':''} ${editing?'editing':''}">
          <div class="n">Set ${k+1}${editing?`<button class="link undone" data-undone="${key}" aria-label="Mark set ${k+1} not done">Not done</button>`:''}</div>
          <div><label aria-hidden="true">${ex.time?'Seconds':'Reps'}</label><button class="num numbtn" data-pick="${i},${k},reps" aria-label="Set ${k+1} ${ex.time?'seconds':'reps'}: ${s.reps!==''?esc(s.reps):'not set'}.${locked?' Locked':' Tap to change'}"${lk}>${s.reps!==''?esc(s.reps):`<span class="ph">${p[2]===p[3]?p[2]:p[2]+'–'+p[3]}</span>`}</button></div>
          ${ex.weight?`<div><label><span aria-hidden="true">Weight (${profile.unit})</span>${ex.bar&&!locked?`<button class="plate-btn" data-plate="${i},${k}" aria-label="Plate calculator">🧮</button>`:''}</label><button class="num numbtn" data-pick="${i},${k},weight" aria-label="Set ${k+1} weight: ${s.weight!==''?esc(s.weight)+' '+profile.unit:'not set'}.${locked?' Locked':' Tap to change'}"${lk}>${s.weight!==''?esc(s.weight):`<span class="ph">${profile.unit}</span>`}</button></div>`:''}
          ${ex.time&&!s.done?`<button class="check go" data-time="${i},${k}" aria-label="Start ${esc(ex.name)} timer">⏱</button>`:ex.time?'<span></span>':''}
          ${locked?`<button class="check" data-sedit="${key}" aria-label="Set ${k+1} done and locked. Tap to edit">✓<small>Edit</small></button>`
            :editing?`<button class="check save" data-check="${key}" aria-label="Save set ${k+1}">Save</button>`
            :`<button class="check" data-check="${key}" aria-label="Mark set ${k+1} done">✓</button>`}
        </div>`}).join('')}</div>
      ${it.sets.length&&it.sets.every(s=>s.done)?`<div class="effort">${it.effort?`<span class="small">Felt: <b>${EFF[it.effort]}</b></span> <button class="link" data-eff="${i},0">change</button>`:`<p class="small" style="font-weight:700">How did that feel?</p><div class="seg">${[1,2,3].map(n=>`<button data-eff="${i},${n}">${EFF[n]}</button>`).join('')}</div>`}</div>`:''}
      <div class="row between" style="margin-top:8px"><span><button class="link" data-add="${i}">＋ Set</button>${it.sets.length>1?` <button class="link" style="color:var(--muted);margin-left:10px" data-rm="${i}">− Set</button>`:''}</span>${canSwap?`<button class="link" data-swap="${i}">🔄 Swap exercise</button>`:''}</div>
    </div>`}).join('')}
    <button class="btn" id="finish">Finish workout 🎉</button>
    <button class="btn ghost" id="quit">Cancel workout</button>
  </div>`;
  const save=()=>store.set(pKey('jams_active'),a);
  const rerender=()=>{const y=scrollY;renderWorkout(v);scrollTo(0,y)};
  const markDone=(i,k)=>{const allDone=a.items.every(it=>it.sets.every(x=>x.done));if(allDone){hideTimer();toast('All sets done! Tap Finish 🎉');say('All sets done. Amazing work! Tap finish.')}else{nextSay=nextUp(a);say(`Nice! Rest ${restSecs()} seconds.`);startTimer(restSecs())}};
  v.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{
    const [i,k,f]=b.dataset.pick.split(','),it=a.items[+i],s=it.sets[+k],p=it.p||plan[+i],ex=EX[it.id],prev=it.sets[+k-1];
    if(s.done&&setEditing!==`${i},${k}`)return; // finished sets are locked until you tap Edit
    if(f==='reps')return pickNumber({title:`${esc(ex.name)} · set ${+k+1}`,value:s.reps!==''?s.reps:p[2],step:ex.time?5:1,max:ex.time?900:300,
      quick:[p[2],Math.round((p[2]+p[3])/2),p[3],prev&&prev.reps],unit:(ex.time?'seconds':'reps')+(ex.per?' '+ex.per:'')},val=>{s.reps=val;save();rerender()});
    const st=profile.unit==='kg'?2.5:5,old=s.weight,w=parseFloat(s.weight)||0;
    pickNumber({title:`${esc(ex.name)} · set ${+k+1} weight`,value:s.weight,step:st,max:3000,quick:[prev&&prev.weight,w?round1(w-st):'',w?round1(w+st):''],unit:profile.unit},val=>{
      s.weight=val;it.sets.forEach((x,j)=>{if(j>+k&&!x.done&&(x.weight===''||x.weight===old))x.weight=val});save();rerender()});
  });
  $('#wdate').onchange=e=>{a.date=e.target.value||isoLocal();save()};
  const warmDone=()=>{a.warm=true;save();rerender()};
  if($('#warm'))$('#warm').onclick=()=>runWarmup(warmDone);
  if($('#skipwarm'))$('#skipwarm').onclick=warmDone;
  v.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>{
    const [i,k]=b.dataset.check.split(',').map(Number),s=a.items[i].sets[k],p=a.items[i].p||plan[i];
    if(s.done){if(setEditing===`${i},${k}`){setEditing=null;save();rerender();toast('✏️ Set updated')}return} // saving an edit: no rest timer
    if(s.reps==='')s.reps=String(p[2]);
    s.done=true;setEditing=null;save();rerender();markDone(i,k);
  });
  v.querySelectorAll('[data-undone]').forEach(b=>b.onclick=()=>{const [i,k]=b.dataset.undone.split(',').map(Number);a.items[i].sets[k].done=false;setEditing=null;save();rerender()});
  v.querySelectorAll('[data-sedit]').forEach(b=>b.onclick=()=>{setEditing=b.dataset.sedit;rerender();
    const f=document.querySelector(`[data-pick="${setEditing},reps"]`);if(f)f.focus()});
  v.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{
    const [i,k]=b.dataset.time.split(',').map(Number),it=a.items[i],s=it.sets[k],p=it.p||plan[i],ex=EX[it.id];
    const target=parseInt(s.reps)||p[2];hideTimer();
    runSequence([{n:'Get ready…',s:3,ready:true,tip:ex.name},{n:ex.name+(ex.per?' ('+ex.per+')':''),s:target,fig:it.id,tip:ex.tip}],{doneBtn:true,closeText:'Cancel',
      onFinish:st=>{s.reps=String(st.stoppedAt!=null&&st.i===1?st.stoppedAt:target);s.done=true;save();rerender();markDone(i,k)}});
  });
  v.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const it=a.items[b.dataset.add];const l=it.sets[it.sets.length-1];it.sets.push({reps:'',weight:l?l.weight:'',done:false});save();rerender()});
  v.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{a.items[b.dataset.rm].sets.pop();save();rerender()});
  v.querySelectorAll('[data-swap]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.swap,it=a.items[i],orig=it.orig||it.id,opts=[orig,...ALT[orig]].filter(x=>x!==it.id);
    sheet(`<h2>Swap ${esc(EX[it.id].name)}</h2><p class="muted">Pick another exercise that works the same muscles. Great if it's too hard or you don't have the equipment.</p>
      <div class="stack">${opts.map(id=>{const ex=EX[id];return `<button class="who" data-to="${id}"><span class="av">${esc(ex.e)}</span><span style="flex:1;text-align:left"><b>${esc(ex.name)}</b><br><span class="small muted">${id===orig?'↩️ Back to the original':ex.weight?'Uses weights':'No equipment needed'} · ${ex.m.join(', ')}</span></span></button>`}).join('')}</div>
      <button class="btn ghost" id="cancel">Cancel</button>`,()=>{
      $('#cancel').onclick=closeLayer;
      document.querySelectorAll('[data-to]').forEach(x=>x.onclick=()=>{
        const to=x.dataset.to,base=plan[i];it.id=to;it.orig=to===orig?undefined:orig;
        it.p=to===orig||EX[to].time===EX[orig].time?undefined:[base[1],EX[to].time?20:8,EX[to].time?40:12];
        it.sets=freshSets(to,base[1]);save();closeLayer();rerender();toast(`🔄 Swapped to ${EX[to].name}`)});
    });
  });
  $('#back').onclick=()=>go('today');
  $('#quit').onclick=()=>confirmBox('Cancel this workout?','Sets you have not finished will not be saved.','Yes, cancel',()=>{store.del(pKey('jams_active'));go('today')},true);
  $('#finish').onclick=()=>finishWorkout(a);
  $('#voice').onclick=()=>{voiceOn=!voiceOn;store.set('jams_voice',voiceOn);if(voiceOn)say('Voice coach on');else try{speechSynthesis.cancel()}catch(e){}rerender()};
  v.querySelectorAll('[data-eff]').forEach(b=>b.onclick=()=>{const [i,n]=b.dataset.eff.split(',').map(Number);a.items[i].effort=n||undefined;save();rerender();if(n)say(n===1?'Nice! Next time we can make it harder.':n===3?'Good effort. Keep the same weight next time.':'Perfect.')});
  v.querySelectorAll('[data-plate]').forEach(b=>b.onclick=e=>{e.preventDefault();const [i,k]=b.dataset.plate.split(',').map(Number);platesSheet(parseFloat(a.items[i].sets[k].weight)||(profile.unit==='kg'?60:135))});
}
function finishWorkout(a){
  setEditing=null;
  const j=getJournal(),date=a.date||isoLocal(),before=recordsTable(j),fresh=[];let sets=0,vol=0;
  const time=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  a.items.forEach((it,i)=>{
    const ex=EX[it.id];
    const done=it.sets.filter(s=>s.done).map(s=>({reps:parseInt(s.reps)||0,weight:ex.weight?(parseFloat(s.weight)||0):0})).filter(s=>s.reps>0||s.weight>0);
    if(!done.length)return;
    const en={id:Date.now()+i,exercise:ex.name,timestamp:time,sets:done,unit:profile.unit,level:a.level,workout:a.key,u:Date.now()};if(it.effort)en.effort=it.effort;(j[date]=j[date]||[]).push(en);fresh.push(en);
    sets+=done.length;done.forEach(s=>vol+=s.reps*s.weight);
  });
  if(!sets){toast('Tap ✓ on at least one set first');return}
  setJournal(j);store.del(pKey('jams_active'));hideTimer();
  const mins=Math.max(1,Math.round((Date.now()-a.started)/60000));
  const nb=newBadges(),prs=findPRs(before,fresh),Wd=WORKOUTS[a.key]||{name:a.title,e:a.emoji};lastDone={title:Wd.name,e:Wd.e,sets,mins:Math.max(1,Math.round((Date.now()-a.started)/60000)),prs,badges:nb};
  celebrate(sets,mins,vol,nb,prs);
  syncNow(true);
}
function badgeRow(list){return list.length?`<div class="card stack"><h2 class="h3">🎉 New ${list.length>1?'badges':'badge'}!</h2><div class="badges">${list.map(b=>`<div class="badge-i on"><span>${b.e}</span><b>${b.n}</b></div>`).join('')}</div></div>`:''}
function showNewBadges(){const nb=newBadges();if(nb.length)sheet(`${badgeRow(nb)}<button class="btn" id="ok">Awesome!</button>`,()=>$('#ok').onclick=closeLayer)}
function celebrate(sets,mins,vol,badges,prs=[]){
  const colors=['#16a34a','#ea580c','#7c3aed','#2563eb','#eab308','#ec4899'];
  const conf=Array.from({length:60},(_,i)=>`<i class="confetti" style="left:${Math.random()*100}%;background:${colors[i%6]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.8}s"></i>`).join('');
  const praise=['Amazing work!','You crushed it!','Stronger than yesterday!','Way to go, champ!'][Math.floor(Math.random()*4)];
  $('#layer').innerHTML=`<div class="celebrate">${conf}<div class="stack-lg center" style="max-width:420px;width:100%;position:relative">
    <div style="font-size:84px">🏆</div><h1>${praise}${profile.name?'<br>'+esc(profile.name)+'!':''}</h1>
    <div class="stats"><div class="stat"><b>${sets}</b><span>sets</span></div><div class="stat"><b>${mins}</b><span>${mins===1?'minute':'minutes'}</span></div><div class="stat"><b>${weekStreak()}</b><span>week streak 🔥</span></div></div>
    ${prs.length?`<div class="card stack" style="text-align:left"><h2 class="h3">🏆 New personal ${prs.length>1?'records':'record'}!</h2>${prs.map(p=>`<p>⭐ ${esc(p)}</p>`).join('')}</div>`:''}
    ${badgeRow(badges)}
    ${vol>0?`<p class="muted">You moved <b>${Math.round(vol).toLocaleString()} ${profile.unit}</b> in total! 💪</p>`:'<p class="muted">Every rep makes you stronger. See you next time!</p>'}
    <div class="row" style="gap:8px"><button class="btn secondary" id="cshare" style="flex:1">📤 Share</button><button class="btn secondary" id="ccool" style="flex:1">🧘 Cool-down</button></div>
    <button class="btn" id="done">Done</button></div></div>`;
  $('#done').onclick=()=>{closeLayer();go('progress')};
  $('#cshare').onclick=()=>shareWorkout();
  $('#ccool').onclick=()=>{closeLayer();go('progress');runStretch('cool')};
  say(praise+(prs.length?' And you set a new personal record!':''));
}

/* ---------- Rest timer ---------- */
let timerEnd=0,timerInt=null;
function startTimer(sec){timerEnd=Date.now()+sec*1000;$('#timer').classList.add('show');tick();clearInterval(timerInt);timerInt=setInterval(tick,250)}
function hideTimer(){clearInterval(timerInt);$('#timer').classList.remove('show')}
function tick(){const left=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));$('#timer-t').textContent=`${Math.floor(left/60)}:${pad(left%60)}`;
  if(left===10&&tick.last!==10)say('10 seconds');tick.last=left;
  if(left<=0){hideTimer();beep();toast('⏰ Rest over. Next set!');say(nextSay||'Rest over. Next set!')}}
let audioCtx=null;
// iPhones only allow sound after a tap, so "unlock" audio on the first touch; later beeps (like rest-over) then work.
['touchend','click'].forEach(ev=>document.addEventListener(ev,function unlock(){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();
  const b=audioCtx.createBuffer(1,1,22050),src=audioCtx.createBufferSource();src.buffer=b;src.connect(audioCtx.destination);src.start(0)}catch(e){}document.removeEventListener(ev,unlock,true)},true));
function beep(short){try{navigator.vibrate&&navigator.vibrate(short?120:[200,100,200]);audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const c=audioCtx,o=c.createOscillator(),g=c.createGain();o.frequency.value=short?660:880;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.2,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+(short?.25:.6));o.start();o.stop(c.currentTime+.6)}catch(e){}}
$('#timer-add').onclick=()=>{timerEnd+=15000;tick()};
$('#timer-skip').onclick=hideTimer;

/* ---------- Library ---------- */
let libLevel=null;

/* ---------- Progress ---------- */
let chartEx=null;
function renderProgress(v){
  const j=getJournal(),dates=workoutDates(j);
  const totalSets=dates.reduce((s,d)=>s+j[d].reduce((a,e)=>a+(e.sets||[]).length,0),0);
  const names=[...new Set(dates.flatMap(d=>j[d].filter(e=>e.kind!=='activity'&&(e.sets||[]).length).map(e=>e.exercise)))].sort();
  if(!names.includes(chartEx))chartEx=names[0]||null;
  const lvlCount=dates.filter(d=>j[d].some(e=>e.level===profile.level)).length;
  const nextLvl=profile.level==='beginner'?'intermediate':profile.level==='intermediate'?'expert':null;
  const levelUp=nextLvl&&lvlCount>=24?`<div class="card stack" style="border:2px solid ${LEVELS[nextLvl].color}"><h2 class="h3">🎖️ Ready to level up?</h2><p class="muted">You've done ${lvlCount} workouts on ${lvl().name}. If the workouts feel easy and your form is solid, try <b>${LEVELS[nextLvl].name}</b>.</p><button class="btn sm" style="background:${LEVELS[nextLvl].color}" data-go-me>See levels</button></div>`:'';
  const ws=weekStart(new Date()),set=new Set(dates);
  let heat='';for(let w=11;w>=0;w--){let col='';for(let d=0;d<7;d++){const dt=new Date(ws);dt.setDate(ws.getDate()-w*7+d);const on=set.has(isoLocal(dt)),fut=dt>new Date();col+=`<i style="display:block;width:100%;aspect-ratio:1;border-radius:4px;background:${on?'var(--lvl-text)':fut?'transparent':'var(--line)'}"></i>`}heat+=`<div style="display:grid;gap:3px">${col}</div>`}
  const earned=new Set(earnedBadges());
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg">
    <div><h1>Your progress 📈</h1></div>
    <div class="stats"><div class="stat"><b>${dates.length}</b><span>workouts</span></div><div class="stat"><b>${weekStreak()}</b><span>week streak 🔥</span></div><div class="stat"><b>${totalSets}</b><span>sets done</span></div></div>
    <div class="row" style="gap:8px"><button class="btn sm secondary" id="openreport" style="flex:1">📄 Monthly report</button><button class="btn sm secondary" id="shareprog" style="flex:1">📤 Share progress</button></div>
    ${goalsCard()}
    ${challengeCard()}
    ${levelUp}
    ${familyCard()}
    ${activityCard()}
    ${habitsProgressCard()}
    <div class="card stack"><div class="row between"><h2 class="h3">Badges 🏅</h2><span class="small muted" style="font-weight:700">${earned.size} / ${BADGES.length}</span></div>
      <div class="badges">${BADGES.map(b=>`<button class="badge-i ${earned.has(b.id)?'on':''}" data-b="${b.id}"><span>${earned.has(b.id)?b.e:'🔒'}</span><b>${b.n}</b></button>`).join('')}</div>
      <p class="small muted">Tap a badge to see how to earn it.</p></div>
    ${muscleMap()}
    <div class="card stack"><h2 class="h3">Last 12 weeks</h2><div style="display:grid;grid-template-columns:repeat(12,1fr);gap:3px">${heat}</div><p class="small muted">Each square is a day. Coloured = you worked out. Aim for 3–4 a week!</p></div>
    <div class="card stack"><h2 class="h3">How am I improving?</h2>
      ${names.length?`<select class="sel" id="exsel">${names.map(n=>`<option ${n===chartEx?'selected':''}>${esc(n)}</option>`).join('')}</select><div id="chart"></div>`:`<div class="empty"><div class="big-emoji">🌱</div><p class="muted">Finish your first workout to see your progress chart here.</p></div>`}
    </div>
    ${recordsCard()}
    ${bodyCard()}
    <div id="photos"></div>
    <div class="stack"><h2 class="h3">History</h2>${historyHtml(j,dates)}</div>
  </div>`;
  if(names.length){drawChart();$('#exsel').onchange=e=>{chartEx=e.target.value;drawChart()}}
  renderPhotos();
  bindFamily(v);
  $('#openreport').onclick=()=>{reportMonth=null;go('report')};
  bindGoals(v);checkGoals();checkChallenge();
  $('#shareprog').onclick=shareProgress;
  if($('#logact'))$('#logact').onclick=()=>activitySheet();
  if($('#badd'))$('#badd').onclick=bodySheet;
  v.querySelectorAll('[data-bdel]').forEach(b=>b.onclick=()=>{const before=(profile.body||[]).slice();profile.body=before.filter(x=>x.id!==b.dataset.bdel);saveProfile();renderProgress(v);
    undoable('Measurement deleted',()=>{profile.body=before;saveProfile();renderProgress(v)},()=>syncNow(true))});
  v.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const B=BADGES.find(x=>x.id===b.dataset.b);toast(`${earned.has(B.id)?B.e+' Earned: ':'🔒 To unlock: '}${B.d}`)});
  v.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const [d,id]=b.dataset.del.split('|');
    const jj=getJournal(),entry=(jj[d]||[]).find(e=>String(e.id)===id);if(!entry)return;
    jj[d]=jj[d].filter(e=>String(e.id)!==id);if(!jj[d].length)delete jj[d];setJournal(jj);renderProgress(v);
    undoable(`${entry.exercise} deleted`,()=>{const j2=getJournal();(j2[d]=j2[d]||[]).push(entry);setJournal(j2);renderProgress(v)},()=>{addTomb(id);syncNow(true)})});
  v.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const [d,id]=b.dataset.edit.split('|');editEntry(d,id,()=>renderProgress(v))});
}
function historyHtml(j,dates){
  if(!dates.length)return `<div class="card empty"><div class="big-emoji">📒</div><p class="muted">No workouts yet. Your history will show up here.</p></div>`;
  return dates.slice().reverse().slice(0,30).map(d=>`<div><p class="small" style="font-weight:800;color:var(--lvl-text);margin-top:6px">${niceDate(d)}</p>
    ${j[d].map(e=>`<div class="hist"><div class="row between"><b>${esc(e.exercise)}</b><span style="white-space:nowrap"><span class="small muted">${esc(e.timestamp||'')}</span><button class="xbtn" data-edit="${d}|${esc(e.id)}" aria-label="Edit">✏️</button><button class="xbtn" data-del="${d}|${esc(e.id)}" aria-label="Delete">🗑️</button></span></div>
      <div>${e.kind==='activity'?`<span class="badge">⏱ <b>${e.minutes}</b> min</span>${e.distance?`<span class="badge">📍 <b>${e.distance}</b> ${e.dunit||''}</span>`:''}`:''}${e.effort?`<span class="badge">${EFF[e.effort]}</span>`:''}${(e.sets||[]).map((s,i)=>`<span class="badge">${i+1}: <b>${Number(s.reps)||0}</b>${s.weight?` × <b>${round1(toUnit(Number(s.weight),e.unit))}</b> ${profile.unit}`:''}</span>`).join('')}</div></div>`).join('')}</div>`).join('')
    +(dates.length>30?`<p class="small muted center">Showing the latest 30 days. Download a backup to keep everything.</p>`:'');
}
function editEntry(d,id,after){
  const j=getJournal(),e=(j[d]||[]).find(x=>String(x.id)===id);if(!e)return;
  if(e.kind==='activity')return activitySheet({d,id});
  const hasW=e.sets.some(s=>s.weight)||Object.values(EX).some(x=>x.name===e.exercise&&x.weight);
  let rows=e.sets.map(s=>({reps:s.reps,weight:s.weight?round1(toUnit(Number(s.weight),e.unit)):''}));
  const draw=()=>sheet(`<h2>✏️ ${esc(e.exercise)}</h2><p class="small muted">${niceDate(d)}</p>
    <div>${rows.map((r,i)=>`<div class="set ${hasW?'wt':'nowt'}" style="grid-template-columns:54px 1fr ${hasW?'1fr ':''}44px"><div class="n">Set ${i+1}</div>
      <div><label>Reps</label><input class="num" type="number" inputmode="numeric" min="0" value="${r.reps}" data-r="${i}"></div>
      ${hasW?`<div><label>${profile.unit}</label><input class="num" type="number" inputmode="decimal" step="0.5" min="0" value="${r.weight}" data-w="${i}"></div>`:''}
      <button class="xbtn" data-x="${i}" aria-label="Remove set" style="align-self:end;height:50px">✕</button></div>`).join('')}</div>
    <button class="link" id="addrow">＋ Add set</button>
    <button class="btn" id="save">Save changes</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{document.querySelectorAll('[data-r]').forEach(x=>rows[x.dataset.r].reps=x.value);document.querySelectorAll('[data-w]').forEach(x=>rows[x.dataset.w].weight=x.value)};
    $('#cancel').onclick=closeLayer;
    $('#addrow').onclick=()=>{read();rows.push({reps:'',weight:rows.length?rows[rows.length-1].weight:''});draw()};
    document.querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>{read();rows.splice(+x.dataset.x,1);draw()});
    $('#save').onclick=()=>{read();const sets=rows.map(r=>({reps:parseInt(r.reps)||0,weight:parseFloat(r.weight)||0})).filter(s=>s.reps>0||s.weight>0);
      if(!sets.length){toast('Add at least one set, or delete the entry instead');return}
      e.sets=sets;e.unit=profile.unit;e.u=Date.now();setJournal(j);closeLayer();toast('Saved ✅');after&&after();syncNow(true)};
  });
  draw();
}
let chartMetric='w';
function drawChart(){
  const j=getJournal(),pts=[];let useW=false;
  workoutDates(j).forEach(d=>{const es=j[d].filter(e=>e.exercise===chartEx&&(e.sets||[]).length);if(!es.length)return;
    const all=es.flatMap(e=>e.sets.map(s=>({w:toUnit(Number(s.weight)||0,e.unit),r:Number(s.reps)||0})));
    const mw=Math.max(...all.map(x=>x.w));if(mw>0)useW=true;
    pts.push({d,w:mw,r:Math.max(...all.map(x=>x.r)),e:Math.max(...all.map(x=>e1rm(x.w,x.r))),v:all.reduce((t,x)=>t+x.w*x.r,0)})});
  const m=useW?chartMetric:'r',vals=pts.map(p=>round1(p[m]));
  const label={w:`Heaviest weight (${profile.unit})`,e:`Estimated 1-rep max (${profile.unit})`,v:`Total volume (${profile.unit} lifted)`,r:'Best reps / seconds'}[m];
  const W=340,H=200,L=40,R=12,T=16,B=30;const max=Math.max(...vals)*1.15||1,min=0;
  const x=i=>pts.length===1?(L+W-R)/2:L+i*(W-L-R)/(pts.length-1),y=v=>T+(H-T-B)*(1-(v-min)/(max-min));
  const grid=[0,.5,1].map(f=>{const v=min+(max-min)*f;return `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(v)}</text>`}).join('');
  const path=vals.map((v,i)=>`${i?'L':'M'}${x(i)},${y(v)}`).join('');
  const area=pts.length>1?`<path d="${path}L${x(vals.length-1)},${y(0)}L${x(0)},${y(0)}Z" fill="var(--lvl-text)" opacity=".12"/>`:'';
  const dots=vals.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="var(--card)" stroke="var(--lvl-text)" stroke-width="2.5"><title>${niceDate(pts[i].d)}: ${v}</title></circle>`).join('');
  const lbl=i=>`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)">${parseIso(pts[i].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text>`;
  const diff=round1(vals[vals.length-1]-vals[0]);
  $('#chart').innerHTML=`${useW?`<div class="seg" style="margin-bottom:8px">${[['w','Heaviest'],['e','Est. 1RM'],['v','Volume']].map(o=>`<button class="${o[0]===m?'on':''}" data-cm="${o[0]}">${o[1]}</button>`).join('')}</div>`:''}
  <p class="small muted" style="font-weight:700">${label}</p><svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label} over time">${grid}${area}<path d="${path}" fill="none" stroke="var(--lvl-text)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}${lbl(0)}${pts.length>1?lbl(pts.length-1):''}</svg>
  <p style="margin-top:6px">${pts.length<2?'Do this exercise again to start your line! 📍':diff>0?`🎉 Up <b>${diff}</b> since you started. Keep going!`:diff===0?'Holding steady. Try to beat your best next time!':'Small dips are normal. Rest well and keep at it! 💪'}</p>
  ${m==='e'?'<p class="small muted">Estimated from your best set. It is a guess at the most you could lift once, not a target to try.</p>':''}`;
  document.querySelectorAll('[data-cm]').forEach(b=>b.onclick=()=>{chartMetric=b.dataset.cm;drawChart()});
}

/* ===== js/sync.js ===== */
/* KinFit · Backup & sync between devices. */
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
  const byId={},hl={};[...R.profiles,...L.profiles].forEach(p=>{if(!p||!p.id||deleted.includes(p.id))return;const o=byId[p.id];if(!o||(p.updated||0)>=(o.updated||0))byId[p.id]=p;
    // Habit ticks merge day by day (the newest change to each day wins), so ticks from two phones aren't lost.
    const h=hl[p.id]=hl[p.id]||{};Object.entries(p.hlog&&typeof p.hlog==='object'?p.hlog:{}).forEach(([d,v])=>{if(v&&(!h[d]||(v.u||0)>=(h[d].u||0)))h[d]=v})});
  Object.keys(byId).forEach(id=>{if(Object.keys(hl[id]).length)byId[id]=Object.assign({},byId[id],{hlog:hl[id]})});
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

/* ===== js/coach.js ===== */
/* KinFit · Ask Coach chat. */
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
const SUGGEST=['Make me a 15-min workout','Which level should I choose?','How do I do a squat?','Is it OK to feel sore?','How do I warm up?','When should I add weight?','What is a rep and a set?'];
function renderAsk(v){
  const today=SCHEDULE[new Date().getDay()].k;
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg" style="padding-bottom:80px">
    <div><h1>Ask Coach 💬</h1><p class="muted" style="margin-top:4px">Questions about exercises, your plan or staying safe? Just ask!</p></div>
    <div class="chat" id="chat">
      <div class="msg bot">${md(`Hi${profile.name?' '+profile.name:''}! 👋 I'm Coach. Ask me how to do an exercise, which level to pick, or anything about your workouts.`)}</div>
      ${chat.map((m,i)=>`<div class="msg ${m.role==='user'?'me':'bot'}">${m.role==='user'?esc(m.content):md(m.content)}${m.build?`<div class="row" style="gap:6px;margin-top:10px"><button class="btn sm secondary" data-cbsave="${i}">⭐ Save</button><button class="btn sm" data-cbstart="${i}">▶ Start</button></div>`:''}</div>`).join('')}
    </div>
    <div class="sugg" id="sugg">${(chat.length?SUGGEST.slice(0,3):SUGGEST).map(q=>`<button>${q}</button>`).join('')}</div>
    ${chat.length?`<button class="link" id="clear" style="color:var(--muted)">🧹 Clear chat</button>`:''}
    <p class="small muted center">Coach gives general fitness tips, not medical advice. Got pain or an injury? Tell an adult or doctor.</p>
  </div>
  <div class="composer"><form id="ask"><input id="q" maxlength="500" placeholder="Type your question…" autocomplete="off" enterkeyhint="send" aria-label="Your question"><button id="send" aria-label="Send">➤</button></form></div>`;
  const scroll=()=>window.scrollTo(0,document.body.scrollHeight);scroll();
  $('#ask').onsubmit=e=>{e.preventDefault();const q=$('#q').value.trim();if(q&&!chatBusy)ask(q,today)};
  v.querySelectorAll('#sugg button').forEach(b=>b.onclick=()=>{if(!chatBusy)ask(b.textContent,today)});
  const builtFrom=i=>{const w=chat[i]&&chat[i].build;if(!w||!Array.isArray(w.items))return null;const items=w.items.filter(p=>EX[p[0]]);return items.length?{id:w.id||newId('r'),name:cleanText(w.name,30)||'Coach workout',e:cleanEmoji(w.e,'✨'),items}:null};
  v.querySelectorAll('[data-cbsave]').forEach(b=>b.onclick=()=>{const w=builtFrom(+b.dataset.cbsave);if(w)saveBuilt(w,false)});
  v.querySelectorAll('[data-cbstart]').forEach(b=>b.onclick=()=>{const w=builtFrom(+b.dataset.cbstart);if(w)saveBuilt(w,true)});
  if($('#clear'))$('#clear').onclick=()=>{chat=[];store.del(pKey('jams_chat'));renderAsk(v)};
}
async function ask(q,today){
  chat.push({role:'user',content:q});chatBusy=true;profile.questions=(profile.questions||0)+1;saveProfile();
  const box=$('#chat');box.insertAdjacentHTML('beforeend',`<div class="msg me">${esc(q)}</div><div class="msg bot typing" id="typing"><span></span><span></span><span></span></div>`);
  $('#q').value='';$('#send').disabled=true;$('#sugg').classList.add('hide');window.scrollTo(0,document.body.scrollHeight);
  if(isBuildRequest(q)){
    const w=await buildWithCoach(q);
    chat.push({role:'assistant',content:workoutText(w),build:w});chat=chat.slice(-40);store.set(pKey('jams_chat'),chat);chatBusy=false;
    renderAsk($('#view'));window.scrollTo(0,document.body.scrollHeight);return;
  }
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
        body:JSON.stringify({messages:chat.slice(-8),level:profile.level,kid:isKid(),today:W,history:historySummary()})});
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

/* ===== js/photos.js ===== */
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
  box.innerHTML=`<div class="card stack"><div class="row between"><h2 class="h3">📸 Progress photos</h2><span class="small muted" style="font-weight:700;white-space:nowrap">🔒 Private</span></div>
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
    $('#pdel').onclick=async()=>{closeLayer();await delPhoto(p.id);renderPhotos();
      undoable('Photo deleted',async()=>{await putPhoto(p);renderPhotos()},()=>{URL.revokeObjectURL(urls.get(p.id));urls.delete(p.id)})};
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
  return `<div class="card stack"><h2 class="h3">📸 Body tracking</h2>
    <p class="small muted">Progress photos and body measurements (weight, waist). Photos stay <b>only on this phone</b> and are never uploaded or synced. Measurements sync with your other devices if sync is on.</p>
    <div class="seg" id="phon"><button class="${profile.photos?'':'on'}" data-ph="0">Off</button><button class="${profile.photos?'on':''}" data-ph="1">On</button></div>
    ${profile.photos?`<p class="small muted">💡 On iPhone, add this app to your Home Screen (Share → Add to Home Screen) so your photos are kept safely. Save copies of photos you want to keep forever.</p>`:''}</div>`;
}

/* ===== js/features.js ===== */
/* KinFit · Workouts library, custom workouts, records, muscle map, plates, activities, body, family, reminders, parent lock. */
/* =========================================================
   Pro features: custom workouts & exercises, sport plans, PRs, muscle map,
   plate calculator, effort rating, activities, body measurements, voice coach,
   family challenges, reminders, parent lock.
   ========================================================= */

/* ---------- Custom exercises live in each person's profile ---------- */
function loadCustom(){
  Object.keys(EX).forEach(k=>{if(k.startsWith('c_'))delete EX[k]});
  Object.entries(profile.customEx||{}).forEach(([k,v])=>{if(k.startsWith('c_')&&v&&v.name)EX[k]=Object.assign({e:'⭐',m:['Other'],steps:[],tip:'Move with control and good form.'},v)});
}
const exByName=n=>Object.keys(EX).find(k=>EX[k].name===n);
const newId=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,6);

/* ---------- Voice coach ---------- */
let voiceOn=store.get('jams_voice',true);
function say(text){
  if(!voiceOn||!('speechSynthesis' in window)||!text)return;
  try{const u=new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,''));u.rate=1;u.pitch=1.05;u.lang='en-US';speechSynthesis.speak(u)}catch(e){}
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(!b)return;const ex=EX[b.dataset.say];if(!ex)return;
  try{speechSynthesis.cancel()}catch(err){}const was=voiceOn;voiceOn=true;say(`${ex.name}. ${ex.steps.map((s,i)=>`Step ${i+1}. ${s}`).join(' ')} Tip: ${ex.tip}`);voiceOn=was});

/* ---------- Plans: level plan, my workouts, sport plans ---------- */
function startCustom(kind,id){
  setEditing=null;
  const src=kind==='r'?(profile.routines||[]).find(r=>r.id===id):SPORTS.find(s=>s.id===id);if(!src)return;
  const plan=src.items.filter(p=>EX[p[0]]).map(p=>[p[0],+p[1]||3,+p[2]||8,+p[3]||+p[2]||12]);
  if(!plan.length){toast('This workout has no exercises yet');return}
  const key=kind+':'+id,cur=store.get(pKey('jams_active'),null);
  if(cur&&cur.key===key){go('workout',key);return}
  const start=()=>{
    const a={key,level:profile.level,title:src.name,emoji:src.e,plan,date:isoLocal(),started:Date.now(),items:plan.map(p=>({id:p[0],sets:freshSets(p[0],p[1])}))};
    store.set(pKey('jams_active'),a);go('workout',key);say(`Let's go! ${src.name}. First up: ${EX[plan[0][0]].name}.`);
  };
  if(cur)confirmBox('Start a new workout?','You have another workout in progress. Starting this one will cancel it.','Start new',start);else start();
}
function routineSheet(r){
  r=r?JSON.parse(JSON.stringify(r)):{id:newId('r'),name:'',e:'💪',items:[]};
  const EM=['💪','🦵','🏋️','⚡','🔥','🏃','🧘','⭐','🎯','🚀','🏏','⚽'];
  const draw=()=>sheet(`<h2>${r.name?esc(r.name):'New workout'} ✏️</h2>
    <input class="txt" id="rn" maxlength="30" placeholder="Workout name, like 'Arm day'" value="${esc(r.name)}">
    <div class="avatars">${EM.map(x=>`<button class="${x===r.e?'sel':''}" data-re="${x}">${x}</button>`).join('')}</div>
    <div class="stack">${r.items.map((p,i)=>{const ex=EX[p[0]];if(!ex)return '';return `<div class="ritem"><div class="row between"><b>${esc(ex.e)} ${esc(ex.name)}</b><span><button class="xbtn" data-up="${i}" ${i?'':'disabled'} aria-label="Move up">⬆️</button><button class="xbtn" data-dn="${i}" ${i<r.items.length-1?'':'disabled'} aria-label="Move down">⬇️</button><button class="xbtn" data-rx="${i}" aria-label="Remove">✕</button></span></div>
      <div class="row" style="gap:6px;margin-top:6px"><input class="num sm" type="number" inputmode="numeric" min="1" max="10" value="${p[1]}" data-f="1" data-i="${i}" aria-label="Sets"><span class="small muted">sets ×</span><input class="num sm" type="number" inputmode="numeric" min="1" value="${p[2]}" data-f="2" data-i="${i}" aria-label="Low"><span class="small muted">to</span><input class="num sm" type="number" inputmode="numeric" min="1" value="${p[3]}" data-f="3" data-i="${i}" aria-label="High"><span class="small muted">${ex.time?'sec':'reps'}</span></div></div>`}).join('')}</div>
    <button class="btn secondary" id="radd">＋ Add an exercise</button>
    <button class="btn" id="rsave">Save workout</button>
    ${(profile.routines||[]).some(x=>x.id===r.id)?`<button class="btn danger" id="rdel">Delete workout</button>`:''}
    <button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{r.name=$('#rn').value.trim();document.querySelectorAll('.ritem input[data-f]').forEach(x=>{r.items[x.dataset.i][x.dataset.f]=Math.max(1,parseInt(x.value)||1)})};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-re]').forEach(b=>b.onclick=()=>{read();r.e=b.dataset.re;draw()});
    document.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{read();const i=+b.dataset.up;[r.items[i-1],r.items[i]]=[r.items[i],r.items[i-1]];draw()});
    document.querySelectorAll('[data-dn]').forEach(b=>b.onclick=()=>{read();const i=+b.dataset.dn;[r.items[i+1],r.items[i]]=[r.items[i],r.items[i+1]];draw()});
    document.querySelectorAll('[data-rx]').forEach(b=>b.onclick=()=>{read();r.items.splice(+b.dataset.rx,1);draw()});
    $('#radd').onclick=()=>{read();pickExercise(id=>{const ex=EX[id];r.items.push([id,3,ex.time?20:8,ex.time?40:12]);draw()},draw)};
    $('#rsave').onclick=()=>{read();if(!r.name){toast('Give your workout a name');return}if(!r.items.length){toast('Add at least one exercise');return}
      const list=(profile.routines||[]).filter(x=>x.id!==r.id);list.push(r);profile.routines=list;saveProfile();closeLayer();toast('⭐ Workout saved');syncNow(true);if(route==='library')render()};
    if($('#rdel'))$('#rdel').onclick=()=>confirmBox('Delete this workout?','Your history stays. Only the saved workout is removed.','Delete',()=>{profile.routines=(profile.routines||[]).filter(x=>x.id!==r.id);saveProfile();syncNow(true);render()},true);
  });
  draw();
}
function pickExercise(onPick,onBack){
  let q='',f='';
  const draw=()=>{
    const list=Object.keys(EX).filter(k=>!k.startsWith('_')).map(k=>[k,EX[k]]).filter(([k,ex])=>exMatches(ex,f)&&(!q||ex.name.toLowerCase().includes(q))).sort((a,b)=>a[1].name.localeCompare(b[1].name));
    sheet(`<h2>Add an exercise</h2><input class="txt" id="pq" placeholder="🔎 Search" value="${esc(q)}" autocomplete="off">
      <div class="chips">${['',...MUSCLE_FILTERS].map(m=>`<button class="${m===f?'on':''}" data-mf="${m}">${m||'All'}</button>`).join('')}</div>
      <div class="stack">${list.map(([k,ex])=>`<button class="who" data-pk="${k}"><span class="av">${esc(ex.e)}</span><span style="flex:1;text-align:left"><b>${esc(ex.name)}</b><br><span class="small muted">${ex.m.join(', ')}${ex.weight?' · weights':''}</span></span></button>`).join('')||'<p class="muted center">No matches</p>'}</div>
      <button class="btn ghost" id="pback">Back</button>`,()=>{
      const inp=$('#pq');inp.oninput=()=>{q=inp.value.toLowerCase().trim();const pos=inp.selectionStart;draw();const n=$('#pq');n.focus();n.setSelectionRange(pos,pos)};
      document.querySelectorAll('[data-mf]').forEach(b=>b.onclick=()=>{f=b.dataset.mf;draw()});
      document.querySelectorAll('[data-pk]').forEach(b=>b.onclick=()=>onPick(b.dataset.pk));
      $('#pback').onclick=onBack;
    });
  };
  draw();
}
function exerciseSheet(id){
  const cur=id?Object.assign({},profile.customEx[id]):{name:'',e:'⭐',m:[],weight:false,time:false,steps:[],tip:''};
  const EM=['⭐','💪','🦵','🏋️','🤸','🧘','🏃','🔥','🎯','🦾','🥊','🧗'],MS=['Chest','Back','Shoulders','Biceps','Triceps','Core','Legs','Glutes','Calves','Heart'];
  const draw=()=>sheet(`<h2>${id?'Edit':'New'} exercise</h2>
    <input class="txt" id="xn" maxlength="40" placeholder="Exercise name" value="${esc(cur.name)}">
    <div class="avatars">${EM.map(x=>`<button class="${x===cur.e?'sel':''}" data-xe="${x}">${x}</button>`).join('')}</div>
    <p class="small muted" style="font-weight:700">MUSCLES WORKED</p><div class="chips">${MS.map(m=>`<button class="${cur.m.includes(m)?'on':''}" data-xm="${m}">${m}</button>`).join('')}</div>
    <div class="seg"><button class="${cur.time?'':'on'}" data-xt="0">Count reps</button><button class="${cur.time?'on':''}" data-xt="1">Timed</button></div>
    <div class="seg"><button class="${cur.weight?'':'on'}" data-xw="0">No weights</button><button class="${cur.weight?'on':''}" data-xw="1">Uses weights</button></div>
    <textarea class="txt area" id="xs" rows="4" placeholder="How to do it (one step per line)">${esc(cur.steps.join('\n'))}</textarea>
    <input class="txt" id="xtip" maxlength="120" placeholder="Safety tip (optional)" value="${esc(cur.tip)}">
    <button class="btn" id="xsave">Save exercise</button>${id?`<button class="btn danger" id="xdel">Delete exercise</button>`:''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{cur.name=$('#xn').value.trim();cur.steps=$('#xs').value.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,8);cur.tip=$('#xtip').value.trim()};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-xe]').forEach(b=>b.onclick=()=>{read();cur.e=b.dataset.xe;draw()});
    document.querySelectorAll('[data-xm]').forEach(b=>b.onclick=()=>{read();const m=b.dataset.xm;cur.m=cur.m.includes(m)?cur.m.filter(x=>x!==m):[...cur.m,m];draw()});
    document.querySelectorAll('[data-xt]').forEach(b=>b.onclick=()=>{read();cur.time=b.dataset.xt==='1';draw()});
    document.querySelectorAll('[data-xw]').forEach(b=>b.onclick=()=>{read();cur.weight=b.dataset.xw==='1';draw()});
    $('#xsave').onclick=()=>{read();if(!cur.name){toast('Give it a name');return}
      if(Object.keys(EX).some(k=>k!==id&&EX[k].name.toLowerCase()===cur.name.toLowerCase())){toast('An exercise with that name already exists');return}
      if(!cur.m.length)cur.m=['Other'];if(!cur.steps.length)cur.steps=['Move slowly and with control.'];if(!cur.tip)cur.tip='Stop if anything hurts.';
      profile.customEx=Object.assign({},profile.customEx||{},{[id||newId('c_')]:cur});saveProfile();loadCustom();closeLayer();toast('⭐ Exercise saved');syncNow(true);render()};
    if($('#xdel'))$('#xdel').onclick=()=>confirmBox('Delete this exercise?','It will be removed from your saved workouts. Your history stays.','Delete',()=>{
      const c=Object.assign({},profile.customEx);delete c[id];profile.customEx=c;(profile.routines||[]).forEach(r=>r.items=r.items.filter(p=>p[0]!==id));saveProfile();loadCustom();syncNow(true);render()},true);
  });
  draw();
}

/* ---------- Library (Workouts tab) ---------- */
let libTab='plan',libFilter='',libQuery='';
function renderLibrary(v){
  libLevel=libLevel||profile.level;
  const tabs=[['plan','📋 Plan'],['mine','⭐ Mine'],['sports','🏅 Sports'],['all','🔎 All']];
  let body='';
  if(libTab==='plan'){
    const plan=PLANS[libLevel];
    body=`${intervalCard()}${stretchCard()}<div class="seg">${Object.keys(LEVELS).map(k=>`<button class="${k===libLevel?'on':''}" data-l="${k}">${LEVELS[k].emoji} ${LEVELS[k].name}</button>`).join('')}</div>
    <p class="small muted">🧰 ${LEVELS[libLevel].equipment}</p>
    ${Object.keys(WORKOUTS).map(w=>`<div class="stack"><h2 class="h3">${WORKOUTS[w].e} ${WORKOUTS[w].name} <span class="muted small">· ${WORKOUTS[w].sub}</span></h2>
      ${plan[w].map(p=>exCard(p[0],repsText(p,EX[p[0]]))).join('')}</div>`).join('')}`;
  }else if(libTab==='mine'){
    const rs=profile.routines||[],cx=Object.keys(profile.customEx||{});
    body=`<div class="stack"><h2 class="h3">My workouts</h2>
      ${rs.length?rs.map(r=>`<div class="card row" style="padding:14px"><span class="ex-emoji">${r.e}</span><div style="flex:1"><b>${esc(r.name)}</b><p class="small muted">${plural(r.items.length,'exercise')}</p></div><button class="btn sm ghost" data-redit="${r.id}" aria-label="Edit">✏️</button><button class="btn sm" data-rstart="${r.id}">▶</button></div>`).join('')
        :`<div class="card empty"><div class="big-emoji">📝</div><p class="muted">Build your own workout from any exercises. Great for leg day, sports practice or a quick 10 minutes.</p></div>`}
      <button class="btn" id="rnew">＋ Create a workout</button><button class="btn secondary" id="rbuild">✨ Build one for me</button></div>
    <div class="stack"><h2 class="h3">My exercises</h2>
      ${cx.length?cx.map(k=>exCard(k,'',true)).join(''):`<p class="small muted">Can't find a move in the library? Add your own, with your own steps.</p>`}
      <button class="btn secondary" id="xnew">＋ Create an exercise</button></div>`;
  }else if(libTab==='sports'){
    body=`<p class="muted">Short workouts that make you better at your sport. They use bodyweight moves, so you can do them anywhere.</p>
    ${SPORTS.map(s=>`<div class="card stack"><div class="row"><span class="ex-emoji">${s.e}</span><div style="flex:1"><b>${s.name}</b><p class="small muted">${s.sub}</p></div></div>
      <details class="how"><summary>See the ${s.items.length} exercises</summary><ol>${s.items.map(p=>`<li>${EX[p[0]].e} ${EX[p[0]].name}: ${repsText([0,p[1],p[2],p[3]],EX[p[0]])}</li>`).join('')}</ol></details>
      <div class="row" style="gap:8px"><button class="btn sm" style="flex:1" data-sstart="${s.id}">Start ▶</button><button class="btn sm secondary" style="flex:1" data-ssave="${s.id}">⭐ Save to mine</button></div></div>`).join('')}`;
  }else{
    const list=Object.keys(EX).filter(k=>!k.startsWith('_')).filter(k=>exMatches(EX[k],libFilter)&&(!libQuery||EX[k].name.toLowerCase().includes(libQuery))).sort((a,b)=>EX[a].name.localeCompare(EX[b].name));
    body=`<input class="txt" id="lq" placeholder="🔎 Search ${Object.keys(EX).filter(k=>!k.startsWith('_')).length} exercises" value="${esc(libQuery)}" autocomplete="off">
      <div class="chips">${['',...MUSCLE_FILTERS].map(m=>`<button class="${m===libFilter?'on':''}" data-mf="${m}">${m||'All'}</button>`).join('')}</div>
      <div class="stack" id="lres">${list.map(k=>exCard(k,'',k.startsWith('c_'))).join('')||'<p class="muted center">No matches</p>'}</div>`;
  }
  v.innerHTML=`${topbar(levelPill())}<div class="stack-lg">
    <div><h1>Workouts & moves 📚</h1><p class="muted" style="margin-top:4px">Learn every move, build your own workouts, or train for your sport.</p></div>
    <div class="seg">${tabs.map(t=>`<button class="${t[0]===libTab?'on':''}" data-lt="${t[0]}">${t[1]}</button>`).join('')}</div>
    ${body}</div>`;
  v.querySelectorAll('[data-lt]').forEach(b=>b.onclick=()=>{libTab=b.dataset.lt;renderLibrary(v)});
  v.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{libLevel=b.dataset.l;renderLibrary(v)});
  v.querySelectorAll('[data-mf]').forEach(b=>b.onclick=()=>{libFilter=b.dataset.mf;renderLibrary(v)});
  v.querySelectorAll('[data-rstart]').forEach(b=>b.onclick=()=>startCustom('r',b.dataset.rstart));
  v.querySelectorAll('[data-redit]').forEach(b=>b.onclick=()=>routineSheet((profile.routines||[]).find(r=>r.id===b.dataset.redit)));
  v.querySelectorAll('[data-sstart]').forEach(b=>b.onclick=()=>startCustom('s',b.dataset.sstart));
  v.querySelectorAll('[data-ssave]').forEach(b=>b.onclick=()=>{const s=SPORTS.find(x=>x.id===b.dataset.ssave);routineSheet({id:newId('r'),name:s.name+' training',e:s.e,items:s.items.map(p=>p.slice())})});
  v.querySelectorAll('[data-xedit]').forEach(b=>b.onclick=()=>exerciseSheet(b.dataset.xedit));
  if($('#rnew'))$('#rnew').onclick=()=>routineSheet();
  if($('#rbuild'))$('#rbuild').onclick=builderSheet;
  if($('#xnew'))$('#xnew').onclick=()=>exerciseSheet();
  if($('#lq'))$('#lq').oninput=e=>{libQuery=e.target.value.toLowerCase().trim();const pos=e.target.selectionStart;renderLibrary(v);const n=$('#lq');n.focus();n.setSelectionRange(pos,pos)};
}
function exCard(id,target,editable){
  const ex=EX[id];
  return `<div class="card ex"><div class="ex-head"><div class="ex-emoji">${esc(ex.e)}</div><div style="flex:1"><div class="ex-title">${esc(ex.name)}</div>${target?`<div class="target">${target}</div>`:''}<div>${ex.m.map(m=>`<span class="chip">${esc(m)}</span>`).join('')}${ex.weight?'<span class="chip">🏋️ weights</span>':''}</div></div>${editable?`<button class="xbtn" data-xedit="${id}" aria-label="Edit">✏️</button>`:''}</div>
    ${howTo(id)}</div>`;
}

/* ---------- Personal records ---------- */
const e1rm=(w,r)=>w>0&&r>0?(r===1?w:w*(1+Math.min(r,12)/30)):0;
function bestOf(sets,unit){
  let w=0,er=0,reps=0,wr=0;
  (sets||[]).forEach(s=>{const kg=toUnit(Number(s.weight)||0,unit),r=Number(s.reps)||0;if(kg>w||(kg===w&&r>wr)){w=kg;wr=r}er=Math.max(er,e1rm(kg,r));reps=Math.max(reps,r)});
  return {w,wr,er,reps};
}
function recordsTable(j=getJournal()){
  const rec={};
  workoutDates(j).forEach(d=>j[d].forEach(e=>{if(e.kind==='activity'||!(e.sets||[]).length)return;const b=bestOf(e.sets,e.unit),R=rec[e.exercise]||(rec[e.exercise]={w:0,wr:0,er:0,reps:0,d:d});
    if(b.w>R.w||(b.w===R.w&&b.wr>R.wr)){R.w=b.w;R.wr=b.wr;R.d=d}if(b.er>R.er)R.er=b.er;if(b.reps>R.reps){R.reps=b.reps;if(!R.w)R.d=d}}));
  return rec;
}
function findPRs(before,entries){
  const out=[];
  entries.forEach(e=>{const prev=before[e.exercise];if(!prev)return;const b=bestOf(e.sets,e.unit),ex=EX[exByName(e.exercise)]||{};
    if(b.w>0&&b.w>prev.w)out.push(`${e.exercise}: ${round1(b.w)} ${profile.unit} × ${b.wr}`);
    else if(b.w>0&&b.er>prev.er+0.4)out.push(`${e.exercise}: est. 1-rep max ${Math.round(b.er)} ${profile.unit}`);
    else if(!b.w&&b.reps>prev.reps)out.push(`${e.exercise}: ${b.reps} ${ex.time?'seconds':'reps'}`)});
  return out;
}
function recordsCard(){
  const rec=recordsTable(),names=Object.keys(rec).sort((a,b)=>rec[b].d.localeCompare(rec[a].d));
  if(!names.length)return '';
  return `<details class="card fold"><summary><b>🏆 Personal records (${names.length})</b></summary><div class="stack" style="margin-top:12px">
    ${names.map(n=>{const R=rec[n],ex=EX[exByName(n)]||{};return `<div class="row between rec"><span><b>${esc(n)}</b><br><span class="small muted">${niceDate(R.d)}</span></span><span style="text-align:right">${R.w?`<b>${round1(R.w)} ${profile.unit}</b> × ${R.wr}<br><span class="small muted">est. 1RM ${Math.round(R.er)}</span>`:`<b>${R.reps}</b> ${ex.time?'sec':'reps'}`}</span></div>`}).join('')}
  </div></details>`;
}

/* ---------- Muscle map ---------- */
const MUSCLE_NAMES={chest:'Chest',shoulders:'Shoulders',biceps:'Biceps',triceps:'Triceps',forearms:'Forearms & grip',abs:'Core',upperback:'Upper back',lowerback:'Lower back',glutes:'Glutes',quads:'Quads',hams:'Hamstrings',calves:'Calves'};
let muscleMode='sets';
// Per muscle: sets this week, pounds (or kg) lifted this week, and the strongest lift ever.
function muscleStats(){
  const j=getJournal(),ws=weekStart(new Date()),sets={},load={},best={};
  workoutDates(j).forEach(d=>{const thisWeek=parseIso(d)>=ws;
    j[d].forEach(e=>{const ex=EX[exByName(e.exercise)];if(!ex||e.kind==='activity')return;
      const keys=[...new Set(ex.m.flatMap(m=>MUSCLE_KEYS[m]||[]))];
      const vol=(e.sets||[]).reduce((t,x)=>t+(Number(x.reps)||0)*toUnit(Number(x.weight)||0,e.unit),0);
      const b=bestOf(e.sets,e.unit);
      keys.forEach(k=>{
        if(thisWeek){sets[k]=(sets[k]||0)+(e.sets||[]).length;load[k]=(load[k]||0)+vol}
        if(b.er>0&&(!best[k]||b.er>best[k].er))best[k]={er:b.er,w:b.w,wr:b.wr,ex:e.exercise,d};
      })})});
  return {sets,load,best};
}
function weekMuscles(){return muscleStats().sets}
function muscleMap(){
  const st=muscleStats(),m=muscleMode;
  const val=k=>m==='sets'?(st.sets[k]||0):m==='load'?Math.round(st.load[k]||0):Math.round((st.best[k]||{}).er||0);
  const max=Math.max(1,...Object.keys(MUSCLE_NAMES).map(val));
  const fill=k=>{const n=val(k);if(!n)return 'fill="var(--line)"';const f=n/max;return `fill="var(--lvl-text)" fill-opacity="${f>.66?1:f>.33?.7:.4}"`};
  const unit=profile.unit,fmt=n=>n.toLocaleString();
  const tip=k=>`${MUSCLE_NAMES[k]}: ${m==='sets'?val(k)+' sets this week':m==='load'?fmt(val(k))+' '+unit+' this week':val(k)?'strongest est. 1-rep max '+val(k)+' '+unit:'no weighted lifts yet'}`;
  const E=(k,x,y,rx,ry)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${fill(k)}><title>${tip(k)}</title></ellipse>`;
  const R=(k,x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" ${fill(k)}><title>${tip(k)}</title></rect>`;
  const body=(cx,front)=>`<circle cx="${cx}" cy="22" r="11" fill="var(--line)"/>`+
    E('shoulders',cx-17,46,8,6)+E('shoulders',cx+17,46,8,6)+
    (front?E('chest',cx-7,56,8,7)+E('chest',cx+7,56,8,7)+R('abs',cx-8,66,16,28)+E('biceps',cx-23,66,5,11)+E('biceps',cx+23,66,5,11)+E('quads',cx-7,120,7,21)+E('quads',cx+7,120,7,21)
      :R('upperback',cx-12,48,24,22)+R('lowerback',cx-8,72,16,18)+E('triceps',cx-23,66,5,11)+E('triceps',cx+23,66,5,11)+E('glutes',cx-7,100,8,8)+E('glutes',cx+7,100,8,8)+E('hams',cx-7,124,7,17)+E('hams',cx+7,124,7,17))+
    E('forearms',cx-26,90,4,10)+E('forearms',cx+26,90,4,10)+E('calves',cx-7,160,5,14)+E('calves',cx+7,160,5,14);
  const rows=Object.keys(MUSCLE_NAMES).map(k=>[k,val(k)]).filter(r=>r[1]>0).sort((a,b)=>b[1]-a[1]);
  const note=m==='sets'?'How many sets each muscle did this week.'
    :m==='load'?`Weight × reps for every set this week. Each muscle counts the full weight of the exercises that use it (so a bench press adds to chest, shoulders and triceps).`
    :'Each muscle\'s strongest lift ever, as an estimated 1-rep max: the most it could lift once. A score to watch grow, not a weight to try!';
  return `<div class="card stack" id="mmcard"><h2 class="h3">💪 Muscle power</h2>
    <div class="seg">${[['sets','Sets'],['load',`${unit} lifted`],['best','Strength']].map(o=>`<button class="${o[0]===m?'on':''}" data-mm="${o[0]}">${o[1]}</button>`).join('')}</div>
    <svg viewBox="0 0 200 182" class="mmap" role="img" aria-label="Body map of muscles">${body(50,true)}${body(150,false)}<text x="50" y="181" text-anchor="middle" font-size="9" fill="var(--muted)">FRONT</text><text x="150" y="181" text-anchor="middle" font-size="9" fill="var(--muted)">BACK</text></svg>
    ${rows.length?`<div class="stack" style="gap:8px">${rows.map(([k,n])=>`<div><div class="row between small"><b>${MUSCLE_NAMES[k]}</b><span>${m==='sets'?plural(n,'set'):fmt(n)+' '+unit}${m==='best'?` <span class="muted">· ${esc(st.best[k].ex)}</span>`:''}</span></div><div class="famBar"><i style="width:${n/max*100}%"></i></div></div>`).join('')}</div>`
      :`<p class="small muted">${m==='sets'?'Finish a workout and the muscles you worked light up here.':m==='load'?`No weights lifted this week yet. Bodyweight moves count in Sets. Weighted exercises show here in ${unit}.`:'Lift with weights (dumbbells, machines or a barbell) to see each muscle\'s strength score.'}</p>`}
    <p class="small muted">${note}</p></div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-mm]');if(!b)return;muscleMode=b.dataset.mm;const c=$('#mmcard');if(c)c.outerHTML=muscleMap()});

/* ---------- Plate calculator & warm-up sets ---------- */
function platesSheet(target){
  const kg=profile.unit==='kg',PL=kg?[25,20,15,10,5,2.5,1.25]:[45,35,25,10,5,2.5];let bar=store.get('jams_bar',kg?20:45),t=target;
  const COL={45:'#dc2626',25:'#16a34a',35:'#eab308',10:'#64748b',5:'#2563eb',2.5:'#94a3b8',20:'#2563eb',15:'#eab308',1.25:'#cbd5e1'};
  const calc=x=>{let side=Math.max(0,(x-bar)/2);const out=[];PL.forEach(p=>{while(side>=p-1e-9){out.push(p);side-=p}});return {out,left:round1(side*2)}};
  const rnd=x=>Math.round(x/(kg?2.5:5))*(kg?2.5:5);
  const update=()=>{const {out,left}=calc(t);
    const warm=t>bar*1.5?[[bar,10],[rnd(t*.4),5],[rnd(t*.6),3],[rnd(t*.8),2]].filter((x,i,a)=>i===0||x[0]>a[i-1][0]&&x[0]<t):[[bar,10]];
    $('#pres').innerHTML=`<div class="barviz"><div class="barline"></div><div class="plates">${out.map(p=>`<i style="height:${30+p/(kg?25:45)*60}px;background:${COL[p]||'#64748b'}" title="${p}"></i>`).join('')||'<span class="small muted">Just the bar!</span>'}</div></div>
      <p class="center"><b>Each side:</b> ${out.length?out.join(' + ')+' '+profile.unit:'nothing, just the bar'}${left>0?`<br><span class="small muted">(${left} ${profile.unit} can't be made with standard plates)</span>`:''}</p>
      <div class="card stack" style="background:var(--bg)"><b>🔥 Warm-up sets before ${t} ${profile.unit}</b>${warm.map(([w,r])=>`<div class="row between"><span>${w===bar?'Empty bar':w+' '+profile.unit}</span><b>× ${r}</b></div>`).join('')}<p class="small muted">Rest about a minute between warm-up sets.</p></div>`;
    document.querySelectorAll('[data-bar]').forEach(b=>b.classList.toggle('on',+b.dataset.bar===bar));
  };
  sheet(`<h2>🧮 Plate calculator</h2>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">TARGET (${profile.unit})</label><input class="num" id="pt" type="number" inputmode="decimal" step="${kg?2.5:5}" value="${t}"></div>
    <div style="flex:1"><label class="small muted" style="font-weight:700">BAR</label><div class="seg">${(kg?[20,15,10]:[45,35,15]).map(b=>`<button data-bar="${b}">${b}</button>`).join('')}</div></div></div>
    <div id="pres" class="stack"></div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#pt').oninput=e=>{const x=parseFloat(e.target.value);if(x>0){t=x;update()}};
    document.querySelectorAll('[data-bar]').forEach(b=>b.onclick=()=>{bar=+b.dataset.bar;store.set('jams_bar',bar);update()});
    update();
  });
}

/* ---------- Activities (sports, cardio) ---------- */
function activitySheet(edit){
  const j=getJournal();let e=edit?(j[edit.d]||[]).find(x=>String(x.id)===String(edit.id)):null;
  const st=e?{act:e.act,e:e.exercise.split(' ')[0],min:e.minutes,dist:e.distance||'',date:edit.d,eff:e.effort||2}:{act:'Walk',e:'🚶',min:30,dist:'',date:isoLocal(),eff:2};
  const du=profile.unit==='kg'?'km':'mi';
  const draw=()=>sheet(`<h2>${e?'Edit activity':'Log an activity'} 🏃</h2>
    <div class="actgrid">${ACTIVITIES.map(([em,n])=>`<button class="${n===st.act?'sel':''}" data-act="${n}" data-ae="${em}"><span>${em}</span>${n}</button>`).join('')}</div>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">MINUTES</label><input class="num" id="am" type="number" inputmode="numeric" min="1" value="${st.min}"></div>
      <div style="flex:1"><label class="small muted" style="font-weight:700">DISTANCE (${du}, optional)</label><input class="num" id="ad" type="number" inputmode="decimal" step="0.1" min="0" value="${st.dist}"></div></div>
    <div class="chips">${[15,30,45,60,90].map(m=>`<button data-qm="${m}">${m} min</button>`).join('')}</div>
    <div><label class="small muted" style="font-weight:700">DATE</label><input class="num" id="adate" type="date" max="${isoLocal()}" value="${st.date}" style="font-size:16px"></div>
    <p class="small muted" style="font-weight:700">HOW HARD WAS IT?</p><div class="seg">${[[1,'😊 Easy'],[2,'💪 Good'],[3,'😫 Tough']].map(x=>`<button class="${st.eff===x[0]?'on':''}" data-aeff="${x[0]}">${x[1]}</button>`).join('')}</div>
    <button class="btn" id="asave">Save</button>${e?'<button class="btn danger" id="adel">Delete</button>':''}<button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{st.min=$('#am').value;st.dist=$('#ad').value;st.date=$('#adate').value||isoLocal()};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>{read();st.act=b.dataset.act;st.e=b.dataset.ae;draw()});
    document.querySelectorAll('[data-qm]').forEach(b=>b.onclick=()=>{read();st.min=b.dataset.qm;draw()});
    document.querySelectorAll('[data-aeff]').forEach(b=>b.onclick=()=>{read();st.eff=+b.dataset.aeff;draw()});
    $('#asave').onclick=()=>{read();const min=parseInt(st.min)||0;if(min<1){toast('How many minutes?');return}
      const jj=getJournal();
      if(e){jj[edit.d]=(jj[edit.d]||[]).filter(x=>String(x.id)!==String(e.id));if(!jj[edit.d].length)delete jj[edit.d]}
      const entry={id:e?e.id:Date.now(),exercise:`${st.e} ${st.act}`,kind:'activity',act:st.act,minutes:min,distance:parseFloat(st.dist)||0,dunit:du,effort:st.eff,sets:[],
        timestamp:e?e.timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),level:profile.level,u:Date.now()};
      (jj[st.date]=jj[st.date]||[]).push(entry);setJournal(jj);closeLayer();toast(e?'Saved ✅':`${st.e} ${min} minutes logged!`);
      if(!e){say(`Nice! ${min} minutes of ${st.act.toLowerCase()} logged.`);const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),1200)}
      syncNow(true);render()};
    if($('#adel'))$('#adel').onclick=()=>{const jj=getJournal();jj[edit.d]=(jj[edit.d]||[]).filter(x=>String(x.id)!==String(e.id));if(!jj[edit.d].length)delete jj[edit.d];setJournal(jj);closeLayer();render();
      undoable(`${e.exercise} deleted`,()=>{const j2=getJournal();(j2[edit.d]=j2[edit.d]||[]).push(e);setJournal(j2);render()},()=>{addTomb(e.id);syncNow(true)})};
  });
  draw();
}
function activityCard(){
  const j=getJournal(),ws=weekStart(new Date());let min=0,n=0;
  workoutDates(j).filter(d=>parseIso(d)>=ws).forEach(d=>j[d].forEach(e=>{if(e.kind==='activity'){min+=e.minutes||0;n++}}));
  return `<div class="card row"><span class="big-emoji">🏃</span><div style="flex:1"><b>${min} active minutes this week</b><p class="small muted">${n?plural(n,'activity')+' logged. Sports count too!':'Played a sport or went for a walk? Log it!'}</p></div><button class="btn sm secondary" id="logact">＋ Log</button></div>`;
}

/* ---------- Body measurements (part of body tracking) ---------- */
function bodyCard(){
  if(!profile.photos)return '';
  const B=(profile.body||[]).slice().sort((a,b)=>a.d.localeCompare(b.d)),lu=profile.unit==='kg'?'cm':'in';
  const conv=(x,from,to)=>from===to?x:to==='cm'?x*2.54:x/2.54;
  const w=B.filter(b=>b.w).map(b=>({d:b.d,v:round1(toUnit(b.w,b.unit))})),wa=B.filter(b=>b.waist).map(b=>({d:b.d,v:round1(conv(b.waist,b.lu||'in',lu))}));
  const delta=a=>a.length>1?round1(a[a.length-1].v-a[0].v):null,dw=delta(w),dwa=delta(wa);
  return `<div class="card stack"><div class="row between"><h2 class="h3">⚖️ Body measurements</h2><span class="small muted" style="font-weight:700">🔒 Private</span></div>
    ${B.length?`<div class="stats" style="grid-template-columns:1fr 1fr"><div class="stat"><b>${w.length?w[w.length-1].v:'–'}</b><span>${profile.unit}${dw!==null?` (${dw>0?'+':''}${dw})`:''}</span></div><div class="stat"><b>${wa.length?wa[wa.length-1].v:'–'}</b><span>waist ${lu}${dwa!==null?` (${dwa>0?'+':''}${dwa})`:''}</span></div></div>
      ${w.length>1?miniChart(w,'Body weight ('+profile.unit+')'):''}
      <details class="how"><summary>All entries</summary>${B.slice().reverse().map(b=>`<div class="row between" style="padding:6px 0"><span>${niceDate(b.d)}</span><span>${b.w?round1(toUnit(b.w,b.unit))+' '+profile.unit:''}${b.w&&b.waist?' · ':''}${b.waist?round1(conv(b.waist,b.lu||'in',lu))+' '+lu:''}<button class="xbtn" data-bdel="${b.id}" aria-label="Delete">🗑️</button></span></div>`).join('')}</details>`
      :`<p class="small muted">Track your weight and waist every couple of weeks. Strength and how you feel matter more than any number!</p>`}
    <button class="btn secondary" id="badd">＋ Add measurement</button></div>`;
}
function bodySheet(){
  const lu=profile.unit==='kg'?'cm':'in';
  sheet(`<h2>⚖️ Add measurement</h2>
    <div><label class="small muted" style="font-weight:700">DATE</label><input class="num" id="bd" type="date" max="${isoLocal()}" value="${isoLocal()}" style="font-size:16px"></div>
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">WEIGHT (${profile.unit})</label><input class="num" id="bw" type="number" inputmode="decimal" step="0.1" min="0"></div>
    <div style="flex:1"><label class="small muted" style="font-weight:700">WAIST (${lu})</label><input class="num" id="bwa" type="number" inputmode="decimal" step="0.1" min="0"></div></div>
    <p class="small muted">💡 Measure at the same time of day, like first thing in the morning.</p>
    <button class="btn" id="bsave">Save</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#bsave').onclick=()=>{const w=parseFloat($('#bw').value)||0,wa=parseFloat($('#bwa').value)||0;if(!w&&!wa){toast('Enter a weight or waist measurement');return}
      profile.body=[...(profile.body||[]),{id:newId('b'),d:$('#bd').value||isoLocal(),w,unit:profile.unit,waist:wa,lu}];saveProfile();closeLayer();toast('Saved ✅');syncNow(true);render()};
  });
}
function miniChart(pts,label){
  const W=340,H=150,L=36,R=12,T=12,B=24,vals=pts.map(p=>p.v),mx=Math.max(...vals),mn=Math.min(...vals),pad=(mx-mn)*.2||1,hi=mx+pad,lo=Math.max(0,mn-pad);
  const x=i=>L+i*(W-L-R)/Math.max(1,pts.length-1),y=v=>T+(H-T-B)*(1-(v-lo)/(hi-lo));
  const path=vals.map((v,i)=>`${i?'L':'M'}${x(i)},${y(v)}`).join('');
  return `<p class="small muted" style="font-weight:700">${label}</p><svg class="chart" viewBox="0 0 ${W} ${H}">${[lo,(lo+hi)/2,hi].map(v=>`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${Math.round(v)}</text>`).join('')}<path d="${path}" fill="none" stroke="var(--lvl-text)" stroke-width="3" stroke-linejoin="round"/>${vals.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--card)" stroke="var(--lvl-text)" stroke-width="2.5"/>`).join('')}<text x="${x(0)}" y="${H-6}" font-size="11" fill="var(--muted)" text-anchor="start">${parseIso(pts[0].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text><text x="${x(pts.length-1)}" y="${H-6}" font-size="11" fill="var(--muted)" text-anchor="end">${parseIso(pts[pts.length-1].d).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</text></svg>`;
}

/* ---------- Family challenge & high-fives ---------- */
function familyCard(){
  if(DB.list.length<2)return '';
  const ws=weekStart(new Date());
  const rows=DB.list.map(p=>{const j=getJournal(p);const n=workoutDates(j).filter(d=>parseIso(d)>=ws).length;return {p,n}}).sort((a,b)=>b.n-a.n);
  const top=rows[0].n;
  return `<div class="card stack"><div class="row between"><h2 class="h3">👨‍👩‍👧 Family challenge</h2><span class="small muted" style="font-weight:700">This week</span></div>
    <p class="small muted">Most active days this week wins the crown 👑</p>
    ${rows.map(({p,n},i)=>`<div class="row fam"><span class="av">${esc(p.avatar||'🙂')}</span><div style="flex:1"><b>${esc(p.name||'No name')}</b>${n&&n===top?' 👑':''}<div class="famBar"><i style="width:${top?n/Math.max(top,1)*100:0}%"></i></div></div><b style="min-width:42px;text-align:right">${n} ${n===1?'day':'days'}</b>${p.id!==profile.id?`<button class="btn sm secondary" data-five="${p.id}" aria-label="Send a high-five">🙌</button>`:'<span style="width:52px"></span>'}</div>`).join('')}
  </div>`;
}
function bindFamily(v){
  v.querySelectorAll('[data-five]').forEach(b=>b.onclick=()=>{
    const t=DB.list.find(p=>p.id===b.dataset.five);if(!t)return;
    t.fives=[...(t.fives||[]),{from:profile.name||'Someone',av:profile.avatar||'🙂',at:Date.now()}].slice(-20);t.updated=Date.now();saveDB();
    toast(`🙌 High-five sent to ${t.name||'them'}!`);say(`High five sent to ${t.name||'them'}!`);syncNow(true)});
}
function fivesCard(){
  const seen=profile.fivesSeen||0,f=(profile.fives||[]).filter(x=>x.at>seen);
  if(!f.length)return '';
  const names=[...new Set(f.map(x=>x.av+' '+x.from))];
  return `<div class="card row five"><span class="big-emoji">🙌</span><div style="flex:1"><b>${esc(names.join(', '))} sent you ${f.length>1?f.length+' high-fives':'a high-five'}!</b><p class="small muted">Keep it up!</p></div><button class="btn sm" id="fiveok">🙌</button></div>`;
}

/* ---------- Coach history summary ---------- */
function historySummary(){
  const j=getJournal(),ds=workoutDates(j).slice(-12),rec=recordsTable(j),parts=[];
  ds.forEach(d=>{parts.push(`${d}: `+j[d].map(e=>e.kind==='activity'?`${e.act} ${e.minutes} min`:`${e.exercise} ${(e.sets||[]).map(s=>s.reps+(s.weight?'x'+round1(toUnit(s.weight,e.unit)):'')).join(',')}${e.effort?` (felt ${['','easy','good','hard'][e.effort]})`:''}`).join('; '))});
  const prs=Object.keys(rec).slice(0,8).map(n=>`${n} best ${rec[n].w?round1(rec[n].w)+profile.unit+'x'+rec[n].wr:rec[n].reps}`).join('; ');
  return `Level ${profile.level}. Week streak ${weekStreak()}. Units ${profile.unit}. Recent: ${parts.join(' | ')}. Records: ${prs}`.slice(0,1400);
}

/* ---------- Reminders (calendar) ---------- */
function remindersCard(){
  const r=store.get('jams_remind',{days:['MO','TU','TH','FR'],t:'17:00'});
  const D=[['MO','M'],['TU','T'],['WE','W'],['TH','T'],['FR','F'],['SA','S'],['SU','S']];
  return `<div class="card stack"><h2 class="h3">⏰ Workout reminders</h2><p class="small muted">Add a repeating reminder to your phone's calendar. You'll get a notification at workout time.</p>
    <div class="daypick">${D.map(([k,l])=>`<button class="${r.days.includes(k)?'on':''}" data-rd="${k}" aria-label="${k}">${l}</button>`).join('')}</div>
    <div class="row" style="gap:10px"><label class="small muted" style="font-weight:700">TIME</label><input class="num" id="rt" type="time" aria-label="Reminder time" value="${r.t}" style="flex:1;font-size:17px"></div>
    <a class="btn secondary" id="rcal" href="#" style="text-decoration:none">📅 Add to my calendar</a></div>`;
}
function bindReminders(v){
  const r=store.get('jams_remind',{days:['MO','TU','TH','FR'],t:'17:00'});
  const url=()=>`api/calendar?days=${r.days.join(',')}&t=${r.t.replace(':','')}&name=${encodeURIComponent(profile.name||'')}`;
  v.querySelectorAll('[data-rd]').forEach(b=>b.onclick=()=>{const k=b.dataset.rd;r.days=r.days.includes(k)?r.days.filter(x=>x!==k):[...r.days,k];store.set('jams_remind',r);b.classList.toggle('on');$('#rcal').href=url()});
  $('#rt').onchange=e=>{r.t=e.target.value||'17:00';store.set('jams_remind',r);$('#rcal').href=url()};
  $('#rcal').href=url();
  $('#rcal').onclick=e=>{if(!r.days.length){e.preventDefault();toast('Pick at least one day')}};
}

/* ---------- Parent lock ---------- */
let unlockedUntil=0;
async function pinHash(pin){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('jams-pin:'+pin));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
const pinIsSet=()=>!!store.get('jams_pin',null);
function requirePin(action,why){
  if(!pinIsSet()||Date.now()<unlockedUntil)return action();
  sheet(`<h2>🔒 Parent lock</h2><p class="muted">${why||'Ask a parent to enter the PIN.'}</p>
    <input class="txt pin" id="pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••">
    <button class="btn" id="pok">Unlock</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;$('#pin').focus();
    const go2=async()=>{if(await pinHash($('#pin').value)===store.get('jams_pin')){unlockedUntil=Date.now()+5*60000;closeLayer();action()}else{toast('Wrong PIN');$('#pin').value=''}};
    $('#pok').onclick=go2;$('#pin').onkeydown=e=>{if(e.key==='Enter')go2()};
  });
}
function pinSheet(after){
  sheet(`<h2>🔒 ${pinIsSet()?'Change':'Set'} parent PIN</h2><p class="muted small">4 digits. Keep it secret from the kids! 🤫</p>
    <input class="txt pin" id="p1" type="password" inputmode="numeric" maxlength="4" placeholder="New PIN" autocomplete="off">
    <input class="txt pin" id="p2" type="password" inputmode="numeric" maxlength="4" placeholder="Type it again" autocomplete="off">
    <button class="btn" id="psave">Save PIN</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    $('#psave').onclick=async()=>{const a=$('#p1').value,b=$('#p2').value;if(!/^\d{4}$/.test(a)){toast('Use exactly 4 numbers');return}if(a!==b){toast("The PINs don't match");return}
      store.set('jams_pin',await pinHash(a));unlockedUntil=Date.now()+5*60000;closeLayer();toast('🔒 Parent lock is on');after&&after()};
  });
}
function parentCard(){
  return `<div class="card stack"><h2 class="h3">🔒 Parent controls</h2>
    <p class="small muted">${pinIsSet()?'Parent lock is <b>on</b>. A PIN is needed to change levels, remove people, change sync, body tracking or Coach settings, or erase data.':'Set a 4-digit PIN so kids can\'t change levels, remove people or erase data.'}</p>
    <div class="row between"><span><b>Coach AI answers</b><br><span class="small muted">Off = Coach only uses its built-in answers</span></span><div class="seg" style="width:120px"><button class="${profile.coachAI===false?'on':''}" data-cai="0">Off</button><button class="${profile.coachAI===false?'':'on'}" data-cai="1">On</button></div></div>
    <div class="row between"><span><b>Child profile</b><br><span class="small muted">Coach uses simpler, kid-safe answers for ${esc(profile.name||'this person')}</span></span><div class="seg" style="width:120px"><button class="${profile.kid?'':'on'}" data-kidp="0">Off</button><button class="${profile.kid?'on':''}" data-kidp="1">On</button></div></div>
    <button class="btn secondary" id="pinset">${pinIsSet()?'Change PIN':'Set a parent PIN'}</button>
    ${pinIsSet()?'<button class="link" id="pinoff" style="padding:0;color:var(--muted)">Turn off parent lock</button>':''}</div>`;
}

const EFF={1:'😊 Easy',2:'💪 Just right',3:'😫 Too hard'};
let nextSay='';
function nextUp(a){for(const it of a.items){const k=it.sets.findIndex(s=>!s.done);if(k>=0)return `Rest over. Next: ${EX[it.id].name}, set ${k+1}.`}return 'Rest over.'}

/* ===== js/gear.js ===== */
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

/* ===== js/extras.js ===== */
/* KinFit · 6-month phases, share cards, stretching, tour, display settings, monthly report, feedback, backup history. */
/* =========================================================
   System upgrades: share cards, tour, 6-month phases, stretching,
   display settings, monthly report, feedback, backup history.
   ========================================================= */

/* ---------- 6-month plan phases ---------- */
const PHASES=[
  {n:1,name:'Foundation',e:'🧱',from:1,to:8,about:'Learn perfect form and build the habit.'},
  {n:2,name:'Build',e:'📈',from:9,to:16,about:'One extra set on the first exercise to build more muscle.'},
  {n:3,name:'Strength',e:'💥',from:17,to:24,about:'Heavier weights with fewer reps (or longer holds) to get stronger.'},
];
function planStart(){
  if(profile.planStart)return profile.planStart;
  const d=workoutDates(getJournal());return d.length?d[0]:null;
}
function planWeek(){const s=planStart();if(!s)return 0;return Math.floor((weekStart(new Date())-weekStart(parseIso(s)))/(7*864e5))+1}
function phaseInfo(){
  const w=planWeek();if(!w)return null;
  if(w>24)return {w,done:true};
  const ph=PHASES.find(p=>w>=p.from&&w<=p.to);
  return {w,ph,recovery:w%4===0};
}
function phasePlan(plan){
  const info=phaseInfo();if(!info||info.done)return plan.map(p=>p.slice());
  return plan.map((p,i)=>{const ex=EX[p[0]]||{},q=p.slice();
    if(info.ph.n===2&&i===0)q[1]=Math.min(5,q[1]+1);
    if(info.ph.n===3){if(ex.time){q[2]+=10;q[3]+=10}else if(ex.weight){q[2]=Math.max(3,q[2]-2);q[3]=Math.max(q[2],q[3]-2)}}
    if(info.recovery)q[1]=Math.max(2,q[1]-1);
    return q});
}
/* ---------- Share cards (image for WhatsApp, Messages...) ---------- */
async function shareImage(opts){
  const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  const col=lvl().color,grad=g.createLinearGradient(0,0,W,H);grad.addColorStop(0,col);grad.addColorStop(1,'#0f172a');
  g.fillStyle=grad;g.fillRect(0,0,W,H);
  g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<14;i++){g.beginPath();g.arc(Math.random()*W,Math.random()*H,40+Math.random()*120,0,7);g.fill()}
  const font=(w,s)=>`${w} ${s}px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif`;
  const center=(t,y,w,s,color='#fff')=>{g.font=font(w,s);g.fillStyle=color;g.textAlign='center';g.fillText(t,W/2,y)};
  center(opts.big||'🏆',300,'400',200);
  center(opts.title,440,'800',72);
  if(opts.sub)center(opts.sub,515,'600',40,'rgba(255,255,255,.85)');
  const st=opts.stats||[],bw=280,gap=30,x0=(W-(st.length*bw+(st.length-1)*gap))/2;
  st.forEach(([v,l],i)=>{const x=x0+i*(bw+gap);g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.roundRect?g.roundRect(x,590,bw,200,32):g.rect(x,590,bw,200);g.fill();
    g.textAlign='center';g.fillStyle='#fff';g.font=font('900',84);g.fillText(String(v),x+bw/2,700);g.font=font('600',34);g.fillStyle='rgba(255,255,255,.85)';g.fillText(l,x+bw/2,758)});
  let y=880;(opts.lines||[]).slice(0,4).forEach(t=>{center(t.length>44?t.slice(0,43)+'…':t,y,'700',42);y+=66});
  center('KINFIT',H-110,'900',44);center(location.host,H-58,'600',30,'rgba(255,255,255,.7)');
  const blob=await new Promise(r=>c.toBlob(r,'image/png'));
  const file=new File([blob],'kinfit.png',{type:'image/png'});
  try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:opts.text||'My workout on KinFit 💪'});return}}catch(e){if(e&&e.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='kinfit.png';document.body.appendChild(a);a.click();a.remove();toast('Image saved');
}
let lastDone=null;
function shareWorkout(){
  const d=lastDone||{};
  shareImage({big:d.prs&&d.prs.length?'🏆':'💪',title:`${profile.name||'I'} ${profile.name?'crushed':'crushed'} it!`,sub:`${d.e||'💪'} ${d.title||'Workout'} done`,
    stats:[[d.sets||0,'sets'],[d.mins||0,'minutes'],[weekStreak(),'week streak']],
    lines:[...(d.prs||[]).map(p=>'⭐ New record: '+p),...(d.badges||[]).map(b=>`${b.e} Badge: ${b.n}`)],text:`${profile.name||'I'} just finished ${d.title||'a workout'} on KinFit 💪`});
}
function shareProgress(){
  const j=getJournal(),ds=workoutDates(j),ws=weekStart(new Date()),wk=ds.filter(d=>parseIso(d)>=ws).length,rec=recordsTable(j);
  const best=Object.entries(rec).filter(([n,r])=>r.w).sort((a,b)=>b[1].w-a[1].w).slice(0,2).map(([n,r])=>`🏋️ ${n}: ${round1(r.w)} ${profile.unit}`);
  shareImage({big:'🔥',title:`${profile.name||'My'}${profile.name?"'s":''} progress`,sub:`${lvl().emoji} ${lvl().name} level`,stats:[[ds.length,'workouts'],[weekStreak(),'week streak'],[earnedBadges().length,'badges']],
    lines:[`📅 ${wk} active ${wk===1?'day':'days'} this week`,...best],text:'My progress on KinFit 🔥'});
}

/* ---------- Stretching & mobility ---------- */
const COOLDOWN=[
  {n:'Slow walk & deep breaths',e:'🚶',s:40,tip:'Breathe in through your nose, out through your mouth.'},
  {n:'Hamstring stretch',e:'🦵',s:40,tip:'Sit, one leg straight. Reach gently towards your toes. 20 seconds each leg.'},
  {n:'Quad stretch',e:'🦩',s:40,tip:'Stand, hold a wall, pull one heel to your bottom. 20 seconds each leg.'},
  {n:'Chest opener',e:'🫶',s:30,tip:'Clasp hands behind your back and gently lift your chest.'},
  {n:'Cross-body shoulder stretch',e:'🤗',s:40,tip:'Pull one arm across your chest. 20 seconds each side.'},
  {n:"Child's pose",e:'🧎',s:40,tip:'Kneel, sit back on your heels and stretch your arms forward on the floor.'},
  {n:'Calf stretch',fig:'calf_raise_bw',s:40,tip:'Hands on a wall, one leg back with the heel down. 20 seconds each.'},
];
const MOBILITY=[
  {n:'Neck rolls',e:'🙆',s:40,tip:'Slow half-circles. Never force it.'},
  {n:'Arm circles',fig:'_arms',s:40,tip:'Small circles getting bigger, both directions.'},
  {n:'Cat-cow',e:'🐈',s:60,tip:'On hands and knees, round your back up, then let it dip down. Slowly.'},
  {n:'Hip flexor stretch',fig:'_lunge',s:60,tip:'Half-kneel and gently push your hips forward. 30 seconds each side.'},
  {n:'Hip circles',e:'🌀',s:40,tip:'Hands on hips, big slow circles each way.'},
  {n:'Butterfly stretch',e:'🦋',s:50,tip:'Sit, soles of feet together, let your knees relax down.'},
  {n:'Thread the needle',e:'🧵',s:60,tip:'On hands and knees, slide one arm under your body and twist. 30 seconds each.'},
  {n:'Hamstring stretch',e:'🦵',s:60,tip:'Sit, one leg straight, reach gently. 30 seconds each leg.'},
  {n:'World’s greatest stretch',fig:'_lunge',s:60,tip:'Lunge, hand on the floor, twist and reach up. Switch sides halfway.'},
  {n:"Child's pose",e:'🧎',s:60,tip:'Breathe slowly and relax.'},
];
function runStretch(kind){
  const steps=kind==='cool'?COOLDOWN:MOBILITY,mins=Math.round(steps.reduce((a,s)=>a+s.s,0)/60);
  runSequence(steps,{closeText:'Stop',onFinish:()=>{
    const j=getJournal(),d=isoLocal();
    (j[d]=j[d]||[]).push({id:Date.now(),exercise:'🧘 Stretch',kind:'activity',act:'Stretch',minutes:mins,distance:0,dunit:'km',sets:[],timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),level:profile.level,u:Date.now()});
    setJournal(j);toast(`🧘 ${mins} minutes of stretching logged!`);say('Great stretching. Your muscles say thank you!');syncNow(true);if(route!=='workout')render()}});
}
function stretchCard(){
  return `<div class="card stack"><div class="row"><span class="ex-emoji">🧘</span><div style="flex:1"><b>Stretch & mobility</b><p class="small muted">Guided, with a timer. Great after workouts and on rest days.</p></div></div>
    <div class="row" style="gap:8px"><button class="btn sm secondary" style="flex:1" data-stretch="cool">5-min cool-down</button><button class="btn sm secondary" style="flex:1" data-stretch="mob">10-min mobility</button></div></div>`;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-stretch]');if(b)runStretch(b.dataset.stretch)});

/* ---------- First-time tour ---------- */
const TOUR=[
  {sel:'.card.hero',t:"This is today's workout. Tap the button and follow along. Tap ✓ after each set and we'll time your rest. ⏱"},
  {sel:'.streakpill',t:'Your 🔥 streak: how many weeks in a row you\'ve worked out. Rest days never break it!'},
  {sel:'[data-go="library"]',t:'Workouts: every exercise with moving drawings, your own workouts and sport plans.'},
  {sel:'[data-go="ask"]',t:'Coach: ask anything about exercises or your plan. 💬'},
  {sel:'[data-go="progress"]',t:'Progress: badges, records, charts and your muscle map. 📈'},
  {sel:'[data-who]',t:'Tap here to switch between people in your family, or add someone. 👨‍👩‍👧'},
];
function maybeTour(){if(!profile.toured&&profile.id&&route==='today'&&!$('#layer').innerHTML)setTimeout(()=>{if(route==='today'&&!$('#layer').innerHTML)startTour()},600)}
function startTour(){
  let i=0;
  const step=()=>{
    while(i<TOUR.length&&!document.querySelector(TOUR[i].sel))i++;
    if(i>=TOUR.length){finish();return}
    const el=document.querySelector(TOUR[i].sel);el.scrollIntoView({block:'center'});
    setTimeout(()=>{const r=el.getBoundingClientRect(),below=r.top<window.innerHeight/2;
      $('#layer').innerHTML=`<div class="tour"><div class="tour-hole" style="left:${r.left-6}px;top:${r.top-6}px;width:${r.width+12}px;height:${r.height+12}px"></div>
        <div class="tour-tip" style="${below?`top:${Math.min(r.bottom+14,window.innerHeight-200)}px`:`bottom:${Math.max(window.innerHeight-r.top+14,16)}px`}" role="dialog" aria-live="polite">
        <p>${TOUR[i].t}</p><div class="row between" style="margin-top:12px"><button class="link" id="tskip" style="color:var(--muted)">Skip tour</button><span class="small muted">${i+1} / ${TOUR.length}</span><button class="btn sm" id="tnext">${i===TOUR.length-1?'Done 🎉':'Next'}</button></div></div></div>`;
      $('#tnext').onclick=()=>{i++;step()};$('#tskip').onclick=finish},250);
  };
  const finish=()=>{closeLayer();profile.toured=true;saveProfile();window.scrollTo(0,0);if(profile.kid)kidSetupPrompt()};
  step();
}

/* ---------- Display: text size & theme (this device) ---------- */
function applyDisplay(){
  const z=store.get('jams_text','1'),t=store.get('jams_theme','auto');
  document.documentElement.style.setProperty('--zoom',z);
  if(t==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=t;
}
function displayCard(){
  const z=store.get('jams_text','1'),t=store.get('jams_theme','auto');
  return `<div class="card stack"><h2 class="h3">👀 Display</h2>
    <p class="small muted" style="font-weight:700">TEXT SIZE</p><div class="seg">${[['1','A'],['1.15','A+'],['1.3','A++']].map(x=>`<button class="${z===x[0]?'on':''}" data-zoom="${x[0]}" style="font-size:${14*x[0]}px">${x[1]}</button>`).join('')}</div>
    <p class="small muted" style="font-weight:700">THEME</p><div class="seg">${[['auto','📱 Auto'],['light','☀️ Light'],['dark','🌙 Dark']].map(x=>`<button class="${t===x[0]?'on':''}" data-theme-set="${x[0]}">${x[1]}</button>`).join('')}</div></div>`;
}

/* ---------- Monthly report (print / save as PDF) ---------- */
let reportMonth=null;
function renderReport(v){
  const now=new Date();reportMonth=reportMonth||`${now.getFullYear()}-${pad(now.getMonth()+1)}`;
  const [Y,M]=reportMonth.split('-').map(Number),first=new Date(Y,M-1,1),last=new Date(Y,M,0);
  const j=getJournal(),inM=d=>{const x=parseIso(d);return x>=first&&x<=last};
  const days=workoutDates(j).filter(inM),entries=days.flatMap(d=>j[d].map(e=>({...e,d})));
  const lifts=entries.filter(e=>e.kind!=='activity'),acts=entries.filter(e=>e.kind==='activity');
  const sets=lifts.reduce((a,e)=>a+(e.sets||[]).length,0),mins=acts.reduce((a,e)=>a+(e.minutes||0),0);
  const byEx={};lifts.forEach(e=>byEx[e.exercise]=(byEx[e.exercise]||0)+(e.sets||[]).length);
  const top=Object.entries(byEx).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const rec=recordsTable(j),prs=Object.entries(rec).filter(([n,r])=>inM(r.d));
  const weeks=[];for(let d=weekStart(first);d<=last;d=new Date(d.getTime()+7*864e5)){const e=new Date(d.getTime()+6*864e5);weeks.push([d,days.filter(x=>{const t=parseIso(x);return t>=d&&t<=e}).length])}
  const B=(profile.body||[]).filter(b=>inM(b.d)&&b.w).sort((a,b)=>a.d.localeCompare(b.d));
  const label=first.toLocaleDateString(undefined,{month:'long',year:'numeric'});
  v.innerHTML=`<div class="topbar noprint"><button class="link" id="rback">← Progress</button><div class="row" style="gap:6px"><button class="btn sm ghost" id="rprev" aria-label="Previous month">‹</button><button class="btn sm ghost" id="rnext" aria-label="Next month">›</button></div></div>
  <div class="report stack-lg">
    <div class="row between"><div>${logo()}<h1 style="margin-top:10px">${label} report</h1><p class="muted">${esc(profile.avatar)} ${esc(profile.name||'')} · ${lvl().emoji} ${lvl().name}</p></div></div>
    <div class="stats"><div class="stat"><b>${days.length}</b><span>active days</span></div><div class="stat"><b>${sets}</b><span>sets</span></div><div class="stat"><b>${mins}</b><span>activity min</span></div></div>
    <div class="card stack"><h2 class="h3">📅 Active days per week</h2>${weeks.map(([d,n])=>`<div class="row" style="gap:10px"><span class="small" style="width:70px">${d.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span><div class="famBar" style="flex:1;height:14px"><i style="width:${n/7*100}%"></i></div><b class="small" style="width:22px;text-align:right">${n}</b></div>`).join('')}</div>
    <div class="card stack"><h2 class="h3">💪 Most trained</h2>${top.length?top.map(([n,c])=>`<div class="row between"><span>${esc(n)}</span><b>${plural(c,'set')}</b></div>`).join(''):'<p class="muted small">No strength workouts this month.</p>'}</div>
    <div class="card stack"><h2 class="h3">🏆 Records set this month</h2>${prs.length?prs.map(([n,r])=>`<div class="row between"><span>${esc(n)}</span><b>${r.w?round1(r.w)+' '+profile.unit+' × '+r.wr:r.reps+' reps'}</b></div>`).join(''):'<p class="muted small">No new records this month. Keep pushing!</p>'}</div>
    ${acts.length?`<div class="card stack"><h2 class="h3">🏃 Activities</h2>${Object.entries(acts.reduce((m,e)=>(m[e.exercise]=(m[e.exercise]||0)+(e.minutes||0),m),{})).map(([n,m])=>`<div class="row between"><span>${esc(n)}</span><b>${m} min</b></div>`).join('')}</div>`:''}
    ${B.length>1?`<div class="card stack"><h2 class="h3">⚖️ Body weight</h2><p>${round1(toUnit(B[0].w,B[0].unit))} → <b>${round1(toUnit(B[B.length-1].w,B[B.length-1].unit))} ${profile.unit}</b></p></div>`:''}
    <div class="card stack"><h2 class="h3">🏅 Badges so far</h2><p>${BADGES.filter(b=>earnedBadges().includes(b.id)).map(b=>b.e+' '+b.n).join(' · ')||'None yet'}</p></div>
    <p class="small muted center">Made with KinFit · ${location.host}</p>
    <button class="btn noprint" id="rprint">🖨️ Print or save as PDF</button>
    <p class="small muted center noprint">On iPhone: tap Print, then pinch out on the preview and tap Share → Save to Files.</p>
  </div>`;
  const shift=n=>{const d=new Date(Y,M-1+n,1);reportMonth=`${d.getFullYear()}-${pad(d.getMonth()+1)}`;renderReport(v)};
  $('#rback').onclick=()=>go('progress');$('#rprev').onclick=()=>shift(-1);$('#rnext').onclick=()=>shift(1);
  $('#rprint').onclick=()=>{try{window.print()}catch(e){toast('Printing is not available here')}};
}

/* ---------- Feedback ---------- */
function feedbackCard(){
  return `<div class="card stack"><h2 class="h3">💬 Feedback</h2><p class="small muted">Found a problem or have an idea? We read everything.</p><button class="btn secondary" id="fbopen">Send feedback</button></div>`;
}
function feedbackSheet(){
  let t='idea';
  const draw=()=>sheet(`<h2>💬 Send feedback</h2>
    <div class="seg">${[['idea','💡 Idea'],['problem','🐞 Problem'],['love','❤️ Praise']].map(x=>`<button class="${t===x[0]?'on':''}" data-fbt="${x[0]}">${x[1]}</button>`).join('')}</div>
    <textarea class="txt area" id="fbm" rows="5" maxlength="1000" placeholder="${t==='problem'?'What happened? What were you trying to do?':t==='idea'?'What would make KinFit better for you?':'What do you like?'}">${esc(feedbackSheet.draft||'')}</textarea>
    <input class="txt small-in" id="fbc" maxlength="80" placeholder="Email (optional, only if you'd like a reply)" autocomplete="email">
    <p class="small muted">Kids: ask a grown-up before sharing an email. Please don't include other personal details.</p>
    <button class="btn" id="fbsend">Send</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-fbt]').forEach(b=>b.onclick=()=>{feedbackSheet.draft=$('#fbm').value;t=b.dataset.fbt;draw()});
    $('#fbsend').onclick=async()=>{const m=$('#fbm').value.trim();if(m.length<3){toast('Please write a little more');return}
      $('#fbsend').disabled=true;
      try{const r=await fetch('api/feedback',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({type:t,message:m,contact:$('#fbc').value.trim(),v:APP_VERSION})});
        if(r.status===429){toast('Thanks! You\'ve sent a lot already. Try again later');$('#fbsend').disabled=false;return}if(!r.ok)throw 0;
        feedbackSheet.draft='';closeLayer();toast('🙏 Thank you! Feedback sent')}catch(e){$('#fbsend').disabled=false;toast("Couldn't send. Check your internet")}};
  });
  draw();
}

/* ---------- Backup history (daily snapshots on the server) ---------- */
async function restoreHistorySheet(){
  let list=[];
  try{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'snapshots'})});const d=await r.json();if(!r.ok)throw 0;list=d.dates||[]}
  catch(e){toast("Couldn't load backups. Check your internet");return}
  sheet(`<h2>🕘 Earlier backups</h2><p class="muted small">Every day, a copy of your backup is kept for 30 days. Restoring replaces everything (all people) on this phone and in the cloud with that copy. Progress photos aren't affected.</p>
    <div class="stack">${list.length?list.map(d=>`<button class="who" data-snap="${d}"><span class="av">📦</span><span style="flex:1;text-align:left"><b>${niceDate(d)}</b><br><span class="small muted">As it was at the start of that day</span></span></button>`).join(''):'<p class="muted center">No earlier backups yet. They\'re made daily once you start syncing.</p>'}</div>
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-snap]').forEach(b=>b.onclick=()=>confirmBox(`Restore ${niceDate(b.dataset.snap)}?`,'Everything added after that day will be replaced. This can\'t be undone (but today\'s state is kept as a backup too).','Restore',async()=>{
      try{const r=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'snapshot',date:b.dataset.snap})});const d=await r.json();if(!r.ok||!d.data)throw 0;
        applyPayload(d.data);
        const r2=await fetch('api/sync',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:syncCfg.code,op:'put',data:localPayload()})});if(!r2.ok)throw 0;
        toast('📦 Backup restored');go('today')}catch(e){toast("Couldn't restore. Please try again")}},true));
  });
}

/* ---------- Today: one compact "This week" card, and optional rows ---------- */
const TODAY_ROWS={habits:'🌱 Daily habits',phase:'📅 6-month plan',challenge:'🏆 Monthly challenge',goal:'🎯 Goals',family:'👨‍👩‍👧 Family challenge',badges:'🏅 Badges',tip:'💡 Tip of the day'};
const todayHidden=k=>(profile.todayHide||[]).includes(k);
function weekRow(icon,title,value,pct,go='progress'){
  return `<button class="wrow" data-go="${go}"><span class="wi" aria-hidden="true">${icon}</span><span class="wt"><b>${title}</b>${pct!=null?`<span class="mini" aria-hidden="true"><i style="width:${Math.max(0,Math.min(100,pct))}%"></i></span>`:''}</span><span class="wv">${value}</span></button>`;
}
function weekCard(strip,earned){
  const rows=[];
  const info=phaseInfo();
  if(info&&!todayHidden('phase'))rows.push(info.done?weekRow('🎓','6-month plan complete!','',null,'me'):weekRow(info.ph.e,`Week ${info.w} of 24 · ${info.ph.name}${info.recovery?' (recovery week)':''}`,`${Math.round(info.w/24*100)}%`,info.w/24*100,'me'));
  if(!todayHidden('challenge')){const c=currentChallenge(),n=challengeProgress(c);rows.push(weekRow(c.e,`${c.name}: ${c.target} ${c.what.split(' (')[0]}`,n>=c.target?'🏆':`${n}/${c.target}`,n/c.target*100,'chal'))}
  const g=(profile.goals||[]).find(x=>!x.done);
  if(g&&!todayHidden('goal')){const n=goalProgress(g);rows.push(weekRow('🎯',esc(goalTitle(g)),`${Math.min(100,Math.round(n/g.target*100))}%`,n/g.target*100))}
  if(DB.list.length>1&&!todayHidden('family')){const ws=weekStart(new Date());const r=DB.list.map(p=>({p,n:workoutDates(getJournal(p)).filter(d=>parseIso(d)>=ws).length})).sort((a,b)=>b.n-a.n);
    rows.push(weekRow('👑',r[0].n?`Family leader: ${esc(r[0].p.name||'')} ${esc(r[0].p.avatar||'')}`:'Family challenge: who\'ll lead this week?',r[0].n?plural(r[0].n,'day'):''))}
  if(!todayHidden('badges'))rows.push(weekRow('🏅',`${plural(earned,'badge')} earned`,`${earned}/${BADGES.length}`,null));
  return `<div class="card stack"><div class="row between"><h2 class="h3">This week</h2><button class="link small" id="tcust">Customize</button></div>
    <div class="week">${strip}</div>${rows.length?`<div class="wrows">${rows.join('')}</div>`:''}
    ${info&&info.recovery&&!info.done&&!todayHidden('phase')?`<p class="small recov">😌 <b>Recovery week:</b> one less set on every exercise so your body can recharge. Next week you'll be stronger!</p>`:''}</div>`;
}
function customizeToday(){
  sheet(`<h2>Customize Today</h2><p class="small muted">Choose what shows on your Today screen.</p>
    <div class="stack">${Object.entries(TODAY_ROWS).map(([k,l])=>`<label class="toggle"><span>${l}</span><input type="checkbox" data-tk="${k}" ${todayHidden(k)?'':'checked'}></label>`).join('')}</div>
    <button class="btn" id="tdone">Done</button>`,()=>{
    $('#tdone').onclick=()=>{profile.todayHide=[...document.querySelectorAll('[data-tk]')].filter(x=>!x.checked).map(x=>x.dataset.tk);saveProfile();closeLayer();render()};
  });
}

/* ---------- Number picker: big − / + buttons instead of typing mid-workout ---------- */
function pickNumber({title,value,step=1,min=0,max=9999,quick=[],unit=''},done){
  sheet(`<h2>${title}</h2>
    <div class="picker"><button class="pkbig" id="pkm" aria-label="Minus ${step}">−</button><input class="num pkv" id="pkin" type="number" inputmode="decimal" min="${min}" step="${step}" value="${value===''||value==null?'':esc(value)}" aria-label="${esc(title)}"><button class="pkbig" id="pkp" aria-label="Plus ${step}">+</button></div>
    ${unit?`<p class="small muted center">${unit}</p>`:''}
    ${quick.length?`<div class="chips" style="justify-content:center">${[...new Set(quick.map(String))].filter(q=>q!==''&&q!=='undefined'&&q!=='0').map(q=>`<button data-pq="${esc(q)}">${esc(q)}</button>`).join('')}</div>`:''}
    <button class="btn" id="pkok">Done</button>`,()=>{
    const inp=$('#pkin'),cur=()=>parseFloat(inp.value)||0,clamp=v=>round1(Math.max(min,Math.min(max,v)));
    const finish=()=>{closeLayer();done(inp.value===''?'':String(clamp(cur())))};
    $('#pkm').onclick=()=>{inp.value=clamp(cur()-step)};$('#pkp').onclick=()=>{inp.value=clamp(cur()+step)};
    document.querySelectorAll('[data-pq]').forEach(b=>b.onclick=()=>{inp.value=clamp(parseFloat(b.dataset.pq));finish()});
    $('#pkok').onclick=finish;inp.onkeydown=e=>{if(e.key==='Enter')finish()};
  });
}

/* ---------- Undo bar (instead of "are you sure?" for small deletes) ---------- */
let undoTimer=null,undoCommit=null;
function undoable(msg,undo,commit){
  if(undoTimer){clearTimeout(undoTimer);undoCommit&&undoCommit()}
  let el=$('#undo');
  if(!el){el=document.createElement('div');el.id='undo';el.className='undo';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el)}
  el.innerHTML=`<span>${esc(msg)}</span><button id="undob">Undo</button>`;el.classList.add('show');
  undoCommit=commit;
  const end=()=>{el.classList.remove('show');undoTimer=null;undoCommit=null};
  $('#undob').onclick=()=>{clearTimeout(undoTimer);end();undo();toast('↩️ Undone')};
  undoTimer=setTimeout(()=>{const c=undoCommit;end();c&&c()},5000);
}

/* ===== js/smart.js ===== */
/* KinFit · Coach-built workouts, goals and monthly challenges. */

/* ---------- Workout builder ---------- */
// Equipment each exercise needs (beyond a wall, chair, step or backpack).
const NEEDS_BAR_OR_RACK=new Set(['pullup','dips','knee_raise','leg_raise','chin_up','weighted_pullup']);
const MACHINES=new Set(['lat_pulldown','leg_extension','cable_row','tricep_pushdown','leg_press','face_pull']);
const homeOk=id=>id.startsWith('backpack_')||(!EX[id].weight&&!NEEDS_BAR_OR_RACK.has(id)&&id!=='ab_wheel');
function equipOk(id,equip){
  if(equip==='none')return homeOk(id);
  if(equip==='dumbbells')return homeOk(id)||(EX[id].weight&&!EX[id].bar&&!MACHINES.has(id));
  return true;
}
const levelOk=id=>profile.level==='expert'||!EX[id].bar;
const FOCUS={full:{n:'Full-body',e:'⚡',m:null},legs:{n:'Legs',e:'🦵',m:['Legs','Glutes']},arms:{n:'Arms',e:'💪',m:['Arms']},core:{n:'Core',e:'🧱',m:['Core']},
  upper:{n:'Upper-body',e:'🏋️',m:['Chest','Back','Shoulders','Arms']},cardio:{n:'Cardio',e:'❤️',m:['Heart']}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function buildPool(equip){return Object.keys(EX).filter(id=>!id.startsWith('_')&&!id.startsWith('c_')&&equipOk(id,equip)&&levelOk(id))}
function buildWorkout({mins=15,focus='full',equip,sport}={}){
  equip=equip||(profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym');
  const count=Math.max(3,Math.min(8,Math.round(mins/3.5))),sets=mins<=10?2:3,beg=profile.level==='beginner';
  const pool=buildPool(equip);let picks=[];
  if(sport){const S=SPORTS.find(s=>s.id===sport);if(S)picks=shuffle(S.items.map(x=>x[0]).filter(id=>pool.includes(id)))}
  if(picks.length<count){
    const groups=FOCUS[focus]&&FOCUS[focus].m?[FOCUS[focus].m]:[['Legs','Glutes'],['Chest','Shoulders'],['Back'],['Core'],['Heart'],['Arms']];
    const buckets=groups.map(g=>shuffle(pool.filter(id=>!picks.includes(id)&&g.some(m=>exMatches(EX[id],m)))));
    for(let r=0;picks.length<count&&r<12;r++)buckets.forEach(b=>{const id=b.find(x=>!picks.includes(x));if(id&&picks.length<count)picks.push(id)});
  }
  picks=picks.slice(0,count);
  const items=picks.map(id=>{const ex=EX[id];
    if(ex.time)return [id,sets,beg?15:20,beg?30:40];
    if(['jumping_jacks','high_knees','mountain_climber'].includes(id))return [id,sets,20,30];
    return [id,sets,beg?6:8,beg?10:12]});
  const S=sport&&SPORTS.find(s=>s.id===sport),F=FOCUS[focus]||FOCUS.full;
  return {id:newId('r'),name:`${mins}-min ${S?S.name:F.n} workout`.slice(0,30),e:S?S.e:F.e,items};
}
function parseBuildRequest(q){
  q=q.toLowerCase();
  const m=q.match(/(\d{1,2})\s*-?\s*(min|minute)/),mins=m?Math.max(5,Math.min(60,+m[1])):15;
  const focus=/\bleg|lower body|squat/.test(q)?'legs':/\barm|bicep|tricep/.test(q)?'arms':/\bcore|\babs?\b|tummy|stomach/.test(q)?'core':/upper body|chest|back|shoulder/.test(q)?'upper':/cardio|run|sweat|fast|hiit|heart/.test(q)?'cardio':'full';
  const equip=/no equipment|home|bodyweight|body weight|without/.test(q)?'none':/dumbbell/.test(q)?'dumbbells':/gym|barbell|machine/.test(q)?'gym':null;
  const sport=(SPORTS.find(s=>q.includes(s.id)||q.includes(s.name.toLowerCase()))||{}).id||null;
  return {mins,focus,equip,sport};
}
const isBuildRequest=q=>/\b(make|create|build|give|plan|design|suggest|write)\b[\s\S]{0,40}\b(workout|routine|session|training|exercises)\b/i.test(q);
// Ask the AI to pick exercises (only from our list), and fall back to the built-in builder.
async function buildWithCoach(q){
  const opts=parseBuildRequest(q),equip=opts.equip||(profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym');
  const pool=buildPool(equip);
  if(profile.coachAI!==false&&askTimes().length<20){
    try{
      const t0=askTimes();t0.push(Date.now());store.set('jams_ask_times',t0);
      const ctrl=new AbortController(),tm=setTimeout(()=>ctrl.abort(),20000);
      const r=await fetch('api/chat',{method:'POST',headers:{'content-type':'application/json'},signal:ctrl.signal,
        body:JSON.stringify({mode:'build',request:q,level:profile.level,kid:isKid(),messages:[{role:'user',content:q}],catalog:pool.map(id=>`${id}=${EX[id].name}${EX[id].time?' [time]':''}`).join('; ')})});
      clearTimeout(tm);const d=await r.json().catch(()=>({}));
      const p=d&&d.plan;
      if(r.ok&&p&&Array.isArray(p.items)){
        const seen=new Set(),items=p.items.filter(x=>Array.isArray(x)&&pool.includes(String(x[0]))&&!seen.has(x[0])&&seen.add(x[0])).slice(0,8)
          .map(x=>{const ex=EX[x[0]],cap=ex.time?90:30,lo=Math.max(1,Math.min(cap,Math.round(+x[2])||(ex.time?20:8))),hi=Math.max(lo,Math.min(cap,Math.round(+x[3])||lo+4));
            return [String(x[0]),Math.max(1,Math.min(5,Math.round(+x[1])||3)),lo,hi]});
        if(items.length>=3)return {id:newId('r'),name:cleanText(p.name,30)||'Coach workout',e:cleanEmoji(p.emoji,'✨'),items,ai:true};
      }
    }catch(e){}
  }
  return buildWorkout(Object.assign({},opts,{equip}));
}
function workoutText(w){return `Here's your **${w.e} ${w.name}**:\n${w.items.map((p,i)=>`${i+1}. ${EX[p[0]].name}: ${repsText(p,EX[p[0]])}`).join('\n')}\nWarm up first, and stop if anything hurts. Have fun! 💪`}
function saveBuilt(w,start){
  const list=(profile.routines||[]).filter(x=>x.id!==w.id);list.push({id:w.id,name:w.name,e:w.e,items:w.items});profile.routines=list.slice(-50);saveProfile();syncNow(true);
  if(start)startCustom('r',w.id);else toast('⭐ Saved to My workouts');
}
function builderSheet(){
  const st={mins:15,focus:'full',sport:'',equip:profile.level==='beginner'?'none':profile.level==='intermediate'?'dumbbells':'gym'};let w=null;
  const chip=(k,v,l)=>`<button class="${String(st[k])===String(v)?'on':''}" data-b${k}="${v}">${l}</button>`;
  const draw=()=>sheet(`<h2>✨ Build me a workout</h2>
    <p class="small muted" style="font-weight:700">HOW LONG?</p><div class="chips">${[10,15,20,30].map(m=>chip('mins',m,m+' min')).join('')}</div>
    <p class="small muted" style="font-weight:700">FOCUS</p><div class="chips">${Object.entries(FOCUS).map(([k,f])=>chip('focus',k,f.e+' '+f.n)).join('')}</div>
    <p class="small muted" style="font-weight:700">FOR A SPORT? (optional)</p><div class="chips">${chip('sport','','None')}${SPORTS.map(s=>chip('sport',s.id,s.e+' '+s.name)).join('')}</div>
    <p class="small muted" style="font-weight:700">EQUIPMENT</p><div class="chips">${chip('equip','none','🏠 None')}${chip('equip','dumbbells','🏋️ Dumbbells')}${chip('equip','gym','🏟️ Full gym')}</div>
    ${w?`<div class="card stack" style="background:var(--bg)"><b>${esc(w.e)} ${esc(w.name)}</b><ol style="margin:0;padding-left:20px">${w.items.map(p=>`<li>${esc(EX[p[0]].name)}: ${repsText(p,EX[p[0]])}</li>`).join('')}</ol>
      <div class="row" style="gap:8px"><button class="btn sm ghost" id="bshuf">🔀 Shuffle</button><button class="btn sm secondary" id="bsave" style="flex:1">⭐ Save</button><button class="btn sm" id="bstart" style="flex:1">▶ Start</button></div></div>`
      :`<button class="btn" id="bgo">✨ Build it</button>`}
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    ['mins','focus','sport','equip'].forEach(k=>document.querySelectorAll(`[data-b${k}]`).forEach(b=>b.onclick=()=>{st[k]=k==='mins'?+b.dataset['b'+k]:b.dataset['b'+k];w=null;draw()}));
    const make=()=>{w=buildWorkout({mins:st.mins,focus:st.focus,equip:st.equip,sport:st.sport||null});draw()};
    if($('#bgo'))$('#bgo').onclick=make;if($('#bshuf'))$('#bshuf').onclick=make;
    if($('#bsave'))$('#bsave').onclick=()=>{saveBuilt(w,false);closeLayer();render()};
    if($('#bstart'))$('#bstart').onclick=()=>{closeLayer();saveBuilt(w,true)};
  });
  draw();
}

/* ---------- Monthly challenges ---------- */
const CHALLENGES=[
  {k:'push',e:'🙌',name:'Push-Up Power',what:'push-ups (any kind!)',target:100,match:/push-up/i},
  {k:'squat',e:'🪑',name:'Squat Squad',what:'squats (any kind)',target:150,match:/squat/i},
  {k:'days',e:'📅',name:'Show-Up Month',what:'active days',target:12,metric:'days'},
  {k:'plank',e:'🧱',name:'Plank Master',what:'seconds of planks',target:600,match:/plank/i},
  {k:'move',e:'🏃',name:'Move More',what:'active minutes (workouts, sports and stretching)',target:300,metric:'minutes'},
  {k:'lunge',e:'🦵',name:'Lunge Legend',what:'lunges',target:120,match:/lunge/i},
];
function currentChallenge(p=profile){
  const d=new Date(),c=CHALLENGES[(d.getFullYear()*12+d.getMonth())%CHALLENGES.length],L=(LEVELS[p.level]?p.level:'beginner');
  const target=c.metric==='days'?{beginner:8,intermediate:12,expert:16}[L]:Math.round(c.target*{beginner:.6,intermediate:1,expert:1.5}[L]/10)*10;
  return Object.assign({},c,{id:`${d.getFullYear()}-${pad(d.getMonth()+1)}-${c.k}`,target,month:d.toLocaleDateString(undefined,{month:'long'}),
    daysLeft:new Date(d.getFullYear(),d.getMonth()+1,0).getDate()-d.getDate()});
}
const activeMinutes=e=>e.kind==='activity'?(e.minutes||0):(e.sets||[]).length*2; // about 2 minutes per set, rest included
function challengeProgress(c,p=profile){
  const j=getJournal(p),d=new Date(),first=new Date(d.getFullYear(),d.getMonth(),1);
  const days=workoutDates(j).filter(x=>parseIso(x)>=first);
  if(c.metric==='days')return days.length;
  let n=0;days.forEach(x=>j[x].forEach(e=>{if(c.metric==='minutes')n+=activeMinutes(e);else if(c.match.test(e.exercise))(e.sets||[]).forEach(s=>n+=Number(s.reps)||0)}));
  return Math.round(n);
}
function challengeCard(){
  const c=currentChallenge(),n=challengeProgress(c),pct=Math.min(100,n/c.target*100),done=n>=c.target;
  const fam=DB.list.length>1?DB.list.filter(p=>p.id!==profile.id).map(p=>{const pc=currentChallenge(p),pn=challengeProgress(pc,p);return `<span class="badge">${esc(p.avatar||'🙂')} ${esc(p.name||'')} ${Math.min(100,Math.round(pn/pc.target*100))}%</span>`}).join(''):'';
  return `<div class="card stack chal"><div class="row between"><b>${c.e} ${c.month} challenge: ${c.name}</b>${done?'<span>🏆</span>':''}</div>
    <p class="small muted">${done?`You did it! ${n} ${c.what}. Amazing! 🎉`:`Do <b>${c.target}</b> ${c.what} this month. ${c.daysLeft} ${c.daysLeft===1?'day':'days'} left!`}</p>
    <div class="progress"><i style="width:${pct}%"></i></div><p class="small"><b>${n}</b> / ${c.target}</p>${fam?`<div>${fam}</div>`:''}
    <button class="btn sm secondary" data-chal>${c.match?(c.k==='plank'?'⏱ Do a plank now':'＋ Add some now'):'How to count'}</button></div>`;
}
// The exercise each rep/second challenge logs when you do some "right now".
function challengeExercise(c){
  const kid=profile.level==='beginner';
  return {plank:'plank',push:kid?'knee_pushup':'pushup',squat:'squat',lunge:'reverse_lunge'}[c.k];
}
function logChallengeSet(id,amount){
  const j=getJournal(),d=isoLocal(),ex=EX[id];
  (j[d]=j[d]||[]).push({id:Date.now(),exercise:ex.name,timestamp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),sets:[{reps:amount}],unit:profile.unit,level:profile.level,u:Date.now()});
  setJournal(j);syncNow(true);
  const c=currentChallenge(),n=challengeProgress(c);
  toast(`${c.e} +${amount} ${ex.time?'sec':''} · ${Math.min(n,c.target)}/${c.target}${n>=c.target?' 🏆':''}`);
  if(typeof checkChallenge==='function')checkChallenge();
  const nb=newBadges();if(nb.length)setTimeout(()=>toast(`🏅 New badge: ${nb[0].e} ${nb[0].n}!`),1400);
  render();
}
function challengeSheet(){
  const c=currentChallenge(),n=challengeProgress(c),id=c.match&&challengeExercise(c),ex=id&&EX[id];
  const left=Math.max(0,c.target-n);
  sheet(`<h2>${c.e} ${c.name}</h2>
    <p class="muted">${n>=c.target?`Done! ${n} ${c.what} this month. 🎉`:`<b>${n} / ${c.target}</b> ${c.what}. ${left} to go, ${c.daysLeft} ${c.daysLeft===1?'day':'days'} left.`}</p>
    <div class="progress"><i style="width:${Math.min(100,n/c.target*100)}%"></i></div>
    ${ex?(ex.time?`<p class="small muted">Pick how long, then follow the countdown. Tap ✓ Done early if you need to stop: only the seconds you held count.</p>
        <div class="chips" style="justify-content:center">${[20,30,45,60,90].map(s=>`<button data-chs="${s}">${s} sec</button>`).join('')}</div>`
      :`<p class="small muted">Did some ${esc(ex.name.toLowerCase())}? Add them here.</p><button class="btn" id="chreps">＋ Add ${esc(ex.name)}</button>`)
      :`<p class="small muted">${c.metric==='days'?'Every day you do a workout, sport or stretch counts.':'Workouts, sports and stretching all add minutes.'}</p>
        <button class="btn" id="chact">🏃 Log an activity</button>`}
    ${ex?`<p class="small muted">${{plank:'Planks',push:'Push-ups',squat:'Squats',lunge:'Lunges'}[c.k]} in your workouts count too.</p>`:''}
    <button class="btn ghost" id="cancel">Close</button>`,()=>{
    $('#cancel').onclick=closeLayer;
    if($('#chact'))$('#chact').onclick=()=>{closeLayer();activitySheet()};
    if($('#chreps'))$('#chreps').onclick=()=>pickNumber({title:`${esc(ex.name)}: how many?`,value:10,step:1,min:1,max:500,quick:[5,10,15,20,25],unit:ex.per?'reps '+ex.per:'reps'},v=>{const r=parseInt(v,10);if(r>0)logChallengeSet(id,r)});
    document.querySelectorAll('[data-chs]').forEach(b=>b.onclick=()=>{const secs=+b.dataset.chs;closeLayer();
      runSequence([{n:'Get ready…',s:5,ready:true,tip:ex.tip},{n:ex.name,s:secs,fig:id,tip:'Straight line from head to heels. Breathe!'}],{doneBtn:true,closeText:'Cancel',
        onFinish:st=>{const held=st.stoppedAt!=null&&st.i===1?st.stoppedAt:secs;if(held>0)logChallengeSet(id,held)}})});
  });
}
document.addEventListener('click',e=>{if(e.target.closest('[data-chal]'))challengeSheet()});
function checkChallenge(){
  const c=currentChallenge();if((profile.chDone||[]).includes(c.id))return;
  if(challengeProgress(c)>=c.target){profile.chDone=[...(profile.chDone||[]),c.id].slice(-60);saveProfile();setTimeout(()=>{toast(`🏆 ${c.name} challenge complete!`);say(`Challenge complete! You are a ${c.name} champion!`)},500);syncNow(true)}
}

/* ---------- Goals ---------- */
const GOAL_TYPES={lift:'💪 Lift heavier',reps:'🔁 More reps',workouts:'📅 Workouts',minutes:'⏱ Active minutes'};
function goalProgress(g){
  const j=getJournal();
  if(g.type==='lift'||g.type==='reps'){let b=0;workoutDates(j).forEach(d=>j[d].forEach(e=>{if(e.exercise!==g.ex)return;(e.sets||[]).forEach(s=>{b=Math.max(b,g.type==='lift'?toUnit(Number(s.weight)||0,e.unit):Number(s.reps)||0)})}));return round1(b)}
  const ds=workoutDates(j).filter(d=>d>=g.start);
  if(g.type==='workouts')return ds.length;
  let n=0;ds.forEach(d=>j[d].forEach(e=>n+=activeMinutes(e)));return Math.round(n);
}
const goalTitle=g=>g.type==='lift'?`${g.ex}: ${g.target} ${profile.unit}`:g.type==='reps'?`${g.ex}: ${g.target} ${EX[exByName(g.ex)]&&EX[exByName(g.ex)].time?'seconds':'reps'} in one set`:g.type==='workouts'?`${g.target} active days`:`${g.target} active minutes`;
function goalsCard(){
  const G=profile.goals||[];
  return `<div class="card stack"><div class="row between"><h2 class="h3">🎯 Goals</h2><button class="btn sm secondary" id="goalnew">＋ New goal</button></div>
    ${G.length?G.map(g=>{const n=goalProgress(g),pct=Math.min(100,n/g.target*100),left=Math.ceil((parseIso(g.by)-parseIso(isoLocal()))/864e5);
      return `<div><div class="row between"><b class="small">${esc(goalTitle(g))}</b><button class="xbtn" data-gdel="${esc(g.id)}" aria-label="Delete goal">✕</button></div>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <p class="small muted">${g.done?`✅ Reached on ${niceDate(g.done)}! 🎉`:`${n} / ${g.target} · ${left>0?`${left} ${left===1?'day':'days'} left (by ${niceDate(g.by)})`:left===0?'due today!':'past the date. Keep going or set a new one'}`}</p></div>`}).join('')
      :`<p class="small muted">Set a goal like "Bench 135 lbs by March" or "20 workouts this term", and watch the bar fill up!</p>`}
  </div>`;
}
function checkGoals(){
  let changed=false;(profile.goals||[]).forEach(g=>{if(!g.done&&goalProgress(g)>=g.target){g.done=isoLocal();changed=true;const t=goalTitle(g);setTimeout(()=>{toast(`🎯 Goal reached: ${t}!`);say('Goal reached! Amazing work!')},700)}});
  if(changed){saveProfile();syncNow(true)}
}
function goalSheet(){
  const in8=isoLocal(new Date(Date.now()+56*864e5));
  const st={type:'workouts',ex:'',target:'',by:in8};
  const exOpts=()=>Object.keys(EX).filter(id=>!id.startsWith('_')&&(st.type==='lift'?EX[id].weight:!EX[id].weight)).map(id=>EX[id].name).sort();
  const suggest=()=>{if(st.type==='workouts')return 20;if(st.type==='minutes')return 600;if(!st.ex)return '';const cur=goalProgress({type:st.type,ex:st.ex});return cur?Math.ceil(cur*1.15/(st.type==='lift'?5:1))*(st.type==='lift'?5:1):(st.type==='lift'?20:10)};
  const draw=()=>sheet(`<h2>🎯 New goal</h2>
    <div class="chips">${Object.entries(GOAL_TYPES).map(([k,l])=>`<button class="${st.type===k?'on':''}" data-gt="${k}">${l}</button>`).join('')}</div>
    ${st.type==='lift'||st.type==='reps'?`<div><label class="small muted" style="font-weight:700">EXERCISE</label><select class="sel" id="gex"><option value="">Pick an exercise…</option>${exOpts().map(n=>`<option ${n===st.ex?'selected':''}>${esc(n)}</option>`).join('')}</select>${st.ex?`<p class="small muted" style="margin-top:6px">Your best so far: <b>${goalProgress({type:st.type,ex:st.ex})||'none yet'}</b></p>`:''}</div>`:''}
    <div class="row" style="gap:10px"><div style="flex:1"><label class="small muted" style="font-weight:700">TARGET ${st.type==='lift'?'('+profile.unit+')':st.type==='minutes'?'(minutes)':st.type==='workouts'?'(days)':'(reps)'}</label><input class="num" id="gt" type="number" inputmode="decimal" min="1" value="${st.target||suggest()}"></div>
      <div style="flex:1"><label class="small muted" style="font-weight:700">BY</label><input class="num" id="gby" type="date" min="${isoLocal()}" value="${st.by}" style="font-size:16px"></div></div>
    <p class="small muted">💡 A good goal is a little hard but doable. Aim for about 10–20% better in 6–8 weeks.</p>
    <button class="btn" id="gsave">Set goal</button><button class="btn ghost" id="cancel">Cancel</button>`,()=>{
    const read=()=>{st.target=$('#gt').value;st.by=$('#gby').value||in8;if($('#gex'))st.ex=$('#gex').value};
    $('#cancel').onclick=closeLayer;
    document.querySelectorAll('[data-gt]').forEach(b=>b.onclick=()=>{read();st.type=b.dataset.gt;st.ex='';st.target='';draw()});
    if($('#gex'))$('#gex').onchange=()=>{read();st.target='';draw()};
    $('#gsave').onclick=()=>{read();const t=parseFloat(st.target);
      if((st.type==='lift'||st.type==='reps')&&!st.ex){toast('Pick an exercise');return}
      if(!(t>0)){toast('Enter a target');return}
      profile.goals=[...(profile.goals||[]),{id:newId('g'),type:st.type,ex:st.ex,target:t,start:isoLocal(),by:st.by,done:null}].slice(-20);
      saveProfile();closeLayer();toast('🎯 Goal set. You\'ve got this!');syncNow(true);checkGoals();render()};
  });
  draw();
}
function bindGoals(v){
  if($('#goalnew'))$('#goalnew').onclick=goalSheet;
  v.querySelectorAll('[data-gdel]').forEach(b=>b.onclick=()=>{const before=(profile.goals||[]).slice();profile.goals=before.filter(g=>g.id!==b.dataset.gdel);saveProfile();render();
    undoable('Goal deleted',()=>{profile.goals=before;saveProfile();render()},()=>syncNow(true))});
}
function goalPeek(){
  const g=(profile.goals||[]).find(x=>!x.done);if(!g)return '';
  const n=goalProgress(g),pct=Math.min(100,Math.round(n/g.target*100));
  return `<button class="card row" data-go="progress" style="width:100%;text-align:left"><span class="big-emoji">🎯</span><div style="flex:1"><b>${esc(goalTitle(g))}</b><div class="progress" style="margin-top:6px"><i style="width:${pct}%"></i></div></div><b>${pct}%</b></button>`;
}

/* ===== js/habits.js ===== */
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
    render();syncNow(true);
  });
  v.querySelectorAll('[data-habm]').forEach(b=>b.onclick=()=>{const id=b.dataset.habm;setHabitCount(id,Math.max(0,habitCount(id)-1));render();syncNow(true)});
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
      $('#hdone').onclick=()=>{closeLayer();render();syncNow(true)};
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

/* ===== js/more.js ===== */
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

/* ===== js/me.js ===== */
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
    <p class="small muted center">KinFit · Made for every level 💙<br><a href="privacy.html" class="footlink">Privacy policy</a> · <a href="/workouts" class="footlink">Workout plans &amp; exercises</a></p>
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
    switchProfile(DB.list[0].id);syncNow(true)},true),'A parent PIN is needed to remove a person.');
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
function bindBackup(){
  if($('#bkon'))$('#bkon').onclick=()=>requirePin(async()=>{syncCfg={code:newSyncCode(),last:0};saveSync();const ok=await syncNow(false);if(!ok){syncCfg={code:null,last:0};saveSync();render();return}render();saveCodeSheet()},'A parent PIN is needed to turn on backup.');
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
    setJournal(j);toast(`Restored ${added} entries ✅`);syncNow(true);
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
