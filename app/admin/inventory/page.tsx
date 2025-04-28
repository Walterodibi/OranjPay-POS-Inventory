"use client"

import { useState } from "react"
import { Filter, Download, Plus, Search, Edit, Trash, Eye, MoreHorizontal } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { OranjButton } from "@/components/ui/oranj-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { inventory } from "@/lib/mock-data"
import { Combobox } from "@/components/ui/combobox"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function InventoryPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const inventoryFilters = [
    { value: "all", label: "All Inventory" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "expiring-soon", label: "Expiring Soon" },
  ]

  // Filter inventory based on active tab
  const filteredInventory =
    activeFilter === "all"
      ? inventory
      : activeFilter === "in-stock"
        ? inventory.filter((item) => item.status === "In Stock")
        : activeFilter === "low-stock"
          ? inventory.filter((item) => item.status === "Low Stock")
          : inventory.filter((item) => {
              const expiryDate = new Date(item.expiryDate)
              const today = new Date()
              const threeMonthsFromNow = new Date()
              threeMonthsFromNow.setMonth(today.getMonth() + 3)
              return expiryDate <= threeMonthsFromNow
            })

  const handleView = (item: any) => {
    toast({
      title: "View Inventory Item",
      description: `Viewing ${item.productName}`,
    })
  }

  const handleEdit = (item: any) => {
    toast({
      title: "Edit Inventory Item",
      description: `Editing ${item.productName}`,
    })
  }

  const handleDelete = (item: any) => {
    toast({
      title: "Delete Inventory Item",
      description: `Deleting ${item.productName}`,
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Inventory" description="Track and manage your inventory" />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full max-w-xs">
            <Combobox
              options={inventoryFilters}
              value={activeFilter}
              onChange={setActiveFilter}
              placeholder="Select inventory status"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search inventory..." className="w-full sm:w-[200px] pl-8" />
            </div>
            <OranjButton variant="default" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </OranjButton>
            <OranjButton variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </OranjButton>
            <OranjButton variant="primary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </OranjButton>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Expiry Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">{item.location}</td>
                      <td className="py-3 px-4">{item.expiryDate}</td>
                      <td className="py-3 px-4">{item.lastUpdated}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <ContextMenu>
                          <ContextMenuTrigger>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </ContextMenuTrigger>
                          <ContextMenuContent className="w-48">
                            <ContextMenuItem onClick={() => handleView(item)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </ContextMenuItem>
                            <ContextMenuItem onClick={() => handleEdit(item)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={() => handleDelete(item)} className="text-red-600">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
