"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

// Simulated real-world coin distribution growth (in Lakhs)
const chartData = [
  { month: "Jan", coins: 4.2 },
  { month: "Feb", coins: 5.8 },
  { month: "Mar", coins: 6.1 },
  { month: "Apr", coins: 7.9 },
  { month: "May", coins: 9.3 },
  { month: "Jun", coins: 10.5 },
]

const chartConfig = {
  coins: {
    label: "Coins Distributed (in Lakhs)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SmaaashCoinsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Smaaash Coins Distribution</CardTitle>
        <CardDescription>Tracking growth from Jan - Jun 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value.toFixed(1)}L`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="coins"
              type="natural"
              stroke="var(--color-coins)"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          📈  Growth: <span className="text-green-500">+27.8% this quarter</span>  
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total Smaaash Coins distributed in the last 6 months.
        </div>
      </CardFooter>
    </Card>
  )
}
