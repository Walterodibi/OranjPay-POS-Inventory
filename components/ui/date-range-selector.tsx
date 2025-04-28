"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { StripeButton } from "@/components/ui/stripe-button"

interface DateRangeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DateRangeSelector({ className, ...props }: DateRangeSelectorProps) {
  const [dateRange, setDateRange] = React.useState("Last 7 days")
  const [comparison, setComparison] = React.useState("Previous period")
  const [interval, setInterval] = React.useState("Daily")
  const [comparisonOpen, setComparisonOpen] = React.useState(false)

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <StripeButton variant="default">{dateRange}</StripeButton>
      <span className="text-sm text-muted-foreground">compared to</span>
      <Popover open={comparisonOpen} onOpenChange={setComparisonOpen}>
        <PopoverTrigger asChild>
          <StripeButton variant={comparisonOpen ? "selected" : "default"} hasDropdown>
            {comparison}
          </StripeButton>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0" align="start">
          <div className="flex flex-col py-1.5">
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => {
                setComparison("Previous period")
                setComparisonOpen(false)
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", comparison === "Previous period" ? "opacity-100" : "opacity-0")} />
              <span className="text-violet-600 font-medium">Previous period</span>
              <span className="ml-auto text-gray-500 text-xs">Apr 2 – Apr 8</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => {
                setComparison("Previous year")
                setComparisonOpen(false)
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", comparison === "Previous year" ? "opacity-100" : "opacity-0")} />
              <span>Previous year</span>
              <span className="ml-auto text-gray-500 text-xs">Apr 9, 2023 – Apr 15, 2023</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => {
                setComparison("Custom")
                setComparisonOpen(false)
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", comparison === "Custom" ? "opacity-100" : "opacity-0")} />
              <span>Custom</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => {
                setComparison("No comparison")
                setComparisonOpen(false)
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", comparison === "No comparison" ? "opacity-100" : "opacity-0")} />
              <span>No comparison</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <StripeButton variant="default" hasDropdown>
            {interval}
          </StripeButton>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0" align="end">
          <div className="flex flex-col py-1.5">
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => setInterval("Daily")}
            >
              <Check className={cn("mr-2 h-4 w-4", interval === "Daily" ? "opacity-100" : "opacity-0")} />
              <span>Daily</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => setInterval("Weekly")}
            >
              <Check className={cn("mr-2 h-4 w-4", interval === "Weekly" ? "opacity-100" : "opacity-0")} />
              <span>Weekly</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => setInterval("Monthly")}
            >
              <Check className={cn("mr-2 h-4 w-4", interval === "Monthly" ? "opacity-100" : "opacity-0")} />
              <span>Monthly</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => setInterval("Quarterly")}
            >
              <Check className={cn("mr-2 h-4 w-4", interval === "Quarterly" ? "opacity-100" : "opacity-0")} />
              <span>Quarterly</span>
            </button>
            <button
              className="flex items-center px-3 py-1.5 hover:bg-gray-100 text-sm"
              onClick={() => setInterval("Yearly")}
            >
              <Check className={cn("mr-2 h-4 w-4", interval === "Yearly" ? "opacity-100" : "opacity-0")} />
              <span>Yearly</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
