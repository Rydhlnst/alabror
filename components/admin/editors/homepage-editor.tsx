"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { MediaPicker } from "@/components/admin/media-picker"
import { updateHomepageAction } from "@/app/admin/actions"

type HomepageEditorProps = {
  homepage: any
}

export function HomepageEditor({ homepage }: HomepageEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const promise = updateHomepageAction(formData)

    toast.promise(promise, {
      loading: "Memperbarui Halaman Beranda...",
      success: "Halaman Beranda berhasil diperbarui",
      error: "Gagal memperbarui Halaman Beranda",
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
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Edit Halaman Beranda</h2>
        <p className="text-sm text-muted-foreground">
          Kelola teks banner, deskripsi bagian, dan pengaturan CTA yang tampil di beranda utama.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-6">
            <TabsTrigger value="hero">Hero Banner</TabsTrigger>
            <TabsTrigger value="sections1">Bagian 1</TabsTrigger>
            <TabsTrigger value="sections2">Bagian 2</TabsTrigger>
            <TabsTrigger value="cta">CTA & FAQ</TabsTrigger>
          </TabsList>

          {/* Hero Banner Tab */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Banner</CardTitle>
                <CardDescription>Bagian paling atas yang pertama kali dilihat oleh pengunjung.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="heroBadge">Badge Hero</Label>
                  <Input id="heroBadge" name="heroBadge" defaultValue={homepage.heroBadge} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="heroTitle">Judul Utama</Label>
                  <Input id="heroTitle" name="heroTitle" defaultValue={homepage.heroTitle} required />
                </div>
                <RichTextEditor
                  name="heroDescription"
                  label="Deskripsi Banner"
                  value={homepage.heroDescription}
                  placeholder="Tulis deskripsi banner beranda..."
                />
                <MediaPicker
                  name="heroImageMediaId"
                  label="Gambar Latar Hero"
                  value={homepage.heroImageMediaId}
                  initialUrl={homepage.heroImageUrl}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryCtaLabel">Label Tombol Utama</Label>
                    <Input id="primaryCtaLabel" name="primaryCtaLabel" defaultValue={homepage.primaryCtaLabel} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="primaryCtaHref">Link Tombol Utama</Label>
                    <Input id="primaryCtaHref" name="primaryCtaHref" defaultValue={homepage.primaryCtaHref} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryCtaLabel">Label Tombol Kedua</Label>
                    <Input id="secondaryCtaLabel" name="secondaryCtaLabel" defaultValue={homepage.secondaryCtaLabel} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryCtaHref">Link Tombol Kedua</Label>
                    <Input id="secondaryCtaHref" name="secondaryCtaHref" defaultValue={homepage.secondaryCtaHref} required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bagian 1 Tab */}
          <TabsContent value="sections1" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bagian Konten Berita & Mitra</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Sekilas Berita (News Section)</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="newsTitle">Judul Bagian Berita</Label>
                    <Input id="newsTitle" name="newsTitle" defaultValue={homepage.newsTitle} required />
                  </div>
                  <RichTextEditor
                    name="newsDescription"
                    label="Deskripsi Bagian Berita"
                    value={homepage.newsDescription}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Mitra & Akreditasi</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="partnersTitle">Judul Bagian Mitra</Label>
                    <Input id="partnersTitle" name="partnersTitle" defaultValue={homepage.partnersTitle} required />
                  </div>
                  <RichTextEditor
                    name="partnersDescription"
                    label="Deskripsi Bagian Mitra"
                    value={homepage.partnersDescription}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bagian 2 Tab */}
          <TabsContent value="sections2" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bagian Sejarah, Mengapa Kami, & Pendidikan</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Sejarah Lembaga</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="historyTitle">Judul Bagian Sejarah</Label>
                    <Input id="historyTitle" name="historyTitle" defaultValue={homepage.historyTitle} required />
                  </div>
                  <RichTextEditor
                    name="historyDescription"
                    label="Deskripsi Bagian Sejarah"
                    value={homepage.historyDescription}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Mengapa Memilih Kami (Why Choose Us)</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="whyUsTitle">Judul Bagian Keunggulan</Label>
                    <Input id="whyUsTitle" name="whyUsTitle" defaultValue={homepage.whyUsTitle} required />
                  </div>
                  <RichTextEditor
                    name="whyUsDescription"
                    label="Deskripsi Bagian Keunggulan"
                    value={homepage.whyUsDescription}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Program Pendidikan</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="educationTitle">Judul Bagian Pendidikan</Label>
                    <Input id="educationTitle" name="educationTitle" defaultValue={homepage.educationTitle} required />
                  </div>
                  <RichTextEditor
                    name="educationDescription"
                    label="Deskripsi Bagian Pendidikan"
                    value={homepage.educationDescription}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CTA & FAQ Tab */}
          <TabsContent value="cta" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fasilitas, FAQ, Testimoni, & Bottom CTA</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Fasilitas Pondok</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="facilitiesTitle">Judul Bagian Fasilitas</Label>
                    <Input id="facilitiesTitle" name="facilitiesTitle" defaultValue={homepage.facilitiesTitle} required />
                  </div>
                  <RichTextEditor
                    name="facilitiesDescription"
                    label="Deskripsi Bagian Fasilitas"
                    value={homepage.facilitiesDescription}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Pertanyaan Umum (FAQ)</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="faqTitle">Judul Bagian FAQ</Label>
                    <Input id="faqTitle" name="faqTitle" defaultValue={homepage.faqTitle} required />
                  </div>
                  <RichTextEditor
                    name="faqDescription"
                    label="Deskripsi Bagian FAQ"
                    value={homepage.faqDescription}
                  />
                  <MediaPicker
                    name="faqImageMediaId"
                    label="Gambar Bagian FAQ"
                    value={homepage.faqImageMediaId}
                    initialUrl={homepage.faqImageUrl}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Testimoni Alumni</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="testimonialsTitle">Judul Bagian Testimoni</Label>
                    <Input id="testimonialsTitle" name="testimonialsTitle" defaultValue={homepage.testimonialsTitle} required />
                  </div>
                  <RichTextEditor
                    name="testimonialsDescription"
                    label="Deskripsi Bagian Testimoni"
                    value={homepage.testimonialsDescription}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold border-b pb-1">Banner CTA Bawah</h3>
                  <div className="grid gap-2">
                    <Label htmlFor="bottomCtaTitle">Judul CTA Bawah</Label>
                    <Input id="bottomCtaTitle" name="bottomCtaTitle" defaultValue={homepage.bottomCtaTitle} required />
                  </div>
                  <RichTextEditor
                    name="bottomCtaDescription"
                    label="Deskripsi CTA Bawah"
                    value={homepage.bottomCtaDescription}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bottomCtaLabel">Label Tombol CTA Bawah</Label>
                      <Input id="bottomCtaLabel" name="bottomCtaLabel" defaultValue={homepage.bottomCtaLabel} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bottomCtaHref">Link Tombol CTA Bawah</Label>
                      <Input id="bottomCtaHref" name="bottomCtaHref" defaultValue={homepage.bottomCtaHref} required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
