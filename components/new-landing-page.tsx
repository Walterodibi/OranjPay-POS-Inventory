"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewLandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-['Sora']">
      {/* Navigation */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/OranjPay-Black.png"
                alt="OranjPay Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Solutions
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Resources
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Enterprise
              </Link>
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                  What's new
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Button className="rounded-full bg-[#002663] hover:bg-[#001c4a] text-white px-4 py-2 text-sm">
              Start free trial
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <div className="text-xs text-gray-500 mb-2">
                <Link href="/" className="hover:underline">
                  What's new
                </Link>{" "}
                → <span>Seamless Bank Integration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
                Dream big, build fast, and grow your online business.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're launching a new venture or scaling an established brand or product, our platform equips
                you to grow and thrive.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Button className="rounded-full bg-[#002663] hover:bg-[#001c4a] text-white px-6 py-2.5">
                  Start free trial
                </Button>
                <div className="text-xs text-gray-500">
                  <p>14-7 days free</p>
                  <p>No credit card required for 30 minutes</p>
                </div>
                <div className="ml-auto hidden md:flex items-center">
                  <span className="text-sm font-medium mr-2">How it works</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/data-overview-dashboard.png"
                  alt="Dashboard Preview"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/90 rounded-full p-4 shadow-lg">
                    <Play className="h-6 w-6 text-[#002663]" />
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 -z-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -top-10 -left-10 -z-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">The one commerce platform behind it all</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl">
            We've got everything you need to sell locally and globally. You control the pricing and keep all of your
            revenue — with no hidden fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sell anything</h3>
              <p className="text-gray-600 mb-4">
                Use our commerce platform to sell anything—from subscriptions to products with digital content—helping
                you experiment with any idea or format.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sell to anyone</h3>
              <p className="text-gray-600 mb-4">
                Reach customers with posts, email newsletters, and automated workflows. Let customers pay how they want
                or choose their own price when recurring payments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sell anywhere</h3>
              <p className="text-gray-600 mb-4">
                Sell on your own site or all in one platform or integrate it with your enterprise site. Easily connect
                your OranjPay account to thousands of stores through Zapier.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Stay tax compliant</h3>
              <p className="text-gray-600 mb-4">
                We handle VAT for your digital product payments. You'll find collection, and sales tax—so you don't have
                to. We take care of all the details.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Automate your SaaS sales</h3>
              <p className="text-gray-600 mb-4">
                As your merchant of record, we enable payments from 195+ countries with no additional code. We handle
                all the complexity.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="bg-white p-3 rounded-lg inline-block mb-4">
                <svg className="h-6 w-6 text-[#002663]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Stop fraud with A.I.</h3>
              <p className="text-gray-600 mb-4">
                Our machine learning systems automatically detect unusual patterns in logins, signups, refunds, and
                more, keeping you safe from fraud.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12">
            <Button className="rounded-full bg-[#002663] hover:bg-[#001c4a] text-white px-6 py-2.5">
              Start free trial
            </Button>
            <div className="text-xs text-gray-500">
              <p>14-7 days free</p>
              <p>No credit card required for 30 minutes</p>
            </div>
            <div className="ml-auto hidden md:flex items-center">
              <span className="text-sm font-medium mr-2">How it works</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Trusted by 4000+ companies</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            You're in good company. Over thousands of entrepreneurs all over the world who have collectively made over
            $500M in sales with OranjPay UI.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company logos */}
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">TESLA</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">RIPPLING</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">descript</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">Basecamp</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">PLAID</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">Outreach</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">LaunchDarkly</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <span className="text-xl font-bold">Notion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-2xl overflow-hidden">
            <div className="md:w-2/3 p-8 md:p-12">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                OranjPay has truly impressed me as a small business owner. Selling my digital products has never been
                easier and the seamless integration with Xero is a huge plus. I highly recommend!
              </h3>
              <div className="mt-6">
                <p className="font-semibold">Mila Valente</p>
                <p className="text-sm text-gray-600">StoryDeck Services, Australia</p>
              </div>
            </div>
            <div className="md:w-1/3">
              <Image
                src="/confident-professional.png"
                alt="Testimonial"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get set up today with a 7-day free trial</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start a free trial and explore OranjPay UI for 7 days. No card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button className="rounded-full bg-[#002663] hover:bg-[#001c4a] text-white px-6 py-2.5">
              Start free trial
            </Button>
            <div className="text-xs text-gray-500">
              <p>14-7 days free</p>
              <p>No credit card required for 30 minutes</p>
            </div>
            <div className="hidden md:flex items-center ml-8">
              <span className="text-sm font-medium mr-2">How it works</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Releases
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Media kit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Use cases</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Government
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    SaaS centers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Marketplaces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Ecommerce
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    AngelList
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Dribbble
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Licenses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="mb-4 md:mb-0">
              <Image
                src="/images/OranjPay-Black.png"
                alt="OranjPay Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600">© 2023 OranjPay UI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
