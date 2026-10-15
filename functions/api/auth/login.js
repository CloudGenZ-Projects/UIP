import bcrypt from 'bcryptjs';

export async function onRequestPost(context) {
  const { json, signJwt } = context.data;
  try {
    const { username, password } = await context.request.json();
    if (!username || !password) return json({ message: 'Username and password required' }, 400);
    const result = await context.env.DB.prepare('SELECT id, username, password FROM admins WHERE username = ?').bind(username).first();
    if (!result) return json({ message: 'Invalid credentials' }, 401);
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) return json({ message: 'Invalid credentials' }, 401);
    const token = await signJwt({ id: result.id, username: result.username }, context.env);
    return json({ token });
  } catch (error) {
    return json({ message: 'Server error' }, 500);
  }
}
