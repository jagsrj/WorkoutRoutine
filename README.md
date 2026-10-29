# JAMS Fitness 🏋️

Simple workout plans for every level. Pick your level, follow the plan and watch yourself get stronger. It's built to be easy enough for a 12-year-old.

**Use it:** open `index.html` in any browser. On a phone, tap **Share → Add to Home Screen** to use it like an app.

**Hosting:** deployed on Cloudflare Workers (`wrangler.jsonc`). Every push to `main` redeploys automatically. `.assetsignore` keeps `.git`, the README and the config off the live site.

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
- **Settings:** lbs or kg, rest time, and back up or restore your data. Safety tips are included.
- Works offline, has no sign-up and no tracking. Data stays on the device (localStorage).
- Supports dark mode.

## Compatibility

History saved by the earlier version (the `workout_journal` key) is kept and shows up in Progress, and old backup files can be restored.

## Safety

This app gives general fitness guidance, not medical advice. Under-18s should lift weights with an adult or coach nearby. Stop if something hurts sharply.
