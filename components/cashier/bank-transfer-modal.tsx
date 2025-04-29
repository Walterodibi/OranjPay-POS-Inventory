"use client"

import { useState, useEffect } from "react"
import { Check, Copy, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BankTransferModalProps {
  isOpen: boolean
  onClose: () => void
  amount?: number
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

export function BankTransferModal({ isOpen, onClose, amount = 0 }: BankTransferModalProps) {
  const [selectedBank, setSelectedBank] = useState(banks[0])
  const [accountNumber, setAccountNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  // Generate a random account number when the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setVerifying(false)
      setVerified(false)

      // Simulate loading the virtual account number
      const timer = setTimeout(() => {
        setAccountNumber(
          "9" +
            Math.floor(Math.random() * 1000000000)
              .toString()
              .padStart(9, "0"),
        )
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, selectedBank])

  const handleBankChange = (value: string) => {
    const bank = banks.find((b) => b.code === value) || banks[0]
    setSelectedBank(bank)
    setIsLoading(true)

    // Simulate loading the virtual account number for the new bank
    setTimeout(() => {
      setAccountNumber(
        "9" +
          Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(9, "0"),
      )
      setIsLoading(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const verifyPayment = () => {
    setVerifying(true)

    // Simulate payment verification
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)

      // Close modal after verification
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="w-full max-w-none">
      <DialogContent className="max-w-full w-screen h-screen max-h-screen p-0 rounded-none">
        <div className="flex h-full">
          {/* Left side - Bank selection */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-2xl">Bank Transfer Payment</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Bank</label>
                <Select value={selectedBank.code} onValueChange={handleBankChange}>
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
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {isLoading ? "Loading account details..." : `${selectedBank.name}`}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amount to Pay</label>
                <div className="border rounded-md p-3 bg-gray-50">
                  <span className="text-lg font-bold">₦{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  Please make a transfer to the account number above. The payment will be automatically verified once
                  received.
                </p>
              </div>

              <Button
                className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                onClick={verifyPayment}
                disabled={isLoading || verifying || verified}
              >
                {verifying ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying Payment...
                  </>
                ) : verified ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Payment Verified!
                  </>
                ) : (
                  "Check Payment Status"
                )}
              </Button>
            </div>
          </div>

          {/* Right side - Instructions */}
          <div className="w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h3 className="text-2xl font-bold mb-6">How to Pay</h3>

              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-medium mb-2">Select Your Bank</h4>
                  <p className="text-gray-600 text-sm">Choose your bank from the dropdown menu on the left</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-medium mb-2">Copy Account Number</h4>
                  <p className="text-gray-600 text-sm">Copy the generated virtual account number</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-medium mb-2">Make Transfer</h4>
                  <p className="text-gray-600 text-sm">Transfer ₦{amount.toLocaleString()} to the account number</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-lg">4</span>
                  </div>
                  <h4 className="font-medium mb-2">Verify Payment</h4>
                  <p className="text-gray-600 text-sm">Click "Check Payment Status" to verify your payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
