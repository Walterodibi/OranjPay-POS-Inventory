"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BarChart3, Box, CreditCard, History, Home, LogOut, Package, Settings, ShoppingCart, Users } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b px-6 py-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image src="/images/OranjPay-Black.png" alt="OranjPay" width={130} height={30} className="dark:hidden" />
            <Image
              src="/images/OranjPay-White.png"
              alt="OranjPay"
              width={130}
              height={30}
              className="hidden dark:block"
            />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/dashboard")}>
                <Link href="/admin/dashboard">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/products")}>
                <Link href="/admin/products">
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/inventory")}>
                <Link href="/admin/inventory">
                  <Box className="h-5 w-5" />
                  <span>Inventory</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/transactions")}>
                <Link href="/admin/transactions">
                  <History className="h-5 w-5" />
                  <span>Transactions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/analytics")}>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
                <Link href="/admin/users">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/pos")}>
                <Link href="/admin/pos">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Point of Sale</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/payments")}>
                <Link href="/admin/payments">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                <Link href="/admin/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="rounded-full p-2 text-muted-foreground hover:bg-muted">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="overflow-auto">{/* Content will be rendered here */}</SidebarInset>
    </>
  )
}
