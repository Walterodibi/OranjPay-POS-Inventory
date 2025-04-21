import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthCheck } from "@/components/auth/auth-check"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthCheck>
      <SidebarProvider>
        <AdminSidebar />
        {children}
      </SidebarProvider>
    </AuthCheck>
  )
}
