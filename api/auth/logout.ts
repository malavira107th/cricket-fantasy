import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Clear the auth cookie
  res.setHeader('Set-Cookie', 'auth_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  
  return res.status(200).json({ success: true });
}
