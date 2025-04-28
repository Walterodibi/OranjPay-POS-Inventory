import type * as React from "react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export function CustomButton({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "oranj-button inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors",
        "bg-white text-[#202223] border border-[rgba(0,0,0,0.015)]",
        "shadow-[0_-0.0625rem_0_0_#b5b5b5_inset,0_0_0_0.0625rem_rgba(0,0,0,0.1)_inset,0_0.03125rem_0_0.09375rem_#fff_inset]",
        "hover:bg-[#f6f6f6] active:bg-[#ebebeb]",
        "focus:outline-none focus:shadow-[0_-0.0625rem_0_0_#b5b5b5_inset,0_0_0_0.0625rem_rgba(0,0,0,0.1)_inset,0_0.03125rem_0_0.09375rem_#fff_inset,0_0_0_2px_rgba(0,132,255,0.3)]",
        size === "default" && "px-4 py-2",
        size === "sm" && "px-3 py-1 text-xs",
        size === "lg" && "px-6 py-3",
        size === "icon" && "p-2",
        variant === "outline" && "border-[rgba(0,0,0,0.2)] bg-transparent",
        variant === "ghost" && "border-transparent bg-transparent shadow-none hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
