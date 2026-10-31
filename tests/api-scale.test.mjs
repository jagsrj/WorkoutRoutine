// Tests that the /api functions stay inside Cloudflare's free daily KV write allowance
// and degrade gently when it runs out:   node tests/api-scale.test.mjs
import assert from 'node:assert/strict';
import { onRequestPost as sync } from '../functions/api/sync.js';
import { onRequestPost as log } from '../functions/api/log.js';
import { onRequestPost as chat } from '../functions/api/chat.js';
import { onRequestPost as feedback } from '../functions/api/feedback.js';
import { TOPIC_MODEL, GUARD_MODEL } from '../functions/_lib/guard.js';

// Fake KV that counts writes and can be switched to "out of writes for today".
function kv() {
  const m = new Map(); const s = { writes: 0, full: false, m };
  s.get = async k => m.get(k) ?? null;
  s.put = async (k, v) => { if (s.full) throw new Error('KV put() limit exceeded for the day.'); s.writes++; m.set(k, v); };
  s.list = async ({ prefix }) => ({ keys: [...m.keys()].filter(k => k.startsWith(prefix)).map(name => ({ name })) });
  s.delete = async k => { m.delete(k); };
  return s;
}
let ip = 0;
const req = (path, body) => new Request('https://kinfit.pages.dev' + path, {
  method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://kinfit.pages.dev', 'cf-connecting-ip': '10.0.0.' + (++ip % 250) },
  body: JSON.stringify(body),
});
const CODE = 'ABCD-EFGH-JKLM-NPQR';
const payload = n => ({ v: 1, profiles: [{ id: 'pa', name: 'A', updated: n }], deletedProfiles: [], data: { pa: { journal: { '2026-10-30': [{ id: n, exercise: 'Plank', sets: [{ reps: 30, weight: 0 }] }] }, tomb: [] } } });

const tests = {
  async 'sync: reads cost no KV writes'() {
    const STORE = kv();
    for (let i = 0; i < 20; i++) await sync({ request: req('/api/sync', { code: CODE, op: 'get' }), env: { STORE } });
    assert.equal(STORE.writes, 0);
  },
  async 'sync: saving unchanged data writes nothing'() {
    const STORE = kv(), env = { STORE };
    await (await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(1) }), env })).json();
    const w = STORE.writes;
    const r = await (await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(1) }), env })).json();
    assert.equal(r.unchanged, true);
    assert.equal(STORE.writes, w);
  },
  async 'sync: a change writes the data plus one daily snapshot, at most'() {
    const STORE = kv(), env = { STORE };
    await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(1) }), env });
    await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(2) }), env });
    await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(3) }), env });
    assert.equal(STORE.writes, 1 + 2 + 1); // first save; then save + snapshot; then save only
  },
  async 'sync: out of KV writes gives a clear "busy" answer, not a crash'() {
    const STORE = kv(); STORE.full = true;
    const res = await sync({ request: req('/api/sync', { code: CODE, op: 'put', data: payload(1) }), env: { STORE } });
    assert.equal(res.status, 503);
    assert.equal((await res.json()).error, 'storage_busy');
  },
  async 'log: the same error from many phones is stored once'() {
    const STORE = kv();
    for (let i = 0; i < 50; i++) await log({ request: req('/api/log', { m: 'TypeError: x is undefined', s: 'app.js', l: 10, v: 'test-1' }), env: { STORE } });
    assert.equal(STORE.writes, 1);
  },
  async 'log and feedback: survive KV being out of writes'() {
    const STORE = kv(); STORE.full = true;
    const r1 = await log({ request: req('/api/log', { m: 'other error', s: 'app.js', l: 1, v: 'test-2' }), env: { STORE } });
    assert.equal(r1.status, 204);
    const r2 = await feedback({ request: req('/api/feedback', { type: 'idea', message: 'More stretches please' }), env: { STORE } });
    assert.equal(r2.status, 503);
  },
  async 'chat: only questions that reach the AI use the shared daily budget'() {
    const STORE = kv();
    const AI = { async run(model, input) {
      if (model === TOPIC_MODEL && input.max_tokens === 4) return { response: /squat/.test(JSON.stringify(input.messages)) ? 'FITNESS' : 'OTHER' };
      if (model === GUARD_MODEL) return { response: 'safe' };
      return { response: 'Keep your chest up. 💪' };
    } };
    const ask = q => chat({ request: req('/api/chat', { messages: [{ role: 'user', content: q }], level: 'beginner' }), env: { AI, STORE } });
    await ask('what is the capital of France?');
    assert.equal(STORE.m.get('rl:chatday:' + new Date().toISOString().slice(0, 10)), undefined, 'off-topic must not count');
    await ask('how do I squat?');
    assert.equal(STORE.m.get('rl:chatday:' + new Date().toISOString().slice(0, 10)), '1');
  },
  async 'chat: daily cap is configurable and returns 429 when reached'() {
    const STORE = kv();
    const AI = { async run(model, input) { if (model === TOPIC_MODEL && input.max_tokens === 4) return { response: 'FITNESS' }; if (model === GUARD_MODEL) return { response: 'safe' }; return { response: 'ok' }; } };
    const env = { AI, STORE, AI_DAILY_CAP: '2' };
    const codes = [];
    for (let i = 0; i < 3; i++) codes.push((await chat({ request: req('/api/chat', { messages: [{ role: 'user', content: 'how do I squat?' }] }), env })).status);
    assert.deepEqual(codes, [200, 200, 429]);
  },
  async 'chat: per-person limit uses no KV writes'() {
    const STORE = kv();
    const AI = { async run(model, input) { if (model === TOPIC_MODEL && input.max_tokens === 4) return { response: 'OTHER' }; return { response: 'safe' }; } };
    await chat({ request: req('/api/chat', { messages: [{ role: 'user', content: 'hi there' }] }), env: { AI, STORE } });
    assert.equal([...STORE.m.keys()].filter(k => k.startsWith('rl:chat:')).length, 0);
  },
};

let failed = 0;
for (const [name, fn] of Object.entries(tests)) {
  try { await fn(); console.log('✓', name); } catch (e) { failed++; console.error('✗', name, '\n ', e.message); }
}
if (failed) { console.error(`${failed} scale test(s) failed`); process.exit(1); }
console.log('All scale tests passed');
