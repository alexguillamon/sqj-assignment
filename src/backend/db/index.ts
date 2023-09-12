import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const schema = {};

export * from "drizzle-orm";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(sql, { schema });
