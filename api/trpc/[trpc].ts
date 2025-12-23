import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../server/routers/_app';
import { createContext } from '../../server/_core/context';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Convert Vercel request to Fetch API Request
  const url = new URL(req.url || '/', `https://${req.headers.host}`);
  const fetchRequest = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  // Use fetchRequestHandler for proper serverless support
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: fetchRequest,
    router: appRouter,
    createContext: () => createContext({ req: req as any, res: res as any }),
  });

  // Convert Fetch API Response back to Vercel response
  const body = await response.text();
  res.status(response.status);
  
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  
  res.send(body);
}
