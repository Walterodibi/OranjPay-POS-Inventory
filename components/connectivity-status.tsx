"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ConnectivityStatusProps {
  className?: string
}

export function ConnectivityStatus({ className }: ConnectivityStatusProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [lastStatusChange, setLastStatusChange] = useState<Date | null>(null)

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine)
    setLastStatusChange(new Date())

    // Add event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true)
      setLastStatusChange(new Date())
    }

    const handleOffline = () => {
      setIsOnline(false)
      setLastStatusChange(new Date())
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Format time since last status change
  const getTimeSince = () => {
    if (!lastStatusChange) return ""

    const now = new Date()
    const diffMs = now.getTime() - lastStatusChange.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHrs = Math.floor(diffMins / 60)
    const remainingMins = diffMins % 60

    if (diffHrs > 0) {
      return `${diffHrs}hrs ${remainingMins}mins`
    } else {
      return `${remainingMins}mins`
    }
  }

  return (
    <div className={cn("relative z-50", className)}>
      {/* Floating island with trail */}
      <div className="relative flex justify-center">
        {/* Trail/tail element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-8 w-[1px] bg-gradient-to-b from-transparent via-[#0a1a2a] to-transparent opacity-30"></div>

        {/* Main pill */}
        <div
          onClick={() => setShowDetails(!showDetails)}
          className={cn(
            "relative px-4 py-1 rounded-full cursor-pointer text-xs font-medium tracking-wide",
            "bg-[#0a1a2a] shadow-[0_0_15px_rgba(0,0,0,0.2)]",
            "transition-all duration-300 ease-in-out",
            "hover:bg-[#0c1e30] hover:shadow-[0_0_20px_rgba(0,0,0,0.25)]",
            "flex items-center gap-2 max-w-[140px]",
          )}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.07)] to-transparent opacity-50"></div>

          {/* Status icon with glow */}
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full flex-shrink-0",
              isOnline
                ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]",
            )}
          ></div>

          {/* Status text */}
          <span className="text-gray-100 whitespace-nowrap text-[10px] uppercase tracking-wider">
            {isOnline ? "System Online" : "System Offline"}
          </span>
        </div>
      </div>

      {/* Details panel */}
      {showDetails && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#0a1a2a]/95 backdrop-blur-sm rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-50 p-3 border border-[#1a2a3a] animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-100 text-sm">{isOnline ? "Connected" : "Disconnected"}</h4>
              <p className="text-xs text-gray-400 mt-1">
                {isOnline ? "All features available" : "Limited functionality available"}
              </p>
              {lastStatusChange && (
                <div className="flex items-center gap-2 mt-2">
                  <div className={cn("h-1.5 w-1.5 rounded-full", isOnline ? "bg-green-400" : "bg-red-400")}></div>
                  <p className="text-[10px] text-gray-400">
                    {isOnline ? `Online for ${getTimeSince()}` : `Offline for ${getTimeSince()}`}
                  </p>
                </div>
              )}

              {!isOnline && (
                <div className="mt-3 text-[10px] text-amber-300/80 bg-amber-900/20 p-2 rounded border border-amber-800/30">
                  Transactions will sync when connection is restored
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
