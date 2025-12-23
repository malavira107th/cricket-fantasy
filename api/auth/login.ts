import type { VercelRequest, VercelResponse } from '@vercel/node';
import { oAuthService } from '../../server/_core/sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { redirect } = req.query;
    const redirectUrl = typeof redirect === 'string' ? redirect : '/';
    
    const authUrl = oAuthService.getAuthUrl(redirectUrl);
    res.redirect(302, authUrl);
  } catch (error) {
    console.error('[OAuth Login] Error:', error);
    res.status(500).json({ error: 'Failed to initiate login' });
  }
}
