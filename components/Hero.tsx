'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import RealisticLimousine from './RealisticLimousine'
import { COMPANY_BRANDING, getBrandName, getBrandPhone, getBrandTagline } from '@/config/branding'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }) // Wait for loading screen

    // Animate elements in sequence
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(contactRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.2"
    )

    return () => {
      tl.kill()
    }
  }, [])

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen bg-red-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 border-2 border-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-white rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div ref={heroRef} className="relative z-10 min-h-[120vh] lg:min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-24 lg lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight opacity-0">
                {getBrandName('prefix')}
                <span className="block font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{getBrandName('suffix')}</span>
              </h1>
              
              <p ref={subtitleRef} className="text-lg sm:text-xl lg:text-2xl font-light opacity-0 px-4 lg:px-0">
                {getBrandTagline('hero')}
              </p>
              
              <div ref={contactRef} className="flex items-center justify-center lg:justify-start gap-3 text-base sm:text-lg lg:text-xl font-semibold opacity-0">
                <i className="fas fa-phone text-lg sm:text-xl lg:text-2xl"></i>
                <span>{getBrandPhone('display')}</span>
              </div>
              
              <button 
                ref={buttonRef}
                onClick={scrollToBooking}
                className="btn-secondary inline-flex items-center gap-3 text-base sm:text-lg opacity-0 group mx-auto lg:mx-0"
              >
                <i className="fas fa-car text-lg sm:text-xl group-hover:animate-pulse"></i>
                Book Your Ride
              </button>
            </div>

            {/* Video Scene */}
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative order-1 lg:order-2">
              <RealisticLimousine />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/3 lg:left-[45%] mx-auto transform text-white text-center animate-bounce">
        <div className="text-sm opacity-80 mb-2">Scroll to explore</div>
        <i className="fas fa-chevron-down text-xl"></i>
      </div>
    </section>
  )
}
