"use client"

import { useState } from "react"
import { Plus, Search, MapPin, Store, User, Calendar, Edit, Trash, MoreHorizontal } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OranjButton } from "@/components/ui/oranj-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

// Sample storefront data
const storefronts = [
  {
    id: "1",
    name: "Main Store",
    address: "123 Lagos Street, Lagos, Nigeria",
    manager: "Sarah Johnson",
    employees: 5,
    status: "Active",
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Branch Store",
    address: "456 Abuja Road, Abuja, Nigeria",
    manager: "Michael Chen",
    employees: 3,
    status: "Active",
    createdAt: "Mar 10, 2023",
  },
  {
    id: "3",
    name: "Mall Kiosk",
    address: "Ikeja City Mall, Lagos, Nigeria",
    manager: "Jessica Williams",
    employees: 2,
    status: "Inactive",
    createdAt: "Apr 5, 2023",
  },
]

export default function StorefrontsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useAuth()

  const tabs = [
    { id: "all", label: "All Storefronts" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
  ]

  const filteredStorefronts =
    activeTab === "all" ? storefronts : storefronts.filter((store) => store.status.toLowerCase() === activeTab)

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Storefronts" description={`Manage your POS locations, ${user?.name || "User"}`} />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search storefronts..." className="w-full sm:w-[200px] pl-8" />
            </div>
            <OranjButton>
              <Plus className="h-4 w-4 mr-2" />
              Add Storefront
            </OranjButton>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStorefronts.map((store) => (
            <Card key={store.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    {store.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <OranjButton variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </OranjButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{store.manager}</p>
                      <p className="text-xs text-muted-foreground">{store.employees} employees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">Created on {store.createdAt}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        store.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {store.status}
                    </span>
                    <OranjButton size="sm">Manage</OranjButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
