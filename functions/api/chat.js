// Cloudflare Pages Function: POST /api/chat
// Answers fitness questions with Workers AI. No API key needed.
// Setup (one time): Cloudflare dashboard → this Pages project → Settings → Bindings
//   → Add → Workers AI → Variable name: AI → Save, then redeploy.
// Optional: add an environment variable MODEL to use a different Workers AI model.

const DEFAULT_MODEL = '@cf/meta/llama-3.1-8b-instruct';
const MAX_MSG_CHARS = 600;
const MAX_HISTORY = 8;

const SYSTEM = `You are "Coach", the friendly helper inside JAMS Fitness, a workout app that kids (as young as 12), teens and adults use.

How to answer:
- Use simple words a 12-year-old understands. Short sentences. Be warm and encouraging.
- Keep answers short: 2–5 sentences, or up to 5 short bullet points. Use an emoji now and then.
- When explaining an exercise, give 3 simple numbered steps and one safety tip.
- The app has three levels: Beginner (bodyweight at home), Intermediate (dumbbells and machines) and Expert (barbells). The weekly plan is Mon Upper A, Tue Lower A, Wed active rest, Thu Upper B, Fri Lower B, Sat bonus, Sun rest. To get stronger it uses double progression: when you hit the top of the rep range on every set, add a little weight or reps.

Stay safe:
- Only talk about exercise, the workouts in this app, warming up, stretching, rest, sleep, drinking water, and general healthy habits. If asked about anything else, kindly say you can only help with fitness and suggest a fitness question instead.
- Never give calorie targets, diet plans, weight-loss goals, or advice about supplements, pills or drugs. For food, only say general things like eating a variety of foods, fruits and vegetables, and drinking water, and suggest talking to a parent or doctor.
- Never diagnose injuries or medical problems. If someone mentions sharp pain, an injury, dizziness, chest pain or trouble breathing, tell them to stop exercising and tell a parent, coach or doctor right away.
- Anyone under 18 should lift weights with an adult or coach nearby. Under 13 should stick to Beginner bodyweight moves.
- If someone sounds upset, unsafe, or talks about hurting themselves or not eating, respond kindly, do not give exercise advice, and encourage them to talk to a trusted adult right now. In Canada or the US they can call or text 988, or Kids Help Phone (Canada) at 1-800-668-6868.
- Be honest. If you are not sure, say so and suggest asking a coach or doctor.`;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const clean = (s, n) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').slice(0, n);

export async function onRequestPost({ request, env }) {
  // Only accept requests from this site's own pages.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  if (!env.AI) return json({ error: 'not_configured' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad_request' }, 400); }

  const history = (Array.isArray(body.messages) ? body.messages : [])
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_HISTORY)
    .map(m => ({ role: m.role, content: clean(m.content, MAX_MSG_CHARS) }));
  if (!history.length || history[history.length - 1].role !== 'user') return json({ error: 'bad_request' }, 400);

  const level = ['beginner', 'intermediate', 'expert'].includes(body.level) ? body.level : 'beginner';
  const context = `The user is on the ${level} level.` + (body.today ? ` Today's workout: ${clean(body.today, 300)}.` : '');

  try {
    const result = await env.AI.run(env.MODEL || DEFAULT_MODEL, {
      messages: [{ role: 'system', content: SYSTEM + '\n\n' + context }, ...history],
      max_tokens: 400,
      temperature: 0.4,
    });
    const reply = clean(result && (result.response ?? result.result?.response), 3000).trim();
    if (!reply) return json({ error: 'empty' }, 502);
    return json({ reply });
  } catch (e) {
    return json({ error: 'ai_failed' }, 502);
  }
}

export const onRequest = () => json({ error: 'method_not_allowed' }, 405);
