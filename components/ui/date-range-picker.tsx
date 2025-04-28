"use client"

import * as React from "react"
import { format, addDays, subDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
}

export function DateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const presets = [
    {
      name: "Custom",
      isSelected: true,
    },
    {
      name: "Today",
      getValue: () => {
        const today = new Date()
        return {
          from: today,
          to: today,
        }
      },
    },
    {
      name: "Yesterday",
      getValue: () => {
        const yesterday = subDays(new Date(), 1)
        return {
          from: yesterday,
          to: yesterday,
        }
      },
    },
    {
      name: "Last 7 days",
      getValue: () => ({
        from: subDays(new Date(), 6),
        to: new Date(),
      }),
    },
    {
      name: "Last 30 days",
      getValue: () => ({
        from: subDays(new Date(), 29),
        to: new Date(),
      }),
    },
    {
      name: "Last 90 days",
      getValue: () => ({
        from: subDays(new Date(), 89),
        to: new Date(),
      }),
    },
    {
      name: "Week to date",
      getValue: () => {
        const today = new Date()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        return {
          from: startOfWeek,
          to: today,
        }
      },
    },
    {
      name: "Month to date",
      getValue: () => {
        const today = new Date()
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return {
          from: startOfMonth,
          to: today,
        }
      },
    },
  ]

  const handlePresetClick = (preset: (typeof presets)[0]) => {
    if (preset.getValue) {
      const newRange = preset.getValue()
      onDateChange(newRange)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-white border-gray-200",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM d")}–{format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from, "MMM d, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <div className="border-r p-2 space-y-2 w-[200px] max-h-[350px] overflow-y-auto">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant={preset.isSelected ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    preset.isSelected && "bg-indigo-50 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600",
                  )}
                  onClick={() => preset.getValue && handlePresetClick(preset)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
            <div className="p-2">
              <div className="flex gap-2 mb-2">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm"
                    value={date?.from ? format(date.from, "MMMM d, yyyy") : ""}
                    readOnly
                  />
                </div>
                <div className="flex items-center">→</div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md text-sm"
                    value={date?.to ? format(date.to, "MMMM d, yyyy") : ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center px-2 py-1">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 12L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className="text-sm font-medium">August 2023</div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={onDateChange}
                    numberOfMonths={1}
                    className="border-none"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center px-2 py-1">
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 12L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className="text-sm font-medium">September 2023</div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <Calendar
                    mode="range"
                    defaultMonth={date?.to || addDays(date?.from || new Date(), 30)}
                    selected={date}
                    onSelect={onDateChange}
                    numberOfMonths={1}
                    className="border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
