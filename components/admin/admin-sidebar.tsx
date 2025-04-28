"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  BarChart2,
  Users,
  CreditCard,
  Settings,
  Store,
  User,
  LogOut,
  CreditCardIcon as BankCard,
  ChevronDown,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { user, logout } = useAuth()
  const router = useRouter()

  // Categorized routes
  const mainRoutes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      title: "Products",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Inventory",
      icon: ClipboardList,
      href: "/admin/inventory",
    },
  ]

  const analyticsRoutes = [
    {
      title: "Analytics",
      icon: BarChart2,
      href: "/admin/analytics",
    },
  ]

  const managementRoutes = [
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Point of Sale",
      icon: Wallet,
      href: "/admin/pos",
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      href: "/admin/payments",
    },
    {
      title: "Storefronts",
      icon: Store,
      href: "/admin/storefronts",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ]

  const handleProfileClick = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
  }

  const renderNavLinks = (routes) => {
    return routes.map((route, i) => {
      const NavLink = (
        <Link
          key={i}
          href={route.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors group",
            pathname === route.href ? "text-[#635BFF]" : "text-gray-700 hover:text-[#635BFF]",
            isCollapsed ? "justify-center" : "",
          )}
        >
          <route.icon
            className={cn(
              "h-5 w-5",
              pathname === route.href ? "text-[#635BFF]" : "text-gray-500 group-hover:text-[#635BFF]",
            )}
          />
          {!isCollapsed && <span>{route.title}</span>}
        </Link>
      )

      return isCollapsed ? (
        <TooltipProvider key={i} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
            <TooltipContent side="right">{route.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        NavLink
      )
    })
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-[#ebebeb] transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center">
          {!isCollapsed && (
            <Link href="/admin/dashboard">
              <Image
                src="/images/OranjPay-Black.png"
                alt="OranjPay Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin/dashboard">
              <Image
                src="/images/OranjPay-Favicon-Circle.png"
                alt="OranjPay Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="space-y-6 px-2">
          <div>
            {!isCollapsed && <p className="px-3 text-xs font-medium text-gray-500 mb-2">MAIN</p>}
            <nav className="grid gap-1">{renderNavLinks(mainRoutes)}</nav>
          </div>

          <div>
            {!isCollapsed && <p className="px-3 text-xs font-medium text-gray-500 mb-2">ANALYTICS</p>}
            <nav className="grid gap-1">{renderNavLinks(analyticsRoutes)}</nav>
          </div>

          <div>
            {!isCollapsed && <p className="px-3 text-xs font-medium text-gray-500 mb-2">MANAGEMENT</p>}
            <nav className="grid gap-1">{renderNavLinks(managementRoutes)}</nav>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        {!isCollapsed && (
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-500">Profile completion</span>
              <span className="text-xs font-medium text-gray-700">75%</span>
            </div>
            <Progress value={75} className="h-1.5" indicatorClassName="bg-[#635BFF]" />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 rounded-md border p-3 cursor-pointer hover:bg-gray-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#635BFF]/10 shrink-0">
                <span className="text-sm font-semibold text-[#635BFF]">
                  {user?.name ? `${user.name.split(" ")[0][0]}${user.name.split(" ")[1]?.[0] || ""}` : "OP"}
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{user?.name || "OranjPay Admin"}</p>
                    <p className="text-xs text-gray-500">{user?.email || "admin@oranjpay.com"}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => handleProfileClick("/admin/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileClick("/admin/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileClick("/admin/banks")}>
              <BankCard className="mr-2 h-4 w-4" />
              <span>My Banks</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
