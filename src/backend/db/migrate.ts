import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";
import * as items from "./schema/items";
import { seed } from "./seed";

// Use this when running locally
// const dbUrl = process.env.DB_URL_LOCAL;

// Use this when running on production
const dbUrl = process.env.DB_URL_PROD;

const pool = new Pool({
  connectionString: dbUrl,
});

export const schema = { ...items };
export const db = drizzle(pool, { schema });

async function main() {
  console.log("Migrating database...");

  await migrate(db, { migrationsFolder: "./src/backend/db/migrations" });

  console.log("Database migrated successfully!");

  // Uncomment this to seed the database
  await seed(db);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
