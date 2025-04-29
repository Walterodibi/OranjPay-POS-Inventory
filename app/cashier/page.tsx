"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Menu,
  LogOut,
  Settings,
  CreditCard,
  X,
  ChevronDown,
  User,
  Smartphone,
  Building,
  Banknote,
  MapPin,
  LayoutGrid,
  List,
  UserCircle,
  Home,
  FileText,
  HelpCircle,
  Bell,
  Trash2,
  Award,
  Tag,
  Truck,
  Pause,
  Signal,
  ListOrdered,
  BarChart4,
  Calendar,
  RotateCcw,
  Download,
  Printer,
  Share,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Combobox } from "@/components/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock product data
const products = [
  {
    id: 1,
    name: "Coca-Cola",
    price: 250,
    category: "Drinks",
    image: "/products/coca-cola.png",
    stock: 122,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 2,
    name: "Chivita Juice",
    price: 500,
    category: "Drinks",
    image: "/products/juice-chivita.png",
    stock: 85,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 3,
    name: "Beef Sausage",
    price: 1200,
    category: "Food",
    image: "/products/beef-sausage.png",
    stock: 37,
    type: "Product",
    saleType: "Wholesale",
  },
  {
    id: 4,
    name: "Whisky",
    price: 5000,
    category: "Alcohol",
    image: "/products/whisky.png",
    stock: 15,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 5,
    name: "Dettol Soap",
    price: 350,
    category: "Toiletries",
    image: "/products/dettol.png",
    stock: 200,
    type: "Product",
    saleType: "Wholesale",
  },
  {
    id: 6,
    name: "Nivea Lotion",
    price: 1800,
    category: "Cosmetics",
    image: "/products/nivea.png",
    stock: 42,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 7,
    name: "Joy Soap",
    price: 250,
    category: "Toiletries",
    image: "/products/joy-soap.png",
    stock: 150,
    type: "Product",
    saleType: "Retail",
  },
  {
    id: 8,
    name: "Delivery Service",
    price: 1000,
    category: "Services",
    image: "/diverse-delivery-network.png",
    stock: 999,
    type: "Service",
    saleType: "Retail",
  },
  {
    id: 9,
    name: "Gift Wrapping",
    price: 500,
    category: "Services",
    image: "/festive-gift-wrapping.png",
    stock: 999,
    type: "Service",
    saleType: "Retail",
  },
]

// Extract unique categories
const categories = ["All", ...new Set(products.map((product) => product.category))]

// Product types
const productTypes = [
  { label: "All", value: "all" },
  { label: "Products", value: "Product" },
  { label: "Services", value: "Service" },
]

// Sale types
const saleTypes = [
  { label: "All", value: "all" },
  { label: "Retail", value: "Retail" },
  { label: "Wholesale", value: "Wholesale" },
]

// Cart item type
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  sku?: string
}

interface HeldOrder {
  id: string
  items: CartItem[]
  total: number
  timestamp: Date
}

