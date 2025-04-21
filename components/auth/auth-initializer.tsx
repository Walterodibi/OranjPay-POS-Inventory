"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

export function AuthInitializer() {
  const { isLoading } = useAuth()

  useEffect(() => {
    // This component doesn't need to do anything except trigger the auth context to initialize
    // The useEffect in the auth context will handle checking localStorage and setting up the user
  }, [isLoading])

  return null
}
