import path from "path"
import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "label",
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/*", "video/*"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
    ],
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
