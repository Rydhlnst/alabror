import { randomUUID } from "node:crypto"

import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"

dotenv.config()

import * as schema from "../lib/db/schema"
import {
  defaultContactSection,
  defaultEducationSection,
  defaultFacilitiesSection,
  defaultFooterSection,
  defaultGallerySection,
  defaultHistoryTimeline,
  defaultHomepage,
  defaultMediaAssets,
  defaultNavigation,
  defaultNewsItems,
  defaultPartnerItems,
  defaultProfileSection,
  defaultSiteSettings,
  defaultTestimonialsSection,
  defaultWhyUsItems,
  defaultFaqSection,
} from "../lib/cms/default-content"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed CMS data.")
}

const client = postgres(databaseUrl, { max: 1, prepare: false })
const db = drizzle(client, { schema })

function mediaIdByStorageKey(map: Map<string, string>, storageKey?: string | null) {
  if (!storageKey) return null
  return map.get(storageKey) ?? null
}

async function main() {
  await db.execute(sql.raw(`
    TRUNCATE TABLE
      education_program_points,
      education_programs,
      education_highlights,
      facility_highlights,
      facilities,
      faq_items,
      faq_categories,
      testimonials,
      gallery_items,
      history_timeline_items,
      why_us_items,
      news_items,
      partner_items,
      hero_stats,
      navigation_items,
      footer_social_links,
      footer_quick_links,
      profile_identity_rows,
      profile_mission_items,
      profile_goal_items,
      profile_org_rows,
      profile_program_rows,
      contact_methods,
      contact_locations,
      homepage_sections,
      profile_page,
      contact_page,
      footer_settings,
      site_settings,
      media_assets
    RESTART IDENTITY CASCADE
  `))

  const mediaRows = defaultMediaAssets.map((item) => ({
    id: randomUUID(),
    label: item.label,
    alt: item.alt,
    kind: item.kind,
    storageKey: item.storageKey,
    url: item.url,
  }))

  await db.insert(schema.mediaAssets).values(mediaRows)
  const mediaMap = new Map(mediaRows.map((item) => [item.storageKey, item.id]))

  await db.insert(schema.siteSettings).values({
    id: defaultSiteSettings.id,
    name: defaultSiteSettings.name,
    shortName: defaultSiteSettings.shortName,
    tagline: defaultSiteSettings.tagline,
    description: defaultSiteSettings.description,
    whatsapp: defaultSiteSettings.whatsapp,
    whatsappLabel: defaultSiteSettings.whatsappLabel,
    brochureHref: defaultSiteSettings.brochureHref,
    mapHref: defaultSiteSettings.mapHref,
    logoMediaId: mediaIdByStorageKey(mediaMap, defaultSiteSettings.logoPath),
    address: defaultSiteSettings.address,
    email: defaultSiteSettings.email,
    officeHours: defaultSiteSettings.officeHours,
    metadataTitle: defaultSiteSettings.metadataTitle,
    metadataDescription: defaultSiteSettings.metadataDescription,
  })

  await db.insert(schema.homepageSections).values({
    id: defaultHomepage.id,
    heroBadge: defaultHomepage.heroBadge,
    heroTitle: defaultHomepage.heroTitle,
    heroDescription: defaultHomepage.heroDescription,
    heroImageMediaId: mediaIdByStorageKey(mediaMap, defaultHomepage.heroImagePath),
    primaryCtaLabel: defaultHomepage.primaryCtaLabel,
    primaryCtaHref: defaultHomepage.primaryCtaHref,
    secondaryCtaLabel: defaultHomepage.secondaryCtaLabel,
    secondaryCtaHref: defaultHomepage.secondaryCtaHref,
    newsTitle: defaultHomepage.newsTitle,
    newsDescription: defaultHomepage.newsDescription,
    partnersTitle: defaultHomepage.partnersTitle,
    partnersDescription: defaultHomepage.partnersDescription,
    historyTitle: defaultHomepage.historyTitle,
    historyDescription: defaultHomepage.historyDescription,
    whyUsTitle: defaultHomepage.whyUsTitle,
    whyUsDescription: defaultHomepage.whyUsDescription,
    educationTitle: defaultHomepage.educationTitle,
    educationDescription: defaultHomepage.educationDescription,
    facilitiesTitle: defaultHomepage.facilitiesTitle,
    facilitiesDescription: defaultHomepage.facilitiesDescription,
    faqTitle: defaultHomepage.faqTitle,
    faqDescription: defaultHomepage.faqDescription,
    faqImageMediaId: mediaIdByStorageKey(mediaMap, defaultHomepage.faqImagePath),
    testimonialsTitle: defaultHomepage.testimonialsTitle,
    testimonialsDescription: defaultHomepage.testimonialsDescription,
    bottomCtaTitle: defaultHomepage.bottomCtaTitle,
    bottomCtaDescription: defaultHomepage.bottomCtaDescription,
    bottomCtaLabel: defaultHomepage.bottomCtaLabel,
    bottomCtaHref: defaultHomepage.bottomCtaHref,
  })

  await db.insert(schema.footerSettings).values({
    id: "footer",
    brandText: defaultFooterSection.brandText,
    socialIntro: defaultFooterSection.socialIntro,
    copyrightText: defaultFooterSection.copyrightText,
  })

  await db.insert(schema.profilePage).values({
    id: "profile",
    pageTitle: defaultProfileSection.pageTitle,
    pageDescription: defaultProfileSection.pageDescription,
    vision: defaultProfileSection.vision,
  })

  await db.insert(schema.contactPage).values({
    id: "contact",
    pageTitle: defaultContactSection.pageTitle,
    pageDescription: defaultContactSection.pageDescription,
    infoTitle: defaultContactSection.infoTitle,
    infoDescription: defaultContactSection.infoDescription,
    locationTitle: defaultContactSection.locationTitle,
    locationDescription: defaultContactSection.locationDescription,
  })

  await db.insert(schema.navigationItems).values(defaultNavigation)
  await db.insert(schema.footerQuickLinks).values(defaultFooterSection.quickLinks)
  await db.insert(schema.footerSocialLinks).values(defaultFooterSection.socialLinks)
  await db.insert(schema.heroStats).values(defaultHomepage.heroStats)
  await db.insert(schema.partnerItems).values(defaultPartnerItems)
  await db.insert(schema.newsItems).values(
    defaultNewsItems.map((item) => ({
      title: item.title,
      dateLabel: item.dateLabel,
      category: item.category,
      summary: item.summary,
      href: item.href,
      coverMediaId: mediaIdByStorageKey(mediaMap, item.coverPath),
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  )
  await db.insert(schema.historyTimelineItems).values(defaultHistoryTimeline)
  await db.insert(schema.whyUsItems).values(defaultWhyUsItems)
  await db.insert(schema.educationHighlights).values(defaultEducationSection.highlights)

  const educationProgramRows = defaultEducationSection.programs.map((program) => ({
    id: randomUUID(),
    name: program.name,
    summary: program.summary,
    focus: program.focus,
    imageMediaId: mediaIdByStorageKey(mediaMap, program.imagePath),
    iconKey: program.iconKey,
    homePrimaryLabel: program.homePrimaryLabel,
    homePrimaryHref: program.homePrimaryHref,
    homeSecondaryLabel: program.homeSecondaryLabel || null,
    homeSecondaryHref: program.homeSecondaryHref || null,
    sortOrder: program.sortOrder,
    points: program.points,
  }))
  await db.insert(schema.educationPrograms).values(
    educationProgramRows.map((p) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { points, ...rest } = p
      return rest
    })
  )
  await db.insert(schema.educationProgramPoints).values(
    educationProgramRows.flatMap((program) =>
      program.points.map((point) => ({
        programId: program.id,
        body: point.body,
        sortOrder: point.sortOrder,
      }))
    )
  )

  await db.insert(schema.facilityHighlights).values(defaultFacilitiesSection.highlights)
  await db.insert(schema.facilities).values(
    defaultFacilitiesSection.items.map((item) => ({
      name: item.name,
      description: item.description,
      imageMediaId: mediaIdByStorageKey(mediaMap, item.imagePath),
      iconKey: item.iconKey,
      sortOrder: item.sortOrder,
    }))
  )

  const faqCategoryRows = defaultFaqSection.categories.map((category) => ({
    id: randomUUID(),
    name: category.name,
    iconKey: category.iconKey,
    sortOrder: category.sortOrder,
    items: category.items,
  }))
  await db.insert(schema.faqCategories).values(
    faqCategoryRows.map((c) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...rest } = c
      return rest
    })
  )
  await db.insert(schema.faqItems).values(
    faqCategoryRows.flatMap((category) =>
      category.items.map((item) => ({
        categoryId: category.id,
        question: item.question,
        answer: item.answer,
        sortOrder: item.sortOrder,
      }))
    )
  )

  await db.insert(schema.testimonials).values(
    defaultTestimonialsSection.items.map((item) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      avatarMediaId: mediaIdByStorageKey(mediaMap, item.avatarPath),
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  )

  await db.insert(schema.galleryItems).values(
    defaultGallerySection.items.map((item) => ({
      imageMediaId: mediaIdByStorageKey(mediaMap, item.imagePath),
      alt: item.alt,
      caption: item.caption,
      aspect: item.aspect,
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  )

  await db.insert(schema.profileIdentityRows).values(defaultProfileSection.identityRows)
  await db.insert(schema.profileMissionItems).values(defaultProfileSection.missionItems)
  await db.insert(schema.profileGoalItems).values(defaultProfileSection.goalItems)
  await db.insert(schema.profileOrgRows).values(defaultProfileSection.orgRows)
  await db.insert(schema.profileProgramRows).values(defaultProfileSection.programRows)
  await db.insert(schema.contactMethods).values(defaultContactSection.methods)
  await db.insert(schema.contactLocations).values(defaultContactSection.locations)

  console.log("CMS seed complete")
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await client.end()
  })



