# JAMS Fitness 🏋️

Simple workout plans for every level. Pick your level, follow the plan and watch yourself get stronger. It's built to be easy enough for a 12-year-old.

**Use it:** open `index.html` in any browser. On a phone, tap **Share → Add to Home Screen** to use it like an app.

**Hosting:** Cloudflare Pages at https://workoutroutine-aeq.pages.dev. Every push to `main` redeploys automatically (no build command, output directory `/`).

**One-time Cloudflare settings** (Pages project → Settings → Bindings):

| Binding | Type | What it turns on |
|---|---|---|
| `AI` | Workers AI | AI answers in the Coach chat |
| `STORE` | KV namespace (create one first under Storage & Databases → KV) | Cloud sync, and Coach limits shared across servers |

Redeploy after adding bindings. Coach allows 20 AI questions per hour per person and 300 per day for the whole site, to stay inside the free allowance.

**Turning on AI answers in the Coach chat:** in the Cloudflare dashboard open the Pages project, then **Settings → Bindings → Add → Workers AI**, set the variable name to `AI`, save, and redeploy. Without it, Coach still answers from its built-in answers. The server code is in `functions/api/chat.js`.

## Features

- **Find your level quiz:** 5 quick questions recommend Beginner, Intermediate or Expert. It caps the level for safety by age: under 13 → Beginner; 13–17 → no barbell plan without a coach.
- **Three complete plans** (4 workouts each, Upper A / Lower A / Upper B / Lower B):
  - 🌱 **Beginner:** no equipment (wall, chair, backpack)
  - 🔥 **Intermediate:** dumbbells and machines
  - 🏆 **Expert:** barbell squat, bench, deadlift, overhead press
- **Today screen:** shows today's workout from the weekly schedule, with a week view and ticks on the days you trained.
- **Guided workout:** tap ✓ after each set, and a rest timer starts with a beep and vibration. Your last weight is filled in for you, and if you leave mid-workout it's saved so you can continue.
- **Smart progression:** when you hit the top of the rep range on every set, the app tells you to add weight or reps (double progression).
- **Exercise library:** simple 3-step instructions, a tip and a video for every move.
- **Progress:** total workouts, a week streak, a 12-week calendar, a chart for each exercise, and history you can delete from. It also suggests moving up a level when you're ready.
- **Ask Coach chat:** built-in answers about exercises, levels, soreness, warm-ups and progression work instantly and offline. Other questions go to Cloudflare Workers AI with kid-safe, fitness-only rules.
- **People:** several people on one phone, each with their own level, history, badges and buddy avatar.
- **Badges:** 17 badges for workouts, streaks, records, warm-ups and more.
- **Guided warm-up:** a 5-minute follow-along with a countdown.
- **Timed moves:** planks and wall sits have a big countdown button.
- **Animated drawings:** every exercise has a moving figure.
- **Swap an exercise:** switch to an easier or no-equipment move.
- **Edit history:** fix past entries.
- **Cloud sync:** a private sync code shares people and workouts across devices, with no account needed.
- **Progress photos (optional):** off by default; photos stay on the device only, with a timeline and a before/after slider.
- **Streak:** a weekly streak card on Today and a 🔥 counter at the top of every screen.
- **Offline:** a service worker (`sw.js`) lets the app open without internet.
- **Settings:** lbs or kg, rest time, and back up or restore your data. Safety tips are included.
- Works offline, has no sign-up and no tracking. Data stays on the device (localStorage).
- Supports dark mode.

## Compatibility

History saved by the earlier version (the `workout_journal` key) is kept and shows up in Progress, and old backup files can be restored.

## Safety

This app gives general fitness guidance, not medical advice. Under-18s should lift weights with an adult or coach nearby. Stop if something hurts sharply.
