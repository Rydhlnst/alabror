import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { ImageSkeleton } from "@/components/image-skeleton";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default async function GaleriPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Galeri" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
              Galeri
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {/* Real photos */}
            <ScrollAnimation direction="up" delay={0.05}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden cursor-pointer group break-inside-avoid aspect-[4/3]">
                    <Image src="/foto1.jpg" alt="Foto Pesantren Al-Abror 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="rounded-none max-w-4xl">
                  <DialogTitle className="sr-only">Foto Pesantren Al-Abror 1</DialogTitle>
                  <div className="relative aspect-[16/10]">
                    <Image src="/foto1.jpg" alt="Foto Pesantren Al-Abror 1" fill className="object-contain" />
                  </div>
                </DialogContent>
              </Dialog>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.1}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden cursor-pointer group break-inside-avoid aspect-[3/4]">
                    <Image src="/foto2.jpg" alt="Foto Pesantren Al-Abror 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="rounded-none max-w-4xl">
                  <DialogTitle className="sr-only">Foto Pesantren Al-Abror 2</DialogTitle>
                  <div className="relative aspect-[16/10]">
                    <Image src="/foto2.jpg" alt="Foto Pesantren Al-Abror 2" fill className="object-contain" />
                  </div>
                </DialogContent>
              </Dialog>
            </ScrollAnimation>

            {/* Skeleton placeholders */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ScrollAnimation key={i} direction="up" delay={0.05 * (i + 2)}>
                <ImageSkeleton aspect={i % 2 === 0 ? "3/4" : "4/3"} className="break-inside-avoid" />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
