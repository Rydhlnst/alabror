import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getProgramPendidikanItems } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function ProgramPendidikanPage() {
  const programs = await getProgramPendidikanItems();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Program Pendidikan" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
              Program Pendidikan
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell space-y-12">
          {programs.map((program, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
              <div className="grid gap-8 lg:grid-cols-2 items-start">
                <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl font-heading">
                    {program.name}
                  </h2>
                  <div className="w-12 h-1 bg-gray-300" />
                  <RichTextRenderer content={program.description} className="text-base leading-relaxed text-muted-foreground" />
                  <ul className="space-y-3">
                    {program.points.map((point: { body: unknown; sortOrder: number }, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="flex size-5 shrink-0 items-center justify-center bg-primary text-white text-[10px] mt-0.5">&#10003;</span>
                        <RichTextRenderer content={point.body} className="text-sm text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image src={program.imagePath} alt={program.name} fill className="object-cover" />
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}

