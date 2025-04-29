"use client"
import { motion } from "framer-motion"
import { TestimonialsSlider } from "./testimonials-slider"
import { Lightbulb, TrendingUp, Users } from "lucide-react"

export function UpdatedHomepage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#002663] text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Simplify Your Business Operations with OranjPay</h1>
              <p className="text-xl mb-8">
                All-in-one solution for retail management, inventory tracking, and payment processing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all">
                  Get Started
                </button>
                <button className="bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-medium transition-all">
                  Book a Demo
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/data-overview-dashboard.png"
                alt="OranjPay Dashboard"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose OranjPay</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Mission */}
            <motion.div
              className="p-6 rounded-xl bg-yellow-50 border border-yellow-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Lightbulb className="text-yellow-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses with innovative technology solutions that simplify operations and drive growth.
              </p>
            </motion.div>

            {/* Our Expertise */}
            <motion.div
              className="p-6 rounded-xl bg-green-50 border border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Expertise</h3>
              <p className="text-gray-600">
                Specialized in creating seamless retail management systems with integrated payment solutions and
                real-time analytics.
              </p>
            </motion.div>

            {/* Our Approach */}
            <motion.div
              className="p-6 rounded-xl bg-blue-50 border border-blue-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-blue-600 h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Our Approach</h3>
              <p className="text-gray-600">
                Customer-centric development focused on creating intuitive, reliable, and scalable solutions for
                businesses of all sizes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSlider />

      {/* Free Trial Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Aurora Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('/celestial-dance.png')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Set Up Today with 7 Days Free Trial</h2>
            <p className="text-xl mb-8 text-gray-700">
              Experience the full power of OranjPay with no commitment. Start managing your business more efficiently
              today.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium text-lg transition-all shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Products Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Insight
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Get Oranj
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Reward API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Developer
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Loyalty API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Data Protection Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">customerservice@oranjpay.com</p>
              <p className="text-gray-300">8 The Providence St, Lekki Phase 1 106104, Lagos</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <img src="/images/OranjPay-White.png" alt="OranjPay Logo" className="h-8" />
              </div>
              <p className="text-gray-400 text-sm">&copy; {currentYear} OranjPay. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
