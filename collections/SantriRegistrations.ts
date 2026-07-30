import type { CollectionConfig } from "payload"

export const SantriRegistrations: CollectionConfig = {
  slug: "santri-registrations",
  admin: {
    useAsTitle: "namaLengkap",
    defaultColumns: ["namaLengkap", "jenjang", "status"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "santri-users",
      required: true,
    },
    {
      name: "jenjang",
      type: "select",
      options: [
        { label: "MI (Madrasah Ibtidaiyah)", value: "mi" },
        { label: "SMP", value: "smp" },
        { label: "MTs", value: "mts" },
      ],
      required: true,
    },
    { name: "namaLengkap", type: "text", required: true },
    { name: "tempatLahir", type: "text", required: true },
    { name: "tanggalLahir", type: "text", required: true },
    {
      name: "jenisKelamin",
      type: "select",
      options: [
        { label: "Laki-laki", value: "L" },
        { label: "Perempuan", value: "P" },
      ],
      required: true,
    },
    { name: "alamat", type: "text", required: true },
    { name: "namaOrtu", type: "text", required: true },
    { name: "teleponOrtu", type: "text", required: true },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Diterima", value: "accepted" },
        { label: "Ditolak", value: "rejected" },
      ],
      defaultValue: "pending",
      required: true,
    },
  ],
}
