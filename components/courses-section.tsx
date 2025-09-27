import { Card, CardContent } from "@/components/ui/card"

const courses = ["VI Std", "VII Std", "VIII Std", "IX Std", "X Std", "XI Std", "XII Std"]

const features = [
  {
    title: "Proven Excellence",
    description:
      "With over 10 years of experience in the education field, BB Academy has a strong track record of delivering high-quality education and consistent results, making us Chennai's No.1 tuition center.",
  },
  {
    title: "Personalized Learning",
    description:
      "We tailor our teaching methods to each student's unique learning style and pace, ensuring maximum comprehension and retention.",
  },
]

export function CoursesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Courses We Offer */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-academy-black mb-4">Course We Offer</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-balance">
            At BB Academy, we offer a wide range of courses designed to help students from 5th to 12th standard excel in
            their academics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-academy-orange hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-bold text-academy-black">{course}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Teaching & Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-academy-black mb-4">Our Teaching & Our Features</h2>
          <div className="w-24 h-1 bg-academy-orange mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-academy-orange transition-colors duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-academy-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
