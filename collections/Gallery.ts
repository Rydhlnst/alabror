import type { CollectionConfig } from "payload"

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["alt", "aspect", "published", "sortOrder"],
  },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "richText" },
    {
      name: "aspect",
      type: "select",
      options: [
        { label: "Landscape", value: "landscape" },
        { label: "Portrait", value: "portrait" },
        { label: "Square", value: "square" },
      ],
      defaultValue: "landscape",
      required: true,
    },
    { name: "published", type: "checkbox", defaultValue: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
