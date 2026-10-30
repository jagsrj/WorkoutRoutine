// POST /api/feedback: ideas, problems and praise from users. Stored for 180 days in KV under
// keys starting "fb:" (Cloudflare → Storage & Databases → KV → jams-store).
import { overLimit, clientIp, json, sameOrigin } from '../_lib/limit.js';
const clean = (x, n) => String(x ?? '').replace(/[\u0000-\u0008\u000b-\u001f<>]/g, ' ').slice(0, n);
export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.STORE) return json({ error: 'not_configured' }, 503);
  const hour = Math.floor(Date.now() / 3600000);
  if (await overLimit(env, `fb:${clientIp(request)}:${hour}`, 5, 3700)) return json({ error: 'rate_limited' }, 429);
  let b; try { b = JSON.parse((await request.text()).slice(0, 6000)); } catch { return json({ error: 'bad_request' }, 400); }
  const message = clean(b.message, 1000).trim();
  if (message.length < 3) return json({ error: 'bad_request' }, 400);
  const rec = { type: ['idea', 'problem', 'love'].includes(b.type) ? b.type : 'idea', message, contact: clean(b.contact, 80), v: clean(b.v, 20), at: new Date().toISOString() };
  await env.STORE.put(`fb:${rec.at.slice(0, 10)}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(rec), { expirationTtl: 180 * 86400 });
  return json({ ok: true });
}
