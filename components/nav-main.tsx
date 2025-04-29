"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import { FancyMenu } from "@/components/ui/fancy-menu"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  // Transform the items to match the FancyMenu format
  const fancyMenuItems = items.map((item) => ({
    icon: item.icon ? <item.icon className="h-5 w-5" /> : null,
    label: item.title,
    href: item.url,
    gradient: getGradientForItem(item.title),
    iconColor: getIconColorForItem(item.title),
  }))

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button size="icon" className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2">
          <FancyMenu items={fancyMenuItems} />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// Helper functions to assign gradients and colors based on item title
function getGradientForItem(title: string): string {
  const gradients = {
    Dashboard: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    Products: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    Inventory: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    Orders: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    Transactions:
      "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(109,40,217,0) 100%)",
    Analytics: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
    Users: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.06) 50%, rgba(180,83,9,0) 100%)",
    Settings: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.06) 50%, rgba(4,120,87,0) 100%)",
  }

  return (
    gradients[title as keyof typeof gradients] ||
    "radial-gradient(circle, rgba(107,114,128,0.15) 0%, rgba(75,85,99,0.06) 50%, rgba(55,65,81,0) 100%)"
  )
}

function getIconColorForItem(title: string): string {
  const colors = {
    Dashboard: "text-blue-500",
    Products: "text-orange-500",
    Inventory: "text-green-500",
    Orders: "text-red-500",
    Transactions: "text-purple-500",
    Analytics: "text-pink-500",
    Users: "text-amber-500",
    Settings: "text-emerald-500",
  }

  return colors[title as keyof typeof colors] || "text-gray-500"
}
