'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApp } from '@/app/providers'
import { COMPANY_BRANDING, getBrandPhone, getWhatsAppUrl } from '@/config/branding'

gsap.registerPlugin(ScrollTrigger)

interface BookingFormData {
  name: string
  startPoint: string
  endPoint: string
  tripType: '1-way' | '2-way'
  passengers: string
  pickupDate: string
  pickupTime: string
  specialRequests?: string
}

export default function BookingForm() {
  const { showMessage, setLoading } = useApp()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setLoading(true)

    try {
      // Create booking message
      const bookingDetails = `
🚗 *New Limousine Booking Request - ${COMPANY_BRANDING.name.full}*

👤 *Name:* ${data.name}
📍 *Pick-up:* ${data.startPoint}
📍 *Drop-off:* ${data.endPoint}
🔄 *Trip Type:* ${data.tripType === '1-way' ? 'One Way' : 'Round Trip'}
👥 *Passengers:* ${data.passengers}
📅 *Date:* ${data.pickupDate}
⏰ *Time:* ${data.pickupTime}
${data.specialRequests ? `📝 *Special Requests:* ${data.specialRequests}` : ''}

📞 Please contact: ${getBrandPhone('display')}
🌐 ${COMPANY_BRANDING.name.full} - ${COMPANY_BRANDING.tagline.short}
      `.trim()

      // Send to Google Sheets
      await sendToGoogleSheets(data)

      // Send WhatsApp message
      const whatsappUrl = getWhatsAppUrl(bookingDetails)
      
      // Send Email
      await sendEmail(data, bookingDetails)

      // Open WhatsApp
      window.open(whatsappUrl, '_blank')

      showMessage('Booking request sent successfully! We will contact you shortly.', 'success')
      reset()
    } catch (error) {
      console.error('Booking error:', error)
      showMessage('Error sending booking request. Please try again or call us directly.', 'error')
    } finally {
      setIsSubmitting(false)
      setLoading(false)
    }
  }

  const sendToGoogleSheets = async (data: BookingFormData) => {
    // Google Apps Script Web App URL - You'll need to replace this with your actual URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'
    
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append('timestamp', new Date().toISOString())

    // For now, we'll just log the data
    console.log('Booking data to be sent to Google Sheets:', data)
    
    // Uncomment and update when you have the Google Script URL
    /*
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to send to Google Sheets')
    }
    */
  }

  const sendEmail = async (data: BookingFormData, message: string) => {
    // Email service integration - you can use EmailJS or similar service
    const emailData = {
      to: 'info@perfectcompany.com',
      subject: `New Limousine Booking - ${data.name}`,
      message: message,
      data: data
    }

    console.log('Email data:', emailData)
    
    // Implement email sending service here
    // Example with EmailJS:
    /*
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      emailData,
      'YOUR_PUBLIC_KEY'
    )
    */
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <section id="booking" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="section-title">
          Book Your Luxury Ride
        </h2>

        <form 
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-perfect-light-gray rounded-3xl p-8 shadow-perfect-lg"
        >
          <div className="grid gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-perfect-gray mb-2">
                Full Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-perfect-red text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Locations */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startPoint" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Pick-up Location *
                </label>
                <input
                  {...register('startPoint', { required: 'Pick-up location is required' })}
                  type="text"
                  className="input-field"
                  placeholder="Enter pick-up address"
                />
                {errors.startPoint && (
                  <p className="text-perfect-red text-sm mt-1">{errors.startPoint.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="endPoint" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Drop-off Location *
                </label>
                <input
                  {...register('endPoint', { required: 'Drop-off location is required' })}
                  type="text"
                  className="input-field"
                  placeholder="Enter destination address"
                />
                {errors.endPoint && (
                  <p className="text-perfect-red text-sm mt-1">{errors.endPoint.message}</p>
                )}
              </div>
            </div>

            {/* Trip Type and Passengers */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tripType" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Trip Type *
                </label>
                <select
                  {...register('tripType', { required: 'Trip type is required' })}
                  className="input-field"
                >
                  <option value="">Select trip type</option>
                  <option value="1-way">One Way</option>
                  <option value="2-way">Round Trip</option>
                </select>
                {errors.tripType && (
                  <p className="text-perfect-red text-sm mt-1">{errors.tripType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="passengers" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Number of Passengers *
                </label>
                <select
                  {...register('passengers', { required: 'Number of passengers is required' })}
                  className="input-field"
                >
                  <option value="">Select passengers</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                  <option value="6+">6+ Passengers</option>
                </select>
                {errors.passengers && (
                  <p className="text-perfect-red text-sm mt-1">{errors.passengers.message}</p>
                )}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Pick-up Date *
                </label>
                <input
                  {...register('pickupDate', { required: 'Pick-up date is required' })}
                  type="date"
                  min={minDate}
                  className="input-field"
                />
                {errors.pickupDate && (
                  <p className="text-perfect-red text-sm mt-1">{errors.pickupDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="pickupTime" className="block text-sm font-semibold text-perfect-gray mb-2">
                  Pick-up Time *
                </label>
                <input
                  {...register('pickupTime', { required: 'Pick-up time is required' })}
                  type="time"
                  className="input-field"
                />
                {errors.pickupTime && (
                  <p className="text-perfect-red text-sm mt-1">{errors.pickupTime.message}</p>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-semibold text-perfect-gray mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                {...register('specialRequests')}
                rows={4}
                className="input-field resize-none"
                placeholder="Any special requirements, accessibility needs, or requests..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full text-lg py-4 flex items-center justify-center gap-3 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Book Now
                </>
              )}
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-white rounded-2xl border-l-4 border-perfect-red">
            <div className="flex items-center gap-3 text-perfect-gray">
              <i className="fas fa-info-circle text-perfect-red"></i>
              <div>
                <p className="font-semibold">Need immediate assistance?</p>
                <p className="text-sm">Call us directly at <strong>{getBrandPhone('display')}</strong> for instant booking</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
