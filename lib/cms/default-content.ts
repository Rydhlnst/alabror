import {
  articleItems,
  facilityItems,
  mainNav,
  newsItems,
  siteConfig,
  teacherItems,
  galleryItems,
  programPendidikanItems,
  strukturPengurusItems,
  visionItems,
  missionItems,
} from "@/lib/content"
import { richTextParagraph } from "@/lib/cms/rich-text"

export const defaultMediaAssets = [
  { label: "Primary Logo", url: "/logo.png", storageKey: "/logo.png", kind: "image", alt: siteConfig.shortName },
  { label: "Hero Image", url: siteConfig.heroImage, storageKey: siteConfig.heroImage, kind: "image", alt: siteConfig.name },
]

export const defaultSiteSettings = {
  id: "site",
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  description: richTextParagraph(siteConfig.description),
  whatsapp: siteConfig.whatsapp,
  whatsappLabel: siteConfig.whatsappLabel,
  brochureHref: siteConfig.brochureHref,
  mapHref: siteConfig.mapHref,
  logoPath: siteConfig.logo,
  address: siteConfig.address,
  email: siteConfig.email,
  officeHours: siteConfig.officeHours,
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  nsp: siteConfig.nsp,
  nspYear: siteConfig.nspYear,
  foundedYear: siteConfig.foundedYear,
  facebook: siteConfig.facebook,
  focusPendidikan: siteConfig.focusPendidikan,
  metadataTitle: `${siteConfig.shortName} | ${siteConfig.tagline}`,
  metadataDescription: siteConfig.description,
}

export const defaultHomepage = {
  id: "homepage",
  heroBadge: siteConfig.motto,
  heroTitle: siteConfig.name,
  heroDescription: richTextParagraph(siteConfig.description),
  heroImagePath: siteConfig.heroImage,
  primaryCtaLabel: "Info PSB",
  primaryCtaHref: "/info-psb/mi",
  secondaryCtaLabel: "Profil Pesantren",
  secondaryCtaHref: "/profil",
  newsTitle: "Berita Terbaru",
  newsDescription: richTextParagraph("Berita terbaru dari Pondok Pesantren Al-Abror Halmahera Timur"),
  articleTitle: "Artikel",
  articleDescription: richTextParagraph("Artikel dan informasi dari Pondok Pesantren Al-Abror"),
  facilitiesTitle: "Fasilitas",
  facilitiesDescription: richTextParagraph("Fasilitas yang tersedia di Pondok Pesantren Al-Abror"),
  programTitle: "Program Pendidikan",
  programDescription: richTextParagraph("Program pendidikan terpadu antara kurikulum pesantren dan pendidikan formal"),
  galleryTitle: "Galeri",
  galleryDescription: richTextParagraph("Dokumentasi kegiatan Pondok Pesantren Al-Abror"),
  teachersTitle: "Tenaga Pendidik",
  teachersDescription: richTextParagraph("Tenaga pendidik dan pengajar di Pondok Pesantren Al-Abror"),
  ctaTitle: "Pendaftaran Santri Baru",
  ctaDescription: richTextParagraph("Hubungi kami untuk informasi pendaftaran santri baru"),
  ctaLabel: "Hubungi via WhatsApp",
  ctaHref: siteConfig.whatsapp,
}

export const defaultNavigation = mainNav.map((item, index) => ({
  ...item,
  sortOrder: index,
  openInNewTab: item.href.startsWith("http"),
  children: item.children?.map((child, childIndex) => ({
    ...child,
    sortOrder: childIndex,
    openInNewTab: child.href.startsWith("http"),
  })),
}))

export const defaultNewsItems = newsItems.map((item, index) => ({
  title: item.title,
  dateLabel: item.date,
  category: item.category ?? "",
  summary: richTextParagraph(item.summary),
  href: item.href,
  coverPath: item.image ?? siteConfig.heroImage,
  published: true,
  sortOrder: index,
}))

export const defaultArticleItems = articleItems.map((item, index) => ({
  title: item.title,
  dateLabel: item.date,
  category: item.category ?? "",
  summary: richTextParagraph(item.summary),
  href: item.href,
  coverPath: item.image ?? siteConfig.heroImage,
  published: true,
  sortOrder: index,
}))

export const defaultFacilityItems = facilityItems.map((item, index) => ({
  name: item.name,
  description: richTextParagraph(item.description),
  imagePath: item.image,
  href: item.href,
  sortOrder: index,
}))

export const defaultTeacherItems = teacherItems.map((item, index) => ({
  name: item.name,
  role: item.role,
  imagePath: item.image,
  href: item.href,
  sortOrder: index,
}))

export const defaultGalleryItems = galleryItems.map((item, index) => ({
  imagePath: item.src,
  alt: item.alt,
  caption: richTextParagraph(item.alt),
  aspect: item.aspect,
  published: true,
  sortOrder: index,
}))

export const defaultProgramPendidikanItems = programPendidikanItems.map((item, index) => ({
  name: item.name,
  description: richTextParagraph(item.description),
  imagePath: item.image,
  points: item.points.map((point, pointIndex) => ({ body: richTextParagraph(point), sortOrder: pointIndex })),
  sortOrder: index,
}))

