import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-academy-black mb-4">About Black Building Academy!</h2>
          <div className="w-24 h-1 bg-academy-orange mx-auto"></div>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-8 md:p-12">
            <p className="text-lg leading-relaxed text-gray-700 mb-6 text-pretty">
              BB Academy is proud to be recognized as Chennai's No.1 Tuition Center, offering top-tier educational
              support to students from 5th to 12th standard across various schools. With over 10 years of experience in
              the education field, we provide a comprehensive and structured learning environment designed to ensure
              student success.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 mb-6 text-pretty">
              Our academy offers more than 100 unique advantages, including personalized learning through the VLP
              System, performance tracking with the KPI System for teachers, and detailed report cards to monitor
              student progress. We provide flexibility with monthly fees, maintain consistency with daily attendance and
              study tracking systems, and use our unique Seal System to mark progress as Excellent, Completed, or
              Incomplete.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 text-pretty">
              To keep students motivated, we have an Encouragement (Gifts) System and host regular motivational classes.
              Our batch-wise coaching and separate classes for boys and girls ensure personalized attention, while our
              instant communication with parents keeps them informed of their child's progress. We prioritize safety and
              security, creating a nurturing environment where students can focus on learning. With our competitive
              learning methods and a 100% pass guarantee in public exams, BB Academy is committed to helping students
              excel academically and achieve their educational goals.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
