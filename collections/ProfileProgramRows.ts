import type { CollectionConfig } from "payload"

export const ProfileProgramRows: CollectionConfig = {
  slug: "profile-programs",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "iconKey", "sortOrder"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "iconKey", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
