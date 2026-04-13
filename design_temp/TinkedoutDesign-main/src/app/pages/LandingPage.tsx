import { AnimatedBackground } from "../components/AnimatedBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorks } from "../components/HowItWorks";
import { SwipePreview } from "../components/SwipePreview";
import { MentorSection } from "../components/MentorSection";
import { CommunitySection } from "../components/CommunitySection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F1115", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>
      <AnimatedBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <SwipePreview />
        <HowItWorks />
        <MentorSection />
        <CommunitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
