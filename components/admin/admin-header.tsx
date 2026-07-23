import Link from "next/link"

import { logoutAction } from "@/app/admin/logout-action"
import { adminNavItems } from "@/lib/cms/admin-nav"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AdminHeader({ slug }: { slug?: string }) {
  const current =
    adminNavItems.find((item) => item.href === `/admin/${slug ?? ""}`) ??
    adminNavItems.find((item) => item.href === "/admin")

  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">CMS</span>
          <h1 className="text-base font-semibold text-foreground">{current?.title ?? "Dashboard"}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" target="_blank">View Site</Link>
        </Button>
        <form action={logoutAction}>
          <Button variant="ghost" size="sm" type="submit">Logout</Button>
        </form>
      </div>
    </header>
  )
}
