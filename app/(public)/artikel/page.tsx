import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import { getArticleItems } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function ArtikelPage() {
  const articles = await getArticleItems();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Artikel" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
              Artikel
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell space-y-8">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">Belum ada artikel saat ini.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item, index) => (
                <ScrollAnimation key={index} direction="up" delay={index * 0.1} className="h-full">
                  <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col h-full group hover:-translate-y-1 hover:shadow-md transition-all duration-300 rounded-none">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={item.cover || "/foto1.jpg"} alt={item.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <span className="text-xs text-muted-foreground">{item.dateLabel}</span>
                        <Link href={item.href || "#"} className="block group-hover:text-primary transition-colors duration-200">
                          <h3 className="text-lg font-bold leading-snug text-foreground font-heading">{item.title}</h3>
                        </Link>
                      </div>
                      <Link href={item.href || "#"} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                        Baca Selengkapnya
                        <FaArrowRight className="size-3" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

