"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

const carouselImages = [
  "/students-group-study-session-classroom.jpg",
  // "/students-receiving-awards-ceremony.jpg",
  "/boys_landing.jpg",
  "girls_landing.jpg",
  "/bb_academy.jpg",
  "/teachers_making_centum.jpg",
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-academy-black text-white py-20 lg:py-32 relative overflow-hidden">
      {/* Carousel Background Images */}
      {carouselImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-30" : "opacity-0"
            }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-orange/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-balance animate-fade-up">
          <span className="text-white">Black Building</span>
          <span className="text-academy-orange"> Academy</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-academy-orange font-semibold animate-fade-up delay-100">
          10+ Years of Excellence in State Board 10th & 12th Exams
        </p>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto text-balance animate-fade-up delay-200">
          100% Pass Guarantee | Assured Marks | Top Rank Holders | 0 Failures
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-300">
          <Link href="/notes">
            <Button
              size="lg"
              className="bg-academy-orange hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,107,0,0.5)]"
            >
              View Notes
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-academy-orange text-academy-orange hover:bg-academy-orange hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
