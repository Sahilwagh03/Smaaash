import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { stats } from '@/constant/dashboard'
import { cn } from '@/lib/utils'

type StatCardProps = {
    title: string
    value: string
    change: string
    icon: React.ElementType
    color: string
}

const StatCard = ({ title, value, change, icon: Icon, color }: StatCardProps) => {
    return (
        <Card className="border border-muted">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={cn('h-6 w-6 stroke-current',color)} /> {/* Fixed: stroke-current added */}
            </CardHeader>
            <CardContent>
                <div className={cn('text-2xl font-bold',color)}>{value}</div>
                <p className="text-xs text-muted-foreground">{change}</p>
            </CardContent>
        </Card>
    )
}

const OverView = () => {
    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Additional Overview Sections */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* Add chart or other overview content here */}
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            You made 265 sales this month.
                        </p>
                    </CardHeader>
                    <CardContent>
                        {/* Add recent sales data here */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default OverView

