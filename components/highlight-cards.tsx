import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    title: "Specialist in State Board",
    description: "Expert guidance for Tamil Nadu State Board curriculum with proven teaching methodologies",
    icon: "🎯",
  },
  {
    title: "Top Rank Holders",
    description: "Our students consistently achieve top ranks in board examinations year after year",
    icon: "🏆",
  },
  {
    title: "0 Failures",
    description: "100% pass guarantee with our comprehensive support system and personalized attention",
    icon: "✅",
  },
]

export function HighlightCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 glass animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-heading font-bold mb-3 text-academy-black">{highlight.title}</h3>
                <p className="text-gray-600 text-balance">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
