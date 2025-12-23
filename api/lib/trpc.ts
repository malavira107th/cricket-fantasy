import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { User } from '../../drizzle/schema';

// Context type for tRPC procedures
export interface Context {
  req: VercelRequest;
  res: VercelResponse;
  user: User | null;
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure (requires authentication)
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please login (10001)',
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Admin procedure (requires admin role)
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have required permission (10002)',
    });
  }
  return next({ ctx });
});
