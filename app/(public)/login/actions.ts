"use server"

import { redirect } from "next/navigation"
import { getPayloadClient } from "@/lib/payload"
import { createSantriSession } from "@/lib/auth/santri"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirect("/login?error=1")
  }

  const payload = await getPayloadClient()

  try {
    const result = await payload.login({
      collection: "santri-users" as any,
      data: { email, password },
    })

    if (!result.user) {
      redirect("/login?error=1")
    }

    await createSantriSession(String(result.user.id), email)
    redirect("/dashboard")
  } catch {
    redirect("/login?error=1")
  }
}
