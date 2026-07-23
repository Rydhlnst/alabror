import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaBookOpenReader,
  FaBookQuran,
  FaBuildingColumns,
  FaClipboardList,
  FaFutbol,
  FaGraduationCap,
  FaHandsPraying,
  FaLanguage,
  FaMoneyBillWave,
  FaShieldHeart,
  FaStar,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa6";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  href: string;
  image?: string;
  category?: string;
};

export type ArticleItem = {
  title: string;
  date: string;
  summary: string;
  href: string;
  image?: string;
  category?: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  aspect: string;
};

export type TeacherItem = {
  name: string;
  role: string;
  image: string;
  href: string;
};

export type Facility = {
  name: string;
  description: string;
  image: string;
  href: string;
};

export const siteConfig = {
  name: "Pondok Pesantren Al-Abror",
  shortName: "Al-Abror",
  location: "Desa Soagimalaha, Kec. Kota Maba, Kab. Halmahera Timur, Maluku Utara",
  tagline: "Mencetak Generasi Muslim yang Bertauhid, Berilmu, Beradab, dan Islami",
  description:
    "Pondok Pesantren Al-Abror adalah lembaga pendidikan Islam terpadu yang menggabungkan kurikulum pesantren dan pendidikan formal, berlokasi di Desa Soagimalaha, Kec. Kota Maba, Kab. Halmahera Timur, Maluku Utara. Berdiri sejak tahun 2011, berfokus pada pendidikan Formal dan Diniyah.",
  whatsapp: "https://wa.me/6285290872062",
  whatsappLabel: "Hubungi Kami",
  brochureHref: "#",
  mapHref: "https://www.google.com/maps/place/Pondok+Pesantren+Al-Abror+Yayasan+Hidayatullah+Halmahera+Timur/",
  logo: "/logo.png",
  heroImage: "/foto1.jpg",
  address: "Jl. Goloipopo, Desa Soagimalaha, RT. 003 RW. 001, Kec. Kota Maba, Kab. Halmahera Timur, Maluku Utara",
  email: "pp.alabror.ht@gmail.com",
  phone: "085290872062",
  phoneDisplay: "0852-9087-2062",
  officeHours: "Senin - Sabtu : 08.00 - 17.00",
  nsp: "510082060002",
  nspYear: "2021",
  foundedYear: "2011",
  motto: "Mencetak Generasi Muslim/Muslimah yang bertauhid, berilmu, beradab, dan Islami berlandaskan Al-Qur'an dan As-Sunnah.",
  facebook: "https://facebook.com/Pesantren Al-Abror Halmahera Timur",
  focusPendidikan: "Formal dan Diniyah",
};

