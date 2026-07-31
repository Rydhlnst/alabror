import { randomUUID, pbkdf2 } from "node:crypto"
import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()

function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 25000, 512, "sha256", (err, derivedKey) => {
      if (err) return reject(err)
      resolve(derivedKey.toString("hex"))
    })
  })
}

async function main() {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 })

  const email = process.env.ADMIN_EMAIL || "admin@alabror.id"
  const password = process.env.ADMIN_PASSWORD || "password123"
  const name = process.env.ADMIN_NAME || "Administrator"

  const existing = await client.unsafe(
    "SELECT id FROM admins WHERE email = $1 LIMIT 1",
    [email]
  )

  if (existing.length > 0) {
    console.log(`Admin "${email}" already exists, skipping.`)
    await client.end()
    return
  }

  const id = randomUUID()
  const salt = randomUUID()
  const hash = await hashPassword(password, salt)

  await client.unsafe(
    "INSERT INTO admins (id, name, email, salt, hash, login_attempts, lock_until, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, 0, NULL, NOW(), NOW())",
    [id, name, email, salt, hash]
  )

  console.log(`Admin created: ${email}`)
  await client.end()
}

main().catch((err) => {
  console.error("Failed to seed admin:", err)
  process.exit(1)
})
