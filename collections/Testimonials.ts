import type { CollectionConfig } from "payload"

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "published", "sortOrder"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "quote", type: "richText", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "published", type: "checkbox", defaultValue: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
