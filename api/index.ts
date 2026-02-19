import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist/public
const publicPath = path.join(__dirname, "../dist/public");
app.use(express.static(publicPath));

// tRPC API routes
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

// Serve index.html for all other routes (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

export default app;
