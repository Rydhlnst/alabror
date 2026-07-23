"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { MediaPicker } from "@/components/admin/media-picker"
import { updateSiteSettingsAction } from "@/app/admin/actions"

type SiteSettingsEditorProps = {
  settings: any
  initialLogoMediaId: string | null
}

export function SiteSettingsEditor({ settings, initialLogoMediaId }: SiteSettingsEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const promise = updateSiteSettingsAction(formData)

    toast.promise(promise, {
      loading: "Memperbarui Pengaturan Website...",
      success: "Pengaturan website berhasil diperbarui",
      error: "Gagal memperbarui pengaturan website",
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
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Identitas & Konten Utama</CardTitle>
          <CardDescription>Atur nama, tagline, deskripsi umum, dan alamat pondok pesantren.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Website / Lembaga</Label>
              <Input id="name" name="name" defaultValue={settings.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortName">Nama Pendek (Singkatan)</Label>
              <Input id="shortName" name="shortName" defaultValue={settings.shortName} required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={settings.tagline} required />
          </div>

          <RichTextEditor
            name="description"
            label="Deskripsi Umum"
            value={settings.description}
            placeholder="Tulis profil ringkas atau deskripsi umum pesantren..."
          />

          <div className="grid gap-2">
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Textarea id="address" name="address" defaultValue={settings.address} rows={4} required />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kontak & Tautan Resmi</CardTitle>
            <CardDescription>Atur nomor WhatsApp, email, jam kerja, dan file brosur pendaftaran.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp Link (misal: https://wa.me/...)</Label>
              <Input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsappLabel">Label Tombol WhatsApp</Label>
              <Input id="whatsappLabel" name="whatsappLabel" defaultValue={settings.whatsappLabel} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Alamat Email</Label>
              <Input id="email" name="email" type="email" defaultValue={settings.email} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="officeHours">Jam Layanan Kantor</Label>
              <Input id="officeHours" name="officeHours" defaultValue={settings.officeHours} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mapHref">Tautan Google Maps</Label>
              <Input id="mapHref" name="mapHref" defaultValue={settings.mapHref} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brochureHref">Tautan Berkas Brosur PDF</Label>
              <Input id="brochureHref" name="brochureHref" defaultValue={settings.brochureHref} required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO & Media</CardTitle>
            <CardDescription>Logo resmi lembaga dan informasi mesin pencari (SEO).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="metadataTitle">Judul Halaman (Meta Title)</Label>
              <Input id="metadataTitle" name="metadataTitle" defaultValue={settings.metadataTitle ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="metadataDescription">Deskripsi Meta (Meta Description)</Label>
              <Textarea id="metadataDescription" name="metadataDescription" defaultValue={settings.metadataDescription ?? ""} rows={4} />
            </div>
            <MediaPicker
              name="logoMediaId"
              label="Logo Website"
              value={initialLogoMediaId}
              initialUrl={settings.logo}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Simpan Pengaturan"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
