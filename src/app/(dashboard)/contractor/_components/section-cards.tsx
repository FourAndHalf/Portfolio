"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, CardProgressbar, CardContent } from "@/components/ui/card";
import { budgetUsageChartConfig, budgetUsageChartData } from "./contractor.config";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completion Percentage</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-5xl">46%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +2.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ahead of schedule <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Time saved 13 work hours</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Workforce Deployment</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-5xl">1,350</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              90%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            1350 of 1500 allocated <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">+5% vs yesterday</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Budget Usage</CardDescription>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              Underspending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="size-full max-h-10">
          <ChartContainer config={budgetUsageChartConfig} className="size-full">
            <BarChart accessibilityLayer data={budgetUsageChartData} layout="vertical">
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="utilised" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar stackId="a" dataKey="utilised" layout="vertical" fill="var(--color-actual)">
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-primary-foreground text-xs"
                />
                <LabelList
                  dataKey="utilised"
                  position="insideRight"
                  offset={8}
                  className="fill-primary-foreground text-xs tabular-nums"
                />
              </Bar>
              <Bar
                stackId="a"
                dataKey="remaining"
                layout="vertical"
                fill="var(--color-remaining)"
                radius={[0, 6, 6, 0]}
              >
                <LabelList
                  dataKey="remaining"
                  position="insideRight"
                  offset={8}
                  className="fill-primary-foreground text-xs tabular-nums"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Spending Accelerated <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Needs personal assistance</div>
        </CardFooter>
        {/* <CardFooter>
          <p className="text-muted-foreground text-xs">Average progress: 78% · 2 projects above target</p>
        </CardFooter> */}
        {/* <CardHeader>
          <CardDescription>Budget Usage</CardDescription>
          <CardProgressbar value={72} label="% utilised" />

          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              Underspending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Spending Accelerated <TrendingUp className="size-4" />
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Issues Reported</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-5xl">72</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            12 of 72 issues resolved <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Needs personal assistance</div>
        </CardFooter>
      </Card>
    </div>
  );
}