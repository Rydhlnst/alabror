import type { CollectionConfig } from "payload"

export const HistoryTimeline: CollectionConfig = {
  slug: "history-timeline",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["year", "title", "sortOrder"],
  },
  fields: [
    { name: "year", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText" },
    { name: "color", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
