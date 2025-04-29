"use client"

import { useEffect, useRef } from "react"

const testimonials = [
  {
    quote:
      "OranjPay has transformed how I manage my retail business. The dashboard is intuitive and the payment processing is lightning fast!",
    author: "Sarah Johnson",
    role: "Boutique Owner",
  },
  {
    quote:
      "The multi-store management feature has been a game-changer for our franchise. We can now monitor all locations from a single dashboard.",
    author: "Michael Chen",
    role: "Restaurant Chain Manager",
  },
  {
    quote:
      "Customer support is exceptional. Any issues we've had were resolved within hours, not days like our previous provider.",
    author: "Emma Rodriguez",
    role: "E-commerce Director",
  },
  {
    quote:
      "The inventory tracking system has reduced our stockouts by 75%. I can't imagine running our business without OranjPay now.",
    author: "David Okonkwo",
    role: "Supermarket Owner",
  },
  {
    quote:
      "Integration with our accounting software was seamless. Reconciliation that used to take days now happens automatically.",
    author: "Priya Sharma",
    role: "Financial Controller",
  },
  {
    quote:
      "The analytics provided by OranjPay have helped us identify our best-selling products and optimize our inventory accordingly.",
    author: "James Wilson",
    role: "Retail Analytics Manager",
  },
]

// Duplicate testimonials for continuous scrolling
const allTestimonials = [...testimonials, ...testimonials, ...testimonials]

export default function ScrollingTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    // Set initial scroll position to middle to allow infinite scrolling in both directions
    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3

    const animateScroll = () => {
      if (scrollContainer) {
        // Slow scroll from right to left
        scrollContainer.scrollLeft += 0.5

        // Reset scroll position when reaching the end of the middle section
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth * 2) / 3) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3
        }
      }
    }

    const animationId = setInterval(animateScroll, 30)

    return () => {
      clearInterval(animationId)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-12">
      {/* Gradient overlays for the mist effect */}
      <div className="absolute top-0 left-0 z-10 h-full w-[100px] bg-gradient-to-r from-gray-50 to-transparent"></div>
      <div className="absolute top-0 right-0 z-10 h-full w-[100px] bg-gradient-to-l from-gray-50 to-transparent"></div>

      {/* Scrolling container */}
      <div
        ref={containerRef}
        className="flex w-full overflow-x-hidden py-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-6 px-[100px]">
          {allTestimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-[350px] bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-800 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div>
                <p className="text-gray-900 font-medium">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
