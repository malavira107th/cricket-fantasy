import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from dist/public
  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));

  // tRPC API routes
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}/`);
    console.log(`📁 Serving static files from: ${staticPath}`);
  });
}

startServer().catch(console.error);
