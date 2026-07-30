import type { CollectionConfig } from "payload"

export const WhyUsItems: CollectionConfig = {
  slug: "why-us",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "iconKey", "sortOrder"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText" },
    { name: "iconKey", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
