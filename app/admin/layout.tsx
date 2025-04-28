"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthCheck } from "@/components/auth/auth-check"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <AuthCheck requiredRole="admin">
      <SidebarProvider defaultOpen={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
        <div className="min-h-screen bg-[#f1f1f1]">
          <AdminSidebar />
          <div className={cn("transition-all duration-300", isCollapsed ? "ml-[70px]" : "ml-64")}>{children}</div>
        </div>
      </SidebarProvider>
    </AuthCheck>
  )
}
