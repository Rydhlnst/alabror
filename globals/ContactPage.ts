import type { GlobalConfig } from "payload"

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  admin: { group: "Pages" },
  fields: [
    { name: "pageTitle", type: "text", required: true },
    { name: "pageDescription", type: "richText" },
    { name: "infoTitle", type: "text", required: true },
    { name: "infoDescription", type: "richText" },
    { name: "locationTitle", type: "text", required: true },
    { name: "locationDescription", type: "richText" },
  ],
}
