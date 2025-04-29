"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
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
      <div className="flex flex-col items-center">
        <Image src="/images/OranjPay-Black.png" alt="OranjPay" width={200} height={50} className="mb-8" priority />
        <Loader2 className="h-10 w-10 text-[#635BFF] animate-spin" />
        <p className="mt-4 text-lg text-gray-600">{user ? "Redirecting to dashboard..." : "Loading..."}</p>
      </div>
    </div>
  )
}
