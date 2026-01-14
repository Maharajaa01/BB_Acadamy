"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "917904509575" // Update with your actual number
  const message = "Hello, I'm interested in knowing more about Black Building Academy's courses and admissions."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5E] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  )
}
