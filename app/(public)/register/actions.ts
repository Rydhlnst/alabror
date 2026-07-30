"use server"

import { redirect } from "next/navigation"
import { getPayloadClient } from "@/lib/payload"
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

  const payload = await getPayloadClient()

  const existing = await payload.find({
    collection: "santri-users" as any,
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    redirect("/register?error=3")
  }

  const user = await payload.create({
    collection: "santri-users" as any,
    data: {
      email,
      password,
      name,
      phone: phone || undefined,
    },
  })

  await payload.create({
    collection: "santri-registrations" as any,
    data: {
      user: user.id,
      jenjang,
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      namaOrtu,
      teleponOrtu,
      status: "pending",
    },
  })

  await createSantriSession(String(user.id), email)
  redirect("/dashboard")
}
