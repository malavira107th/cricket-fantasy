import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../lib/router';
import { getUserFromRequest } from '../lib/auth';
import type { Context } from '../lib/trpc';

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
      endpoint: '/api-serverless/trpc',
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
