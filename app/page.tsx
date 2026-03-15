import { Hero } from "@/components/hero"
import { HighlightCards } from "@/components/highlight-cards"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { CoursesSection } from "@/components/courses-section"
import { StudentsFeedback } from "@/components/students-feedback"
import { InfrastructureSection } from "@/components/infrastructure-section"
import { FlowChartSection } from "@/components/flow-chart-section"
import { GoogleReviews } from "@/components/google-reviews"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HighlightCards />
      <div id="about">
        <AboutSection />
      </div>
      <GoogleReviews />
      <StatsSection />
      <div id="courses">
        <CoursesSection />
      </div>
      <StudentsFeedback />
      <InfrastructureSection />
      <FlowChartSection />
      <ScrollToTop />
    </div>
  )
}

