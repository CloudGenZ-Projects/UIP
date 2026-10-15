export async function onRequestGet(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const rows = await context.env.DB.prepare('SELECT * FROM registrations WHERE eventId = ? ORDER BY createdAt DESC').bind(context.params.id).all();
    return json(rows.results);
  } catch (error) { return json({ error: 'Failed to fetch registrations' }, 500); }
}
