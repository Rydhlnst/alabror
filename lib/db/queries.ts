import { getPayloadClient } from "@/lib/payload"
import * as defaults from "@/lib/cms/default-content"
import { siteConfig as staticSiteConfig } from "@/lib/content"

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ""

function fallbackR2(path: string): string {
  if (R2_PUBLIC_URL && path.startsWith("/")) {
    const baseName = path.replace(/^\//, "").replace(/\.[^.]+$/, "")
    return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${baseName}.webp`
  }
  return path
}

function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== "object") return null
  const m = media as Record<string, unknown>
  if (typeof m.url === "string") return m.url
  return null
}

export async function getSiteSettings() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: "site-settings" })
    const logoUrl = getMediaUrl(settings.logo)
    return {
      id: "site",
      name: settings.name ?? staticSiteConfig.name,
      shortName: settings.shortName ?? staticSiteConfig.shortName,
      tagline: settings.tagline ?? staticSiteConfig.tagline,
      description: settings.description ?? staticSiteConfig.description,
      whatsapp: settings.whatsapp ?? staticSiteConfig.whatsapp,
      whatsappLabel: settings.whatsappLabel ?? staticSiteConfig.whatsappLabel,
      brochureHref: settings.brochureHref ?? staticSiteConfig.brochureHref,
      mapHref: settings.mapHref ?? staticSiteConfig.mapHref,
      logo: logoUrl || staticSiteConfig.logo,
      address: settings.address ?? staticSiteConfig.address,
      email: settings.email ?? staticSiteConfig.email,
      officeHours: settings.officeHours ?? staticSiteConfig.officeHours,
      phone: staticSiteConfig.phone,
      phoneDisplay: staticSiteConfig.phoneDisplay,
      nsp: staticSiteConfig.nsp,
      nspYear: staticSiteConfig.nspYear,
      foundedYear: staticSiteConfig.foundedYear,
      facebook: staticSiteConfig.facebook,
      focusPendidikan: staticSiteConfig.focusPendidikan,
      metadataTitle: settings.metadataTitle || `${staticSiteConfig.shortName} | ${staticSiteConfig.tagline}`,
      metadataDescription: settings.metadataDescription || staticSiteConfig.description,
      motto: staticSiteConfig.motto,
    }
  } catch {
    return {
      ...staticSiteConfig,
      description: defaults.defaultSiteSettings.description,
      metadataTitle: defaults.defaultSiteSettings.metadataTitle,
      metadataDescription: defaults.defaultSiteSettings.metadataDescription,
      phone: defaults.defaultSiteSettings.phone,
      phoneDisplay: defaults.defaultSiteSettings.phoneDisplay,
      nsp: defaults.defaultSiteSettings.nsp,
      nspYear: defaults.defaultSiteSettings.nspYear,
      foundedYear: defaults.defaultSiteSettings.foundedYear,
      facebook: defaults.defaultSiteSettings.facebook,
      focusPendidikan: defaults.defaultSiteSettings.focusPendidikan,
    }
  }
}

export async function getNavigation() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "navigation" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultNavigation
    return result.docs.map((item: any) => ({
      label: item.label,
      href: item.href,
      openInNewTab: item.openInNewTab,
      sortOrder: item.sortOrder,
      children: [] as { label: string; href: string; sortOrder: number; openInNewTab: boolean }[],
    }))
  } catch {
    return defaults.defaultNavigation
  }
}

export async function getHomepageSections() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: "homepage" })
    const heroImageUrl = getMediaUrl((settings as any).heroImage)
    const faqImageUrl = getMediaUrl((settings as any).faqImage)
    const statsResult = await payload.find({ collection: "hero-stats" as any, sort: "sortOrder", limit: 100 })
    const d = defaults.defaultHomepage
    return {
      id: "homepage",
      heroBadge: settings.heroBadge ?? d.heroBadge,
      heroTitle: settings.heroTitle ?? d.heroTitle,
      heroDescription: settings.heroDescription ?? d.heroDescription,
      heroImageUrl: heroImageUrl || d.heroImagePath,
      primaryCtaLabel: settings.primaryCtaLabel ?? d.primaryCtaLabel,
      primaryCtaHref: settings.primaryCtaHref ?? d.primaryCtaHref,
      secondaryCtaLabel: settings.secondaryCtaLabel ?? d.secondaryCtaLabel,
      secondaryCtaHref: settings.secondaryCtaHref ?? d.secondaryCtaHref,
      newsTitle: settings.newsTitle ?? d.newsTitle,
      newsDescription: settings.newsDescription ?? d.newsDescription,
      partnersTitle: settings.partnersTitle ?? d.partnersTitle,
      partnersDescription: settings.partnersDescription ?? d.partnersDescription,
      historyTitle: settings.historyTitle ?? d.historyTitle,
      historyDescription: settings.historyDescription ?? d.historyDescription,
      whyUsTitle: settings.whyUsTitle ?? d.whyUsTitle,
      whyUsDescription: settings.whyUsDescription ?? d.whyUsDescription,
      educationTitle: settings.educationTitle ?? d.educationTitle,
      educationDescription: settings.educationDescription ?? d.educationDescription,
      facilitiesTitle: settings.facilitiesTitle ?? d.facilitiesTitle,
      facilitiesDescription: settings.facilitiesDescription ?? d.facilitiesDescription,
      faqTitle: settings.faqTitle ?? d.faqTitle,
      faqDescription: settings.faqDescription ?? d.faqDescription,
      faqImageUrl: faqImageUrl || d.faqImagePath,
      testimonialsTitle: settings.testimonialsTitle ?? d.testimonialsTitle,
      testimonialsDescription: settings.testimonialsDescription ?? d.testimonialsDescription,
      bottomCtaTitle: settings.bottomCtaTitle ?? d.bottomCtaTitle,
      bottomCtaDescription: settings.bottomCtaDescription ?? d.bottomCtaDescription,
      bottomCtaLabel: settings.bottomCtaLabel ?? d.bottomCtaLabel,
      bottomCtaHref: settings.bottomCtaHref ?? d.bottomCtaHref,
      heroStats: statsResult.docs.length > 0
        ? statsResult.docs.map((s: any) => ({ value: s.value, label: s.label }))
        : defaults.defaultHomepage.heroStats,
    }
  } catch {
    return {
      ...defaults.defaultHomepage,
      heroImageUrl: defaults.defaultHomepage.heroImagePath,
      faqImageUrl: defaults.defaultHomepage.faqImagePath,
      heroStats: defaults.defaultHomepage.heroStats,
    }
  }
}

export async function getPsbConfig() {
  return defaults.defaultPsbConfig
}

export async function getNewsItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "news" as any, sort: "sortOrder", where: { published: { equals: true } }, limit: 100 })
    if (result.docs.length === 0) return defaults.defaultNewsItems.map((item) => ({ ...item, cover: item.coverPath }))
    return result.docs.map((item: any) => ({
      title: item.title,
      dateLabel: item.dateLabel,
      category: item.category || "",
      summary: item.summary,
      href: item.href,
      cover: getMediaUrl(item.cover) || fallbackR2("/foto1.jpg"),
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultNewsItems.map((item) => ({ ...item, cover: item.coverPath }))
  }
}

export async function getArticleItems() {
  return getNewsItems()
}

export async function getFacilityItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "facilities" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultFacilityItems
    return result.docs.map((item: any) => ({
      name: item.name,
      description: item.description,
      imagePath: getMediaUrl(item.image) || fallbackR2("/foto1.jpg"),
      href: "#",
      iconKey: item.iconKey,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultFacilityItems
  }
}

export async function getTeacherItems() {
  return defaults.defaultTeacherItems
}

export async function getGalleryItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "gallery" as any, sort: "sortOrder", where: { published: { equals: true } }, limit: 100 })
    if (result.docs.length === 0) return defaults.defaultGalleryItems.map((item) => ({ ...item, image: item.imagePath }))
    return result.docs.map((item: any) => ({
      image: getMediaUrl(item.image) || fallbackR2("/foto1.jpg"),
      alt: item.alt,
      caption: item.caption,
      aspect: item.aspect,
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultGalleryItems.map((item) => ({ ...item, image: item.imagePath }))
  }
}

export async function getProgramPendidikanItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "education-programs" as any, sort: "sortOrder", limit: 100, depth: 2 })
    if (result.docs.length === 0) return defaults.defaultProgramPendidikanItems
    return result.docs.map((program: any) => ({
      name: program.name,
      description: program.summary,
      imagePath: getMediaUrl(program.image) || fallbackR2("/foto1.jpg"),
      points: (program.points || []).map((p: any) => ({ body: p.body, sortOrder: p.sortOrder })),
      sortOrder: program.sortOrder,
    }))
  } catch {
    return defaults.defaultProgramPendidikanItems
  }
}

export async function getStrukturPengurusItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "profile-org" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultStrukturPengurusItems
    return result.docs.map((item: any) => ({
      jabatan: item.role,
      nama: item.name,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultStrukturPengurusItems
  }
}

export async function getProfileSection() {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({ slug: "profile-page" })
    const missionResult = await payload.find({ collection: "profile-mission" as any, sort: "sortOrder", limit: 100 })
    const identityResult = await payload.find({ collection: "profile-identity" as any, sort: "sortOrder", limit: 100 })
    const orgResult = await payload.find({ collection: "profile-org" as any, sort: "sortOrder", limit: 100 })
    const goalResult = await payload.find({ collection: "profile-goals" as any, sort: "sortOrder", limit: 100 })
    const programResult = await payload.find({ collection: "profile-programs" as any, sort: "sortOrder", limit: 100 })
    return {
      pageTitle: page.pageTitle ?? defaults.defaultProfileSection.pageTitle,
      pageDescription: page.pageDescription ?? defaults.defaultProfileSection.pageDescription,
      historyTitle: defaults.defaultProfileSection.historyTitle,
      historyDescription: defaults.defaultProfileSection.historyDescription,
      historyParagraphs: defaults.defaultProfileSection.historyParagraphs,
      vision: page.vision ?? defaults.defaultProfileSection.vision,
      visionItems: defaults.defaultProfileSection.visionItems,
      missionItems: missionResult.docs.length > 0
        ? missionResult.docs.map((m: any) => ({ body: m.body, sortOrder: m.sortOrder }))
        : defaults.defaultProfileSection.missionItems,
      identityRows: identityResult.docs.length > 0
        ? identityResult.docs.map((r: any) => ({ label: r.label, value: r.value, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.identityRows,
      orgRows: orgResult.docs.length > 0
        ? orgResult.docs.map((r: any) => ({ role: r.role, name: r.name, sortOrder: r.sortOrder }))
        : defaults.defaultProfileSection.orgRows,
      goalItems: goalResult.docs.length > 0
        ? goalResult.docs.map((g: any) => ({ body: g.body, sortOrder: g.sortOrder }))
        : defaults.defaultProfileSection.goalItems,
      programRows: programResult.docs.length > 0
        ? programResult.docs.map((p: any) => ({ name: p.name, iconKey: p.iconKey, sortOrder: p.sortOrder }))
        : defaults.defaultProfileSection.programRows,
    }
  } catch {
    return defaults.defaultProfileSection
  }
}

export async function getContactSection() {
  try {
    const payload = await getPayloadClient()
    const page = await payload.findGlobal({ slug: "contact-page" })
    const methodsResult = await payload.find({ collection: "contact-methods" as any, sort: "sortOrder", limit: 100 })
    const locationsResult = await payload.find({ collection: "contact-locations" as any, sort: "sortOrder", limit: 100 })
    const dc = defaults.defaultContactSection
    return {
      pageTitle: page.pageTitle ?? dc.pageTitle,
      pageDescription: page.pageDescription ?? dc.pageDescription,
      infoTitle: page.infoTitle ?? dc.infoTitle,
      infoDescription: page.infoDescription ?? dc.infoDescription,
      locationTitle: page.locationTitle ?? dc.locationTitle,
      locationDescription: page.locationDescription ?? dc.locationDescription,
      methods: methodsResult.docs.length > 0
        ? methodsResult.docs.map((m: any) => ({
            type: m.type, title: m.title, subtitle: m.subtitle, description: m.description,
            value: m.value, actionLabel: m.actionLabel, actionHref: m.actionHref, sortOrder: m.sortOrder,
          }))
        : defaults.defaultContactSection.methods,
      locations: locationsResult.docs.length > 0
        ? locationsResult.docs.map((l: any) => ({
            title: l.title, subtitle: l.subtitle, address: l.address,
            mapEmbedUrl: l.mapEmbedUrl, mapHref: l.mapHref, sortOrder: l.sortOrder,
          }))
        : defaults.defaultContactSection.locations,
    }
  } catch {
    return defaults.defaultContactSection
  }
}

export async function getFooterSection() {
  try {
    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({ slug: "footer-settings" })
    const quickLinksResult = await payload.find({ collection: "footer-quick-links" as any, sort: "sortOrder", limit: 100 })
    const socialLinksResult = await payload.find({ collection: "footer-social-links" as any, sort: "sortOrder", limit: 100 })
    return {
      brandText: settings.brandText || defaults.defaultFooterSection.brandText,
      socialIntro: settings.socialIntro || defaults.defaultFooterSection.socialIntro,
      copyrightText: settings.copyrightText || defaults.defaultFooterSection.copyrightText,
      quickLinks: quickLinksResult.docs.length > 0
        ? quickLinksResult.docs.map((l: any) => ({ label: l.label, href: l.href, sortOrder: l.sortOrder }))
        : defaults.defaultFooterSection.quickLinks,
      socialLinks: socialLinksResult.docs.length > 0
        ? socialLinksResult.docs.map((l: any) => ({ platform: l.platform, href: l.href, sortOrder: l.sortOrder }))
        : defaults.defaultFooterSection.socialLinks,
    }
  } catch {
    return defaults.defaultFooterSection
  }
}

export async function getWhyUsItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "why-us" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultWhyUsItems
    return result.docs.map((item: any) => ({
      title: item.title,
      description: item.description,
      iconKey: item.iconKey,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultWhyUsItems
  }
}

export async function getPartnerItems() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "partners" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultPartnerItems.map((item) => ({ ...item, logo: staticSiteConfig.heroImage }))
    return result.docs.map((item: any) => ({
      name: item.name,
      note: item.note,
      logo: getMediaUrl(item.logo) || staticSiteConfig.heroImage,
      href: item.href,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultPartnerItems.map((item) => ({ ...item, logo: staticSiteConfig.heroImage }))
  }
}

export async function getHistoryTimeline() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "history-timeline" as any, sort: "sortOrder", limit: 100 })
    if (result.docs.length === 0) return defaults.defaultHistoryTimeline
    return result.docs.map((item: any) => ({
      year: item.year,
      title: item.title,
      description: item.description,
      color: item.color,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultHistoryTimeline
  }
}

export async function getEditorialItems() { return [] }
export async function getAnnouncementItems() { return [] }
export async function getBlogItems() { return [] }
export async function getActivityItems() { return [] }
export async function getQuoteItems() { return [] }
export async function getAgendaItems() { return [] }
export async function getPancaJiwaItems() { return [] }

export async function getEducationSection() {
  try {
    const payload = await getPayloadClient()
    const highlightsResult = await payload.find({ collection: "education-highlights" as any, sort: "sortOrder", limit: 100 })
    const programsResult = await payload.find({ collection: "education-programs" as any, sort: "sortOrder", limit: 100, depth: 2 })
    return {
      pageTitle: defaults.defaultEducationSection.pageTitle,
      pageDescription: defaults.defaultEducationSection.pageDescription,
      highlights: highlightsResult.docs.length > 0
        ? highlightsResult.docs.map((h: any) => ({ body: h.body, sortOrder: h.sortOrder }))
        : defaults.defaultEducationSection.highlights,
      programs: programsResult.docs.length > 0
        ? programsResult.docs.map((p: any) => ({
            name: p.name, summary: p.summary, focus: p.focus,
            imagePath: getMediaUrl(p.image) || fallbackR2("/foto1.jpg"),
            iconKey: p.iconKey, homePrimaryLabel: p.homePrimaryLabel, homePrimaryHref: p.homePrimaryHref,
            homeSecondaryLabel: p.homeSecondaryLabel, homeSecondaryHref: p.homeSecondaryHref,
            sortOrder: p.sortOrder, points: (p.points || []).map((pt: any) => ({ body: pt.body, sortOrder: pt.sortOrder })),
          }))
        : defaults.defaultEducationSection.programs,
    }
  } catch {
    return defaults.defaultEducationSection
  }
}

export async function getFacilitiesSection() {
  const items = await getFacilityItems()
  try {
    const payload = await getPayloadClient()
    const highlightsResult = await payload.find({ collection: "facility-highlights" as any, sort: "sortOrder", limit: 100 })
    return {
      pageTitle: defaults.defaultFacilitiesSection?.pageTitle || "Fasilitas",
      pageDescription: defaults.defaultFacilitiesSection?.pageDescription || "",
      highlights: highlightsResult.docs.length > 0
        ? highlightsResult.docs.map((h: any) => ({ body: h.body, sortOrder: h.sortOrder }))
        : defaults.defaultFacilitiesSection?.highlights || [],
      items,
    }
  } catch {
    return {
      pageTitle: defaults.defaultFacilitiesSection?.pageTitle || "Fasilitas",
      pageDescription: defaults.defaultFacilitiesSection?.pageDescription || "",
      highlights: defaults.defaultFacilitiesSection?.highlights || [],
      items,
    }
  }
}

export async function getGallerySection() {
  const items = await getGalleryItems()
  return items.map((item) => ({ ...item, image: (item as any).image }))
}

export async function getFaqSection() {
  try {
    const payload = await getPayloadClient()
    const categoriesResult = await payload.find({ collection: "faq-categories" as any, sort: "sortOrder", limit: 100 })
    if (categoriesResult.docs.length === 0) return defaults.defaultFaqSection.categories
    const categories = []
    for (const cat of categoriesResult.docs) {
      const itemsResult = await payload.find({
        collection: "faq-items" as any, sort: "sortOrder", limit: 100,
        where: { category: { equals: (cat as any).id } },
      })
      categories.push({
        name: (cat as any).name,
        iconKey: (cat as any).iconKey,
        sortOrder: (cat as any).sortOrder,
        items: itemsResult.docs.map((item: any) => ({
          question: item.question,
          answer: item.answer,
          sortOrder: item.sortOrder,
        })),
      })
    }
    return categories
  } catch {
    return defaults.defaultFaqSection.categories
  }
}

export async function getTestimonials() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: "testimonials" as any, sort: "sortOrder", where: { published: { equals: true } }, limit: 100 })
    if (result.docs.length === 0) return defaults.defaultTestimonialsSection.items.map((item) => ({ ...item, avatar: item.avatarPath }))
    return result.docs.map((item: any) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      avatar: getMediaUrl(item.avatar) || "",
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultTestimonialsSection.items.map((item) => ({ ...item, avatar: item.avatarPath }))
  }
}
