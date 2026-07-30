import type { GlobalConfig } from "payload"

export const HomepageSections: GlobalConfig = {
  slug: "homepage",
  admin: { group: "Pages" },
  fields: [
    { name: "heroBadge", type: "text", required: true },
    { name: "heroTitle", type: "text", required: true },
    { name: "heroDescription", type: "richText" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "primaryCtaLabel", type: "text", required: true },
    { name: "primaryCtaHref", type: "text", required: true },
    { name: "secondaryCtaLabel", type: "text", required: true },
    { name: "secondaryCtaHref", type: "text", required: true },

    { name: "newsTitle", type: "text", required: true },
    { name: "newsDescription", type: "richText" },

    { name: "partnersTitle", type: "text", required: true },
    { name: "partnersDescription", type: "richText" },

    { name: "historyTitle", type: "text", required: true },
    { name: "historyDescription", type: "richText" },

    { name: "whyUsTitle", type: "text", required: true },
    { name: "whyUsDescription", type: "richText" },

    { name: "educationTitle", type: "text", required: true },
    { name: "educationDescription", type: "richText" },

    { name: "facilitiesTitle", type: "text", required: true },
    { name: "facilitiesDescription", type: "richText" },

    { name: "faqTitle", type: "text", required: true },
    { name: "faqDescription", type: "richText" },
    { name: "faqImage", type: "upload", relationTo: "media" },

    { name: "testimonialsTitle", type: "text", required: true },
    { name: "testimonialsDescription", type: "richText" },

    { name: "bottomCtaTitle", type: "text", required: true },
    { name: "bottomCtaDescription", type: "richText" },
    { name: "bottomCtaLabel", type: "text", required: true },
    { name: "bottomCtaHref", type: "text", required: true },
  ],
}
