import "server-only"

import { cache } from "react"
import { redirect } from "next/navigation"
import { z } from "zod"

import { createAdminSession, getAdminSession } from "@/lib/auth/session"

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export const verifyAdminSession = cache(async () => {
  try {
    const session = await getAdminSession()
    if (!session) {
      redirect("/admin/login")
    }
    return session
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error
    }
    redirect("/admin/login")
  }
})

export async function validateAdminCredentials(input: {
  username: string
  password: string
}) {
  const parsed = loginSchema.safeParse(input)
  if (!parsed.success) {
    return false
  }

  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedUser || !expectedPassword) {
    return false
  }

  if (
    parsed.data.username !== expectedUser ||
    parsed.data.password !== expectedPassword
  ) {
    return false
  }

  await createAdminSession()
  return true
}
