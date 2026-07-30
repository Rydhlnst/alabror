import type { CollectionConfig } from "payload"

export const ProfileIdentityRows: CollectionConfig = {
  slug: "profile-identity",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "value", "sortOrder"],
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "value", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
