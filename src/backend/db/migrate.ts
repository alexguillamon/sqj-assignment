import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";
import * as items from "./schema/items";
import { seed } from "./seed";

const dbUrl =
  process.env.ENVIRONMENT === "development"
    ? process.env.DB_URL_LOCAL
    : process.env.DB_URL_PROD;

const pool = new Pool({
  connectionString: dbUrl,
});

export const schema = { ...items };
export const db = drizzle(pool, { schema });

async function main() {
  console.log("Migrating database...");

  await migrate(db, { migrationsFolder: "./src/backend/db/migrations" });

  console.log("Database migrated successfully!");

  const items = (await db.select().from(schema.items)).length;
  if (items > 0) {
    console.log("Database already seeded!");
    process.exit(0);
  } else {
    await seed(db);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
