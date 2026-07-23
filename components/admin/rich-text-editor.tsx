"use client"

import { useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"

import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  name: string
  label?: string
  value: unknown
  placeholder?: string
}

const fallbackContent = { type: "doc", content: [{ type: "paragraph" }] }

export function RichTextEditor({
  name,
  label,
  value,
  placeholder,
}: RichTextEditorProps) {
  const initialContent = (value as Record<string, unknown> | null) ?? fallbackContent
  const [serialized, setSerialized] = useState(JSON.stringify(initialContent))

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? "Tulis isi..." }),
    ],
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setSerialized(JSON.stringify(editor.getJSON()))
    },
  })

  return (
    <div className="flex flex-col gap-2">
      {label ? <label className="text-sm font-medium text-foreground">{label}</label> : null}
      <div className="rounded-lg border border-input bg-background px-3 py-2 shadow-xs">
        <EditorContent
          editor={editor}
          className={cn(
            "min-h-28 text-sm outline-none [&_.ProseMirror]:min-h-24 [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
          )}
        />
      </div>
      <input type="hidden" name={name} value={serialized} />
    </div>
  )
}
