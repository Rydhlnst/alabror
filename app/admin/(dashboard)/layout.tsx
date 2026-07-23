import type { ReactNode } from "react"

import { verifyAdminSession } from "@/lib/auth/admin"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await verifyAdminSession()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
