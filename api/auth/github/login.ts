import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGitHubAuthUrl } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Generate random state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    
    // Store state in cookie for verification
    res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`);
    
    // Redirect to GitHub OAuth
    const authUrl = getGitHubAuthUrl(state);
    res.redirect(authUrl);
  } catch (error) {
    console.error('[OAuth] Login error:', error);
    res.status(500).json({ error: 'Failed to initiate GitHub login' });
  }
}
