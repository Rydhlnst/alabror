import { verifySantriSession, getSantriRegistration } from "@/lib/auth/santri"

export default async function StatusPage() {
  const session = await verifySantriSession()
  const registration = await getSantriRegistration(session.userId)

  const statusConfig: Record<string, { label: string; color: string; description: string }> = {
    pending: {
      label: "Menunggu Verifikasi",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
      description: "Pendaftaran Anda sedang dalam proses verifikasi oleh admin. Silakan tunggu konfirmasi lebih lanjut.",
    },
    approved: {
      label: "Diterima",
      color: "bg-green-50 border-green-200 text-green-800",
      description: "Selamat! Pendaftaran Anda telah diterima. Silakan hubungi pondok untuk informasi lebih lanjut.",
    },
    rejected: {
      label: "Ditolak",
      color: "bg-red-50 border-red-200 text-red-800",
      description: "Maaf, pendaftaran Anda belum dapat diterima. Silakan hubungi kami untuk informasi lebih lanjut.",
    },
  }

  const status = registration ? (statusConfig[registration.status] || statusConfig.pending) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Status Pendaftaran</h1>
        <p className="text-sm text-muted-foreground">Pantau status pendaftaran Anda</p>
      </div>

      {!registration ? (
        <div className="bg-white border border-gray-200 p-8 rounded-none text-center">
          <p className="text-muted-foreground">Anda belum melakukan pendaftaran.</p>
        </div>
      ) : (
        <>
          <div className={`border p-6 rounded-none ${status?.color}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
              <h2 className="text-lg font-bold font-heading">{status?.label}</h2>
            </div>
            <p className="text-sm opacity-80">{status?.description}</p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-none">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Detail Pendaftaran</h3>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Jenjang</span>
                <span className="font-medium">{registration.jenjang}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Tanggal Daftar</span>
                <span className="font-medium">
                  {new Date(registration.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Nama Lengkap</span>
                <span className="font-medium">{registration.namaLengkap}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Tempat, Tanggal Lahir</span>
                <span className="font-medium">{registration.tempatLahir}, {registration.tanggalLahir}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
