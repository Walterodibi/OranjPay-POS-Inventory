"use client"

import { useState } from "react"
import { Check, CreditCard, QrCode, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  total: number
}

export function PaymentModal({ isOpen, onClose, onComplete, total }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [cashAmount, setCashAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onComplete()
    }, 2000)
  }

  const handleCashAmountChange = (value: string) => {
    // Only allow numbers and decimal points
    const regex = /^[0-9]*\.?[0-9]*$/
    if (value === "" || regex.test(value)) {
      setCashAmount(value)
    }
  }

  const calculateChange = () => {
    const amount = Number.parseFloat(cashAmount)
    if (isNaN(amount) || amount < total) {
      return 0
    }
    return amount - total
  }

  const handleCardNumberChange = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, "")

    // Format with spaces every 4 digits
    let formatted = ""
    for (let i = 0; i < cleaned.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += cleaned[i]
    }

    // Limit to 19 characters (16 digits + 3 spaces)
    setCardNumber(formatted.slice(0, 19))
  }

  const handleCardExpiryChange = (value: string) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, "")

    // Format as MM/YY
    if (cleaned.length <= 2) {
      setCardExpiry(cleaned)
    } else {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`)
    }
  }

  const handleCardCvcChange = (value: string) => {
    // Remove any non-digit characters and limit to 3 or 4 digits
    const cleaned = value.replace(/\D/g, "")
    setCardCvc(cleaned.slice(0, 4))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
          <DialogDescription>Select a payment method to complete the transaction.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="cash" value={paymentMethod} onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cash" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Cash</span>
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Card</span>
            </TabsTrigger>
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span>QR Code</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cash" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="cash-amount">Cash Amount</Label>
              <Input
                id="cash-amount"
                placeholder="Enter amount"
                value={cashAmount}
                onChange={(e) => handleCashAmountChange(e.target.value)}
              />
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cash:</span>
                <span>${cashAmount ? Number.parseFloat(cashAmount).toFixed(2) : "0.00"}</span>
              </div>
              <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
                <span>Change:</span>
                <span>${calculateChange().toFixed(2)}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 20, 50, 100, "Exact"].map((amount) => (
                <Button
                  key={amount.toString()}
                  variant="outline"
                  onClick={() => setCashAmount(amount === "Exact" ? total.toString() : amount.toString())}
                >
                  {amount === "Exact" ? "Exact" : `$${amount}`}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="card" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => handleCardExpiryChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardCvc}
                  onChange={(e) => handleCardCvcChange(e.target.value)}
                />
              </div>
            </div>
            <RadioGroup defaultValue="credit" className="pt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">Credit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit">Debit</Label>
              </div>
            </RadioGroup>
          </TabsContent>
          <TabsContent value="qr" className="pt-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-lg border p-4">
                <div className="h-48 w-48 bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Scan this QR code with your mobile payment app to complete the transaction.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={
              isProcessing ||
              (paymentMethod === "cash" && (Number.parseFloat(cashAmount) < total || !cashAmount)) ||
              (paymentMethod === "card" && (cardNumber.length < 19 || !cardExpiry || !cardCvc))
            }
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Complete Payment
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
