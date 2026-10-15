export async function onRequestPost(context) {
  const { json } = context.data;
  try {
    const body = await context.request.json();
    const result = await context.env.DB.prepare('INSERT INTO form_submissions (form_type, data) VALUES (?, ?)').bind('wellness', JSON.stringify(body)).run();
    return json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) { return json({ error: error.message }, 500); }
}
export async function onRequestGet(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const rows = await context.env.DB.prepare(
      'SELECT * FROM form_submissions WHERE form_type = ? ORDER BY createdAt DESC'
    ).bind('wellness').all();
    // Return FLAT ARRAY matching original Express behavior
    const data = rows.results.map(r => ({ id: r.id, ...JSON.parse(r.data), createdAt: r.createdAt }));
    return json(data);
  } catch (error) { return json({ error: error.message }, 500); }
}
