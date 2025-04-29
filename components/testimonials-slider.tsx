"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Testimonial {
  name: string
  company: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: "Sergio Gancedo",
    company: "Benor Media",
    text: "They are most professionals I've ever worked with. They delivered exactly what I asked for in a very short period – I can't recommend them enough.",
  },
  {
    name: "Aurélie Brébant",
    company: "Aurélie Studio",
    text: "They are very effective and responsive in their work. I recommend working with them on complex javascript and Webflow projects.",
  },
  {
    name: "Nicholas Laane",
    company: "Deftpower",
    text: "They did a great job implementing a solution with out-of-the-box thinking. If you need a javascript developer for webflow projects, take them!",
  },
  {
    name: "Mike Anthony",
    company: "Astrology Presents",
    text: "They Coded a specific functionality to my website fast, and very well done! Provided a video of how to edit it myself as well. I recommend will be coming back in the future!",
  },
  {
    name: "Monica Klimt's",
    company: "Klimt's Studio",
    text: "One of the best Javascript developer for webflow I have worked with so far. Fast, reliable, efficient and very talented. I will count on him for other projects, thank you!",
  },
]

export function TestimonialsSlider() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clone the first few testimonials and append them to the end for seamless looping
    const testimonialElements = container.querySelectorAll(".testimonial-item")
    const cloneCount = Math.min(3, testimonialElements.length)

    for (let i = 0; i < cloneCount; i++) {
      const clone = testimonialElements[i].cloneNode(true) as HTMLElement
      container.appendChild(clone)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-[#001a4d] py-16">
      {/* Left fade effect */}
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#001a4d] to-transparent"></div>

      {/* Right fade effect */}
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#001a4d] to-transparent"></div>

      <div className="relative">
        <motion.div
          ref={containerRef}
          className="flex"
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 40,
            ease: "linear",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item flex-shrink-0 mx-6 w-[400px] p-6 rounded-lg">
              <div className="text-white">
                <p className="text-lg mb-4">"{testimonial.text}"</p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
