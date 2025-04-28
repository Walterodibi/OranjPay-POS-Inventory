"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function CreateSingleProductPage() {
  const [productType, setProductType] = useState("product")
  const [hasVariants, setHasVariants] = useState("no")
  const [sellMode, setSellMode] = useState("yes")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center text-[#635BFF] hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      </div>

      <div className="mb-8">
        <RadioGroup defaultValue="product" className="flex gap-4" value={productType} onValueChange={setProductType}>
          <div className={`border rounded-md p-4 ${productType === "product" ? "border-[#635BFF]" : ""}`}>
            <RadioGroupItem value="product" id="product" className="sr-only" />
            <Label
              htmlFor="product"
              className={`flex items-center gap-2 cursor-pointer ${productType === "product" ? "text-[#635BFF]" : ""}`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  productType === "product" ? "border-[#635BFF]" : "border-gray-400"
                }`}
              >
                {productType === "product" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
              </div>
              Product
            </Label>
          </div>
          <div className={`border rounded-md p-4 ${productType === "services" ? "border-[#635BFF]" : ""}`}>
            <RadioGroupItem value="services" id="services" className="sr-only" />
            <Label
              htmlFor="services"
              className={`flex items-center gap-2 cursor-pointer ${productType === "services" ? "text-[#635BFF]" : ""}`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  productType === "services" ? "border-[#635BFF]" : "border-gray-400"
                }`}
              >
                {productType === "services" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
              </div>
              Services
            </Label>
          </div>
        </RadioGroup>
      </div>

      <h1 className="text-2xl font-bold mb-2">Create single product</h1>
      <p className="text-gray-600 mb-8">Please provide the following information about your product</p>

      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="productName" className="text-sm font-medium mb-1 block">
                <span className="text-red-500">*</span>Product Name
              </Label>
              <Input id="productName" placeholder="Enter product name" />
            </div>

            <div>
              <Label htmlFor="category" className="text-sm font-medium mb-1 block">
                <span className="text-red-500">*</span>Category
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food & Beverages</SelectItem>
                  <SelectItem value="health">Health & Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="store" className="text-sm font-medium mb-1 block">
                <span className="text-red-500">*</span>Select Store To Make Product Available At
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select store..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Store</SelectItem>
                  <SelectItem value="branch1">Branch 1</SelectItem>
                  <SelectItem value="branch2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label className="text-sm font-medium">Product unit</Label>
                <Button variant="ghost" size="sm" className="h-6 text-[#635BFF] p-0">
                  <Plus className="h-3 w-3 mr-1" /> Create New Unit
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">Base Unit</Label>
                  <p className="text-xs text-gray-500 mb-1">
                    Select the smallest possible unit you will be selling this product in
                  </p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="kg">Kilogram</SelectItem>
                      <SelectItem value="liter">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="h-6 text-[#635BFF] p-0">
                    What is Additional Unit
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1 block">
                <span className="text-red-500">*</span>Does This Product Have Variants?
              </Label>
              <Select value={hasVariants} onValueChange={setHasVariants}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1 block">
                <span className="text-red-500">*</span>Show this product in sell mode?
              </Label>
              <Select value={sellMode} onValueChange={setSellMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-orange-100 rounded-lg w-full h-[200px] flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-full mb-2">
                  <img src="/placeholder.svg?height=40&width=40" alt="Placeholder" className="h-10 w-10" />
                </div>
                <Button variant="outline" className="bg-white">
                  <Upload className="h-4 w-4 mr-2" /> Add Product Images
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="sku" className="text-sm font-medium mb-1 block">
                Product SKU
              </Label>
              <Input id="sku" placeholder="Enter SKU" />
            </div>

            <div>
              <Label htmlFor="barcode" className="text-sm font-medium mb-1 block">
                Scan Barcode
              </Label>
              <div className="relative">
                <Input id="barcode" placeholder="Scan barcode" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#635BFF" strokeWidth="2" />
                    <path
                      d="M7 7V7C7 7 7 7 7 7V17C7 17 7 17 7 17V17"
                      stroke="#635BFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 7V7C17 7 17 7 17 7V17C17 17 17 17 17 17V17"
                      stroke="#635BFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path d="M10 7V17" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" />
                    <path d="M13 7V17" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-1 block">
                Description
              </Label>
              <div className="border rounded-md">
                <div className="flex items-center border-b p-2 gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="font-bold">H1</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="font-bold text-sm">H2</span>
                  </button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H12M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="font-bold">B</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="italic">I</span>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <span className="underline">U</span>
                  </button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Add description to this product"
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={8}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 border rounded-md bg-gray-50 text-center">
          <p className="text-gray-700">Please select stores to proceed with pricing</p>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">Create Product</Button>
      </div>
    </div>
  )
}
