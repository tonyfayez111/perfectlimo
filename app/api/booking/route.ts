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

    // Send to Google Sheets
    try {
      await sendToGoogleSheets(data)
      console.log('Booking data sent to Google Sheets successfully')
    } catch (error) {
      console.error('Failed to send to Google Sheets:', error)
      // Continue with the booking even if Google Sheets fails
    }

    // Send email notification
    try {
      await sendEmail(data)
      console.log('Email notification sent successfully')
    } catch (error) {
      console.error('Failed to send email:', error)
      // Continue with the booking even if email fails
    }

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
  const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY || 'AIzaSyBbPEoqSqH6QFSMh0SXEwTSc7eQLQlOXuY'
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || 'your-spreadsheet-id' // You'll need to create a spreadsheet and get its ID
  
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'your-spreadsheet-id') {
    console.log('Google Sheet ID not configured')
    return
  }

  try {
    // Prepare the data for Google Sheets
    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.name,
        data.startPoint,
        data.endPoint,
        data.tripType === '1-way' ? 'One Way' : 'Round Trip',
        data.passengers,
        data.pickupDate,
        data.pickupTime,
        data.specialRequests || '',
        'New' // Status
      ]
    ]

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:J:append?valueInputOption=USER_ENTERED&key=${GOOGLE_SHEETS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to send to Google Sheets: ${errorData.error?.message || response.statusText}`)
    }

    const result = await response.json()
    console.log('Data sent to Google Sheets successfully:', result)
    return result
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
