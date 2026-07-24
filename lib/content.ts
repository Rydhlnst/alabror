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

export const psbConfig = {
  isOpen: true,
  tahunAjaran: "2026/2027",
  infoLink: "/info-psb/mi",
  daftarLink: "/register",
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

export const newsItems: NewsItem[] = [];

export const articleItems: ArticleItem[] = [];

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

export const teacherItems: TeacherItem[] = [];

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

export const strukturPengurusItems: { jabatan: string; nama: string }[] = [];
