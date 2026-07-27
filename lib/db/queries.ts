import { eq, asc } from "drizzle-orm"
import { getDb } from "./index"

type DbClient = NonNullable<ReturnType<typeof getDb>>
import * as schema from "./schema"
import * as defaults from "../cms/default-content"
import { siteConfig as staticSiteConfig } from "../content"

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ""

const staticSiteSettings = {
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

async function resolveMediaUrl(db: DbClient, mediaId: string | null | undefined): Promise<string | null> {
  if (!mediaId) return null
  const [media] = await db.select().from(schema.mediaAssets).where(eq(schema.mediaAssets.id, mediaId)).limit(1)
  return media?.url ?? null
}

function fallbackR2(path: string): string {
  if (R2_PUBLIC_URL && path.startsWith("/")) {
    const baseName = path.replace(/^\//, "").replace(/\.[^.]+$/, "")
    return `${R2_PUBLIC_URL.replace(/\/$/, "")}/${baseName}.webp`
  }
  return path
}

export async function getSiteSettings() {
  const db = getDb()
  if (!db) return staticSiteSettings

  try {
    const [settings] = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.id, "site")).limit(1)
    if (!settings) return staticSiteSettings

    const logoUrl = await resolveMediaUrl(db, settings.logoMediaId)

    return {
      id: settings.id,
      name: settings.name,
      shortName: settings.shortName,
      tagline: settings.tagline,
      description: settings.description,
      whatsapp: settings.whatsapp,
      whatsappLabel: settings.whatsappLabel,
      brochureHref: settings.brochureHref,
      mapHref: settings.mapHref,
      logo: logoUrl || staticSiteSettings.logo,
      address: settings.address,
      email: settings.email,
      officeHours: settings.officeHours,
      phone: staticSiteSettings.phone,
      phoneDisplay: staticSiteSettings.phoneDisplay,
      nsp: staticSiteSettings.nsp,
      nspYear: staticSiteSettings.nspYear,
      foundedYear: staticSiteSettings.foundedYear,
      facebook: staticSiteSettings.facebook,
      focusPendidikan: staticSiteSettings.focusPendidikan,
      metadataTitle: settings.metadataTitle || staticSiteSettings.metadataTitle,
      metadataDescription: settings.metadataDescription || staticSiteSettings.metadataDescription,
      motto: staticSiteSettings.motto,
    }
  } catch {
    return staticSiteSettings
  }
}

