import type { CollectionConfig } from "payload"

export const FacilityHighlights: CollectionConfig = {
  slug: "facility-highlights",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    { name: "body", type: "richText", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
