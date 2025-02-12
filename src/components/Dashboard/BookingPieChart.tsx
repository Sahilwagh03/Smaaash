"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const bookingData = [
    { category: "Cricket", bookings: 320, fill: "hsl(var(--chart-1))" },
    { category: "Bowling", bookings: 250, fill: "hsl(var(--chart-2))" },
    { category: "VR", bookings: 180, fill: "hsl(var(--chart-3))" },
    { category: "Dance Off", bookings: 210, fill: "hsl(var(--chart-4))" },
    { category: "Go-Karting", bookings: 275, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
    bookings: {
        label: "Bookings",
    },
    Cricket: {
        label: "Cricket",
        color: "hsl(var(--chart-1))",
    },
    Bowling: {
        label: "Bowling",
        color: "hsl(var(--chart-2))",
    },
    VR: {
        label: "VR",
        color: "hsl(var(--chart-3))",
    },
    "Dance Off": {
        label: "Dance Off",
        color: "hsl(var(--chart-4))",
    },
    "Go-Karting": {
        label: "Go-Karting",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export function BookingPieChart() {
    const totalBookings = React.useMemo(() => {
        return bookingData.reduce((acc, curr) => acc + curr.bookings, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Booking Distribution</CardTitle>
                <CardDescription>Last 6 Months</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={bookingData}
                                dataKey="bookings"
                                nameKey="category"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalBookings.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Bookings
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 7.5% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total bookings for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}