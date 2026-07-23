import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import { HeroCarousel } from "@/components/hero-carousel";
import { ImageSkeleton } from "@/components/image-skeleton";
import {
  getSiteSettings,
  getHomepageSections,
  getNewsItems,
  getArticleItems,
  getFacilityItems,
  getTeacherItems,
  getProgramPendidikanItems,
} from "@/lib/db/queries";

export default async function Home() {
  const siteConfig = await getSiteSettings();
  const homepage = await getHomepageSections();
  const news = await getNewsItems();
  const articles = await getArticleItems();
  const facilities = await getFacilityItems();
  const teachers = await getTeacherItems();
  const programs = await getProgramPendidikanItems();

  const carouselSlides = [
    {
      image: "/foto1.jpg",
      title: siteConfig.name,
      description: typeof siteConfig.description === 'string' ? siteConfig.description : siteConfig.shortName + " - " + siteConfig.tagline,
      primaryCta: { label: "Info PSB", href: "/info-psb/mi" },
      secondaryCta: { label: "Profil Pesantren", href: "/profil" },
    },
    {
      image: "/foto2.jpg",
      title: "Pendidikan Terpadu",
      description: "Mengintegrasikan kurikulum pesantren dan pendidikan formal untuk mencetak generasi yang berilmu dan beradab.",
      primaryCta: { label: "Program Pendidikan", href: "/program-pendidikan" },
    },
    {
      image: "/foto1.jpg",
      title: "Pendaftaran Santri Baru",
      description: "Buka pendaftaran untuk jenjang MI dan SMP tahun ajaran 2026/2027. Hubungi kami untuk informasi lebih lanjut.",
      primaryCta: { label: "Daftar Sekarang", href: "/info-psb/mi" },
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel slides={carouselSlides} autoPlayInterval={6000} />

      {/* Marquee Ticker */}
      <section className="bg-gray-800 text-white py-2.5 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4 whitespace-nowrap text-sm">
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  {siteConfig.motto}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  Tahun Berdiri: {siteConfig.foundedYear}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  NSP: {siteConfig.nsp}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  WhatsApp: {siteConfig.phoneDisplay}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Terbaru - FOKUS UTAMA */}
      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading">
                Berita Terbaru
              </h2>
              <div className="w-12 h-0.5 bg-gray-300" />
            </div>
            <Link href="/berita" className="text-sm font-medium text-primary hover:underline hidden sm:block">
              Lihat Semua &rarr;
            </Link>
          </div>

          {/* Featured News - Large */}
          {news.length > 0 && (
            <ScrollAnimation direction="up">
              <Link href={news[0].href || "#"} className="group block">
                <div className="grid md:grid-cols-2 gap-0 bg-white border border-gray-100 overflow-hidden">
                  <div className="relative aspect-[16/10] md:aspect-auto">
                    <Image src={news[0].cover || "/foto1.jpg"} alt={news[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary bg-primary/5 px-2.5 py-1">{news[0].category}</span>
                      <span className="text-xs text-gray-400">{news[0].dateLabel}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {news[0].title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {typeof news[0].summary === 'string' ? news[0].summary : ''}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary pt-2">
                      Baca Selengkapnya <FaArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          )}

          {/* News Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.slice(1, 7).map((item, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.05} className="h-full">
                <Link href={item.href || "#"} className="group block h-full">
                  <Card className="overflow-hidden border border-gray-100 bg-white flex flex-col h-full hover:shadow-md transition-all duration-300 rounded-none">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.cover || "/foto1.jpg"} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-0.5">{item.category}</span>
                          <span className="text-[10px] text-gray-400">{item.dateLabel}</span>
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-primary transition-colors">
                        Baca <FaArrowRight className="size-2.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center sm:hidden">
            <Link href="/berita" className="text-sm font-medium text-primary hover:underline">
              Lihat Semua Berita &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kami - Singkat */}
      <section className="site-section bg-gray-50">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="right">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading">
                    Tentang Kami
                  </h2>
                  <div className="w-12 h-0.5 bg-gray-300" />
                </div>
                <RichTextRenderer content={homepage.heroDescription} className="text-base leading-relaxed text-gray-500" />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-white border border-gray-100">
                    <p className="text-2xl font-bold text-primary">{siteConfig.foundedYear}</p>
                    <p className="text-xs text-gray-500 mt-1">Tahun Berdiri</p>
                  </div>
                  <div className="text-center p-3 bg-white border border-gray-100">
                    <p className="text-2xl font-bold text-primary">MI</p>
                    <p className="text-xs text-gray-500 mt-1">Madrasah Ibtidaiyah</p>
                  </div>
                  <div className="text-center p-3 bg-white border border-gray-100">
                    <p className="text-2xl font-bold text-primary">SMP</p>
                    <p className="text-xs text-gray-500 mt-1">Sekolah Menengah</p>
                  </div>
                </div>
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-none mt-2" asChild>
                  <Link href="/profil">Selengkapnya</Link>
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/foto2.jpg" alt={siteConfig.name} fill className="object-cover" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Program Pendidikan */}
      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading">
              Program Pendidikan
            </h2>
            <div className="w-12 h-0.5 bg-gray-300 mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border border-gray-100 bg-white flex flex-col hover:shadow-md transition-all duration-300 rounded-none">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={program.imagePath} alt={program.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 font-heading">{program.name}</h3>
                      <RichTextRenderer content={program.description} className="text-sm text-gray-500 leading-relaxed" />
                      <ul className="space-y-2">
                        {program.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                            <span className="flex size-4 shrink-0 items-center justify-center bg-primary/10 text-primary text-[10px] mt-0.5">&#10003;</span>
                            <RichTextRenderer content={point.body} className="text-sm text-gray-500" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-primary/90 rounded-none mt-4" asChild>
                      <Link href="/program-pendidikan">Lihat Detail</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section className="site-section bg-gray-50">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading">
              Fasilitas
            </h2>
            <div className="w-12 h-0.5 bg-gray-300 mx-auto" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.05}>
                <Card className="overflow-hidden border border-gray-100 bg-white flex flex-col p-0 hover:shadow-md transition-all duration-300 rounded-none">
                  <div className="relative aspect-[4/3]">
                    <Image src={facility.imagePath} alt={facility.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900">{facility.name}</h3>
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading">
              Galeri
            </h2>
            <div className="w-12 h-0.5 bg-gray-300 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ScrollAnimation direction="up" delay={0.05} className="col-span-2 row-span-2">
              <div className="relative aspect-square overflow-hidden">
                <Image src="/foto1.jpg" alt="Foto Pesantren 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/foto2.jpg" alt="Foto Pesantren 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.15}>
              <ImageSkeleton aspect="1/1" />
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <ImageSkeleton aspect="1/1" />
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.25}>
              <ImageSkeleton aspect="1/1" />
            </ScrollAnimation>
          </div>

          <div className="text-center">
            <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-none" asChild>
              <Link href="/galeri">Lihat Semua Foto</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-shell site-section">
        <div className="grid gap-5 rounded-none bg-gray-900 px-6 py-8 text-white sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <ScrollAnimation direction="up" className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl font-heading text-white">
              {homepage.ctaTitle}
            </h2>
            <RichTextRenderer content={homepage.ctaDescription} className="text-sm text-gray-300" />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.15}>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm rounded-none" asChild>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                {homepage.ctaLabel}
              </a>
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
