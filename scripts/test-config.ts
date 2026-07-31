import payloadConfig from "../payload.config"

async function test() {
  try {
    const config = await payloadConfig
    console.log("Config admin.user:", config?.admin?.user)
    console.log("Config secret exists:", Boolean(config?.secret))
    console.log("Collections:", config?.collections?.map((c) => c.slug))
  } catch (err) {
    console.error("Config error:", err)
  }
  process.exit(0)
}

test()
