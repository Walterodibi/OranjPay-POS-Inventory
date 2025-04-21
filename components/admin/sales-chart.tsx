"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card } from "@/components/ui/card"

// Mock data
const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 7000 },
  { name: "Jun", sales: 6000 },
  { name: "Jul", sales: 8000 },
  { name: "Aug", sales: 9000 },
  { name: "Sep", sales: 8500 },
  { name: "Oct", sales: 10000 },
  { name: "Nov", sales: 11000 },
  { name: "Dec", sales: 12500 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 shadow-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Month:</span>
                    <span>{payload[0].payload.name}</span>
                    <span className="font-medium">Sales:</span>
                    <span>${payload[0].value}</span>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
