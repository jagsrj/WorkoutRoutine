// Rate limiting and small helpers shared by the /api functions.
//
// Why two kinds of limit: Cloudflare's free plan allows only 1,000 KV writes a day, and a KV
// counter costs one write per request. So most limits are counted in memory (per Cloudflare
// server, free, slightly less exact), and only the site-wide AI budget is counted in KV,
// where it must be shared across servers. See docs/SOLUTION_ARCHITECTURE.md, section 9.
const mem = new Map();
function memOver(key, max, ttlSeconds) {
  const now = Date.now(), e = mem.get(key);
  if (mem.size > 5000) for (const [k, v] of mem) if (v.reset < now) mem.delete(k); // keep memory small
  if (!e || e.reset < now) { mem.set(key, { n: 1, reset: now + ttlSeconds * 1000 }); return false; }
  if (e.n >= max) return true;
  e.n++; return false;
}
// Per-person limits (by IP): in memory, no KV writes.
export async function overLimit(env, key, max, ttlSeconds) {
  return memOver(key, max, ttlSeconds);
}
// Site-wide limits that must be shared across servers (one KV write per call). If KV is
// missing or out of writes for the day, falls back to memory instead of failing the request.
export async function overSharedLimit(env, key, max, ttlSeconds) {
  if (!env.STORE) return memOver(key, max, ttlSeconds);
  try {
    const k = 'rl:' + key;
    const n = parseInt(await env.STORE.get(k), 10) || 0;
    if (n >= max) return true;
    await env.STORE.put(k, String(n + 1), { expirationTtl: Math.max(60, ttlSeconds) });
    return false;
  } catch (e) {
    return memOver(key, max, ttlSeconds);
  }
}
// Writes to KV, returning false (instead of throwing) when the daily write allowance is used up.
export async function safePut(env, key, value, opts) {
  try { await env.STORE.put(key, value, opts); return true; } catch (e) { console.log('kv-put-failed', key.split(':')[0], String(e && e.message || e).slice(0, 120)); return false; }
}
export const clientIp = request => request.headers.get('cf-connecting-ip') || 'unknown';
export const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  try { return !origin || new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
// Remembers recent messages in memory so the same error isn't stored many times.
const seen = new Map();
export function seenRecently(key, ttlSeconds) {
  const now = Date.now();
  if (seen.size > 2000) seen.clear();
  if ((seen.get(key) || 0) > now) return true;
  seen.set(key, now + ttlSeconds * 1000); return false;
}
