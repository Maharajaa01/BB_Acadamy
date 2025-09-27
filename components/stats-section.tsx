import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { number: "50+", label: "Expert team members" },
  { number: "250+", label: "No of interns trained" },
  { number: "10+", label: "Year of experience" },
  { number: "2500+", label: "No of students trained" },
  { number: "300+", label: "No of students at present" },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-academy-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-transparent border-academy-orange border-2 hover:bg-academy-orange/10 transition-colors duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-academy-orange mb-2">{stat.number}</div>
                <p className="text-sm md:text-base text-white text-balance">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
