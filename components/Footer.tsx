'use client'

import { COMPANY_BRANDING, getBrandName, getBrandPhone, getBrandTagline } from '@/config/branding'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-perfect-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 text-2xl font-bold">
            <i className={`${COMPANY_BRANDING.assets.logo.icon} text-3xl`}></i>
            <span>{getBrandName('prefix')}<span className="font-light">{getBrandName('suffix')}</span></span>
          </div>

          {/* Tagline */}
          <p className="text-lg opacity-90">{getBrandTagline('footer')}</p>

          {/* Contact */}
          <div className="flex items-center justify-center gap-2 text-perfect-gold">
            <i className="fas fa-phone"></i>
            <span className="font-semibold">{getBrandPhone('display')}</span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 py-4">
            <a
              href="https://wa.me/201200272020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-perfect-gold transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="tel:01200272020"
              className="text-2xl hover:text-perfect-gold transition-colors duration-200"
              aria-label="Phone"
            >
              <i className="fas fa-phone"></i>
            </a>
            <a
              href="mailto:info@perfectcompany.com"
              className="text-2xl hover:text-perfect-gold transition-colors duration-200"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8 text-sm">
            <button 
              onClick={() => {
                const element = document.getElementById('home')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-perfect-gold transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('services')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-perfect-gold transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('booking')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-perfect-gold transition-colors duration-200"
            >
              Book Now
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-perfect-gold transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white border-opacity-20 pt-4">
          <p className="text-sm opacity-80">
            &copy; {currentYear} {getBrandName('full')}. All rights reserved. {getBrandTagline('footer')}.
          </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
