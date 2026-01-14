import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "Black Building Academy - Best Tuition Center in Chennai | No.1 for State Board",
  description:
    "Chennai's top-rated tuition center. 10+ years of excellence, 100% pass guarantee, State Board 10th & 12th coaching with assured marks.",
  keywords: ["tuition center Chennai", "State Board coaching", "10th 12th coaching", "best tuition in Chennai", "guaranteed marks"],
  authors: [{ name: "Black Building Academy" }],
  creator: "Black Building Academy",
  metadataBase: new URL("https://bbacademy.com"),
  openGraph: {
    title: "Black Building Academy - Best Tuition Center in Chennai",
    description: "10+ years of excellence in State Board 10th & 12th exams. 100% pass guarantee with top rank holders.",
    type: "website",
    locale: "en_IN",
    siteName: "Black Building Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Building Academy - Best Tuition Center in Chennai",
    description: "10+ years of excellence, 100% pass guarantee, State Board coaching.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://bbacademy.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-gray-50/50`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <main className="min-h-screen relative">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#ff6b000f,transparent)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_500px_at_80%_80%,#ff6b000a,transparent)]"></div>
            </div>
            {children}
          </main>
          <Footer />
        </Suspense>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  )
}
