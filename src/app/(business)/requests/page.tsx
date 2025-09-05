import { Heading } from "@/features/business/components/heading";
import { DataTable } from "./_components/data-table";
import { headerData, tableData } from "./_components/data";

export default function Page() {
    return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
            <Heading header={headerData.header} subHeader={headerData.subHeader} />
            <DataTable data={tableData} />
        </div>
    );
}