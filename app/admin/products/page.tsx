"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { DataTable } from "@/components/data-table"
import { products } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductCard } from "@/components/admin/product-card"
import { Plus, Search, Filter, Download, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const columns = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }: { row: any }) => {
      return (
        <div className="h-10 w-10 relative rounded-md overflow-hidden bg-white">
          <Image
            src={row.original.image || "/placeholder.svg"}
            alt={row.original.name}
            fill
            className="object-contain p-1"
            sizes="40px"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }: { row: any }) => {
      return <div>₦{row.getValue("price").toLocaleString()}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: any }) => {
      const status = row.getValue("status")
      return (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            status === "In Stock" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="text-right">
          <Button variant="ghost" size="sm">
            ...
          </Button>
        </div>
      )
    },
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "low-stock" && product.status === "Low Stock") ||
      (activeTab === "in-stock" && product.status === "In Stock")
    return matchesSearch && matchesTab
  })

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Products" description="Manage your product inventory" />

      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === "grid" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none ${viewMode === "list" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Link href="/admin/products/create-single">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="in-stock">In Stock</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <DataTable columns={columns} data={filteredProducts} />
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-2">{filteredProducts.length} products</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
