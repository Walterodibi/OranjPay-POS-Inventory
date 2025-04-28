"use client"

import { ChevronLeft, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function MultiProductUploadPage() {
  const [productType, setProductType] = useState("single")

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/products" className="inline-flex items-center text-[#635BFF] hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">Multi-Product Upload</h1>
      <p className="text-gray-600 mb-8">
        Upload products in bulk for both single and composite types of product using a .csv file
      </p>

      <Card className="p-6 mb-8">
        <RadioGroup
          defaultValue="single"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          value={productType}
          onValueChange={setProductType}
        >
          <div className={`border rounded-md p-4 ${productType === "single" ? "border-[#635BFF]" : ""}`}>
            <RadioGroupItem value="single" id="single" className="sr-only" />
            <Label
              htmlFor="single"
              className={`flex items-center gap-2 cursor-pointer ${productType === "single" ? "text-[#635BFF]" : ""}`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  productType === "single" ? "border-[#635BFF]" : "border-gray-400"
                }`}
              >
                {productType === "single" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
              </div>
              <div>
                <div className="font-medium">Single Product</div>
                <div className="text-sm text-gray-500">Upload a set of single products</div>
              </div>
            </Label>
          </div>
          <div className={`border rounded-md p-4 ${productType === "composite" ? "border-[#635BFF]" : ""}`}>
            <RadioGroupItem value="composite" id="composite" className="sr-only" />
            <Label
              htmlFor="composite"
              className={`flex items-center gap-2 cursor-pointer ${
                productType === "composite" ? "text-[#635BFF]" : ""
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  productType === "composite" ? "border-[#635BFF]" : "border-gray-400"
                }`}
              >
                {productType === "composite" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
              </div>
              <div>
                <div className="font-medium">Composite Product</div>
                <div className="text-sm text-gray-500">Upload a set of composite products</div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-medium">
              Follow step-by-step guide below for uploading your set of single products
            </p>
            <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">
              <Upload className="h-4 w-4 mr-2" /> Upload CSV File
            </Button>
          </div>

          <div className="space-y-8">
            <div className="flex">
              <div className="w-24 text-center">
                <div className="bg-green-100 text-green-600 text-xs font-medium rounded-full py-1 px-2 inline-block mb-2">
                  Step 1 of 4
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h3 className="font-semibold mb-1">Download the sample csv spreadsheet</h3>
                <p className="text-sm text-gray-600 mb-2">
                  This spreadsheet will serve as a template for organizing your customer data.
                </p>
                <Button variant="link" className="text-[#635BFF] p-0 h-auto">
                  <Download className="h-4 w-4 mr-1" /> Click here to download template
                </Button>
              </div>
            </div>

            <div className="flex">
              <div className="w-24 text-center">
                <div className="bg-green-100 text-green-600 text-xs font-medium rounded-full py-1 px-2 inline-block mb-2">
                  Step 2 of 4
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h3 className="font-semibold mb-1">Obtain your store ID</h3>
                <p className="text-sm text-gray-600 mb-2">
                  In order to successfully upload your products to your store, you will need your unique store ID.
                </p>
                <Button variant="link" className="text-[#635BFF] p-0 h-auto">
                  Click here to find out how to obtain your store ID
                </Button>
              </div>
            </div>

            <div className="flex">
              <div className="w-24 text-center">
                <div className="bg-green-100 text-green-600 text-xs font-medium rounded-full py-1 px-2 inline-block mb-2">
                  Step 3 of 4
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h3 className="font-semibold mb-1">Prepare your product list</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Ensure you have a complete list of product units ready for upload.
                </p>
                <Button variant="link" className="text-[#635BFF] p-0 h-auto">
                  please consult the list provided for a reference guide on common product units
                </Button>
              </div>
            </div>

            <div className="flex">
              <div className="w-24 text-center">
                <div className="bg-green-100 text-green-600 text-xs font-medium rounded-full py-1 px-2 inline-block mb-2">
                  Step 4 of 4
                </div>
              </div>
              <div className="ml-6 flex-1">
                <h3 className="font-semibold mb-1">Watch full video tutorial</h3>
                <p className="text-sm text-gray-600 mb-2">
                  For a detailed walkthrough of the bulk upload process, we recommend watching our comprehensive video
                  tutorial. This video will guide you through each step of the process, from organizing your data in the
                  spreadsheet to successfully uploading your products to your store.
                </p>
                <Button variant="link" className="text-[#635BFF] p-0 h-auto">
                  Click here to watch tutorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
