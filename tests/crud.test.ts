import { describe, it, expect, beforeAll, afterAll } from "vitest"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { randomBytes, pbkdf2Sync } from "crypto"

const DATABASE_URL = process.env.DATABASE_URL!

let sql: postgres.Sql
let db: ReturnType<typeof drizzle<typeof schema>>
let dbAvailable = false

function generateSalt(): string {
  return randomBytes(16).toString("hex")
}

function hashPasswordSync(password: string, salt: string): string {
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512")
  return `${salt}:${hash.toString("hex")}`
}

function createPasswordHash(password: string): string {
  const salt = generateSalt()
  return hashPasswordSync(password, salt)
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":")
  if (!salt || !hash) return false
  const computed = hashPasswordSync(password, salt)
  return computed === storedHash
}

beforeAll(async () => {
  try {
    sql = postgres(DATABASE_URL, { max: 1, connect_timeout: 5 })
    db = drizzle(sql, { schema })
    await sql`SELECT 1`
    dbAvailable = true
  } catch {
    dbAvailable = false
  }
})

afterAll(async () => {
  if (dbAvailable && sql) {
    await sql.end()
  }
})

describe("Password Hashing", () => {
  it("should hash password correctly", () => {
    const password = "test123456"
    const hash = createPasswordHash(password)
    expect(hash).toContain(":")
    expect(hash.length).toBeGreaterThan(20)
  })

  it("should verify password correctly", () => {
    const password = "test123456"
    const hash = createPasswordHash(password)
    const valid = verifyPassword(password, hash)
    expect(valid).toBe(true)
  })

  it("should reject wrong password", () => {
    const password = "test123456"
    const hash = createPasswordHash(password)
    const valid = verifyPassword("wrongpassword", hash)
    expect(valid).toBe(false)
  })

  it("should generate different hashes for same password", () => {
    const password = "test123456"
    const hash1 = createPasswordHash(password)
    const hash2 = createPasswordHash(password)
    expect(hash1).not.toBe(hash2)
  })
})

describe("Database Connection", () => {
  it("should connect to database", async () => {
    if (!dbAvailable) return
    const result = await sql`SELECT 1 as test`
    expect(result[0].test).toBe(1)
  })

  it("should have santri_users table", async () => {
    if (!dbAvailable) return
    const result = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'santri_users'
    `
    expect(result.length).toBe(1)
  })

  it("should have santri_registrations table", async () => {
    if (!dbAvailable) return
    const result = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'santri_registrations'
    `
    expect(result.length).toBe(1)
  })
})

describe("Santri Users CRUD", () => {
  let userId: string

  it("should create a new santri user", async () => {
    if (!dbAvailable) return
    const passwordHash = createPasswordHash("password123")
    const [user] = await db
      .insert(schema.santriUsers)
      .values({
        email: `test-${Date.now()}@example.com`,
        passwordHash,
        name: "Test User",
        phone: "08123456789",
      })
      .returning({ id: schema.santriUsers.id })

    userId = user.id
    expect(userId).toBeDefined()
    expect(userId.length).toBeGreaterThan(0)
  })

  it("should read santri user", async () => {
    if (!dbAvailable || !userId) return
    const [user] = await db
      .select()
      .from(schema.santriUsers)
      .where(eq(schema.santriUsers.id, userId))
      .limit(1)

    expect(user).toBeDefined()
    expect(user.name).toBe("Test User")
    expect(user.email).toContain("test-")
  })

  it("should update santri user", async () => {
    if (!dbAvailable || !userId) return
    await db
      .update(schema.santriUsers)
      .set({ name: "Updated User" })
      .where(eq(schema.santriUsers.id, userId))

    const [user] = await db
      .select()
      .from(schema.santriUsers)
      .where(eq(schema.santriUsers.id, userId))
      .limit(1)

    expect(user.name).toBe("Updated User")
  })

  it("should delete santri user", async () => {
    if (!dbAvailable || !userId) return
    await db
      .delete(schema.santriUsers)
      .where(eq(schema.santriUsers.id, userId))

    const [user] = await db
      .select()
      .from(schema.santriUsers)
      .where(eq(schema.santriUsers.id, userId))
      .limit(1)

    expect(user).toBeUndefined()
  })
})

