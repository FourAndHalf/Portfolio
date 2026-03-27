"use client";

import { DataTable } from "./_components/data-table";
import { dataTable } from "./_components/data";
import { SectionCards } from "./_components/section-cards";
import { InsightCards } from "./_components/chart-area";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import { ManagerHUD } from "./_components/manager-hud";

export default function Page() {
  const viewMode = usePreferencesStore((state) => state.viewMode);

  if (viewMode === "manager") {
    return (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <ManagerHUD />
        <DataTable data={dataTable} />
      </div>
    );
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <InsightCards />
      <DataTable data={dataTable} />
    </div>
  );
}