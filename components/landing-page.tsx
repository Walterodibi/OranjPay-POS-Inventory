import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Play } from "lucide-react"

import { Button } from "@/components/ui/button"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
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
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#solutions"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Solutions
              </Link>
              <Link
                href="#developers"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Developers
              </Link>
              <Link
                href="#resources"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Resources
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact sales
            </Link>
            <Link href="/login">
              <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  E-commerce solutions
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  A complete payments platform for e-commerce
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Accept payments via all the tools you need to grow a successful retail business with OranjPay's
                  payment platform. From seamless checkout flows to powerful fraud prevention systems, OranjPay helps
                  businesses thrive. Choose OranjPay to streamline your payments.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button className="bg-purple-600 hover:bg-purple-700">Contact sales</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Start free trial</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[300px] rotate-3 overflow-hidden rounded-xl bg-gradient-to-b from-blue-500 to-purple-600 p-4 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=300"
                    alt="Payment Terminal"
                    width={300}
                    height={500}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-lg font-bold">$124.95</p>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-6 w-10 rounded bg-red-500"></div>
                        <div className="h-6 w-10 rounded bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-gray-50 py-12 dark:bg-gray-900/50 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Shopify"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Woo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Magento"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="BigCommerce"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="Shopware"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                Boost your business
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Maximize conversion with smarter payments
              </h2>
              <p className="max-w-[85%] text-gray-500 dark:text-gray-400 md:text-xl">
                OranjPay's payment platform offers the optimal checkout experience designed to maximize conversion at
                every step of the payment flow - from optimized payment methods to intelligent routing, we help you
                increase your conversion rates.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Optimize your checkout flow</h3>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
                  Simplify your card payment flow processes on your website with a seamless checkout for your customers.
                  Our optimized checkout flow ensures a smooth customer shopping experience.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Google Pay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Apple Pay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Alipay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">WeChat Pay</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">SEPA Direct Debit</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="overflow-hidden rounded-xl border bg-background shadow">
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs">checkout.oranjpay.com</div>
                    <div></div>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Card number</label>
                        <div className="rounded-md border px-3 py-2 text-sm">•••• •••• •••• 4242</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Expiry</label>
                          <div className="rounded-md border px-3 py-2 text-sm">12/25</div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">CVC</label>
                          <div className="rounded-md border px-3 py-2 text-sm">•••</div>
                        </div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Pay $49.99</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Automatically decrease fraud with machine learning
                </h3>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
                  Fraud prevention is built into every OranjPay account. Our machine learning models are constantly
                  learning from millions of businesses to help you combat fraud. In 2023, we prevented fraud losses of
                  over $7 billion.
                </p>
                <div className="rounded-xl border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Fraud rate</span>
                      <span className="text-sm font-medium">0.7%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[30%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Maximize acceptance and prevent involuntary churn
                </h3>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
                  OranjPay's advanced payment routing optimizes authorization rates across hundreds of acquirers,
                  networks, and issuers. We identify the best path for messages and routing combinations to prevent
                  failed payments.
                </p>
                <div className="rounded-xl border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Acceptance rate</span>
                      <span className="text-sm font-medium">94.3%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-2 w-[94%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Convert more customers with OranjPay
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400">
                  Our built-in optimization tools help you increase conversion, prevent fraud, and expand globally with
                  a complete payments platform.
                </p>
                <Link href="/login">
                  <Button className="bg-purple-600 hover:bg-purple-700">Get started</Button>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative aspect-video w-full max-w-[550px] overflow-hidden rounded-xl bg-gray-100 shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-5 w-5" />
                      <span className="sr-only">Play video</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 dark:bg-gray-900/50 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                Why OranjPay
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Grow revenue with unified experiences
              </h2>
              <p className="max-w-[85%] text-gray-500 dark:text-gray-400 md:text-xl">
                OranjPay helps businesses create seamless buying experiences, attract new customers, and capture more
                revenue with a complete payments platform.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Launch subscriptions</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  For startups, enterprises, or subscription services, OranjPay helps you manage recurring billing,
                  reduce churn, and scale globally.
                </p>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    alt="Subscription Management"
                    width={350}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Expand to in-person sales</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Extend beyond digital with our POS solutions that provide seamless and unified retail across your
                  online and physical stores.
                </p>
                <div className="mt-4">
                  <Image
                    src="/placeholder.svg?height=200&width=350"
                    alt="POS Terminal"
                    width={350}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 dark:bg-gray-950 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Integrate with all the systems you already use
              </h2>
              <p className="max-w-[85%] text-gray-500 dark:text-gray-400 md:text-xl">
                If you need to manage inventory, orders, shipping, or accounting, OranjPay connects with the business
                systems you already use.
              </p>
              <Link href="/login" className="text-purple-600 hover:underline">
                Explore integrations to help your business grow <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 dark:bg-gray-900/50 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  Case Studies
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  OranjPay brings the luxury of one-click checkouts with ease
                </h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">Challenge</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Luxury retailer Italic was looking to simplify the checkout process for their premium customers
                      while maintaining security.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold">Solution</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      They implemented OranjPay's one-click checkout with built-in fraud protection, which streamlined
                      the purchase process while maintaining security and reducing cart abandonment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold">Results</h4>
                    <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>24% increase in conversion rate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>15% reduction in cart abandonment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>99.8% fraud prevention accuracy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative aspect-video w-full max-w-[550px] overflow-hidden rounded-xl bg-gray-100 shadow-xl">
                  <Image
                    src="/placeholder.svg?height=300&width=550"
                    alt="Luxury retail checkout"
                    width={550}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-5 w-5" />
                      <span className="sr-only">Play video</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-purple-600 py-12 text-white md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your payment experience?
              </h2>
              <p className="max-w-[85%] text-purple-100 md:text-xl">
                Join thousands of businesses that trust OranjPay for their payment processing needs.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button className="bg-white text-purple-600 hover:bg-purple-50">Get started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-purple-700">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white py-12 dark:bg-gray-950 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/OranjPay-Black.png"
                  alt="OranjPay"
                  width={130}
                  height={30}
                  className="dark:hidden"
                />
                <Image
                  src="/images/OranjPay-White.png"
                  alt="OranjPay"
                  width={130}
                  height={30}
                  className="hidden dark:block"
                />
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A complete payments platform for modern retail and e-commerce businesses.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Point of Sale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Invoicing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} OranjPay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
