"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AdmissionFormDialog } from "@/components/admission-form";
import { Home, Users, BookOpen, Image, Briefcase, Phone } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about", icon: Users },
  { name: "Notes", href: "/notes", icon: BookOpen },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Career", href: "/career", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Phone },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);

  return (
    <nav className="bg-academy-black text-white sticky top-0 z-50 border-b border-gray-800">
      {/* Top bar (hidden on mobile) */}
      <div className="hidden md:block bg-gray-900 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-academy-orange">📞</span>
                <span className="text-gray-300">+91 79045 09575</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-academy-orange">✉️</span>
                <span className="text-gray-300">blackbuildingacademy@gmail.com</span>
              </div>
            </div>
            <div className="text-gray-300">
              <span className="text-academy-orange">10+ Years</span> of Excellence in Education
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold">
              <span className="text-white">Black Building</span>
              <span className="text-academy-orange"> Academy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 hover:text-academy-orange relative flex items-center gap-2 group",
                    pathname === item.href ? "text-academy-orange" : "text-white"
                  )}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-academy-orange" />
                  )}
                </Link>
              );
            })}
            <Button
              className="bg-academy-orange hover:bg-academy-orange/90 text-white font-bold transition-all duration-300 hover:scale-105"
              onClick={() => setAdmissionOpen(true)}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-academy-orange">
                  <span className="text-2xl">☰</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-academy-black text-white border-gray-800 px-6 pt-6"
              >
                <SheetHeader>
                  <SheetTitle className="text-center text-xl font-bold">
                    <span className="text-white">Black Building</span>
                    <span className="text-academy-orange"> Academy</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Centered menu items */}
                <div className="flex flex-col items-center space-y-5 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "w-full flex items-center justify-center gap-3 text-lg font-medium transition-colors hover:text-academy-orange pb-2 border-b border-gray-800",
                          pathname === item.href ? "text-academy-orange" : "text-white"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* Contact info */}
                  <div className="pt-6 space-y-3 text-sm text-center text-gray-300">
                    <div className="flex justify-center items-center space-x-2">
                      <span className="text-academy-orange">📞</span>
                      <span>+91 79045 09575</span>
                    </div>
                    <div className="flex justify-center items-center space-x-2">
                      <span className="text-academy-orange">✉️</span>
                      <span>blackbuildingacademy@gmail.com</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-academy-orange hover:bg-academy-orange/90 text-white text-lg mt-6"
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

      {/* Admission dialog */}
      <AdmissionFormDialog open={admissionOpen} onOpenChange={setAdmissionOpen} />
    </nav>
  );
}
