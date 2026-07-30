import type { CollectionConfig } from "payload"

export const Facilities: CollectionConfig = {
  slug: "facilities",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "iconKey", "sortOrder"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "richText", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "iconKey", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
