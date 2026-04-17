"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AdmissionFormDialog } from "@/components/admission-form";
import { Home, Users, BookOpen, Image as LucideImage, Briefcase, Phone, Menu } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about", icon: Users },
  { name: "Notes", href: "/notes", icon: BookOpen },
  { name: "Gallery", href: "/gallery", icon: LucideImage },
  { name: "Career", href: "/career", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "bg-[#111111] text-white sticky top-0 z-50 transition-shadow duration-300",
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.35)]" : "border-b border-white/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/LOGO_BB_ACADEMY.jpeg"
                alt="Black Building Academy logo"
                width={40}
                height={40}
                className="rounded-md object-contain"
              />
              <span className="hidden sm:block font-heading font-bold text-[15px] leading-tight">
                <span className="text-white">Black Building</span>
                <br />
                <span className="text-[#FFB902]">Academy</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "text-[#FFB902] bg-white/8"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+917904509575" className="text-sm text-gray-400 hover:text-[#FFB902] transition-colors">
                +91 79045 09575
              </a>
              <Button
                size="sm"
                className="bg-[#FFB902] hover:bg-[#e5a702] text-[#111111] font-bold px-5 transition-all duration-200 hover:scale-[1.03]"
                onClick={() => setAdmissionOpen(true)}
              >
                Enroll Now
              </Button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-[#FFB902] hover:bg-white/5">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#111111] text-white border-white/10 px-6 pt-6 w-72">
                  <SheetHeader>
                    <SheetTitle className="flex justify-center">
                      <Image
                        src="/LOGO_BB_ACADEMY.jpeg"
                        alt="Black Building Academy logo"
                        width={48}
                        height={48}
                        className="rounded-md object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-1 mt-8">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                              ? "text-[#FFB902] bg-white/8"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-gray-400">
                    <div>📞 +91 79045 09575</div>
                    <div>✉️ blackbuildingacademy@gmail.com</div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-[#FFB902] hover:bg-[#e5a702] text-[#111111] font-bold"
                    onClick={() => { setIsOpen(false); setAdmissionOpen(true); }}
                  >
                    Enroll Now
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      <AdmissionFormDialog open={admissionOpen} onOpenChange={setAdmissionOpen} />
    </>
  );
}
