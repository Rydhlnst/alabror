import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { verifySantriSession, getSantriProfile } from "@/lib/auth/santri"
import { logoutAction } from "./actions"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySantriSession()
  const profile = await getSantriProfile(session.userId)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="site-shell flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Al-Abror" width={40} height={40} className="object-contain" />
            <div>
              <p className="font-heading text-sm font-bold text-gray-900">Al-Abror</p>
              <p className="text-[10px] text-gray-500">Dashboard Santri</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{profile?.name}</p>
              <p className="text-xs text-gray-500">{profile?.email}</p>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="text-xs text-gray-500 hover:text-destructive transition-colors px-3 py-2 border border-gray-200 hover:border-destructive/30 rounded-none">
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="site-shell py-6 flex-1">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="bg-white border border-gray-200 p-4 space-y-1">
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-[10px] font-bold">D</span>
                Dashboard
              </Link>
              <Link href="/dashboard/profil" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-[10px] font-bold">P</span>
                Profil Saya
              </Link>
              <Link href="/dashboard/status" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-[10px] font-bold">S</span>
                Status Pendaftaran
              </Link>
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
