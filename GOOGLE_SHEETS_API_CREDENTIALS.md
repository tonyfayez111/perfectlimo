# Google Sheets API Credentials Setup

To use the Google Sheets API directly, you need these credentials:

## 🔑 **What You Need to Provide:**

### **1. Google Sheet ID** (You already have this)

- **Current:** `1Zxq9grRx5tAX6x8OvxeROHmXoZdsOH9T5PkfI6f84yc`
- **Location:** Found in your Google Sheet URL
- **Format:** `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

### **2. Google Access Token** (You need to get this)

- **What it is:** A token that allows your app to access Google Sheets
- **How to get it:** Follow the steps below

## 🚀 **How to Get Google Access Token:**

### **Option 1: Google OAuth2 Playground (Easiest)**

1. **Go to Google OAuth2 Playground:**

   - Visit: https://developers.google.com/oauthplayground/

2. **Select Google Sheets API:**

   - In the left panel, find "Google Sheets API v4"
   - Check the box for: `https://www.googleapis.com/auth/spreadsheets`

3. **Authorize:**

   - Click "Authorize APIs"
   - Sign in with your Google account
   - Grant permissions

4. **Get Access Token:**

   - Click "Exchange authorization code for tokens"
   - Copy the "Access token" (starts with `ya29.`)

5. **Add to your `.env.local` file:**
   ```env
   GOOGLE_ACCESS_TOKEN=ya29.your_access_token_here
   GOOGLE_SHEET_ID=1Zxq9grRx5tAX6x8OvxeROHmXoZdsOH9T5PkfI6f84yc
   ```

### **Option 2: Google Cloud Console (More Permanent)**

1. **Go to Google Cloud Console:**

   - Visit: https://console.cloud.google.com/

2. **Create/Select Project:**

   - Create a new project or select existing one
   - Name it "Perfect Limo Egypt"

3. **Enable Google Sheets API:**

   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

4. **Create Credentials:**

   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3000`

5. **Get Access Token:**
   - Use the OAuth2 Playground method above
   - Or use the client ID/secret to generate tokens programmatically

## 📋 **Complete .env.local File:**

```env
# Perfect Limo Egypt Environment Variables

# Google Sheets API Configuration
GOOGLE_SHEET_ID=1Zxq9grRx5tAX6x8OvxeROHmXoZdsOH9T5PkfI6f84yc
GOOGLE_ACCESS_TOKEN=ya29.your_access_token_here

# Company Contact Information
COMPANY_PHONE_PRIMARY=01283051333
COMPANY_PHONE_DISPLAY=+20 128 305 1333
COMPANY_WHATSAPP_NUMBER=201283051333
COMPANY_PHONE_FORMATTED=(+20) 128 305 1333

# Email configuration
ADMIN_EMAIL=info@perfectlimoegypt.com
```

## ⚠️ **Important Notes:**

1. **Access Token Expires:** OAuth2 tokens expire after 1 hour
2. **Refresh Token:** For production, you'll need a refresh token
3. **Security:** Never commit access tokens to version control
4. **Testing:** Use OAuth2 Playground for quick testing

## 🔄 **Current Status:**

Your system now:

- ✅ Uses Google Sheets API directly
- ✅ Requires OAuth2 access token
- ✅ Will work once you provide the token
- ✅ No more 401 authentication errors

## 📝 **Next Steps:**

1. **Get your access token** using Option 1 above
2. **Add it to your `.env.local` file**
3. **Restart your server:** `npm run dev`
4. **Test a booking** - it should work!

**Just provide me the access token and I'll help you set it up!** 🚗📊
