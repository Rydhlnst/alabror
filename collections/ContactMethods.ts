import type { CollectionConfig } from "payload"

export const ContactMethods: CollectionConfig = {
  slug: "contact-methods",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "sortOrder"],
  },
  fields: [
    { name: "type", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "text", required: true },
    { name: "description", type: "richText", required: true },
    { name: "value", type: "text", required: true },
    { name: "actionLabel", type: "text", required: true },
    { name: "actionHref", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
