"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { AdmissionFormDialog } from "@/components/admission-form";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Courses", href: "/#courses" },
  { name: "Notes", href: "/notes" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const courses = [
  { name: "Foundation (Classes 6–9)", href: "/#courses" },
  { name: "Public Exam (Classes 10–12)", href: "/#courses" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/blackbuildingacademy/",
    icon: Facebook,
    color: "hover:bg-blue-600",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/blackbuildingacademy/",
    icon: Instagram,
    color: "hover:bg-pink-600",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bbacademy",
    icon: Youtube,
    color: "hover:bg-red-600",
  },
];

const contactItems = [
  {
    icon: MapPin,
    lines: [
      "10, Vivekananda Street,",
      "MGR Nagar, Nesapakkam,",
      "Chennai, Tamil Nadu 600078",
    ],
    href: "https://maps.google.com",
  },
  { icon: Phone, lines: ["+91 79045 09575"], href: "tel:+917904509575" },
  {
    icon: Mail,
    lines: ["blackbuildingacademy@gmail.com"],
    href: "mailto:blackbuildingacademy@gmail.com",
  },
  {
    icon: Clock,
    lines: ["Morning: 6:00 AM – 7:30 AM", "Evening: 4:30 PM – 10:00 PM"],
    href: null,
  },
];

export function Footer() {
  const [admissionOpen, setAdmissionOpen] = useState(false);

  return (
    <footer className="bg-[#080808] text-white relative section-shell">
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-academy-orange/50 to-transparent" />

      {/* CTA strip */}
      <div className="bg-academy-orange/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-academy-orange/20 rounded-lg">
                <GraduationCap className="w-5 h-5 text-academy-orange" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  Ready to excel academically?
                </p>
                <p className="text-gray-400 text-xs">
                  Join 3000+ students who trust BB Academy
                </p>
              </div>
            </div>
            <button
              onClick={() => setAdmissionOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-academy-orange hover:bg-[#e6a000] text-black font-bold text-sm rounded-xl transition-all duration-200 hover:scale-105 flex-shrink-0"
            >
              Apply for Admission
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-academy-orange/20 blur-md group-hover:blur-lg transition-all" />
                <Image
                  src="/LOGO_BB_ACADEMY.jpeg"
                  alt="BB Academy"
                  width={44}
                  height={44}
                  className="relative object-contain rounded-lg"
                />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">
                  Black Building
                </p>
                <p className="text-academy-orange font-bold text-base leading-tight">
                  Academy
                </p>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Chennai&#39;s No.1 Tuition Center with 10+ years of excellence in
              State Board education. 100% pass guarantee with personalized
              learning.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-all duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <div>
              <Image
                src="/iso_enhanced.jpg"
                alt="ISO Certification"
                width={90}
                height={90}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-px bg-academy-orange" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-academy-orange transition-colors text-sm flex items-center gap-1.5 group w-fit"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-px bg-academy-orange" />
              Our Courses
            </h3>
            <ul className="space-y-2.5">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-gray-400 hover:text-academy-orange transition-colors text-sm flex items-center gap-1.5 group w-fit"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-px bg-academy-orange" />
              Contact Info
            </h3>
            <div className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3 group">
                    <div className="p-1.5 rounded-lg bg-academy-orange/10 flex-shrink-0 mt-0.5 group-hover:bg-academy-orange/20 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-academy-orange" />
                    </div>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      {item.lines.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    className="block hover:opacity-90 transition-opacity"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} Black Building Academy. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="#"
                className="hover:text-academy-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-academy-orange transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={() => setAdmissionOpen(true)}
                className="hover:text-academy-orange transition-colors"
              >
                Admissions
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdmissionFormDialog
        open={admissionOpen}
        onOpenChange={setAdmissionOpen}
      />
    </footer>
  );
}
