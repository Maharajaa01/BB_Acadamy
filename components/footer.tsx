import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Courses", href: "/#courses" },
  { name: "Notes", href: "/notes" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

const courses = [
  { name: "VI Standard", href: "/notes" },
  { name: "VII Standard", href: "/notes" },
  { name: "VIII Standard", href: "/notes" },
  { name: "IX Standard", href: "/notes" },
  { name: "X Standard", href: "/notes" },
  { name: "XI Standard", href: "/notes" },
  { name: "XII Standard", href: "/notes" },
]

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-academy-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-white">Black Building</span>
              <span className="text-academy-orange"> Academy</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chennai's No.1 Tuition Center with 8 years of excellence in State Board education. 100% pass guarantee
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
                  <p>123 Education Street</p>
                  <p>T. Nagar, Chennai - 600017</p>
                  <p>Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-academy-orange flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>+91 98765 43210</p>
                  <p>+91 87654 32109</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-academy-orange flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>info@blackbuildingacademy.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-academy-orange flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                  <p>Sat: 8:00 AM - 6:00 PM</p>
                  <p>Sun: 9:00 AM - 2:00 PM</p>
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
              <Link href="#" className="hover:text-academy-orange transition-colors">
                Admissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
