import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../../server/routers/_app';
import { createContext } from '../../server/_core/context';

// Create a wrapper that converts Vercel request/response to Express-like format
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Create Express-like middleware
  const middleware = createExpressMiddleware({
    router: appRouter,
    createContext: () => createContext({ req: req as any, res: res as any }),
  });

  // Convert Vercel request to Express-like request
  const expressReq = Object.assign(req, {
    app: {},
    baseUrl: '',
    fresh: false,
    hostname: req.headers.host || '',
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    ips: [],
    originalUrl: req.url || '',
    params: {},
    path: req.url?.split('?')[0] || '',
    protocol: req.headers['x-forwarded-proto'] || 'https',
    route: {},
    secure: true,
    stale: false,
    subdomains: [],
    xhr: false,
  });

  // Convert Vercel response to Express-like response
  const expressRes = Object.assign(res, {
    app: {},
    headersSent: false,
    locals: {},
  });

  // Call the middleware
  await middleware(expressReq as any, expressRes as any);
}
