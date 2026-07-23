import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

import { RichTextRenderer } from "@/components/rich-text-renderer";
import { getProfileSection } from "@/lib/db/queries";
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation";

export default async function StrukturPengurusPage() {
  const profile = await getProfileSection();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/foto1.jpg" alt="Struktur Pengurus" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-green hover:underline">
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
          <ScrollAnimation direction="down">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
              Struktur Pengurus
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="site-shell">
          <ScrollAnimation direction="up">
            <div className="overflow-hidden shadow-sm max-w-3xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-sm font-bold">Jabatan</th>
                      <th className="px-6 py-4 text-sm font-bold">Nama</th>
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

