import Image from "next/image"
import Link from "next/link"
import { FaArrowLeft, FaWhatsapp, FaCheck, FaClock, FaFileLines, FaUserPlus } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getSiteSettings } from "@/lib/db/queries"
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation"

export default async function InfoPSBSMPPage() {
  const siteConfig = await getSiteSettings()

  const steps = [
    { icon: FaFileLines, title: "Siapkan Berkas", desc: "Persiapkan dokumen persyaratan yang diperlukan" },
    { icon: FaUserPlus, title: "Daftar Online", desc: "Isi formulir pendaftaran secara online" },
    { icon: FaClock, title: "Verifikasi", desc: "Admin akan memverifikasi data Anda" },
    { icon: FaCheck, title: "Diterima", desc: "Konfirmasi penerimaan dan daftar ulang" },
  ]

  const requirements = [
    "Fotocopy Ijazah / SKHUN 2 lembar",
    "Fotocopy SKL 2 lembar",
    "Fotocopy Akta Kelahiran 2 lembar",
    "Fotocopy KK 2 lembar",
    "Fotocopy KTP Orang Tua 2 lembar",
    "Surat Keterangan Sehat dari Dokter",
    "Pas foto 3x4 sebanyak 4 lembar",
    "Surat Pernyataan dari Ketua RT/RW",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Info PSB SMP" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
        </div>

        <div className="absolute inset-0 -z-5 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        <div className="site-shell relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 border border-white/20">
              <Image src="/logo.png" alt="Logo Al-Abror" width={80} height={80} className="object-contain" />
            </div>
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors mb-3">
                <FaArrowLeft /> Kembali ke Beranda
              </Link>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                Info PSB - SMP
              </h1>
              <p className="text-white/70 mt-2 text-base sm:text-lg">Sekolah Menengah Pertama Tahun Ajaran 2026/2027</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
              <p className="text-2xl font-bold text-white">2026/2027</p>
              <p className="text-xs text-white/60 mt-1">Tahun Ajaran</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
              <p className="text-2xl font-bold text-white">SMP</p>
              <p className="text-xs text-white/60 mt-1">Sekolah Menengah Pertama</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4">
              <p className="text-2xl font-bold text-green-300">Dibuka</p>
              <p className="text-xs text-white/60 mt-1">Pendaftaran Aktif</p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell max-w-5xl space-y-16">
          <ScrollAnimation direction="up">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-heading mb-4">
                Penerimaan Santri Baru - SMP
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Pondok Pesantren Al-Abror membuka pendaftaran santri baru untuk jenjang Sekolah Menengah Pertama (SMP)
                tahun ajaran 2026/2027. Kami menyediakan pendidikan Islam terpadu yang menggabungkan kurikulum
                pesantren dan pendidikan formal untuk mencetak generasi Muslim yang bertauhid, berilmu, beradab, dan Islami.
              </p>
            </div>
          </ScrollAnimation>

          <div>
            <ScrollAnimation direction="up">
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-6">Alur Pendaftaran</h3>
            </ScrollAnimation>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <ScrollAnimation key={i} direction="up" delay={i * 0.1}>
                  <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 rounded-none group">
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="w-12 h-12 mx-auto bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="w-8 h-0.5 bg-primary mx-auto" />
                      <p className="text-xs font-bold text-primary">Langkah {i + 1}</p>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAnimation direction="right">
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-6">Persyaratan Pendaftaran</h3>
                <div className="space-y-3">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100">
                      <span className="flex size-5 shrink-0 items-center justify-center bg-primary text-white text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left">
              <div className="bg-primary text-white p-8 space-y-6 h-full">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-heading">Kontak Pendaftaran</h3>
                  <div className="w-12 h-1 bg-white/30" />
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <FaWhatsapp className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold">Telepon/WhatsApp</p>
                      <p className="text-white/80">{siteConfig.phoneDisplay}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-[10px]">@</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/80">{siteConfig.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center text-[10px]">📍</span>
                    <div>
                      <p className="font-semibold">Alamat</p>
                      <p className="text-white/80">{siteConfig.address}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-none font-semibold" asChild>
                    <a href="/register">
                      <FaUserPlus className="mr-2" />
                      Daftar Sekarang
                    </a>
                  </Button>
                  <Button className="w-full bg-green-500 text-white hover:bg-green-600 rounded-none font-semibold" asChild>
                    <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="mr-2" />
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
