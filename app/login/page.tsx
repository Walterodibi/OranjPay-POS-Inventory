"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LockKeyhole, AlertCircle, Loader2 } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Testimonial data
const testimonials = [
  {
    quote:
      "OranjPay has transformed how we handle payments. The system is intuitive, reliable, and has significantly improved our checkout efficiency.",
    author: "Sarah Johnson",
    role: "Retail Store Manager",
  },
  {
    quote:
      "Since implementing OranjPay, our transaction processing time has decreased by 40%. The analytics dashboard gives us valuable insights into our business performance.",
    author: "Michael Chen",
    role: "Restaurant Owner",
  },
  {
    quote:
      "The customer support team at OranjPay is exceptional. They helped us customize the system to our specific needs and are always available when we need assistance.",
    author: "Priya Sharma",
    role: "Boutique Manager",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { user, login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginInProgress, setLoginInProgress] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [adminLoading, setAdminLoading] = useState(false)
  const [cashierLoading, setCashierLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/cashier")
      }
    }
  }, [user, router])

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsAnimating(false)
      }, 500) // Half the interval for the animation
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError("")
    setLoginInProgress(true)

    try {
      const success = await login(email, password)

      if (!success) {
        setError("Invalid credentials. Try the demo accounts on the Demo Accounts tab.")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
      console.error("Login error:", error)
    } finally {
      setLoginInProgress(false)
    }
  }

  const handleDemoLogin = async (role: string) => {
    try {
      setError("")
      if (role === "admin") {
        setAdminLoading(true)
        await login("admin@oranjpay.com", "admin123")
      } else {
        setCashierLoading(true)
        await login("cashier@oranjpay.com", "cashier123")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
      console.error("Login error:", error)
    } finally {
      setAdminLoading(false)
      setCashierLoading(false)
    }
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-animation" />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/OranjPay-White.png" alt="OranjPay" width={150} height={35} />
          </Link>
        </div>

        {/* Testimonials stack */}
        <div className="relative z-20 mt-auto h-[220px] flex items-center justify-center">
          <div className="testimonial-stack w-full max-w-lg mx-auto">
            {testimonials.map((testimonial, index) => (
              <blockquote
                key={index}
                className={`testimonial-card backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 absolute w-full transition-all duration-700 ${
                  index === currentTestimonial
                    ? "opacity-100 translate-y-0 z-30 scale-100"
                    : index === (currentTestimonial + 1) % testimonials.length
                      ? "opacity-60 translate-y-4 z-20 scale-[0.97]"
                      : "opacity-30 translate-y-8 z-10 scale-[0.94]"
                } ${isAnimating ? "animate-testimonial-out" : ""}`}
              >
                <p className="text-lg">{testimonial.quote}</p>
                <footer className="text-sm mt-2 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500/50 mr-2 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <span className="font-medium">{testimonial.author}</span>
                    <span className="mx-1">•</span>
                    <span className="text-white/80">{testimonial.role}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Testimonial indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-white scale-125" : "bg-white/40"
                }`}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentTestimonial(index)
                    setIsAnimating(false)
                  }, 500)
                }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:p-8 relative">
        {/* Small animated gradient elements for the right side */}
        <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-gradient-animation opacity-10 blur-xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-gradient-animation opacity-10 blur-xl"></div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] relative z-10">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to access your account</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glassmorphism-light">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="glassmorphism-card border-0">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Account Login</CardTitle>
                    <CardDescription>Sign in to access your OranjPay dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="glassmorphism-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-purple-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="glassmorphism-input"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 glassmorphism-button"
                      disabled={loginInProgress || isLoading}
                    >
                      {loginInProgress ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="demo">
              <Card className="glassmorphism-card border-0">
                <CardHeader>
                  <CardTitle>Demo Accounts</CardTitle>
                  <CardDescription>Use these demo accounts to explore the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-white/20 p-3 glassmorphism-panel">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100/80 text-purple-600 backdrop-blur-sm">
                        <LockKeyhole size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Admin Account</h3>
                        <p className="text-xs text-muted-foreground">Full access to all features</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Email:</span> admin@oranjpay.com
                      </div>
                      <div>
                        <span className="font-medium">Password:</span> admin123
                      </div>
                    </div>
                    <Button
                      className="mt-3 w-full bg-purple-600/90 hover:bg-purple-700 glassmorphism-button"
                      size="sm"
                      onClick={() => handleDemoLogin("admin")}
                      disabled={adminLoading || cashierLoading || isLoading}
                    >
                      {adminLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Use Admin Account"
                      )}
                    </Button>
                  </div>
                  <div className="rounded-lg border border-white/20 p-3 glassmorphism-panel">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100/80 text-orange-600 backdrop-blur-sm">
                        <LockKeyhole size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Cashier Account</h3>
                        <p className="text-xs text-muted-foreground">Limited to POS operations</p>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Email:</span> cashier@oranjpay.com
                      </div>
                      <div>
                        <span className="font-medium">Password:</span> cashier123
                      </div>
                    </div>
                    <Button
                      className="mt-3 w-full bg-orange-600/90 hover:bg-orange-700 glassmorphism-button"
                      size="sm"
                      onClick={() => handleDemoLogin("cashier")}
                      disabled={adminLoading || cashierLoading || isLoading}
                    >
                      {cashierLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Use Cashier Account"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
