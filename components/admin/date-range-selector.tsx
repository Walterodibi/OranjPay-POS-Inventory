"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { StripeButton } from "@/components/ui/stripe-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "This month", value: "thisMonth" },
  { label: "Last month", value: "lastMonth" },
  { label: "This year", value: "thisYear" },
  { label: "Custom", value: "custom" },
]

const comparisonOptions = [
  { label: "Previous period", value: "previousPeriod" },
  { label: "Previous year", value: "previousYear" },
  { label: "Custom", value: "custom" },
  { label: "No comparison", value: "none" },
]

const intervalOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
]

export function DateRangeSelector() {
  const [selectedRange, setSelectedRange] = useState(dateRanges[2]) // Default to "Last 7 days"
  const [selectedComparison, setSelectedComparison] = useState(comparisonOptions[0]) // Default to "Previous period"
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[0]) // Default to "Daily"

  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [isIntervalOpen, setIsIntervalOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <StripeButton variant="default">{selectedRange.label}</StripeButton>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {dateRanges.map((range) => (
                  <CommandItem
                    key={range.value}
                    onSelect={() => {
                      setSelectedRange(range)
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm"
                  >
                    {selectedRange.value === range.value && <Check className="h-4 w-4 text-[#635bff]" />}
                    <span className={selectedRange.value === range.value ? "ml-0" : "ml-6"}>{range.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <span className="text-sm text-gray-500">compared to</span>

      <Popover open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <PopoverTrigger asChild>
          <StripeButton variant={isComparisonOpen ? "selected" : "default"} hasDropdown>
            {selectedComparison.label}
          </StripeButton>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {comparisonOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      setSelectedComparison(option)
                      setIsComparisonOpen(false)
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm"
                  >
                    {selectedComparison.value === option.value && <Check className="h-4 w-4 text-[#635bff]" />}
                    <span className={selectedComparison.value === option.value ? "ml-0" : "ml-6"}>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={isIntervalOpen} onOpenChange={setIsIntervalOpen}>
        <PopoverTrigger asChild>
          <StripeButton variant={isIntervalOpen ? "selected" : "default"} hasDropdown className="ml-auto">
            {selectedInterval.label}
          </StripeButton>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {intervalOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      setSelectedInterval(option)
                      setIsIntervalOpen(false)
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm"
                  >
                    {selectedInterval.value === option.value && <Check className="h-4 w-4 text-[#635bff]" />}
                    <span className={selectedInterval.value === option.value ? "ml-0" : "ml-6"}>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
