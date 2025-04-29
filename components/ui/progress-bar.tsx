"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export function RouteChangeProgressBar() {
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // When the route changes, start the animation
    setIsAnimating(true)

    // After animation completes, reset
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div
        className={cn(
          "h-full bg-[#635bff] transition-all duration-500 ease-in-out",
          isAnimating ? "w-full opacity-100" : "w-0 opacity-0",
        )}
      />
    </div>
  )
}
