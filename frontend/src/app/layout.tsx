import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";

import { ToastProvider } from "@/components/sonner";
import { getPreference } from "@/server/server-actions";
import { THEME_MODE_VALUES, THEME_PRESET_VALUES, type ThemeMode, type ThemePreset } from "@/types/preferences/theme";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jinson E B",
  description: "Managing your commitments",
  icons: {
    icon: "/images/icon.png"
  }
  };

  export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [themeMode, themePreset] = await Promise.all([
    getPreference<ThemeMode>("theme_mode", THEME_MODE_VALUES, "dark"),
    getPreference<ThemePreset>("theme_preset", THEME_PRESET_VALUES, "default"),
  ]);

  return (
    <html lang="en" className={themeMode} data-theme-preset={themePreset}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-background`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
