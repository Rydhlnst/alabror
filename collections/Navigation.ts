import type { CollectionConfig } from "payload"

export const Navigation: CollectionConfig = {
  slug: "navigation",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "sortOrder"],
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "openInNewTab", type: "checkbox", defaultValue: false },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
