"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CreditCard, LogOut, Minus, Plus, Receipt, Search, ShoppingCart, Trash } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentModal } from "@/components/cashier/payment-modal"
import { ReceiptModal } from "@/components/cashier/receipt-modal"

// Mock product data
const productCategories = [
  {
    id: 1,
    name: "Electronics",
    products: [
      { id: 101, name: "Wireless Earbuds", price: 89.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 102, name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 103, name: "Bluetooth Speaker", price: 59.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 104, name: "Power Bank", price: 49.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 105, name: "USB-C Cable", price: 12.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 106, name: "Wireless Charger", price: 29.99, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    products: [
      { id: 201, name: "Organic Cotton T-Shirt", price: 24.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 202, name: "Denim Jeans", price: 59.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 203, name: "Hooded Sweatshirt", price: 39.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 204, name: "Wool Socks (3-Pack)", price: 14.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 205, name: "Baseball Cap", price: 19.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 206, name: "Leather Belt", price: 29.99, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 3,
    name: "Accessories",
    products: [
      { id: 301, name: "Leather Wallet", price: 34.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 302, name: "Sunglasses", price: 79.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 303, name: "Backpack", price: 49.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 304, name: "Water Bottle", price: 19.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 305, name: "Keychain", price: 9.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 306, name: "Phone Case", price: 24.99, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: 4,
    name: "Home",
    products: [
      { id: 401, name: "Scented Candle", price: 16.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 402, name: "Throw Pillow", price: 24.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 403, name: "Coffee Mug", price: 12.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 404, name: "Picture Frame", price: 19.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 405, name: "Plant Pot", price: 14.99, image: "/placeholder.svg?height=80&width=80" },
      { id: 406, name: "Desk Lamp", price: 39.99, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
]

// Cart item type
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CashierPage() {
  const { user, logout } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Set the first category as selected by default
    if (productCategories.length > 0) {
      setSelectedCategory(productCategories[0].id)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  // Filter products based on search query
  const filteredProducts = productCategories.flatMap((category) =>
    category.products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  // Add item to cart
  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
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
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false)
    setIsReceiptModalOpen(true)
  }

  // Handle receipt close and start new transaction
  const handleReceiptClose = () => {
    setIsReceiptModalOpen(false)
    clearCart()
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/OranjPay-Black.png" alt="OranjPay" width={130} height={30} className="dark:hidden" />
            <Image
              src="/images/OranjPay-White.png"
              alt="OranjPay"
              width={130}
              height={30}
              className="hidden dark:block"
            />
          </Link>
          <Badge variant="outline" className="hidden md:inline-flex">
            Cashier Mode
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Products Section */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Point of Sale</h1>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery ? (
            // Search results
            <div>
              <h2 className="mb-4 text-lg font-medium">Search Results</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="aspect-square w-full overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="sm"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Categories and products
            <Tabs
              defaultValue={productCategories[0]?.id.toString()}
              value={selectedCategory?.toString()}
              onValueChange={(value) => setSelectedCategory(Number.parseInt(value))}
            >
              <TabsList className="mb-6 w-full justify-start">
                {productCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id.toString()}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {productCategories.map((category) => (
                <TabsContent key={category.id} value={category.id.toString()}>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {category.products.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                          <div className="aspect-square w-full overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="p-3">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="p-3 pt-0">
                          <Button
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            size="sm"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>

        {/* Cart Section */}
        <div className="w-full max-w-md border-l">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={clearCart}
                  disabled={cart.length === 0}
                >
                  <Trash className="mr-1 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <ShoppingCart className="mb-2 h-12 w-12" />
                  <h3 className="text-lg font-medium">Your cart is empty</h3>
                  <p className="text-sm">Add products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-16 w-16 overflow-hidden rounded-md border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <div className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t p-4">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={cart.length === 0}
                  onClick={() => {}}
                >
                  <Receipt className="h-4 w-4" />
                  <span>Hold</span>
                </Button>
                <Button
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                  disabled={cart.length === 0}
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Pay</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onComplete={handlePaymentComplete}
        total={total}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={handleReceiptClose}
        cart={cart}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
    </div>
  )
}
