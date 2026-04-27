"use client"

import Image from "next/image"

import Link from "next/link"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { AdmissionFormDialog } from "@/components/admission-form"

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
)

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Courses", href: "/#courses" },
  { name: "Notes", href: "/notes" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

const courses = [
  { name: "Foundation (Classes 6-9)", href: "/#courses" },
  { name: "Public Exam (Classes 10-12)", href: "/#courses" },
]

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/blackbuildingacademy/", icon: FacebookIcon },
  { name: "Instagram", href: "https://www.instagram.com/blackbuildingacademy/", icon: InstagramIcon },
  { name: "YouTube", href: "https://www.youtube.com/@bbacademy", icon: YoutubeIcon },
]

export function Footer() {
  const [admissionOpen, setAdmissionOpen] = useState(false)
  return (
    <footer className="bg-academy-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/LOGO_BB_ACADEMY.jpeg"
                alt="Black Building Academy logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="text-2xl font-bold">
                <span className="text-white">Black Building</span>
                <span className="text-academy-orange"> Academy</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chennai's No.1 Tuition Center with 10+ years of excellence in State Board education. 100% pass guarantee
              with personalized learning approach.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-academy-orange transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            {/* ISO certification badge */}
            <div className="mt-4">
              <Image

                src="/iso_enhanced.jpg"
                alt="ISO Certification"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-academy-orange">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-academy-orange transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-academy-orange">Our Courses</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    href={course.href}
                    className="text-gray-300 hover:text-academy-orange transition-colors text-sm"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-academy-orange">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-academy-orange flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">

                  <p>10, Vivekananda Street,</p>
                  <p>MGR Nagar, Nesapakkam, Chennai</p>
                  <p>,Tamil Nadu 600078</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-academy-orange flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>+91 79045 09575</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-academy-orange flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>blackbuildingacademy@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-academy-orange flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>Morning: 6:00 AM – 7:30 AM</p>
                  <p>Evening: 4:30 PM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">© 2025 Black Building Academy | All Rights Reserved.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-academy-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-academy-orange transition-colors">
                Terms of Service
              </Link>
              <button
                onClick={() => setAdmissionOpen(true)}
                className="hover:text-academy-orange transition-colors cursor-pointer"
              >
                Admissions
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdmissionFormDialog open={admissionOpen} onOpenChange={setAdmissionOpen} />
    </footer>
  )
}
