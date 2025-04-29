"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Globe, Lightbulb, BarChart3 } from "lucide-react"
import ScrollingTestimonials from "./scrolling-testimonials"
import HeroGeometric from "./hero-geometric"
import { Outfit } from "next/font/google"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

export default function NewHomepage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className={cn("min-h-screen flex flex-col", outfit.variable, outfit.className)}>
      {/* Navigation - Restored original header */}
      <header className="border-b border-gray-200 bg-[#030303] text-white absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/OranjPay-White.png"
                  alt="OranjPay Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <div className="relative group">
                  <button className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm font-medium">
                    Solutions
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm font-medium">
                    Pricing
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm font-medium">
                    Resources
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm font-medium">
                    Enterprise
                  </button>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-white/80 hover:text-white px-2 py-1 text-sm font-medium">
                    What's new
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </nav>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="text-white/80 hover:text-white text-sm font-medium px-4 py-2">
                Log in
              </Link>
              <Link
                href="/signup"
                className="ml-4 bg-gradient-to-r from-[#635bff] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - New Geometric Design */}
      <HeroGeometric />

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our mission is to provide businesses with valuable payment solutions
            </h2>
            <p className="text-lg text-gray-600">
              Simplifying retail operations and empowering growth through innovative technology
            </p>
          </div>

          {/* Updated mission/expertise/approach cards with modern design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#f0f9ff] p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Lightbulb className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Our Mission</h3>
              <p className="text-gray-700">
                To simplify retail operations through innovative payment solutions that empower businesses of all sizes
              </p>
            </div>

            <div className="bg-[#f0fdf4] p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <BarChart3 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Our Expertise</h3>
              <p className="text-gray-700">
                Decades of experience in retail technology and payment processing with a focus on security and
                reliability
              </p>
            </div>

            <div className="bg-[#fefce8] p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                <Globe className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Our Approach</h3>
              <p className="text-gray-700">
                Customer-centric solutions designed for real-world business needs with continuous innovation and support
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">What our customers say</h2>
          <ScrollingTestimonials />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The one commerce platform behind it all</h2>
            <p className="text-lg text-gray-600">
              We've got everything you need to sell locally and globally. You control the pricing and keep all of your
              revenue — with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-purple-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sell anything</h3>
              <p className="text-gray-600 mb-4">
                From physical products to digital downloads to services and subscriptions, our platform supports
                everything you need—helping you experiment with any sales model.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-blue-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 20H7C5.89543 20 5 19.1046 5 18V9M17 20C18.1046 20 19 19.1046 19 18V9M17 20H19M7 20H5M5 9V6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6V9M5 9H19M12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sell to anyone</h3>
              <p className="text-gray-600 mb-4">
                Connect with people, email newsletters, and automated workflows. Let customers pay how they want in 135+
                currencies with our seamless payment system.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10H21M7 15H8M12 15H13M6 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sell anywhere</h3>
              <p className="text-gray-600 mb-4">
                Sell on your website, social media, or in-person with our all-in-one platform. Easily connect with your
                customers wherever they are through Zapier.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-yellow-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay tax compliant</h3>
              <p className="text-gray-600 mb-4">
                We handle all the complex calculations for VAT, sales tax, and digital taxes—so you don't have to. We
                take care of all the compliance details.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-red-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 15V17M14 15V17M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21ZM9 3V7M15 3V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automate your SaaS sales</h3>
              <p className="text-gray-600 mb-4">
                As your inventory of records increases, we enable payments from 190+ countries with no recurring
                payments or subscription management needed.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 bg-orange-100 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stop fraud with A.I.</h3>
              <p className="text-gray-600 mb-4">
                Our machine learning system detects unusual patterns in logistics, logins, and more, helping you shift
                from reactive to proactive fraud prevention.
              </p>
              <div className="flex justify-end">
                <svg
                  className="h-5 w-5 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Aurora Background */}
      <section className="py-16 relative overflow-hidden">
        {/* Aurora background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse"></div>
          <div
            className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-teal-500/20 blur-[100px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get set up today with a 7-day free trial</h2>
            <p className="text-white/80 mb-8">
              Start a free trial and explore OranjPay UI for 7 days. No card required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-[#635bff] px-6 py-3 rounded-full font-medium flex items-center hover:bg-white/90 transition-colors"
              >
                Start free trial
              </Link>
              <div className="text-sm text-white/80">
                <span>Just 7 days free</span>
                <br />
                <span>Then $15/month for 3 months</span>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-white text-sm font-medium flex items-center mx-auto hover:text-white/80 transition-colors">
                How it works <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Insight
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Get Oranj
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Reward API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Developer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Loyalty API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Data Protection Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:customerservice@oranjpay.com" className="text-sm text-gray-600 hover:text-gray-900">
                    customerservice@oranjpay.com
                  </a>
                </li>
                <li>
                  <span className="text-sm text-gray-600">8 The Providence St, Lekki Phase 1 106104, Lagos</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image
                src="/images/OranjPay-Black.png"
                alt="OranjPay Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="text-sm text-gray-600">© {currentYear} OranjPay. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
