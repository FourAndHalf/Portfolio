import { cookies } from "next/headers";
import { getPreference } from "@/server/server-actions";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";
import { THEME_MODE_VALUES, THEME_PRESET_VALUES, type ThemeMode, type ThemePreset } from "@/types/preferences/theme";
import { LandingContent } from "@/features/landing/components/landing-content";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  const isLoggedIn = !!sessionToken;

  const [themeMode, themePreset] = await Promise.all([
    getPreference<ThemeMode>("theme_mode", THEME_MODE_VALUES, "dark"),
    getPreference<ThemePreset>("theme_preset", THEME_PRESET_VALUES, "technical-precision"),
  ]);

  return (
    <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
      <LandingContent isLoggedIn={isLoggedIn} />
    </PreferencesStoreProvider>
  );
}
