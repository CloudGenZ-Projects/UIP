export async function onRequestPost(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const body = await context.request.json();
    const result = await context.env.DB.prepare(
      'INSERT INTO events (date, title, desc, loc, time, link, buttonText, featured, inAppRegistration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(body.date, body.title, body.desc, body.loc, body.time, body.link || null, body.buttonText || 'More Info', body.featured ? 1 : 0, body.inAppRegistration ? 1 : 0).run();
    return json({ id: result.meta.last_row_id, ...body }, 201);
  } catch (error) { return json({ error: 'Failed to create event' }, 500); }
}
