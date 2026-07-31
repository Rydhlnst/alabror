import config from "@payload-config"
import { RootLayout } from "@payloadcms/next/layouts"
import { handleServerFunctions } from "@payloadcms/next/layouts"
import React from "react"
import { importMap } from "./admin/importMap"

import "../globals.css"
import "./custom-styles.css"

const serverFunction = async (args: { args: Record<string, unknown>; name: string }) => {
  "use server"
  const resolvedConfig = await config
  return handleServerFunctions({
    ...args,
    config: resolvedConfig,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
