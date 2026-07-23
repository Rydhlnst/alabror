import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_COOKIE = "ponpes_admin_session"
const SESSION_DURATION = 60 * 60 * 24 * 7

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error("SESSION_SECRET is required")
  }
  return new TextEncoder().encode(secret)
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
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

export async function clearAdminSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getAdminSession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const payload = await jwtVerify(token, getSecret())
    if (payload.payload.role !== "admin") {
      return null
    }
    return payload.payload
  } catch {
    return null
  }
}
