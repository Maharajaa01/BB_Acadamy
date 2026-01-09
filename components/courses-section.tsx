import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, GraduationCap, School, Star, Trophy, Target, Sparkles } from "lucide-react"

const courses = [
  {
    std: "VI Std",
    label: "Foundation",
    icon: <School className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-50 border-blue-200 hover:border-blue-500"
  },
  {
    std: "VII Std",
    label: "Foundation",
    icon: <School className="w-8 h-8 text-indigo-500" />,
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-500"
  },
  {
    std: "VIII Std",
    label: "High School Prep",
    icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-50 border-purple-200 hover:border-purple-500"
  },
  {
    std: "IX Std",
    label: "High School",
    icon: <BookOpen className="w-8 h-8 text-pink-500" />,
    color: "bg-pink-50 border-pink-200 hover:border-pink-500"
  },
  {
    std: "X Std",
    label: "Board Exam",
    icon: <Target className="w-8 h-8 text-red-500" />,
    color: "bg-red-50 border-red-200 hover:border-red-500"
  },
  {
    std: "XI Std",
    label: "Higher Secondary",
    icon: <GraduationCap className="w-8 h-8 text-orange-500" />,
    color: "bg-orange-50 border-orange-200 hover:border-orange-500"
  },
  {
    std: "XII Std",
    label: "Board Exam",
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    color: "bg-yellow-50 border-yellow-200 hover:border-yellow-500"
  }
]

const features = [
  {
    title: "Proven Excellence",
    description:
      "With over 10 years of experience in the education field, BB Academy has a strong track record of delivering high-quality education and consistent results, making us Chennai's No.1 tuition center.",
    icon: <Star className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Personalized Learning",
    description:
      "We tailor our teaching methods to each student's unique learning style and pace, ensuring maximum comprehension and retention.",
    icon: <Sparkles className="w-6 h-6 text-blue-500" />
  },
]

export function CoursesSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Courses We Offer */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-academy-black mb-6">
            Courses We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-balance">
            At BB Academy, we offer a wide range of courses designed to help students from 5th to 12th standard excel in their academics.
          </p>
          <div className="w-24 h-1.5 bg-academy-orange mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
          {courses.map((course, index) => (
            <Card
              key={index}
              className={`group border-2 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${course.color} bg-white animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-current rounded-bl-3xl`}>
                {course.icon}
              </div>

              <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center min-h-[160px]">
                <div className="mb-4 p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{course.std}</h3>
                <span className="text-sm font-medium text-gray-500 bg-white/50 px-2 py-1 rounded-full">{course.label}</span>
              </CardContent>
            </Card>
          ))}

          {/* 'Join Now' Call to Action Card */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-academy-orange hover:bg-orange-50 transition-all duration-300 flex items-center justify-center min-h-[160px] cursor-pointer group animate-fade-up delay-700">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-400 group-hover:text-academy-orange transition-colors">Join Now -&gt;</h3>
            </CardContent>
          </Card>
        </div>

        {/* Our Teaching & Features */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-academy-black mb-6">Our Teaching Features</h2>
          <div className="w-24 h-1.5 bg-academy-orange mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 glass animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 flex flex-col sm:flex-row gap-6 items-start">
                <div className="p-4 bg-academy-orange/10 rounded-2xl shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-academy-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-pretty text-lg">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
