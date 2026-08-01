import { randomBytes, pbkdf2 } from "node:crypto"
import postgres from "postgres"
import * as dotenv from "dotenv"
dotenv.config()

function generateSalt(): string {
  return randomBytes(32).toString("hex")
}

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

  await client.unsafe("DELETE FROM admins WHERE email = $1", [email])

  const salt = generateSalt()
  const hash = await hashPassword(password, salt)

  await client.unsafe(
    "INSERT INTO admins (name, email, salt, hash, login_attempts, lock_until, created_at, updated_at) VALUES ($1, $2, $3, $4, 0, NULL, NOW(), NOW())",
    [name, email, salt, hash]
  )

  console.log(`Admin created: ${email} (salt: ${salt.length} chars, hash: ${hash.length} chars)`)
  await client.end()
}

main().catch((err) => { console.error(err); process.exit(1) })
