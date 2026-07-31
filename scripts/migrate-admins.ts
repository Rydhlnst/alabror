import postgres from "postgres"
import * as dotenv from "dotenv"
dotenv.config()

async function main() {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 })
  
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL UNIQUE,
      reset_password_token VARCHAR,
      reset_password_expiration TIMESTAMPTZ,
      salt VARCHAR,
      hash VARCHAR,
      login_attempts INTEGER DEFAULT 0,
      lock_until TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
    );
  `)

  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS admins_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      _parent_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      _order INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL
    );
  `)

  console.log("admins tables created")
  await client.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
