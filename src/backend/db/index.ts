import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as items from "./schema/items";

export const schema = { ...items };

export * from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(sql, { schema });
