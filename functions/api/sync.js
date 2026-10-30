// Cloudflare Pages Function: POST /api/sync
// Stores each family's data under a private sync code (only a hash of the code is kept).
// Setup (one time): Cloudflare dashboard → Storage & Databases → KV → Create namespace (e.g. "jams-store"),
//   then this Pages project → Settings → Bindings → Add → KV namespace → Variable name: STORE → pick it → Save, then redeploy.
import { overLimit, clientIp, json, sameOrigin } from '../_lib/limit.js';

const CODE_RE = /^[A-HJ-NP-Z2-9]{4}(-[A-HJ-NP-Z2-9]{4}){3}$/;
const MAX_BYTES = 2_000_000;

async function keyFor(code) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('jams-sync:' + code));
  return 'sync:' + [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  if (!sameOrigin(request)) return json({ error: 'forbidden' }, 403);
  if (!env.STORE) return json({ error: 'not_configured' }, 503);

  const hour = Math.floor(Date.now() / 3600000);
  if (await overLimit(env, `sync:${clientIp(request)}:${hour}`, 60, 3700)) return json({ error: 'rate_limited' }, 429);

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json({ error: 'too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'bad_request' }, 400); }
  const code = String(body.code || '').toUpperCase();
  if (!CODE_RE.test(code)) return json({ error: 'bad_code' }, 400);
  const key = await keyFor(code);

  if (body.op === 'get') {
    const data = await env.STORE.get(key, 'json');
    return json({ data: data || null });
  }
  if (body.op === 'put') {
    const d = body.data;
    if (!d || typeof d !== 'object' || !Array.isArray(d.profiles) || typeof d.data !== 'object') return json({ error: 'bad_request' }, 400);
    await env.STORE.put(key, JSON.stringify(d), { metadata: { updated: Date.now() } });
    return json({ ok: true });
  }
  if (body.op === 'delete') {
    await env.STORE.delete(key);
    return json({ ok: true });
  }
  return json({ error: 'bad_request' }, 400);
}

export const onRequest = () => json({ error: 'method_not_allowed' }, 405);
