import { createStore } from "zustand/vanilla";

import type { ThemeMode, ThemePreset } from "@/types/preferences/theme";

export type PreferencesState = {
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  viewMode: "developer" | "manager";
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setViewMode: (mode: "developer" | "manager") => void;
};

export const createPreferencesStore = (init?: Partial<PreferencesState>) =>
  createStore<PreferencesState>()((set) => ({
    themeMode: init?.themeMode ?? "light",
    themePreset: init?.themePreset ?? "default",
    viewMode: init?.viewMode ?? "developer",
    setThemeMode: (mode) => set({ themeMode: mode }),
    setThemePreset: (preset) => set({ themePreset: preset }),
    setViewMode: (mode) => set({ viewMode: mode }),
  }));
