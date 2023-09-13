import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

import * as items from "./schema/items";

const dbUrl = !process.env.VERCEL_URL
  ? process.env.DB_URL_LOCAL
  : process.env.DB_URL_PROD;

const pool = new Pool({
  connectionString: dbUrl,
});

export const schema = { ...items };
export const db = drizzle(pool, { schema });
export * from "./schema/items";
export * from "drizzle-orm";
