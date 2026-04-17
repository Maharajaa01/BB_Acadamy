import { Hero } from "@/components/hero";
import { HighlightCards } from "@/components/highlight-cards";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { CoursesSection } from "@/components/courses-section";
import { StudentsFeedback } from "@/components/students-feedback";
import { InfrastructureSection } from "@/components/infrastructure-section";
import { FlowChartSection } from "@/components/flow-chart-section";
import { GoogleReviews } from "@/components/google-reviews";
import { ScrollToTop } from "@/components/scroll-to-top";
import { InteractiveSection } from "@/components/interactive-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <InteractiveSection>
        <HighlightCards />
      </InteractiveSection>
      <div id="about">
        <InteractiveSection>
          <AboutSection />
        </InteractiveSection>
      </div>
      <InteractiveSection>
        <GoogleReviews />
      </InteractiveSection>
      <InteractiveSection>
        <StatsSection />
      </InteractiveSection>
      <div id="courses">
        <InteractiveSection>
          <CoursesSection />
        </InteractiveSection>
      </div>
      <InteractiveSection>
        <StudentsFeedback />
      </InteractiveSection>
      <InteractiveSection>
        <InfrastructureSection />
      </InteractiveSection>
      <InteractiveSection>
        <FlowChartSection />
      </InteractiveSection>
      <ScrollToTop />
    </div>
  );
}
