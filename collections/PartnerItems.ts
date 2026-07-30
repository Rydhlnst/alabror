import type { CollectionConfig } from "payload"

export const PartnerItems: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "note", "sortOrder"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "note", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "href", type: "text" },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
