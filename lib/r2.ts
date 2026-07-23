import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { join } from "path"
import { writeFileSync, unlinkSync, existsSync } from "fs"

const hasR2Env = !!(
  process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_PUBLIC_URL
)

// Initialize S3 client for Cloudflare R2 if credentials are provided
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

/**
 * Compresses an image using sharp if it's a standard bitmap format.
 * Converts to WebP at 80% quality for optimal page loading speeds.
 */
async function processImage(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ buffer: Buffer; mime: string; key: string }> {
  // Do not compress vector images (SVG) or animated gifs
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
      console.error("Sharp image compression failed, using original file:", err)
    }
  }

  return {
    buffer,
    mime: mimeType,
    key: `${Date.now()}-${filename}`,
  }
}

/**
 * Uploads a file buffer to Cloudflare R2 (or fallback local disk).
 * Automatically compresses images using sharp beforehand.
 */
export async function uploadAsset(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<{ url: string; storageKey: string }> {
  // 1. Compress image if applicable
  const { buffer: processedBuffer, mime: processedMime, key: storageKey } = await processImage(
    buffer,
    filename,
    mimeType
  )

  // 2. Upload to Cloudflare R2 if configured
  if (r2Client && hasR2Env) {
    const bucketName = process.env.R2_BUCKET_NAME || ""
    const publicUrl = process.env.R2_PUBLIC_URL || ""

    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: storageKey,
        Body: processedBuffer,
        ContentType: processedMime,
      })
    )

    const url = `${publicUrl.replace(/\/$/, "")}/${storageKey}`
    return { url, storageKey }
  }

  // 3. Fallback to local disk storage
  console.warn("Cloudflare R2 is not configured. Falling back to local disk storage.")
  const uploadDir = join(process.cwd(), "public", "uploads")
  const filePath = join(uploadDir, storageKey)
  
  writeFileSync(filePath, processedBuffer)
  
  return {
    url: `/uploads/${storageKey}`,
    storageKey,
  }
}

/**
 * Deletes a file from Cloudflare R2 (or fallback local disk).
 */
export async function deleteAsset(storageKey: string): Promise<void> {
  // 1. Delete from Cloudflare R2 if configured
  if (r2Client && hasR2Env) {
    const bucketName = process.env.R2_BUCKET_NAME || ""
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: storageKey,
      })
    )
    return
  }

  // 2. Fallback to local disk storage
  const filePath = join(process.cwd(), "public", "uploads", storageKey)
  if (existsSync(filePath)) {
    unlinkSync(filePath)
  }
}
