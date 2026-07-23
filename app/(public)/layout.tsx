import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getNavigation, getSiteSettings, getPsbConfig } from "@/lib/db/queries"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteConfig = await getSiteSettings()
  const navigation = await getNavigation()
  const psb = await getPsbConfig()

  return (
    <>
      <SiteHeader siteConfig={siteConfig} mainNav={navigation} psbConfig={psb} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  )
}
