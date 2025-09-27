import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Black Building Academy - Chennai's No.1 Tuition Center",
  description:
    "8 Years of Excellence in State Board 10th & 12th Exams. 100% Pass Guarantee | Assured Marks | Top Rank Holders | 0 Failures",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        <Toaster />
      </body>
    </html>
  )
}
