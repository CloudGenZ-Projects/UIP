export async function onRequestDelete(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    await context.env.DB.prepare('DELETE FROM registrations WHERE id = ?').bind(context.params.id).run();
    return json({ message: 'Registration deleted successfully' });
  } catch (error) { return json({ error: 'Failed to delete registration' }, 500); }
}
