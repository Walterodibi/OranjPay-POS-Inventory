import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AuthCheck } from "@/components/auth/auth-check"
import { RouteChangeProgressBar } from "@/components/ui/progress-bar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck>
      <RouteChangeProgressBar />
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 ml-[70px] lg:ml-64">
            <AdminHeader />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthCheck>
  )
}
