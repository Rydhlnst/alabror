import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getNavigation, getSiteSettings, getPsbConfig } from "@/lib/db/queries"
import { richTextToPlainText } from "@/lib/cms/rich-text"
import { cn } from "@/lib/utils"

import "../globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteSettings()
  const plainDescription = typeof config.description === "string"
    ? config.description
    : richTextToPlainText(config.description)

  return {
    title: {
      default: `${config.shortName} | ${config.tagline}`,
      template: `%s | ${config.shortName}`,
    },
    description: plainDescription || config.tagline,
  }
}

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteConfig = await getSiteSettings()
  const navigation = await getNavigation()
  const psb = await getPsbConfig()

  return (
    <html
      lang="id"
      className={cn(
        "h-full scroll-smooth antialiased",
        plusJakartaSans.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <SiteHeader siteConfig={siteConfig} mainNav={navigation} psbConfig={psb} />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
