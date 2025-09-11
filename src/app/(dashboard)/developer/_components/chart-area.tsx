"use client";

import { format, subMonths } from "date-fns";
import { XAxis, Label, Pie, PieChart, Bar, BarChart, CartesianGrid, LabelList, YAxis, PolarRadiusAxis, RadialBarChart, RadialBar } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartConfig } from "@/components/ui/chart";

import {
    experienceByCompanyChartData,
    experienceByCompanyChartConfig,
} from "./developer.config";
import { Separator } from "@/components/ui/separator";
import { useDeveloperToast } from "./use-toast";
import { Bug, Ellipsis, ShoppingBasket, TramFront } from "lucide-react";

export function InsightCards() {
    const lastMonth = format(subMonths(new Date(), 1), "LLLL");
    const developerToast = useDeveloperToast();

    let totalExperience = experienceByCompanyChartData.reduce(
        (acc, curr) => acc + Number(curr.experience || 0),
        0
    );
    const totalExpInYears = (totalExperience / 12).toFixed(1);

    const chartData = [{ period: "last-week", production: 8, uat: 2, development: 2 }];

    const chartConfig = {
        production: {
            label: "Production",
            color: "var(--chart-1)",
        },
        uat: {
            label: "User Acceptance Testing",
            color: "var(--chart-2)",
        },
        development: {
            label: "Under Development",
            color: "var(--chart-3)",
        },
    } satisfies ChartConfig;

    const totalProjects = chartData.length ? chartData[0].production + chartData[0].uat + chartData[0].development : 0;

    return (
        <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs sm:grid-cols-2 xl:grid-cols-7">
            <Card className="col-span-1 xl:col-span-2">
                <CardHeader>
                    <CardTitle>Experience</CardTitle>
                </CardHeader>

                <CardContent className="max-h-48">
                    <ChartContainer config={experienceByCompanyChartConfig} className="size-full">
                        <PieChart
                            className="m-0"
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={experienceByCompanyChartData}
                                dataKey="experience"
                                nameKey="company"
                                innerRadius={65}
                                outerRadius={90}
                                paddingAngle={2}
                                cornerRadius={4}
                            >
                                <Label
                                    content={({ viewBox }) =>
                                        viewBox && "cx" in viewBox && "cy" in viewBox ? (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold tabular-nums"
                                                >
                                                    {totalExpInYears.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy ?? 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Years
                                                </tspan>
                                            </text>
                                        ) : null
                                    }
                                />
                            </Pie>

                            <ChartLegend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                content={() => (
                                    <ul className="ml-8 hidden sm:flex flex-col gap-3">
                                        {experienceByCompanyChartData.map((item) => (
                                            <li
                                                key={item.company}
                                                className="flex w-36 items-center justify-between"
                                            >
                                                <span className="flex items-center gap-2 capitalize">
                                                    <span
                                                        className="size-2.5 rounded-full"
                                                        style={{ background: item.fill }}
                                                    />
                                                    {experienceByCompanyChartConfig[item.company].label}
                                                </span>
                                                <span className="tabular-nums">{item.experience} months</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline"
                        className="w-full sm:w-1/2">
                        View Full Experience
                    </Button>
                    <Button size="sm" variant="outline"
                        className="w-full sm:w-1/2"
                        onClick={() => window.open('/resume/Jinson%20EB.pdf', '_blank')}>
                        View Resume
                    </Button>
                </CardFooter>
            </Card>

            <Card className="col-span-1 xl:col-span-3">
                <CardContent className="flex flex-col lg:flex-row gap-6">
                    <img
                        src="/images/jinsoneb.png"
                        alt="Professional Growth"
                        className="h-48 w-auto sm:h-72 rounded-md object-cover self-center"
                    />

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-foreground text-center lg:text-left">
                                Jinson E B
                            </h1>
                            <p className="mt-2 text-base leading-relaxed text-muted-foreground text-center lg:text-left">
                                Fullstack developer with expertise in{" "}
                                <span className="font-medium text-foreground">
                                    C#, .NET, and modern frontend frameworks
                                </span>
                                . Experienced in delivering scalable applications across financial
                                industries, with a strong focus on
                                <span className="italic">
                                    {" "}
                                    clean architecture, performance, and user experience
                                </span>
                                .
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 text-center lg:text-left">
                                Key Skills
                            </h3>
                            <div className="mt-2 text-base leading-relaxed text-foreground grid gap-y-1 gap-x-2 sm:grid-cols-[auto_1fr]">
                                <span className="font-medium">Frontend</span>
                                <span>- Next.js | Angular</span>

                                <span className="font-medium">Backend</span>
                                <span>- .NET Core | Oracle Database | PostgreSQL</span>

                                <span className="font-medium">Mobile</span>
                                <span>- .NET MAUI | Flutter</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-1 xl:col-span-2">
                <CardHeader>
                    <CardTitle>Projects Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-48">
                    <Separator />
                    <div>
                        <p className="mt-2 text-base leading-relaxed text-foreground text-center lg:text-left">
                            1. Customer Relationship Management System for Dubai based financial institution.
                            <br />
                            2. Complaint Portal for a leading financial institution.
                            <br />
                            3. Mobile Applications for HRMS System and Insurance System.
                            <br />
                            4. Angular application for HRMS System.
                        </p>
                    </div>
                    <Separator />
                    <div className="flex justify-between gap-4">
                        <Separator orientation="vertical" className="!h-auto" />
                        <div className="flex flex-1 flex-col items-center space-y-2">
                            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                                <ShoppingBasket className="stroke-chart-3 size-5" />
                            </div>
                            <div className="text-sm space-y-0.5 text-center">
                                <p className="text-muted-foreground text-xs uppercase">Production</p>
                                <p className="font-medium tabular-nums">{chartData[0].production}</p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="!h-auto" />
                        <div className="flex flex-1 flex-col items-center space-y-2">
                            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                                <Bug className="stroke-chart-3 size-5" />
                            </div>
                            <div className="text-sm space-y-0.5 text-center">
                                <p className="text-muted-foreground text-xs uppercase">Testing</p>
                                <p className="font-medium tabular-nums">{chartData[0].uat}</p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="!h-auto" />
                        <div className="flex flex-1 flex-col items-center space-y-2">
                            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                                <Ellipsis className="stroke-chart-3 size-5" />
                            </div>
                            <div className="text-sm space-y-0.5 text-center">
                                <p className="text-muted-foreground text-xs uppercase">Under Development</p>
                                <p className="font-medium tabular-nums">{chartData[0].development}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}