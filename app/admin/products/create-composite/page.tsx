"use client"

import { useState } from "react"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function CreateCompositeProductPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center text-[#635BFF] hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Create Composite Product</h1>

      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#635BFF] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              1
            </div>
            <span className="text-sm mt-2 text-center">Base Products</span>
            <p className="text-xs text-gray-500 text-center max-w-[150px] mt-1">
              Add the base products that make up your composite product
            </p>
          </div>

          <div className="flex-1 h-1 bg-gray-200 mx-4 relative">
            <div className={`absolute inset-0 bg-[#635BFF] transition-all ${step >= 2 ? "w-full" : "w-0"}`}></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#635BFF] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              2
            </div>
            <span className="text-sm mt-2 text-center">Composite Details</span>
            <p className="text-xs text-gray-500 text-center max-w-[150px] mt-1">
              Enter details of your composite product. Select the store it is going to be available in and enter your
              desired pricing.
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Composite Items</h2>
        <p className="text-gray-600 mb-6">Please add the base products that make up your composite product</p>

        <div className="border rounded-md overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITEM</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QUANTITY
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td colSpan={2} className="px-6 py-8">
                  <div className="flex justify-center">
                    <Button variant="outline" className="border-dashed border-[#635BFF] text-[#635BFF]">
                      <Plus className="h-4 w-4 mr-2" /> Add Base Products
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white" onClick={() => setStep(2)}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  )
}
