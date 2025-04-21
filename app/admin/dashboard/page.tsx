"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/admin-header"
import { SalesChart } from "@/components/admin/sales-chart"
import { RecentTransactions } from "@/components/admin/recent-transactions"
import { TopProducts } from "@/components/admin/top-products"
import { SidebarInset } from "@/components/ui/sidebar"

// Mock data
const dashboardData = {
  totalSales: 12495.75,
  totalOrders: 156,
  averageOrder: 80.1,
  totalCustomers: 87,
  salesChange: 12.5,
  ordersChange: 8.2,
  averageOrderChange: 3.7,
  customersChange: 15.3,
}

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <SidebarInset>
      <div className="flex flex-col">
        <AdminHeader title="Dashboard" description="Overview of your store performance" />
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData.totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.salesChange > 0 ? (
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {dashboardData.salesChange}% from last month
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {Math.abs(dashboardData.salesChange)}% from last month
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.ordersChange > 0 ? (
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {dashboardData.ordersChange}% from last month
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {Math.abs(dashboardData.ordersChange)}% from last month
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Order</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardData.averageOrder.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.averageOrderChange > 0 ? (
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {dashboardData.averageOrderChange}% from last month
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {Math.abs(dashboardData.averageOrderChange)}% from last month
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.customersChange > 0 ? (
                    <span className="flex items-center text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {dashboardData.customersChange}% from last month
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {Math.abs(dashboardData.customersChange)}% from last month
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>View your sales performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SalesChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Your best-selling products this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopProducts />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your most recent sales transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                    <CardDescription>Products that need attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 flex-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Organic Cotton T-Shirt</span>
                        </div>
                        <div className="text-red-500 text-sm">Low Stock (3)</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 flex-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Wireless Earbuds</span>
                        </div>
                        <div className="text-red-500 text-sm">Low Stock (2)</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 flex-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Leather Wallet</span>
                        </div>
                        <div className="text-amber-500 text-sm">Medium Stock (8)</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 flex-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Smart Watch</span>
                        </div>
                        <div className="text-green-500 text-sm">In Stock (15)</div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 flex-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Bluetooth Speaker</span>
                        </div>
                        <div className="text-green-500 text-sm">In Stock (12)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Advanced analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and download custom reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Reports dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System alerts and important updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Notifications dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarInset>
  )
}
