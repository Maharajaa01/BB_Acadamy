"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { number: 50, label: "Expert Team Members", suffix: "+" },
  { number: 250, label: "Interns Trained", suffix: "+" },
  { number: 10, label: "Years of Experience", suffix: "+" },
  { number: 2500, label: "Students Trained", suffix: "+" },
  { number: 300, label: "Current Students", suffix: "+" },
]

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!inView) return
    let start: number
    const duration = 1800
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsSection() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#FFB902] text-sm font-semibold uppercase tracking-widest mb-2">Our Impact</p>
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/8 bg-white/4 hover:border-[#FFB902]/40 hover:bg-[#FFB902]/5 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-heading font-extrabold text-[#FFB902] mb-2">
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-gray-400 text-sm leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
