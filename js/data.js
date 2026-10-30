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
  const m=FIG[id];if(!m)return '';const P=POSES[m[0]];
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
