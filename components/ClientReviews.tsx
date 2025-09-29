'use client'

import { useState } from 'react'
import { COMPANY_BRANDING, getBrandPhone } from '@/config/branding'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  service: string
  date: string
  avatar?: string
  location?: string
}

const clientReviews: Review[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    rating: 5,
    comment: "Exceptional service! The limousine was pristine and the driver was very professional. Perfect Limo Egypt made my wedding day unforgettable. The attention to detail was outstanding.",
    service: "Wedding Transportation",
    date: "2024-01-15",
    location: "Cairo"
  },
  {
    id: 2,
    name: "Sarah Mohamed",
    rating: 5,
    comment: "Amazing experience from start to finish. The luxury interior and smooth ride made my airport transfer stress-free. Will definitely use again!",
    service: "Airport Transfer",
    date: "2024-01-10",
    location: "Alexandria"
  },
  {
    id: 3,
    name: "Omar Ali",
    rating: 5,
    comment: "Perfect Limo Egypt lives up to their name. Punctual, luxurious, and excellent customer service. Highly recommended for corporate events!",
    service: "Corporate Event",
    date: "2024-01-08",
    location: "Giza"
  },
  {
    id: 4,
    name: "Fatima Ahmed",
    rating: 5,
    comment: "The city tour was fantastic! The chauffeur was knowledgeable and the limousine was incredibly comfortable. Great value for money.",
    service: "City Tour",
    date: "2024-01-05",
    location: "Cairo"
  },
  {
    id: 5,
    name: "Khaled Ibrahim",
    rating: 5,
    comment: "Outstanding service for our anniversary celebration. The attention to detail and luxury experience exceeded all expectations. Thank you!",
    service: "Special Occasion",
    date: "2024-01-03",
    location: "Sharm El Sheikh"
  },
  {
    id: 6,
    name: "Mona Hassan",
    rating: 5,
    comment: "Professional and luxurious service. The driver was courteous and the vehicle was immaculate. Perfect for my business meeting.",
    service: "Corporate Transfer",
    date: "2023-12-28",
    location: "New Cairo"
  }
]

interface ClientReviewsProps {
  isOpen: boolean
  onClose: () => void
}

export default function ClientReviews({ isOpen, onClose }: ClientReviewsProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const reviewsPerPage = 6
  
  const totalPages = Math.ceil(clientReviews.length / reviewsPerPage)
  const currentReviews = clientReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  )

  const averageRating = clientReviews.reduce((sum, review) => sum + review.rating, 0) / clientReviews.length

  const scrollToBooking = () => {
    onClose()
    setTimeout(() => {
      const bookingSection = document.getElementById('booking')
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500"
      style={{ 
        background: 'rgba(0, 0, 0, 0.85)', 
        backdropFilter: 'blur(15px)' 
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto mx-4 transform transition-all duration-500 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="text-perfect-red text-4xl">
              <i className="fas fa-thumbs-up"></i>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-perfect-gray">
                Client Reviews & Testimonials
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-perfect-gold text-lg"></i>
                  ))}
                </div>
                <span className="text-perfect-gray font-semibold">
                  {averageRating.toFixed(1)} / 5.0
                </span>
                <span className="text-perfect-text-gray">
                  ({clientReviews.length} reviews)
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-perfect-gray hover:text-perfect-red transition-colors duration-200 p-2 hover:bg-perfect-light-gray rounded-full"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-perfect-light-gray rounded-xl">
            <div className="text-2xl font-bold text-perfect-red">100%</div>
            <div className="text-sm text-perfect-text-gray">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-perfect-light-gray rounded-xl">
            <div className="text-2xl font-bold text-perfect-red">500+</div>
            <div className="text-sm text-perfect-text-gray">Happy Clients</div>
          </div>
          <div className="text-center p-4 bg-perfect-light-gray rounded-xl">
            <div className="text-2xl font-bold text-perfect-red">24/7</div>
            <div className="text-sm text-perfect-text-gray">Service Available</div>
          </div>
          <div className="text-center p-4 bg-perfect-light-gray rounded-xl">
            <div className="text-2xl font-bold text-perfect-red">5★</div>
            <div className="text-sm text-perfect-text-gray">Average Rating</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentReviews.map((review, index) => (
            <div 
              key={review.id}
              className="bg-gradient-to-br from-perfect-light-gray to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-perfect-light-gray"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-perfect-red text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-perfect-gray text-lg">
                      {review.name}
                    </h3>
                    <p className="text-perfect-text-gray text-sm">
                      {review.service}
                    </p>
                    {review.location && (
                      <p className="text-perfect-text-gray text-xs flex items-center gap-1">
                        <i className="fas fa-map-marker-alt"></i>
                        {review.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-perfect-gold text-sm"></i>
                  ))}
                </div>
              </div>
              
              <p className="text-perfect-text-gray mb-4 leading-relaxed text-sm">
                "{review.comment}"
              </p>
              
              <div className="flex justify-between items-center text-xs text-perfect-text-gray">
                <span>
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <div className="flex gap-1">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded-lg bg-perfect-light-gray text-perfect-gray disabled:opacity-50 hover:bg-perfect-red hover:text-white transition-colors duration-200"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                    currentPage === i
                      ? 'bg-perfect-red text-white'
                      : 'bg-perfect-light-gray text-perfect-gray hover:bg-perfect-red hover:text-white'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-perfect-light-gray text-perfect-gray disabled:opacity-50 hover:bg-perfect-red hover:text-white transition-colors duration-200"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-perfect-red to-perfect-dark-red rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3">
            Ready to Experience Excellence?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join our satisfied customers and book your luxury limousine experience today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToBooking}
              className="bg-white text-perfect-red px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              <i className="fas fa-car"></i>
              Book Your Ride Now
            </button>
            
              <a
                href={`tel:${getBrandPhone('primary')}`}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-perfect-red transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-phone"></i>
                Call: {getBrandPhone('display')}
              </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <p className="text-perfect-text-gray text-sm mb-4">Trusted by customers across Egypt</p>
          <div className="flex justify-center items-center gap-6 text-perfect-text-gray">
            <div className="flex items-center gap-2">
              <i className="fas fa-shield-alt text-green-500"></i>
              <span className="text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-award text-perfect-gold"></i>
              <span className="text-sm">Award Winning Service</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-blue-500"></i>
              <span className="text-sm">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
