"use client";

import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, Clock, BookOpen, School } from "lucide-react";

const stats = [
  {
    number: 50,
    label: "Expert Team Members",
    suffix: "+",
    icon: Users,
    color: "text-blue-400",
  },
  {
    number: 250,
    label: "Interns Trained",
    suffix: "+",
    icon: GraduationCap,
    color: "text-emerald-400",
  },
  {
    number: 10,
    label: "Years of Experience",
    suffix: "+",
    icon: Clock,
    color: "text-purple-400",
  },
  {
    number: 2500,
    label: "Students Trained",
    suffix: "+",
    icon: School,
    color: "text-academy-orange",
  },
  {
    number: 300,
    label: "Students at Present",
    suffix: "+",
    icon: BookOpen,
    color: "text-pink-400",
  },
];

function CountUpNumber({
  target,
  suffix = "",
  started,
}: {
  target: number;
  suffix?: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, started]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

export function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-10 md:py-12 bg-academy-black text-white relative overflow-hidden section-shell"
      ref={ref}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-academy-orange/3 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-orange/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-academy-orange/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-academy-orange text-sm font-semibold uppercase tracking-widest mb-2">
            Our Impact
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            Numbers That Speak
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/8 rounded-2xl p-5 md:p-6 text-center hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-academy-orange/10 animate-fade-up backdrop-blur-sm"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div
                  className={`inline-flex p-2.5 rounded-xl bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-academy-orange mb-2 font-heading tabular-nums">
                  <CountUpNumber
                    target={stat.number}
                    suffix={stat.suffix}
                    started={started}
                  />
                </div>

                {/* Label */}
                <p className="text-xs md:text-sm text-gray-400 leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
