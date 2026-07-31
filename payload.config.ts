import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"

// sharp is optional — libvips may not be present in all deployment environments
let sharp: Awaited<typeof import("sharp")>["default"] | undefined
try {
  sharp = (await import("sharp")).default
} catch {
  // image resizing disabled; uploads still work via S3
}
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"

import { Navigation } from "./collections/Navigation"
import { Media } from "./collections/Media"
import { HeroStats } from "./collections/HeroStats"
import { FooterQuickLinks } from "./collections/FooterQuickLinks"
import { FooterSocialLinks } from "./collections/FooterSocialLinks"
import { NewsItems } from "./collections/NewsItems"
import { PartnerItems } from "./collections/PartnerItems"
import { HistoryTimeline } from "./collections/HistoryTimeline"
import { WhyUsItems } from "./collections/WhyUsItems"
import { EducationHighlights } from "./collections/EducationHighlights"
import { EducationPrograms } from "./collections/EducationPrograms"
import { FacilityHighlights } from "./collections/FacilityHighlights"
import { Facilities } from "./collections/Facilities"
import { FaqCategories } from "./collections/FaqCategories"
import { FaqItems } from "./collections/FaqItems"
import { Testimonials } from "./collections/Testimonials"
import { Gallery } from "./collections/Gallery"
import { ProfileIdentityRows } from "./collections/ProfileIdentityRows"
import { ProfileMissionItems } from "./collections/ProfileMissionItems"
import { ProfileGoalItems } from "./collections/ProfileGoalItems"
import { ProfileOrgRows } from "./collections/ProfileOrgRows"
import { ProfileProgramRows } from "./collections/ProfileProgramRows"
import { ContactMethods } from "./collections/ContactMethods"
import { ContactLocations } from "./collections/ContactLocations"
import { Admins } from "./collections/Admins"
import { SantriUsers } from "./collections/SantriUsers"
import { SantriRegistrations } from "./collections/SantriRegistrations"

import { SiteSettings } from "./globals/SiteSettings"
import { FooterSettings } from "./globals/FooterSettings"
import { HomepageSections } from "./globals/HomepageSections"
import { ProfilePage } from "./globals/ProfilePage"
import { ContactPage } from "./globals/ContactPage"

export default buildConfig({
  admin: {
    user: "admins",
    importMap: {
      baseDir: "./app/(payload)",
      importMapFile: "./app/(payload)/admin/importMap.js",
    },
  },

  editor: lexicalEditor({}),

  collections: [
    Admins,
    Navigation,
    Media,
    HeroStats,
    FooterQuickLinks,
    FooterSocialLinks,
    NewsItems,
    PartnerItems,
    HistoryTimeline,
    WhyUsItems,
    EducationHighlights,
    EducationPrograms,
    FacilityHighlights,
    Facilities,
    FaqCategories,
    FaqItems,
    Testimonials,
    Gallery,
    ProfileIdentityRows,
    ProfileMissionItems,
    ProfileGoalItems,
    ProfileOrgRows,
    ProfileProgramRows,
    ContactMethods,
    ContactLocations,
    SantriUsers,
    SantriRegistrations,
  ],

  globals: [
    SiteSettings,
    FooterSettings,
    HomepageSections,
    ProfilePage,
    ContactPage,
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: process.env.NODE_ENV === "development",
  }),

  plugins: [
    s3Storage({
      collections: { media: { prefix: "media" } },
      bucket: process.env.R2_BUCKET_NAME || "",
      config: {
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: "auto",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],

  sharp,

  secret: process.env.SESSION_SECRET || "payload-secret-change-me",

  typescript: {
    outputFile: "./payload-types.ts",
  },
})
