import { eq, asc } from "drizzle-orm"
import { getDb } from "./index"

type DbClient = NonNullable<ReturnType<typeof getDb>>
import * as schema from "./schema"
import * as defaults from "../cms/default-content"
import { siteConfig as staticSiteConfig } from "../content"

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resolveMediaUrl(db: DbClient, mediaId: string | null | undefined): Promise<string | null> {
  return null
}

export async function getSiteSettings() {
  return staticSiteSettings
}

export async function getNavigation() {
  return defaults.defaultNavigation
}

export async function getHomepageSections() {
  return {
    ...defaults.defaultHomepage,
    heroImageUrl: defaults.defaultHomepage.heroImagePath,
  }
}

export async function getNewsItems() {
  return defaults.defaultNewsItems.map(item => ({
    ...item,
    cover: item.coverPath,
  }))
}

export async function getArticleItems() {
  return defaults.defaultArticleItems.map(item => ({
    ...item,
    cover: item.coverPath,
  }))
}

export async function getFacilityItems() {
  return defaults.defaultFacilityItems
}

export async function getTeacherItems() {
  return defaults.defaultTeacherItems
}

export async function getGalleryItems() {
  return defaults.defaultGalleryItems.map(item => ({
    ...item,
    image: item.imagePath,
  }))
}

export async function getProgramPendidikanItems() {
  return defaults.defaultProgramPendidikanItems
}

export async function getStrukturPengurusItems() {
  return defaults.defaultStrukturPengurusItems
}

export async function getProfileSection() {
  return {
    pageTitle: defaults.defaultProfileSection.pageTitle,
    pageDescription: defaults.defaultProfileSection.pageDescription,
    historyTitle: defaults.defaultProfileSection.historyTitle,
    historyDescription: defaults.defaultProfileSection.historyDescription,
    historyParagraphs: defaults.defaultProfileSection.historyParagraphs,
    vision: defaults.defaultProfileSection.vision,
    visionItems: defaults.defaultProfileSection.visionItems,
    missionItems: defaults.defaultProfileSection.missionItems,
    identityRows: defaults.defaultProfileSection.identityRows,
    orgRows: defaults.defaultProfileSection.orgRows,
  }
}

export async function getContactSection() {
  return {
    pageTitle: defaults.defaultContactSection.pageTitle,
    pageDescription: defaults.defaultContactSection.pageDescription,
    infoTitle: defaults.defaultContactSection.infoTitle,
    infoDescription: defaults.defaultContactSection.infoDescription,
    locationTitle: defaults.defaultContactSection.locationTitle,
    locationDescription: defaults.defaultContactSection.locationDescription,
    methods: defaults.defaultContactSection.methods,
    locations: defaults.defaultContactSection.locations,
  }
}

export async function getFooterSection() {
  return {
    brandText: defaults.defaultFooterSection.brandText,
    socialIntro: defaults.defaultFooterSection.socialIntro,
    copyrightText: defaults.defaultFooterSection.copyrightText,
    quickLinks: defaults.defaultFooterSection.quickLinks,
    socialLinks: defaults.defaultFooterSection.socialLinks,
  }
}

// Legacy exports for backward compatibility
export async function getWhyUsItems() { return [] }
export async function getPartnerItems() { return [] }
export async function getHistoryTimeline() { return [] }
export async function getEditorialItems() { return [] }
export async function getAnnouncementItems() { return [] }
export async function getBlogItems() { return [] }
export async function getActivityItems() { return [] }
export async function getQuoteItems() { return [] }
export async function getAgendaItems() { return [] }
export async function getPancaJiwaItems() { return [] }
export async function getEducationSection() {
  return { pageTitle: "Pendidikan", pageDescription: "", highlights: [], programs: [] }
}
export async function getFacilitiesSection() {
  return { pageTitle: "Fasilitas", pageDescription: "", highlights: [], items: defaults.defaultFacilityItems }
}
export async function getGallerySection() { return [] }
export async function getFaqSection() { return [] }
export async function getTestimonials() { return [] }
