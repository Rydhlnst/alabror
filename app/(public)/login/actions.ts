"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { getDb, schema } from "@/lib/db"
import { verifyPassword } from "@/lib/auth/password"
import { createSantriSession } from "@/lib/auth/santri"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirect("/login?error=1")
  }

  const db = getDb()
  if (!db) {
    redirect("/login?error=1")
  }

  const [user] = await db
    .select()
    .from(schema.santriUsers)
    .where(eq(schema.santriUsers.email, email))
    .limit(1)

  if (!user) {
    redirect("/login?error=1")
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    redirect("/login?error=1")
  }

  await createSantriSession(user.id, user.email)
  redirect("/dashboard")
}
