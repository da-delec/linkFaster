import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/landing-page/hero-section";
import { Github, Code2, ExternalLink, Users } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Features from "@/components/landing-page/features-sections";
import PricingSection from "@/components/landing-page/pricing-section";
import Navbar from "@/components/landing-page/navbar";
import QuestionSection from "@/components/landing-page/questionSections";
import FooterGlow from "@/components/landing-page/footer";
import BentoGrid from "@/components/landing-page/bentoGrid";
import MockupSection from "@/components/landing-page/mockup-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
     <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
      </main>
      <section id="features">
       <BentoGrid />
      </section>
      <section id="mockup">
        <MockupSection />
      </section>
      <section id="solutions">
        <QuestionSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="contact">
        <FooterGlow />
      </section>
    </div>
  );
}