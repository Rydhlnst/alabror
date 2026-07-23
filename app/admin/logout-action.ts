"use server"

import { clearAdminSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export async function logoutAction() {
  await clearAdminSession()
  redirect("/admin/login")
}
