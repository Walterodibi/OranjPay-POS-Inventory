"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // Public routes that don't require authentication
      const publicRoutes = ["/", "/login"]
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/_next")

      // If not logged in and not on a public route, redirect to login
      if (!user && !isPublicRoute) {
        router.push("/login")
      }

      // Role-based route protection
      if (user) {
        if (user.role === "admin" && pathname.startsWith("/cashier")) {
          router.push("/admin/dashboard")
        } else if (user.role === "cashier" && pathname.startsWith("/admin")) {
          router.push("/cashier")
        }
      }
    }
  }, [user, isLoading, pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  return <>{children}</>
}
