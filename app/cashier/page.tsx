"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Minus,
  Plus,
  Search,
  Trash2,
  ShoppingCart,
  Menu,
  LogOut,
  Settings,
  BarChart4,
  RotateCcw,
  CreditCard,
  Calendar,
  ListOrdered,
  Signal,
  X,
  Pause,
  ChevronDown,
  Tag,
  Truck,
  Award,
  User,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { PaymentModal } from "@/components/cashier/payment-modal"
import { ReceiptModal } from "@/components/cashier/receipt-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

  useEffect(() => {
    setMounted(true)

    // Initialize search query from URL
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Update URL when search query changes
  useEffect(() => {
    if (mounted) {
      const params = new URLSearchParams(window.location.search)
      if (searchQuery) {
        params.set("q", searchQuery)
      } else {
        params.delete("q")
      }

      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
      window.history.replaceState({}, "", newUrl)
    }
  }, [searchQuery, mounted])

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
  const total = subtotal + deliveryFee - discount - loyaltyPoints

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

    // Open the appropriate modal directly
    if (methodId === "qr") {
      setIsQrModalOpen(true)
    } else if (methodId === "bank") {
      setIsBankTransferOpen(true)
    } else {
      // For other payment methods, just complete the payment
      handlePaymentComplete()
    }

    setIsPaymentModalOpen(false)
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

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-[#635bff] text-[#2bcdb8] p-3 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-4 px-3 py-1 rounded-full bg-[#042f2e] text-[#2bcdb8] text-sm">{shopName}</div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-10 bg-white border-white text-black placeholder:text-gray-500 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white text-black border-white hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  John Doe
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="bg-white text-black border-white hover:bg-gray-100"
              onClick={() => setIsHeldOrdersOpen(true)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Held Orders ({heldOrders.length})
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
        <div className="w-2/3 flex flex-col h-full">
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

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                onClick={() => addToCart(product)}
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                <CardContent className="p-3 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="font-bold text-sm text-[#635bff]">₦{product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
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
                      <span
                        className="text-sm w-8 text-center cursor-text border border-transparent hover:border-gray-200 rounded px-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          const qty = cart.find((item) => item.id === product.id)?.quantity || 0
                          startEditingQuantity(product.id, qty)
                        }}
                      >
                        {cart.find((item) => item.id === product.id)?.quantity || 0}
                      </span>
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
                        <p className="text-sm text-[#635bff]">
                          ₦{item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.id)}>
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
                        <span
                          className="w-8 text-center cursor-text border border-transparent hover:border-gray-200 rounded px-1"
                          onClick={() => startEditingQuantity(item.id, item.quantity)}
                        >
                          {item.quantity}
                        </span>
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
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t bg-white">
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
                  <span>VAT (0%):</span>
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

              <div className="flex space-x-2 mb-3">
                <Button variant="outline" size="sm" className="flex-1 h-8" onClick={() => setIsLoyaltyDialogOpen(true)}>
                  <Award className="h-3.5 w-3.5 mr-1" />
                  Loyalty
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8"
                  onClick={() => setIsDiscountDialogOpen(true)}
                >
                  <Tag className="h-3.5 w-3.5 mr-1" />
                  Discount
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8"
                  onClick={() => setIsDeliveryDialogOpen(true)}
                >
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
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={total}
        onPaymentComplete={handlePaymentComplete}
        onMethodSelect={handlePaymentMethodSelect}
      />

      {/* Receipt Modal */}
      <ReceiptModal isOpen={isReceiptModalOpen} onClose={handleReceiptClose} cartItems={cart} total={total} />

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
                    <div className="mt-2 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 relative mr-2">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <p>
                              {item.name} x {item.quantity}
                            </p>
                          </div>
                          <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 font-bold">Total: ₦{order.total.toLocaleString()}</div>
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

      {/* Main Menu Sheet */}
      <Sheet open={isMainMenuOpen} onOpenChange={setIsMainMenuOpen}>
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="flex items-center mb-4">
              <Signal className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-green-500">System Online</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 text-sm"
                onClick={() => {
                  setIsMainMenuOpen(false)
                  setIsHeldOrdersOpen(true)
                }}
              >
                <ShoppingCart className="h-6 w-6 mb-2 text-purple-600" />
                <span>Pending Checkout</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <ListOrdered className="h-6 w-6 mb-2 text-blue-600" />
                <span>Section Order</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <BarChart4 className="h-6 w-6 mb-2 text-green-600" />
                <span>Sales</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <Calendar className="h-6 w-6 mb-2 text-amber-600" />
                <span>End of Day</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <CreditCard className="h-6 w-6 mb-2 text-indigo-600" />
                <span>Payments</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <RotateCcw className="h-6 w-6 mb-2 text-rose-600" />
                <span>Returns</span>
              </Button>

              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-sm">
                <Settings className="h-6 w-6 mb-2 text-teal-600" />
                <span>Settings</span>
              </Button>
            </div>

            <Button
              variant="ghost"
              className="mt-auto text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Discount Dialog */}
      <Dialog open={isDiscountDialogOpen} onOpenChange={setIsDiscountDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
            <DialogDescription>Enter the discount amount to apply to this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="discount" className="text-right">
                Amount (₦)
              </label>
              <Input
                id="discount"
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDiscountDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyDiscount}>Apply Discount</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Dialog */}
      <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Delivery Fee</DialogTitle>
            <DialogDescription>Enter the delivery fee for this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="delivery" className="text-right">
                Amount (₦)
              </label>
              <Input
                id="delivery"
                type="number"
                value={deliveryValue}
                onChange={(e) => setDeliveryValue(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeliveryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyDeliveryFee}>Add Delivery Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loyalty Dialog */}
      <Dialog open={isLoyaltyDialogOpen} onOpenChange={setIsLoyaltyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply Loyalty Points</DialogTitle>
            <DialogDescription>Enter the loyalty points value to apply to this order.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="loyalty" className="text-right">
                Amount (₦)
              </label>
              <Input
                id="loyalty"
                type="number"
                value={loyaltyValue}
                onChange={(e) => setLoyaltyValue(e.target.value)}
                className="col-span-3"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoyaltyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyLoyaltyPoints}>Apply Points</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
