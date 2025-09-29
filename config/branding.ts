// Perfect Limo Egypt - Centralized Branding Configuration
// This file contains all branding information for consistent use across the website

export const COMPANY_BRANDING = {
  // Company Information
  name: {
    full: "Perfect Limo Egypt",
    short: "Perfect Limo",
    display: "Perfect LIMO EGYPT",
    prefix: "Perfect",
    suffix: "LIMO EGYPT"
  },
  
  // Taglines and Descriptions
  tagline: {
    main: "Excellence in providing Limousine services across Egypt",
    short: "Luxury Transportation in Egypt",
    hero: "Your Premium Limousine Service in Egypt",
    footer: "Excellence in providing Limousine services"
  },
  
  // Contact Information
  contact: {
      phone: {
        primary: process.env.COMPANY_PHONE_PRIMARY || "+20 120 027 2020",
        display: process.env.COMPANY_PHONE_DISPLAY || "+20 120 027 2020",
        whatsapp: process.env.COMPANY_WHATSAPP_NUMBER || "201200272020",
        formatted: process.env.COMPANY_PHONE_FORMATTED || "(+20) 120 027 2020"
      },
    email: {
      primary: "info@perfectlimoegypt.com",
      booking: "booking@perfectlimoegypt.com",
      support: "support@perfectlimoegypt.com"
    },
    address: {
      city: "Cairo",
      country: "Egypt",
      full: "Cairo, Egypt",
      service_area: "All Egypt - Cairo, Alexandria, Luxor, Aswan, Sharm El Sheikh"
    }
  },
  
  // Brand Colors (Perfect Limo Egypt theme)
  colors: {
    primary: "#e31e24",      // Perfect Red
    secondary: "#b71c22",    // Dark Red
    accent: "#ffd700",       // Gold (Egyptian touch)
    white: "#ffffff",
    black: "#000000",
    gray: "#333333",
    lightGray: "#f5f5f5",
    textGray: "#666666"
  },
  
  // Social Media & Links
  social: {
    whatsapp: `https://wa.me/+201200272020`,
    facebook: "https://facebook.com/perfectlimoegypt",
    instagram: "https://instagram.com/perfectlimoegypt",
    twitter: "https://twitter.com/perfectlimoeg",
    linkedin: "https://linkedin.com/company/perfect-limo-egypt"
  },
  
  // Services & Locations
  services: {
    main: [
      "Airport Transfer",
      "Wedding Transportation", 
      "Corporate Events",
      "City Tours",
      "Hotel Transfers",
      "VIP Transportation"
    ],
    locations: [
      "Cairo Airport (CAI)",
      "Alexandria",
      "Luxor",
      "Aswan", 
      "Hurghada",
      "Sharm El Sheikh",
      "New Administrative Capital"
    ]
  },
  
  // SEO & Metadata
  seo: {
    title: "Perfect Limo Egypt - Premium Limousine Services",
    description: "Professional limousine and luxury car services in Egypt. Airport transfers, weddings, corporate events. Available in Cairo, Alexandria, Luxor, and all Egypt.",
    keywords: "limousine egypt, luxury car service cairo, airport transfer egypt, wedding transportation, corporate limo egypt, vip transport",
    author: "Perfect Limo Egypt"
  },
  
  // Brand Assets
  assets: {
    logo: {
      icon: "fas fa-thumbs-up",
      iconAlt: "fas fa-car-side",
      background: "linear-gradient(135deg, #e31e24, #b71c22)"
    },
    favicon: "/favicon.ico",
    ogImage: "/images/perfect-limo-egypt-og.jpg"
  },
  
  // Operating Information
  operation: {
    hours: "24/7",
    availability: "Available 24 hours, 7 days a week",
    coverage: "Nationwide coverage across Egypt",
    languages: ["Arabic", "English", "French"],
    established: "2020",
    fleet_size: "50+ Premium Vehicles"
  },
  
  // Legal Information
  legal: {
    company_registration: "Perfect Limo Egypt LLC",
    license: "Licensed Tourism Transportation Company",
    insurance: "Fully Insured Fleet",
    vat: "VAT Registered in Egypt"
  }
} as const

// Helper functions for easy access
export const getBrandName = (variant: 'full' | 'short' | 'display' | 'prefix' | 'suffix' = 'full') => {
  return COMPANY_BRANDING.name[variant]
}

export const getBrandPhone = (variant: 'primary' | 'display' | 'whatsapp' | 'formatted' = 'primary') => {
  return COMPANY_BRANDING.contact.phone[variant]
}

export const getBrandEmail = (variant: 'primary' | 'booking' | 'support' = 'primary') => {
  return COMPANY_BRANDING.contact.email[variant]
}

export const getBrandTagline = (variant: 'main' | 'short' | 'hero' | 'footer' = 'main') => {
  return COMPANY_BRANDING.tagline[variant]
}

export const getBrandColor = (color: keyof typeof COMPANY_BRANDING.colors) => {
  return COMPANY_BRANDING.colors[color]
}

export const getWhatsAppUrl = (message?: string) => {
  const baseUrl = COMPANY_BRANDING.social.whatsapp
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

// Formatted display helpers
export const getFormattedCompanyName = () => {
  return `${COMPANY_BRANDING.name.prefix} ${COMPANY_BRANDING.name.suffix}`
}

export const getFullContactInfo = () => {
  return {
    phone: COMPANY_BRANDING.contact.phone.formatted,
    email: COMPANY_BRANDING.contact.email.primary,
    location: COMPANY_BRANDING.contact.address.full
  }
}

export default COMPANY_BRANDING
