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
  psbConfig,
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
  // Legacy fields for schema compatibility
  partnersTitle: "Program Unggulan",
  partnersDescription: richTextParagraph("Program pendidikan unggulan Pondok Pesantren Al-Abror"),
  historyTitle: "Sejarah Pesantren",
  historyDescription: richTextParagraph("Sejarah berdirinya Pondok Pesantren Al-Abror Halmahera Timur"),
  whyUsTitle: "Mengapa Al-Abror?",
  whyUsDescription: richTextParagraph("Alasan memilih Pondok Pesantren Al-Abror"),
  educationTitle: "Program Pendidikan",
  educationDescription: richTextParagraph("Program pendidikan terpadu antara kurikulum pesantren dan pendidikan formal"),
  faqTitle: "Pertanyaan Umum",
  faqDescription: richTextParagraph("Informasi yang mungkin Anda butuhkan"),
  faqImagePath: "/foto1.jpg",
  testimonialsTitle: "Testimoni",
  testimonialsDescription: richTextParagraph("Testimoni dari wali santri dan alumni"),
  bottomCtaTitle: "Pendaftaran Santri Baru",
  bottomCtaDescription: richTextParagraph("Hubungi kami untuk informasi pendaftaran santri baru"),
  bottomCtaLabel: "Hubungi via WhatsApp",
  bottomCtaHref: siteConfig.whatsapp,
  heroStats: [
    { value: "2011", label: "Tahun Berdiri" },
    { value: "Formal", label: "dan Diniyah" },
    { value: "MI & SMP", label: "Jenjang Pendidikan" },
  ],
}

export const defaultPsbConfig = psbConfig

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
  iconKey: ["building-2", "book-open", "landmark", "book-text"][index] ?? "sparkles",
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

export const defaultPartnerItems = [
  { name: "Pendidikan Formal", note: "MI & SMP", sortOrder: 0 },
  { name: "Pendidikan Diniyah", note: "Kurikulum Pesantren", sortOrder: 1 },
  { name: "Tahfidz Al-Qur'an", note: "Program Unggulan", sortOrder: 2 },
  { name: "Bahasa Arab", note: "Keterampilan Bahasa", sortOrder: 3 },
]

export const defaultWhyUsItems = [
  { title: "Pendidikan Terpadu", description: richTextParagraph("Mengintegrasikan kurikulum pesantren dan pendidikan formal"), iconKey: "book-open", sortOrder: 0 },
  { title: "Tahfidz Al-Qur'an", description: richTextParagraph("Program hafalan Al-Qur'an yang terstruktur"), iconKey: "book-quran", sortOrder: 1 },
  { title: "Bahasa Arab", description: richTextParagraph("Pembekalian keterampilan bahasa Arab"), iconKey: "language", sortOrder: 2 },
  { title: "Akhlak Karimah", description: richTextParagraph("Penanaman nilai-nilai akhlak mulia"), iconKey: "shield-heart", sortOrder: 3 },
]

export const defaultEducationSection = {
  pageTitle: "Program Pendidikan",
  pageDescription: richTextParagraph("Program pendidikan terpadu antara kurikulum pesantren dan pendidikan formal"),
  highlights: [
    { body: richTextParagraph("Kurikulum Kemenag RI"), sortOrder: 0 },
    { body: richTextParagraph("Pendidikan Al-Qur'an & Tahfidz"), sortOrder: 1 },
    { body: richTextParagraph("Bahasa Arab & Inggris"), sortOrder: 2 },
  ],
  programs: defaultProgramPendidikanItems.map((item, index) => ({
    name: item.name,
    summary: item.description,
    focus: richTextParagraph("Fokus pada pembentukan karakter dan hafalan Al-Qur'an"),
    imagePath: item.imagePath,
    iconKey: "school",
    homePrimaryLabel: "Lihat Detail",
    homePrimaryHref: "/program-pendidikan",
    homeSecondaryLabel: "",
    homeSecondaryHref: "",
    sortOrder: index,
    points: item.points,
  })),
}

export const defaultHistoryTimeline = [
  { year: "2011", title: "Pendirian Pesantren", description: richTextParagraph("Pondok Pesantren Al-Abror resmi didirikan"), color: "bg-primary", sortOrder: 0 },
  { year: "2021", title: "NSP Terbit", description: richTextParagraph("Nomor Statistik Pesantren terbit"), color: "bg-accent-green", sortOrder: 1 },
  { year: "Sekarang", title: "Pengembangan", description: richTextParagraph("Terus berkembang menjadi lembaga pendidikan terpercaya"), color: "bg-emerald-600", sortOrder: 2 },
]

export const defaultTestimonialsSection = {
  items: [
    { name: "Wali Santri", role: "Orang Tua Santri", quote: richTextParagraph("Alhamdulillah, anak saya mengalami perkembangan yang sangat baik di Pesantren Al-Abror"), avatarPath: "", published: true, sortOrder: 0 },
  ],
}

export const defaultFaqSection = {
  pageTitle: "Pertanyaan Umum",
  pageDescription: richTextParagraph("Informasi yang mungkin Anda butuhkan"),
  categories: [
    {
      name: "Pendaftaran",
      iconKey: "clipboard-list",
      sortOrder: 0,
      items: [
        { question: "Bagaimana cara mendaftar?", answer: richTextParagraph("Hubungi kami via WhatsApp atau datang langsung ke pesantren"), sortOrder: 0 },
        { question: "Kapan pendaftaran dibuka?", answer: richTextParagraph("Pendaftaran dibuka setiap tahun ajaran baru"), sortOrder: 1 },
      ],
    },
  ],
}

export const defaultGallerySection = {
  pageTitle: "Galeri Kegiatan",
  pageDescription: richTextParagraph("Dokumentasi kegiatan Pondok Pesantren Al-Abror"),
  items: defaultGalleryItems,
}

export const defaultFacilitiesSection = {
  pageTitle: "Fasilitas",
  pageDescription: richTextParagraph("Fasilitas yang tersedia di Pondok Pesantren Al-Abror"),
  highlights: [
    { body: richTextParagraph("Fasilitas lengkap dan representatif"), sortOrder: 0 },
    { body: richTextParagraph("Lingkungan pesantren yang nyaman"), sortOrder: 1 },
    { body: richTextParagraph("Sarana pendukung pendidikan yang memadai"), sortOrder: 2 },
  ],
  items: defaultFacilityItems,
}

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
  goalItems: [
    "Mencetak generasi Muslim yang bertauhid dan berilmu.",
    "Membentuk santri yang beradab dan Islami.",
    "Membekali santri dengan keterampilan Bahasa Arab dan hafalan Al-Qur'an.",
    "Mewujudkan generasi cinta Al-Qur'an.",
  ].map((body, index) => ({ body: richTextParagraph(body), sortOrder: index })),
  programRows: [
    ["Pendidikan Formal", "school"],
    ["Pendidikan Diniyah", "book-open"],
    ["Tahfidz Al-Qur'an", "book-quran"],
    ["Bahasa Arab", "language"],
  ].map(([name, iconKey], index) => ({ name, iconKey, sortOrder: index })),
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
