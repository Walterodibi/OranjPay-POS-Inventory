"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { CreditCard, Smartphone, Building, Banknote, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount?: number
  onPaymentComplete: () => void
  onMethodSelect?: (methodId: string) => void
}

export function PaymentModal({ isOpen, onClose, amount = 0, onPaymentComplete, onMethodSelect }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showBankTransfer, setShowBankTransfer] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

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

  // Generate a random account number when bank is selected
  useEffect(() => {
    if (selectedMethod === "bank" && selectedBank) {
      setIsLoading(true)

      // Simulate loading the virtual account number
      const timer = setTimeout(() => {
        setAccountNumber(
          "9" +
            Math.floor(Math.random() * 1000000000)
              .toString()
              .padStart(9, "0"),
        )
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [selectedMethod, selectedBank])

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)

    if (onMethodSelect) {
      onMethodSelect(methodId)
    } else {
      // If no external handler, handle internally
      if (methodId === "qr") {
        setShowQRCode(true)
      } else if (methodId === "bank") {
        setShowBankTransfer(true)
      } else {
        // For other payment methods, just complete the payment
        onPaymentComplete()
        onClose()
      }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const banks = [
    { name: "First Bank", code: "011" },
    { name: "GTBank", code: "058" },
    { name: "Access Bank", code: "044" },
    { name: "Zenith Bank", code: "057" },
    { name: "UBA", code: "033" },
    { name: "Wema Bank", code: "035" },
    { name: "Sterling Bank", code: "232" },
    { name: "Fidelity Bank", code: "070" },
  ]

  const handleBankChange = (value: string) => {
    setSelectedBank(value)
  }

  const handleCompletePayment = () => {
    onPaymentComplete()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="w-full max-w-none">
      <DialogContent className="max-w-full w-screen h-screen max-h-screen p-0 rounded-none">
        <div className="flex h-full">
          {/* Left side - Payment methods */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-2xl">Select Payment Method</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedMethod === method.id ? "border-[#635bff] bg-[#635bff]/10" : "hover:border-gray-400"
                  }`}
                  onClick={() => handleMethodSelect(method.id)}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div
                      className={`p-4 rounded-full ${
                        selectedMethod === method.id ? "bg-[#635bff]/20 text-[#635bff]" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {method.icon}
                    </div>
                    <span className="text-lg font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedMethod === "bank" && (
              <div className="space-y-6 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Bank</label>
                  <Select value={selectedBank} onValueChange={handleBankChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedBank && (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Virtual Account Number</label>
                      <div className="flex items-center justify-between border rounded-md p-3 bg-gray-50">
                        {isLoading ? (
                          <div className="w-full flex justify-center">
                            <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
                          </div>
                        ) : (
                          <>
                            <span className="text-lg font-mono">{accountNumber}</span>
                            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
                              {copied ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-green-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                                  />
                                </svg>
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {isLoading
                          ? "Loading account details..."
                          : `${banks.find((b) => b.code === selectedBank)?.name}`}
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                      <p className="text-sm text-yellow-800">
                        Please make a transfer to the account number above. The payment will be automatically verified
                        once received.
                      </p>
                    </div>

                    <Button
                      className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                      onClick={handleCompletePayment}
                    >
                      Complete Payment
                    </Button>
                  </>
                )}
              </div>
            )}

            {selectedMethod === "cash" && (
              <div className="mt-8 text-center">
                <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
                  <p className="text-lg text-green-800 font-medium">
                    Please collect ₦{amount.toLocaleString()} from the customer
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full py-6 text-lg bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handleCompletePayment}
                >
                  Complete Cash Payment
                </Button>
              </div>
            )}

            {selectedMethod === "card" && (
              <div className="mt-8 text-center">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-6">
                  <p className="text-lg text-blue-800 font-medium">
                    Please insert or tap the customer's card on the POS terminal
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full py-6 text-lg bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handleCompletePayment}
                >
                  Complete Card Payment
                </Button>
              </div>
            )}
          </div>

          {/* Right side - QR Code */}
          <div className="w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
            {selectedMethod === "qr" ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Scanner animation */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-70 z-10"
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />

                  {/* QR Code */}
                  <div className="p-8 bg-white rounded-lg shadow-lg">
                    <QRCodeSVG value={`oranjpay:payment:${amount}:${Date.now()}`} size={300} />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-lg mb-2">Amount</p>
                  <p className="text-4xl font-bold">₦{amount.toLocaleString()}</p>
                </div>

                <Button
                  size="lg"
                  className="mt-8 py-6 px-8 text-lg bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handleCompletePayment}
                >
                  Complete Payment
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="mb-4">
                  <Smartphone className="h-24 w-24 mx-auto opacity-20" />
                </div>
                <p className="text-xl">Select QR Code payment to display the code</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
