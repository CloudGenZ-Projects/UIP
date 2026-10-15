export async function onRequestPost(context) {
  const { json } = context.data;
  try {
    const id = context.params.id;
    const body = await context.request.json();
    const event = await context.env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
    if (!event) return json({ error: 'Event not found' }, 404);
    const result = await context.env.DB.prepare(
      'INSERT INTO registrations (eventId, firstName, lastName, email, phone, guestStatus) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(id, body.firstName, body.lastName, body.email, body.phone || null, body.guestStatus || 'Attending Alone').run();
    return json({ message: 'Registered successfully', data: { id: result.meta.last_row_id, eventId: id, ...body } }, 201);
  } catch (error) { return json({ error: 'Registration failed' }, 500); }
}
