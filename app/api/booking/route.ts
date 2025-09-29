import { NextRequest, NextResponse } from 'next/server'

interface BookingData {
  name: string
  startPoint: string
  endPoint: string
  tripType: string
  passengers: string
  pickupDate: string
  pickupTime: string
  specialRequests?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'startPoint', 'endPoint', 'tripType', 'passengers', 'pickupDate', 'pickupTime']
    for (const field of requiredFields) {
      if (!data[field as keyof BookingData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send to Google Sheets
    // 3. Send email notifications
    // 4. Send WhatsApp message

    // For now, we'll just return success
    console.log('Booking received:', data)

    // Create booking confirmation message
    const bookingMessage = `
🚗 *Booking Confirmation*

Thank you ${data.name}! Your limousine booking request has been received.

📋 *Booking Details:*
• Pick-up: ${data.startPoint}
• Drop-off: ${data.endPoint}
• Trip Type: ${data.tripType === '1-way' ? 'One Way' : 'Round Trip'}
• Passengers: ${data.passengers}
• Date: ${data.pickupDate}
• Time: ${data.pickupTime}
${data.specialRequests ? `• Special Requests: ${data.specialRequests}` : ''}

📞 We will contact you shortly at: 01200272020

Perfect Company - Excellence in providing Limousine services
    `.trim()

    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully',
      bookingId: `PC${Date.now()}`,
      whatsappMessage: bookingMessage
    })

  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Google Sheets integration function
async function sendToGoogleSheets(data: BookingData) {
  // You'll need to set up Google Apps Script and get the web app URL
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL
  
  if (!GOOGLE_SCRIPT_URL) {
    console.log('Google Script URL not configured')
    return
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        status: 'new'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send to Google Sheets')
    }

    console.log('Data sent to Google Sheets successfully')
  } catch (error) {
    console.error('Google Sheets error:', error)
    throw error
  }
}

// Email sending function
async function sendEmail(data: BookingData) {
  // You can integrate with services like SendGrid, Resend, or Nodemailer
  const emailData = {
    to: process.env.ADMIN_EMAIL || 'info@perfectcompany.com',
    subject: `New Limousine Booking - ${data.name}`,
    html: `
      <h2>New Limousine Booking Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Pick-up Location:</strong> ${data.startPoint}</p>
      <p><strong>Drop-off Location:</strong> ${data.endPoint}</p>
      <p><strong>Trip Type:</strong> ${data.tripType === '1-way' ? 'One Way' : 'Round Trip'}</p>
      <p><strong>Passengers:</strong> ${data.passengers}</p>
      <p><strong>Date:</strong> ${data.pickupDate}</p>
      <p><strong>Time:</strong> ${data.pickupTime}</p>
      ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
      <p><strong>Booking Time:</strong> ${new Date().toLocaleString()}</p>
    `
  }

  console.log('Email to be sent:', emailData)
  
  // Implement your email service here
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  await sgMail.send(emailData)
  */
}
