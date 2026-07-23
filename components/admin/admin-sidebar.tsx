"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ImageIcon } from "lucide-react"

import { adminNavItems } from "@/lib/cms/admin-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" isActive>
              <Link href="/admin">
                <span className="flex size-10 items-center justify-center rounded-xl overflow-hidden bg-background">
                  <img src="/logo.jpg" className="size-full object-cover" alt="Logo" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold">Ponpes CMS</span>
                  <span className="text-xs text-muted-foreground">As Salam Metro</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <form action="/admin/login" method="get">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button type="submit">
                  <span>Switch Account</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}
