// POST /api/saved: target of the "Save to my passwords" form.
// Submitting a real form is what makes iPhone/Safari offer "Save Password?" for the recovery code.
// The submitted values are ignored and never stored; we just send the browser back to the app.
const back = request => Response.redirect(new URL('/?saved=1', request.url).toString(), 303);
export const onRequestPost = ({ request }) => back(request);
export const onRequestGet = ({ request }) => back(request);
