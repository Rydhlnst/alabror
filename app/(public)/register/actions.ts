"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { getDb, schema } from "@/lib/db"
import { createPasswordHash } from "@/lib/auth/password"
import { createSantriSession } from "@/lib/auth/santri"

export async function registerAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const jenjang = String(formData.get("jenjang") ?? "")
  const namaLengkap = String(formData.get("namaLengkap") ?? "").trim()
  const tempatLahir = String(formData.get("tempatLahir") ?? "").trim()
  const tanggalLahir = String(formData.get("tanggalLahir") ?? "")
  const jenisKelamin = String(formData.get("jenisKelamin") ?? "")
  const alamat = String(formData.get("alamat") ?? "").trim()
  const namaOrtu = String(formData.get("namaOrtu") ?? "").trim()
  const teleponOrtu = String(formData.get("teleponOrtu") ?? "").trim()

  if (!email || !password || !name || !jenjang || !namaLengkap || !tempatLahir || !tanggalLahir || !jenisKelamin || !alamat || !namaOrtu || !teleponOrtu) {
    redirect("/register?error=1")
  }

  if (password.length < 6) {
    redirect("/register?error=2")
  }

  const db = getDb()
  if (!db) {
    redirect("/register?error=1")
  }

  const existing = await db.select().from(schema.santriUsers).where(eq(schema.santriUsers.email, email)).limit(1)
  if (existing.length > 0) {
    redirect("/register?error=3")
  }

  const passwordHash = await createPasswordHash(password)

  const [user] = await db
    .insert(schema.santriUsers)
    .values({ email, passwordHash, name, phone: phone || null })
    .returning({ id: schema.santriUsers.id })

  await db.insert(schema.santriRegistrations).values({
    userId: user.id,
    jenjang,
    namaLengkap,
    tempatLahir,
    tanggalLahir,
    jenisKelamin,
    alamat,
    namaOrtu,
    teleponOrtu,
    status: "pending",
  })

  await createSantriSession(user.id, email)
  redirect("/dashboard")
}
