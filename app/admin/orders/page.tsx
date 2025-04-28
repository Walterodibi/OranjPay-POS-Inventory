"use client"

import { useState } from "react"
import { ChevronDown, Plus, Search, Settings, MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { transactions } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/components/ui/use-toast"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [dateRange, setDateRange] = useState("2 Feb - 14 apr")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [fulfillment, setFulfillment] = useState("")

  // Convert transactions to orders format
  const orders = transactions.map((transaction, index) => ({
    id: `Order-${12567 - index}`,
    total: transaction.amount,
    status: transaction.status === "Completed" ? "Paid" : transaction.status === "Failed" ? "Canceled" : "Unfulfilled",
    customer: transaction.customer,
    customerCode: `CST-${Math.floor(Math.random() * 900) + 100}`,
    date: transaction.date,
    channel: "Fikri",
    fulfilled: Math.random() > 0.7,
  }))

  const filteredOrders =
    activeTab === "all"
      ? orders
      : activeTab === "unfulfilled"
        ? orders.filter((order) => !order.fulfilled)
        : orders.filter((order) => order.status === "Paid")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500"
      case "Canceled":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-50 text-green-500 border border-green-200"
      case "Canceled":
        return "bg-red-50 text-red-500 border border-red-200"
      default:
        return "bg-blue-50 text-blue-500 border border-blue-200"
    }
  }

  const handleViewOrder = (order: any) => {
    toast({
      title: "View Order",
      description: `Viewing order ${order.id}`,
    })
  }

  const handleEditOrder = (order: any) => {
    toast({
      title: "Edit Order",
      description: `Editing order ${order.id}`,
    })
  }

  const handleDeleteOrder = (order: any) => {
    toast({
      title: "Delete Order",
      description: `Deleting order ${order.id}`,
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <AdminHeader title="Orders" description="View and manage customer orders" />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Orders List</h2>
              <button className="text-gray-500">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
            <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2 border-b pb-4">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "all" ? "text-[#635BFF] border-b-2 border-[#635BFF]" : "text-gray-600"}`}
                onClick={() => setActiveTab("all")}
              >
                All Orders
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "unfulfilled" ? "text-[#635BFF] border-b-2 border-[#635BFF]" : "text-gray-600"}`}
                onClick={() => setActiveTab("unfulfilled")}
              >
                Unfulfilled
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "paid" ? "text-[#635BFF] border-b-2 border-[#635BFF]" : "text-gray-600"}`}
                onClick={() => setActiveTab("paid")}
              >
                Paid
              </button>
              <button className="px-4 py-2 font-medium text-gray-600 ml-auto">View</button>
            </div>

            <div className="flex flex-wrap gap-2 justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search" className="pl-9 w-[250px]" />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="Date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 Feb - 14 apr">2 Feb - 14 apr</SelectItem>
                    <SelectItem value="15 Apr - 30 Apr">15 Apr - 30 Apr</SelectItem>
                    <SelectItem value="1 May - 15 May">1 May - 15 May</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fulfillment} onValueChange={setFulfillment}>
                  <SelectTrigger className="w-[150px] bg-white">
                    <SelectValue placeholder="Fulfillment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulfilled">Fulfilled</SelectItem>
                    <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="bg-white">
                  Hide
                </Button>

                <Button variant="outline" className="bg-white">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Table
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3 px-4 font-medium">Order ID</th>
                    <th className="py-3 px-4 font-medium">Total</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Customer</th>
                    <th className="py-3 px-4 font-medium">Order Date</th>
                    <th className="py-3 px-4 font-medium">Channel</th>
                    <th className="py-3 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(order.status)}`}></span>
                          {order.id}
                        </div>
                      </td>
                      <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div>{order.customer}</div>
                          <div className="text-xs text-muted-foreground">{order.customerCode}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.channel}</td>
                      <td className="py-3 px-4">
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </ContextMenuTrigger>
                          <ContextMenuContent className="w-48">
                            <ContextMenuItem onClick={() => handleViewOrder(order)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </ContextMenuItem>
                            <ContextMenuItem onClick={() => handleEditOrder(order)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={() => handleDeleteOrder(order)} className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
