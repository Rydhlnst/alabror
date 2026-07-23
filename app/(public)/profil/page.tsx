import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getSiteSettings, getProfileSection } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function ProfilPage() {
  const siteConfig = await getSiteSettings();
  const profile = await getProfileSection();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Profil Background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                {profile.pageTitle}
              </h1>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Identitas Lembaga */}
      <section className="site-section bg-white border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Identitas Lembaga</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-gray-300" />
          </div>
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-border">
                      <th className="px-6 py-4 text-sm font-bold text-foreground w-1/3">Field</th>
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.identityRows.map((item, idx) => (
                      <tr key={idx} className="border-b border-border last:border-b-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-foreground/80">{item.label}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground leading-relaxed">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Sejarah */}
      <section className="site-section bg-slate-50 border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">{profile.historyTitle}</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-gray-300" />
          </div>
          <div className="max-w-4xl space-y-6">
            {profile.historyParagraphs.map((paragraph, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 0.1}>
                <RichTextRenderer content={paragraph.body} className="text-base leading-relaxed text-muted-foreground" />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="site-section bg-white border-b border-border">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Visi & Misi</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-gray-300" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollAnimation direction="up" delay={0.1}>
              <Card className="border-none shadow-sm flex flex-col hover:shadow-md transition-all duration-300 rounded-none h-full">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-xl font-bold font-heading">Visi</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex items-center justify-center">
                  <RichTextRenderer content={profile.vision} className="text-base font-medium italic text-foreground/90 text-center leading-relaxed" />
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.2}>
              <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-none h-full">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="text-xl font-bold font-heading">Misi</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {profile.missionItems.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="flex size-5 shrink-0 items-center justify-center bg-primary text-white text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <RichTextRenderer content={item.body} className="text-sm leading-relaxed text-muted-foreground" />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Struktur Pengurus */}
      <section className="site-section bg-slate-50">
        <div className="site-shell space-y-8">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-heading">Struktur Pengurus</h2>
            </ScrollAnimation>
            <div className="w-12 h-1 bg-gray-300" />
          </div>
          <ScrollAnimation direction="up" delay={0.1}>
            <div className="overflow-hidden shadow-sm max-w-3xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-border">
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Jabatan</th>
                      <th className="px-6 py-4 text-sm font-bold text-foreground">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.orgRows.map((item, idx) => (
                      <tr key={idx} className="border-b border-border last:border-b-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-foreground/80">{item.role}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

