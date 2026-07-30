import type { CollectionConfig } from "payload"

export const FaqItems: CollectionConfig = {
  slug: "faq-items",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category", "sortOrder"],
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "richText", required: true },
    {
      name: "category",
      type: "relationship",
      relationTo: "faq-categories",
      required: true,
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
  defaultSort: "sortOrder",
}
