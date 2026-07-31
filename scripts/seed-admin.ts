import { getPayload } from "payload"
import config from "@payload-config"

async function main() {
  const payload = await getPayload({ config })

  const email = process.env.ADMIN_EMAIL || "admin@alabror.id"
  const password = process.env.ADMIN_PASSWORD || "password123"
  const name = process.env.ADMIN_NAME || "Administrator"

  const existing = await payload.find({
    collection: "admins" as any,
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`Admin "${email}" already exists, skipping.`)
    await payload.destroy()
    return
  }

  await payload.create({
    collection: "admins" as any,
    data: { email, password, name },
  })

  console.log(`Admin created: ${email}`)
  await payload.destroy()
}

main().catch((err) => {
  console.error("Failed to seed admin:", err)
  process.exit(1)
})
