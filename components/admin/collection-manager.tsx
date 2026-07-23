"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { ArrowUp, ArrowDown, Edit2, Trash2, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { MediaPicker } from "@/components/admin/media-picker"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  saveCollectionItemAction,
  deleteCollectionItemAction,
  reorderCollectionItemsAction,
} from "@/app/admin/actions"

export type CollectionField = {
  name: string
  label: string
  type: "text" | "number" | "rich-text" | "media-picker" | "boolean" | "select"
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
}

type CollectionManagerProps = {
  slug: string
  title: string
  description?: string
  items: any[]
  fields: CollectionField[]
  columns: {
    label: string
    key: string
    type?: "text" | "boolean" | "rich-text" | "select"
    options?: { label: string; value: string }[]
    render?: (val: any, item: any) => React.ReactNode
  }[]
  defaultNewValues?: Record<string, any>
}

export function CollectionManager({
  slug,
  title,
  description,
  items: initialItems,
  fields,
  columns,
  defaultNewValues = {},
}: CollectionManagerProps) {
  const [items, setItems] = useState<any[]>(initialItems)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sync state if initialItems change (e.g. after server action refetch)
  if (JSON.stringify(initialItems.map(i => i.id)) !== JSON.stringify(items.map(i => i.id))) {
    setItems(initialItems)
  }

  function handleAdd() {
    setEditingId(null)
    const initialData = { ...defaultNewValues }
    fields.forEach((f) => {
      if (f.type === "boolean" && initialData[f.name] === undefined) {
        initialData[f.name] = true
      }
    })
    setFormData(initialData)
    setIsFormOpen(true)
  }

  function handleEdit(item: any) {
    setEditingId(item.id)
    setFormData(item)
    setIsFormOpen(true)
  }

  async function handleDelete(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return

    const promise = deleteCollectionItemAction(slug, id).then(() => {
      setItems(items.filter((item) => item.id !== id))
    })

    toast.promise(promise, {
      loading: "Menghapus item...",
      success: "Item berhasil dihapus",
      error: "Gagal menghapus item",
    })
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return

    const newItems = [...items]
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp

    setItems(newItems)

    const ids = newItems.map((item) => item.id)
    const promise = reorderCollectionItemsAction(slug, ids)

    toast.promise(promise, {
      loading: "Memperbarui urutan...",
      success: "Urutan berhasil diperbarui",
      error: "Gagal memperbarui urutan",
    })
  }

  async function handlePublishToggle(item: any) {
    const updatedVal = !item.published
    const promise = saveCollectionItemAction(slug, item.id, {
      ...item,
      published: updatedVal,
    }).then(() => {
      setItems(items.map((i) => (i.id === item.id ? { ...i, published: updatedVal } : i)))
    })

    toast.promise(promise, {
      loading: updatedVal ? "Mempublikasikan item..." : "Menyembunyikan item...",
      success: updatedVal ? "Item berhasil dipublikasikan" : "Item berhasil disembunyikan",
      error: "Gagal memperbarui status publikasi",
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const rawFormData = new FormData(e.currentTarget)
    const values: Record<string, any> = { ...formData }

    fields.forEach((f) => {
      if (f.type === "boolean") {
        // Handled via state or checkbox change
      } else if (f.type === "number") {
        values[f.name] = Number(rawFormData.get(f.name))
      } else {
        values[f.name] = rawFormData.get(f.name)
      }
    })

    const promise = saveCollectionItemAction(slug, editingId, values).then(() => {
      setIsFormOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    })

    toast.promise(promise, {
      loading: "Menyimpan data...",
      success: editingId ? "Item berhasil disimpan" : "Item berhasil ditambahkan",
      error: "Gagal menyimpan item",
    })

    promise.finally(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <Button onClick={handleAdd} className="shrink-0">
          <Plus className="size-4 mr-2" /> Tambah Baru
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Urutan</TableHead>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                {fields.some(f => f.name === "published") ? (
                  <TableHead className="w-28 text-center">Status</TableHead>
                ) : null}
                <TableHead className="w-24 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (fields.some(f => f.name === "published") ? 3 : 2)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Belum ada data.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          disabled={index === 0}
                          onClick={() => handleMove(index, "up")}
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          disabled={index === items.length - 1}
                          onClick={() => handleMove(index, "down")}
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(item[col.key], item)
                          : (() => {
                              const val = item[col.key];
                              if (col.type === "boolean") {
                                return val ? "Ya" : "Tidak";
                              }
                              if (col.type === "rich-text") {
                                const text = val?.content?.[0]?.content?.[0]?.text || "Detail";
                                return <span className="text-xs truncate max-w-xs block">{text}</span>;
                              }
                              if (col.type === "select" && col.options) {
                                return col.options.find((o: any) => o.value === val)?.label || String(val ?? "");
                              }
                              return String(val ?? "");
                            })()}
                      </TableCell>
                    ))}
                    {fields.some(f => f.name === "published") ? (
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePublishToggle(item)}
                          className={item.published ? "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100" : "border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"}
                        >
                          {item.published ? "Aktif" : "Draft"}
                        </Button>
                      </TableCell>
                    ) : null}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] flex flex-col p-6">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <DialogHeader>
              <DialogTitle>
                {editingId ? `Edit ${title}` : `Tambah ${title}`}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto min-h-0 py-4 space-y-4 pr-1">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  {field.type !== "boolean" && field.type !== "media-picker" && field.type !== "rich-text" ? (
                    <>
                      <Label htmlFor={field.name}>{field.label}</Label>
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          defaultValue={formData[field.name] ?? ""}
                          required={field.required}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Pilih...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          defaultValue={formData[field.name] ?? ""}
                          required={field.required}
                        />
                      )}
                    </>
                  ) : null}

                  {field.type === "rich-text" ? (
                    <RichTextEditor
                      name={field.name}
                      label={field.label}
                      value={formData[field.name]}
                      placeholder={field.placeholder}
                    />
                  ) : null}

                  {field.type === "media-picker" ? (
                    <MediaPicker
                      name={field.name}
                      label={field.label}
                      value={formData[field.name] || null}
                      placeholder={field.placeholder}
                    />
                  ) : null}

                  {field.type === "boolean" ? (
                    <div className="flex items-center gap-2 pt-2">
                      <Checkbox
                        id={field.name}
                        checked={formData[field.name] ?? true}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, [field.name]: !!checked })
                        }
                      />
                      <input
                        type="hidden"
                        name={field.name}
                        value={formData[field.name] ? "true" : "false"}
                      />
                      <Label htmlFor={field.name} className="cursor-pointer font-normal">
                        {field.label}
                      </Label>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <DialogFooter className="shrink-0 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
