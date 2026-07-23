export type RichTextNode = {
  type?: string
  text?: string
  content?: RichTextNode[]
}

export type RichTextDoc = {
  type: "doc"
  content: RichTextNode[]
}

export function richTextParagraph(text: string): RichTextDoc {
  const paragraphs = text
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean)

  return {
    type: "doc",
    content: paragraphs.length
      ? paragraphs.map((paragraph) => ({
          type: "paragraph",
          content: [{ type: "text", text: paragraph }],
        }))
      : [{ type: "paragraph" }],
  }
}

export function richTextToPlainText(value: unknown): string {
  if (!value || typeof value !== "object") return ""
  const node = value as RichTextNode
  if (node.text) return node.text
  if (!Array.isArray(node.content)) return ""
  return node.content.map((child) => richTextToPlainText(child)).join(" ").trim()
}
