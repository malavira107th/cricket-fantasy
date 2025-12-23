import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cricket-fantasy-delta.vercel.app'}/api/auth/github/callback`;
  
  if (!clientId) {
    return res.status(500).json({ error: 'GitHub OAuth not configured' });
  }

  // Generate random state for CSRF protection
  const state = Math.random().toString(36).substring(7);
  
  // Store state in cookie for verification
  res.setHeader('Set-Cookie', `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  
  // Redirect to GitHub OAuth
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=read:user user:email`;
  
  res.redirect(githubAuthUrl);
}
