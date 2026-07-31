import type { CollectionConfig } from "payload"

export const Admins: CollectionConfig = {
  slug: "admins",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name"],
  },
  auth: true,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true, unique: true },
  ],
}
