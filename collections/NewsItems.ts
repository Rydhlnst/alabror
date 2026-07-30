import type { CollectionConfig } from "payload"

export const NewsItems: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "dateLabel", "category", "published", "sortOrder"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "dateLabel", type: "text", required: true },
    { name: "category", type: "text" },
    { name: "summary", type: "richText" },
    { name: "href", type: "text", required: true },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "published", type: "checkbox", defaultValue: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
