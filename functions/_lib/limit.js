// Simple rate limiting. Uses the STORE (KV) binding when it's set up so limits are
// shared across Cloudflare's servers; otherwise falls back to per-server memory.
const mem = new Map();
export async function overLimit(env, key, max, ttlSeconds) {
  if (env.STORE) {
    const k = 'rl:' + key;
    const n = parseInt(await env.STORE.get(k), 10) || 0;
    if (n >= max) return true;
    await env.STORE.put(k, String(n + 1), { expirationTtl: Math.max(60, ttlSeconds) });
    return false;
  }
  const now = Date.now(), e = mem.get(key);
  if (!e || e.reset < now) { mem.set(key, { n: 1, reset: now + ttlSeconds * 1000 }); return false; }
  if (e.n >= max) return true;
  e.n++; return false;
}
export const clientIp = request => request.headers.get('cf-connecting-ip') || 'unknown';
export const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  try { return !origin || new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
