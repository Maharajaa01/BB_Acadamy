"use client"

import { useState } from "react"
import Image from "next/image"

const images = [
    "/teachers_making_centum.jpg",
    "/infrastructe.jpg",
    "/boys_landing.jpg",
    "/girls_landing.jpg",
]

export function InfrastructureSection() {
    const [activeImage, setActiveImage] = useState(images[0])

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-up">
                    <h2 className="text-4xl md:text-5xl font-heading text-academy-black mb-6 tracking-tight font-medium">
                        Our Infrastructure
                    </h2>
                    <p className="text-lg text-gray-800 max-w-4xl mx-auto tracking-wide leading-relaxed">
                        We create a supportive learning atmosphere that strengthens academic foundations, builds confidence, and helps students achieve outstanding results in their board examinations
                    </p>
                </div>

                <div className="flex flex-col gap-8 animate-fade-up delay-100 max-w-6xl mx-auto">
                    {/* Main Large Image */}
                    <div className="w-full relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 aspect-video md:aspect-[2.3/1]">
                        <Image
                            src={activeImage}
                            alt="Our Infrastructure"
                            fill
                            className="object-cover object-center transition-all duration-700 ease-in-out"
                            priority
                        />
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex justify-between gap-4 md:gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar">
                        {images.map((img, idx) => {
                            const isActive = activeImage === img
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative w-full min-w-[120px] aspect-[2/1] md:aspect-[2.2/1] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-center shadow-md ${isActive
                                        ? "ring-4 ring-offset-2 ring-academy-black opacity-100 shadow-xl scale-[1.02]"
                                        : "opacity-60 hover:opacity-100 hover:scale-[1.02] hover:shadow-lg"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Infrastructure Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 150px, 250px"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
