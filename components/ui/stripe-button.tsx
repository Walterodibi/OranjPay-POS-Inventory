import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const stripeButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm",
        selected: "bg-blue-50 border border-blue-300 text-blue-700 hover:bg-blue-100",
        primary: "bg-[#635bff] text-white hover:bg-[#635bff]/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface StripeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof stripeButtonVariants> {
  asChild?: boolean
  hasDropdown?: boolean
}

const StripeButton = React.forwardRef<HTMLButtonElement, StripeButtonProps>(
  ({ className, variant, size, hasDropdown = false, children, ...props }, ref) => {
    return (
      <button className={cn(stripeButtonVariants({ variant, size }), className)} ref={ref} {...props}>
        {children}
        {hasDropdown && <ChevronDown className="ml-2 h-4 w-4" />}
      </button>
    )
  },
)
StripeButton.displayName = "StripeButton"

export { StripeButton, stripeButtonVariants }
