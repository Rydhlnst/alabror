import "server-only"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "@/lib/db/schema"

let sql: postgres.Sql | null = null
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL)
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  if (!sql) {
    sql = postgres(process.env.DATABASE_URL, {
      max: 1,
      prepare: false,
    })
  }

  if (!dbInstance) {
    dbInstance = drizzle(sql, { schema })
  }

  return dbInstance
}

export { schema }
