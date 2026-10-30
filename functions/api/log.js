// POST /api/log: error reports from the app (no personal data). Stored for 30 days in KV
// under keys starting "err:" (Cloudflare → Storage & Databases → KV → jams-store), and also
// printed to the Functions real-time logs.
import { overLimit, clientIp, sameOrigin } from '../_lib/limit.js';
const clean = (x, n) => String(x ?? '').replace(/[\u0000-\u001f<>]/g, ' ').slice(0, n);
export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const hour = Math.floor(Date.now() / 3600000);
  if (await overLimit(env, `log:${clientIp(request)}:${hour}`, 30, 3700)) return new Response(null, { status: 429 });
  let b; try { b = JSON.parse((await request.text()).slice(0, 4000)); } catch { return new Response(null, { status: 400 }); }
  const rec = { m: clean(b.m, 300), s: clean(b.s, 60), l: Number(b.l) | 0, r: clean(b.r, 20), v: clean(b.v, 20), d: clean(b.d, 20), at: new Date().toISOString() };
  console.log('app-error', JSON.stringify(rec));
  if (env.STORE) await env.STORE.put(`err:${rec.at.slice(0, 10)}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(rec), { expirationTtl: 30 * 86400 });
  return new Response(null, { status: 204 });
}
