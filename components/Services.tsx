'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: 'fas fa-plane',
    title: 'Airport Transfer',
    description: 'Reliable and comfortable airport transfers with professional drivers. Never miss a flight again.',
    features: ['24/7 Availability', 'Flight Tracking', 'Meet & Greet Service']
  },
  {
    icon: 'fas fa-glass-cheers',
    title: 'Event Transportation',
    description: 'Luxury transportation for weddings, proms, and special occasions. Make your day memorable.',
    features: ['Wedding Packages', 'Prom Specials', 'Group Rates']
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Corporate Services',
    description: 'Professional business transportation for meetings and corporate events. Impress your clients.',
    features: ['Executive Vehicles', 'Monthly Contracts', 'Expense Reports']
  },
  {
    icon: 'fas fa-route',
    title: 'City Tours',
    description: 'Explore the city in comfort with our guided tour services. Discover hidden gems.',
    features: ['Custom Routes', 'Professional Guides', 'Historical Tours']
  }
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-perfect-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="section-title">
          Our Premium Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="card group cursor-pointer relative overflow-hidden"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-perfect-red to-perfect-dark-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 text-center space-y-4">
                <div className="text-5xl text-perfect-red group-hover:text-white transition-colors duration-300">
                  <i className={service.icon}></i>
                </div>
                
                <h3 className="text-xl font-semibold text-perfect-gray group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-perfect-text-gray group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
                
                <ul className="space-y-2 text-sm">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center justify-center gap-2 text-perfect-text-gray group-hover:text-white transition-colors duration-300"
                    >
                      <i className="fas fa-check text-perfect-red group-hover:text-perfect-gold"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="btn-primary mt-4 group-hover:bg-white group-hover:text-perfect-red transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '1000+', label: 'Rides Completed' },
            { number: '24/7', label: 'Service Hours' },
            { number: '5★', label: 'Average Rating' }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-perfect-red">
                {stat.number}
              </div>
              <div className="text-perfect-text-gray font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
