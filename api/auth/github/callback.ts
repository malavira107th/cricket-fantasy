import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exchangeGitHubCode, getGitHubUser, createToken, setSessionCookie } from '../../lib/auth';
import { upsertUser, getUserByOpenId } from '../../lib/db';

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    const value = rest.join('=').trim();
    if (name) {
      cookies[name.trim()] = decodeURIComponent(value);
    }
  });

  return cookies;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { code, state } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Verify state (CSRF protection)
    const cookies = parseCookies(req.headers.cookie || '');
    const storedState = cookies.oauth_state;

    if (!storedState || storedState !== state) {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    // Exchange code for access token
    const accessToken = await exchangeGitHubCode(code);

    // Get user info from GitHub
    const githubUser = await getGitHubUser(accessToken);

    // Create openId from GitHub user ID
    const openId = `github:${githubUser.id}`;

    // Upsert user in database
    await upsertUser({
      openId,
      name: githubUser.name || githubUser.login,
      email: githubUser.email,
      loginMethod: 'github',
      lastSignedIn: new Date(),
    });

    // Create session token
    const token = await createToken(openId);

    // Set session cookie
    setSessionCookie(res, token);

    // Clear state cookie
    res.setHeader('Set-Cookie', [
      res.getHeader('Set-Cookie') as string,
      'oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    ]);

    // Redirect to home page
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    res.redirect(`${redirectUrl}/`);
  } catch (error) {
    console.error('[OAuth] Callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
