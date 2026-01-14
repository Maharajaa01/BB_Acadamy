import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Award, Users, Target, TrendingUp, Heart, Shield } from "lucide-react"

export function AboutSection() {
  const highlights = [
    { icon: Award, title: "100% Pass", desc: "Guaranteed success" },
    { icon: Users, title: "10+ Years", desc: "Proven experience" },
    { icon: Target, title: "Personalized", desc: "Individual attention" },
    { icon: TrendingUp, title: "500+ Students", desc: "Happy learners" },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-4">About Black Building Academy!</h2>
          <div className="w-24 h-1 bg-academy-orange mx-auto rounded-full"></div>
        </div>

        {/* All devices: Card-based view with highlights */}
        <div className="space-y-6 animate-fade-up delay-100">
          {/* Quick highlights - Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx} className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow hover:-translate-y-1">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-academy-orange/10 rounded-lg">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-academy-orange" />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm md:text-base text-academy-black">{item.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-2">{item.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main about content */}
          <Card className="border-0 shadow-xl bg-white glass">
            <CardContent className="p-6 md:p-12">
              <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-6 text-pretty">
                BB Academy is proud to be recognized as <strong>Chennai's No.1 Tuition Center</strong>, offering top-tier educational support to students from 5th to 12th standard. With <strong>over 10 years of experience</strong> in education, we provide a comprehensive and structured learning environment designed to ensure student success.
              </p>

              {/* Key Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-academy-black">Our Key Advantages</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>✓ <strong>100+ Unique Advantages</strong></p>
                    <p className="text-sm">VLP System & personalized learning</p>
                    <p>✓ <strong>Performance Tracking</strong></p>
                    <p className="text-sm">Detailed report cards & KPI System</p>
                    <p>✓ <strong>Flexible Fees</strong></p>
                    <p className="text-sm">Monthly payment options</p>
                    <p>✓ <strong>Unique Seal System</strong></p>
                    <p className="text-sm">Track progress easily</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-academy-black">Why Choose Us?</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>✓ <strong>Separate Classes</strong></p>
                    <p className="text-sm">For boys and girls - individual attention</p>
                    <p>✓ <strong>Parent Communication</strong></p>
                    <p className="text-sm">Instant progress updates & tracking</p>
                    <p>✓ <strong>Safe Environment</strong></p>
                    <p className="text-sm">Nurturing and secure learning space</p>
                    <p>✓ <strong>Motivational Support</strong></p>
                    <p className="text-sm">Gifts, rewards & encouragement</p>
                  </div>
                </div>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-gray-700 text-pretty">
                With our <strong>competitive learning methods</strong>, <strong>batch-wise coaching</strong>, and <strong>100% pass guarantee</strong> in public exams, BB Academy is committed to helping students excel academically and achieve their educational goals. We maintain consistency with daily attendance tracking, instant parent communication, and create a nurturing environment where students can focus on learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
