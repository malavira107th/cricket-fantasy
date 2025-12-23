import { SignJWT, jwtVerify } from 'jose';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { User } from '../../drizzle/schema';
import { getUserByOpenId } from './db';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const COOKIE_NAME = 'app_session_id';
const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Create JWT token
export async function createToken(openId: string): Promise<string> {
  return await new SignJWT({ openId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1y')
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<{ openId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { openId: string };
  } catch (error) {
    return null;
  }
}

// Get user from request cookies
export async function getUserFromRequest(req: VercelRequest): Promise<User | null> {
  try {
    // Parse cookies from request
    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies[COOKIE_NAME];
    
    if (!token) {
      return null;
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return null;
    }

    // Get user from database
    const user = await getUserByOpenId(payload.openId);
    return user || null;
  } catch (error) {
    console.error('[Auth] Error getting user from request:', error);
    return null;
  }
}

// Set session cookie
export function setSessionCookie(res: VercelResponse, token: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieValue = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ONE_YEAR_MS / 1000}${isProduction ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookieValue);
}

// Clear session cookie
export function clearSessionCookie(res: VercelResponse) {
  const cookieValue = `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  res.setHeader('Set-Cookie', cookieValue);
}

// Parse cookies from cookie header
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  
  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.split('=');
    const value = rest.join('=').trim();
    if (name) {
      cookies[name.trim()] = decodeURIComponent(value);
    }
  });

  return cookies;
}

// GitHub OAuth helpers
export function getGitHubAuthUrl(state: string): string {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    throw new Error('GITHUB_CLIENT_ID not configured');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/github/callback`,
    scope: 'read:user user:email',
    state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function exchangeGitHubCode(code: string): Promise<string> {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GitHub OAuth not configured');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await response.json();
  
  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
  }

  return data.access_token;
}

export async function getGitHubUser(accessToken: string): Promise<{
  id: number;
  login: string;
  name: string | null;
  email: string | null;
}> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }

  return await response.json();
}
