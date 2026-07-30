import type { CollectionConfig } from "payload"

export const EducationPrograms: CollectionConfig = {
  slug: "education-programs",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "iconKey", "sortOrder"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "summary", type: "richText", required: true },
    { name: "focus", type: "richText", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "iconKey", type: "text", required: true },
    { name: "homePrimaryLabel", type: "text", defaultValue: "Lihat Detail" },
    { name: "homePrimaryHref", type: "text", defaultValue: "/pendidikan" },
    { name: "homeSecondaryLabel", type: "text" },
    { name: "homeSecondaryHref", type: "text" },
    {
      name: "points",
      type: "array",
      fields: [
        { name: "body", type: "richText", required: true },
        { name: "sortOrder", type: "number", defaultValue: 0 },
      ],
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
