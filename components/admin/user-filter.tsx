"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function UserFilter({ activeFilter, onFilterChange }: UserFilterProps) {
  const [open, setOpen] = useState(false)

  const filters = [
    { id: "all", label: "All Users" },
    { id: "admin", label: "Admins" },
    { id: "cashier", label: "Cashiers" },
    { id: "active", label: "Active Users" },
    { id: "inactive", label: "Inactive Users" },
  ]

  const activeFilterLabel = filters.find((filter) => filter.id === activeFilter)?.label || "All Users"

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="oranj-button w-[180px] justify-between">
          {activeFilterLabel}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuGroup>
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.id}
              onClick={() => {
                onFilterChange(filter.id)
                setOpen(false)
              }}
            >
              {filter.label}
              {activeFilter === filter.id && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
