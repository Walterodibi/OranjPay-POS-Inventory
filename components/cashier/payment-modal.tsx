"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeDisplay } from "./qr-code-display"
import { BankTransferModal } from "./bank-transfer-modal"
import { CreditCard, Smartphone, Building, Banknote } from "lucide-react"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  onPaymentComplete: () => void
}

export function PaymentModal({ isOpen, onClose, amount, onPaymentComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showBankTransfer, setShowBankTransfer] = useState(false)

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Card Payment",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: "qr",
      name: "QR Code",
      icon: <Smartphone className="h-6 w-6" />,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Building className="h-6 w-6" />,
    },
    {
      id: "cash",
      name: "Cash",
      icon: <Banknote className="h-6 w-6" />,
    },
  ]

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
  }

  const handleProceed = () => {
    if (selectedMethod === "qr") {
      setShowQRCode(true)
    } else if (selectedMethod === "bank") {
      setShowBankTransfer(true)
    } else {
      // For other payment methods, just complete the payment
      onPaymentComplete()
      onClose()
    }
  }

  const handleQRClose = () => {
    setShowQRCode(false)
    onPaymentComplete()
    onClose()
  }

  const handleBankTransferClose = () => {
    setShowBankTransfer(false)
    onPaymentComplete()
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen && !showQRCode && !showBankTransfer} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div
                    className={`p-2 rounded-full ${
                      selectedMethod === method.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleProceed} disabled={!selectedMethod}>
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <QRCodeDisplay isOpen={showQRCode} onClose={handleQRClose} amount={amount} />

      {/* Bank Transfer Modal */}
      <BankTransferModal isOpen={showBankTransfer} onClose={handleBankTransferClose} amount={amount} />
    </>
  )
}
