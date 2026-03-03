import { envSchema } from "./env-schema";

export const env = envSchema.parse({
  VITE_API_URL: process.env.VITE_API_URL || "http://localhost:3000",
  VITE_API_TOKEN: process.env.VITE_API_TOKEN || "mock-api-token",
});
