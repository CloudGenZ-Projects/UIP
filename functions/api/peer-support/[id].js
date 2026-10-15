export async function onRequestDelete(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    await context.env.DB.prepare('DELETE FROM form_submissions WHERE id = ? AND form_type = ?').bind(context.params.id, 'peer-support').run();
    return json({ success: true });
  } catch (error) { return json({ error: error.message }, 500); }
}
