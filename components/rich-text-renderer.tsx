import StarterKit from "@tiptap/starter-kit"
import { renderToReactElement } from "@tiptap/static-renderer/pm/react"

const extensions = [StarterKit]

type RichTextRendererProps = {
  content: unknown
  className?: string
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content || typeof content !== "object") {
    return null
  }

  const rendered = renderToReactElement({
    extensions,
    content: content as Parameters<typeof renderToReactElement>[0]["content"],
  })

  return (
    <div
      className={[
        "prose prose-sm max-w-none text-current prose-headings:font-heading prose-headings:text-current prose-p:my-0 prose-p:text-current prose-strong:text-current prose-li:text-current",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {rendered}
    </div>
  )
}
