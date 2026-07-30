import type { GlobalConfig } from "payload"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Site Config" },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "shortName", type: "text", required: true },
    { name: "tagline", type: "text", required: true },
    { name: "description", type: "richText" },
    { name: "whatsapp", type: "text", required: true },
    { name: "whatsappLabel", type: "text", required: true },
    { name: "brochureHref", type: "text", required: true },
    { name: "mapHref", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "address", type: "textarea", required: true },
    { name: "email", type: "email", required: true },
    { name: "officeHours", type: "text", required: true },
    { name: "metadataTitle", type: "text" },
    { name: "metadataDescription", type: "textarea" },
  ],
}
