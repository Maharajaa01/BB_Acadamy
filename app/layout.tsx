import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "Black Building Academy - Chennai's No.1 Tuition Center",
  description:
    "10+ Years of Excellence in State Board 10th & 12th Exams. 100% Pass Guarantee | Assured Marks | Top Rank Holders | 0 Failures",
  generator: "v0.app",
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
      </body>
    </html>
  )
}
