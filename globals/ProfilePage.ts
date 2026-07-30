import type { GlobalConfig } from "payload"

export const ProfilePage: GlobalConfig = {
  slug: "profile-page",
  admin: { group: "Pages" },
  fields: [
    { name: "pageTitle", type: "text", required: true },
    { name: "pageDescription", type: "richText" },
    { name: "vision", type: "richText" },
  ],
}
