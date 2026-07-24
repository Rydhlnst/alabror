import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { getDb, schema } from "@/lib/db"

const SESSION_COOKIE = "ponpes_santri_session"
const SESSION_DURATION = 60 * 60 * 24 * 7

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET is required")
  return new TextEncoder().encode(secret)
}

export async function createSantriSession(userId: string, email: string) {
  const token = await new SignJWT({ role: "santri", userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION + "s")
    .sign(getSecret())

  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION,
  })
}

export async function clearSantriSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSantriSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const payload = await jwtVerify(token, getSecret())
    if (payload.payload.role !== "santri") return null
    return payload.payload as { role: string; userId: string; email: string }
  } catch {
    return null
  }
}

export const verifySantriSession = cache(async () => {
  const session = await getSantriSession()
  if (!session) redirect("/login")
  return session
})

export async function getSantriProfile(userId: string) {
  const db = getDb()
  if (!db) return null
  const [user] = await db
    .select()
    .from(schema.santriUsers)
    .where(eq(schema.santriUsers.id, userId))
    .limit(1)
  return user ?? null
}

export async function getSantriRegistration(userId: string) {
  const db = getDb()
  if (!db) return null
  const [reg] = await db
    .select()
    .from(schema.santriRegistrations)
    .where(eq(schema.santriRegistrations.userId, userId))
    .limit(1)
  return reg ?? null
}
