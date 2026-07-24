import { verifySantriSession, getSantriProfile, getSantriRegistration } from "@/lib/auth/santri"

export default async function DashboardPage() {
  const session = await verifySantriSession()
  const profile = await getSantriProfile(session.userId)
  const registration = await getSantriRegistration(session.userId)

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  }

  const statusLabels: Record<string, string> = {
    pending: "Menunggu Verifikasi",
    approved: "Diterima",
    rejected: "Ditolak",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Selamat datang, {profile?.name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white border border-gray-200 p-5 rounded-none">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</p>
          <div className="mt-2">
            {registration ? (
              <span className={`inline-block text-xs font-semibold px-3 py-1 border rounded-none ${statusColors[registration.status] || "bg-gray-100 text-gray-800"}`}>
                {statusLabels[registration.status] || registration.status}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Belum mendaftar</span>
            )}
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-none">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Jenjang</p>
          <p className="mt-2 text-lg font-bold text-primary">{registration?.jenjang || "-"}</p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-none">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tahun Ajaran</p>
          <p className="mt-2 text-lg font-bold text-gray-900">2026/2027</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-none">
        <h2 className="text-lg font-bold text-gray-900 font-heading mb-4">Informasi Pendaftaran</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-muted-foreground">Nama Lengkap</span>
            <span className="font-medium text-gray-900">{registration?.namaLengkap || "-"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-muted-foreground">Tempat, Tanggal Lahir</span>
            <span className="font-medium text-gray-900">{registration?.tempatLahir ? `${registration.tempatLahir}, ${registration.tanggalLahir}` : "-"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-muted-foreground">Jenis Kelamin</span>
            <span className="font-medium text-gray-900">{registration?.jenisKelamin || "-"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-muted-foreground">Alamat</span>
            <span className="font-medium text-gray-900 text-right max-w-xs">{registration?.alamat || "-"}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-muted-foreground">Nama Orang Tua</span>
            <span className="font-medium text-gray-900">{registration?.namaOrtu || "-"}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Telepon Orang Tua</span>
            <span className="font-medium text-gray-900">{registration?.teleponOrtu || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
