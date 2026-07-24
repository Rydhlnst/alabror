import { verifySantriSession, getSantriProfile } from "@/lib/auth/santri"

export default async function ProfilPage() {
  const session = await verifySantriSession()
  const profile = await getSantriProfile(session.userId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Profil Saya</h1>
        <p className="text-sm text-muted-foreground">Informasi akun Anda</p>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-none">
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Nama</span>
            <span className="text-sm font-medium text-gray-900">{profile?.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-gray-900">{profile?.email}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-muted-foreground">No. Telepon</span>
            <span className="text-sm font-medium text-gray-900">{profile?.phone || "-"}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-sm text-muted-foreground">Terdaftar Sejak</span>
            <span className="text-sm font-medium text-gray-900">
              {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
