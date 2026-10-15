export async function onRequestPut(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    const id = context.params.id;
    const body = await context.request.json();
    const fields = []; const values = [];
    if (body.isPublished !== undefined) { fields.push('isPublished = ?'); values.push(body.isPublished ? 1 : 0); }
    if (body.name !== undefined) { fields.push('name = ?'); values.push(body.name); }
    if (body.email !== undefined) { fields.push('email = ?'); values.push(body.email); }
    if (body.story_text !== undefined) { fields.push('story_text = ?'); values.push(body.story_text); }
    if (fields.length === 0) return json({ error: 'No fields to update' }, 400);
    fields.push("updatedAt = datetime('now')");
    values.push(id);
    await context.env.DB.prepare(`UPDATE stories SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    return json({ success: true });
  } catch (error) { return json({ error: error.message }, 500); }
}
export async function onRequestDelete(context) {
  const { json, requireAuth } = context.data;
  const auth = await requireAuth(context.request, context.env);
  if (auth instanceof Response) return auth;
  try {
    await context.env.DB.prepare('DELETE FROM stories WHERE id = ?').bind(context.params.id).run();
    return json({ success: true });
  } catch (error) { return json({ error: error.message }, 500); }
}
