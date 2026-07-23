import Link from "next/link"

import { adminNavItems } from "@/lib/cms/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">CMS Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage the sections that power the public Ponpes website.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminNavItems.slice(1).map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full transition-colors hover:border-primary/40 flex items-center justify-between p-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-base font-semibold">
                  <item.icon className="size-5 text-primary" />
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs">Kelola konten bagian ini.</CardDescription>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
