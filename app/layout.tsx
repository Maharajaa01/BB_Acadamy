import type React from "react";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimator } from "@/components/scroll-animator";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title:
    "Black Building Academy - Best Tuition Center in Chennai | No.1 for State Board",
  description:
    "Chennai's top-rated tuition center. 10+ years of excellence, 100% pass guarantee, State Board 10th & 12th coaching with assured marks.",
  keywords: [
    "tuition center Chennai",
    "State Board coaching",
    "10th 12th coaching",
    "best tuition in Chennai",
    "guaranteed marks",
  ],
  authors: [{ name: "Black Building Academy" }],
  creator: "Black Building Academy",
  metadataBase: new URL("https://bbacademy.com"),
  icons: {
    icon: "/LOGO_BB_ACADEMY.jpeg",
    apple: "/LOGO_BB_ACADEMY.jpeg",
    other: [
      { rel: "icon", url: "/LOGO_BB_ACADEMY.jpeg" },
      { rel: "shortcut icon", url: "/LOGO_BB_ACADEMY.jpeg" },
    ],
  },
  openGraph: {
    title: "Black Building Academy - Best Tuition Center in Chennai",
    description:
      "10+ years of excellence in State Board 10th & 12th exams. 100% pass guarantee with top rank holders.",
    type: "website",
    locale: "en_IN",
    siteName: "Black Building Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Building Academy - Best Tuition Center in Chennai",
    description:
      "10+ years of excellence, 100% pass guarantee, State Board coaching.",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://bbacademy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-gray-50/50`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <main className="min-h-screen relative">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
              <div className="absolute inset-0 animate-gradient-shift bg-[radial-gradient(circle_700px_at_12%_18%,#FFB90222,transparent_52%),radial-gradient(circle_620px_at_86%_24%,#FFB9021A,transparent_48%),radial-gradient(circle_700px_at_72%_88%,#FFB90215,transparent_54%)]" />
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-academy-orange/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-28 -right-20 w-96 h-96 bg-academy-orange/15 rounded-full blur-3xl animate-float-delayed" />
            </div>
            <ScrollAnimator />
            {children}
          </main>
          <Footer />
        </Suspense>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
