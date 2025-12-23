import type { VercelRequest, VercelResponse } from '@vercel/node';
import { COOKIE_NAME } from '../../shared/const';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Clear session cookie
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=none; Max-Age=0`
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[OAuth Logout] Error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
}
