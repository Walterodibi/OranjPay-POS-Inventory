import type React from "react"
import { RouteChangeProgressBar } from "@/components/ui/progress-bar"
import { AuthCheck } from "@/components/auth/auth-check"

export default function CashierLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck>
      <RouteChangeProgressBar />
      {children}
    </AuthCheck>
  )
}
