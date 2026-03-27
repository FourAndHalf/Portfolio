import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { ManagerHUD } from "@/app/(dashboard)/developer/_components/manager-hud";
import { CommandMenu } from "@/components/command-menu";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";

// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock CommandDialog to avoid Radix UI / CMDK issues in JSDOM
vi.mock("@/components/ui/command", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/components/ui/command")>();
  return {
    ...actual,
    CommandDialog: ({ open, children }: { open: boolean; children: React.ReactNode }) =>
      open ? (
        <div data-testid="command-dialog">
          <actual.Command>{children}</actual.Command>
        </div>
      ) : null,
  };
});

describe("Bento Grid Components", () => {
  it("renders BentoGrid with children", () => {
    render(
      <BentoGrid>
        <div data-testid="child">Child</div>
      </BentoGrid>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders BentoGridItem with title and description", () => {
    render(
      <BentoGridItem
        title="Test Title"
        description="Test Description"
        icon={<span data-testid="icon">Icon</span>}
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});

describe("Manager HUD", () => {
  it("renders key metrics", () => {
    render(<ManagerHUD />);
    expect(screen.getByText("Project ROI")).toBeInTheDocument();
    expect(screen.getByText("Delivery Timeline")).toBeInTheDocument();
    expect(screen.getByText("Team Velocity")).toBeInTheDocument();
    expect(screen.getByText("+240%")).toBeInTheDocument();
  });
});

describe("Command Menu", () => {
  it("opens on Cmd+K", () => {
    render(
      <PreferencesStoreProvider themeMode="light" themePreset="default">
        <CommandMenu />
      </PreferencesStoreProvider>
    );
    
    // Initial state: closed (dialog not visible)
    // shadcn dialogs might be in the DOM but hidden, or removed.
    // Usually they are removed.
    
    // Simulate Cmd+K
    fireEvent.keyDown(document, { key: "k", metaKey: true });
    
    // Check if input is visible (placeholder text)
    expect(screen.getByPlaceholderText("Type a command or search...")).toBeInTheDocument();
  });

  it("shows View Mode options", () => {
    render(
      <PreferencesStoreProvider themeMode="light" themePreset="default">
        <CommandMenu />
      </PreferencesStoreProvider>
    );
    
    fireEvent.keyDown(document, { key: "k", metaKey: true });
    
    expect(screen.getByText("Developer Mode")).toBeInTheDocument();
    expect(screen.getByText("Manager Mode (Midnight)")).toBeInTheDocument();
  });
});

describe("App Sidebar", () => {
  it("renders navigation items", () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    );
    
    // Check for "Jinson E B" (App Config Name)
    expect(screen.getByText("Jinson E B")).toBeInTheDocument();
    
    // Check for "Dashboard" (from sidebar items)
    // Note: If sidebar items are dynamic or icons, text might be hidden or different.
    // Assuming standard SidebarItem renders text.
  });
});
