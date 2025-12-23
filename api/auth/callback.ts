import type { VercelRequest, VercelResponse } from '@vercel/node';
import { oAuthService } from '../../server/_core/sdk';
import { upsertUser } from '../../server/db';
import { getSessionCookieOptions } from '../../server/_core/cookies';
import { COOKIE_NAME } from '../../shared/const';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { code, state } = req.query;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Exchange code for token
    const tokenData = await oAuthService.exchangeToken(code);
    
    // Get user info
    const userInfo = await oAuthService.getUserInfo(tokenData.accessToken);

    // Upsert user in database
    await upsertUser({
      openId: userInfo.openId,
      name: userInfo.name,
      email: userInfo.email,
      loginMethod: userInfo.loginMethod,
      lastSignedIn: new Date(),
    });

    // Create session JWT
    const sessionToken = await oAuthService.createSessionJwt({
      openId: userInfo.openId,
      name: userInfo.name,
      email: userInfo.email,
    });

    // Set cookie
    const cookieOptions = getSessionCookieOptions(req as any);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=${sessionToken}; Path=${cookieOptions.path}; HttpOnly; ${
        cookieOptions.secure ? 'Secure;' : ''
      } SameSite=${cookieOptions.sameSite}; Max-Age=${60 * 60 * 24 * 365}`
    );

    // Redirect to home
    const redirectUrl = typeof state === 'string' ? state : '/';
    res.redirect(302, redirectUrl);
  } catch (error) {
    console.error('[OAuth Callback] Error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
