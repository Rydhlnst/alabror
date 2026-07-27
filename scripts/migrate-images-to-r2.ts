import { randomUUID } from "node:crypto"
import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"

import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import * as dotenv from "dotenv"

dotenv.config()

import * as schema from "../lib/db/schema"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const databaseUrl = process.env.DATABASE_URL
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL

if (!databaseUrl) throw new Error("DATABASE_URL is required")
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_URL) {
  throw new Error("R2 env vars are required: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL")
}

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

const client = postgres(databaseUrl, { max: 1, ssl: "require" })
const db = drizzle(client, { schema })

// ---------------------------------------------------------------------------
// Images to migrate
// ---------------------------------------------------------------------------
type ImageEntry = {
  localPath: string
  label: string
  alt: string
}

const imagesToMigrate: ImageEntry[] = [
  { localPath: "public/logo.png", label: "Primary Logo", alt: "Logo Al-Abror" },
  { localPath: "public/foto1.jpg", label: "Hero Image 1", alt: "Pondok Pesantren Al-Abror" },
  { localPath: "public/foto2.jpg", label: "Hero Image 2", alt: "Kegiatan Al-Abror" },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function compressToWebP(buffer: Buffer, filename: string): Promise<{ buffer: Buffer; key: string }> {
  const baseName = filename.substring(0, filename.lastIndexOf(".")) || filename
  const key = `${Date.now()}-${baseName}.webp`

  try {
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer()
    console.log(`  [sharp] Compressed ${filename} -> ${key} (${(webpBuffer.length / 1024).toFixed(1)} KB)`)
    return { buffer: webpBuffer, key }
  } catch (err) {
    console.error(`  [sharp] Failed to compress ${filename}, using original:`, err)
    return { buffer, key: `${Date.now()}-${filename}` }
  }
}

async function uploadToR2(buffer: Buffer, key: string, mime: string): Promise<string> {
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: mime,
    })
  )

  const url = `${R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}`
  console.log(`  [R2] Uploaded: ${key} -> ${url}`)
  return url
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== Migrating images to Cloudflare R2 ===\n")

  // 1. Truncate old data
  console.log("1. Clearing old data...")
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
  console.log("  Done.\n")

  // 2. Upload images to R2 and insert into media_assets
  console.log("2. Uploading images to R2...")
  const mediaMap = new Map<string, string>() // storageKey -> mediaId

  for (const entry of imagesToMigrate) {
    const fullPath = join(process.cwd(), entry.localPath)
    if (!existsSync(fullPath)) {
      console.warn(`  [skip] File not found: ${fullPath}`)
      continue
    }

    const originalBuffer = readFileSync(fullPath)
    const originalSize = originalBuffer.length
    console.log(`\n  Processing: ${entry.localPath} (${(originalSize / 1024).toFixed(1)} KB)`)

    // Compress to WebP
    const { buffer: webpBuffer, key: storageKey } = await compressToWebP(originalBuffer, entry.localPath)

    // Upload to R2
    const url = await uploadToR2(webpBuffer, storageKey, "image/webp")

    // Insert into media_assets
    const [inserted] = await db
      .insert(schema.mediaAssets)
      .values({
        id: randomUUID(),
        label: entry.label,
        alt: entry.alt,
        kind: "image",
        storageKey,
        url,
        mimeType: "image/webp",
        size: webpBuffer.length,
      })
      .returning()

    mediaMap.set(entry.localPath, inserted.id)
    console.log(`  [DB] Saved media: ${inserted.id}`)
  }

  console.log("\n\n3. Media mapping:")
  for (const [path, id] of mediaMap) {
    console.log(`  ${path} -> ${id}`)
  }

  // 4. Seed all CMS content using the uploaded media
  console.log("\n4. Seeding CMS content...")

  // We import the seed logic but use our new mediaMap
  const { defaultSiteSettings, defaultHomepage, defaultFooterSection, defaultProfileSection, defaultContactSection, defaultNavigation, defaultNewsItems, defaultHistoryTimeline, defaultWhyUsItems, defaultEducationSection, defaultFacilitiesSection, defaultFaqSection, defaultTestimonialsSection, defaultPartnerItems, defaultGallerySection } = await import("../lib/cms/default-content")

  function mediaId(localPath: string | null | undefined): string | null {
    if (!localPath) return null
    return mediaMap.get(localPath) ?? null
  }

  // Site Settings
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
    logoMediaId: mediaId("/logo.png"),
    address: defaultSiteSettings.address,
    email: defaultSiteSettings.email,
    officeHours: defaultSiteSettings.officeHours,
    metadataTitle: defaultSiteSettings.metadataTitle,
    metadataDescription: defaultSiteSettings.metadataDescription,
  })
  console.log("  [DB] site_settings")

  // Homepage
  await db.insert(schema.homepageSections).values({
    id: defaultHomepage.id,
    heroBadge: defaultHomepage.heroBadge,
    heroTitle: defaultHomepage.heroTitle,
    heroDescription: defaultHomepage.heroDescription,
    heroImageMediaId: mediaId("/foto1.jpg"),
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
    faqImageMediaId: mediaId("/foto1.jpg"),
    testimonialsTitle: defaultHomepage.testimonialsTitle,
    testimonialsDescription: defaultHomepage.testimonialsDescription,
    bottomCtaTitle: defaultHomepage.bottomCtaTitle,
    bottomCtaDescription: defaultHomepage.bottomCtaDescription,
    bottomCtaLabel: defaultHomepage.bottomCtaLabel,
    bottomCtaHref: defaultHomepage.bottomCtaHref,
  })
  console.log("  [DB] homepage_sections")

  // Footer
  await db.insert(schema.footerSettings).values({
    id: "footer",
    brandText: defaultFooterSection.brandText,
    socialIntro: defaultFooterSection.socialIntro,
    copyrightText: defaultFooterSection.copyrightText,
  })
  console.log("  [DB] footer_settings")

  // Profile
  await db.insert(schema.profilePage).values({
    id: "profile",
    pageTitle: defaultProfileSection.pageTitle,
    pageDescription: defaultProfileSection.pageDescription,
    vision: defaultProfileSection.vision,
  })
  console.log("  [DB] profile_page")

  // Contact
  await db.insert(schema.contactPage).values({
    id: "contact",
    pageTitle: defaultContactSection.pageTitle,
    pageDescription: defaultContactSection.pageDescription,
    infoTitle: defaultContactSection.infoTitle,
    infoDescription: defaultContactSection.infoDescription,
    locationTitle: defaultContactSection.locationTitle,
    locationDescription: defaultContactSection.locationDescription,
  })
  console.log("  [DB] contact_page")

  // Navigation
  await db.insert(schema.navigationItems).values(defaultNavigation)
  console.log("  [DB] navigation_items")

  // Footer links
  await db.insert(schema.footerQuickLinks).values(defaultFooterSection.quickLinks)
  await db.insert(schema.footerSocialLinks).values(defaultFooterSection.socialLinks)
  console.log("  [DB] footer links")

  // Hero stats
  await db.insert(schema.heroStats).values(defaultHomepage.heroStats)
  console.log("  [DB] hero_stats")

  // Partner items
  await db.insert(schema.partnerItems).values(defaultPartnerItems)
  console.log("  [DB] partner_items")

  // News items - use foto1.jpg as default cover
  const newsRows = defaultNewsItems.map((item) => ({
    title: item.title,
    dateLabel: item.dateLabel,
    category: item.category,
    summary: item.summary,
    href: item.href,
    coverMediaId: mediaId("/foto1.jpg"),
    published: item.published,
    sortOrder: item.sortOrder,
  }))
  if (newsRows.length > 0) {
    await db.insert(schema.newsItems).values(newsRows)
  }
  console.log("  [DB] news_items")

  // History timeline
  await db.insert(schema.historyTimelineItems).values(defaultHistoryTimeline)
  console.log("  [DB] history_timeline_items")

  // Why us
  await db.insert(schema.whyUsItems).values(defaultWhyUsItems)
  console.log("  [DB] why_us_items")

  // Education highlights
  await db.insert(schema.educationHighlights).values(defaultEducationSection.highlights)
  console.log("  [DB] education_highlights")

  // Education programs
  const educationProgramRows = defaultEducationSection.programs.map((program) => ({
    id: randomUUID(),
    name: program.name,
    summary: program.summary,
    focus: program.focus,
    imageMediaId: mediaId(program.imagePath),
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
  console.log("  [DB] education_programs + points")

  // Facility highlights
  await db.insert(schema.facilityHighlights).values(defaultFacilitiesSection.highlights)
  console.log("  [DB] facility_highlights")

  // Facilities
  await db.insert(schema.facilities).values(
    defaultFacilitiesSection.items.map((item) => ({
      name: item.name,
      description: item.description,
      imageMediaId: mediaId(item.imagePath),
      iconKey: item.iconKey,
      sortOrder: item.sortOrder,
    }))
  )
  console.log("  [DB] facilities")

  // FAQ categories + items
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
  console.log("  [DB] faq_categories + items")

  // Testimonials
  await db.insert(schema.testimonials).values(
    defaultTestimonialsSection.items.map((item) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      avatarMediaId: null,
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  )
  console.log("  [DB] testimonials")

  // Gallery - alternate between foto1.jpg and foto2.jpg
  await db.insert(schema.galleryItems).values(
    defaultGallerySection.items.map((item, index) => ({
      imageMediaId: mediaId(index % 2 === 0 ? "/foto1.jpg" : "/foto2.jpg"),
      alt: item.alt,
      caption: item.caption,
      aspect: item.aspect,
      published: item.published,
      sortOrder: item.sortOrder,
    }))
  )
  console.log("  [DB] gallery_items")

  // Profile sub-tables
  if (defaultProfileSection.identityRows.length > 0) {
    await db.insert(schema.profileIdentityRows).values(defaultProfileSection.identityRows)
  }
  if (defaultProfileSection.missionItems.length > 0) {
    await db.insert(schema.profileMissionItems).values(defaultProfileSection.missionItems)
  }
  if (defaultProfileSection.goalItems.length > 0) {
    await db.insert(schema.profileGoalItems).values(defaultProfileSection.goalItems)
  }
  if (defaultProfileSection.orgRows.length > 0) {
    await db.insert(schema.profileOrgRows).values(defaultProfileSection.orgRows)
  }
  if (defaultProfileSection.programRows.length > 0) {
    await db.insert(schema.profileProgramRows).values(defaultProfileSection.programRows)
  }
  console.log("  [DB] profile sub-tables")

  // Contact sub-tables
  await db.insert(schema.contactMethods).values(defaultContactSection.methods)
  await db.insert(schema.contactLocations).values(defaultContactSection.locations)
  console.log("  [DB] contact sub-tables")

  console.log("\n=== Migration complete! ===")
  console.log(`Uploaded ${mediaMap.size} images to R2.`)
}

main()
  .catch((error) => {
    console.error("Migration failed:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await client.end()
  })
