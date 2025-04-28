"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Package, Box, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CreateProductModalProps {
  trigger: React.ReactNode
}

export function CreateProductModal({ trigger }: CreateProductModalProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleOptionClick = (option: string) => {
    setOpen(false)

    if (option === "Create Single Product") {
      router.push("/admin/products/create-single")
    } else if (option === "Create Composite Product") {
      router.push("/admin/products/create-composite")
    } else if (option === "Multi-product upload") {
      router.push("/admin/products/multi-upload")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create new product</DialogTitle>
          <DialogDescription className="text-center text-base">
            Create a simple or multiple product at once
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => handleOptionClick("Create Single Product")}
            className="w-full flex items-center justify-between p-6 border rounded-lg hover:border-[#635BFF] group transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <Package className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Create Single Product</h3>
                <p className="text-gray-600 mt-1">
                  Effortlessly generate individual products for each store, with customizable pricing options per
                  product and store.
                </p>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-[#635BFF] transition-colors" />
          </button>

          <button
            onClick={() => handleOptionClick("Create Composite Product")}
            className="w-full flex items-center justify-between p-6 border rounded-lg hover:border-[#635BFF] group transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <Box className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Create Composite Product</h3>
                <p className="text-gray-600 mt-1">
                  Create products made up of specified quantities of one or more different products. Ideal for gift
                  packs or meals with multiples ingredients.
                </p>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-[#635BFF] transition-colors" />
          </button>

          <button
            onClick={() => handleOptionClick("Multi-product upload")}
            className="w-full flex items-center justify-between p-6 border rounded-lg hover:border-[#635BFF] group transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <Upload className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold">Multi-product upload</h3>
                <p className="text-gray-600 mt-1">
                  Upload products in bulk for both single & composite types of product using a .csv file
                </p>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-[#635BFF] transition-colors" />
          </button>
        </div>

        <div className="mt-6 flex justify-start">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
