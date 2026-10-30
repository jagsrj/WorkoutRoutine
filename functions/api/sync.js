// Cloudflare Pages Function: POST /api/sync
// Stores each family's data under a private sync code (only a hash of the code is kept).
// Setup (one time): Cloudflare dashboard → Storage & Databases → KV → Create namespace (e.g. "jams-store"),
//   then this Pages project → Settings → Bindings → Add → KV namespace → Variable name: STORE → pick it → Save, then redeploy.
import { overLimit, clientIp, json, sameOrigin } from '../_lib/limit.js';

const CODE_RE = /^[A-HJ-NP-Z2-9]{4}(-[A-HJ-NP-Z2-9]{4}){3}$/;
const MAX_BYTES = 2_000_000;

// Structural checks so only well-formed family data can be stored.
// (The app also cleans every field again when it loads data.)
const PID = /^p[a-z0-9]{1,40}$/, DATE = /^\d{4}-\d{2}-\d{2}$/;
function validPayload(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return false;
  if (!Array.isArray(d.profiles) || d.profiles.length > 20) return false;
  if (!d.profiles.every(p => p && typeof p === 'object' && PID.test(String(p.id)) && (p.name === undefined || (typeof p.name === 'string' && p.name.length <= 24)))) return false;
  if (d.deletedProfiles !== undefined && (!Array.isArray(d.deletedProfiles) || d.deletedProfiles.length > 200)) return false;
  if (!d.data || typeof d.data !== 'object' || Array.isArray(d.data)) return false;
  const ids = new Set(d.profiles.map(p => p.id));
  for (const [id, v] of Object.entries(d.data)) {
    if (!ids.has(id) || !v || typeof v !== 'object') return false;
    const j = v.journal || {};
    if (typeof j !== 'object' || Array.isArray(j)) return false;
    if (Object.keys(j).length > 5000 || !Object.keys(j).every(k => DATE.test(k) && Array.isArray(j[k]))) return false;
  }
  return true;
}

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
    if (!validPayload(d)) return json({ error: 'bad_request' }, 400);
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
