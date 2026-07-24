import "server-only"

const ITERATIONS = 100000
const KEY_LENGTH = 64
const DIGEST = "sha512"

function generateSalt(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("")
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  )
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: ITERATIONS,
      hash: DIGEST,
    },
    keyMaterial,
    KEY_LENGTH * 8
  )
  const hashArray = new Uint8Array(derivedBits)
  const hashHex = Array.from(hashArray, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${salt}:${hashHex}`
}

export async function createPasswordHash(password: string): Promise<string> {
  const salt = generateSalt()
  return hashPassword(password, salt)
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(":")
  if (!salt || !hash) return false
  const computed = await hashPassword(password, salt)
  return computed === storedHash
}
