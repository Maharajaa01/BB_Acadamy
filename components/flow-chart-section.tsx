"use client";

import { motion } from "framer-motion";
import { BookOpen, Layers, TrendingUp, GraduationCap } from "lucide-react";

const steps = [
  {
    title: "Foundation Phase (6th–9th)",
    desc: "Strong base building in core subjects with conceptual clarity and daily practice.",
    icon: BookOpen,
  },
  {
    title: "Board Preparation (10th)",
    desc: "Structured exam-focused learning with problem-solving speed and accuracy.",
    icon: Layers,
  },
  {
    title: "Specialization (11th)",
    desc: "Stream selection with deep conceptual understanding and advanced topics.",
    icon: TrendingUp,
  },
  {
    title: "Mastery (12th)",
    desc: "Board exam excellence with revision strategy, mock tests, and refinement.",
    icon: GraduationCap,
  },
];

export function FlowChartSection() {
  return (
    <section className="relative w-full py-28 bg-black text-white overflow-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-[size:40px_40px] animate-pulse" />
      </div>

      {/* FLOATING GLOWS */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 blur-[140px] rounded-full"
      />

      {/* TITLE */}
      <div className="relative text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Learning Progress <span className="text-yellow-400">Graph</span>
        </motion.h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base font-medium">
          Horizontal visual roadmap of academic growth
        </p>
      </div>

      {/* GRAPH WRAPPER */}
      <div className="relative w-full flex justify-center overflow-x-auto">
        <div className="relative w-[1000px] h-[300px]">
          {/* SVG HORIZONTAL PATH */}
          <svg className="absolute w-full h-full" viewBox="0 0 1000 300">
            <motion.path
              d="M 80 180 C 250 60, 400 260, 550 140 S 800 260, 920 120"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 2 }}
            />

            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* NODES HORIZONTAL */}
          <div className="absolute inset-0 flex items-center justify-between px-10">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center w-[220px]"
                >
                  {/* NODE */}
                  <div className="relative mb-4">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg" />
                    <div className="absolute inset-0 w-5 h-5 bg-yellow-400 rounded-full animate-ping opacity-40" />
                  </div>

                  {/* CARD */}
                  <div className="p-5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                    <Icon className="text-yellow-400 mx-auto mb-2" size={22} />
                    <h3 className="font-heading font-semibold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
