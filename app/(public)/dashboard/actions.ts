"use server"

import { clearSantriSession } from "@/lib/auth/santri"
import { redirect } from "next/navigation"

export async function logoutAction() {
  await clearSantriSession()
  redirect("/login")
}
