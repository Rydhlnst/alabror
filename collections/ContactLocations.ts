import type { CollectionConfig } from "payload"

export const ContactLocations: CollectionConfig = {
  slug: "contact-locations",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "subtitle", "sortOrder"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "text", required: true },
    { name: "address", type: "richText", required: true },
    { name: "mapEmbedUrl", type: "text" },
    { name: "mapHref", type: "text" },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
