# WhatsApp Direct Messaging Setup

This guide shows you how to set up direct WhatsApp messaging (without opening the app) for your Perfect Limo Egypt booking system.

## 🚀 **Quick Setup Options**

### **Option 1: Twilio WhatsApp (Recommended - Easiest)**

1. **Sign up for Twilio:**

   - Go to [twilio.com](https://www.twilio.com)
   - Create a free account (includes $15 credit)

2. **Enable WhatsApp Sandbox:**

   - Go to Console → Messaging → Try it out → Send a WhatsApp message
   - Follow the setup instructions
   - You'll get a sandbox number like `whatsapp:+14155238886`

3. **Get your credentials:**

   - Account SID: Found in Console Dashboard
   - Auth Token: Found in Console Dashboard
   - WhatsApp Number: Your sandbox number

4. **Add to your `.env.local` file:**
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

### **Option 2: MessageBird WhatsApp**

1. **Sign up for MessageBird:**

   - Go to [messagebird.com](https://www.messagebird.com)
   - Create a free account

2. **Enable WhatsApp:**

   - Go to Dashboard → Channels → WhatsApp
   - Follow the verification process

3. **Get your credentials:**

   - API Key: Found in Dashboard → Settings → API access
   - WhatsApp Number: Your verified number

4. **Add to your `.env.local` file:**
   ```env
   MESSAGEBIRD_API_KEY=your_api_key_here
   MESSAGEBIRD_WHATSAPP_NUMBER=whatsapp:+your_number
   ```

### **Option 3: WhatsApp Business API (Advanced)**

1. **Apply for WhatsApp Business API:**

   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create a Facebook App
   - Apply for WhatsApp Business API access

2. **Get your credentials:**

   - Access Token: From your Facebook App
   - Phone Number ID: From WhatsApp Business API

3. **Add to your `.env.local` file:**
   ```env
   WHATSAPP_BUSINESS_TOKEN=your_access_token_here
   WHATSAPP_BUSINESS_PHONE_ID=your_phone_id_here
   ```

## 📱 **How It Works**

### **Current Behavior:**

- ✅ **If service configured:** Messages sent directly to WhatsApp (no app opening)
- ⚠️ **If no service:** Falls back to opening WhatsApp with pre-filled message

### **Message Flow:**

1. Customer submits booking form
2. System tries to send directly via configured service
3. If successful: Message appears in your WhatsApp
4. If failed: Opens WhatsApp with message ready to send

## 🔧 **Testing**

### **Test with Twilio Sandbox:**

1. Set up Twilio (Option 1 above)
2. Send a test booking
3. Check your WhatsApp for the message

### **Test with MessageBird:**

1. Set up MessageBird (Option 2 above)
2. Send a test booking
3. Check your WhatsApp for the message

## 💰 **Cost Comparison**

| Service               | Free Tier    | Cost per Message | Setup Difficulty |
| --------------------- | ------------ | ---------------- | ---------------- |
| **Twilio**            | $15 credit   | ~$0.005          | ⭐ Easy          |
| **MessageBird**       | 100 messages | ~$0.01           | ⭐⭐ Medium      |
| **WhatsApp Business** | Free         | Free             | ⭐⭐⭐ Hard      |

## 🎯 **Recommended Setup**

For **Perfect Limo Egypt**, I recommend **Twilio** because:

- ✅ Easy setup (5 minutes)
- ✅ $15 free credit (3,000 messages)
- ✅ Reliable service
- ✅ Good documentation

## 📋 **Complete .env.local Example**

```env
# Perfect Limo Egypt Environment Variables

# Google Sheets API Configuration
GOOGLE_SHEETS_API_KEY=AIzaSyBbPEoqSqH6QFSMh0SXEwTSc7eQLQlOXuY
GOOGLE_SHEET_ID=1Zxq9grRx5tAX6x8OvxeROHmXoZdsOH9T5PkfI6f84yc

# Company Contact Information
COMPANY_PHONE_PRIMARY=01283051333
COMPANY_PHONE_DISPLAY=+20 128 305 1333
COMPANY_WHATSAPP_NUMBER=201283051333
COMPANY_PHONE_FORMATTED=(+20) 128 305 1333

# WhatsApp Service (Choose ONE)
# Twilio (Recommended)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# OR MessageBird
# MESSAGEBIRD_API_KEY=your_messagebird_api_key
# MESSAGEBIRD_WHATSAPP_NUMBER=whatsapp:+your_number

# OR WhatsApp Business API
# WHATSAPP_BUSINESS_TOKEN=your_access_token
# WHATSAPP_BUSINESS_PHONE_ID=your_phone_id

# Email configuration
ADMIN_EMAIL=info@perfectlimoegypt.com
```

## 🚨 **Important Notes**

1. **Phone Number Format:** Always use international format (e.g., `201283051333` for Egypt)
2. **WhatsApp Number:** Must include `whatsapp:` prefix for Twilio/MessageBird
3. **Testing:** Start with Twilio sandbox for testing
4. **Production:** Upgrade to full WhatsApp Business API for production

## 🔄 **Current Status**

Right now, your system will:

- ✅ Try to send directly (if service configured)
- ⚠️ Fall back to opening WhatsApp (if no service)
- 📱 Show appropriate messages to users

**Next Step:** Choose a service above and add the credentials to your `.env.local` file!