export const defaultStrukturPengurusItems = strukturPengurusItems.map((item, index) => ({
  jabatan: item.jabatan,
  nama: item.nama,
  sortOrder: index,
}))

export const defaultProfileSection = {
  pageTitle: "Profil Pesantren",
  pageDescription: richTextParagraph("Mengenal lebih dekat Pondok Pesantren Al-Abror Halmahera Timur."),
  historyTitle: "Sejarah Al-Abror",
  historyDescription: richTextParagraph(siteConfig.description),
  historyParagraphs: [
    "Pondok Pesantren Al-Abror terletak di Jl. Goloipopo, Desa Soagimalaha, RT. 003 RW. 001, Kec. Kota Maba, Kab. Halmahera Timur, Maluku Utara. Resmi didirikan pada tahun 2011.",
    "Pesantren Al-Abror berfokus pada pendidikan Formal dan Diniyah dengan mengintegrasikan kurikulum pesantren dan pendidikan formal.",
    "Dengan Nomor Statistik Pesantren (NSP) 510082060002 yang terbit pada tahun 2021, pesantren ini terus berkembang menjadi lembaga pendidikan Islam terpadu yang terpercaya di Halmahera Timur.",
  ].map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  vision: richTextParagraph("Mencetak Generasi Muslim/Muslimah yang bertauhid, berilmu, beradab, dan Islami berlandaskan Al-Qur'an dan As-Sunnah."),
  visionItems: visionItems.map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  missionItems: missionItems.map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  identityRows: [
    ["Nama Lembaga", siteConfig.name],
    ["Nomor Statistik Pesantren", `${siteConfig.nsp} (Terbit Tahun ${siteConfig.nspYear})`],
    ["Tahun Berdiri", siteConfig.foundedYear],
    ["Fokus Pendidikan", siteConfig.focusPendidikan],
    ["Alamat Lengkap", siteConfig.address],
    ["Email Resmi", siteConfig.email],
    ["Nomor HP / WhatsApp", siteConfig.phoneDisplay],
  ].map(([label, value], index) => ({ label, value, sortOrder: index })),
  orgRows: strukturPengurusItems.map((item, index) => ({
    role: item.jabatan,
    name: item.nama,
    sortOrder: index,
  })),
}

export const defaultContactSection = {
  pageTitle: "Hubungi Kami",
  pageDescription: richTextParagraph("Hubungi kami untuk informasi seputar Pondok Pesantren Al-Abror Halmahera Timur."),
  infoTitle: "Informasi Kontak",
  infoDescription: richTextParagraph("Kami siap melayani kebutuhan informasi seputar pesantren."),
  locationTitle: "Lokasi Pesantren",
  locationDescription: richTextParagraph("Kunjungi pesantren kami untuk informasi langsung."),
  methods: [
    {
      type: "address",
      title: "Alamat",
      subtitle: "Lokasi Pesantren",
      description: siteConfig.address,
      value: siteConfig.address,
      actionLabel: "Buka Peta",
      actionHref: siteConfig.mapHref,
      sortOrder: 0,
    },
    {
      type: "phone",
      title: "Telepon / WhatsApp",
      subtitle: "Hubungi Kami",
      description: siteConfig.phoneDisplay,
      value: siteConfig.phone,
      actionLabel: "Chat WhatsApp",
      actionHref: siteConfig.whatsapp,
      sortOrder: 1,
    },
    {
      type: "email",
      title: "Email",
      subtitle: "Kirim Email",
      description: siteConfig.email,
      value: siteConfig.email,
      actionLabel: "Kirim Email",
      actionHref: `mailto:${siteConfig.email}`,
      sortOrder: 2,
    },
  ],
  locations: [
    {
      title: "Pondok Pesantren Al-Abror",
      subtitle: "Kampus Utama",
      address: siteConfig.address,
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d106.7!3d-6.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjQnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1",
      mapHref: siteConfig.mapHref,
      sortOrder: 0,
    },
  ],
}

export const defaultFooterSection = {
  brandText: siteConfig.description,
  socialIntro: "Tetap terhubung bersama kami di media sosial resmi.",
  copyrightText: `© ${new Date().getFullYear()} Pondok Pesantren Al-Abror. Hak Cipta Dilindungi.`,
  quickLinks: [
    { label: "Beranda", href: "/", sortOrder: 0 },
    { label: "Profil", href: "/profil", sortOrder: 1 },
    { label: "Program Pendidikan", href: "/program-pendidikan", sortOrder: 2 },
    { label: "Info PSB", href: "/info-psb/mi", sortOrder: 3 },
    { label: "Artikel", href: "/artikel", sortOrder: 4 },
    { label: "Berita", href: "/berita", sortOrder: 5 },
    { label: "Galeri", href: "/galeri", sortOrder: 6 },
    { label: "Kontak", href: "/kontak", sortOrder: 7 },
  ],
  socialLinks: [
    { platform: "facebook", href: siteConfig.facebook, sortOrder: 0 },
    { platform: "whatsapp", href: siteConfig.whatsapp, sortOrder: 1 },
    { platform: "email", href: `mailto:${siteConfig.email}`, sortOrder: 2 },
  ],
}
