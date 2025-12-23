import { router, publicProcedure, protectedProcedure } from './trpc';
import { clearSessionCookie } from './auth';
import { 
  getUpcomingContests, 
  getContestById, 
  createContest,
  getUserTeams,
  getTeamById,
  createTeam,
  getTeamPlayers,
  addTeamPlayers,
  getUserContests,
  joinContest,
  getContestLeaderboard
} from './db';
import { z } from 'zod';

export const appRouter = router({
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
