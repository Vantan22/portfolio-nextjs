"use client";

import AboutSection from "@/components/about";
import ContactSection from "@/components/contact";
import CustomCursor from "@/components/custom-cursor";
import EducationSection from "@/components/education";
import ExperienceSection from "@/components/experience";
import FooterSection from "@/components/footer";
import SkillsSection from "@/components/gallery";
import HeroSection from "@/components/hero";
import ProjectSection from "@/components/project";
import { useMobile } from "@/hooks/use-mobile";

export default function Page() {
  const isMobile = useMobile();
  return (
    <main className="min-h-screen bg-black text-white">
      {!isMobile && <CustomCursor />}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectSection />
      <EducationSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
