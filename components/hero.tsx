"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Phone,
  Award,
  Star,
  GraduationCap,
  Users,
} from "lucide-react";

const carouselImages = [
  "/boys_landing.jpg",
  "/girls_landing.jpg",
  "/bb_academy.jpg",
  "/teachers_making_centum.jpg",
];

const badgeItems = [
  { icon: Award, label: "100% Pass" },
  { icon: Star, label: "Top Ranks" },
  { icon: GraduationCap, label: "10+ Years" },
  { icon: Users, label: "3000+ Students" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-academy-black text-white min-h-[85vh] flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background carousel images */}
      {carouselImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1500 ${index === currentSlide ? "opacity-25" : "opacity-0"}`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Decorative animated orbs */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-academy-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-academy-orange/8 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-academy-orange/3 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-academy-orange/30 bg-academy-orange/10 text-academy-orange text-sm font-medium mb-8 animate-fade-up backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-academy-orange animate-pulse" />
          Chennai&#39;s No.1 Tuition Center
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold mb-6 animate-fade-up leading-[1.05] delay-100">
          <span className="text-white">Black Building</span>
          <br />
          <span className="text-gradient-orange">Academy</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl mb-4 text-gray-300 font-medium max-w-3xl mx-auto animate-fade-up delay-200 leading-relaxed">
          &ldquo;Education is the most powerful weapon which you can use to
          change the world&rdquo;
        </p>

        {/* Promise */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-up delay-300">
          {[
            "100% Pass Guarantee",
            "Assured Marks",
            "Top Rank Holders",
            "0 Failures",
          ].map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-300 mb-16">
          <Link href="/notes">
            <Button
              size="lg"
              className="bg-academy-orange hover:bg-[#e6a000] text-black font-bold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-academy-orange/30 gap-2 group"
            >
              <BookOpen className="w-5 h-5" />
              View Notes
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent px-8 py-6 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105 gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Stat badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto animate-fade-up delay-400">
          {badgeItems.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200"
            >
              <div className="p-1.5 rounded-lg bg-academy-orange/20">
                <Icon className="w-3.5 h-3.5 text-academy-orange" />
              </div>
              <span className="text-white/90 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Slide indicator dots */}
        <div className="flex justify-center gap-2 mt-8">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? "w-6 h-2 bg-academy-orange"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
