"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SmaaashCoinStats } from '@/constant/dashboard'
import { StatCard } from '@/components/Dashboard/StatsCards'
import { SmaaashCoinsChart } from '@/components/Dashboard/SmaaashCoinChart'



const SmaaashCoins = () => {
  return (
    <div className="space-y-4">
      <h2 className='text-2xl font-bold tracking-tight'>
        Smaaash Coins
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SmaaashCoinStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="grid gap-4 grid-cols-2">
        <SmaaashCoinsChart />
      </div>
    </div>
  )
}

export default SmaaashCoins
