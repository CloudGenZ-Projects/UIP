export async function onRequestGet(context) {
  const { json } = context.data;
  try {
    const rows = await context.env.DB.prepare('SELECT * FROM news ORDER BY date DESC').all();
    return json(rows.results);
  } catch (error) { return json({ error: 'Failed to fetch news' }, 500); }
}
export async function onRequestPost(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const body = await context.request.json();
    const result = await context.env.DB.prepare(
      'INSERT INTO news (category, country, title, desc, source, date, url) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(body.category, body.country, body.title, body.desc, body.source, body.date, body.url).run();
    return json({ id: result.meta.last_row_id, ...body }, 201);
  } catch (error) { return json({ error: 'Failed to create news' }, 500); }
}
