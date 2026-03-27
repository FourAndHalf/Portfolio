"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  LayoutGrid,
  Code,
  Briefcase,
  Monitor,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import { updateThemePreset } from "@/lib/theme-utils";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const viewMode = usePreferencesStore((state) => state.viewMode);
  const setViewMode = usePreferencesStore((state) => state.setViewMode);
  const setThemePreset = usePreferencesStore((state) => state.setThemePreset);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push("/developer"))}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/works"))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Works</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/crm"))}>
            <User className="mr-2 h-4 w-4" />
            <span>CRM</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="View Mode">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setViewMode("developer");
                setThemePreset("brutalist");
                updateThemePreset("brutalist");
              })
            }
          >
            <Code className="mr-2 h-4 w-4" />
            <span>Developer Mode</span>
            {viewMode === "developer" && <CommandShortcut>Active</CommandShortcut>}
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setViewMode("manager");
                setThemePreset("midnight-executive");
                updateThemePreset("midnight-executive");
              })
            }
          >
            <Monitor className="mr-2 h-4 w-4" />
            <span>Manager Mode (Midnight)</span>
            {viewMode === "manager" && <CommandShortcut>Active</CommandShortcut>}
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setViewMode("manager");
                setThemePreset("forest-minimalist");
                updateThemePreset("forest-minimalist");
              })
            }
          >
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Manager Mode (Forest)</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
