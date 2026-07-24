import postgres from "postgres"
import { config } from "dotenv"
import { resolve } from "path"
import { readFileSync } from "fs"

config({ path: resolve(__dirname, "../.env") })

const DATABASE_URL = process.env.DATABASE_URL!

async function main() {
  const sql = postgres(DATABASE_URL, { max: 1 })
  
  try {
    const migration = readFileSync(resolve(__dirname, "../drizzle/0001_add_santri_tables.sql"), "utf-8")
    await sql.unsafe(migration)
    console.log("Santri tables created successfully!")
  } catch (error: any) {
    if (error.message?.includes("already exists")) {
      console.log("Tables already exist, skipping creation.")
    } else {
      console.error("Migration failed:", error.message)
    }
  } finally {
    await sql.end()
  }
}

main()
