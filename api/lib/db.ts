import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool, Pool } from "mysql2/promise";
import { users, contests, teams, teamPlayers, userContests } from "../../drizzle/schema";
import type { InsertUser, Contest, Team, TeamPlayer, UserContest, InsertContest, InsertTeam, InsertTeamPlayer, InsertUserContest } from "../../drizzle/schema";

let _db: any = null;
let _pool: Pool | null = null;

// Serverless-optimized database connection
export async function getDb() {
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

// User operations
export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUser(user: InsertUser): Promise<void> {
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

// Contest operations
export async function getUpcomingContests(): Promise<Contest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(contests)
    .where(eq(contests.status, "upcoming"))
    .orderBy(contests.startTime);
  
  return result;
}

export async function getContestById(contestId: number): Promise<Contest | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(contests)
    .where(eq(contests.id, contestId))
    .limit(1);
  
  return result[0];
}

export async function createContest(contest: InsertContest): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contests).values(contest);
  return Number(result[0].insertId);
}

// Team operations
export async function getUserTeams(userId: number): Promise<Team[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.userId, userId))
    .orderBy(desc(teams.createdAt));
  
  return result;
}

export async function getTeamById(teamId: number): Promise<Team | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.id, teamId))
    .limit(1);
  
  return result[0];
}

export async function createTeam(team: InsertTeam): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(teams).values(team);
  return Number(result[0].insertId);
}

// Team players operations
export async function getTeamPlayers(teamId: number): Promise<TeamPlayer[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(teamPlayers)
    .where(eq(teamPlayers.teamId, teamId));
  
  return result;
}

export async function addTeamPlayers(players: InsertTeamPlayer[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(teamPlayers).values(players);
}

// User contest operations
export async function getUserContests(userId: number): Promise<UserContest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(userContests)
    .where(eq(userContests.userId, userId))
    .orderBy(desc(userContests.joinedAt));
  
  return result;
}

export async function joinContest(entry: InsertUserContest): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(userContests).values(entry);
  return Number(result[0].insertId);
}

export async function getContestLeaderboard(contestId: number): Promise<UserContest[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db
    .select()
    .from(userContests)
    .where(eq(userContests.contestId, contestId))
    .orderBy(desc(userContests.totalPoints));
  
  return result;
}
