"use client"

import Image from "next/image"
import { Package } from "lucide-react"

import { Progress } from "@/components/ui/progress"

// Mock data
const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image: "/placeholder.svg?height=40&width=40",
    sales: 42,
    revenue: 3780,
    growth: 12.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/placeholder.svg?height=40&width=40",
    sales: 38,
    revenue: 3420,
    growth: 8.2,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=40&width=40",
    sales: 31,
    revenue: 2790,
    growth: 5.7,
  },
  {
    id: 4,
    name: "Leather Wallet",
    image: "/placeholder.svg?height=40&width=40",
    sales: 28,
    revenue: 1120,
    growth: 3.2,
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    image: "/placeholder.svg?height=40&width=40",
    sales: 25,
    revenue: 875,
    growth: -2.1,
  },
]

export function TopProducts() {
  // Find the highest sales value for progress calculation
  const maxSales = Math.max(...products.map((product) => product.sales))

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Package className="mr-1 h-3 w-3" />
              <span>{product.sales} sold</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${product.revenue.toLocaleString()}</p>
            <p className={`text-xs ${product.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
              {product.growth >= 0 ? "+" : ""}
              {product.growth}%
            </p>
          </div>
          <div className="w-24">
            <Progress value={(product.sales / maxSales) * 100} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
