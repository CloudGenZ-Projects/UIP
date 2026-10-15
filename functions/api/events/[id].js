export async function onRequestDelete(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const id = context.params.id;
    await context.env.DB.prepare('DELETE FROM registrations WHERE eventId = ?').bind(id).run();
    await context.env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
    return json({ message: 'Event deleted successfully' });
  } catch (error) { return json({ error: 'Failed to delete event' }, 500); }
}
