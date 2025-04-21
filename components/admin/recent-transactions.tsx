"use client"

import { CheckCircle, Clock, XCircle } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const transactions = [
  {
    id: "TX123456",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
    },
    amount: 125.99,
    status: "completed",
    date: "2023-11-15T14:30:00",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX123457",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder-user.jpg",
    },
    amount: 89.95,
    status: "completed",
    date: "2023-11-15T12:15:00",
    paymentMethod: "PayPal",
  },
  {
    id: "TX123458",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/placeholder-user.jpg",
    },
    amount: 245.5,
    status: "pending",
    date: "2023-11-15T10:45:00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX123459",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder-user.jpg",
    },
    amount: 45.0,
    status: "failed",
    date: "2023-11-15T09:20:00",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX123460",
    customer: {
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar: "/placeholder-user.jpg",
    },
    amount: 175.25,
    status: "completed",
    date: "2023-11-14T16:50:00",
    paymentMethod: "Apple Pay",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={transaction.customer.avatar || "/placeholder.svg"} alt={transaction.customer.name} />
            <AvatarFallback>{transaction.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.customer.name}</p>
            <p className="text-xs text-muted-foreground">{transaction.customer.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${transaction.amount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
          </div>
          <div>
            {transaction.status === "completed" && (
              <Badge variant="outline" className="flex items-center gap-1 border-green-200 bg-green-50 text-green-700">
                <CheckCircle className="h-3 w-3" />
                <span>Completed</span>
              </Badge>
            )}
            {transaction.status === "pending" && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-yellow-200 bg-yellow-50 text-yellow-700"
              >
                <Clock className="h-3 w-3" />
                <span>Pending</span>
              </Badge>
            )}
            {transaction.status === "failed" && (
              <Badge variant="outline" className="flex items-center gap-1 border-red-200 bg-red-50 text-red-700">
                <XCircle className="h-3 w-3" />
                <span>Failed</span>
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
