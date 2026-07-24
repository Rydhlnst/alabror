import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation"
import { loginAction } from "./actions"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === "1"

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Login Santri" fill priority className="object-cover" />
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
                  Masuk
                </h1>
                <p className="text-sm text-white/70 mt-1">Dashboard Santri Al-Abror</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-gray-50 flex-1">
        <div className="site-shell max-w-md">
          <ScrollAnimation direction="up">
            <Card className="rounded-none border-0 shadow-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-heading">Masuk ke Akun</CardTitle>
                <p className="text-sm text-muted-foreground">Gunakan email dan password yang sudah didaftarkan</p>
              </CardHeader>
              <CardContent className="pt-6">
                <form action={loginAction} className="space-y-4">
                  {hasError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-none">
                      Email atau password salah.
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="email@contoh.com" required className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Masukkan password" required className="rounded-none" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 rounded-none py-6 text-base font-semibold">
                    Masuk
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-primary font-medium hover:underline">
                      Daftar di sini
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
