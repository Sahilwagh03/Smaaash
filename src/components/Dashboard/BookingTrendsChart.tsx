"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", bookings: 186 },
    { month: "February", bookings: 305 },
    { month: "March", bookings: 237 },
    { month: "April", bookings: 73 },
    { month: "May", bookings: 209 },
    { month: "June", bookings: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function BookingTrendsLineChart() {
    return (
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                        dataKey="bookings"
                        type="natural"
                        stroke="var(--color-desktop)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
