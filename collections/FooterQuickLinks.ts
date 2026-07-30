import type { CollectionConfig } from "payload"

export const FooterQuickLinks: CollectionConfig = {
  slug: "footer-quick-links",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "sortOrder"],
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
