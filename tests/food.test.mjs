// Tests for the food scanner endpoint (no real AI needed):   node tests/food.test.mjs
import assert from 'node:assert/strict';
import { onRequestPost as food, parseFood, FOOD_MODELS } from '../functions/api/food.js';
import { GUARD_MODEL } from '../functions/_lib/guard.js';

let ip = 0;
const req = (body, origin = 'https://kinfit.pages.dev') => new Request('https://kinfit.pages.dev/api/food', {
  method: 'POST', headers: { 'content-type': 'application/json', origin, 'cf-connecting-ip': '10.1.0.' + (++ip % 250) }, body: JSON.stringify(body) });
const IMG = 'data:image/jpeg;base64,' + 'A'.repeat(400);
const GOOD = JSON.stringify({ food: true, dish: 'Chicken rice bowl', confidence: 'medium', items: [
  { name: 'Grilled chicken', portion: '120 g', calories_kcal: 198, protein_g: 37, carbs_g: 0, fiber_g: 0 },
  { name: 'White rice', portion: '1 cup', calories_kcal: 205, protein_g: 4.3, carbs_g: 45, fiber_g: 0.6 },
  { name: 'Broccoli', portion: '1/2 cup', calories_kcal: 15, protein_g: 1.3, carbs_g: 3, fiber_g: 1.2 }] });
// Fake Workers AI: records calls, answers like the vision model / Llama Guard.
function ai({ reply = GOOD, guard = 'safe', fail = [] } = {}) {
  const calls = [];
  return { calls, async run(model, input) {
    calls.push({ model, input });
    if (model === GUARD_MODEL) return { response: guard };
    if (fail.includes(model)) throw new Error('model busy');
    return { response: reply };
  } };
}
const call = async (body, env, origin) => { const r = await food({ request: req(body, origin), env }); return { status: r.status, d: await r.json() }; };

const tests = {
  async 'photo: returns items and totals'() {
    const AI = ai(), { status, d } = await call({ image: IMG }, { AI });
    assert.equal(status, 200); assert.equal(d.dish, 'Chicken rice bowl'); assert.equal(d.items.length, 3);
    assert.deepEqual(d.total, { calories: 418, protein: 42.6, carbs: 48, fiber: 1.8 });
    const msg = AI.calls[0].input.messages[1].content;
    assert.ok(msg.some(c => c.type === 'image_url' && c.image_url.url === IMG), 'image is sent to the model');
    assert.ok(!AI.calls.some(c => c.model === GUARD_MODEL), 'no guard call without typed text');
  },
  async 'description only works and is safety-checked'() {
    const AI = ai(), { d } = await call({ note: 'two eggs and toast' }, { AI });
    assert.equal(d.food, true); assert.equal(AI.calls[0].model, GUARD_MODEL);
  },
  async 'self-harm text gets the crisis answer, no nutrition'() {
    const AI = ai({ guard: 'unsafe\nS11' }), { d } = await call({ note: 'I want to stop eating forever' }, { AI });
    assert.equal(d.error, 'crisis'); assert.equal(AI.calls.length, 1);
  },
  async 'not food'() { const { d } = await call({ image: IMG }, { AI: ai({ reply: '{"food": false}' }) }); assert.equal(d.food, false); },
  async 'falls back to the next model'() {
    const AI = ai({ fail: [FOOD_MODELS[0]] }), { d } = await call({ image: IMG }, { AI });
    assert.equal(d.food, true); assert.equal(AI.calls[1].model, FOOD_MODELS[1]);
  },
  async 'rejects bad or huge images and other sites'() {
    assert.equal((await call({ image: 'data:text/html;base64,AAAA' }, { AI: ai() })).status, 400);
    assert.equal((await call({ image: 'data:image/jpeg;base64,' + 'A'.repeat(1_500_000) }, { AI: ai() })).status, 400);
    assert.equal((await call({ image: IMG }, { AI: ai() }, 'https://evil.example')).status, 403);
    assert.equal((await call({}, { AI: ai() })).status, 400);
  },
  async 'rate limited per person'() {
    const env = { AI: ai() }, mk = () => food({ request: new Request('https://kinfit.pages.dev/api/food', { method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': '10.9.9.9' }, body: JSON.stringify({ image: IMG }) }), env });
    let last; for (let i = 0; i < 11; i++) last = await mk();
    assert.equal(last.status, 429);
  },
  'parse: clamps numbers, strips markup, ignores extra text'() {
    const p = parseFood('Sure! {"food":true,"dish":"<b>Pizza</b>","items":[{"name":"Slice","calories_kcal":99999,"protein_g":"12","carbs_g":9999,"fiber_g":-3}],"extra":800}');
    assert.equal(p.dish, 'b Pizza /b'); // markup characters removed
    assert.deepEqual(p.items[0], { name: 'Slice', portion: '', calories: 3000, protein: 12, carbs: 300, fiber: 0 });
    assert.ok(!('extra' in p)); assert.equal(p.confidence, 'low');
    assert.equal(parseFood('no json here'), null);
  },
};
let failed = 0;
for (const [name, t] of Object.entries(tests)) {
  try { await t(); console.log('✅', name); } catch (e) { failed++; console.log('❌', name, '\n  ', e.message); }
}
console.log(failed ? `\n${failed} failed` : '\nAll food tests passed'); process.exit(failed ? 1 : 0);
