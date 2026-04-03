"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AdmissionFormDialog } from "@/components/admission-form";
import {
  Home,
  Users,
  BookOpen,
  Image as LucideImage,
  Briefcase,
  Phone,
  Mail,
  Menu,
  Star,
} from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "text-white sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/20"
          : "bg-academy-black border-b border-gray-800",
      )}
    >
      {/* Top info bar */}
      <div className="hidden md:block border-b border-white/10 py-2 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <a
                href="tel:+917904509575"
                className="flex items-center gap-1.5 text-gray-400 hover:text-academy-orange transition-colors group"
              >
                <div className="p-1 rounded-full bg-academy-orange/10 group-hover:bg-academy-orange/20 transition-colors">
                  <Phone className="h-3 w-3 text-academy-orange" />
                </div>
                +91 79045 09575
              </a>
              <a
                href="mailto:blackbuildingacademy@gmail.com"
                className="flex items-center gap-1.5 text-gray-400 hover:text-academy-orange transition-colors group"
              >
                <div className="p-1 rounded-full bg-academy-orange/10 group-hover:bg-academy-orange/20 transition-colors">
                  <Mail className="h-3 w-3 text-academy-orange" />
                </div>
                blackbuildingacademy@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Star className="h-3 w-3 text-academy-orange fill-academy-orange" />
              <span>
                <span className="text-academy-orange font-semibold">
                  10+ Years
                </span>{" "}
                of Excellence in Education
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-academy-orange/20 blur-md group-hover:blur-lg transition-all duration-300" />
              <Image
                src="/LOGO_BB_ACADEMY.jpeg"
                alt="Black Building Academy logo"
                width={44}
                height={44}
                className="relative object-contain rounded-lg"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-sm leading-tight block">
                Black Building
              </span>
              <span className="text-academy-orange font-bold text-sm leading-tight block">
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 group",
                    isActive
                      ? "text-academy-orange bg-academy-orange/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5",
                  )}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-academy-orange" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Button
              className="bg-academy-orange hover:bg-[#e6a000] text-black font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-academy-orange/25 text-sm"
              onClick={() => setAdmissionOpen(true)}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-academy-orange hover:bg-white/10 rounded-xl"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#0a0a0a] text-white border-white/10 px-0 pt-0"
              >
                <SheetHeader className="px-6 py-5 border-b border-white/10 bg-black/40">
                  <SheetTitle className="flex items-center gap-3 justify-start">
                    <Image
                      src="/LOGO_BB_ACADEMY.jpeg"
                      alt="Black Building Academy logo"
                      width={40}
                      height={40}
                      className="object-contain rounded-lg"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">
                        Black Building
                      </p>
                      <p className="text-academy-orange font-bold text-sm">
                        Academy
                      </p>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col px-4 py-4 gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                          isActive
                            ? "text-academy-orange bg-academy-orange/10 border border-academy-orange/20"
                            : "text-gray-300 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-lg",
                            isActive ? "bg-academy-orange/20" : "bg-white/5",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-white/10 mx-4 space-y-3">
                  <a
                    href="tel:+917904509575"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-academy-orange transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-academy-orange/10">
                      <Phone className="h-3.5 w-3.5 text-academy-orange" />
                    </div>
                    +91 79045 09575
                  </a>
                  <a
                    href="mailto:blackbuildingacademy@gmail.com"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-academy-orange transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-academy-orange/10">
                      <Mail className="h-3.5 w-3.5 text-academy-orange" />
                    </div>
                    blackbuildingacademy@gmail.com
                  </a>
                </div>

                <div className="px-4 pb-6">
                  <Button
                    className="w-full bg-academy-orange hover:bg-[#e6a000] text-black font-bold py-3 rounded-xl text-base"
                    onClick={() => {
                      setIsOpen(false);
                      setAdmissionOpen(true);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AdmissionFormDialog
        open={admissionOpen}
        onOpenChange={setAdmissionOpen}
      />
    </nav>
  );
}
