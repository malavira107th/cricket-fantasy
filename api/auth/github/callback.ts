import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SignJWT } from 'jose';
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool, Pool } from "mysql2/promise";
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

// Inline schema for users table
const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  state: varchar("state", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

type InsertUser = typeof users.$inferInsert;

// Database connection
let _db: any = null;
let _pool: Pool | null = null;

async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      if (!_pool) {
        _pool = createPool({
          uri: process.env.DATABASE_URL,
          connectionLimit: 1,
          maxIdle: 1,
          idleTimeout: 60000,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0,
        });
      }
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
      name: user.name ?? null,
      email: user.email ?? null,
      loginMethod: user.loginMethod ?? null,
      state: user.state ?? null,
      lastSignedIn: user.lastSignedIn ?? new Date(),
      role: user.role ?? 'user',
    };

    const updateSet: Record<string, unknown> = {
      name: values.name,
      email: values.email,
      loginMethod: values.loginMethod,
      state: values.state,
      lastSignedIn: values.lastSignedIn,
    };

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

// JWT utilities
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-in-production');
const SESSION_COOKIE_NAME = 'session';

interface SessionData {
  openId: string;
  name?: string;
  email?: string;
  loginMethod?: string;
}

async function createSessionToken(data: SessionData): Promise<string> {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

function setSessionCookie(res: VercelResponse, token: string) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
}

// GitHub OAuth utilities
interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
}

async function exchangeGitHubCode(code: string): Promise<string> {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cricket-fantasy-delta.vercel.app'}/api/auth/github/callback`;

  if (!clientId || !clientSecret) {
    throw new Error('GitHub OAuth not configured');
  }

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
  }

  return data.access_token;
}

async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub user');
  }

  return await response.json();
}

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
    const token = await createSessionToken({
      openId,
      name: githubUser.name || githubUser.login,
      email: githubUser.email || undefined,
      loginMethod: 'github',
    });

    // Set session cookie
    setSessionCookie(res, token);

    // Clear state cookie
    const sessionCookie = res.getHeader('Set-Cookie') as string;
    res.setHeader('Set-Cookie', [
      sessionCookie,
      'oauth_state=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
    ]);

    // Redirect to home page
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://cricket-fantasy-delta.vercel.app';
    res.redirect(`${redirectUrl}/`);
  } catch (error) {
    console.error('[OAuth] Callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
