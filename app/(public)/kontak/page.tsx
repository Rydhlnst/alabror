import Link from "next/link"
import {
  FaLocationDot,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
} from "react-icons/fa6"

import { KirimEmailForm } from "@/components/kirim-email-form"
import { getContactSection, getFooterSection, getSiteSettings } from "@/lib/db/queries"
import { ScrollAnimation } from "@/components/uilayouts/scroll-animation"

export default async function KontakPage() {
  const contact = await getContactSection()
  const footer = await getFooterSection()
  const siteConfig = await getSiteSettings()

  const alamatMethod = contact.methods.find((m) => m.type.toLowerCase() === "address")
  const addressVal = alamatMethod?.value || siteConfig.address

  const waMethod = contact.methods.find((m) => m.type.toLowerCase() === "phone")
  const waVal = waMethod?.value || siteConfig.phone

  const emailMethod = contact.methods.find((m) => m.type.toLowerCase() === "email")
  const emailVal = emailMethod?.value || siteConfig.email

  const loc = contact.locations[0]
  const mapEmbedUrl = loc?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d106.7!3d-6.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjQnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sid!2sid!4v1"

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="size-4" />
      case "whatsapp":
        return <FaWhatsapp className="size-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div className="site-shell space-y-4 relative z-10">
          <div className="space-y-2">
            <ScrollAnimation direction="down">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white font-heading">
                {contact.pageTitle}
              </h1>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="site-section py-16 sm:py-24">
        <div className="site-shell grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-heading">
                {siteConfig.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4">
              <div className="flex gap-4">
                <FaLocationDot className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm">Alamat:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addressVal}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaWhatsapp className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="size-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">{emailVal}</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-8" />

            <div className="flex items-center gap-4">
              <span className="font-bold text-sm text-foreground">Sosial Media:</span>
              <div className="flex items-center gap-2">
                {footer.socialLinks.map((link, index) => {
                  const icon = getSocialIcon(link.platform)
                  if (!icon) return null
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-9 border border-gray-200 text-foreground hover:text-primary hover:border-primary flex items-center justify-center transition-colors rounded-none bg-white"
                      aria-label={link.platform}
                    >
                      {icon}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="relative w-full h-[280px] overflow-hidden border border-gray-100 shadow-inner">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Pesantren"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <KirimEmailForm targetEmail={emailVal} />
          </div>
        </div>
      </section>
    </div>
  )
}
