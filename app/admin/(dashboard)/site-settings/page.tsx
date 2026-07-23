import { eq } from "drizzle-orm"

import { SiteSettingsEditor } from "@/components/admin/editors/site-settings-editor"
import { richTextParagraph } from "@/lib/cms/rich-text"
import { getDb, schema } from "@/lib/db"
import { getSiteSettings } from "@/lib/db/queries"

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettings()
  const db = getDb()
  const [record] = db
    ? await db
        .select({ logoMediaId: schema.siteSettings.logoMediaId })
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.id, "site"))
        .limit(1)
    : []

  const descriptionValue =
    typeof settings.description === "string"
      ? richTextParagraph(settings.description)
      : settings.description

  const settingsWithRichText = {
    ...settings,
    description: descriptionValue
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan Website (Site Settings)</h2>
        <p className="text-sm text-muted-foreground">
          Kelola informasi identitas global, informasi kontak, berkas brosur, dan data SEO website.
        </p>
      </div>

      <SiteSettingsEditor 
        settings={settingsWithRichText} 
        initialLogoMediaId={record?.logoMediaId ?? null} 
      />
    </div>
  )
}
