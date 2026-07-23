"use client"

import { useState } from "react"
import { FaEnvelope } from "react-icons/fa6"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function KirimEmailForm({ targetEmail }: { targetEmail: string }) {
  const [emailInput, setEmailInput] = useState("")

  const handleKirimEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return

    // Clean comma-separated emails if targetEmail has multiple
    const primaryTarget = targetEmail.split(/[,\n]/)[0].trim()

    // Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(primaryTarget)}&su=${encodeURIComponent("Pertanyaan Pendaftaran / Hubungi Kami")}&body=${encodeURIComponent(`Halo Admin,\n\nSaya ingin bertanya lebih lanjut tentang sekolah.\n\nEmail / Kontak saya: ${emailInput}`)}`

    // Open in new tab
    window.open(gmailUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="bg-white border border-gray-100 shadow-xs p-6 sm:p-8 rounded-none">
      <h3 className="text-xl font-bold text-foreground mb-1 font-heading">Kirim Email</h3>
      <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
        Jika ada pertanyaan silahkan kirim email atau fast respon via WhatsApp.
      </p>
      <form onSubmit={handleKirimEmail} className="flex items-center w-full">
        {/* Envelope Icon Box */}
        <div className="border border-r-0 border-gray-200 bg-gray-50 flex items-center justify-center size-10 shrink-0">
          <FaEnvelope className="size-4 text-gray-500" />
        </div>
        {/* Input Text */}
        <input
          type="text"
          required
          placeholder=""
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="border border-gray-200 px-3 py-2 text-sm w-full outline-none focus:ring-0 focus:border-gray-300 rounded-none h-10 bg-white text-foreground"
        />
        {/* Send Button */}
        <Button
          type="submit"
          className="bg-[#2b4277] text-white hover:bg-[#2b4277]/95 flex items-center gap-1.5 px-4 font-bold text-xs uppercase tracking-wider rounded-none shrink-0 h-10 border-none"
        >
          <Check className="size-3" />
          <span className="font-sans font-bold text-xs tracking-wider">KIRIM</span>
        </Button>
      </form>
    </div>
  )
}
