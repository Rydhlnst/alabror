import type { CollectionConfig } from "payload"

export const SantriUsers: CollectionConfig = {
  slug: "santri-users",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email"],
  },
  auth: true,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, unique: true },
    { name: "phone", type: "text" },
  ],
}
