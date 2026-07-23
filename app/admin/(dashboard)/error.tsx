"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[Admin Dashboard Error]", error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h2 className="text-xl font-semibold">Terjadi Kesalahan</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Halaman admin tidak dapat dimuat. Silakan coba lagi atau kembali ke halaman login.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Coba Lagi
        </button>
        <Link
          href="/admin/login"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Login Ulang
        </Link>
      </div>
    </div>
  )
}
