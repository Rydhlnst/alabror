import postgres from "postgres"
import * as dotenv from "dotenv"
dotenv.config()

async function main() {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 })
  await client.unsafe("DROP TABLE IF EXISTS admins_sessions CASCADE")
  await client.unsafe("DROP TABLE IF EXISTS admins CASCADE")
  console.log("Dropped admins tables - Payload will recreate on next startup")
  await client.end()
}

main().catch((err) => { console.error(err); process.exit(1) })
