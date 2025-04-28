"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { SalesChart } from "@/components/admin/sales-chart"
import { RecentTransactions } from "@/components/admin/recent-transactions"
import { TopProducts } from "@/components/admin/top-products"
import { OranjButton } from "@/components/ui/oranj-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table"
import { useAuth } from "@/contexts/auth-context"
import { Combobox } from "@/components/ui/combobox"
import { PeriodComparison } from "@/components/ui/period-comparison"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { subDays } from "date-fns"

// Sample customer data
const customers = [
  {
    id: "1",
    name: "Michael Wilkinson",
    email: "michael@example.com",
    paymentMethod: "Card",
    created: "Nov 6, 2023, 1:01 PM",
    totalSpend: 45000,
    payments: 1,
    refunds: 0,
    lastPayment: "Nov 6, 2023",
  },
  {
    id: "2",
    name: "Patrick K McCann",
    email: "patrick@example.com",
    paymentMethod: "Cash",
    created: "Oct 25, 2023, 3:53 PM",
    totalSpend: 20325,
    payments: 1,
    refunds: 0,
    lastPayment: "Oct 25, 2023",
  },
  {
    id: "3",
    name: "Michael Wilkinson",
    email: "michael.w@example.com",
    paymentMethod: "QR Code",
    created: "Oct 23, 2023, 6:10 AM",
    totalSpend: 25000,
    payments: 1,
    refunds: 0,
    lastPayment: "Oct 23, 2023",
  },
  {
    id: "4",
    name: "Michelle L Stewart",
    email: "michelle@example.com",
    paymentMethod: "Card",
    created: "Sep 15, 2023, 4:06 AM",
    totalSpend: 25000,
    payments: 1,
    refunds: 0,
    lastPayment: "Sep 15, 2023",
  },
  {
    id: "5",
    name: "Michelle L Stewart",
    email: "michelle.s@example.com",
    paymentMethod: "Cash",
    created: "Sep 15, 2023, 4:04 AM",
    totalSpend: 0,
    payments: 0,
    refunds: 0,
    lastPayment: "",
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "paymentMethod",
    header: "Default payment method",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "totalSpend",
    header: "Total spend",
    cell: ({ row }: { row: any }) => {
      return <div>₦{row.getValue("totalSpend").toLocaleString()}</div>
    },
  },
  {
    accessorKey: "payments",
    header: "Payments",
  },
  {
    accessorKey: "refunds",
    header: "Refunds",
  },
  {
    accessorKey: "lastPayment",
    header: "Last payment",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="text-right">
          <OranjButton variant="ghost" size="sm">
            ...
          </OranjButton>
        </div>
      )
    },
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [customerType, setCustomerType] = useState("all")
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 6),
    to: new Date(),
  })

  const customerTypes = [
    { value: "all", label: "All Customers" },
    { value: "top", label: "Top Customers" },
    { value: "first-time", label: "First-time Customers" },
    { value: "repeat", label: "Repeat Customers" },
    { value: "recent", label: "Recent Customers" },
  ]

  const getFilteredData = () => {
    switch (customerType) {
      case "top":
        return customers.filter((c) => c.totalSpend > 20000)
      case "first-time":
        return customers.filter((c) => c.payments === 1)
      case "repeat":
        return customers.filter((c) => c.payments > 1)
      case "recent":
        return customers.slice(0, 3)
      default:
        return customers
    }
  }

  // Simple error boundary to catch rendering errors
  try {
    return (
      <div className="flex flex-col w-full">
        <AdminHeader title="Dashboard" description={`Welcome back, ${user?.name || "User"}`} />

        <div className="p-4 md:p-6 space-y-6 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl font-bold">Welcome, {user?.name || "Joe"}!</div>
            <div className="flex flex-wrap items-center gap-2">
              <DateRangePicker date={dateRange} onDateChange={setDateRange} className="w-auto" />
              <OranjButton variant="default" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </OranjButton>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6 mt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-3xl">₦1,245,600</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PeriodComparison value={12.5} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Orders</CardDescription>
                    <CardTitle className="text-3xl">1,245</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PeriodComparison value={8.2} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Average Order Value</CardDescription>
                    <CardTitle className="text-3xl">₦1,000</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PeriodComparison value={3.1} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Customers</CardDescription>
                    <CardTitle className="text-3xl">845</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PeriodComparison value={5.8} />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TopProducts />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentTransactions />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sales" className="space-y-6 mt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
                <div className="flex items-center gap-2">
                  <OranjButton variant="primary">Add customer</OranjButton>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full max-w-xs">
                  <Combobox
                    options={customerTypes}
                    value={customerType}
                    onChange={setCustomerType}
                    placeholder="Select customer type"
                  />
                </div>
              </div>

              <div className="admin-table-container">
                <div className="rounded-md border w-full bg-white">
                  <DataTable columns={columns} data={getFilteredData()} />
                </div>
                <div className="text-xs text-muted-foreground mt-2">{getFilteredData().length} results</div>
              </div>
            </TabsContent>
            <TabsContent value="inventory" className="space-y-6 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Overview of your current inventory levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Total Products</h3>
                        <p className="text-2xl font-bold">152</p>
                        <p className="text-xs text-muted-foreground mt-1">15 categories</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Low Stock Items</h3>
                        <p className="text-2xl font-bold text-amber-500">8</p>
                        <p className="text-xs text-muted-foreground mt-1">Below minimum threshold</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-1">Out of Stock</h3>
                        <p className="text-2xl font-bold text-red-500">3</p>
                        <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
                      </div>
                    </div>

                    <div className="h-60 flex items-center justify-center bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground">Inventory chart will be displayed here</p>
                    </div>

                    <div className="flex justify-end">
                      <OranjButton variant="primary">Manage Inventory</OranjButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard rendering error:", error)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-500 font-medium">Error rendering dashboard</p>
          <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }
}
