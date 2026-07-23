"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { updateFooterAction } from "@/app/admin/actions"

type FooterEditorProps = {
  footer: any
}

export function FooterEditor({ footer }: FooterEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const promise = updateFooterAction(formData)

    toast.promise(promise, {
      loading: "Memperbarui Pengaturan Footer...",
      success: "Pengaturan Footer berhasil diperbarui",
      error: "Gagal memperbarui Pengaturan Footer",
    })

    try {
      await promise
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan Footer</h2>
        <p className="text-sm text-muted-foreground">
          Kelola teks deskripsi brand, pengantar sosial media, dan hak cipta di bagian bawah seluruh halaman.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Konten Footer</CardTitle>
            <CardDescription>Ubah teks copyright, pengantar sosial media, dan teks promosi brand.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <RichTextEditor
              name="brandText"
              label="Teks Deskripsi Brand (Kiri)"
              value={footer.brandText}
              placeholder="Tulis deskripsi brand untuk bagian kiri bawah..."
            />
            
            <RichTextEditor
              name="socialIntro"
              label="Teks Pengantar Sosial Media (Kanan)"
              value={footer.socialIntro}
              placeholder="Tulis ajakan ikuti media sosial kami..."
            />

            <div className="grid gap-2">
              <Label htmlFor="copyrightText">Teks Hak Cipta (Copyright)</Label>
              <Input
                id="copyrightText"
                name="copyrightText"
                defaultValue={footer.copyrightText}
                placeholder="Contoh: © 2026 Pondok Pesantren As Salam Metro. Hak Cipta Dilindungi."
                required
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting} className="w-full lg:w-48 self-end">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" /> Menyimpan...
            </>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </form>
    </div>
  )
}
