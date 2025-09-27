import { Hero } from "@/components/hero"
import { HighlightCards } from "@/components/highlight-cards"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { CoursesSection } from "@/components/courses-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HighlightCards />
      <div id="about">
        <AboutSection />
      </div>
      <StatsSection />
      <div id="courses">
        <CoursesSection />
      </div>
      <ScrollToTop />
    </div>
  )
}
