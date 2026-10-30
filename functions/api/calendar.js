// Cloudflare Pages Function: GET /api/calendar?days=MO,TU,TH,FR&t=1700&name=Sam
// Returns a repeating calendar event (.ics) with an alert, so phones remind you to work out.
// Opening this link on an iPhone offers "Add to Calendar". No data is stored.
const DAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export function onRequestGet({ request }) {
  const url = new URL(request.url);
  const days = (url.searchParams.get('days') || 'MO,TU,TH,FR').split(',').filter(d => DAYS.includes(d));
  const t = /^\d{4}$/.test(url.searchParams.get('t') || '') ? url.searchParams.get('t') : '1700';
  const hh = Math.min(23, +t.slice(0, 2)), mm = Math.min(59, +t.slice(2));
  const name = (url.searchParams.get('name') || '').replace(/[^\p{L}\p{N} '-]/gu, '').slice(0, 24);
  if (!days.length) return new Response('Pick at least one day', { status: 400 });

  // First occurrence: the next selected weekday (today counts if the time hasn't passed).
  const now = new Date();
  let start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  for (let i = 0; i < 8; i++) {
    const d = new Date(start); d.setUTCDate(start.getUTCDate() + i);
    if (days.includes(DAYS[d.getUTCDay()])) { start = d; break; }
  }
  const p2 = n => String(n).padStart(2, '0');
  const local = `${start.getUTCFullYear()}${p2(start.getUTCMonth() + 1)}${p2(start.getUTCDate())}T${p2(hh)}${p2(mm)}00`; // floating local time
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const site = url.origin;
  const title = `💪 Workout time${name ? ' for ' + name : ''}`;
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//KinFit//Reminders//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:jams-${days.join('')}-${t}-${Date.now()}@jams-fitness`,
    `DTSTAMP:${stamp}`, `DTSTART:${local}`, 'DURATION:PT45M',
    `RRULE:FREQ=WEEKLY;BYDAY=${days.join(',')}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:Open KinFit: ${site}`, `URL:${site}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${title}`, 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
  return new Response(ics, {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': 'inline; filename="jams-workout-reminder.ics"',
      'cache-control': 'no-store',
    },
  });
}
