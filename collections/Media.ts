import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "label",
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "alt", type: "text" },
    {
      name: "kind",
      type: "select",
      options: [
        { label: "Image", value: "image" },
        { label: "Video", value: "video" },
      ],
      defaultValue: "image",
    },
  ],
}
