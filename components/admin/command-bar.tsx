"use client"

import React from "react"
import {
  Calculator,
  Calendar,
  Settings,
  Search,
  Package,
  ShoppingCart,
  BarChart,
  Users,
  CreditCardIcon as PaymentIcon,
  LayoutDashboard,
  Store,
} from "lucide-react"
import { useRouter } from "next/navigation"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandBar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "f") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const isMac = typeof navigator !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm text-gray-700 w-full max-w-sm border shadow-sm hover:bg-gray-50"
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-500">Search...</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>{isMac ? "⌘" : "CTRL"}+F</span>
        </div>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} className="top-20 translate-y-0">
        <CommandInput placeholder="Type a command or search..." className="h-12" />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/dashboard"))}>
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/orders"))}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span>Orders</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/products"))}>
              <Package className="mr-2 h-5 w-5" />
              <span>Products</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/inventory"))}>
              <Store className="mr-2 h-5 w-5" />
              <span>Inventory</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/analytics"))}>
              <BarChart className="mr-2 h-5 w-5" />
              <span>Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/users"))}>
              <Users className="mr-2 h-5 w-5" />
              <span>Users</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/payments"))}>
              <PaymentIcon className="mr-2 h-5 w-5" />
              <span>Payment Methods</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/settings"))}>
              <Settings className="mr-2 h-5 w-5" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Tools">
            <CommandItem>
              <Calendar className="mr-2 h-5 w-5" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-5 w-5" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
