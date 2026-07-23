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
import { updateProfilePageAction } from "@/app/admin/actions"

type ProfileEditorProps = {
  profile: any
}

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const promise = updateProfilePageAction(formData)

    toast.promise(promise, {
      loading: "Memperbarui Halaman Profil...",
      success: "Halaman Profil berhasil diperbarui",
      error: "Gagal memperbarui Halaman Profil",
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
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan Halaman Profil</h2>
        <p className="text-sm text-muted-foreground">
          Kelola judul halaman, deskripsi pengantar profil, dan pernyataan visi pondok pesantren.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Konten Profil Utama</CardTitle>
            <CardDescription>Ubah teks judul utama dan visi misi utama pesantren.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="pageTitle">Judul Halaman</Label>
              <Input
                id="pageTitle"
                name="pageTitle"
                defaultValue={profile.pageTitle}
                required
              />
            </div>

            <RichTextEditor
              name="pageDescription"
              label="Deskripsi Pengantar Halaman"
              value={profile.pageDescription}
              placeholder="Tulis deskripsi pengantar profil halaman..."
            />

            <RichTextEditor
              name="vision"
              label="Pernyataan Visi Lembaga"
              value={profile.vision}
              placeholder="Tulis pernyataan visi pesantren..."
            />
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
