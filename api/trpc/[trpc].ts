import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { initTRPC, TRPCError } from '@trpc/server';
import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool, Pool } from "mysql2/promise";
import { users, contests, teams, teamPlayers, userContests } from "../../drizzle/schema";
import type { InsertUser, Contest, Team, TeamPlayer, UserContest, InsertContest, InsertTeam, InsertTeamPlayer, InsertUserContest } from "../../drizzle/schema";
import { z } from 'zod';
import { SignJWT, jwtVerify } from 'jose';

// ============================================================================
// DATABASE
// ============================================================================

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

async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
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

async function getUpcomingContests(): Promise<Contest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(contests)
    .where(eq(contests.status, "upcoming"))
    .orderBy(contests.startTime);
  
  return result;
}

async function getContestById(contestId: number): Promise<Contest | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(contests)
    .where(eq(contests.id, contestId))
    .limit(1);
  
  return result[0];
}

async function createContest(contest: InsertContest): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contests).values(contest);
  return Number(result[0].insertId);
}

async function getUserTeams(userId: number): Promise<Team[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.userId, userId))
    .orderBy(desc(teams.createdAt));
  
  return result;
}

async function getTeamById(teamId: number): Promise<Team | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);
  
  return result[0];
}

async function createTeam(team: InsertTeam): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(teams).values(team);
  return Number(result[0].insertId);
}

async function getTeamPlayers(teamId: number): Promise<TeamPlayer[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(teamPlayers)
    .where(eq(teamPlayers.teamId, teamId));
  
  return result;
}

async function addTeamPlayers(players: InsertTeamPlayer[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(teamPlayers).values(players);
}

async function getUserContests(userId: number): Promise<UserContest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(userContests)
    .where(eq(userContests.userId, userId))
    .orderBy(desc(userContests.joinedAt));
  
  return result;
}

async function joinContest(entry: InsertUserContest): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(userContests).values(entry);
  return Number(result[0].insertId);
}

async function getContestLeaderboard(contestId: number): Promise<UserContest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(userContests)
    .where(eq(userContests.contestId, contestId))
    .orderBy(desc(userContests.totalPoints));
  
  return result;
}

// ============================================================================
// AUTH
// ============================================================================

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

async function verifySessionToken(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as SessionData;
  } catch {
    return null;
  }
}

function getSessionCookie(req: VercelRequest): string | undefined {
  const cookies = req.headers.cookie?.split(';').map(c => c.trim()) || [];
  const sessionCookie = cookies.find(c => c.startsWith(`${SESSION_COOKIE_NAME}=`));
  return sessionCookie?.split('=')[1];
}

function setSessionCookie(res: VercelResponse, token: string) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
}

function clearSessionCookie(res: VercelResponse) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

async function getUserFromRequest(req: VercelRequest) {
  const token = getSessionCookie(req);
  if (!token) return null;

  const sessionData = await verifySessionToken(token);
  if (!sessionData) return null;

  const user = await getUserByOpenId(sessionData.openId);
  return user || null;
}

// ============================================================================
// TRPC
// ============================================================================

interface User {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  state: string | null;
  lastSignedIn: Date | null;
  role: string;
}

interface Context {
  req: VercelRequest;
  res: VercelResponse;
  user: User | null;
}

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

const protectedProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user,
    },
  });
});

const appRouter = router({
  // Auth routes
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      clearSessionCookie(ctx.res);
      return { success: true };
    }),
  }),

  // Contest routes
  contests: router({
    list: publicProcedure.query(async () => {
      return await getUpcomingContests();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getContestById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        matchId: z.string(),
        matchName: z.string(),
        team1: z.string(),
        team2: z.string(),
        team1Code: z.string().optional(),
        team2Code: z.string().optional(),
        team1Img: z.string().optional(),
        team2Img: z.string().optional(),
        matchType: z.string().optional(),
        venue: z.string().optional(),
        startTime: z.date(),
      }))
      .mutation(async ({ input }) => {
        const contestId = await createContest({
          ...input,
          status: 'upcoming',
        });
        return { id: contestId };
      }),

    leaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return await getContestLeaderboard(input.contestId);
      }),
  }),

  // Team routes
  teams: router({
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      return await getUserTeams(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getTeamById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamName: z.string(),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(z.object({
          playerId: z.string(),
          playerName: z.string(),
          playerRole: z.string(),
          playerTeam: z.string(),
          isCaptain: z.boolean(),
          isViceCaptain: z.boolean(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const { players, ...teamData } = input;
        
        // Create team
        const teamId = await createTeam({
          ...teamData,
          userId: ctx.user.id,
          totalPoints: 0,
        });

        // Add players to team
        await addTeamPlayers(
          players.map(p => ({
            teamId,
            playerId: p.playerId,
            playerName: p.playerName,
            playerRole: p.playerRole,
            playerTeam: p.playerTeam,
            points: 0,
            isCaptain: p.isCaptain,
            isViceCaptain: p.isViceCaptain,
          }))
        );

        return { id: teamId };
      }),

    getPlayers: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ input }) => {
        return await getTeamPlayers(input.teamId);
      }),
  }),

  // User contest routes
  userContests: router({
    myContests: protectedProcedure.query(async ({ ctx }) => {
      return await getUserContests(ctx.user.id);
    }),

    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const entryId = await joinContest({
          userId: ctx.user.id,
          contestId: input.contestId,
          teamId: input.teamId,
          totalPoints: 0,
        });
        return { id: entryId };
      }),
  }),
});

export type AppRouter = typeof appRouter;

// ============================================================================
// HANDLER
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get user from session
  const user = await getUserFromRequest(req);

  // Create context
  const createContext = (): Context => ({
    req,
    res,
    user,
  });

  // Convert Vercel request to Fetch API Request
  const url = new URL(req.url || '/', `https://${req.headers.host}`);
  const fetchRequest = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  try {
    // Use fetchRequestHandler for proper serverless support
    const response = await fetchRequestHandler({
      endpoint: '/api/trpc',
      req: fetchRequest,
      router: appRouter,
      createContext,
    });

    // Convert Fetch API Response back to Vercel response
    const body = await response.text();
    res.status(response.status);
    
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    res.send(body);
  } catch (error) {
    console.error('[tRPC] Handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
