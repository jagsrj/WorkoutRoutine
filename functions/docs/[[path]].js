// The repo's docs/ folder holds internal design documents. Cloudflare Pages serves the whole
// repo as the website, so this keeps /docs/* from being published.
export const onRequest = () => new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain' } });
