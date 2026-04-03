"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/teachers_making_centum.jpg",
  "/infrastructe.jpg",
  "/boys_landing.jpg",
  "/girls_landing.jpg",
];

export function InfrastructureSection() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white via-orange-50/40 to-white relative overflow-hidden section-shell">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-orange/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2">
            Campus
          </p>
          <h2 className="text-4xl md:text-5xl font-heading text-academy-black mb-6 tracking-tight font-medium">
            Our Infrastructure
          </h2>
          <p className="text-lg text-gray-800 max-w-4xl mx-auto tracking-wide leading-relaxed">
            We create a supportive learning atmosphere that strengthens academic
            foundations, builds confidence, and helps students achieve
            outstanding results in their board examinations
          </p>
        </div>

        <div className="flex flex-col gap-8 animate-fade-up delay-100 max-w-6xl mx-auto">
          {/* Main Large Image */}
          <div className="w-full relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 aspect-video md:aspect-[2.3/1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt="Our Infrastructure"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-black/45 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              Learning Environment
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {images.map((img, idx) => {
              const isActive = activeImage === img;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -4 }}
                  className={`relative w-full aspect-[2/1] md:aspect-[2.2/1] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md ${
                    isActive
                      ? "ring-4 ring-offset-2 ring-academy-black opacity-100 shadow-xl scale-[1.02]"
                      : "opacity-70 hover:opacity-100 hover:shadow-lg"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Infrastructure Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-academy-orange/10" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
