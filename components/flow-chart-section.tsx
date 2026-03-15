"use client"

import Image from "next/image"

export function FlowChartSection() {
    return (
        <section className="py-20 bg-gray-50 flex justify-center items-center">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4 animate-fade-up">
                        Our Learning <span className="text-academy-orange">Process</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-academy-orange mx-auto rounded-full"></div>
                </div>
                <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl relative animate-fade-up delay-100 bg-white">
                    <Image
                        src="/flow_chart_new1.jpeg"
                        alt="Learning Process Flow Chart"
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    )
}
