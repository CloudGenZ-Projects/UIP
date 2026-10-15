export async function onRequestPost(context) {
  const { json } = context.data;
  try {
    const body = await context.request.json();
    const result = await context.env.DB.prepare('INSERT INTO form_submissions (form_type, data) VALUES (?, ?)').bind('partnership', JSON.stringify(body)).run();
    return json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) { return json({ error: error.message }, 500); }
}
export async function onRequestGet(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = 20; const offset = (page - 1) * limit;
    const [rows, cnt] = await Promise.all([
      context.env.DB.prepare('SELECT * FROM form_submissions WHERE form_type = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?').bind('partnership', limit, offset).all(),
      context.env.DB.prepare('SELECT COUNT(*) as count FROM form_submissions WHERE form_type = ?').bind('partnership').first(),
    ]);
    const data = rows.results.map(r => ({ id: r.id, ...JSON.parse(r.data), createdAt: r.createdAt }));
    return json({ data, currentPage: page, totalPages: Math.ceil(cnt.count / limit), totalItems: cnt.count });
  } catch (error) { return json({ error: error.message }, 500); }
}
