"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, CardProgressbar, CardContent } from "@/components/ui/card";
import { budgetUsageChartConfig, budgetUsageChartData } from "./developer.config";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import React from "react";

export function SectionCards() {
        
    const [api, setApi] = React.useState<CarouselApi>()
    const [count, setCount] = React.useState(0)
    const [current, setCurrent] = React.useState(0);

    React.useEffect (() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])


  const [revealed, setRevealed] = React.useState(false);

  const handleClick = () => {
    if (window.innerWidth < 640) {
      setRevealed((prev) => !prev);
    }
  };

  return (
        <div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        onClick={handleClick}
        className={`@container/card transition-all duration-300 ${revealed ? "blur-none" : "blur-sm"
          } sm:hover:blur-none`}
      >
        <CardHeader>
          <CardDescription>Popcorn Tracker</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">236</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +3
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ahead of schedule <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">21 movies & 2 series this year</div>
        </CardFooter>
      </Card>
      <Card
        onClick={() => setRevealed(!revealed)}
        className={`@container/card transition-all duration-300 ${revealed ? "blur-none" : "blur-sm"
          } sm:hover:blur-none`}
      >
        <CardHeader>
          <CardDescription>Adventure Count</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">12</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              90%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More adventures ahead <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">1 more that last year</div>
        </CardFooter>
      </Card>
      <Card
        onClick={() => setRevealed(!revealed)}
        className={`@container/card transition-all duration-300 ${revealed ? "blur-none" : "blur-sm"
          } sm:hover:blur-none`}
      >
        <CardHeader>
          <CardDescription>Cash for Chaos</CardDescription>
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
          <div className="text-muted-foreground">1 project above target v/s 2 below target</div>
        </CardFooter>
      </Card>
      <Card
        onClick={() => setRevealed(!revealed)}
        className={`@container/card transition-all duration-300 ${revealed ? "blur-none" : "blur-sm"
          } sm:hover:blur-none`}
      >
        <CardHeader>
          <CardDescription>Passion Playbook</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">72</CardTitle>
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
          <div className="text-muted-foreground">Every session counts</div>
        </CardFooter>
      </Card>
    </div>

                        <div className="sm:hidden">
                <Carousel className="w-full"
                    setApi={setApi}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <Card className="@container/card">
        <CardHeader>
          <CardDescription>Popcorn Tracker</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">236</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +3
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ahead of schedule <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">21 movies & 2 series this year</div>
        </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="@container/card">
        <CardHeader>
          <CardDescription>Adventure Count</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">12</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              90%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More adventures ahead <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">1 more that last year</div>
        </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cash for Chaos</CardDescription>
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
          <div className="text-muted-foreground">1 project above target v/s 2 below target</div>
        </CardFooter>
                            </Card>
                        </CarouselItem>
                        <CarouselItem>
                            <Card className="@container/card">
        <CardHeader>
          <CardDescription>Passion Playbook</CardDescription>
          <CardTitle className="text-2xl font-semibold p-2 tabular-nums @[250px]/card:text-5xl">72</CardTitle>
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
          <div className="text-muted-foreground">Every session counts</div>
        </CardFooter>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>

                                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({length: 4}).map((_, i) => (
                        <button
                            key = {i - 1}
                            onClick = {() => setCurrent(i)}
                            className = {`h-2 w-2 rounded-full transition-all 
                                          ${current === i ? "w-4 bg-primary" : "bg-muted-foreground/30"}
                                        `}
                        />
                    ))}
                </div>

            </div>

    </div>
  );
}
