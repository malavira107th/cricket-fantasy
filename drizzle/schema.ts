import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  state: varchar("state", { length: 100 }), // User's state for geo-restriction
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Cricket contests table
 */
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 100 }).notNull(), // External API match ID
  matchName: varchar("matchName", { length: 255 }).notNull(),
  team1: varchar("team1", { length: 100 }).notNull(),
  team2: varchar("team2", { length: 100 }).notNull(),
  team1Code: varchar("team1Code", { length: 10 }),
  team2Code: varchar("team2Code", { length: 10 }),
  team1Img: text("team1Img"),
  team2Img: text("team2Img"),
  matchType: varchar("matchType", { length: 50 }), // T20, ODI, Test
  venue: varchar("venue", { length: 255 }),
  startTime: timestamp("startTime").notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

/**
 * User teams table
 */
export const teams = mysqlTable("teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  teamName: varchar("teamName", { length: 100 }).notNull(),
  captainId: varchar("captainId", { length: 100 }).notNull(), // Player ID from API
  viceCaptainId: varchar("viceCaptainId", { length: 100 }).notNull(),
  totalPoints: int("totalPoints").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;

/**
 * Team players table (11 players per team)
 */
export const teamPlayers = mysqlTable("teamPlayers", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull(),
  playerId: varchar("playerId", { length: 100 }).notNull(), // Player ID from API
  playerName: varchar("playerName", { length: 255 }).notNull(),
  playerRole: varchar("playerRole", { length: 50 }).notNull(), // WK, BAT, ALL, BOWL
  playerTeam: varchar("playerTeam", { length: 100 }).notNull(), // Which cricket team
  points: int("points").default(0).notNull(),
  isCaptain: boolean("isCaptain").default(false).notNull(),
  isViceCaptain: boolean("isViceCaptain").default(false).notNull(),
});

export type TeamPlayer = typeof teamPlayers.$inferSelect;
export type InsertTeamPlayer = typeof teamPlayers.$inferInsert;

/**
 * User contest participation table
 */
export const userContests = mysqlTable("userContests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  teamId: int("teamId").notNull(),
  rank: int("rank"),
  totalPoints: int("totalPoints").default(0).notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type UserContest = typeof userContests.$inferSelect;
export type InsertUserContest = typeof userContests.$inferInsert;