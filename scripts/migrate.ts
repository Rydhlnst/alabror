import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

async function run() {
  console.log("Running migrations...")
  const sql = postgres(databaseUrl!, { max: 1, ssl: "require" })
  const db = drizzle(sql)

  try {
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migrations applied successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

run()