export const mainNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Struktur Pengurus", href: "/struktur-pengurus" },
  { label: "Program Pendidikan", href: "/program-pendidikan" },
  {
    label: "Info PSB",
    href: "#",
    children: [
      { label: "MI", href: "/info-psb/mi" },
      { label: "SMP", href: "/info-psb/smp" },
    ],
  },
  { label: "Artikel", href: "/artikel" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export const newsItems: NewsItem[] = [
  {
    title: "Penerimaan Santri Baru Tahun Ajaran 2026/2027",
    date: "Januari 2026",
    summary: "Pondok Pesantren Al-Abror membuka pendaftaran santri baru untuk jenjang MI dan SMP tahun ajaran 2026/2027.",
    href: "#",
    image: "/foto1.jpg",
    category: "PSB",
  },
  {
    title: "Kegiatan Peringatan Maulid Nabi Muhammad SAW 1447 H",
    date: "Rabiul Awal 1447 H",
    summary: "Santri dan pengurus Pondok Pesantren Al-Abror mengadakan peringatan Maulid Nabi Muhammad SAW dengan penuh khidmat.",
    href: "#",
    image: "/foto2.jpg",
    category: "Kegiatan",
  },
  {
    title: "Wisuda Tahfidz Al-Qur'an Angkatan Ke-5",
    date: "Desember 2025",
    summary: "Pondok Pesantren Al-Abror menyelenggarakan wisuda tahfidz Al-Qur'an untuk angkatan ke-5 dengan penuh suka cita.",
    href: "#",
    image: "/foto1.jpg",
    category: "Akademik",
  },
  {
    title: "Santri Al-Abror Juara Lomba Tahfidz Tingkat Kabupaten",
    date: "November 2025",
    summary: "Santri Pondok Pesantren Al-Abror meraih juara dalam lomba tahfidz Al-Qur'an tingkat kabupaten Halmahera Timur.",
    href: "#",
    image: "/foto2.jpg",
    category: "Prestasi",
  },
  {
    title: "Kegiatan Bakti Sosial di Desa Soagimalaha",
    date: "Oktober 2025",
    summary: "Santri dan pengurus Pondok Pesantren Al-Abror mengadakan kegiatan bakti sosial di Desa Soagimalaha.",
    href: "#",
    image: "/foto1.jpg",
    category: "Kegiatan",
  },
  {
    title: "Peringatan Hari Santri Nasional 2025",
    date: "Oktober 2025",
    summary: "Pondok Pesantren Al-Abror memperingati Hari Santri Nasional dengan berbagai kegiatan positif.",
    href: "#",
    image: "/foto2.jpg",
    category: "Kegiatan",
  },
];

export const articleItems: ArticleItem[] = [
  {
    title: "Keutamaan Mempelajari Al-Qur'an di Usia Muda",
    date: "Januari 2026",
    summary: "Al-Qur'an adalah pedoman hidup umat Islam. Mempelajarinya sejak usia muda akan memberikan keberkahan yang luar biasa.",
    href: "#",
    image: "/foto1.jpg",
    category: "Artikel",
  },
  {
    title: "Pentingnya Adab dalam Pendidikan Islam",
    date: "Desember 2025",
    summary: "Adab adalah pondasi utama dalam pendidikan Islam. Seorang santri diajarkan untuk mengutamakan adab sebelum ilmu.",
    href: "#",
    image: "/foto2.jpg",
    category: "Artikel",
  },
  {
    title: "Peran Pesantren dalam Membentuk Karakter Generasi Muda",
    date: "November 2025",
    summary: "Pesantren memiliki peran penting dalam membentuk karakter generasi muda yang beriman dan bertakwa.",
    href: "#",
    image: "/foto1.jpg",
    category: "Artikel",
  },
];

export const facilityItems: Facility[] = [
  {
    name: "Asrama Santri",
    description: "Fasilitas asrama yang nyaman untuk santri putra dan putri.",
    image: "/foto1.jpg",
    href: "#",
  },
  {
    name: "Ruang Kelas",
    description: "Ruang kelas yang representatif untuk kegiatan belajar mengajar.",
    image: "/foto2.jpg",
    href: "#",
  },
  {
    name: "Masjid",
    description: "Masjid pusat kegiatan ibadah dan kegiatan keagamaan santri.",
    image: "/foto1.jpg",
    href: "#",
  },
  {
    name: "Perpustakaan",
    description: "Perpustakaan dengan koleksi buku-buku penunjang pendidikan.",
    image: "/foto2.jpg",
    href: "#",
  },
];

export const galleryItems: GalleryItem[] = [
  { src: "/foto1.jpg", alt: "Kegiatan Belajar Mengajar", aspect: "4/3" },
  { src: "/foto2.jpg", alt: "Santri Al-Abror", aspect: "3/4" },
  { src: "/foto1.jpg", alt: "Kegiatan Tahfidz Al-Qur'an", aspect: "16/9" },
  { src: "/foto2.jpg", alt: "Wisuda Tahfidz", aspect: "4/3" },
  { src: "/foto1.jpg", alt: "Fasilitas Pesantren", aspect: "16/9" },
  { src: "/foto2.jpg", alt: "Kegiatan Ekstrakurikuler", aspect: "3/4" },
  { src: "/foto1.jpg", alt: "Olahraga Santri", aspect: "4/3" },
  { src: "/foto2.jpg", alt: "Profil Pesantren Al-Abror", aspect: "4/3" },
  { src: "/foto1.jpg", alt: "Lingkungan Pesantren", aspect: "16/9" },
];

export const teacherItems: TeacherItem[] = [
  {
    name: "Ust. Ahmad",
    role: "Pimpinan Pesantren",
    image: "/foto1.jpg",
    href: "#",
  },
  {
    name: "Ust. Muhammad",
    role: "Wakil Pimpinan",
    image: "/foto2.jpg",
    href: "#",
  },
  {
    name: "Ustzh. Fatimah",
    role: "Kepala Madrasah",
    image: "/foto1.jpg",
    href: "#",
  },
  {
    name: "Ust. Abdullah",
    role: "Kepala Asrama",
    image: "/foto2.jpg",
    href: "#",
  },
];

export const visionItems = [
  "Mencetak Generasi Muslim/Muslimah yang bertauhid",
  "Berilmu dan beradab",
  "Islami berlandaskan Al-Qur'an dan As-Sunnah",
];

export const missionItems = [
  "Menyelenggarakan pendidikan terpadu antara kurikulum pesantren dan pendidikan formal.",
  "Menanamkan nilai-nilai tauhid, aqidah, dan akhlak karimah dalam kehidupan sehari-hari.",
  "Membekali santri dengan keterampilan Bahasa Arab, hafalan Al-Qur'an, dan Al-Hadits.",
  "Mewujudkan generasi cinta Al-Qur'an melalui program membaca, menghafal, dan memahami kandungan Al-Qur'an.",
];

export const programPendidikanItems = [
  {
    name: "Madrasah Ibtidaiyah (MI)",
    description: "Pendidikan formal jenjang dasar (setara SD) dengan kurikulum terpadu yang mengintegrasikan pendidikan umum dan pendidikan agama Islam.",
    points: [
      "Kurikulum Kemenag RI",
      "Pendidikan Al-Qur'an & Tahfidz",
      "Bahasa Arab & Inggris",
      "Pendidikan Akhlak & Adab",
    ],
    image: "/foto1.jpg",
  },
  {
    name: "SMP",
    description: "Pendidikan formal jenjang menengah pertama dengan kurikulum terpadu yang memadukan pendidikan umum dan pendidikan kepesantrenan.",
    points: [
      "Kurikulum Nasional + Diniyah",
      "Program Tahfidz Al-Qur'an",
      "Kajian Kitab Kuning",
      "Pembinaan Karakter Islami",
    ],
    image: "/foto2.jpg",
  },
];

export const strukturPengurusItems = [
  { jabatan: "Pimpinan Pesantren", nama: "Ust. Ahmad" },
  { jabatan: "Wakil Pimpinan", nama: "Ust. Muhammad" },
  { jabatan: "Kepala Madrasah Ibtidaiyah", nama: "Ustzh. Fatimah" },
  { jabatan: "Kepala SMP", nama: "Ust. Ibrahim" },
  { jabatan: "Kepala Asrama", nama: "Ust. Abdullah" },
  { jabatan: "Bendahara", nama: "Ustzh. Khadijah" },
  { jabatan: "Sekretaris", nama: "Ust. Umar" },
];
