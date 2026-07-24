import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation"
import { registerAction } from "./actions"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorMessages: Record<string, string> = {
    "1": "Semua field wajib diisi.",
    "2": "Password minimal 6 karakter.",
    "3": "Email sudah terdaftar.",
  }
  const errorMsg = params.error ? errorMessages[params.error] : null

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Pendaftaran PSB" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Logo Al-Abror" width={64} height={64} className="object-contain" />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                  Pendaftaran PSB
                </h1>
                <p className="text-sm text-white/70 mt-1">Pondok Pesantren Al-Abror</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-gray-50 flex-1">
        <div className="site-shell max-w-2xl">
          <ScrollAnimation direction="up">
            <Card className="rounded-none border-0 shadow-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-heading">Formulir Pendaftaran</CardTitle>
                <p className="text-sm text-muted-foreground">Isi data diri Anda untuk mendaftar sebagai santri baru</p>
              </CardHeader>
              <CardContent className="pt-6">
                <form action={registerAction} className="space-y-6">
                  {errorMsg && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-none">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Akun</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" name="name" placeholder="Nama lengkap Anda" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="email@contoh.com" required className="rounded-none" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="Minimal 6 karakter" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. WhatsApp</Label>
                        <Input id="phone" name="phone" placeholder="08xxx" className="rounded-none" />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Data Pendaftaran</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="jenjang">Jenjang</Label>
                        <select id="jenjang" name="jenjang" required className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm">
                          <option value="">Pilih Jenjang</option>
                          <option value="MI">Madrasah Ibtidaiyah (MI)</option>
                          <option value="SMP">Sekolah Menengah Pertama (SMP)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap (sesuai Ijazah)</Label>
                        <Input id="namaLengkap" name="namaLengkap" placeholder="Nama lengkap sesuai ijazah" required className="rounded-none" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                        <Input id="tempatLahir" name="tempatLahir" placeholder="Kota" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                        <Input id="tanggalLahir" name="tanggalLahir" type="date" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                        <select id="jenisKelamin" name="jenisKelamin" required className="flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm">
                          <option value="">Pilih</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alamat">Alamat Lengkap</Label>
                      <textarea id="alamat" name="alamat" rows={3} placeholder="Alamat lengkap" required className="flex w-full rounded-none border border-input bg-background px-3 py-2 text-sm" />
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Data Orang Tua / Wali</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="namaOrtu">Nama Orang Tua / Wali</Label>
                        <Input id="namaOrtu" name="namaOrtu" placeholder="Nama orang tua / wali" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teleponOrtu">No. Telepon Orang Tua</Label>
                        <Input id="teleponOrtu" name="teleponOrtu" placeholder="08xxx" required className="rounded-none" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 rounded-none py-6 text-base font-semibold">
                    Daftar Sekarang
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                      Masuk di sini
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
