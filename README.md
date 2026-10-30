# KinFit 🏋️

*Developed by the JAMS family 💙*

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
- **6-month plan phases:** Foundation, Build and Strength, with a recovery week every 4th week.
- **Share cards:** images of a workout or your progress, to send to family chats.
- **First-time tour, stretching and mobility routines, text size and a light/dark switch.**
- **Monthly report:** print it or save it as a PDF.
- **Feedback button** (`/api/feedback`) and **automatic error reports** (`/api/log`), both stored in KV (keys `fb:` and `err:`).
- **Daily backup history:** 30 days of snapshots you can restore (`/api/sync` ops `snapshots` and `snapshot`).
- **Home page:** `about.html`, with share-preview tags, `robots.txt` and `sitemap.xml`.
- **Coach builds workouts:** "make me a 15-min cricket workout" (AI picks from the library and the app double-checks the result; falls back to a built-in builder). Also **Workouts → Mine → ✨ Build one for me**.
- **Goals** (lift, reps, workouts, active minutes) and **monthly challenges** with family progress and badges.
- **Automated tests:** `tests/smoke.js` runs on every change (GitHub Actions).
- **Settings:** lbs or kg, rest time, and back up or restore your data. Safety tips are included.
- Works offline, has no sign-up and no tracking. Data stays on the device (localStorage).
- Supports dark mode.

## Ease of use and accessibility

- Text and colours meet WCAG AA contrast in light and dark mode (checked with axe-core on every screen).
- Buttons and links are at least 40–44 px tall, so they are easy to tap with sweaty fingers.
- Pop-up sheets are announced as dialogs to screen readers, and focus moves to their title.
- Today shows one compact "This week" card. Tap **Customize** to hide rows you don't need (plan, challenge, goals, family, badges, tip).
- During a workout, reps and weight use a big − / + picker with quick-pick numbers instead of typing. A new weight carries forward to the next sets.
- Deleting a workout, activity, measurement, goal or photo shows a 5-second **Undo** bar.
- A banner says when you're offline (workouts still save and sync later).
- **Interval timer** (Workouts → Plan): work/rest/rounds with beeps and an optional spoken countdown; add exercises to make a circuit. Finished sessions are logged as an activity.
- **Daily habits** (Today): water, sleep, stretching, screen-free time, reading and more, or make your own. Tap to tick off, see a 🔥 streak for each, and a 7-day view in Progress. Hide it with Customize. Habit ticks sync day by day.
- **My equipment** (Me): tick what you have (or pick *Ironax home gym*, *Dumbbells only*, *Full gym*). Each exercise shows the version for your equipment, e.g. leg press on a Smith machine plate, lat pulldown on a functional trainer, Smith or dumbbell versions of barbell lifts. Exercises you can't do show a note to swap them.
- **Your own videos:** in any exercise's *How to do it*, paste a YouTube link (watch, youtu.be or Shorts). ▶ Watch then opens your video instead of a search.
- **Child profiles:** when adding someone you choose "Me" or "My child". Child profiles get kid-safe Coach answers (no diet or weight-loss advice) and a prompt to set a parent PIN. Change it in Me → Parent controls.

## Compatibility

History saved by the earlier version (the `workout_journal` key) is kept and shows up in Progress, and old backup files can be restored.

## Safety

This app gives general fitness guidance, not medical advice. Under-18s should lift weights with an adult or coach nearby. Stop if something hurts sharply.

## Security
- Every value loaded from storage, sync or a backup file is cleaned (`sanitizeProfile` and `sanitizeJournal` in `js/store.js`) and escaped when shown.
- `_headers` sets a strict Content-Security-Policy (scripts only from this site, so injected code can't run), plus frame, sniffing, referrer and permissions protections.
- `/api/sync` rejects badly shaped data, limits request rates and stores data only under a SHA-256 hash of the recovery code.
- `tests/smoke.js` includes a test that plants booby-trapped data and confirms it can't run.
- Keep your recovery code private, and turn on two-factor login for your Cloudflare and GitHub accounts.

## Code layout
`index.html` (page and styles) loads `js/errors.js`, then `app.js`. **`app.js` is generated:** edit the files in `js/` (`data`, `store`, `screens`, `sync`, `coach`, `photos`, `features`, `extras`, `smart`, `more`, `me`, joined in that order), then run `node scripts/build.js`. The test workflow fails if `app.js` is out of date. Server functions are in `functions/api/`. Tests are in `tests/smoke.js` (plus a manual iPhone checklist in `TESTING.md`) and include unit checks for sync merging, data cleaning, 1RM maths and plan phases.
