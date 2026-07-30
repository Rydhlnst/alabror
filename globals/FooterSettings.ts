import type { GlobalConfig } from "payload"

export const FooterSettings: GlobalConfig = {
  slug: "footer-settings",
  admin: { group: "Site Config" },
  fields: [
    { name: "brandText", type: "richText" },
    { name: "socialIntro", type: "richText" },
    { name: "copyrightText", type: "text", required: true },
  ],
}
