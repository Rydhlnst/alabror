"use client"

import { useState } from "react"
import Image from "next/image"
import { Image as ImageIcon, Plus, Search, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getMediaAssetsAction, uploadMediaAction } from "@/app/admin/actions"

type MediaAsset = {
  id: string
  label: string
  url: string
  storageKey: string
  kind: string
}

type MediaPickerProps = {
  name: string
  label?: string
  value: string | null // media ID
  initialUrl?: string | null // media URL
  placeholder?: string
}

export function MediaPicker({
  name,
  label,
  value,
  initialUrl,
  placeholder = "Pilih gambar dari pustaka media",
}: MediaPickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(value)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl || null)
  const [isOpen, setIsOpen] = useState(false)
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  async function loadAssets() {
    setIsLoading(true)
    try {
      const data = await getMediaAssetsAction()
      setAssets(data as MediaAsset[])
    } catch (err) {
      console.error(err)
      toast.error("Gagal memuat pustaka media")
    } finally {
      setIsLoading(false)
    }
  }



  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const newAsset = await uploadMediaAction(formData)
      if (newAsset) {
        toast.success("File berhasil diunggah")
        // Reload list and select new asset
        await loadAssets()
        setSelectedId(newAsset.id)
        setPreviewUrl(newAsset.url)
        setIsOpen(false)
      }
    } catch (err) {
      console.error(err)
      toast.error("Gagal mengunggah file")
    } finally {
      setIsUploading(false)
    }
  }

  function handleSelect(asset: MediaAsset) {
    setSelectedId(asset.id)
    setPreviewUrl(asset.url)
    setIsOpen(false)
  }

  function handleClear() {
    setSelectedId(null)
    setPreviewUrl(null)
  }

  const filteredAssets = assets.filter((asset) =>
    asset.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-2">
      {label ? <Label>{label}</Label> : null}
      
      <div className="flex items-center gap-4 rounded-lg border border-input p-3 bg-background">
        <div className="relative flex size-16 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted overflow-hidden">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <ImageIcon className="size-6 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <p className="text-sm text-muted-foreground truncate">
            {previewUrl ? previewUrl : placeholder}
          </p>
          <div className="flex gap-2">
            <Dialog open={isOpen} onOpenChange={(open) => {
              setIsOpen(open)
              if (open) {
                loadAssets()
              }
            }}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  {previewUrl ? "Ganti Gambar" : "Pilih Gambar"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[90vw] h-[80vh] flex flex-col p-6">
                <DialogHeader>
                  <DialogTitle>Pustaka Media</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-between gap-4 mt-2 mb-4 shrink-0">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari media..."
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <Label className="flex items-center justify-center gap-2 h-9 px-4 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium cursor-pointer transition-colors">
                    {isUploading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                    <span>Unggah Baru</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </Label>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0 border rounded-md p-4 bg-muted/20">
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <Loader2 className="size-8 animate-spin text-primary" />
                    </div>
                  ) : filteredAssets.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ImageIcon className="size-10" />
                      <p className="text-sm">Tidak ada gambar ditemukan</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {filteredAssets.map((asset) => (
                        <div
                          key={asset.id}
                          onClick={() => handleSelect(asset)}
                          className={`relative aspect-square cursor-pointer rounded-lg border-2 overflow-hidden bg-background hover:opacity-90 transition-all ${
                            selectedId === asset.id ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                          }`}
                        >
                          <Image
                            src={asset.url}
                            alt={asset.label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 150px, 120px"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5">
                            <p className="text-[10px] text-white truncate font-medium">
                              {asset.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {previewUrl ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-destructive hover:bg-destructive/10"
              >
                <X className="size-4 mr-1" /> Hapus
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <input type="hidden" name={name} value={selectedId || ""} />
    </div>
  )
}
