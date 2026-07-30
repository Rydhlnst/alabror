import type { CollectionConfig } from "payload"

export const HeroStats: CollectionConfig = {
  slug: "hero-stats",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["value", "label", "sortOrder"],
  },
  fields: [
    { name: "value", type: "text", required: true },
    { name: "label", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
