"use client"

import { motion } from "framer-motion"
import { Target, Trophy, CheckCircle } from "lucide-react"

const highlights = [
  {
    title: "Specialist in State Board",
    description: "Expert guidance for Tamil Nadu State Board curriculum with proven teaching methodologies",
    icon: Target,
  },
  {
    title: "Top Rank Holders",
    description: "Our students consistently achieve top ranks in board examinations year after year",
    icon: Trophy,
  },
  {
    title: "0 Failures",
    description: "100% pass guarantee with our comprehensive support system and personalised attention",
    icon: CheckCircle,
  },
]

export function HighlightCards() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#FFB902]/40 hover:shadow-[0_8px_30px_rgba(255,185,2,0.1)] transition-all duration-300"
              >
                <div className="p-3.5 rounded-xl bg-[#FFB902]/10 mb-4 group-hover:bg-[#FFB902]/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#FFB902]" />
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
