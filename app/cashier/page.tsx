"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, Search, Trash2, ShoppingCart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { ConnectivityStatus } from "@/components/connectivity-status"
import { Card, CardContent } from "@/components/ui/card"
import { PaymentModal } from "@/components/cashier/payment-modal"
import { ReceiptModal } from "@/components/cashier/receipt-modal"

// Mock product data
const products = [
  {
    id: 1,
    name: "Coca-Cola",
    price: 250,
    category: "Drinks",
    image: "/products/coca-cola.png",
  },
  {
    id: 2,
    name: "Chivita Juice",
    price: 500,
    category: "Drinks",
    image: "/products/juice-chivita.png",
  },
  {
    id: 3,
    name: "Beef Sausage",
    price: 1200,
    category: "Food",
    image: "/products/beef-sausage.png",
  },
  {
    id: 4,
    name: "Whisky",
    price: 5000,
    category: "Alcohol",
    image: "/products/whisky.png",
  },
  {
    id: 5,
    name: "Dettol Soap",
    price: 350,
    category: "Toiletries",
    image: "/products/dettol.png",
  },
  {
    id: 6,
    name: "Nivea Lotion",
    price: 1800,
    category: "Cosmetics",
    image: "/products/nivea.png",
  },
  {
    id: 7,
    name: "Joy Soap",
    price: 250,
    category: "Toiletries",
    image: "/products/joy-soap.png",
  },
]

// Extract unique categories
const categories = ["All", ...new Set(products.map((product) => product.category))]

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

export default function CashierPage() {
  const router = useRouter()
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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate virtual account when bank transfer modal opens
  useEffect(() => {
    if (isBankTransferOpen) {
      setLoadingVirtualAccount(true)
      setVirtualAccount("")
      setSelectedBank("")
      setVerifyingPayment(false)
      setPaymentVerified(false)

      // Simulate loading virtual account
      const timer = setTimeout(() => {
        setVirtualAccount("9102345678")
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

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = 0 // 0% VAT
  const serviceCharge = 0 // 0% Service Charge
  const total = subtotal + vat + serviceCharge

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

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
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(Number(id))
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === Number(id) ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItemFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== Number(id)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
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

  // Load held order
  const loadHeldOrder = (order: HeldOrder) => {
    setCart(order.items)
    setHeldOrders((prev) => prev.filter((o) => o.id !== order.id))
    setIsHeldOrdersOpen(false)
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

  // Copy virtual account number to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Verify payment
  const verifyPayment = () => {
    if (!selectedBank || !virtualAccount) return
    setVerifyingPayment(true)
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsReceiptModalOpen(true)
  }

  // Handle receipt close
  const handleReceiptClose = () => {
    setIsReceiptModalOpen(false)
    clearCart()
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Connectivity Status */}
      <ConnectivityStatus />

      {/* Header */}
      <header className="bg-[#042f2e] text-[#2bcdb8] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{shopName}</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-[#2bcdb8] border-[#2bcdb8] hover:bg-[#2bcdb8]/10"
              onClick={() => setIsHeldOrdersOpen(true)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Held Orders ({heldOrders.length})
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Products Section */}
        <div className="w-2/3 flex flex-col h-full">
          {/* Search and Categories */}
          <div className="p-4 border-b">
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={
                    selectedCategory === category
                      ? "bg-[#002663] hover:bg-[#002663]/90 text-white"
                      : "text-white border-white/20 hover:bg-white/10 hover:text-white"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addToCart(product)}
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 relative mb-2">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="font-medium text-center">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="font-bold mt-1">₦{product.price.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="w-1/3 border-l flex flex-col h-full bg-gray-50">
          <div className="p-4 border-b bg-white">
            <h2 className="text-lg font-bold">Current Order</h2>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
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
                        <p className="text-sm text-gray-500">
                          ₦{item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
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
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t bg-white">
              <div className="flex justify-between font-medium mb-2">
                <span>Subtotal:</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-[#002663] text-white hover:bg-[#002663]/90"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={cartTotal}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Receipt Modal */}
      <ReceiptModal isOpen={isReceiptModalOpen} onClose={handleReceiptClose} cartItems={cart} total={cartTotal} />

      {/* Held Orders Sheet */}
      <Sheet open={isHeldOrdersOpen} onOpenChange={setIsHeldOrdersOpen}>
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Held Orders</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            {heldOrders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                <ShoppingCart className="h-10 w-10 mb-4" />
                <p>No held orders</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {heldOrders.map((order) => (
                  <div key={order.id} className="p-4 border-b">
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-gray-500 text-sm">
                      {order.timestamp.toLocaleDateString()} {order.timestamp.toLocaleTimeString()}
                    </p>
                    <div className="mt-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <p>
                            {item.name} x {item.quantity}
                          </p>
                          <p>₦{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 font-bold">Total: ₦{order.total}</div>
                    <Button className="w-full mt-4" onClick={() => restoreOrder(order)}>
                      Restore Order
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
