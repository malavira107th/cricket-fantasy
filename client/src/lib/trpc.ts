import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../api-serverless/lib/router";

export const trpc = createTRPCReact<AppRouter>();
