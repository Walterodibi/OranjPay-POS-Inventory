"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  name: string
  email: string
  role: "admin" | "cashier"
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Create a default context value to avoid the "must be used within a provider" error
const defaultContextValue: AuthContextType = {
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Demo credentials for easy access
  const demoCredentials = {
    admin: {
      email: "admin@oranjpay.com",
      password: "admin123",
      name: "Admin User",
    },
    cashier: {
      email: "cashier@oranjpay.com",
      password: "cashier123",
      name: "Cashier User",
    },
  }

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("oranjpay-user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Handle route protection
    if (!isLoading) {
      // Public routes that don't require authentication
      const publicRoutes = ["/", "/login"]
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/_next")

      // If not logged in and not on a public route, redirect to login
      if (!user && !isPublicRoute) {
        router.push("/login")
      }

      // If logged in and on login page, redirect to appropriate dashboard
      if (user && pathname === "/login") {
        if (user.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/cashier")
        }
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check against demo credentials
      if (email === demoCredentials.admin.email && password === demoCredentials.admin.password) {
        const userData = { name: demoCredentials.admin.name, email, role: "admin" as const }
        setUser(userData)
        localStorage.setItem("oranjpay-user", JSON.stringify(userData))
        return true
      } else if (email === demoCredentials.cashier.email && password === demoCredentials.cashier.password) {
        const userData = { name: demoCredentials.cashier.name, email, role: "cashier" as const }
        setUser(userData)
        localStorage.setItem("oranjpay-user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    try {
      setUser(null)
      localStorage.removeItem("oranjpay-user")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
