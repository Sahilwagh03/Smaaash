"use client"

import { useState } from "react"
import { TrendingUp, ChevronDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

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

export function BookingTypeTrendChart() {
    const [activeFilters, setActiveFilters] = useState<string[]>(["bowling", "cricket", "vr", "gokarting"])

    const toggleFilter = (type: string) => {
        setActiveFilters((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row gap-2 justify-between">
                    <div className="flex flex-col space-y-1.5">
                        <CardTitle>Bookings Types</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Filter Booking Type <ChevronDown className="ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {Object.keys(chartConfig).map((key) => (
                                    <DropdownMenuCheckboxItem
                                        key={key}
                                        checked={activeFilters.includes(key)}
                                        onCheckedChange={() => toggleFilter(key)}
                                    >
                                        {chartConfig[key as keyof typeof chartConfig].label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        {Object.keys(chartConfig)
                            .filter((key) => activeFilters.includes(key))
                            .map((key) => (
                                <Line
                                    key={key}
                                    dataKey={key}
                                    type="monotone"
                                    stroke={chartConfig[key as keyof typeof chartConfig].color}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}