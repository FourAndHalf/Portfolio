# UI Overhaul & New Features

## Overview
This update introduces a "Command Center" aesthetic to the portfolio, catering to both Developer and Manager personas.

## Key Features

### 1. Command-K Interface
- **Trigger:** `Cmd+K` (or `Ctrl+K` on Windows/Linux).
- **Features:**
    - Navigation to Dashboard, Works, CRM.
    - **View Mode Toggle**: Switch between "Developer Mode" and "Manager Mode".
- **Implementation:** `src/components/command-menu.tsx`

### 2. Bento Grid Layout
- **Style:** Modular, grid-based layout inspired by Linear/Apple.
- **Usage:** Used in the "Manager HUD" to display high-level metrics.
- **Implementation:** `src/components/bento-grid.tsx`

### 3. Manager's HUD (Heads-Up Display)
- **Concept:** A specialized view for managers focusing on ROI, timelines, and efficiency.
- **Activation:** Use `Cmd+K` -> Select "Manager Mode (Midnight)" or "Manager Mode (Forest)".
- **Content:**
    - Project ROI
    - Delivery Timeline (Gantt-style visualization)
    - Team Velocity
    - Tech Stack Efficiency
- **Implementation:** `src/app/(dashboard)/developer/_components/manager-hud.tsx`

### 4. Professional Color Schemes
- **New Preset:** `Midnight Executive`
- **Aesthetic:** Deep slate/blue background, high contrast, trustworthy and premium feel.
- **File:** `src/styles/presets/midnight-executive.css`

## Testing
- **Framework:** Vitest + React Testing Library.
- **Run Tests:** `npx vitest run`
- **Coverage:**
    - `BentoGrid` rendering.
    - `ManagerHUD` metrics display.
    - `CommandMenu` interaction (Cmd+K).
    - `AppSidebar` navigation.

## Usage
1.  Start the app: `npm run dev`
2.  Press `Cmd+K`.
3.  Select "Manager Mode" to see the new HUD and Color Theme.
4.  Select "Developer Mode" to return to the original view.
