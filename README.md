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
- **Backup & sync (on by default):** a private recovery code backs up people and workouts and restores them after a browser clear or on a new device. The code can be saved to the phone's password manager (`/api/saved`).
- **Progress photos (optional):** off by default; photos stay on the device only, with a timeline and a before/after slider.
- **Streak:** a weekly streak card on Today and a 🔥 counter at the top of every screen.
- **Offline:** a service worker (`sw.js`) lets the app open without internet.
- **Build your own:** custom workouts and custom exercises, plus sport plans (cricket, soccer, swimming, running, basketball).
- **75 exercises** you can search and filter by muscle.
- **Personal records:** automatic PR detection, estimated 1-rep max, and charts for heaviest, 1RM or volume.
- **Muscle map:** shows which muscles you trained this week.
- **Plate calculator and warm-up sets** for barbell lifts.
- **"How did that feel?"** effort rating that shapes the next workout's advice.
- **Activities:** log walks, runs, sports and more; they count toward streaks.
- **Body measurements:** weight and waist (part of opt-in body tracking).
- **Voice coach:** reads exercises, rest times and countdowns aloud.
- **Coach knows your history:** AI answers use your recent training log.
- **Family challenge:** a weekly leaderboard and high-fives between people.
- **Reminders:** repeating calendar reminders (`/api/calendar`).
- **Parent controls:** a PIN lock, plus Coach AI on/off per person. See the [privacy policy](privacy.html).
- **Automated tests:** `tests/smoke.js` runs on every change (GitHub Actions).
- **Settings:** lbs or kg, rest time, and back up or restore your data. Safety tips are included.
- Works offline, has no sign-up and no tracking. Data stays on the device (localStorage).
- Supports dark mode.

## Compatibility

History saved by the earlier version (the `workout_journal` key) is kept and shows up in Progress, and old backup files can be restored.

## Safety

This app gives general fitness guidance, not medical advice. Under-18s should lift weights with an adult or coach nearby. Stop if something hurts sharply.
