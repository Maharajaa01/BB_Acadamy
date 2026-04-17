"use client"

import { motion } from "framer-motion"
import { Award, Users, Target, TrendingUp } from "lucide-react"

const highlights = [
  { icon: Award, title: "100% Pass", desc: "Guaranteed success" },
  { icon: Users, title: "10+ Years", desc: "Proven experience" },
  { icon: Target, title: "Personalised", desc: "Individual attention" },
  { icon: TrendingUp, title: "500+ Students", desc: "Happy learners" },
]

const advantages = [
  { label: "VLP System & personalised learning", strong: "100+ Unique Advantages" },
  { label: "Detailed report cards & KPI System", strong: "Performance Tracking" },
  { label: "Monthly payment options", strong: "Flexible Fees" },
  { label: "Track progress easily", strong: "Unique Seal System" },
]

const reasons = [
  { label: "For boys and girls — individual attention", strong: "Separate Classes" },
  { label: "Instant progress updates & tracking", strong: "Parent Communication" },
  { label: "Nurturing and secure learning space", strong: "Safe Environment" },
  { label: "Gifts, rewards & encouragement", strong: "Motivational Support" },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#FFB902] text-sm font-semibold uppercase tracking-widest mb-2">Who We Are</p>
          <h2 className="font-heading font-extrabold text-[#111111] text-3xl md:text-4xl mb-4">
            About Black Building Academy
          </h2>
          <div className="w-16 h-1 bg-[#FFB902] mx-auto rounded-full" />
        </motion.div>

        {/* Highlight stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#FFB902]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg bg-[#FFB902]/10 mb-3">
                  <Icon className="w-5 h-5 text-[#FFB902]" />
                </div>
                <p className="font-heading font-bold text-[#111111] text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm"
        >
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
            BB Academy is proud to be recognised as <strong className="text-[#111111]">Chennai&apos;s No.1 Tuition Center</strong>, offering top-tier educational support to students from 5th to 12th standard. With <strong className="text-[#111111]">over 10 years of experience</strong>, we provide a structured learning environment designed to ensure student success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-[#111111] text-lg mb-4 pb-2 border-b border-gray-100">Our Key Advantages</h3>
              <ul className="space-y-3">
                {advantages.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFB902]/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-[#FFB902]">✓</span>
                    <div>
                      <span className="font-semibold text-[#111111] text-sm">{item.strong}</span>
                      <p className="text-gray-500 text-xs mt-0.5">{item.label}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-[#111111] text-lg mb-4 pb-2 border-b border-gray-100">Why Choose Us?</h3>
              <ul className="space-y-3">
                {reasons.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFB902]/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-[#FFB902]">✓</span>
                    <div>
                      <span className="font-semibold text-[#111111] text-sm">{item.strong}</span>
                      <p className="text-gray-500 text-xs mt-0.5">{item.label}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-gray-600 text-base leading-relaxed border-t border-gray-100 pt-6">
            With our <strong className="text-[#111111]">competitive learning methods</strong>, <strong className="text-[#111111]">batch-wise coaching</strong>, and <strong className="text-[#111111]">100% pass guarantee</strong> in public exams, BB Academy is committed to helping students excel and achieve their educational goals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
