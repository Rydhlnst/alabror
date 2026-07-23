import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getFacilityItems } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function FasilitasPage() {
  const facilities = await getFacilityItems();

  return (
    <div className="flex flex-col">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto2.jpg" alt="Fasilitas Background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                Fasilitas
              </h1>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="site-shell site-section grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {facilities.map((facility, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
              <Card className="overflow-hidden border-none bg-white shadow-sm flex flex-col p-0 rounded-none hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 h-full">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image src={facility.imagePath} alt={facility.name} fill className="object-cover" />
                </div>
                <CardHeader className="space-y-2 p-6 pb-2">
                  <CardTitle className="text-xl font-bold text-foreground font-heading">{facility.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                  <RichTextRenderer content={facility.description} className="text-sm leading-relaxed text-muted-foreground" />
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}

