"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";

import { milestoneColumns, workforceColumns, groundStaffsColumns, inventoryColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ data: initialData }: { data: any[] }) {
  const [activeTab, setActiveTab] = React.useState('milestones');
  const [data, setData] = React.useState(() =>
    initialData.map(item => ({
      ...item,
      targetdate: item.targetdate ? new Date(item.targetdate) : null,
      completiondate: item.completiondate ? new Date(item.completiondate) : null,
    }))
  );
  const milestoneCols = withDndColumn(milestoneColumns);
  const workforceCols = withDndColumn(workforceColumns);
  const groundStaffsCols = withDndColumn(groundStaffsColumns);
  const inventoryCols = withDndColumn(inventoryColumns);
  const milestoneTable = useDataTableInstance({ data, columns: milestoneCols, getRowId: (row) => row.id.toString() });
  const workforceTable = useDataTableInstance({ data, columns: workforceCols, getRowId: (row) => row.id.toString() });
  const groundStaffsTable = useDataTableInstance({ data, columns: groundStaffsCols, getRowId: (row) => row.id.toString() });
  const inventoryTable = useDataTableInstance({ data, columns: inventoryCols, getRowId: (row) => row.id.toString() });

  const tables: Record<string, any> = {
    milestones: milestoneTable,
    workforce: workforceTable,
    'ground-staffs': groundStaffsTable,
    inventory: inventoryTable,
  }

  return (
    <Tabs defaultValue="inventory" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="inventory">
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inventory">Inventory</SelectItem>
            <SelectItem value="ground-staffs">Ground Staffs</SelectItem>
            <SelectItem value="paperwork">Paperwork</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="inventory">
            Inventory <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="ground-staffs">
            Ground Staffs
          </TabsTrigger>
          <TabsTrigger value="paperwork">
            Paperwork
          </TabsTrigger>
          <TabsTrigger value="invoice">
            Invoice
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={tables[activeTab]} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Request</span>
          </Button>
        </div>
      </div>
      <TabsContent value="inventory" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={milestoneTable} columns={milestoneCols} onReorder={setData} />
        </div>
        <DataTablePagination table={milestoneTable} />
      </TabsContent>
      <TabsContent value="ground-staffs" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={workforceTable} columns={workforceCols} />
        </div>
        <DataTablePagination table={workforceTable} />
      </TabsContent>
      <TabsContent value="paperwork" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={groundStaffsTable} columns={groundStaffsCols} />
        </div>
        <DataTablePagination table={groundStaffsTable} />
      </TabsContent>
      <TabsContent value="invoice" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew dndEnabled table={inventoryTable} columns={inventoryCols} />
        </div>
        <DataTablePagination table={inventoryTable} />
      </TabsContent>
    </Tabs>
  );
}