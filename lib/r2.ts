import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"

const hasR2Env = !!(
  process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_PUBLIC_URL
)

if (hasR2Env) {
  console.log("[R2] Configured. Bucket:", process.env.R2_BUCKET_NAME, "| Public URL:", process.env.R2_PUBLIC_URL)
} else {
  console.warn("[R2] NOT configured — R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL must all be set.")
}

const r2Client = hasR2Env
  ? new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      },
    })
  : null

async function processImage(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ buffer: Buffer; mime: string; key: string }> {
  if (mimeType.startsWith("image/") && mimeType !== "image/svg+xml" && mimeType !== "image/gif") {
    try {
      const compressedBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer()

      const baseName = filename.substring(0, filename.lastIndexOf(".")) || filename
      const webpKey = `${Date.now()}-${baseName}.webp`

      return {
        buffer: compressedBuffer,
        mime: "image/webp",
        key: webpKey,
      }
    } catch (err) {
      console.error("[R2] Sharp compression failed, using original file:", err)
    }
  }

  return {
    buffer,
    mime: mimeType,
    key: `${Date.now()}-${filename}`,
  }
}

export async function uploadAsset(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ url: string; storageKey: string }> {
  const { buffer: processedBuffer, mime: processedMime, key: storageKey } = await processImage(
    buffer,
    filename,
    mimeType
  )

  if (!r2Client || !hasR2Env) {
    throw new Error(
      "Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL in your environment variables."
    )
  }

  const bucketName = process.env.R2_BUCKET_NAME!
  const publicUrl = process.env.R2_PUBLIC_URL!

  await r2Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: storageKey,
      Body: processedBuffer,
      ContentType: processedMime,
    })
  )

  const url = `${publicUrl.replace(/\/$/, "")}/${storageKey}`
  console.log("[R2] Uploaded:", storageKey, "->", url)
  return { url, storageKey }
}

export async function deleteAsset(storageKey: string): Promise<void> {
  if (!r2Client || !hasR2Env) {
    console.warn("[R2] Not configured, skipping delete for:", storageKey)
    return
  }

  const bucketName = process.env.R2_BUCKET_NAME!
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: storageKey,
    })
  )
  console.log("[R2] Deleted:", storageKey)
}
