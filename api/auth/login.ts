import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

// Database schema
const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Database connection
const pool = createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 1,
});

const db = drizzle(pool, { schema: { users }, mode: 'default' });

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Find user
    const userResults = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (userResults.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResults[0];
    const hashedPassword = hashPassword(password);

    // Verify password
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');
    const token = await new SignJWT({ userId: user.id, email: user.email, name: user.name })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    // Set cookie
    res.setHeader('Set-Cookie', `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);

    return res.status(200).json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
