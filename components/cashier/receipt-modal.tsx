"use client"

import { useState, useRef } from "react"
import { Download, Printer, Share, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  cartItems?: CartItem[]
  total?: number
}

export function ReceiptModal({ isOpen, onClose, cartItems = [], total = 0 }: ReceiptModalProps) {
  const [isPrinting, setPrinting] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    setPrinting(true)

    // Create a printable version of the receipt
    const receiptContent = receiptRef.current?.innerHTML || ""
    const printWindow = window.open("", "_blank")

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body {
                font-family: 'Courier New', monospace;
                width: 300px;
                margin: 0 auto;
                padding: 10px;
              }
              .receipt-header {
                text-align: center;
                margin-bottom: 10px;
              }
              .receipt-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              .receipt-total {
                font-weight: bold;
                margin-top: 10px;
                border-top: 1px dashed #000;
                padding-top: 10px;
              }
              .receipt-footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
              }
              .dotted-line {
                border-top: 1px dashed #000;
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            ${receiptContent}
          </body>
        </html>
      `)

      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }

    setTimeout(() => {
      setPrinting(false)
    }, 2000)
  }

  const receiptNumber = `R-${Math.floor(100000 + Math.random() * 900000)}`
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  // Calculate subtotal and tax
  const subtotal = total / 1.08
  const tax = total - subtotal

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] font-mono">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-center">Receipt</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4" ref={receiptRef}>
          <div className="receipt-header text-center">
            <h3 className="text-lg font-bold">ORANJPAY</h3>
            <p className="text-sm">123 Main Street, Anytown, Nigeria</p>
            <p className="text-sm">Tel: (234) 123-4567</p>
            <div className="dotted-line border-t border-dashed border-gray-400 my-2"></div>
            <div className="flex justify-between text-sm">
              <span>Receipt #: {receiptNumber}</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cashier: Demo User</span>
              <span>{currentTime}</span>
            </div>
            <div className="dotted-line border-t border-dashed border-gray-400 my-2"></div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>ITEM</span>
              <div className="flex gap-4">
                <span>QTY</span>
                <span>PRICE</span>
                <span>TOTAL</span>
              </div>
            </div>
            <div className="dotted-line border-t border-dashed border-gray-400 my-1"></div>

            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate max-w-[150px]">{item.name}</span>
                  <div className="flex gap-4">
                    <span className="w-8 text-right">{item.quantity}</span>
                    <span className="w-16 text-right">₦{item.price.toFixed(2)}</span>
                    <span className="w-16 text-right">₦{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-center text-muted-foreground py-2">No items in cart</div>
            )}

            <div className="dotted-line border-t border-dashed border-gray-400 my-1"></div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>SUBTOTAL</span>
              <span>₦{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>VAT (8%)</span>
              <span>₦{tax.toFixed(2)}</span>
            </div>
            <div className="dotted-line border-t border-dashed border-gray-400 my-1"></div>
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span>₦{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-lg border border-dashed p-3 text-center">
            <p className="font-medium">PAYMENT METHOD</p>
            <p className="text-sm">CASH</p>
          </div>

          <div className="dotted-line border-t border-dashed border-gray-400 my-1"></div>

          <div className="text-center text-sm">
            <p>Thank you for your purchase!</p>
            <p>Please keep this receipt for your records.</p>
            <p className="mt-2">www.oranjpay.com</p>
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
          <Button
            onClick={onClose}
            className="bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
          >
            New Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
