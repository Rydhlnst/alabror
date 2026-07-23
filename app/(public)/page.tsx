import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";
import {
  getSiteSettings,
  getHomepageSections,
  getNewsItems,
  getArticleItems,
  getFacilityItems,
  getTeacherItems,
  getGalleryItems,
  getProgramPendidikanItems,
} from "@/lib/db/queries";

import { ImageSkeleton } from "@/components/image-skeleton";

export default async function Home() {
  const siteConfig = await getSiteSettings();
  const homepage = await getHomepageSections();
  const news = await getNewsItems();
  const articles = await getArticleItems();
  const facilities = await getFacilityItems();
  const teachers = await getTeacherItems();
  const gallery = await getGalleryItems();
  const programs = await getProgramPendidikanItems();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src={homepage.heroImageUrl}
            alt={siteConfig.name}
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>

        <div className="site-shell relative z-10 w-full py-16 sm:py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollAnimation direction="down" delay={0.1}>
              <p className="text-sm font-bold tracking-[0.24em] text-white uppercase sm:text-base">
                {homepage.heroBadge}
              </p>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.2}>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight font-heading">
                {homepage.heroTitle}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.3}>
              <RichTextRenderer
                content={homepage.heroDescription}
                className="text-base text-white/80 sm:text-lg max-w-2xl mx-auto leading-relaxed"
              />
            </ScrollAnimation>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <ScrollAnimation direction="up" delay={0.4}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-none px-8 py-6 text-sm font-bold uppercase tracking-wider" asChild>
                  <Link href={homepage.primaryCtaHref}>
                    {homepage.primaryCtaLabel}
                    <FaArrowRight className="ml-1 size-3" />
                  </Link>
                </Button>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={0.5}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none px-8 py-6 text-sm font-bold uppercase tracking-wider bg-transparent" asChild>
                  <Link href={homepage.secondaryCtaHref}>{homepage.secondaryCtaLabel}</Link>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="bg-primary text-white py-2.5 overflow-hidden">
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
                  Fokus: {siteConfig.focusPendidikan}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  WhatsApp: {siteConfig.phoneDisplay}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-white/60">&#9670;</span>
                  {siteConfig.address}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="site-section bg-white">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="right">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                  Tentang Kami
                </h2>
                <div className="w-16 h-1 bg-primary" />
                <RichTextRenderer content={homepage.heroDescription} className="text-base leading-relaxed text-muted-foreground" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Tahun Berdiri:</strong> {siteConfig.foundedYear}</p>
                  <p><strong>NSP:</strong> {siteConfig.nsp}</p>
                  <p><strong>Fokus:</strong> {siteConfig.focusPendidikan}</p>
                </div>
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-none" asChild>
                  <Link href="/profil">Selengkapnya</Link>
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={homepage.heroImageUrl} alt={siteConfig.name} fill className="object-cover" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section className="site-section bg-muted">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                {homepage.newsTitle}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </ScrollAnimation>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">Belum ada berita terbaru saat ini.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.slice(0, 3).map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col h-full group hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.cover || "/foto1.jpg"} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                        <Link href={item.href || "#"} className="block group-hover:text-primary transition-colors duration-200">
                          <h3 className="text-sm font-bold leading-snug text-foreground font-heading line-clamp-3">{item.title}</h3>
                        </Link>
                      </div>
                      <Link href={item.href || "#"} className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                        Baca Selengkapnya
                        <FaArrowRight className="size-2.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Program Pendidikan Section */}
      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                {homepage.programTitle}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </ScrollAnimation>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col h-full group hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={program.imagePath} alt={program.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary font-heading">{program.name}</h3>
                      <RichTextRenderer content={program.description} className="text-sm text-muted-foreground leading-relaxed" />
                      <ul className="space-y-2">
                        {program.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="flex size-4 shrink-0 items-center justify-center bg-primary text-white text-[10px] mt-0.5">&#10003;</span>
                            <RichTextRenderer content={point.body} className="text-sm text-muted-foreground" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section className="site-section bg-muted">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                {homepage.facilitiesTitle}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </ScrollAnimation>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col p-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                  <div className="relative aspect-[4/3]">
                    <Image src={facility.imagePath} alt={facility.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 space-y-2 flex-1">
                    <h3 className="text-lg font-bold text-foreground font-heading">{facility.name}</h3>
                    <RichTextRenderer content={facility.description} className="text-sm leading-relaxed text-muted-foreground" />
                  </div>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Artikel Section */}
      {articles.length > 0 && (
        <section className="site-section bg-white">
          <div className="site-shell space-y-8">
            <div className="text-center space-y-3">
              <ScrollAnimation direction="down">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                  {homepage.articleTitle}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation direction="down" delay={0.1}>
                <div className="w-16 h-1 bg-primary mx-auto" />
              </ScrollAnimation>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col h-full group hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.cover || "/foto1.jpg"} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                        <Link href={item.href || "#"} className="block group-hover:text-primary transition-colors">
                          <h3 className="text-sm font-bold leading-snug text-foreground font-heading line-clamp-3">{item.title}</h3>
                        </Link>
                      </div>
                      <Link href={item.href || "#"} className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                        Baca Selengkapnya
                        <FaArrowRight className="size-2.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galeri Section */}
      <section className="site-section bg-muted">
        <div className="site-shell space-y-8">
          <div className="text-center space-y-3">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                {homepage.galleryTitle}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {/* Real photos */}
            <ScrollAnimation direction="up" delay={0.05}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/foto1.jpg" alt="Foto Pesantren Al-Abror 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src="/foto2.jpg" alt="Foto Pesantren Al-Abror 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </ScrollAnimation>
            {/* Skeleton placeholders */}
            {[1, 2, 3, 4].map((i) => (
              <ScrollAnimation key={i} direction="up" delay={0.05 * (i + 2)}>
                <ImageSkeleton aspect="4/3" />
              </ScrollAnimation>
            ))}
          </div>

          <div className="text-center pt-2">
            <ScrollAnimation direction="up" delay={0.2} className="inline-block">
              <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 rounded-none text-sm font-bold uppercase tracking-wider shadow-sm" asChild>
                <Link href="/galeri">Lihat Semua Foto <FaArrowRight className="inline ml-2 size-3" /></Link>
              </Button>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Tenaga Pendidik Section */}
      {teachers.length > 0 && (
        <section className="site-section bg-white">
          <div className="site-shell space-y-8">
            <div className="text-center space-y-3">
              <ScrollAnimation direction="down">
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-heading">
                  {homepage.teachersTitle}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation direction="down" delay={0.1}>
                <div className="w-16 h-1 bg-primary mx-auto" />
              </ScrollAnimation>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((teacher, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.05}>
                  <Card className="overflow-hidden border-none bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none text-center">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={teacher.imagePath} alt={teacher.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4 space-y-1">
                      <h3 className="text-sm font-bold text-foreground font-heading">{teacher.name}</h3>
                      <p className="text-xs text-muted-foreground">{teacher.role}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="site-shell site-section">
        <div className="grid gap-5 rounded-none bg-primary px-6 py-8 text-white shadow-md sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <ScrollAnimation direction="up" className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl font-heading text-white">
              {homepage.ctaTitle}
            </h2>
            <RichTextRenderer content={homepage.ctaDescription} className="text-sm text-white/80" />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.15}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-sm rounded-none" asChild>
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

