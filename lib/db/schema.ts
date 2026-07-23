import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

const createdAt = timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
const updatedAt = timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
const singletonId = text("id").primaryKey()

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  alt: text("alt"),
  kind: text("kind").notNull().default("image"),
  storageKey: text("storage_key").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type"),
  size: integer("size"),
  width: integer("width"),
  height: integer("height"),
  createdAt,
  updatedAt,
})

export const siteSettings = pgTable("site_settings", {
  id: singletonId,
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  tagline: text("tagline").notNull(),
  description: jsonb("description").notNull(),
  whatsapp: text("whatsapp").notNull(),
  whatsappLabel: text("whatsapp_label").notNull(),
  brochureHref: text("brochure_href").notNull(),
  mapHref: text("map_href").notNull(),
  logoMediaId: uuid("logo_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  address: text("address").notNull(),
  email: text("email").notNull(),
  officeHours: text("office_hours").notNull(),
  metadataTitle: text("metadata_title"),
  metadataDescription: text("metadata_description"),
  createdAt,
  updatedAt,
})

export const footerSettings = pgTable("footer_settings", {
  id: singletonId,
  brandText: jsonb("brand_text").notNull(),
  socialIntro: jsonb("social_intro").notNull(),
  copyrightText: text("copyright_text").notNull(),
  createdAt,
  updatedAt,
})

export const homepageSections = pgTable("homepage_sections", {
  id: singletonId,
  heroBadge: text("hero_badge").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: jsonb("hero_description").notNull(),
  heroImageMediaId: uuid("hero_image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  primaryCtaLabel: text("primary_cta_label").notNull(),
  primaryCtaHref: text("primary_cta_href").notNull(),
  secondaryCtaLabel: text("secondary_cta_label").notNull(),
  secondaryCtaHref: text("secondary_cta_href").notNull(),
  newsTitle: text("news_title").notNull(),
  newsDescription: jsonb("news_description").notNull(),
  partnersTitle: text("partners_title").notNull(),
  partnersDescription: jsonb("partners_description").notNull(),
  historyTitle: text("history_title").notNull(),
  historyDescription: jsonb("history_description").notNull(),
  whyUsTitle: text("why_us_title").notNull(),
  whyUsDescription: jsonb("why_us_description").notNull(),
  educationTitle: text("education_title").notNull(),
  educationDescription: jsonb("education_description").notNull(),
  facilitiesTitle: text("facilities_title").notNull(),
  facilitiesDescription: jsonb("facilities_description").notNull(),
  faqTitle: text("faq_title").notNull(),
  faqDescription: jsonb("faq_description").notNull(),
  faqImageMediaId: uuid("faq_image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  testimonialsTitle: text("testimonials_title").notNull(),
  testimonialsDescription: jsonb("testimonials_description").notNull(),
  bottomCtaTitle: text("bottom_cta_title").notNull(),
  bottomCtaDescription: jsonb("bottom_cta_description").notNull(),
  bottomCtaLabel: text("bottom_cta_label").notNull(),
  bottomCtaHref: text("bottom_cta_href").notNull(),
  createdAt,
  updatedAt,
})

export const profilePage = pgTable("profile_page", {
  id: singletonId,
  pageTitle: text("page_title").notNull(),
  pageDescription: jsonb("page_description").notNull(),
  vision: jsonb("vision").notNull(),
  createdAt,
  updatedAt,
})

export const contactPage = pgTable("contact_page", {
  id: singletonId,
  pageTitle: text("page_title").notNull(),
  pageDescription: jsonb("page_description").notNull(),
  infoTitle: text("info_title").notNull(),
  infoDescription: jsonb("info_description").notNull(),
  locationTitle: text("location_title").notNull(),
  locationDescription: jsonb("location_description").notNull(),
  createdAt,
  updatedAt,
})

export const navigationItems = pgTable("navigation_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  openInNewTab: boolean("open_in_new_tab").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const footerQuickLinks = pgTable("footer_quick_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const footerSocialLinks = pgTable("footer_social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  platform: text("platform").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const heroStats = pgTable("hero_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const partnerItems = pgTable("partner_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  note: text("note").notNull(),
  logoMediaId: uuid("logo_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  href: text("href"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const newsItems = pgTable("news_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  dateLabel: text("date_label").notNull(),
  category: text("category"),
  summary: jsonb("summary").notNull(),
  href: text("href").notNull(),
  coverMediaId: uuid("cover_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  published: boolean("published").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const historyTimelineItems = pgTable("history_timeline_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: jsonb("description").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const whyUsItems = pgTable("why_us_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: jsonb("description").notNull(),
  iconKey: text("icon_key").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const educationHighlights = pgTable("education_highlights", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: jsonb("body").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const educationPrograms = pgTable("education_programs", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  summary: jsonb("summary").notNull(),
  focus: jsonb("focus").notNull(),
  imageMediaId: uuid("image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  iconKey: text("icon_key").notNull(),
  homePrimaryLabel: text("home_primary_label").notNull().default("Lihat Detail"),
  homePrimaryHref: text("home_primary_href").notNull().default("/pendidikan"),
  homeSecondaryLabel: text("home_secondary_label"),
  homeSecondaryHref: text("home_secondary_href"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const educationProgramPoints = pgTable("education_program_points", {
  id: uuid("id").defaultRandom().primaryKey(),
  programId: uuid("program_id").notNull().references(() => educationPrograms.id, { onDelete: "cascade" }),
  body: jsonb("body").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const facilityHighlights = pgTable("facility_highlights", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: jsonb("body").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const facilities = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: jsonb("description").notNull(),
  imageMediaId: uuid("image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  iconKey: text("icon_key").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const faqCategories = pgTable("faq_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  iconKey: text("icon_key").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const faqItems = pgTable("faq_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").notNull().references(() => faqCategories.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: jsonb("answer").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: jsonb("quote").notNull(),
  avatarMediaId: uuid("avatar_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  published: boolean("published").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const galleryItems = pgTable("gallery_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  imageMediaId: uuid("image_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  alt: text("alt").notNull(),
  caption: jsonb("caption"),
  aspect: text("aspect").notNull(),
  published: boolean("published").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const profileIdentityRows = pgTable("profile_identity_rows", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const profileMissionItems = pgTable("profile_mission_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: jsonb("body").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const profileGoalItems = pgTable("profile_goal_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: jsonb("body").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const profileOrgRows = pgTable("profile_org_rows", {
  id: uuid("id").defaultRandom().primaryKey(),
  role: text("role").notNull(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const profileProgramRows = pgTable("profile_program_rows", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  iconKey: text("icon_key").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const contactMethods = pgTable("contact_methods", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: jsonb("description").notNull(),
  value: text("value").notNull(),
  actionLabel: text("action_label").notNull(),
  actionHref: text("action_href").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})

export const contactLocations = pgTable("contact_locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  address: jsonb("address").notNull(),
  mapEmbedUrl: text("map_embed_url"),
  mapHref: text("map_href"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt,
  updatedAt,
})
