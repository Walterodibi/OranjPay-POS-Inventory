"use client"

import { CommandBar } from "@/components/admin/command-bar"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { isCollapsed, toggleSidebar } = useSidebar()

  return (
    <div className="border-b bg-[#f1f1f1]">
      <div className="flex items-center h-16">
        <div className="flex items-center px-4 border-r h-full">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <Image
              src={
                isCollapsed
                  ? "https://zyntraqtech.com/wp-content/uploads/2025/04/sidebar-open.svg"
                  : "https://zyntraqtech.com/wp-content/uploads/2025/04/sidebar-close.svg"
              }
              alt="Toggle sidebar"
              width={24}
              height={24}
              className="h-5 w-5 text-[#635BFF]"
            />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <div className="w-full max-w-sm">
            <CommandBar />
          </div>
        </div>
      </div>
    </div>
  )
}
