import { Card, CardContent } from "@/components/ui/card";
import { Target, Trophy, CheckCircle2, TrendingUp } from "lucide-react";

const highlights = [
  {
    title: "Specialist in State Board",
    description:
      "Expert guidance for Tamil Nadu State Board curriculum with proven teaching methodologies",
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    gradient: "from-blue-50 to-indigo-50",
  },
  {
    title: "Top Rank Holders",
    description:
      "Our students consistently achieve top ranks in board examinations year after year",
    icon: Trophy,
    color: "text-academy-orange",
    bg: "bg-orange-50",
    ring: "ring-orange-100",
    gradient: "from-orange-50 to-amber-50",
  },
  {
    title: "0 Failures",
    description:
      "100% pass guarantee with our comprehensive support system and personalized attention",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    gradient: "from-emerald-50 to-teal-50",
  },
];

export function HighlightCards() {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-white via-orange-50/50 to-white section-shell">
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-academy-orange/15 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-16 -right-12 w-64 h-64 bg-academy-orange/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 animate-fade-up">
          <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-3">
            Our Core Strengths
          </h2>
          <div className="w-16 h-1 bg-academy-orange mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={index}
                className={`soft-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${highlight.gradient} animate-fade-up overflow-hidden group h-full rounded-3xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 md:p-7 text-center relative flex flex-col h-full">
                  {/* Large background icon */}
                  <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <Icon className="w-28 h-28" />
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 ${highlight.bg} ring-4 ${highlight.ring} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${highlight.color}`} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-3 text-academy-black min-h-[56px] flex items-center justify-center">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                    {highlight.description}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className={`mt-5 h-0.5 w-12 mx-auto rounded-full ${highlight.color} opacity-40 group-hover:w-20 transition-all duration-300`}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
