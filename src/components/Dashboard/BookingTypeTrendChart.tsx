"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "January", bowling: 120, cricket: 200, vr: 80, gokarting: 150 },
    { month: "February", bowling: 150, cricket: 250, vr: 120, gokarting: 180 },
    { month: "March", bowling: 180, cricket: 300, vr: 140, gokarting: 200 },
    { month: "April", bowling: 90, cricket: 220, vr: 110, gokarting: 160 },
    { month: "May", bowling: 140, cricket: 270, vr: 130, gokarting: 190 },
    { month: "June", bowling: 170, cricket: 310, vr: 150, gokarting: 210 },
]

const chartConfig = {
    bowling: { label: "Bowling", color: "hsl(var(--chart-1))" },
    cricket: { label: "Cricket", color: "hsl(var(--chart-2))" },
    vr: { label: "VR", color: "hsl(var(--chart-3))" },
    gokarting: { label: "GoKarting", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

export function BookingTypeBarChart() {
    const keys = Object.keys(chartConfig)
    return (
        <Card className="w-1/2">
            <CardHeader>
                <CardTitle>Booking Types</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            {keys.map((key, index) => {
                                // Explicitly define radius as a tuple.
                                let radius: [number, number, number, number] = [0, 0, 0, 0]
                                if (index === 0) {
                                    radius = [0, 0, 4, 4] 
                                } else if (index === keys.length - 1) {
                                    radius = [4, 4, 0, 0]
                                }
                                return (
                                    <Bar
                                        key={key}
                                        dataKey={key}
                                        stackId="a"
                                        fill={chartConfig[key as keyof typeof chartConfig].color}
                                        radius={radius}
                                    />
                                )
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total bookings for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
