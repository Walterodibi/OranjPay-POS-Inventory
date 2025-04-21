"use client"

import { useState } from "react"
import { Download, Printer, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  subtotal: number
  tax: number
  total: number
}

export function ReceiptModal({ isOpen, onClose, cart, subtotal, tax, total }: ReceiptModalProps) {
  const [isPrinting, setPrinting] = useState(false)

  const handlePrint = () => {
    setPrinting(true)

    // Simulate printing
    setTimeout(() => {
      setPrinting(false)
    }, 2000)
  }

  const receiptNumber = `R-${Math.floor(100000 + Math.random() * 900000)}`
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold">OranjPay</h3>
            <p className="text-sm text-muted-foreground">123 Main Street, Anytown, USA</p>
            <p className="text-sm text-muted-foreground">Tel: (555) 123-4567</p>
          </div>
          <div className="flex justify-between text-sm">
            <span>Receipt #: {receiptNumber}</span>
            <span>{currentDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Cashier: Demo User</span>
            <span>{currentTime}</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Item</span>
              <div className="flex gap-8">
                <span>Qty</span>
                <span>Price</span>
              </div>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <div className="flex gap-8">
                  <span className="w-8 text-right">{item.quantity}</span>
                  <span className="w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <p className="font-medium">Payment Method</p>
            <p className="text-sm">Cash</p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for your purchase!</p>
            <p>Please keep this receipt for your records.</p>
          </div>
        </div>
        <DialogFooter className="flex-row justify-between">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            {isPrinting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Printing...</span>
              </>
            ) : (
              <>
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </DialogFooter>
        <div className="flex justify-center">
          <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
            New Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
