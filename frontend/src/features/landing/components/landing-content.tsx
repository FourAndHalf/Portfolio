"use client";

import React, { useEffect } from "react";
import { updateThemePreset, updateThemeMode } from "@/lib/theme-utils";
import { Navigation } from "@/features/landing/components/navigation";
import { Hero } from "@/features/landing/components/hero";
import { BentoSection } from "@/features/landing/components/bento-section";
import { Footer } from "@/features/landing/components/footer";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

export const LandingContent = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const themeMode = usePreferencesStore((s) => s.themeMode);

  useEffect(() => {
    // Force the Technical Precision preset for the landing page
    updateThemePreset("technical-precision");
    // Ensure the body class matches the initial theme mode from the store
    updateThemeMode(themeMode);
  }, [themeMode]);

  return (
    <main className="min-h-screen bg-background text-foreground font-display selection:bg-primary/30 selection:text-primary">
      <Navigation isLoggedIn={isLoggedIn} />
      <Hero isLoggedIn={isLoggedIn} />
      <BentoSection />
      <Footer />
    </main>
  );
};
