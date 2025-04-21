"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "cashier"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Check if user is logged in
      if (!user) {
        router.push("/login")
        return
      }

      // Check if user has required role
      if (requiredRole && user.role !== requiredRole) {
        if (user.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/cashier")
        }
        return
      }

      setIsAuthorized(true)
    }
  }, [user, isLoading, requiredRole, router])

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
