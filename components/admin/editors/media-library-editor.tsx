"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Image as ImageIcon, Plus, Trash2, Loader2, Search, AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { uploadMediaAction, deleteMediaAction } from "@/app/admin/actions"

type MediaAsset = {
  id: string
  label: string
  url: string
  storageKey: string
  size: number | null
  mimeType: string | null
}

type MediaLibraryEditorProps = {
  initialAssets: MediaAsset[]
}

export function MediaLibraryEditor({ initialAssets }: MediaLibraryEditorProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets)
  const [search, setSearch] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingPreview, setPendingPreview] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    setPendingFile(file)
    setPendingPreview(preview)
    setShowConfirm(true)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleConfirmUpload() {
    if (!pendingFile) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", pendingFile)

    const promise = uploadMediaAction(formData).then((newAsset) => {
      if (newAsset) {
        setAssets([newAsset as MediaAsset, ...assets])
      }
    })

    toast.promise(promise, {
      loading: "Mengunggah file...",
      success: "File berhasil diunggah",
      error: "Gagal mengunggah file",
    })

    try {
      await promise
      setShowConfirm(false)
      setPendingFile(null)
      if (pendingPreview) URL.revokeObjectURL(pendingPreview)
      setPendingPreview(null)
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  function handleCancelUpload() {
    setShowConfirm(false)
    setPendingFile(null)
    if (pendingPreview) URL.revokeObjectURL(pendingPreview)
    setPendingPreview(null)
  }

  async function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus media ini? Gambar yang digunakan di halaman web akan hilang.")) return

    const promise = deleteMediaAction(id).then(() => {
      setAssets(assets.filter((a) => a.id !== id))
    })

    toast.promise(promise, {
      loading: "Menghapus media...",
      success: "Media berhasil dihapus",
      error: "Gagal menghapus media",
    })
  }

  const filteredAssets = assets.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Pustaka Media</h2>
          <p className="text-sm text-muted-foreground">
            Kelola berkas gambar yang digunakan pada konten website Pondok Pesantren.
          </p>
        </div>

        <Label className="flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-primary text-primary-foreground hover:opacity-95 text-sm font-medium cursor-pointer transition-colors shrink-0">
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          <span>Unggah Gambar</span>
          <input
            type="file"
            accept="image/*,.heic,.heif,.webp,.png,.jpg,.jpeg,.gif,.bmp,.tiff,.svg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </Label>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari gambar..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-muted/20">
        {filteredAssets.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="size-12" />
            <p className="text-sm">Tidak ada gambar ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="group relative overflow-hidden bg-background border hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <Image
                      src={asset.url}
                      alt={asset.label}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 150px, 120px"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="size-9 rounded-full shadow-lg"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-2 border-t">
                    <p className="text-xs font-medium truncate text-foreground" title={asset.label}>
                      {asset.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showConfirm} onOpenChange={(open) => { if (!open) handleCancelUpload() }}>
        <DialogContent className="max-w-lg w-[90vw] max-h-[90dvh] flex flex-col p-6">
          <DialogHeader>
            <DialogTitle>Konfirmasi Unggah Gambar</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 py-4">
            <div className="relative aspect-video w-full rounded-md overflow-hidden border bg-muted flex items-center justify-center">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <p className="text-xs text-muted-foreground">Mengunggah ke R2...</p>
                </div>
              ) : pendingPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pendingPreview}
                  alt="Preview gambar"
                  className="w-full h-full object-contain"
                />
              ) : (
                <ImageIcon className="size-10 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{pendingFile?.name}</p>
              <p className="text-xs text-muted-foreground">
                {pendingFile ? `${(pendingFile.size / 1024).toFixed(1)} KB` : ""}
              </p>
              {pendingFile && pendingFile.name.toLowerCase().endsWith(".heic") && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  Format HEIC akan dikonversi ke WebP
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleCancelUpload} disabled={isUploading}>
              Batal
            </Button>
            <Button type="button" onClick={handleConfirmUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" /> Mengunggah...
                </>
              ) : (
                "Unggah Sekarang"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
