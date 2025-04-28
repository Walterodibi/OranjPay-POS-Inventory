"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  total: number
}

export function PaymentModal({ isOpen, onClose, onComplete }: PaymentModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    // In a real app, we would handle different payment flows here
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 border-0 bg-transparent shadow-none">
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Tap to pay */}
          <div
            className="bg-white rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOptionSelect("tap")}
          >
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 12C18 10.8954 18.8954 10 20 10H28C29.1046 10 30 10.8954 30 12V36C30 37.1046 29.1046 38 28 38H20C18.8954 38 18 37.1046 18 36V12Z"
                  stroke="black"
                  strokeWidth="2"
                />
                <path d="M33 18C35.5 20.5 35.5 27.5 33 30" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M36 15C40 19 40 29 36 33" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-xl font-medium">Tap to pay</div>
          </div>

          {/* Card Entry */}
          <div
            className="bg-blue-50 rounded-3xl border-2 border-blue-500 p-8 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleOptionSelect("card")}
          >
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="14" width="24" height="18" rx="2" stroke="black" strokeWidth="2" />
                <path d="M10 20H34" stroke="black" strokeWidth="2" />
                <circle cx="14" cy="26" r="1" fill="black" />
                <path
                  d="M34 24L38 20M38 20L34 16M38 20H30"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-xl font-medium">Card Entry</div>
          </div>

          {/* Payment Links & QR code */}
          <div
            className="bg-white rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOptionSelect("qr")}
          >
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="12" width="8" height="8" stroke="black" strokeWidth="2" />
                <rect x="12" y="28" width="8" height="8" stroke="black" strokeWidth="2" />
                <rect x="28" y="12" width="8" height="8" stroke="black" strokeWidth="2" />
                <path d="M20 16H28" stroke="black" strokeWidth="2" />
                <path d="M16 20V28" stroke="black" strokeWidth="2" />
                <path d="M32 20V28" stroke="black" strokeWidth="2" />
                <path d="M20 32H28" stroke="black" strokeWidth="2" />
                <path d="M28 28H32" stroke="black" strokeWidth="2" />
                <path d="M28 32V36" stroke="black" strokeWidth="2" />
                <path d="M32 36H36" stroke="black" strokeWidth="2" />
                <path d="M36 32V36" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-xl font-medium text-center">Payment Links & QR code</div>
          </div>

          {/* Card Reader */}
          <div
            className="bg-white rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleOptionSelect("reader")}
          >
            <div className="mb-6">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="16" width="28" height="16" rx="2" stroke="black" strokeWidth="2" />
                <path d="M33 22C35.5 24.5 35.5 27.5 33 30" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-xl font-medium">Card Reader</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
