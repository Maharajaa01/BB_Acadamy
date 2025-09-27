import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-academy-black text-white py-20 lg:py-32 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-academy-orange/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance animate-fade-in-up">
          <span className="text-white">Black Building</span>
          <span className="text-academy-orange"> Academy</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-academy-orange font-semibold animate-fade-in-up">
          8 Years of Excellence in State Board 10th & 12th Exams
        </p>

        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto text-balance animate-fade-in-up">
          100% Pass Guarantee | Assured Marks | Top Rank Holders | 0 Failures
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Link href="/notes">
            <Button
              size="lg"
              className="bg-academy-orange hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View Notes
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-academy-orange text-academy-orange hover:bg-academy-orange hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
