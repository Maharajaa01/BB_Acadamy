import type React from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

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
        className={`${inter.variable} ${jakarta.variable} font-sans antialiased bg-white`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        <Toaster />
        <WhatsAppButton />
      </body>
    </html>
  );
}
