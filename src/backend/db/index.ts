import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as items from "./schema/items";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);

export const schema = { ...items };
export const db = drizzle(sql, { schema });
export * from "./schema/items";
export * from "drizzle-orm";
