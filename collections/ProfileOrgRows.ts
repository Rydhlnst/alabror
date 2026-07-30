import type { CollectionConfig } from "payload"

export const ProfileOrgRows: CollectionConfig = {
  slug: "profile-org",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["role", "name", "sortOrder"],
  },
  fields: [
    { name: "role", type: "text", required: true },
    { name: "name", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
