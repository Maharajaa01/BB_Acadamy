"use client";

import Image from "next/image";

export function FlowChartSection() {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-orange-50/35 to-white flex justify-center items-center relative overflow-hidden section-shell">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-orange/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2 animate-fade-up">
            Methodology
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-3 animate-fade-up">
            Our Learning <span className="text-academy-orange">Process</span>
          </h2>
          <div className="w-16 h-1 bg-academy-orange mx-auto rounded-full"></div>
        </div>
        <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative animate-fade-up delay-100 bg-white group">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-transparent" />
          <Image
            src="/flow_chart_new1.jpeg"
            alt="Learning Process Flow Chart"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}
