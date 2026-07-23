import { notFound } from "next/navigation"
import { eq, asc } from "drizzle-orm"

import { getDb, schema } from "@/lib/db"
import * as defaults from "@/lib/cms/default-content"
import { adminNavItems } from "@/lib/cms/admin-nav"

// Singleton editors
import { HomepageEditor } from "@/components/admin/editors/homepage-editor"
import { FooterEditor } from "@/components/admin/editors/footer-editor"
import { ProfileEditor } from "@/components/admin/editors/profile-editor"
import { ContactEditor } from "@/components/admin/editors/contact-editor"
import { MediaLibraryEditor } from "@/components/admin/editors/media-library-editor"

// Collection manager
import { CollectionManager } from "@/components/admin/collection-manager"
import { Separator } from "@/components/ui/separator"

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const navItem = adminNavItems.find((entry) => entry.href === `/admin/${slug}`)

  if (!navItem) {
    notFound()
  }

  const db = getDb()
  if (!db) {
    return (
      <div className="p-6 text-center text-destructive">
        Koneksi Database tidak tersedia. Setel DATABASE_URL terlebih dahulu.
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 1. Media Library View
  // ---------------------------------------------------------------------------
  if (slug === "media-library") {
    const assets = await db.select().from(schema.mediaAssets).orderBy(asc(schema.mediaAssets.createdAt))
    return <MediaLibraryEditor initialAssets={assets} />
  }

  // ---------------------------------------------------------------------------
  // 2. Homepage Editor View
  // ---------------------------------------------------------------------------
  if (slug === "homepage") {
    const [homepage] = await db.select().from(schema.homepageSections).limit(1)
    const heroStats = await db.select().from(schema.heroStats).orderBy(asc(schema.heroStats.sortOrder))
    const initialHomepage = homepage || defaults.defaultHomepage

    // Resolve media URLs for previews
    const resolveMedia = async (id: string | null) => {
      if (!id) return null
      const [m] = await db.select().from(schema.mediaAssets).where(eq(schema.mediaAssets.id, id)).limit(1)
      return m ? m.url : null
    }

    const heroImageUrl = await resolveMedia(initialHomepage.heroImageMediaId)
    const faqImageUrl = await resolveMedia(initialHomepage.faqImageMediaId)

    const homepageWithUrls = {
      ...initialHomepage,
      heroImageUrl,
      faqImageUrl,
    }

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <HomepageEditor homepage={homepageWithUrls} />

        <Separator className="my-2" />

        <div className="px-6 pb-6">
          <CollectionManager
            slug="hero-stats"
            title="Statistik Banner Hero"
            description="Kelola angka dan label statistik di banner utama (maksimal 3 statistik)."
            items={heroStats}
            columns={[
              { label: "Nilai (Value)", key: "value" },
              { label: "Label", key: "label" },
            ]}
            fields={[
              { name: "value", label: "Nilai Statistik (misal: 4, Tahfizh)", type: "text", required: true },
              { name: "label", label: "Label Statistik (misal: Program Utama)", type: "text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 3. Footer Editor View
  // ---------------------------------------------------------------------------
  if (slug === "footer") {
    const [footer] = await db.select().from(schema.footerSettings).limit(1)
    const quickLinks = await db.select().from(schema.footerQuickLinks).orderBy(asc(schema.footerQuickLinks.sortOrder))
    const socialLinks = await db.select().from(schema.footerSocialLinks).orderBy(asc(schema.footerSocialLinks.sortOrder))
    const initialFooter = footer || { brandText: null, socialIntro: null, copyrightText: "" }

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <FooterEditor footer={initialFooter} />
        </div>

        <Separator className="my-2" />

        <div className="grid gap-8 lg:grid-cols-2 px-4 pb-6">
          <CollectionManager
            slug="footer-quick-links"
            title="Tautan Cepat Footer"
            description="Daftar menu navigasi di bagian bawah halaman."
            items={quickLinks}
            columns={[
              { label: "Label", key: "label" },
              { label: "URL/Path Link", key: "href" },
            ]}
            fields={[
              { name: "label", label: "Label Menu", type: "text", required: true },
              { name: "href", label: "Link Menu", type: "text", required: true },
            ]}
          />

          <CollectionManager
            slug="footer-social-links"
            title="Sosial Media"
            description="Tautan sosial media resmi lembaga."
            items={socialLinks}
            columns={[
              { label: "Platform", key: "platform" },
              { label: "URL Link", key: "href" },
            ]}
            fields={[
              {
                name: "platform",
                label: "Platform Sosial Media",
                type: "select",
                required: true,
                options: [
                  { label: "Facebook", value: "facebook" },
                  { label: "Instagram", value: "instagram" },
                  { label: "Tiktok", value: "tiktok" },
                  { label: "Youtube", value: "youtube" },
                ],
              },
              { name: "href", label: "Tautan URL", type: "text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 4. Profile Page View
  // ---------------------------------------------------------------------------
  if (slug === "profile-page") {
    const [profile] = await db.select().from(schema.profilePage).limit(1)
    const identityRows = await db.select().from(schema.profileIdentityRows).orderBy(asc(schema.profileIdentityRows.sortOrder))
    const missionItems = await db.select().from(schema.profileMissionItems).orderBy(asc(schema.profileMissionItems.sortOrder))
    const goalItems = await db.select().from(schema.profileGoalItems).orderBy(asc(schema.profileGoalItems.sortOrder))
    const orgRows = await db.select().from(schema.profileOrgRows).orderBy(asc(schema.profileOrgRows.sortOrder))
    const programRows = await db.select().from(schema.profileProgramRows).orderBy(asc(schema.profileProgramRows.sortOrder))

    const initialProfile = profile || { pageTitle: "", pageDescription: null, vision: null }

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <ProfileEditor profile={initialProfile} />
        </div>

        <Separator className="my-2" />

        <div className="grid gap-8 lg:grid-cols-2 px-4">
          <CollectionManager
            slug="profile-mission"
            title="Misi Lembaga"
            items={missionItems}
            columns={[
              {
                label: "Butir Misi",
                key: "body",
                type: "rich-text"
              }
            ]}
            fields={[{ name: "body", label: "Isi Butir Misi", type: "rich-text", required: true }]}
          />

          <CollectionManager
            slug="profile-goal"
            title="Tujuan Lembaga"
            items={goalItems}
            columns={[
              {
                label: "Butir Tujuan",
                key: "body",
                type: "rich-text"
              }
            ]}
            fields={[{ name: "body", label: "Isi Butir Tujuan", type: "rich-text", required: true }]}
          />
        </div>

        <Separator className="my-2" />

        <div className="grid gap-8 lg:grid-cols-2 px-4 pb-6">
          <CollectionManager
            slug="profile-identity"
            title="Identitas Lembaga"
            items={identityRows}
            columns={[
              { label: "Label", key: "label" },
              { label: "Nilai / Informasi", key: "value" },
            ]}
            fields={[
              { name: "label", label: "Nama Label (misal: Status Mutu)", type: "text", required: true },
              { name: "value", label: "Nilai / Informasi", type: "text", required: true },
            ]}
          />

          <CollectionManager
            slug="profile-org"
            title="Struktur Organisasi"
            items={orgRows}
            columns={[
              { label: "Jabatan", key: "role" },
              { label: "Nama Pengelola", key: "name" },
            ]}
            fields={[
              { name: "role", label: "Jabatan (misal: Pimpinan)", type: "text", required: true },
              { name: "name", label: "Nama Pengelola", type: "text", required: true },
            ]}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-8 pb-6">
          <CollectionManager
            slug="profile-program"
            title="Ikhtisar Program Kegiatan"
            items={programRows}
            columns={[
              { label: "Nama Kegiatan", key: "name" },
              { label: "Icon Lucide", key: "iconKey" },
            ]}
            fields={[
              { name: "name", label: "Nama Program/Kegiatan", type: "text", required: true },
              { name: "iconKey", label: "Kunci Icon Lucide (misal: star, book, sparkles)", type: "text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 5. Contact Page View
  // ---------------------------------------------------------------------------
  if (slug === "contact-page") {
    const [contact] = await db.select().from(schema.contactPage).limit(1)
    const methods = await db.select().from(schema.contactMethods).orderBy(asc(schema.contactMethods.sortOrder))
    const locations = await db.select().from(schema.contactLocations).orderBy(asc(schema.contactLocations.sortOrder))

    const initialContact = contact || {
      pageTitle: "",
      pageDescription: null,
      infoTitle: "",
      infoDescription: null,
      locationTitle: "",
      locationDescription: null,
    }

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <ContactEditor contact={initialContact} />
        </div>

        <Separator className="my-2" />

        <div className="px-6">
          <CollectionManager
            slug="contact-methods"
            title="Metode Kontak Langsung"
            items={methods}
            columns={[
              { label: "Platform", key: "title" },
              { label: "Sub-judul / Akun", key: "subtitle" },
              { label: "Nomor / Nilai", key: "value" },
            ]}
            fields={[
              { name: "type", label: "Tipe (misal: whatsapp, email, phone)", type: "text", required: true },
              { name: "title", label: "Nama Platform (misal: WhatsApp Pendaftaran)", type: "text", required: true },
              { name: "subtitle", label: "Sub-judul / Keterangan", type: "text", required: true },
              { name: "value", label: "Nomor / Alamat / Nilai", type: "text", required: true },
              { name: "actionLabel", label: "Label Tombol Hubungi", type: "text", required: true },
              { name: "actionHref", label: "Tautan URL Hubungi (Action Link)", type: "text", required: true },
              { name: "description", label: "Deskripsi Singkat", type: "rich-text", required: true },
            ]}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-6 pb-6">
          <CollectionManager
            slug="contact-locations"
            title="Lokasi Kantor Cabang / Wilayah"
            items={locations}
            columns={[
              { label: "Wilayah / Judul", key: "title" },
              { label: "Keterangan", key: "subtitle" },
            ]}
            fields={[
              { name: "title", label: "Judul Wilayah/Kantor", type: "text", required: true },
              { name: "subtitle", label: "Keterangan Tambahan", type: "text", required: true },
              { name: "address", label: "Alamat Lengkap", type: "rich-text", required: true },
              { name: "mapEmbedUrl", label: "Google Map Embed Iframe src (Opsional)", type: "text" },
              { name: "mapHref", label: "Google Map Direct Href (Opsional)", type: "text" },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 6. Navigation View (Collection Manager)
  // ---------------------------------------------------------------------------
  if (slug === "navigation") {
    const items = await db.select().from(schema.navigationItems).orderBy(asc(schema.navigationItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="navigation"
          title="Menu Navigasi Website"
          description="Atur susunan menu bar yang tampil di bagian atas website publik."
          items={items}
          columns={[
            { label: "Label Menu", key: "label" },
            { label: "Tautan URL / Halaman", key: "href" },
            {
              label: "Tab Baru",
              key: "openInNewTab",
              type: "boolean",
            },
          ]}
          fields={[
            { name: "label", label: "Nama Menu Navigasi", type: "text", required: true },
            { name: "href", label: "Tautan Halaman (misal: /profil atau WhatsApp URL)", type: "text", required: true },
            { name: "openInNewTab", label: "Buka tautan di tab baru", type: "boolean" },
          ]}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 7. News Collection
  // ---------------------------------------------------------------------------
  if (slug === "news") {
    const items = await db.select().from(schema.newsItems).orderBy(asc(schema.newsItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="news"
          title="Berita & Kegiatan"
          description="Publikasikan kegiatan santri, berita pengumuman, dan agenda pondok pesantren."
          items={items}
          columns={[
            { label: "Judul Berita", key: "title" },
            { label: "Tanggal", key: "dateLabel" },
            { label: "Kategori", key: "category" },
          ]}
          fields={[
            { name: "title", label: "Judul Berita/Kegiatan", type: "text", required: true },
            { name: "dateLabel", label: "Tanggal Rilis (misal: 17 Jun 2026)", type: "text", required: true },
            { name: "category", label: "Kategori (misal: berita acara, pengumuman)", type: "text" },
            { name: "summary", label: "Isi Berita Lengkap", type: "rich-text", required: true },
            { name: "coverMediaId", label: "Gambar Cover / Sampul", type: "media-picker" },
            { name: "href", label: "Tautan Detail Berita (gunakan '#' jika tidak ada link luar)", type: "text", required: true },
            { name: "published", label: "Publikasikan ke Website", type: "boolean" },
          ]}
          defaultNewValues={{ href: "#", published: true }}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 8. Partners & Accreditation Collection
  // ---------------------------------------------------------------------------
  if (slug === "partners-accreditation") {
    const items = await db.select().from(schema.partnerItems).orderBy(asc(schema.partnerItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="partners-accreditation"
          title="Mitra & Akreditasi"
          description="Kelola daftar logo dan nama instansi mitra resmi pesantren."
          items={items}
          columns={[
            { label: "Nama Institusi", key: "name" },
            { label: "Keterangan", key: "note" },
          ]}
          fields={[
            { name: "name", label: "Nama Institusi / Penghargaan", type: "text", required: true },
            { name: "note", label: "Keterangan Singkat", type: "text", required: true },
            { name: "logoMediaId", label: "Logo Mitra / Akreditasi", type: "media-picker" },
            { name: "href", label: "Tautan URL Website Mitra (Opsional)", type: "text" },
          ]}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 9. History Timeline Collection
  // ---------------------------------------------------------------------------
  if (slug === "history-timeline") {
    const items = await db.select().from(schema.historyTimelineItems).orderBy(asc(schema.historyTimelineItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="history-timeline"
          title="Milestone Sejarah"
          description="Alur waktu pencapaian dan sejarah berdirinya pondok pesantren."
          items={items}
          columns={[
            { label: "Tahun", key: "year" },
            { label: "Judul Peristiwa", key: "title" },
          ]}
          fields={[
            { name: "year", label: "Tahun Kejadian (misal: 2007)", type: "text", required: true },
            { name: "title", label: "Nama Peristiwa Sejarah", type: "text", required: true },
            { name: "description", label: "Detail Peristiwa", type: "rich-text", required: true },
            { name: "color", label: "Warna Label Aksen (misal: blue, gold, emerald)", type: "text", required: true },
          ]}
          defaultNewValues={{ color: "gold" }}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 10. Why Choose Us Collection
  // ---------------------------------------------------------------------------
  if (slug === "why-choose-us") {
    const items = await db.select().from(schema.whyUsItems).orderBy(asc(schema.whyUsItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="why-choose-us"
          title="Keunggulan Pesantren (Why Choose Us)"
          description="Butir keunggulan fasilitas, kurikulum, dan pengasuhan di As Salam Metro."
          items={items}
          columns={[
            { label: "Judul Keunggulan", key: "title" },
            { label: "Icon Lucide Key", key: "iconKey" },
          ]}
          fields={[
            { name: "title", label: "Judul Keunggulan", type: "text", required: true },
            { name: "description", label: "Penjelasan Keunggulan", type: "rich-text", required: true },
            { name: "iconKey", label: "Kunci Icon Lucide (misal: star, graduation-cap, shield-check)", type: "text", required: true },
          ]}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 11. Testimonials Collection
  // ---------------------------------------------------------------------------
  if (slug === "testimonials") {
    const items = await db.select().from(schema.testimonials).orderBy(asc(schema.testimonials.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="testimonials"
          title="Testimoni"
          description="Ulasan dan kisah sukses dari alumni, wali santri, dan tokoh masyarakat."
          items={items}
          columns={[
            { label: "Nama Pengulas", key: "name" },
            { label: "Jabatan / Keterangan", key: "role" },
          ]}
          fields={[
            { name: "name", label: "Nama Pengulas", type: "text", required: true },
            { name: "role", label: "Status (misal: Alumni SMP, Wali Santri)", type: "text", required: true },
            { name: "quote", label: "Kutipan Testimoni", type: "rich-text", required: true },
            { name: "avatarMediaId", label: "Foto Pengulas", type: "media-picker" },
            { name: "published", label: "Publikasikan", type: "boolean" },
          ]}
          defaultNewValues={{ published: true }}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 12. Gallery Collection
  // ---------------------------------------------------------------------------
  if (slug === "gallery") {
    const items = await db.select().from(schema.galleryItems).orderBy(asc(schema.galleryItems.sortOrder))
    return (
      <div className="p-4 lg:p-6">
        <CollectionManager
          slug="gallery"
          title="Galeri Foto Website"
          description="Kelola foto kegiatan utama untuk ditampilkan di bagian Galeri publik."
          items={items}
          columns={[
            { label: "Label Alternatif (Alt)", key: "alt" },
            { label: "Rasio Dimensi (Aspect)", key: "aspect" },
          ]}
          fields={[
            { name: "imageMediaId", label: "Berkas Gambar", type: "media-picker", required: true },
            { name: "alt", label: "Teks Alternatif (SEO/Alt)", type: "text", required: true },
            { name: "caption", label: "Keterangan Foto (Hover Caption)", type: "rich-text" },
            {
              name: "aspect",
              label: "Rasio Gambar",
              type: "select",
              required: true,
              options: [
                { label: "Square (1:1)", value: "square" },
                { label: "Video (16:9)", value: "video" },
                { label: "Tall (3:4)", value: "tall" },
              ],
            },
            { name: "published", label: "Tampilkan di Website", type: "boolean" },
          ]}
          defaultNewValues={{ aspect: "square", published: true }}
        />
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 13. Education Programs & Highlights View
  // ---------------------------------------------------------------------------
  if (slug === "education-programs") {
    const highlights = await db.select().from(schema.educationHighlights).orderBy(asc(schema.educationHighlights.sortOrder))
    const programs = await db.select().from(schema.educationPrograms).orderBy(asc(schema.educationPrograms.sortOrder))
    
    // For program points we load programs as options
    const programOptions = programs.map((p) => ({ label: p.name, value: p.id }))
    const programPoints = await db.select().from(schema.educationProgramPoints).orderBy(asc(schema.educationProgramPoints.sortOrder))

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <CollectionManager
            slug="education-highlights"
            title="Sorotan Keunggulan Pendidikan"
            description="Paragraf poin sorotan di atas daftar program studi."
            items={highlights}
            columns={[
              {
                label: "Teks Sorotan",
                key: "body",
                type: "rich-text"
              }
            ]}
            fields={[{ name: "body", label: "Teks Ringkasan", type: "rich-text", required: true }]}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-4">
          <CollectionManager
            slug="education-programs"
            title="Program Pendidikan & Jenjang"
            description="Kelola program jenjang pendidikan resmi (misal: Madrasah Diniyah, Boarding School)."
            items={programs}
            columns={[
              { label: "Nama Program", key: "name" },
              { label: "Kunci Icon", key: "iconKey" },
            ]}
            fields={[
              { name: "name", label: "Nama Jenjang/Program", type: "text", required: true },
              { name: "summary", label: "Penjelasan Singkat Program", type: "rich-text", required: true },
              { name: "focus", label: "Kurikulum & Fokus (Paling bawah program)", type: "rich-text", required: true },
              { name: "imageMediaId", label: "Gambar Penunjang Program", type: "media-picker" },
              { name: "iconKey", label: "Kunci Icon Lucide (misal: building-2, star, graduation-cap, child)", type: "text", required: true },
              { name: "homePrimaryLabel", label: "Label Tombol Utama Beranda", type: "text", required: true },
              { name: "homePrimaryHref", label: "Link Tombol Utama Beranda", type: "text", required: true },
              { name: "homeSecondaryLabel", label: "Label Tombol Kedua Beranda (Opsional)", type: "text" },
              { name: "homeSecondaryHref", label: "Link Tombol Kedua Beranda (Opsional)", type: "text" },
            ]}
            defaultNewValues={{ homePrimaryLabel: "Lihat Detail", homePrimaryHref: "/pendidikan" }}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-4 pb-6">
          <CollectionManager
            slug="education-program-points"
            title="Butir Poin Fokus Program"
            description="Detail butir-butir penjelas (bullet points) yang tampil di bawah masing-masing program studi."
            items={programPoints}
            columns={[
              {
                label: "Materi Program Studi",
                key: "programId",
                type: "select",
                options: programOptions
              },
              {
                label: "Butir Poin",
                key: "body",
                type: "rich-text"
              }
            ]}
            fields={[
              {
                name: "programId",
                label: "Ditautkan ke Program",
                type: "select",
                required: true,
                options: programOptions,
              },
              { name: "body", label: "Isi Butir Poin", type: "rich-text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 14. Facilities & Highlights View
  // ---------------------------------------------------------------------------
  if (slug === "facilities") {
    const highlights = await db.select().from(schema.facilityHighlights).orderBy(asc(schema.facilityHighlights.sortOrder))
    const facilities = await db.select().from(schema.facilities).orderBy(asc(schema.facilities.sortOrder))

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <CollectionManager
            slug="facility-highlights"
            title="Sorotan Fasilitas"
            description="Ringkasan atau teks penjelas di bagian atas halaman fasilitas."
            items={highlights}
            columns={[
              {
                label: "Teks Sorotan",
                key: "body",
                type: "rich-text"
              }
            ]}
            fields={[{ name: "body", label: "Teks Sorotan Fasilitas", type: "rich-text", required: true }]}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-4 pb-6">
          <CollectionManager
            slug="facilities"
            title="Sarana & Fasilitas Fisik"
            description="Kelola item sarana fisik pesantren (misal: Ruang Kelas, Lapangan Olahraga, Asrama)."
            items={facilities}
            columns={[
              { label: "Nama Fasilitas", key: "name" },
              { label: "Kunci Icon", key: "iconKey" },
            ]}
            fields={[
              { name: "name", label: "Nama Fasilitas", type: "text", required: true },
              { name: "description", label: "Penjelasan Sarana Fisik", type: "rich-text", required: true },
              { name: "imageMediaId", label: "Gambar Fasilitas", type: "media-picker" },
              { name: "iconKey", label: "Kunci Icon Lucide (misal: book-open, medal, waves, horse)", type: "text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // 15. FAQ Categories & Items View
  // ---------------------------------------------------------------------------
  if (slug === "faq") {
    const categories = await db.select().from(schema.faqCategories).orderBy(asc(schema.faqCategories.sortOrder))
    const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }))
    const items = await db.select().from(schema.faqItems).orderBy(asc(schema.faqItems.sortOrder))

    return (
      <div className="flex flex-1 flex-col gap-8 p-4 lg:p-6">
        <div className="px-4">
          <CollectionManager
            slug="faq-categories"
            title="Kategori FAQ"
            description="Kelola tab kategori pengelompokkan FAQ (misal: Pendaftaran, Program Boarding)."
            items={categories}
            columns={[
              { label: "Nama Kategori", key: "name" },
              { label: "Icon Kunci", key: "iconKey" },
            ]}
            fields={[
              { name: "name", label: "Nama Kategori FAQ", type: "text", required: true },
              { name: "iconKey", label: "Kunci Icon Lucide (misal: list-tree, book-open, building-2)", type: "text", required: true },
            ]}
          />
        </div>

        <Separator className="my-2" />

        <div className="px-4 pb-6">
          <CollectionManager
            slug="faq-items"
            title="Butir Tanya Jawab (FAQ Items)"
            description="Kelola daftar pertanyaan dan jawaban di setiap kategori."
            items={items}
            columns={[
              {
                label: "Kategori",
                key: "categoryId",
                type: "select",
                options: categoryOptions
              },
              { label: "Pertanyaan", key: "question" },
            ]}
            fields={[
              {
                name: "categoryId",
                label: "Ditautkan ke Kategori",
                type: "select",
                required: true,
                options: categoryOptions,
              },
              { name: "question", label: "Pertanyaan", type: "text", required: true },
              { name: "answer", label: "Jawaban", type: "rich-text", required: true },
            ]}
          />
        </div>
      </div>
    )
  }

  // Fallback / dynamic catch-all route not mapped
  notFound()
}
