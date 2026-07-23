import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

async function run() {
  console.log("Dropping all tables...")
  const sql = postgres(databaseUrl!, { max: 1, ssl: "require" })

  try {
    await sql.unsafe("DROP SCHEMA public CASCADE;")
    await sql.unsafe("CREATE SCHEMA public;")
    await sql.unsafe("GRANT ALL ON SCHEMA public TO public;")
    console.log("Database reset successfully!")
  } catch (error) {
    console.error("Reset failed:", error)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

run()
