import { NextRequest, NextResponse } from 'next/server'

interface WhatsAppData {
  message: string
  phoneNumber?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: WhatsAppData = await request.json()
    
    // Get the target phone number (customer's phone or company's default from env)
    const companyWhatsApp = process.env.COMPANY_WHATSAPP_NUMBER || '201283051333'
    const targetPhone = data.phoneNumber || companyWhatsApp
    
    console.log('Company WhatsApp from env:', companyWhatsApp)
    console.log('Customer phone provided:', data.phoneNumber || 'None')
    console.log('Target phone selected:', targetPhone)
    
    // Try to send directly using WhatsApp Business API or service provider
    try {
      await sendWhatsAppDirectly(targetPhone, data.message)
      
      return NextResponse.json({
        success: true,
        message: 'WhatsApp message sent successfully',
        targetPhone,
        sent: true
      })
    } catch (directError) {
      console.log('Direct send failed, falling back to URL method:', directError)
      
      // Fallback: Create WhatsApp URL for manual sending
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(data.message)}`
      
      return NextResponse.json({
        success: true,
        whatsappUrl,
        targetPhone,
        message: 'WhatsApp message prepared (manual send required)',
        sent: false
      })
    }
    
  } catch (error) {
    console.error('WhatsApp API error:', error)
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    )
  }
}

// Function to send WhatsApp messages directly
async function sendWhatsAppDirectly(phoneNumber: string, message: string) {
  // Option 1: Using Twilio WhatsApp API
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    return await sendViaTwilio(phoneNumber, message)
  }
  
  // Option 2: Using MessageBird WhatsApp API
  if (process.env.MESSAGEBIRD_API_KEY) {
    return await sendViaMessageBird(phoneNumber, message)
  }
  
  // Option 3: Using WhatsApp Business API directly
  if (process.env.WHATSAPP_BUSINESS_TOKEN && process.env.WHATSAPP_BUSINESS_PHONE_ID) {
    return await sendViaWhatsAppBusinessAPI(phoneNumber, message)
  }
  
  // If no service is configured, throw error to trigger fallback
  throw new Error('No WhatsApp service configured')
}

// Twilio WhatsApp integration
async function sendViaTwilio(phoneNumber: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'
  
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: fromNumber,
      To: `whatsapp:${phoneNumber}`,
      Body: message,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Twilio error: ${response.statusText}`)
  }
  
  const result = await response.json()
  console.log('Message sent via Twilio:', result.sid)
  return result
}

// MessageBird WhatsApp integration
async function sendViaMessageBird(phoneNumber: string, message: string) {
  const apiKey = process.env.MESSAGEBIRD_API_KEY
  const fromNumber = process.env.MESSAGEBIRD_WHATSAPP_NUMBER || 'whatsapp:+14155238886'
  
  const response = await fetch('https://conversations.messagebird.com/v1/send', {
    method: 'POST',
    headers: {
      'Authorization': `AccessKey ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: `whatsapp:${phoneNumber}`,
      from: fromNumber,
      type: 'text',
      content: {
        text: message
      }
    }),
  })
  
  if (!response.ok) {
    throw new Error(`MessageBird error: ${response.statusText}`)
  }
  
  const result = await response.json()
  console.log('Message sent via MessageBird:', result.id)
  return result
}

// WhatsApp Business API integration
async function sendViaWhatsAppBusinessAPI(phoneNumber: string, message: string) {
  const accessToken = process.env.WHATSAPP_BUSINESS_TOKEN
  const phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID
  
  const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: {
        body: message
      }
    }),
  })
  
  if (!response.ok) {
    throw new Error(`WhatsApp Business API error: ${response.statusText}`)
  }
  
  const result = await response.json()
  console.log('Message sent via WhatsApp Business API:', result.messages[0].id)
  return result
}
