import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"
import * as defaults from "../cms/default-content"

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set in environment!")
    process.exit(1)
  }

  console.log("Connecting to database...")
  const sql = postgres(databaseUrl, { max: 1 })
  const db = drizzle(sql, { schema })

  console.log("Cleaning up existing tables...")
  // Child tables first
  await db.delete(schema.educationProgramPoints)
  await db.delete(schema.educationPrograms)
  await db.delete(schema.educationHighlights)
  await db.delete(schema.facilityHighlights)
  await db.delete(schema.facilities)
  await db.delete(schema.faqItems)
  await db.delete(schema.faqCategories)
  await db.delete(schema.testimonials)
  await db.delete(schema.galleryItems)
  await db.delete(schema.profileIdentityRows)
  await db.delete(schema.profileMissionItems)
  await db.delete(schema.profileGoalItems)
  await db.delete(schema.profileOrgRows)
  await db.delete(schema.profileProgramRows)
  await db.delete(schema.profilePage)
  await db.delete(schema.contactMethods)
  await db.delete(schema.contactLocations)
  await db.delete(schema.contactPage)
  await db.delete(schema.footerQuickLinks)
  await db.delete(schema.footerSocialLinks)
  await db.delete(schema.footerSettings)
  await db.delete(schema.heroStats)
  await db.delete(schema.whyUsItems)
  await db.delete(schema.newsItems)
  await db.delete(schema.partnerItems)
  await db.delete(schema.historyTimelineItems)
  await db.delete(schema.navigationItems)
  await db.delete(schema.homepageSections)
  await db.delete(schema.siteSettings)
  await db.delete(schema.mediaAssets)

  console.log("Seeding media assets...")
  const insertedMedia = await db.insert(schema.mediaAssets).values(
    defaults.defaultMediaAssets.map(asset => ({
      label: asset.label,
      alt: asset.alt,
      kind: asset.kind,
      storageKey: asset.storageKey,
      url: asset.url,
    }))
  ).returning()

  const mediaMap = new Map<string, string>()
  for (const asset of insertedMedia) {
    mediaMap.set(asset.storageKey, asset.id)
    mediaMap.set(asset.url, asset.id)
  }

  const getMediaId = (path: string | undefined | null): string | null => {
    if (!path) return null
    return mediaMap.get(path) ?? null
  }

  console.log("Seeding site settings...")
  await db.insert(schema.siteSettings).values({
    id: "default",
    name: defaults.defaultSiteSettings.name,
    shortName: defaults.defaultSiteSettings.shortName,
    tagline: defaults.defaultSiteSettings.tagline,
    description: defaults.defaultSiteSettings.description,
    whatsapp: defaults.defaultSiteSettings.whatsapp,
    whatsappLabel: defaults.defaultSiteSettings.whatsappLabel,
    brochureHref: defaults.defaultSiteSettings.brochureHref,
    mapHref: defaults.defaultSiteSettings.mapHref,
    logoMediaId: getMediaId(defaults.defaultSiteSettings.logoPath),
    address: defaults.defaultSiteSettings.address,
    email: defaults.defaultSiteSettings.email,
    officeHours: defaults.defaultSiteSettings.officeHours,
    metadataTitle: defaults.defaultSiteSettings.metadataTitle,
    metadataDescription: defaults.defaultSiteSettings.metadataDescription,
  })

  console.log("Seeding footer settings...")
  await db.insert(schema.footerSettings).values({
    id: "default",
    brandText: defaults.defaultFooterSection.brandText,
    socialIntro: defaults.defaultFooterSection.socialIntro,
    copyrightText: defaults.defaultFooterSection.copyrightText,
  })

  if (defaults.defaultFooterSection.quickLinks.length > 0) {
    await db.insert(schema.footerQuickLinks).values(
      defaults.defaultFooterSection.quickLinks.map(link => ({
        label: link.label,
        href: link.href,
        sortOrder: link.sortOrder,
      }))
    )
  }

  if (defaults.defaultFooterSection.socialLinks.length > 0) {
    await db.insert(schema.footerSocialLinks).values(
      defaults.defaultFooterSection.socialLinks.map(link => ({
        platform: link.platform,
        href: link.href,
        sortOrder: link.sortOrder,
      }))
    )
  }

  console.log("Seeding navigation items...")
  if (defaults.defaultNavigation.length > 0) {
    await db.insert(schema.navigationItems).values(
      defaults.defaultNavigation.map(item => ({
        label: item.label,
        href: item.href,
        openInNewTab: item.openInNewTab,
        sortOrder: item.sortOrder,
      }))
    )
  }

  console.log("Seeding homepage sections...")
  await db.insert(schema.homepageSections).values({
    id: "default",
    heroBadge: defaults.defaultHomepage.heroBadge,
    heroTitle: defaults.defaultHomepage.heroTitle,
    heroDescription: defaults.defaultHomepage.heroDescription,
    heroImageMediaId: getMediaId(defaults.defaultHomepage.heroImagePath),
    primaryCtaLabel: defaults.defaultHomepage.primaryCtaLabel,
    primaryCtaHref: defaults.defaultHomepage.primaryCtaHref,
    secondaryCtaLabel: defaults.defaultHomepage.secondaryCtaLabel,
    secondaryCtaHref: defaults.defaultHomepage.secondaryCtaHref,
    newsTitle: defaults.defaultHomepage.newsTitle,
    newsDescription: defaults.defaultHomepage.newsDescription,
    partnersTitle: defaults.defaultHomepage.partnersTitle,
    partnersDescription: defaults.defaultHomepage.partnersDescription,
    historyTitle: defaults.defaultHomepage.historyTitle,
    historyDescription: defaults.defaultHomepage.historyDescription,
    whyUsTitle: defaults.defaultHomepage.whyUsTitle,
    whyUsDescription: defaults.defaultHomepage.whyUsDescription,
    educationTitle: defaults.defaultHomepage.educationTitle,
    educationDescription: defaults.defaultHomepage.educationDescription,
    facilitiesTitle: defaults.defaultHomepage.facilitiesTitle,
    facilitiesDescription: defaults.defaultHomepage.facilitiesDescription,
    faqTitle: defaults.defaultHomepage.faqTitle,
    faqDescription: defaults.defaultHomepage.faqDescription,
    faqImageMediaId: getMediaId(defaults.defaultHomepage.faqImagePath),
    testimonialsTitle: defaults.defaultHomepage.testimonialsTitle,
    testimonialsDescription: defaults.defaultHomepage.testimonialsDescription,
    bottomCtaTitle: defaults.defaultHomepage.bottomCtaTitle,
    bottomCtaDescription: defaults.defaultHomepage.bottomCtaDescription,
    bottomCtaLabel: defaults.defaultHomepage.bottomCtaLabel,
    bottomCtaHref: defaults.defaultHomepage.bottomCtaHref,
  })

  if (defaults.defaultHomepage.heroStats.length > 0) {
    await db.insert(schema.heroStats).values(
      defaults.defaultHomepage.heroStats.map((stat, index) => ({
        value: stat.value,
        label: stat.label,
        sortOrder: index,
      }))
    )
  }

  console.log("Seeding partners...")
  if (defaults.defaultPartnerItems.length > 0) {
    await db.insert(schema.partnerItems).values(
      defaults.defaultPartnerItems.map(partner => ({
        name: partner.name,
        note: partner.note,
        sortOrder: partner.sortOrder,
      }))
    )
  }

  console.log("Seeding why choose us items...")
  if (defaults.defaultWhyUsItems.length > 0) {
    await db.insert(schema.whyUsItems).values(
      defaults.defaultWhyUsItems.map(item => ({
        title: item.title,
        description: item.description,
        iconKey: item.iconKey,
        sortOrder: item.sortOrder,
      }))
    )
  }

  console.log("Seeding news items...")
  if (defaults.defaultNewsItems.length > 0) {
    await db.insert(schema.newsItems).values(
      defaults.defaultNewsItems.map(item => ({
        title: item.title,
        dateLabel: item.dateLabel,
        category: item.category,
        summary: item.summary,
        href: item.href,
        coverMediaId: getMediaId(item.coverPath),
        published: item.published,
        sortOrder: item.sortOrder,
      }))
    )
  }

  console.log("Seeding history timeline...")
  if (defaults.defaultHistoryTimeline.length > 0) {
    await db.insert(schema.historyTimelineItems).values(
      defaults.defaultHistoryTimeline.map(item => ({
        year: item.year,
        title: item.title,
        description: item.description,
        color: item.color,
        sortOrder: item.sortOrder,
      }))
    )
  }

  console.log("Seeding education section...")
  if (defaults.defaultEducationSection.highlights.length > 0) {
    await db.insert(schema.educationHighlights).values(
      defaults.defaultEducationSection.highlights.map(hl => ({
        body: hl.body,
        sortOrder: hl.sortOrder,
      }))
    )
  }

  for (const prog of defaults.defaultEducationSection.programs) {
    const [insertedProg] = await db.insert(schema.educationPrograms).values({
      name: prog.name,
      summary: prog.summary,
      focus: prog.focus,
      imageMediaId: getMediaId(prog.imagePath),
      iconKey: prog.iconKey,
      homePrimaryLabel: prog.homePrimaryLabel,
      homePrimaryHref: prog.homePrimaryHref,
      homeSecondaryLabel: prog.homeSecondaryLabel,
      homeSecondaryHref: prog.homeSecondaryHref,
      sortOrder: prog.sortOrder,
    }).returning()

    if (prog.points && prog.points.length > 0) {
      await db.insert(schema.educationProgramPoints).values(
        prog.points.map(pt => ({
          programId: insertedProg.id,
          body: pt.body,
          sortOrder: pt.sortOrder,
        }))
      )
    }
  }

  console.log("Seeding facilities section...")
  if (defaults.defaultFacilitiesSection.highlights.length > 0) {
    await db.insert(schema.facilityHighlights).values(
      defaults.defaultFacilitiesSection.highlights.map(hl => ({
        body: hl.body,
        sortOrder: hl.sortOrder,
      }))
    )
  }

  if (defaults.defaultFacilitiesSection.items.length > 0) {
    await db.insert(schema.facilities).values(
      defaults.defaultFacilitiesSection.items.map(fac => ({
        name: fac.name,
        description: fac.description,
        imageMediaId: getMediaId(fac.imagePath),
        iconKey: fac.iconKey,
        sortOrder: fac.sortOrder,
      }))
    )
  }

  console.log("Seeding faq categories and items...")
  for (const cat of defaults.defaultFaqSection.categories) {
    const [insertedCat] = await db.insert(schema.faqCategories).values({
      name: cat.name,
      iconKey: cat.iconKey,
      sortOrder: cat.sortOrder,
    }).returning()

    if (cat.items && cat.items.length > 0) {
      await db.insert(schema.faqItems).values(
        cat.items.map(item => ({
          categoryId: insertedCat.id,
          question: item.question,
          answer: item.answer,
          sortOrder: item.sortOrder,
        }))
      )
    }
  }

  console.log("Seeding testimonials...")
  if (defaults.defaultTestimonialsSection.items.length > 0) {
    await db.insert(schema.testimonials).values(
      defaults.defaultTestimonialsSection.items.map(t => ({
        name: t.name,
        role: t.role,
        quote: t.quote,
        avatarMediaId: getMediaId(t.avatarPath),
        published: t.published,
        sortOrder: t.sortOrder,
      }))
    )
  }

  console.log("Seeding gallery items...")
  if (defaults.defaultGallerySection.items.length > 0) {
    await db.insert(schema.galleryItems).values(
      defaults.defaultGallerySection.items.map(g => ({
        imageMediaId: getMediaId(g.imagePath),
        alt: g.alt,
        caption: g.caption,
        aspect: g.aspect,
        published: g.published,
        sortOrder: g.sortOrder,
      }))
    )
  }

  console.log("Seeding profile page...")
  await db.insert(schema.profilePage).values({
    id: "default",
    pageTitle: defaults.defaultProfileSection.pageTitle,
    pageDescription: defaults.defaultProfileSection.pageDescription,
    vision: defaults.defaultProfileSection.vision,
  })

  if (defaults.defaultProfileSection.identityRows.length > 0) {
    await db.insert(schema.profileIdentityRows).values(
      defaults.defaultProfileSection.identityRows.map(row => ({
        label: row.label,
        value: row.value,
        sortOrder: row.sortOrder,
      }))
    )
  }

  if (defaults.defaultProfileSection.missionItems.length > 0) {
    await db.insert(schema.profileMissionItems).values(
      defaults.defaultProfileSection.missionItems.map(item => ({
        body: item.body,
        sortOrder: item.sortOrder,
      }))
    )
  }

  if (defaults.defaultProfileSection.goalItems.length > 0) {
    await db.insert(schema.profileGoalItems).values(
      defaults.defaultProfileSection.goalItems.map(item => ({
        body: item.body,
        sortOrder: item.sortOrder,
      }))
    )
  }

  if (defaults.defaultProfileSection.orgRows.length > 0) {
    await db.insert(schema.profileOrgRows).values(
      defaults.defaultProfileSection.orgRows.map(row => ({
        role: row.role,
        name: row.name,
        sortOrder: row.sortOrder,
      }))
    )
  }

  if (defaults.defaultProfileSection.programRows.length > 0) {
    await db.insert(schema.profileProgramRows).values(
      defaults.defaultProfileSection.programRows.map(row => ({
        name: row.name,
        iconKey: row.iconKey,
        sortOrder: row.sortOrder,
      }))
    )
  }

  console.log("Seeding contact page...")
  await db.insert(schema.contactPage).values({
    id: "default",
    pageTitle: defaults.defaultContactSection.pageTitle,
    pageDescription: defaults.defaultContactSection.pageDescription,
    infoTitle: defaults.defaultContactSection.infoTitle,
    infoDescription: defaults.defaultContactSection.infoDescription,
    locationTitle: defaults.defaultContactSection.locationTitle,
    locationDescription: defaults.defaultContactSection.locationDescription,
  })

  if (defaults.defaultContactSection.methods.length > 0) {
    await db.insert(schema.contactMethods).values(
      defaults.defaultContactSection.methods.map(method => ({
        type: method.type,
        title: method.title,
        subtitle: method.subtitle,
        description: method.description,
        value: method.value,
        actionLabel: method.actionLabel,
        actionHref: method.actionHref,
        sortOrder: method.sortOrder,
      }))
    )
  }

  if (defaults.defaultContactSection.locations.length > 0) {
    await db.insert(schema.contactLocations).values(
      defaults.defaultContactSection.locations.map(loc => ({
        title: loc.title,
        subtitle: loc.subtitle,
        address: loc.address,
        mapEmbedUrl: loc.mapEmbedUrl,
        mapHref: loc.mapHref,
        sortOrder: loc.sortOrder,
      }))
    )
  }

  console.log("Database seeded successfully!")
  await sql.end()
}

main().catch((err) => {
  console.error("Seeding failed:", err)
  process.exit(1)
})