export async function getNavigation() {
  const db = getDb()
  if (!db) return defaults.defaultNavigation

  try {
    const items = await db.select().from(schema.navigationItems).orderBy(asc(schema.navigationItems.sortOrder))
    if (items.length === 0) return defaults.defaultNavigation

    return items.map(item => ({
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
  const db = getDb()
  if (!db) {
    return {
      ...defaults.defaultHomepage,
      heroImageUrl: defaults.defaultHomepage.heroImagePath,
      faqImageUrl: defaults.defaultHomepage.faqImagePath,
      heroStats: defaults.defaultHomepage.heroStats,
    }
  }

  try {
    const [settings] = await db.select().from(schema.homepageSections).where(eq(schema.homepageSections.id, "homepage")).limit(1)
    if (!settings) {
      return {
        ...defaults.defaultHomepage,
        heroImageUrl: defaults.defaultHomepage.heroImagePath,
        faqImageUrl: defaults.defaultHomepage.faqImagePath,
        heroStats: defaults.defaultHomepage.heroStats,
      }
    }

    const heroImageUrl = await resolveMediaUrl(db, settings.heroImageMediaId)
    const faqImageUrl = await resolveMediaUrl(db, settings.faqImageMediaId)

    const stats = await db.select().from(schema.heroStats).orderBy(asc(schema.heroStats.sortOrder))

    return {
      id: settings.id,
      heroBadge: settings.heroBadge,
      heroTitle: settings.heroTitle,
      heroDescription: settings.heroDescription,
      heroImageUrl: heroImageUrl || defaults.defaultHomepage.heroImagePath,
      primaryCtaLabel: settings.primaryCtaLabel,
      primaryCtaHref: settings.primaryCtaHref,
      secondaryCtaLabel: settings.secondaryCtaLabel,
      secondaryCtaHref: settings.secondaryCtaHref,
      newsTitle: settings.newsTitle,
      newsDescription: settings.newsDescription,
      articleTitle: settings.partnersTitle,
      articleDescription: settings.partnersDescription,
      facilitiesTitle: settings.facilitiesTitle,
      facilitiesDescription: settings.facilitiesDescription,
      programTitle: settings.educationTitle,
      programDescription: settings.educationDescription,
      galleryTitle: settings.testimonialsTitle,
      galleryDescription: settings.testimonialsDescription,
      teachersTitle: settings.whyUsTitle,
      teachersDescription: settings.whyUsDescription,
      ctaTitle: settings.bottomCtaTitle,
      ctaDescription: settings.bottomCtaDescription,
      ctaLabel: settings.bottomCtaLabel,
      ctaHref: settings.bottomCtaHref,
      partnersTitle: settings.partnersTitle,
      partnersDescription: settings.partnersDescription,
      historyTitle: settings.historyTitle,
      historyDescription: settings.historyDescription,
      whyUsTitle: settings.whyUsTitle,
      whyUsDescription: settings.whyUsDescription,
      educationTitle: settings.educationTitle,
      educationDescription: settings.educationDescription,
      faqTitle: settings.faqTitle,
      faqDescription: settings.faqDescription,
      faqImageUrl: faqImageUrl || defaults.defaultHomepage.faqImagePath,
      testimonialsTitle: settings.testimonialsTitle,
      testimonialsDescription: settings.testimonialsDescription,
      bottomCtaTitle: settings.bottomCtaTitle,
      bottomCtaDescription: settings.bottomCtaDescription,
      bottomCtaLabel: settings.bottomCtaLabel,
      bottomCtaHref: settings.bottomCtaHref,
      heroStats: stats.length > 0 ? stats.map(s => ({ value: s.value, label: s.label })) : defaults.defaultHomepage.heroStats,
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
  const db = getDb()
  if (!db) return defaults.defaultNewsItems.map(item => ({ ...item, cover: item.coverPath }))

  try {
    const items = await db.select().from(schema.newsItems).where(eq(schema.newsItems.published, true)).orderBy(asc(schema.newsItems.sortOrder))
    if (items.length === 0) return defaults.defaultNewsItems.map(item => ({ ...item, cover: item.coverPath }))

    return Promise.all(items.map(async item => {
      const cover = await resolveMediaUrl(db, item.coverMediaId)
      return {
        title: item.title,
        dateLabel: item.dateLabel,
        category: item.category || "",
        summary: item.summary,
        href: item.href,
        cover: cover || fallbackR2("/foto1.jpg"),
        published: item.published,
        sortOrder: item.sortOrder,
      }
    }))
  } catch {
    return defaults.defaultNewsItems.map(item => ({ ...item, cover: item.coverPath }))
  }
}

export async function getArticleItems() {
  const db = getDb()
  if (!db) return defaults.defaultArticleItems.map(item => ({ ...item, cover: item.coverPath }))

  try {
    const items = await db.select().from(schema.newsItems).where(eq(schema.newsItems.published, true)).orderBy(asc(schema.newsItems.sortOrder))
    if (items.length === 0) return defaults.defaultArticleItems.map(item => ({ ...item, cover: item.coverPath }))

    return Promise.all(items.map(async item => {
      const cover = await resolveMediaUrl(db, item.coverMediaId)
      return {
        title: item.title,
        dateLabel: item.dateLabel,
        category: item.category || "",
        summary: item.summary,
        href: item.href,
        cover: cover || fallbackR2("/foto1.jpg"),
        published: item.published,
        sortOrder: item.sortOrder,
      }
    }))
  } catch {
    return defaults.defaultArticleItems.map(item => ({ ...item, cover: item.coverPath }))
  }
}

export async function getFacilityItems() {
  const db = getDb()
  if (!db) return defaults.defaultFacilityItems

  try {
    const items = await db.select().from(schema.facilities).orderBy(asc(schema.facilities.sortOrder))
    if (items.length === 0) return defaults.defaultFacilityItems

    return Promise.all(items.map(async item => {
      const image = await resolveMediaUrl(db, item.imageMediaId)
      return {
        name: item.name,
        description: item.description,
        imagePath: image || fallbackR2("/foto1.jpg"),
        href: "#",
        iconKey: item.iconKey,
        sortOrder: item.sortOrder,
      }
    }))
  } catch {
    return defaults.defaultFacilityItems
  }
}

export async function getTeacherItems() {
  return defaults.defaultTeacherItems
}

export async function getGalleryItems() {
  const db = getDb()
  if (!db) return defaults.defaultGalleryItems.map(item => ({ ...item, image: item.imagePath }))

  try {
    const items = await db.select().from(schema.galleryItems).where(eq(schema.galleryItems.published, true)).orderBy(asc(schema.galleryItems.sortOrder))
    if (items.length === 0) return defaults.defaultGalleryItems.map(item => ({ ...item, image: item.imagePath }))

    return Promise.all(items.map(async item => {
      const image = await resolveMediaUrl(db, item.imageMediaId)
      return {
        image: image || fallbackR2("/foto1.jpg"),
        alt: item.alt,
        caption: item.caption,
        aspect: item.aspect,
        published: item.published,
        sortOrder: item.sortOrder,
      }
    }))
  } catch {
    return defaults.defaultGalleryItems.map(item => ({ ...item, image: item.imagePath }))
  }
}

export async function getProgramPendidikanItems() {
  const db = getDb()
  if (!db) return defaults.defaultProgramPendidikanItems

  try {
    const programs = await db.select().from(schema.educationPrograms).orderBy(asc(schema.educationPrograms.sortOrder))
    if (programs.length === 0) return defaults.defaultProgramPendidikanItems

    return Promise.all(programs.map(async program => {
      const image = await resolveMediaUrl(db, program.imageMediaId)
      const points = await db.select().from(schema.educationProgramPoints).where(eq(schema.educationProgramPoints.programId, program.id)).orderBy(asc(schema.educationProgramPoints.sortOrder))

      return {
        name: program.name,
        description: program.summary,
        imagePath: image || fallbackR2("/foto1.jpg"),
        points: points.map(p => ({ body: p.body, sortOrder: p.sortOrder })),
        sortOrder: program.sortOrder,
      }
    }))
  } catch {
    return defaults.defaultProgramPendidikanItems
  }
}

export async function getStrukturPengurusItems() {
  const db = getDb()
  if (!db) return defaults.defaultStrukturPengurusItems

  try {
    const items = await db.select().from(schema.profileOrgRows).orderBy(asc(schema.profileOrgRows.sortOrder))
    if (items.length === 0) return defaults.defaultStrukturPengurusItems

    return items.map(item => ({
      jabatan: item.role,
      nama: item.name,
      sortOrder: item.sortOrder,
    }))
  } catch {
    return defaults.defaultStrukturPengurusItems
  }
}

export async function getProfileSection() {
  const db = getDb()
  if (!db) return defaults.defaultProfileSection

  try {
    const [page] = await db.select().from(schema.profilePage).where(eq(schema.profilePage.id, "profile")).limit(1)
    if (!page) return defaults.defaultProfileSection

    const missionItems = await db.select().from(schema.profileMissionItems).orderBy(asc(schema.profileMissionItems.sortOrder))
    const identityRows = await db.select().from(schema.profileIdentityRows).orderBy(asc(schema.profileIdentityRows.sortOrder))
    const orgRows = await db.select().from(schema.profileOrgRows).orderBy(asc(schema.profileOrgRows.sortOrder))

    return {
      pageTitle: page.pageTitle,
      pageDescription: page.pageDescription,
      historyTitle: defaults.defaultProfileSection.historyTitle,
      historyDescription: defaults.defaultProfileSection.historyDescription,
      historyParagraphs: defaults.defaultProfileSection.historyParagraphs,
      vision: page.vision,
      visionItems: defaults.defaultProfileSection.visionItems,
      missionItems: missionItems.length > 0 ? missionItems.map(m => ({ body: m.body, sortOrder: m.sortOrder })) : defaults.defaultProfileSection.missionItems,
      identityRows: identityRows.length > 0 ? identityRows.map(r => ({ label: r.label, value: r.value, sortOrder: r.sortOrder })) : defaults.defaultProfileSection.identityRows,
      orgRows: orgRows.length > 0 ? orgRows.map(r => ({ role: r.role, name: r.name, sortOrder: r.sortOrder })) : defaults.defaultProfileSection.orgRows,
    }
  } catch {
    return defaults.defaultProfileSection
  }
}

export async function getContactSection() {
  const db = getDb()
  if (!db) return defaults.defaultContactSection

  try {
    const [page] = await db.select().from(schema.contactPage).where(eq(schema.contactPage.id, "contact")).limit(1)
    const methods = await db.select().from(schema.contactMethods).orderBy(asc(schema.contactMethods.sortOrder))
    const locations = await db.select().from(schema.contactLocations).orderBy(asc(schema.contactLocations.sortOrder))

    return {
      pageTitle: page?.pageTitle || defaults.defaultContactSection.pageTitle,
      pageDescription: page?.pageDescription || defaults.defaultContactSection.pageDescription,
      infoTitle: page?.infoTitle || defaults.defaultContactSection.infoTitle,
      infoDescription: page?.infoDescription || defaults.defaultContactSection.infoDescription,
      locationTitle: page?.locationTitle || defaults.defaultContactSection.locationTitle,
      locationDescription: page?.locationDescription || defaults.defaultContactSection.locationDescription,
      methods: methods.length > 0 ? methods.map(m => ({
        type: m.type,
        title: m.title,
        subtitle: m.subtitle,
        description: m.description,
        value: m.value,
        actionLabel: m.actionLabel,
        actionHref: m.actionHref,
        sortOrder: m.sortOrder,
      })) : defaults.defaultContactSection.methods,
      locations: locations.length > 0 ? locations.map(l => ({
        title: l.title,
        subtitle: l.subtitle,
        address: l.address,
        mapEmbedUrl: l.mapEmbedUrl,
        mapHref: l.mapHref,
        sortOrder: l.sortOrder,
      })) : defaults.defaultContactSection.locations,
    }
  } catch {
    return defaults.defaultContactSection
  }
}

export async function getFooterSection() {
  const db = getDb()
  if (!db) return defaults.defaultFooterSection

  try {
    const [settings] = await db.select().from(schema.footerSettings).where(eq(schema.footerSettings.id, "footer")).limit(1)
    const quickLinks = await db.select().from(schema.footerQuickLinks).orderBy(asc(schema.footerQuickLinks.sortOrder))
    const socialLinks = await db.select().from(schema.footerSocialLinks).orderBy(asc(schema.footerSocialLinks.sortOrder))

    return {
      brandText: settings?.brandText || defaults.defaultFooterSection.brandText,
      socialIntro: settings?.socialIntro || defaults.defaultFooterSection.socialIntro,
      copyrightText: settings?.copyrightText || defaults.defaultFooterSection.copyrightText,
      quickLinks: quickLinks.length > 0 ? quickLinks.map(l => ({ label: l.label, href: l.href, sortOrder: l.sortOrder })) : defaults.defaultFooterSection.quickLinks,
      socialLinks: socialLinks.length > 0 ? socialLinks.map(l => ({ platform: l.platform, href: l.href, sortOrder: l.sortOrder })) : defaults.defaultFooterSection.socialLinks,
    }
  } catch {
    return defaults.defaultFooterSection
  }
}

// Legacy exports for backward compatibility
export async function getWhyUsItems() {
  return defaults.defaultWhyUsItems
}
export async function getPartnerItems() {
  return defaults.defaultPartnerItems.map(item => ({
    ...item,
    logo: staticSiteConfig.heroImage,
  }))
}
export async function getHistoryTimeline() {
  return defaults.defaultHistoryTimeline
}
export async function getEditorialItems() { return [] }
export async function getAnnouncementItems() { return [] }
export async function getBlogItems() { return [] }
export async function getActivityItems() { return [] }
export async function getQuoteItems() { return [] }
export async function getAgendaItems() { return [] }
export async function getPancaJiwaItems() { return [] }
export async function getEducationSection() {
  return defaults.defaultEducationSection
}
export async function getFacilitiesSection() {
  const items = await getFacilityItems()
  return {
    pageTitle: defaults.defaultFacilitiesSection?.pageTitle || "Fasilitas",
    pageDescription: defaults.defaultFacilitiesSection?.pageDescription || "",
    highlights: defaults.defaultFacilitiesSection?.highlights || [],
    items,
  }
}
export async function getGallerySection() {
  const items = await getGalleryItems()
  return items.map(item => ({
    ...item,
    image: item.image,
  }))
}
export async function getFaqSection() {
  return defaults.defaultFaqSection.categories
}
export async function getTestimonials() {
  return defaults.defaultTestimonialsSection.items.map(item => ({
    ...item,
    avatar: item.avatarPath,
  }))
}
