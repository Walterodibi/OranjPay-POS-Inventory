"use client"

import { useState } from "react"
import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PeriodComparisonProps {
  value: number
  periods?: { value: string; label: string }[]
  defaultPeriod?: string
  onPeriodChange?: (period: string) => void
}

export function PeriodComparison({
  value,
  periods = [
    { value: "day", label: "Previous day" },
    { value: "week", label: "Previous week" },
    { value: "month", label: "Previous month" },
    { value: "year", label: "Previous year" },
  ],
  defaultPeriod = "month",
  onPeriodChange,
}: PeriodComparisonProps) {
  const [period, setPeriod] = useState(defaultPeriod)

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod)
    if (onPeriodChange) {
      onPeriodChange(newPeriod)
    }
  }

  const currentPeriodLabel = periods.find((p) => p.value === period)?.label || "Previous period"

  return (
    <div className="flex items-center text-xs">
      <span className={`flex items-center ${value >= 0 ? "text-green-500" : "text-red-500"}`}>
        {value >= 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
        {Math.abs(value)}%
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="sm" className="h-auto p-0 ml-1 text-xs text-muted-foreground">
            from {currentPeriodLabel}
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {periods.map((p) => (
            <DropdownMenuItem
              key={p.value}
              onClick={() => handlePeriodChange(p.value)}
              className={period === p.value ? "bg-muted" : ""}
            >
              {p.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