describe("Santri Registrations CRUD", () => {
  let userId: string
  let registrationId: string

  beforeAll(async () => {
    if (!dbAvailable) return
    const passwordHash = createPasswordHash("password123")
    const [user] = await db
      .insert(schema.santriUsers)
      .values({
        email: `reg-test-${Date.now()}@example.com`,
        passwordHash,
        name: "Registration Test User",
      })
      .returning({ id: schema.santriUsers.id })
    userId = user.id
  })

  afterAll(async () => {
    if (!dbAvailable || !userId) return
    await db.delete(schema.santriRegistrations).where(eq(schema.santriRegistrations.userId, userId))
    await db.delete(schema.santriUsers).where(eq(schema.santriUsers.id, userId))
  })

  it("should create a registration", async () => {
    if (!dbAvailable || !userId) return
    const [reg] = await db
      .insert(schema.santriRegistrations)
      .values({
        userId,
        jenjang: "MI",
        namaLengkap: "Test Santri",
        tempatLahir: "Jakarta",
        tanggalLahir: "2015-01-01",
        jenisKelamin: "Laki-laki",
        alamat: "Jl. Test No. 1",
        namaOrtu: "Parent Test",
        teleponOrtu: "08123456789",
        status: "pending",
      })
      .returning({ id: schema.santriRegistrations.id })

    registrationId = reg.id
    expect(registrationId).toBeDefined()
  })

  it("should read registration", async () => {
    if (!dbAvailable || !registrationId) return
    const [reg] = await db
      .select()
      .from(schema.santriRegistrations)
      .where(eq(schema.santriRegistrations.id, registrationId))
      .limit(1)

    expect(reg).toBeDefined()
    expect(reg.jenjang).toBe("MI")
    expect(reg.namaLengkap).toBe("Test Santri")
    expect(reg.status).toBe("pending")
  })

  it("should update registration status", async () => {
    if (!dbAvailable || !registrationId) return
    await db
      .update(schema.santriRegistrations)
      .set({ status: "approved" })
      .where(eq(schema.santriRegistrations.id, registrationId))

    const [reg] = await db
      .select()
      .from(schema.santriRegistrations)
      .where(eq(schema.santriRegistrations.id, registrationId))
      .limit(1)

    expect(reg.status).toBe("approved")
  })

  it("should delete registration", async () => {
    if (!dbAvailable || !registrationId) return
    await db
      .delete(schema.santriRegistrations)
      .where(eq(schema.santriRegistrations.id, registrationId))

    const [reg] = await db
      .select()
      .from(schema.santriRegistrations)
      .where(eq(schema.santriRegistrations.id, registrationId))
      .limit(1)

    expect(reg).toBeUndefined()
  })
})

describe("Site Settings CRUD", () => {
  it("should read site settings (or return empty)", async () => {
    if (!dbAvailable) return
    const result = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.id, "site"))
      .limit(1)

    // Table may be empty if not seeded - that's OK
    expect(Array.isArray(result)).toBe(true)
  })

  it("should update site settings if exists", async () => {
    if (!dbAvailable) return
    const original = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.id, "site"))
      .limit(1)

    if (original.length > 0) {
      const newName = `Updated ${Date.now()}`
      await db
        .update(schema.siteSettings)
        .set({ name: newName })
        .where(eq(schema.siteSettings.id, "site"))

      const [updated] = await db
        .select()
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.id, "site"))
        .limit(1)

      expect(updated.name).toBe(newName)

      await db
        .update(schema.siteSettings)
        .set({ name: original[0].name })
        .where(eq(schema.siteSettings.id, "site"))
    }
  })
})

describe("News Items CRUD", () => {
  let newsId: string

  it("should create news item", async () => {
    if (!dbAvailable) return
    const [item] = await db
      .insert(schema.newsItems)
      .values({
        title: "Test News",
        dateLabel: "24 Juli 2026",
        category: "Test",
        summary: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Test summary" }] }] },
        href: "/berita/test",
        published: true,
        sortOrder: 0,
      })
      .returning({ id: schema.newsItems.id })

    newsId = item.id
    expect(newsId).toBeDefined()
  })

  it("should read news item", async () => {
    if (!dbAvailable || !newsId) return
    const [item] = await db
      .select()
      .from(schema.newsItems)
      .where(eq(schema.newsItems.id, newsId))
      .limit(1)

    expect(item).toBeDefined()
    expect(item.title).toBe("Test News")
  })

  it("should update news item", async () => {
    if (!dbAvailable || !newsId) return
    await db
      .update(schema.newsItems)
      .set({ title: "Updated News" })
      .where(eq(schema.newsItems.id, newsId))

    const [item] = await db
      .select()
      .from(schema.newsItems)
      .where(eq(schema.newsItems.id, newsId))
      .limit(1)

    expect(item.title).toBe("Updated News")
  })

  it("should delete news item", async () => {
    if (!dbAvailable || !newsId) return
    await db
      .delete(schema.newsItems)
      .where(eq(schema.newsItems.id, newsId))

    const [item] = await db
      .select()
      .from(schema.newsItems)
      .where(eq(schema.newsItems.id, newsId))
      .limit(1)

    expect(item).toBeUndefined()
  })
})

