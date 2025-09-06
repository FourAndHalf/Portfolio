import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

// Extend TableMeta to include updateDate method
declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    updateDate?: (id: number, field: string, value: Date | undefined) => Promise<void>;
  }
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { toDateInputValue, fromDateInputValue } from "@/lib/utils";

import { sectionSchema } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";
import React from "react";

export const milestoneColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Milestone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 justify-start">
          <TableCellViewer item={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Importance" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Done" ? (
            <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
          ) : (
            <Loader />
          )}
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "targetdate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Target Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.targetdate ? toDateInputValue(row.original.targetdate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = toDateInputValue(row.original.targetdate);
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "targetdate",
            fromDateInputValue(value)
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-targetdate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {row.original.targetdate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.targetdate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "completiondate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Completion Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.completiondate ? toDateInputValue(row.original.completiondate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = row.original.completiondate
          ? toDateInputValue(row.original.completiondate)
          : "";
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "completiondate",
            value ? fromDateInputValue(value) : undefined
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-completiondate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer min-h-[32px] flex items-center"
              onClick={() => setEditing(true)}
            >
              {row.original.completiondate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.completiondate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "reviewer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reviewer" />,
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <div className="w-32">
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Navneeth">Navneeth</SelectItem>
              <SelectItem value="Sahin Hussein">Sahin Hussein</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];


export const workforceColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Milestone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 justify-start">
          <TableCellViewer item={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Importance" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Done" ? (
            <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
          ) : (
            <Loader />
          )}
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "targetdate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Target Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.targetdate ? toDateInputValue(row.original.targetdate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = toDateInputValue(row.original.targetdate);
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "targetdate",
            fromDateInputValue(value)
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-targetdate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {row.original.targetdate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.targetdate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "completiondate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Completion Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.completiondate ? toDateInputValue(row.original.completiondate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = row.original.completiondate
          ? toDateInputValue(row.original.completiondate)
          : "";
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "completiondate",
            value ? fromDateInputValue(value) : undefined
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-completiondate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer min-h-[32px] flex items-center"
              onClick={() => setEditing(true)}
            >
              {row.original.completiondate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.completiondate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "reviewer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reviewer" />,
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <div className="w-32">
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Navneeth">Navneeth</SelectItem>
              <SelectItem value="Sahin Hussein">Sahin Hussein</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export const groundStaffsColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Milestone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 justify-start">
          <TableCellViewer item={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Importance" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Done" ? (
            <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
          ) : (
            <Loader />
          )}
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "targetdate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Target Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.targetdate ? toDateInputValue(row.original.targetdate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = toDateInputValue(row.original.targetdate);
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "targetdate",
            fromDateInputValue(value)
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-targetdate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {row.original.targetdate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.targetdate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "completiondate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Completion Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.completiondate ? toDateInputValue(row.original.completiondate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = row.original.completiondate
          ? toDateInputValue(row.original.completiondate)
          : "";
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "completiondate",
            value ? fromDateInputValue(value) : undefined
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-completiondate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer min-h-[32px] flex items-center"
              onClick={() => setEditing(true)}
            >
              {row.original.completiondate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.completiondate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "reviewer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reviewer" />,
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <div className="w-32">
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Navneeth">Navneeth</SelectItem>
              <SelectItem value="Sahin Hussein">Sahin Hussein</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];

export const inventoryColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Milestone" />,
    cell: ({ row }) => {
      return (
        <div className="w-32 justify-start">
          <TableCellViewer item={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Importance" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="w-16">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === "Done" ? (
            <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
          ) : (
            <Loader />
          )}
          {row.original.status}
        </Badge>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "targetdate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Target Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.targetdate ? toDateInputValue(row.original.targetdate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = toDateInputValue(row.original.targetdate);
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "targetdate",
            fromDateInputValue(value)
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-targetdate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {row.original.targetdate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.targetdate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "completiondate",
    header: ({ column }) => (
      <div className="w-16 justify-start">
        <DataTableColumnHeader column={column} title="Completion Date" />
      </div>
    ),
    cell: ({ row, table }) => {
      const [value, setValue] = React.useState(
        row.original.completiondate ? toDateInputValue(row.original.completiondate) : ""
      );
      const [editing, setEditing] = React.useState(false);

      const save = async () => {
        setEditing(false);
        const current = row.original.completiondate
          ? toDateInputValue(row.original.completiondate)
          : "";
        if (value === current) return;

        const p =
          table.options.meta?.updateDate?.(
            row.original.id,
            "completiondate",
            value ? fromDateInputValue(value) : undefined
          ) ?? new Promise((r) => setTimeout(r, 800));

        await toast.promise(p, {
          loading: `Saving ${row.original.header}`,
          success: "Saved",
          error: "Error",
        });
      };

      return (
        <div className="w-16 justify-start">
          {editing ? (
            <Input
              id={`${row.id}-completiondate`}
              type="date"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-40 bg-transparent px-2 pr-8 py-1 text-sm tabular-nums rounded-md border border-border focus:border-border focus:outline-none text-left"
              autoFocus
            />
          ) : (
            <div
              className="w-40 px-2 py-1 text-sm tabular-nums rounded-md border border-transparent hover:border-border cursor-pointer min-h-[32px] flex items-center"
              onClick={() => setEditing(true)}
            >
              {row.original.completiondate
                ? new Intl.DateTimeFormat("en-GB").format(new Date(row.original.completiondate))
                : ""}
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "reviewer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reviewer" />,
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <div className="w-32">
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Navneeth">Navneeth</SelectItem>
              <SelectItem value="Sahin Hussein">Sahin Hussein</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];