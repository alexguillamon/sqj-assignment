import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as items from "./schema/items";

neonConfig.fetchConnectionCache = true;

const dbUrl =
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;

const sql = neon(dbUrl!);

export const schema = { ...items };
export const db = drizzle(sql, { schema });
export * from "./schema/items";
export * from "drizzle-orm";