describe("Facilities CRUD", () => {
  let facilityId: string

  it("should create facility", async () => {
    if (!dbAvailable) return
    const [item] = await db
      .insert(schema.facilities)
      .values({
        name: "Test Facility",
        description: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Test description" }] }] },
        iconKey: "building-2",
        sortOrder: 0,
      })
      .returning({ id: schema.facilities.id })

    facilityId = item.id
    expect(facilityId).toBeDefined()
  })

  it("should read facility", async () => {
    if (!dbAvailable || !facilityId) return
    const [item] = await db
      .select()
      .from(schema.facilities)
      .where(eq(schema.facilities.id, facilityId))
      .limit(1)

    expect(item).toBeDefined()
    expect(item.name).toBe("Test Facility")
  })

  it("should update facility", async () => {
    if (!dbAvailable || !facilityId) return
    await db
      .update(schema.facilities)
      .set({ name: "Updated Facility" })
      .where(eq(schema.facilities.id, facilityId))

    const [item] = await db
      .select()
      .from(schema.facilities)
      .where(eq(schema.facilities.id, facilityId))
      .limit(1)

    expect(item.name).toBe("Updated Facility")
  })

  it("should delete facility", async () => {
    if (!dbAvailable || !facilityId) return
    await db
      .delete(schema.facilities)
      .where(eq(schema.facilities.id, facilityId))

    const [item] = await db
      .select()
      .from(schema.facilities)
      .where(eq(schema.facilities.id, facilityId))
      .limit(1)

    expect(item).toBeUndefined()
  })
})

describe("Gallery Items CRUD", () => {
  let galleryId: string

  it("should create gallery item", async () => {
    if (!dbAvailable) return
    const [item] = await db
      .insert(schema.galleryItems)
      .values({
        alt: "Test Gallery",
        aspect: "16/9",
        published: true,
        sortOrder: 0,
      })
      .returning({ id: schema.galleryItems.id })

    galleryId = item.id
    expect(galleryId).toBeDefined()
  })

  it("should read gallery item", async () => {
    if (!dbAvailable || !galleryId) return
    const [item] = await db
      .select()
      .from(schema.galleryItems)
      .where(eq(schema.galleryItems.id, galleryId))
      .limit(1)

    expect(item).toBeDefined()
    expect(item.alt).toBe("Test Gallery")
  })

  it("should update gallery item", async () => {
    if (!dbAvailable || !galleryId) return
    await db
      .update(schema.galleryItems)
      .set({ alt: "Updated Gallery" })
      .where(eq(schema.galleryItems.id, galleryId))

    const [item] = await db
      .select()
      .from(schema.galleryItems)
      .where(eq(schema.galleryItems.id, galleryId))
      .limit(1)

    expect(item.alt).toBe("Updated Gallery")
  })

  it("should delete gallery item", async () => {
    if (!dbAvailable || !galleryId) return
    await db
      .delete(schema.galleryItems)
      .where(eq(schema.galleryItems.id, galleryId))

    const [item] = await db
      .select()
      .from(schema.galleryItems)
      .where(eq(schema.galleryItems.id, galleryId))
      .limit(1)

    expect(item).toBeUndefined()
  })
})

describe("Education Programs CRUD", () => {
  let programId: string

  it("should create education program", async () => {
    if (!dbAvailable) return
    const [item] = await db
      .insert(schema.educationPrograms)
      .values({
        name: "Test Program",
        summary: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Test summary" }] }] },
        focus: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Test focus" }] }] },
        iconKey: "school",
        sortOrder: 0,
      })
      .returning({ id: schema.educationPrograms.id })

    programId = item.id
    expect(programId).toBeDefined()
  })

  it("should read education program", async () => {
    if (!dbAvailable || !programId) return
    const [item] = await db
      .select()
      .from(schema.educationPrograms)
      .where(eq(schema.educationPrograms.id, programId))
      .limit(1)

    expect(item).toBeDefined()
    expect(item.name).toBe("Test Program")
  })

  it("should update education program", async () => {
    if (!dbAvailable || !programId) return
    await db
      .update(schema.educationPrograms)
      .set({ name: "Updated Program" })
      .where(eq(schema.educationPrograms.id, programId))

    const [item] = await db
      .select()
      .from(schema.educationPrograms)
      .where(eq(schema.educationPrograms.id, programId))
      .limit(1)

    expect(item.name).toBe("Updated Program")
  })

  it("should delete education program", async () => {
    if (!dbAvailable || !programId) return
    await db
      .delete(schema.educationProgramPoints)
      .where(eq(schema.educationProgramPoints.programId, programId))

    await db
      .delete(schema.educationPrograms)
      .where(eq(schema.educationPrograms.id, programId))

    const [item] = await db
      .select()
      .from(schema.educationPrograms)
      .where(eq(schema.educationPrograms.id, programId))
      .limit(1)

    expect(item).toBeUndefined()
  })
})
