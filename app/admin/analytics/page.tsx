"use client"

import { useState } from "react"
import {
  Download,
  LineChart,
  BarChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  CreditCard,
  QrCode,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { Line, Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 7, 24), // August 24, 2023
    to: new Date(2023, 8, 28), // September 28, 2023
  })
  const [searchQuery, setSearchQuery] = useState("")

  // Sales chart data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales 2023",
        data: [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 86, 95],
        fill: false,
        borderColor: "#FF6B00",
        tension: 0.1,
      },
      {
        label: "Sales 2022",
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        fill: false,
        borderColor: "#9CA3AF",
        tension: 0.1,
      },
    ],
  }

  // Category chart data
  const categoryData = {
    labels: ["Beverages", "Food", "Personal Care", "Alcohol", "Other"],
    datasets: [
      {
        label: "Sales by Category",
        data: [35, 25, 20, 15, 5],
        backgroundColor: ["#FF6B00", "#FFB27A", "#FFC7A6", "#FFD9C7", "#FFECE3"],
        borderWidth: 1,
      },
    ],
  }

  // Payment method chart data
  const paymentData = {
    labels: ["Cash", "Card", "QR Code"],
    datasets: [
      {
        label: "Payment Methods",
        data: [39, 42, 19],
        backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6"],
        borderWidth: 1,
      },
    ],
  }

  // Time of day chart data
  const timeData = {
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        label: "Sales by Time of Day",
        data: [30, 45, 20, 5],
        backgroundColor: ["#FBBF24", "#F59E0B", "#D97706", "#92400E"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search analytics..."
              className="pl-9 w-full md:w-[240px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦1,245,670.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5%
              </span>{" "}
              from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Count</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +8.2%
              </span>{" "}
              from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦970.15</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                +3.7%
              </span>{" "}
              from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <TrendingDown className="mr-1 h-3 w-3" />
                +0.5%
              </span>{" "}
              from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Sales performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line
                    data={salesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Pie
                    data={categoryData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sales by Time of Day</CardTitle>
                <CardDescription>When your customers are most active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Bar
                    data={timeData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products by sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Coca-Cola", sales: 245, revenue: 61250, growth: 12.5 },
                  { name: "Dettol Soap", sales: 187, revenue: 65450, growth: 8.3 },
                  { name: "Nivea Lotion", sales: 156, revenue: 187200, growth: 15.7 },
                  { name: "Chivita Juice", sales: 132, revenue: 112200, growth: -2.1 },
                  { name: "Beef Sausage", sales: 98, revenue: 147000, growth: 5.4 },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="font-medium text-lg">{i + 1}</div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.sales} units sold</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦{product.revenue.toLocaleString()}</div>
                      <div
                        className={`text-sm flex items-center justify-end ${
                          product.growth >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {product.growth >= 0 ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {Math.abs(product.growth)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Detailed analysis of product performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar
                  data={{
                    labels: ["Coca-Cola", "Dettol Soap", "Nivea Lotion", "Chivita Juice", "Beef Sausage"],
                    datasets: [
                      {
                        label: "Units Sold",
                        data: [245, 187, 156, 132, 98],
                        backgroundColor: "#FF6B00",
                      },
                      {
                        label: "Revenue (₦1000s)",
                        data: [61.25, 65.45, 187.2, 112.2, 147],
                        backgroundColor: "#FFB27A",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Breakdown of your customer base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Pie
                    data={{
                      labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
                      datasets: [
                        {
                          label: "Age Groups",
                          data: [15, 30, 25, 20, 10],
                          backgroundColor: ["#FF6B00", "#FFB27A", "#FFC7A6", "#FFD9C7", "#FFECE3"],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>New vs returning customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Pie
                    data={{
                      labels: ["New Customers", "Returning Customers"],
                      datasets: [
                        {
                          label: "Customer Type",
                          data: [35, 65],
                          backgroundColor: ["#FF6B00", "#FFB27A"],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Your highest value customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", orders: 24, spent: 125000, lastPurchase: "2 days ago" },
                    { name: "Mary Smith", orders: 18, spent: 98500, lastPurchase: "5 days ago" },
                    { name: "Robert Brown", orders: 15, spent: 87200, lastPurchase: "1 week ago" },
                    { name: "Alice Johnson", orders: 12, spent: 65400, lastPurchase: "2 weeks ago" },
                    { name: "David Wilson", orders: 10, spent: 54300, lastPurchase: "3 weeks ago" },
                  ].map((customer, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">Last purchase: {customer.lastPurchase}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₦{customer.spent.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Method Distribution</CardTitle>
              <CardDescription>Breakdown of sales by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Pie
                  data={paymentData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
                <Wallet className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦485,250.00</div>
                <p className="text-xs text-muted-foreground">39% of total revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Card Payments</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦523,120.00</div>
                <p className="text-xs text-muted-foreground">42% of total revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">QR Code Payments</CardTitle>
                <QrCode className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦237,300.00</div>
                <p className="text-xs text-muted-foreground">19% of total revenue</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
