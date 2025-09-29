'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COMPANY_BRANDING, getBrandPhone, getBrandEmail, getWhatsAppUrl } from '@/config/branding'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: 'fas fa-phone',
    title: 'Phone',
    content: getBrandPhone('display'),
    description: '24/7 Customer Support'
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    content: getBrandEmail('primary'),
    description: 'Send us your inquiries'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Service Area',
    content: COMPANY_BRANDING.contact.address.service_area,
    description: 'Available across Egypt'
  }
]

const features = [
  {
    icon: 'fas fa-clock',
    title: '24/7 Service',
    description: 'Available round the clock for your convenience'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Safe & Secure',
    description: 'Professional licensed drivers and insured vehicles'
  },
  {
    icon: 'fas fa-star',
    title: 'Premium Quality',
    description: 'Luxury vehicles maintained to the highest standards'
  },
  {
    icon: 'fas fa-dollar-sign',
    title: 'Competitive Rates',
    description: 'Best prices for premium limousine services'
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Professional Staff',
    description: 'Experienced and courteous chauffeurs'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Easy Booking',
    description: 'Simple online booking or call for instant service'
  }
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-perfect-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="section-title text-white">
          Contact Us
        </h2>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-lg opacity-90 mb-8">
                Ready to experience luxury transportation? Contact us for bookings, 
                inquiries, or custom service requests. We're here to serve you 24/7.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl text-perfect-gold">
                    <i className={info.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{info.title}</h4>
                    <p className="text-white font-medium">{info.content}</p>
                    <p className="text-sm opacity-80">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={`tel:${getBrandPhone('primary')}`}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <i className="fas fa-phone"></i>
                Call Now
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Why Choose Perfect Company?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white bg-opacity-5 rounded-lg backdrop-blur-sm border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-perfect-gold text-xl flex-shrink-0 mt-1">
                      <i className={feature.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Operating Hours */}
            <div className="mt-8 p-6 bg-perfect-red bg-opacity-20 rounded-lg border border-perfect-red border-opacity-30">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <i className="fas fa-clock text-perfect-gold"></i>
                Operating Hours
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span className="font-medium">24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Holidays:</span>
                  <span className="font-medium">24 Hours</span>
                </div>
              </div>
              <p className="text-xs opacity-80 mt-3">
                * Emergency services available anytime
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-white bg-opacity-5 rounded-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4">Ready to Book Your Luxury Ride?</h3>
          <p className="text-lg opacity-90 mb-6">
            Experience the difference with Perfect Company's premium limousine services
          </p>
          <button 
            onClick={() => {
              const bookingSection = document.getElementById('booking')
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="btn-primary text-lg px-8 py-3"
          >
            Book Your Ride Now
          </button>
        </div>
      </div>
    </section>
  )
}
