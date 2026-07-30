import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"
import { getPayloadClient } from "@/lib/payload"

const SESSION_COOKIE = "al-abror_santri_session"
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
  try {
    const payload = await getPayloadClient()
    const user = await payload.findByID({ collection: "santri-users" as any, id: userId })
    return user ?? null
  } catch {
    return null
  }
}

export async function getSantriRegistration(userId: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: "santri-registrations" as any,
      where: { user: { equals: userId } },
      limit: 1,
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
}
