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
import { updateContactPageAction } from "@/app/admin/actions"

type ContactEditorProps = {
  contact: any
}

export function ContactEditor({ contact }: ContactEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const promise = updateContactPageAction(formData)

    toast.promise(promise, {
      loading: "Memperbarui Halaman Kontak...",
      success: "Halaman Kontak berhasil diperbarui",
      error: "Gagal memperbarui Halaman Kontak",
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
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan Halaman Kontak</h2>
        <p className="text-sm text-muted-foreground">
          Kelola judul halaman, deskripsi kontak, serta petunjuk navigasi lokasi di Halaman Kontak.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Konten Kontak Utama</CardTitle>
            <CardDescription>Ubah teks judul utama dan deskripsi info kontak.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="pageTitle">Judul Halaman</Label>
              <Input
                id="pageTitle"
                name="pageTitle"
                defaultValue={contact.pageTitle}
                required
              />
            </div>

            <RichTextEditor
              name="pageDescription"
              label="Deskripsi Pengantar Halaman"
              value={contact.pageDescription}
              placeholder="Tulis deskripsi pengantar halaman kontak..."
            />

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold">Bagian Hubungi Kami</h3>
              <div className="grid gap-2">
                <Label htmlFor="infoTitle">Judul Info Kontak</Label>
                <Input
                  id="infoTitle"
                  name="infoTitle"
                  defaultValue={contact.infoTitle}
                  required
                />
              </div>
              <RichTextEditor
                name="infoDescription"
                label="Deskripsi Info Kontak"
                value={contact.infoDescription}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold">Bagian Lokasi & Peta</h3>
              <div className="grid gap-2">
                <Label htmlFor="locationTitle">Judul Lokasi Peta</Label>
                <Input
                  id="locationTitle"
                  name="locationTitle"
                  defaultValue={contact.locationTitle}
                  required
                />
              </div>
              <RichTextEditor
                name="locationDescription"
                label="Deskripsi Lokasi Peta"
                value={contact.locationDescription}
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
