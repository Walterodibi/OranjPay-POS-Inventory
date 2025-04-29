"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"

interface QRCodeDisplayProps {
  value: string
  size?: number
  amount?: number
}

export function QRCodeDisplay({ value, size = 300, amount = 0 }: QRCodeDisplayProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
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
          <QRCodeSVG value={value} size={size} />
        </div>
      </div>

      {amount > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-lg mb-2">Amount</p>
          <p className="text-4xl font-bold">₦{amount.toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
