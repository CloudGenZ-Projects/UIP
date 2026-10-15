export async function onRequestPost(context) {
  const { json } = context.data;
  try {
    const body = await context.request.json();
    const result = await context.env.DB.prepare(
      'INSERT INTO stories (name, email, story_text, consent_pub, consent_edit, isPublished) VALUES (?, ?, ?, ?, ?, 0)'
    ).bind(body.name || null, body.email || null, body.story_text, body.consent_pub ? 1 : 0, body.consent_edit ? 1 : 0).run();
    return json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) { return json({ error: error.message }, 500); }
}
export async function onRequestGet(context) {
  const { json, requireAuth } = context.data;
  try {
    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = 4;
    const offset = (page - 1) * limit;
    const isPublished = url.searchParams.get('isPublished');
    let query, countQuery;
    if (isPublished === 'true') {
      query = context.env.DB.prepare('SELECT * FROM stories WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT ? OFFSET ?').bind(limit, offset);
      countQuery = context.env.DB.prepare('SELECT COUNT(*) as count FROM stories WHERE isPublished = 1');
    } else {
      const auth = await requireAuth(context.request, context.env);
      if (auth instanceof Response) return auth;
      query = context.env.DB.prepare('SELECT * FROM stories ORDER BY createdAt DESC LIMIT ? OFFSET ?').bind(limit, offset);
      countQuery = context.env.DB.prepare('SELECT COUNT(*) as count FROM stories');
    }
    const [rows, countResult] = await Promise.all([query.all(), countQuery.first()]);
    const data = rows.results.map(r => ({ ...r, consent_pub: !!r.consent_pub, consent_edit: !!r.consent_edit, isPublished: !!r.isPublished }));
    return json({ data, currentPage: page, totalPages: Math.ceil(countResult.count / limit), totalItems: countResult.count });
  } catch (error) { return json({ error: error.message }, 500); }
}
