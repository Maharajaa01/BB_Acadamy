import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, TrendingUp, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const highlights = [
    {
      icon: Award,
      title: "100% Pass",
      desc: "Guaranteed success",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Users,
      title: "10+ Years",
      desc: "Proven experience",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Target,
      title: "Personalized",
      desc: "Individual attention",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: TrendingUp,
      title: "3000+ Students",
      desc: "Happy learners",
      color: "text-academy-orange",
      bg: "bg-orange-50",
    },
  ];

  const advantages = [
    {
      title: "100+ Unique Advantages",
      desc: "VLP System & personalized learning",
    },
    {
      title: "Performance Tracking",
      desc: "Detailed report cards & KPI System",
    },
    { title: "Flexible Fees", desc: "Monthly payment options" },
    { title: "Unique Seal System", desc: "Track progress easily" },
  ];

  const reasons = [
    {
      title: "Separate Classes",
      desc: "For boys and girls - individual attention",
    },
    {
      title: "Parent Communication",
      desc: "Instant progress updates & tracking",
    },
    { title: "Safe Environment", desc: "Nurturing and secure learning space" },
    { title: "Motivational Support", desc: "Gifts, rewards & encouragement" },
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-b from-orange-50/35 via-white to-orange-50/35 section-shell">
      <div className="absolute -top-20 right-0 w-72 h-72 bg-academy-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-16 left-0 w-64 h-64 bg-academy-orange/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14 animate-fade-up">
          <p className="text-academy-orange font-semibold text-sm uppercase tracking-widest mb-2">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4">
            About Black Building Academy
          </h2>
          <div className="w-16 h-1 bg-academy-orange mx-auto rounded-full" />
        </div>

        <div className="space-y-6 md:space-y-7 animate-fade-up delay-100">
          {/* Quick highlights - Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="soft-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group rounded-2xl"
                >
                  <CardContent className="p-5 text-center">
                    <div
                      className={`inline-flex p-3 ${item.bg} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-academy-black">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main content card */}
          <Card className="soft-card shadow-xl overflow-hidden rounded-3xl">
            <CardContent className="p-6 md:p-10">
              <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-8">
                BB Academy is proud to be recognized as{" "}
                <strong className="text-academy-black">
                  Chennai&#39;s No.1 Tuition Center
                </strong>
                , offering top-tier educational support to students from 5th to
                12th standard. With{" "}
                <strong className="text-academy-black">
                  over 10 years of experience
                </strong>{" "}
                in education, we provide a comprehensive and structured learning
                environment designed to ensure student success.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Key Advantages */}
                <div>
                  <h3 className="font-bold text-lg text-academy-black mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-academy-orange rounded-full" />
                    Our Key Advantages
                  </h3>
                  <div className="space-y-3">
                    {advantages.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="mt-0.5 flex-shrink-0">
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-academy-black">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Choose Us */}
                <div>
                  <h3 className="font-bold text-lg text-academy-black mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-500 rounded-full" />
                    Why Choose Us?
                  </h3>
                  <div className="space-y-3">
                    {reasons.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className="mt-0.5 flex-shrink-0">
                          <CheckCircle2 className="w-4.5 h-4.5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-academy-black">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed text-gray-700">
                With our{" "}
                <strong className="text-academy-black">
                  competitive learning methods
                </strong>
                ,{" "}
                <strong className="text-academy-black">
                  batch-wise coaching
                </strong>
                , and{" "}
                <strong className="text-academy-black">
                  100% pass guarantee
                </strong>{" "}
                in public exams, BB Academy is committed to helping students
                excel academically and achieve their educational goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
