"use client";

import { TrendingUp, TrendingDown, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardData, cardColumns } from "./schema";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CardViewOptions } from "@/components/card-section/card-view-options";
import { Button } from "@/components/ui/button";

export function DocumentCard({ data: initialData }: { data: CardData[] }) {
    const [data, setData] = React.useState(() => initialData);

    return (
        <Tabs defaultValue="legal" className="w-full flex-col justify-start gap-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="view-selector" className="sr-only">
                    View
                </Label>
                <Select defaultValue="legal">
                    <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
                        <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="house-plan">Houseplan</SelectItem>
                        <SelectItem value="authority">Authority Sanctions</SelectItem>
                        <SelectItem value="contracts">Contracts</SelectItem>
                    </SelectContent>
                </Select>
                <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                    <TabsTrigger value="legal">
                        Legal
                    </TabsTrigger>
                    <TabsTrigger value="house-plan">
                        Houseplan
                    </TabsTrigger>
                    <TabsTrigger value="authority">
                        Authority Sanctions <Badge variant="secondary">2</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="contracts">
                        Contracts
                    </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <CardViewOptions data={data} columns={cardColumns} />
                    <Button variant="outline" size="sm">
                        <Plus />
                        <span className="hidden lg:inline">Add Section</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="legal" className="relative flex flex-col gap-4 overflow-auto">
                {/* <div className="overflow-hidden rounded-lg border">
                    <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
                </div>
                <DataTablePagination table={table} /> */}
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="house-plan" className="flex flex-col">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="authority" className="flex flex-col">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
            <TabsContent value="contracts" className="flex flex-col">
                <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
            </TabsContent>
        </Tabs>
    );
}