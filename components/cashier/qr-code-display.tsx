"use client"

interface QrCodeDisplayProps {
  amount: number
}

export function QrCodeDisplay({ amount }: QrCodeDisplayProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-1">Select Your Bank</h2>
        <p className="text-sm text-gray-500 mb-4">Choose your bank to see scanning instructions</p>

        <div className="relative">
          <select className="w-full p-3 border rounded-md appearance-none pr-10">
            <option value="">Select bank...</option>
            <option value="gtb">GTBank</option>
            <option value="firstbank">First Bank</option>
            <option value="zenith">Zenith Bank</option>
            <option value="access">Access Bank</option>
            <option value="uba">UBA</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-1">Scan QR Code</h2>
        <p className="text-sm text-gray-500 mb-4">Use your bank app to scan</p>

        <div className="border-2 border-indigo-500 rounded-lg p-2 mb-4">
          <div className="w-64 h-64 bg-white flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="40" height="40" rx="10" stroke="#1F2937" strokeWidth="6" />
              <rect x="150" y="10" width="40" height="40" rx="10" stroke="#1F2937" strokeWidth="6" />
              <rect x="10" y="150" width="40" height="40" rx="10" stroke="#1F2937" strokeWidth="6" />
              <rect x="70" y="10" width="10" height="10" fill="#1F2937" />
              <rect x="90" y="10" width="10" height="10" fill="#1F2937" />
              <rect x="110" y="10" width="10" height="10" fill="#1F2937" />
              <rect x="130" y="10" width="10" height="10" fill="#1F2937" />
              <rect x="10" y="70" width="10" height="10" fill="#1F2937" />
              <rect x="10" y="90" width="10" height="10" fill="#1F2937" />
              <rect x="10" y="110" width="10" height="10" fill="#1F2937" />
              <rect x="10" y="130" width="10" height="10" fill="#1F2937" />
              <rect x="180" y="70" width="10" height="10" fill="#1F2937" />
              <rect x="180" y="90" width="10" height="10" fill="#1F2937" />
              <rect x="180" y="110" width="10" height="10" fill="#1F2937" />
              <rect x="180" y="130" width="10" height="10" fill="#1F2937" />
              <rect x="70" y="180" width="10" height="10" fill="#1F2937" />
              <rect x="90" y="180" width="10" height="10" fill="#1F2937" />
              <rect x="110" y="180" width="10" height="10" fill="#1F2937" />
              <rect x="130" y="180" width="10" height="10" fill="#1F2937" />
              <path d="M90 90H110V110H90V90Z" fill="#4CAF50" />
              <path d="M100 80L110 90H90L100 80Z" fill="#FFEB3B" />
              <path d="M110 100L120 110V90L110 100Z" fill="#FFEB3B" />
              <path d="M100 120L90 110H110L100 120Z" fill="#FFEB3B" />
              <path d="M90 100L80 90V110L90 100Z" fill="#FFEB3B" />
              <text x="100" y="105" textAnchor="middle" fill="#1F2937" fontWeight="bold" fontSize="12">
                NQR
              </text>
            </svg>
          </div>
        </div>

        <div className="text-indigo-700 font-semibold mb-6">Amount: ₦1,900.00</div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md w-full">
          Complete Payment
        </button>
      </div>
    </div>
  )
}
