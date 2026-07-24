import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaWhatsapp, FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import { getSiteSettings, getFooterSection } from "@/lib/db/queries";
import { richTextToPlainText } from "@/lib/cms/rich-text";

export async function SiteFooter() {
  const siteConfig = await getSiteSettings();
  const footerSection = await getFooterSection();

  const plainBrandText = typeof footerSection.brandText === "string"
    ? footerSection.brandText
    : richTextToPlainText(footerSection.brandText);

  const plainSocialIntro = typeof footerSection.socialIntro === "string"
    ? footerSection.socialIntro
    : richTextToPlainText(footerSection.socialIntro);

  const rawWa = siteConfig.whatsapp || "";
  const waHref = rawWa.startsWith("http")
    ? rawWa
    : (() => {
        const cleaned = rawWa.replace(/\D/g, "");
        return cleaned.startsWith("62")
          ? `https://wa.me/${cleaned}`
          : cleaned.startsWith("0")
          ? `https://wa.me/62${cleaned.substring(1)}`
          : `https://wa.me/${cleaned}`;
      })();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="size-4" />;
      case "whatsapp":
        return <FaWhatsapp className="size-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="site-shell grid gap-10 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.shortName}
                width={56}
                height={56}
                className="size-12 object-contain bg-white rounded p-1 brightness-110 contrast-105"
              />
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{siteConfig.shortName}</h3>
                <p className="text-xs text-gray-400">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pt-2">
              {plainBrandText}
            </p>
          </div>

          {/* Column 2: Tautan Cepat */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Tautan Cepat
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm text-gray-400">
              {footerSection.quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Hubungi Kami */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Hubungi Kami
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <FaLocationDot className="size-4 text-gray-500 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="size-4 text-gray-500 shrink-0" />
                <span>{siteConfig.phoneDisplay || siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="size-4 text-gray-500 shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Sosial Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Sosial Media
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {plainSocialIntro}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {footerSection.socialLinks.map((link, index) => {
                const icon = getSocialIcon(link.platform);
                if (!icon) return null;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-primary hover:text-white"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
          {footerSection.copyrightText}
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Hubungi kami di WhatsApp"
      >
        <FaWhatsapp className="size-7" />
      </a>
    </>
  );
}
