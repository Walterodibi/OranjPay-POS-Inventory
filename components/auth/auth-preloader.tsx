"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function AuthPreloader() {
  const { isLoading, user } = useAuth()
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Keep showing the preloader while authentication is being checked
    // or while redirecting after login
    if (!isLoading && user === null) {
      // If not loading and no user, we can hide the preloader
      const timer = setTimeout(() => setShow(false), 500)
      return () => clearTimeout(timer)
    }

    // Keep showing if we're loading or if we have a user (redirecting)
    setShow(true)
  }, [isLoading, user])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-[#635BFF] animate-spin" />
    </div>
  )
}
