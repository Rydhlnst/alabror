import type { CollectionConfig } from "payload"

export const FooterSocialLinks: CollectionConfig = {
  slug: "footer-social-links",
  admin: {
    useAsTitle: "platform",
    defaultColumns: ["platform", "href", "sortOrder"],
  },
  fields: [
    { name: "platform", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
