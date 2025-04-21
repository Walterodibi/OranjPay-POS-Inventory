"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LockKeyhole, AlertCircle } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { user, login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginInProgress, setLoginInProgress] = useState(false)

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const handleDemoLogin = (role: string) => {
    if (role === "admin") {
      setEmail("admin@oranjpay.com")
      setPassword("admin123")
    } else {
      setEmail("cashier@oranjpay.com")
      setPassword("cashier123")
    }
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-orange-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/OranjPay-White.png" alt="OranjPay" width={150} height={35} />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "OranjPay has transformed how we handle payments. The system is intuitive, reliable, and has significantly
              improved our checkout efficiency."
            </p>
            <footer className="text-sm">Sarah Johnson - Retail Store Manager</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
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
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={loginInProgress || isLoading}
                    >
                      {loginInProgress ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="demo">
              <Card>
                <CardHeader>
                  <CardTitle>Demo Accounts</CardTitle>
                  <CardDescription>Use these demo accounts to explore the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
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
                      className="mt-3 w-full bg-purple-600 hover:bg-purple-700"
                      size="sm"
                      onClick={() => handleDemoLogin("admin")}
                    >
                      Use Admin Account
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
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
                      className="mt-3 w-full bg-orange-600 hover:bg-orange-700"
                      size="sm"
                      onClick={() => handleDemoLogin("cashier")}
                    >
                      Use Cashier Account
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="outline"
                    onClick={(e) => handleLogin(e as unknown as React.FormEvent)}
                    disabled={!email || !password || loginInProgress || isLoading}
                  >
                    {loginInProgress ? "Signing in..." : "Sign In with Selected Account"}
                  </Button>
                </CardFooter>
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
