"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

export const description = "An interactive area chart";

const chartData = [

  { date: "2024-04-01", planned: 0, actual: 0 },
  { date: "2024-04-02", planned: 1, actual: 0 },
  { date: "2024-04-03", planned: 2, actual: 1 },
  { date: "2024-04-04", planned: 3, actual: 2 },
  { date: "2024-04-05", planned: 4, actual: 3 },
  { date: "2024-04-06", planned: 6, actual: 4 },
  { date: "2024-04-07", planned: 7, actual: 5 },
  { date: "2024-04-08", planned: 8, actual: 6 },
  { date: "2024-04-09", planned: 9, actual: 7 },
  { date: "2024-04-10", planned: 10, actual: 8 },
  { date: "2024-04-11", planned: 11, actual: 9 },
  { date: "2024-04-12", planned: 12, actual: 10 },
  { date: "2024-04-13", planned: 13, actual: 11 },
  { date: "2024-04-14", planned: 15, actual: 13 },
  { date: "2024-04-15", planned: 16, actual: 14 },
  { date: "2024-04-16", planned: 17, actual: 15 },
  { date: "2024-04-17", planned: 18, actual: 16 },
  { date: "2024-04-18", planned: 19, actual: 17 },
  { date: "2024-04-19", planned: 20, actual: 19 },
  { date: "2024-04-20", planned: 22, actual: 21 },
  { date: "2024-04-21", planned: 23, actual: 22 },
  { date: "2024-04-22", planned: 24, actual: 23 },
  { date: "2024-04-23", planned: 25, actual: 26 }, 
  { date: "2024-04-24", planned: 26, actual: 28 },
  { date: "2024-04-25", planned: 27, actual: 30 },
  { date: "2024-04-26", planned: 28, actual: 32 },
  { date: "2024-04-27", planned: 30, actual: 34 },
  { date: "2024-04-28", planned: 31, actual: 36 },
  { date: "2024-04-29", planned: 32, actual: 37 },
  { date: "2024-04-30", planned: 33, actual: 38 },
  { date: "2024-05-01", planned: 34, actual: 40 },
  { date: "2024-05-02", planned: 35, actual: 42 },
  { date: "2024-05-03", planned: 37, actual: 44 },
  { date: "2024-05-04", planned: 38, actual: 45 },
  { date: "2024-05-05", planned: 39, actual: 47 },
  { date: "2024-05-06", planned: 40, actual: 48 },
  { date: "2024-05-07", planned: 41, actual: 47 }, 
  { date: "2024-05-08", planned: 42, actual: 46 },
  { date: "2024-05-09", planned: 43, actual: 45 },
  { date: "2024-05-10", planned: 45, actual: 46 },
  { date: "2024-05-11", planned: 46, actual: 47 },
  { date: "2024-05-12", planned: 47, actual: 48 },
  { date: "2024-05-13", planned: 48, actual: 49 },
  { date: "2024-05-14", planned: 49, actual: 50 },
  { date: "2024-05-15", planned: 50, actual: 49 }, 
  { date: "2024-05-16", planned: 51, actual: 50 },
  { date: "2024-05-17", planned: 52, actual: 51 },
  { date: "2024-05-18", planned: 54, actual: 52 },
  { date: "2024-05-19", planned: 55, actual: 53 },
  { date: "2024-05-20", planned: 56, actual: 54 },
  { date: "2024-05-21", planned: 57, actual: 55 },
  { date: "2024-05-22", planned: 58, actual: 56 },
  { date: "2024-05-23", planned: 59, actual: 57 },
  { date: "2024-05-24", planned: 60, actual: 58 },
  { date: "2024-05-25", planned: 62, actual: 60 },
  { date: "2024-05-26", planned: 63, actual: 61 },
  { date: "2024-05-27", planned: 64, actual: 62 },
  { date: "2024-05-28", planned: 65, actual: 63 },
  { date: "2024-05-29", planned: 66, actual: 64 },
  { date: "2024-05-30", planned: 67, actual: 65 },
  { date: "2024-05-31", planned: 68, actual: 66 },
  { date: "2024-06-01", planned: 70, actual: 67 },
  { date: "2024-06-02", planned: 71, actual: 69 }, 
  { date: "2024-06-03", planned: 72, actual: 70 },
  { date: "2024-06-04", planned: 73, actual: 71 },
  { date: "2024-06-05", planned: 74, actual: 72 },
  { date: "2024-06-06", planned: 75, actual: 73 },
  { date: "2024-06-07", planned: 76, actual: 74 },
  { date: "2024-06-08", planned: 77, actual: 76 },
  { date: "2024-06-09", planned: 79, actual: 77 },
  { date: "2024-06-10", planned: 80, actual: 78 },
  { date: "2024-06-11", planned: 81, actual: 79 },
  { date: "2024-06-12", planned: 82, actual: 80 },
  { date: "2024-06-13", planned: 83, actual: 81 },
  { date: "2024-06-14", planned: 84, actual: 82 },
  { date: "2024-06-15", planned: 85, actual: 83 },
  { date: "2024-06-16", planned: 87, actual: 84 },
  { date: "2024-06-17", planned: 88, actual: 86 },
  { date: "2024-06-18", planned: 89, actual: 87 },
  { date: "2024-06-19", planned: 90, actual: 88 },
  { date: "2024-06-20", planned: 91, actual: 89 },
  { date: "2024-06-21", planned: 92, actual: 90 },
  { date: "2024-06-22", planned: 93, actual: 91 },
  { date: "2024-06-23", planned: 94, actual: 92 },
  { date: "2024-06-24", planned: 96, actual: 93 },
  { date: "2024-06-25", planned: 97, actual: 94 },
  { date: "2024-06-26", planned: 98, actual: 95 },
  { date: "2024-06-27", planned: 99, actual: 96 },
  { date: "2024-06-28", planned: 100, actual: 97 },
  { date: "2024-06-29", planned: 100, actual: 97 },
  { date: "2024-06-30", planned: 100, actual: 98 }
];

const chartConfig = {
  visitors: {
    label: "Progression",
  },
  planned: {
    label: "Planned",
    color: "var(--chart-1)",
  },
  actual: {
    label: "Actual",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Project Progression</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="planned" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
            <Area dataKey="actual" type="natural" fill="url(#fillDesktop)" stroke="var(--color-desktop)" stackId="b" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}