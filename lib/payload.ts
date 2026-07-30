import "server-only"
import { getPayload } from "payload"
import config from "@payload-config"

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

export function richTextToPlainText(value: unknown): string {
  if (!value || typeof value !== "object") return ""
  const state = value as Record<string, unknown>
  if (!state.root || typeof state.root !== "object") return ""
  const root = state.root as Record<string, unknown>
  if (!Array.isArray(root.children)) return ""

  function extract(nodes: unknown[]): string {
    const parts: string[] = []
    for (const node of nodes as Record<string, unknown>[]) {
      if (node.type === "text" && typeof node.text === "string") {
        parts.push(node.text)
      }
      if (Array.isArray(node.children)) {
        parts.push(extract(node.children))
      }
    }
    return parts.join(" ")
  }

  return extract(root.children).trim()
}

export function richTextParagraph(text: string) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          children: [
            {
              type: "text",
              format: 0,
              mode: "normal",
              style: "",
              text,
              version: 1,
            },
          ],
          direction: null,
        },
      ],
      direction: null,
    },
  }
}
