import { DataTable } from "./_components/data-table";
import { dataTable } from "./_components/data";
import { SectionCards } from "./_components/section-cards";
import { InsightCards } from "./_components/chart-area";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards />
      <InsightCards />
      <DataTable data={dataTable} />
    </div>
  );
}