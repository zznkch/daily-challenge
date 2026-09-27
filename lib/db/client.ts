import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __dcPool: Pool | undefined;
}

/**
 * A single pooled connection, reused across hot reloads in dev. The Pool is
 * only *constructed* here — it does not connect until the first query runs,
 * so importing this module is safe even when DATABASE_URL isn't set yet
 * (e.g. during `next build`, which never queries the database for any
 * dynamic route in this app).
 */
const pool =
  global.__dcPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dcPool = pool;
}

export const db = drizzle(pool, { schema });
