export async function onRequestGet(context) {
  const { json } = context.data;
  try {
    const rows = await context.env.DB.prepare('SELECT * FROM events ORDER BY date ASC, time ASC').all();
    const data = rows.results.map(r => ({ ...r, featured: !!r.featured, inAppRegistration: !!r.inAppRegistration }));
    return json(data);
  } catch (error) { return json({ error: 'Failed to fetch events' }, 500); }
}
