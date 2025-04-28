"use client"

import { useState } from "react"
import { Plus, Search, Download, Upload, Edit, X, MoreVertical, ArrowUpDown, Info, Copy } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/mock-data"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const productFilters = [
    { value: "all", label: "All Products" },
    { value: "beverages", label: "Beverages" },
    { value: "food", label: "Food" },
    { value: "personal-care", label: "Personal Care" },
    { value: "alcohol", label: "Alcohol" },
  ]

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.category.toLowerCase() === activeFilter.replace("-", " "))

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId])
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId))
    }
  }

  const handleAddStock = (productId: number) => {
    toast({
      title: "Add Stock",
      description: `Adding stock to product ID: ${productId}`,
    })
  }

  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Products" description="Access and update all your product's information here" />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">{filteredProducts.length} Products</div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-amber-400 text-amber-600">
                <Download className="h-4 w-4 mr-2" />
                Import
              </Button>

              <Button variant="outline" size="sm" className="border-emerald-400 text-emerald-600">
                <Upload className="h-4 w-4 mr-2" />
                Export
              </Button>

              <Button variant="outline" size="sm" className="border-red-400 text-red-600">
                <X className="h-4 w-4 mr-2" />
                Delete
              </Button>

              <Button variant="outline" size="sm" className="bg-amber-500 text-white border-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M12 11h4"></path>
                  <path d="M12 16h4"></path>
                  <path d="M8 11h.01"></path>
                  <path d="M8 16h.01"></path>
                </svg>
                Reconciliation
              </Button>

              <Button variant="outline" size="sm" className="bg-orange-500 text-white border-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M9 14 4 9l5-5"></path>
                  <path d="M4 9h16"></path>
                </svg>
                Returns
              </Button>

              <Button variant="outline" size="sm" className="bg-emerald-500 text-white border-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                  <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
                </svg>
                Restock
              </Button>

              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add new product
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by Barcode Scaning or product name, ID & SKU"
                className="pl-10 pr-20 py-2 border-purple-200 focus:border-purple-400 rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-0 top-0 h-full rounded-l-none bg-purple-600 hover:bg-purple-700">
                Search
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Store</span>
                <select className="border rounded-md px-3 py-2 min-w-[150px]">
                  <option>Jazz Shop</option>
                </select>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Category</span>
                <select className="border rounded-md px-3 py-2 min-w-[150px]">
                  <option>Category</option>
                </select>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Inventory Type</span>
                <select className="border rounded-md px-3 py-2 min-w-[150px]">
                  <option>Type</option>
                </select>
              </div>

              <Button variant="outline" className="border-purple-400 text-purple-600">
                <Edit className="h-4 w-4 mr-2" />
                Bulk Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left w-10">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    />
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Product ID</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">
                    <div className="flex items-center">
                      Product Name
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Product Type</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Selling Price</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Stock Quantity</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Unit</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                      />
                    </td>
                    <td className="p-3 text-sm">{product.id}</td>
                    <td className="p-3 text-sm font-medium">{product.name}</td>
                    <td className="p-3 text-sm">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Single Product</span>
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center">
                        NGN {product.price.toLocaleString()}
                        <Info className="ml-1 h-4 w-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="p-3 text-sm">
                      <span className={`text-sm ${product.stock > 20 ? "text-green-600" : "text-red-600"}`}>
                        {product.stock.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-3 text-sm">bunch(es)</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                          onClick={() => handleAddStock(product.id)}
                        >
                          Add Stock
                        </Button>
                        <Button variant="outline" size="sm" className="p-0 h-8 w-8 border-gray-200">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-0 h-8 w-8 border-gray-200">
                          <Copy className="h-4 w-4 text-gray-500" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="p-0 h-8 w-8 border-gray-200">
                              <MoreVertical className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Product</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
