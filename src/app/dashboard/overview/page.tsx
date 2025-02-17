"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { bookings, stats } from '@/constant/dashboard'
import { OverviewChart } from '@/components/Dashboard/OverviewBarChart'
import { RecentBooking } from '@/components/Dashboard/RecentBooking'
import { StatCard } from '@/components/Dashboard/StatsCards'



const OverView = () => {
    return (
        <div className="space-y-4">
            <h2 className='text-2xl font-bold tracking-tight'>
                Hi, Welcome back 👋
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="md:col-span-4 h-fit">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>
                <Card className="md:col-span-3 w-full">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            You made 265 sales this month.
                        </p>
                    </CardHeader>
                    <CardContent className='overflow-y-auto'>
                        <RecentBooking bookings={bookings} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default OverView
