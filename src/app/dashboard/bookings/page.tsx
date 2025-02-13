"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, PieChart, Pie, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookingTable } from "@/components/Dashboard/BookingTable";
import { BookingTrendsLineChart } from "@/components/Dashboard/BookingTrendsChart";
import { BookingPieChart } from "@/components/Dashboard/BookingPieChart";
import { BookingTypeTrendChart } from "@/components/Dashboard/BookingTypeTrendChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const pieData = [
  { name: "Completed", value: 1980 },
  { name: "Pending", value: 365 },
];

const lineData = [
  { name: "Jan", bookings: 300 },
  { name: "Feb", bookings: 500 },
  { name: "Mar", bookings: 450 },
  { name: "Apr", bookings: 600 },
  { name: "May", bookings: 700 },
];

const Bookings = () => {
  const [filter, setFilter] = useState("monthly");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Bookings Analaytics</h2>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>January - June 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingTrendsLineChart />
          </CardContent>
        </Card>
        <BookingPieChart />
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-sm lg:max-w-full">
          <BookingTable />
        </div>
      </div>
      <div className="w-full h-[300px]">
          <BookingTypeTrendChart/>
      </div>
    </div>
  );
};

export default Bookings;
