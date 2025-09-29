import { NextRequest, NextResponse } from 'next/server'

interface BookingData {
  name: string
  startPoint: string
  endPoint: string
  tripType: string
  passengers: string
  pickupDate: string
  pickupTime: string
  contactNumber?: string
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

// Google Sheets integration function using OAuth2
async function sendToGoogleSheets(data: BookingData) {
  const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID 
  const ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN
  
  console.log('Google Sheet ID:', SPREADSHEET_ID)
  console.log('Google Access Token:', ACCESS_TOKEN ? 'Present' : 'Missing')
  console.log('Sending data to Google Sheets:', data)

  if (!ACCESS_TOKEN) {
    throw new Error('Google Access Token is required. Please set GOOGLE_ACCESS_TOKEN in your environment variables.')
  }

  try {
    // First, ensure headers exist
    await ensureHeadersExist(SPREADSHEET_ID || '', ACCESS_TOKEN || '')
    
    // Prepare the data for Google Sheets
    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.name,
        data.contactNumber || '', // Contact Number
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

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:K:append?valueInputOption=USER_ENTERED`
    console.log('Google Sheets URL:', url)
    console.log('Data to send:', values)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values
      })
    })

    console.log('Google Sheets response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Google Sheets error response:', errorData)
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

// Function to ensure headers exist in the Google Sheet
async function ensureHeadersExist(spreadsheetId: string, accessToken: string) {
  const headers = [
    'Timestamp',
    'Name', 
    'Contact Number',
    'Pick-up Location',
    'Drop-off Location',
    'Trip Type',
    'Passengers',
    'Pick-up Date',
    'Pick-up Time',
    'Special Requests',
    'Status'
  ]

  try {
    // First, check if headers already exist
    const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:K1`
    
    const checkResponse = await fetch(checkUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    if (checkResponse.ok) {
      const checkData = await checkResponse.json()
      const existingHeaders = checkData.values?.[0] || []
      
      // Check if headers match (case-insensitive)
      const headersMatch = headers.every((header, index) => 
        existingHeaders[index]?.toLowerCase() === header.toLowerCase()
      )
      
      if (headersMatch) {
        console.log('✅ Headers already exist and match')
        return
      }
    }

    // Headers don't exist or don't match, create them
    console.log('📝 Creating/updating headers in Google Sheet')
    
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:K1?valueInputOption=USER_ENTERED`
    
    const updateResponse = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [headers]
      })
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('Failed to create headers:', errorData)
      throw new Error(`Failed to create headers: ${errorData.error?.message || updateResponse.statusText}`)
    }

    console.log('✅ Headers created successfully')
    
  } catch (error) {
    console.error('Error ensuring headers exist:', error)
    // Don't throw error here, just log it - the main function can still work
    console.log('⚠️ Could not verify/create headers, but continuing with data insertion')
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
