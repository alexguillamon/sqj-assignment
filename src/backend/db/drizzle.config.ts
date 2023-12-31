import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

if (!process.env.DB_URL_PROD) {
  throw new Error("DB_URL_PROD is not set");
}

export default {
  out: "./src/backend/db/migrations",
  schema: "./src/backend/db/schema",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.ENVIRONMENT === "production"
        ? process.env.DB_URL_PROD
        : process.env.DB_URL_LOCAL ?? "",
  },
} satisfies Config;
