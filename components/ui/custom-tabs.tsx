"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface CustomTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function CustomTabs({ tabs, activeTab, onTabChange, className }: CustomTabsProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium relative transition-colors",
              "hover:text-primary focus:outline-none whitespace-nowrap",
              activeTab === tab.id ? "text-primary" : "text-muted-foreground",
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>
    </div>
  )
}
