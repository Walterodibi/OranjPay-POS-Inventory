"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define user types
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "cashier"
  avatar?: string
}

// Mock users for demo
const mockUsers = {
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@oranjpay.com",
    role: "admin",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  cashier: {
    id: "cashier-1",
    name: "Cashier User",
    email: "cashier@oranjpay.com",
    role: "cashier",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}

// Auth context type
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("oranjpay-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("oranjpay-user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check admin credentials
    if (email === "admin@oranjpay.com" && password === "admin123") {
      const adminUser = mockUsers.admin
      setUser(adminUser)
      localStorage.setItem("oranjpay-user", JSON.stringify(adminUser))
      router.push("/admin/dashboard")
      setIsLoading(false)
      return true
    }

    // Check cashier credentials
    if (email === "cashier@oranjpay.com" && password === "cashier123") {
      const cashierUser = mockUsers.cashier
      setUser(cashierUser)
      localStorage.setItem("oranjpay-user", JSON.stringify(cashierUser))
      router.push("/cashier")
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("oranjpay-user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
