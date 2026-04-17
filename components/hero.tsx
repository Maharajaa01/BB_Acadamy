"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { AdmissionFormDialog } from "@/components/admission-form"

const carouselImages = [
  "/boys_landing.jpg",
  "/girls_landing.jpg",
  "/bb_academy.jpg",
  "/teachers_making_centum.jpg",
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [admissionOpen, setAdmissionOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="relative min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-[#111111]">
        {/* Carousel Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={carouselImages[currentSlide]}
              alt="BB Academy"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-transparent to-[#111111]/80" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#FFB902]/15 border border-[#FFB902]/30 text-[#FFB902] text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB902] animate-pulse" />
            Chennai&apos;s No.1 Tuition Center — 10+ Years
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-5"
          >
            Black Building
            <span className="block text-[#FFB902]">Academy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-3"
          >
            &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[#FFB902] font-semibold text-base md:text-lg mb-10 tracking-wide"
          >
            100% Pass Guarantee &nbsp;·&nbsp; Top Rank Holders &nbsp;·&nbsp; 0 Failures
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-[#FFB902] hover:bg-[#e5a702] text-[#111111] font-bold px-8 py-3 text-base rounded-xl transition-all duration-200 hover:scale-[1.03] shadow-[0_4px_20px_rgba(255,185,2,0.35)]"
              onClick={() => setAdmissionOpen(true)}
            >
              Enroll Now — Free Consultation
            </Button>
            <Link href="/notes">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white bg-transparent px-8 py-3 text-base rounded-xl transition-all duration-200"
              >
                View Study Notes
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? "w-6 h-2 bg-[#FFB902]" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      <AdmissionFormDialog open={admissionOpen} onOpenChange={setAdmissionOpen} />
    </>
  )
}
