"use client";

import React, { useEffect } from "react";
import { updateThemePreset } from "@/lib/theme-utils";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";
import { Navigation } from "@/features/landing/components/navigation";
import { Hero } from "@/features/landing/components/hero";
import { BentoSection } from "@/features/landing/components/bento-section";
import { Footer } from "@/features/landing/components/footer";

export default function LandingPage() {
  useEffect(() => {
    // Force the Technical Precision preset for the landing page
    updateThemePreset("technical-precision");
  }, []);

  return (
    <PreferencesStoreProvider themeMode="dark" themePreset="technical-precision">
      <main className="min-h-screen bg-background text-foreground font-display selection:bg-primary/30 selection:text-primary">
        <Navigation />
        <Hero />
        <BentoSection />
        <Footer />
      </main>
    </PreferencesStoreProvider>
  );
}
