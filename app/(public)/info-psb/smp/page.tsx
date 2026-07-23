import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function InfoPSBSMPPage() {
  const siteConfig = await getSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Info PSB SMP" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
              Info PSB - SMP
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell max-w-4xl space-y-8">
          <ScrollAnimation direction="up">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl font-heading">
                Penerimaan Santri Baru - SMP
              </h2>
              <div className="w-12 h-1 bg-primary" />
              <p className="text-base leading-relaxed text-muted-foreground">
                Pondok Pesantren Al-Abror membuka pendaftaran santri baru untuk jenjang SMP
                tahun ajaran 2026/2027. Informasi lengkap mengenai persyaratan dan alur pendaftaran dapat
                diperoleh melalui kontak kami.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.1}>
            <div className="bg-primary text-white p-8 space-y-4">
              <h3 className="text-xl font-bold font-heading">Kontak Pendaftaran</h3>
              <div className="space-y-3 text-sm text-white/80">
                <p><strong>Telepon/WhatsApp:</strong> {siteConfig.phoneDisplay}</p>
                <p><strong>Email:</strong> {siteConfig.email}</p>
                <p><strong>Alamat:</strong> {siteConfig.address}</p>
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 rounded-none" asChild>
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2" />
                  Hubungi via WhatsApp
                </a>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

