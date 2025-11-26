import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contests, teams, teamPlayers, userContests, Contest, Team, TeamPlayer, UserContest, InsertContest, InsertTeam, InsertTeamPlayer, InsertUserContest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "state"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Contest queries
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

// Team queries
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

export async function updateTeamPoints(teamId: number, points: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(teams)
    .set({ totalPoints: points })
    .where(eq(teams.id, teamId));
}

// Team players queries
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

export async function updatePlayerPoints(playerId: number, points: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(teamPlayers)
    .set({ points })
    .where(eq(teamPlayers.id, playerId));
}

// User contest queries
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

export async function updateUserContestRank(userContestId: number, rank: number, points: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(userContests)
    .set({ rank, totalPoints: points })
    .where(eq(userContests.id, userContestId));
}
