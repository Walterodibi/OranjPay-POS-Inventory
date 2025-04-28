"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  X,
  CreditCard,
  QrCode,
  Banknote,
  ArrowLeft,
  CreditCardIcon as BankCard,
  BarChart,
  LogOut,
  Calendar,
  Menu,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { products } from "@/lib/mock-data"

// Product categories based on the mock data
const productCategories = [
  {
    id: 1,
    name: "Beverages",
    products: products.filter((p) => p.category === "Beverages"),
  },
  {
    id: 2,
    name: "Food",
    products: products.filter((p) => p.category === "Food"),
  },
  {
    id: 3,
    name: "Personal Care",
    products: products.filter((p) => p.category === "Personal Care"),
  },
  {
    id: 4,
    name: "Alcohol",
    products: products.filter((p) => p.category === "Alcohol"),
  },
]

// Cart item type
interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  sku?: string
}

interface PendingOrder {
  id: string
  items: CartItem[]
  total: number
  timestamp: Date
}

export default function CashierPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mounted, setMounted] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [isPendingOrdersOpen, setIsPendingOrdersOpen] = useState(false)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false)
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = 0 // 0% VAT
  const serviceCharge = 0 // 0% Service Charge
  const total = subtotal + vat + serviceCharge

  // Add item to cart
  const addToCart = (product: { id: string; name: string; price: number; image: string; sku?: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Pend order
  const pendOrder = () => {
    if (cart.length === 0) return

    const newOrder: PendingOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      total: total,
      timestamp: new Date(),
    }

    setPendingOrders((prev) => [...prev, newOrder])
    clearCart()
  }

  // Load pending order
  const loadPendingOrder = (order: PendingOrder) => {
    setCart(order.items)
    setPendingOrders((prev) => prev.filter((o) => o.id !== order.id))
    setIsPendingOrdersOpen(false)
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen flex-col bg-[#6949FF]">
      {/* Header */}
      <header className="flex h-16 items-center justify-between px-4 text-white">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="flex items-center justify-center h-10 w-10 rounded-md bg-white/20">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 bg-[#F5A623] px-4 py-2 rounded-md">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-medium">Jazz Shop</span>
          </div>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search by Barcode Scanning or Product Name"
              className="pl-10 pr-16 py-2 h-10 rounded-md w-full bg-white text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 text-[#6949FF]"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="h-10 px-3 text-white relative"
            onClick={() => setIsPendingOrdersOpen(true)}
          >
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              {pendingOrders.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {pendingOrders.length}
                </span>
              )}
            </div>
            <span className="ml-2">Pending Checkouts</span>
          </Button>

          <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setIsMainMenuOpen(true)}>
            <Menu className="h-6 w-6 text-white" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-[#2D0C8A] px-4 py-2">
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger
              value="all"
              className={cn(
                "rounded-full px-4 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-[#6949FF]",
                "data-[state=inactive]:bg-transparent",
              )}
            >
              All categories
            </TabsTrigger>
            {productCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.name.toLowerCase()}
                className={cn(
                  "rounded-full px-4 py-1 text-white data-[state=active]:bg-white data-[state=active]:text-[#6949FF]",
                  "data-[state=inactive]:bg-transparent",
                )}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Products Section */}
        <div className="flex-1 bg-white p-4 overflow-auto">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-2">
                <option>All</option>
              </select>
              <select className="border rounded-md px-3 py-2">
                <option>Retail</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={cn("p-2", viewMode === "grid" ? "bg-gray-100" : "")}
                onClick={() => setViewMode("grid")}
              >
                <div className="grid grid-cols-2 gap-1 h-5 w-5">
                  <div className="bg-[#6949FF] rounded-sm"></div>
                  <div className="bg-[#6949FF] rounded-sm"></div>
                  <div className="bg-[#6949FF] rounded-sm"></div>
                  <div className="bg-[#6949FF] rounded-sm"></div>
                </div>
              </Button>
              <Button
                variant="outline"
                className={cn("p-2", viewMode === "list" ? "bg-gray-100" : "")}
                onClick={() => setViewMode("list")}
              >
                <div className="flex flex-col gap-1 h-5 w-5">
                  <div className="h-1 w-full bg-[#6949FF] rounded-sm"></div>
                  <div className="h-1 w-full bg-[#6949FF] rounded-sm"></div>
                  <div className="h-1 w-full bg-[#6949FF] rounded-sm"></div>
                </div>
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-md overflow-hidden cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-gray-500">Single Product</div>
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">{product.id}</div>
                      <div className="text-[#6949FF] font-medium">NGN {product.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-md p-3 flex items-center gap-4 cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="h-16 w-16 relative rounded overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="text-xs text-gray-500">Single Product</div>
                  </div>
                  <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">{product.id}</div>
                  <div className="text-[#6949FF] font-medium">NGN {product.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="w-full max-w-md bg-white border-l">
          <div className="flex flex-col h-full">
            {cart.length > 0 ? (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-auto p-4">
                  {cart.map((item) => (
                    <div key={item.id} className="mb-4 border-b pb-4">
                      <div className="flex items-start gap-3">
                        <div className="h-16 w-16 relative rounded overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-[#6949FF] font-medium">NGN {item.price.toLocaleString()}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>NGN {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (0%)</span>
                      <span>NGN 0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Charge (0%)</span>
                      <span>NGN 0.00</span>
                    </div>
                    <div className="flex justify-between text-[#6949FF] font-medium">
                      <span>Total</span>
                      <span>NGN {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <Button variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                      <Plus className="h-4 w-4 mr-1" /> Discount
                    </Button>
                  </div>

                  <Button
                    className="w-full mt-4 bg-[#6949FF] hover:bg-[#6949FF]/90 text-white py-6"
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Checkout {cart.length} item{cart.length !== 1 ? "s" : ""} (NGN {total.toLocaleString()})
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full mt-2 text-orange-500 border-orange-200"
                    onClick={pendOrder}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" /> Pend Order
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add products to get started with your order</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Selection Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">Select Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {/* QR Code Payment */}
            <div
              className="bg-purple-50 border border-purple-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => {
                setIsPaymentModalOpen(false)
                setIsQrModalOpen(true)
              }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <QrCode className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-center">QR Code Payment</h3>
            </div>

            {/* Bank Transfer */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <BankCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-center">Bank Transfer</h3>
            </div>

            {/* Card Payment */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-center">Card Payment</h3>
            </div>

            {/* Cash Payment */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-amber-100 transition-colors">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Banknote className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-center">Cash Payment</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Payment Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
          <div className="flex items-center justify-between bg-white p-4 border-b">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 h-8 w-8 p-0"
                onClick={() => {
                  setIsQrModalOpen(false)
                  setIsPaymentModalOpen(true)
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-lg font-semibold">QR Code Payment</DialogTitle>
            </div>
            <DialogClose className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:w-1/2 border-r">
              <h2 className="text-lg font-semibold mb-1">Select Your Bank</h2>
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

            <div className="p-6 md:w-1/2 flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-1">Scan QR Code</h2>
              <p className="text-sm text-gray-500 mb-4">Use your bank app to scan</p>

              <div className="border-2 border-indigo-500 rounded-lg p-2 mb-4">
                <div className="w-64 h-64 bg-white flex items-center justify-center">
                  <Image
                    src="https://zyntraqtech.com/wp-content/uploads/2025/03/NQR-DEMO-QR.jpg"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="text-indigo-700 font-semibold mb-6">Amount: ₦{total.toLocaleString()}</div>

              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md w-full">
                Complete Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pending Orders Side Menu */}
      <Sheet open={isPendingOrdersOpen} onOpenChange={setIsPendingOrdersOpen} side="right">
        <SheetContent className="w-[400px] sm:w-[540px] p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">Pending Orders</SheetTitle>
              <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center">
                <X className="h-4 w-4" />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="overflow-auto h-[calc(100vh-80px)]">
            {pendingOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No pending orders</h3>
                <p className="text-gray-500">Pend an order to see it here</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:border-[#6949FF] transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{order.id}</h3>
                      <span className="text-sm text-gray-500">
                        {order.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-sm text-gray-500">+{order.items.length - 2} more items</div>
                      )}
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total</span>
                      <span className="text-[#6949FF]">₦{order.total.toLocaleString()}</span>
                    </div>
                    <Button className="w-full mt-3 bg-[#6949FF]" onClick={() => loadPendingOrder(order)}>
                      Resume Order
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Menu Side Menu */}
      <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen} side="right">
        <SheetContent className="w-[300px] p-0">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
              <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center">
                <X className="h-4 w-4" />
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="p-4 space-y-4">
            <div
              className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => {
                setIsMainMenuOpen(false)
                setIsPendingOrdersOpen(true)
              }}
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Pending Orders</h3>
                <p className="text-xs text-gray-500">View and manage pending orders</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Sales</h3>
                <p className="text-xs text-gray-500">View sales reports and analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">End of Day</h3>
                <p className="text-xs text-gray-500">Close the day and generate reports</p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
              onClick={handleLogout}
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Logout</h3>
                <p className="text-xs text-gray-500">Sign out of your account</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
