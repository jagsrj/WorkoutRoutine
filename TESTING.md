# iPhone test checklist (10 minutes)

Automated tests run in Chrome's engine on every change. iPhones use Safari, so run this on a real iPhone (and ideally one Android phone) after big updates. Tick each box; if anything fails, use **Me → 💬 Send feedback → 🐞 Problem**.

## Setup
- [ ] Open the site in Safari → Share → **Add to Home Screen**. Open it from the new icon (name should be **KinFit**).
- [ ] First open shows the welcome screen. Do the quiz and pick a level. The **tour** appears on Today.

## Workout
- [ ] Start today's workout. Tap 🔊 so the voice coach is on.
- [ ] Tap ✓ on a set: the voice says "Rest…" and the **rest timer** appears.
- [ ] Wait for the timer to end: you **hear a beep** (the phone's silent switch must be off) and the voice says what's next.
- [ ] On a plank or wall sit, tap ⏱. The 3-2-1 countdown is spoken, and the big ring counts down.
- [ ] Open "How to do it": the drawing moves. Tap 🔊 **Read aloud**.
- [ ] Finish the workout: confetti shows. Tap **📤 Share**: the iPhone share sheet opens with an image.

## Data & backup
- [ ] Me → Backup & sync → **🔑 Save to my passwords**: iPhone asks "Save password?" → Save.
- [ ] Note what happened (prompt shown? saved in Settings → Passwords as "KinFit"/"JAMS Fitness"?).
- [ ] Optional: in Safari settings, clear this site's data, reopen, tap **Restore with your recovery code**, pick the saved code from the keyboard bar. Workouts come back.

## Other features
- [ ] Coach: ask "make me a 10-min legs workout". A workout appears with ⭐ Save / ▶ Start.
- [ ] Progress → 🎯 **New goal** → save. Progress → 📄 Monthly report → **Print** opens the print screen. (If it doesn't from the Home Screen app, try in Safari.)
- [ ] Me → Display → **A++** and **🌙 Dark**: text grows and colours change.
- [ ] Body tracking on → Progress → **📷 Add a photo** offers Camera and Photo Library.
- [ ] Me → ⏰ **Add to my calendar** offers to add a repeating event.
- [ ] Turn on Airplane mode and reopen the app from the icon: it still opens.

## Known iPhone limits
- Sounds don't play with the silent switch on (iPhone rule).
- The screen may dim during long timers on older iOS versions (screen wake lock needs iOS 16.4 or later).
- Safari can delete website data if the site isn't opened for several weeks, unless it's on the Home Screen. Keep backup on.