interface Order {
  id: string
  items: CartItem[]
  total: number
  timestamp: Date
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

interface Bank {
  name: string
  code: string
  logo: string
  ussd?: string
}

const banks: Bank[] = [
  { name: "First Bank", code: "011", logo: "/abstract-geometric-logo.png", ussd: "*894#" },
  { name: "GTBank", code: "058", logo: "/gtbank-logo-abstract.png", ussd: "*737#" },
  { name: "Access Bank", code: "044", logo: "/abstract-geometric-logo.png", ussd: "*901#" },
  { name: "Zenith Bank", code: "057", logo: "/abstract-geometric-logo.png", ussd: "*966#" },
  { name: "UBA", code: "033", logo: "/abstract-geometric-logo.png", ussd: "*919#" },
  { name: "Wema Bank", code: "035", logo: "/wema-bank-logo-abstract.png", ussd: "*945#" },
  {
    name: "Sterling Bank",
    code: "232",
    logo: "/sterling-bank-abstract.png",
    ussd: "*822#",
  },
  {
    name: "Fidelity Bank",
    code: "070",
    logo: "/stylized-financial-institution-logo.png",
    ussd: "*770#",
  },
]

export default function CashierPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, logout } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mounted, setMounted] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false)
  const [isHeldOrdersOpen, setIsHeldOrdersOpen] = useState(false)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)
  const [heldOrders, setHeldOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<HeldOrder | null>(null)
  const [virtualAccount, setVirtualAccount] = useState<string>("")
  const [loadingVirtualAccount, setLoadingVirtualAccount] = useState(false)
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [verifyingPayment, setVerifyingPayment] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [shopName, setShopName] = useState("OranjPay Demo Store")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [editingQuantity, setEditingQuantity] = useState<number | null>(null)
  const [quantityValue, setQuantityValue] = useState<string>("")
  const [discount, setDiscount] = useState(0)
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false)
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
  const [isLoyaltyDialogOpen, setIsLoyaltyDialogOpen] = useState(false)
  const [discountValue, setDiscountValue] = useState("")
  const [deliveryValue, setDeliveryValue] = useState("")
  const [loyaltyValue, setLoyaltyValue] = useState("")
  const [selectedQrBank, setSelectedQrBank] = useState<string>(banks[0].code)
  const [selectedProductType, setSelectedProductType] = useState("all")
  const [selectedSaleType, setSelectedSaleType] = useState("all")
  const [isPrinting, setPrinting] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null)

  const paymentMethods: PaymentMethod[] = [
    {
      id: "qr",
      name: "QR Code",
      icon: <Smartphone className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "card",
      name: "Card Payment",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Building className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "cash",
      name: "Cash",
      icon: <Banknote className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate virtual account when bank transfer modal opens
  useEffect(() => {
    if (isBankTransferOpen) {
      setLoadingVirtualAccount(true)
      setVirtualAccount("")
      setSelectedBank(banks[0].code)
      setVerifyingPayment(false)
      setPaymentVerified(false)

      // Simulate loading virtual account
      const timer = setTimeout(() => {
        setVirtualAccount(
          "9" +
            Math.floor(Math.random() * 1000000000)
              .toString()
              .padStart(9, "0"),
        )
        setLoadingVirtualAccount(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isBankTransferOpen])

  // Simulate payment verification
  useEffect(() => {
    if (verifyingPayment) {
      const timer = setTimeout(() => {
        setPaymentVerified(true)
        setVerifyingPayment(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [verifyingPayment])

  if (!mounted) {
    return null
  }

  // Filter products based on category, search query, product type, and sale type
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProductType = selectedProductType === "all" || product.type === selectedProductType
    const matchesSaleType = selectedSaleType === "all" || product.saleType === selectedSaleType
    return matchesCategory && matchesSearch && matchesProductType && matchesSaleType
  })

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = subtotal * 0.08 // 8% VAT
  const serviceCharge = 0 // 0% Service Charge
  const total = subtotal + vat + deliveryFee - discount - loyaltyPoints

  // Add item to cart
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== productId)
      }
    })
  }

  // Delete product from cart
  const deleteFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    setDiscount(0)
    setDeliveryFee(0)
    setLoyaltyPoints(0)
  }

  // Hold order
  const holdOrder = () => {
    if (cart.length === 0) return

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: cartTotal,
      timestamp: new Date(),
    }

    setHeldOrders((prev) => [...prev, newOrder])
    clearCart()
  }

  // Restore a held order
  const restoreOrder = (order: Order) => {
    setCart(order.items)
    setHeldOrders((prev) => prev.filter((o) => o.id !== order.id))
    setIsHeldOrdersOpen(false)
  }

  const cancelOrder = (orderId: string) => {
    setOrderToCancel(orderId)
    setIsConfirmCancelOpen(true)
  }

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      setHeldOrders((prev) => prev.filter((o) => o.id !== orderToCancel))
      setOrderToCancel(null)
    }
    setIsConfirmCancelOpen(false)
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Handle navigation
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
    setIsPaymentModalOpen(false)

    // Open the appropriate modal directly
    if (methodId === "qr") {
      setIsQrModalOpen(true)
    } else if (methodId === "bank") {
      setIsBankTransferOpen(true)
    } else if (methodId === "cash" || methodId === "card") {
      // For cash and card payment methods, just complete the payment
      handlePaymentComplete()
    }
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsQrModalOpen(false)
    setIsBankTransferOpen(false)
    setIsReceiptModalOpen(true)
  }

  // Handle receipt close
  const handleReceiptClose = () => {
    setIsReceiptModalOpen(false)
    clearCart()
  }

  // Handle quantity input change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setQuantityValue(value)
    }
  }

  // Handle quantity input blur
  const handleQuantityBlur = (id: number) => {
    if (quantityValue !== "") {
      const newQuantity = Number.parseInt(quantityValue)
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      }
    }
    setEditingQuantity(null)
    setQuantityValue("")
  }

  // Start editing quantity
  const startEditingQuantity = (id: number, currentQty: number) => {
    setEditingQuantity(id)
    setQuantityValue(currentQty.toString())
  }

  // Apply discount
  const applyDiscount = () => {
    if (discountValue) {
      setDiscount(Number(discountValue))
    }
    setIsDiscountDialogOpen(false)
  }

  // Apply delivery fee
  const applyDeliveryFee = () => {
    if (deliveryValue) {
      setDeliveryFee(Number(deliveryValue))
    }
    setIsDeliveryDialogOpen(false)
  }

  // Apply loyalty points
  const applyLoyaltyPoints = () => {
    if (loyaltyValue) {
      setLoyaltyPoints(Number(loyaltyValue))
    }
    setIsLoyaltyDialogOpen(false)
  }

  // Calculate cart total
  const cartTotal = subtotal + vat + deliveryFee - discount - loyaltyPoints

  // Copy account number to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle print receipt
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

  // Generate receipt number
  const receiptNumber = `R-${Math.floor(100000 + Math.random() * 900000)}`
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  return (
    <div className="flex flex-col h-screen">
      {/* Header with contour background */}
      <header className="relative bg-[#635bff] text-[#2bcdb8] p-3 shadow-md overflow-hidden">
        {/* Contour background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
            <defs>
              <pattern id="contourPattern" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M0,30 Q25,80 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contourPattern)" />
          </svg>
        </div>

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <div className="mr-4 px-3 py-1 rounded-full bg-[#042f2e] text-[#2bcdb8] text-sm flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              {shopName}
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                ref={searchInputRef}
                placeholder="Search products..."
                className="pl-10 pr-10 bg-white border-white text-black placeholder:text-gray-500 w-[600px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-[#635bff]/80 hover:text-gray-100">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span className="truncate max-w-[100px]">Cashier: John</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center p-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@oranjpay.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/reports")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Reports</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 relative"
              onClick={() => setIsHeldOrdersOpen(true)}
            >
              <Pause className="mr-2 h-4 w-4" />
              Held Orders
              {heldOrders.length > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 relative">
                  <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></span>
                  <span className="relative">{heldOrders.length}</span>
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100 h-10 w-10 p-0"
              onClick={() => setIsMainMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Products Section */}
        <div className="w-3/4 flex flex-col h-full">
          {/* Categories */}
          <div className="p-2 border-b flex overflow-x-auto space-x-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-[#635bff] hover:bg-[#635bff]/90 text-white text-xs py-1 px-3 h-auto"
                    : "text-black border-gray-300 hover:bg-gray-100 hover:text-black text-xs py-1 px-3 h-auto"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Filter options */}
          <div className="p-2 border-b flex justify-between items-center">
            <div className="flex space-x-2">
              <Combobox
                options={productTypes}
                value={selectedProductType}
                onChange={setSelectedProductType}
                placeholder="Product Type"
                className="w-40"
              />
              <Select value={selectedSaleType} onValueChange={setSelectedSaleType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sale Type" />
                </SelectTrigger>
                <SelectContent>
                  {saleTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="h-9 w-9 p-0"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={
              viewMode === "grid"
                ? "flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                : "flex-1 overflow-y-auto p-4 flex flex-col space-y-2"
            }
          >
            {filteredProducts.map((product) =>
              viewMode === "grid" ? (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden flex flex-col h-auto"
                  onClick={() => addToCart(product)}
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="absolute top-1 left-1 bg-[#efefef] rounded-lg text-[#696677] px-2 py-0.5 text-xs">
                      {product.type}
                    </div>
                    <div className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-green-600 text-white text-xs">
                      {product.stock}
                    </div>
                  </div>
                  <CardContent className="p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="font-bold text-sm text-[#635bff]">₦{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          const existingItem = cart.find((item) => item.id === product.id)
                          if (existingItem && existingItem.quantity > 1) {
                            e.preventDefault()
                            updateQuantity(product.id, existingItem.quantity - 1)
                          } else if (existingItem) {
                            e.preventDefault()
                            deleteFromCart(product.id)
                          }
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      {editingQuantity === product.id ? (
                        <input
                          type="text"
                          className="w-8 text-center border rounded"
                          value={quantityValue}
                          onChange={handleQuantityChange}
                          onBlur={() => handleQuantityBlur(product.id)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-8 text-center border border-gray-200 rounded"
                          value={cart.find((item) => item.id === product.id)?.quantity || 0}
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            const qty = cart.find((item) => item.id === product.id)?.quantity || 0
                            startEditingQuantity(product.id, qty)
                          }}
                          readOnly
                        />
                      )}

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div
                  key={product.id}
                  className="flex items-center bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  <div className="relative h-16 w-16 mr-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="absolute top-0 left-0 bg-[#efefef] rounded-lg text-[#696677] px-2 py-0.5 text-xs m-1">
                      {product.type}
                    </div>
                    <div className="absolute bottom-0 left-0 px-1.5 py-0.5 rounded-tr-md bg-green-600 text-white text-xs">
                      {product.stock}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="font-bold text-[#635bff]">₦{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            const existingItem = cart.find((item) => item.id === product.id)
                            if (existingItem && existingItem.quantity > 1) {
                              e.preventDefault()
                              updateQuantity(product.id, existingItem.quantity - 1)
                            } else if (existingItem) {
                              e.preventDefault()
                              deleteFromCart(product.id)
                            }
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        {editingQuantity === product.id ? (
                          <input
                            type="text"
                            className="w-8 text-center border rounded"
                            value={quantityValue}
                            onChange={handleQuantityChange}
                            onBlur={() => handleQuantityBlur(product.id)}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-8 text-center border border-gray-200 rounded"
                            value={cart.find((item) => item.id === product.id)?.quantity || 0}
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              const qty = cart.find((item) => item.id === product.id)?.quantity || 0
                              startEditingQuantity(product.id, qty)
                            }}
                            readOnly
                          />
                        )}

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart(product)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-1/4 border-l flex flex-col h-full bg-gray-50">
          <div className="p-4 border-b bg-white flex justify-between items-center">
            <h2 className="text-lg font-bold">Current Order</h2>
            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={clearCart}
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 flex-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative mr-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-[#635bff]">
                            ₦{item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>

                        {editingQuantity === item.id ? (
                          <input
                            type="text"
                            className="w-8 text-center border rounded"
                            value={quantityValue}
                            onChange={handleQuantityChange}
                            onBlur={() => handleQuantityBlur(item.id)}
                            autoFocus
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-8 text-center border border-gray-200 rounded"
                            value={item.quantity}
                            onClick={() => startEditingQuantity(item.id, item.quantity)}
                            readOnly
                          />
                        )}

                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary - moved inside the scrollable area */}
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount:</span>
                      <span className="text-red-500">-₦{discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee:</span>
                      <span>₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>VAT (8%):</span>
                      <span>₦{vat.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Charge (0%):</span>
                      <span>₦{serviceCharge.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Loyalty Points:</span>
                      <span className="text-red-500">-₦{loyaltyPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2 mb-3">
              <Button variant="outline" size="sm" className="flex-1 h-8" onClick={() => setIsLoyaltyDialogOpen(true)}>
                <Award className="h-3.5 w-3.5 mr-1" />
                Loyalty
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-8" onClick={() => setIsDiscountDialogOpen(true)}>
                <Tag className="h-3.5 w-3.5 mr-1" />
                Discount
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-8" onClick={() => setIsDeliveryDialogOpen(true)}>
                <Truck className="h-3.5 w-3.5 mr-1" />
                Delivery
              </Button>
            </div>

            <div className="flex flex-col space-y-2">
              <Button
                className="w-full bg-[#635bff] text-white hover:bg-[#635bff]/90 text-lg py-7 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                <CreditCard className="mr-2 h-6 w-6" />
                Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={holdOrder}>
                <Pause className="mr-2 h-5 w-5" />
                Hold Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow ${method.color} cursor-pointer`}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  {method.icon}
                  <span className="mt-2 text-sm">{method.name}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen} className="w-full max-w-none">
        <DialogContent className="max-w-full w-screen h-screen max-h-screen p-0 rounded-none">
          <div className="flex h-full">
            {/* Left side - Bank selection */}
            <div className="w-1/2 p-6 flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">QR Code Payment</DialogTitle>
                <DialogDescription>Scan this QR code with your banking app to pay</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Bank</label>
                  <Select value={selectedQrBank} onValueChange={setSelectedQrBank}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-2">
                              <Image
                                src={bank.logo || "/placeholder.svg"}
                                alt={bank.name}
                                fill
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <span>{bank.name}</span>
                            {bank.ussd && <span className="ml-2 text-xs text-gray-500">{bank.ussd}</span>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    Open your banking app, scan the QR code, and confirm the payment. The payment will be automatically
                    verified once received.
                  </p>
                </div>

                <Button
                  className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handlePaymentComplete}
                >
                  Complete Payment
                </Button>
              </div>
            </div>

            {/* Right side - QR Code */}
            <div className="w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
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
                    <QRCodeSVG value={`oranjpay:payment:${total}:${Date.now()}`} size={300} />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-lg mb-2">Amount</p>
                  <p className="text-4xl font-bold">₦{total.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Transfer Modal */}
      <Dialog open={isBankTransferOpen} onOpenChange={setIsBankTransferOpen} className="w-full max-w-none">
        <DialogContent className="max-w-full w-screen h-screen max-h-screen p-0 rounded-none">
          <div className="flex h-full">
            {/* Left side - Bank selection */}
            <div className="w-1/2 p-6 flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">Bank Transfer Payment</DialogTitle>
                <DialogDescription>Transfer to this account to complete your payment</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Bank</label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          <div className="flex items-center">
                            <div className="w-6 h-6 relative mr-2">
                              <Image
                                src={bank.logo || "/placeholder.svg"}
                                alt={bank.name}
                                fill
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <span>{bank.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Virtual Account Number</label>
                  <div className="flex items-center justify-between border rounded-md p-5 bg-gray-50">
                    {loadingVirtualAccount ? (
                      <div className="w-full flex justify-center">
                        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl font-mono font-bold">{virtualAccount}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(virtualAccount)}
                          className="h-10 w-10 p-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                        </Button>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {loadingVirtualAccount
                      ? "Loading account details..."
                      : `Account Name: OranjPay Demo Store - ${banks.find((b) => b.code === selectedBank)?.name}`}
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    Please make a transfer of ₦{total.toLocaleString()} to the account number above. The payment will be
                    automatically verified once received.
                  </p>
                </div>

                <Button
                  className="w-full bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
                  onClick={handlePaymentComplete}
                >
                  Complete Payment
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
                    <p className="text-gray-600 text-sm">Transfer ₦{total.toLocaleString()} to the account number</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-[#635bff]/20 text-[#635bff] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="font-bold text-lg">4</span>
                    </div>
                    <h4 className="font-medium mb-2">Verify Payment</h4>
                    <p className="text-gray-600 text-sm">Click "Complete Payment" once you've made the transfer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Held Orders Sheet */}
      <Sheet open={isHeldOrdersOpen} onOpenChange={setIsHeldOrdersOpen}>
        <SheetContent className="sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Held Orders</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            {heldOrders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                <Pause className="h-10 w-10 mb-4" />
                <p>No held orders</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {heldOrders.map((order) => (
                  <div key={order.id} className="p-4 border-b bg-white rounded-lg shadow-sm mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <p className="text-gray-500 text-xs">
                          {order.timestamp.toLocaleDateString()} {order.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#635bff]">₦{order.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2 group relative">
                          {order.items.slice(0, 4).map((item, index) => (
                            <Avatar key={`${item.id}-${index}`} className="border-2 border-white">
                              <AvatarImage src={item.image || "/placeholder.svg"} alt={item.name} />
                              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {order.items.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white relative">
                              <span className="text-xs font-medium">+{order.items.length - 4}</span>
                              <div className="absolute invisible group-hover:visible bg-black text-white text-xs rounded p-2 w-48 -top-2 left-full z-50">
                                {order.items
                                  .slice(4)
                                  .map((item) => item.name)
                                  .join(", ")}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {order.items.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Button className="flex-1" onClick={() => restoreOrder(order)}>
                        Restore Order
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Menu Sheet */}
      <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
        <SheetContent className="sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex items-center mb-4">
              <Signal className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-500">System Online</span>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                variant="outline"
                className="flex items-center justify-start h-16 text-base px-4"
                onClick={() => {
                  setIsMainMenuOpen(false)
                  setIsHeldOrdersOpen(true)
                }}
              >
                <Pause className="h-10 w-10 mr-4 text-purple-600" />
                <span>Held Orders</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <ListOrdered className="h-10 w-10 mr-4 text-blue-600" />
                <span>Section Order</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <BarChart4 className="h-10 w-10 mr-4 text-green-600" />
                <span>Sales</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <Calendar className="h-10 w-10 mr-4 text-amber-600" />
                <span>End of Day</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <CreditCard className="h-10 w-10 mr-4 text-indigo-600" />
                <span>Payments</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <RotateCcw className="h-10 w-10 mr-4 text-rose-600" />
                <span>Returns</span>
              </Button>

              <Button variant="outline" className="flex items-center justify-start h-16 text-base px-4">
                <Settings className="h-10 w-10 mr-4 text-teal-600" />
                <span>Settings</span>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center justify-start h-16 text-base px-4 mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-10 w-10 mr-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Receipt Modal */}
      <Dialog open={isReceiptModalOpen} onOpenChange={(open) => !open && handleReceiptClose()}>
        <DialogContent className="sm:max-w-[425px] font-mono">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-center">Receipt</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleReceiptClose}>
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

              {cart && cart.length > 0 ? (
                cart.map((item) => (
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
                <span>₦{vat.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span>DISCOUNT</span>
                  <span>-₦{discount.toFixed(2)}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span>DELIVERY FEE</span>
                  <span>₦{deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {loyaltyPoints > 0 && (
                <div className="flex justify-between text-sm">
                  <span>LOYALTY POINTS</span>
                  <span>-₦{loyaltyPoints.toFixed(2)}</span>
                </div>
              )}
              <div className="dotted-line border-t border-dashed border-gray-400 my-1"></div>
              <div className="flex justify-between font-bold">
                <span>TOTAL</span>
                <span>₦{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="rounded-lg border border-dashed p-3 text-center">
              <p className="font-medium">PAYMENT METHOD</p>
              <p className="text-sm">{selectedPaymentMethod ? selectedPaymentMethod.toUpperCase() : "CASH"}</p>
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
              onClick={handleReceiptClose}
              className="bg-[#635bff] hover:bg-[#635bff]/90 shadow-[0_4px_14px_0_rgba(99,91,255,0.4)]"
            >
              New Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discount Dialog */}
      {isDiscountDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Apply Discount</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
              <Input
                type="number"
                placeholder="Enter discount amount"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={() => setIsDiscountDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="ml-2 bg-[#635bff] hover:bg-[#635bff]/90 text-white" onClick={applyDiscount}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Fee Dialog */}
      {isDeliveryDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Apply Delivery Fee</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Delivery Fee Amount</label>
              <Input
                type="number"
                placeholder="Enter delivery fee amount"
                value={deliveryValue}
                onChange={(e) => setDeliveryValue(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={() => setIsDeliveryDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="ml-2 bg-[#635bff] hover:bg-[#635bff]/90 text-white" onClick={applyDeliveryFee}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Points Dialog */}
      {isLoyaltyDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Apply Loyalty Points</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Loyalty Points Amount</label>
              <Input
                type="number"
                placeholder="Enter loyalty points amount"
                value={loyaltyValue}
                onChange={(e) => setLoyaltyValue(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="ghost" onClick={() => setIsLoyaltyDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="ml-2 bg-[#635bff] hover:bg-[#635bff]/90 text-white" onClick={applyLoyaltyPoints}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={isConfirmCancelOpen} onOpenChange={setIsConfirmCancelOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmCancelOpen(false)}>
              No, Keep Order
            </Button>
            <Button variant="destructive" onClick={confirmCancelOrder}>
              Yes, Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
