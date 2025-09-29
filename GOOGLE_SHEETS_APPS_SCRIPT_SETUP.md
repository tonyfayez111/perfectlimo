# Google Sheets Integration Setup (Google Apps Script)

This guide will help you set up Google Sheets integration using Google Apps Script, which is much easier than OAuth2 authentication.

## 🚀 **Quick Setup (5 minutes)**

### **Step 1: Create Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Perfect Limo Egypt Bookings"
4. Set up these columns in row 1:
   ```
   A: Timestamp
   B: Name
   C: Contact Number
   D: Pick-up Location
   E: Drop-off Location
   F: Trip Type
   G: Passengers
   H: Pick-up Date
   I: Pick-up Time
   J: Special Requests
   K: Status
   ```

### **Step 2: Create Google Apps Script**

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the code from `google-apps-script.js`
4. **IMPORTANT:** Update the `SHEET_ID` in the script:
   ```javascript
   const SHEET_ID = "YOUR_ACTUAL_SHEET_ID_HERE";
   ```
   - To get your Sheet ID: Look at the URL of your Google Sheet
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

### **Step 3: Deploy as Web App**

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set these options:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click "Deploy"
5. **Copy the Web App URL** - it looks like:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### **Step 4: Update Your Environment**

Add this to your `.env.local` file:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### **Step 5: Test the Integration**

1. Restart your Next.js server: `npm run dev`
2. Submit a test booking
3. Check your Google Sheet - you should see the new booking!

## 📋 **Complete Setup Checklist**

- [ ] Google Sheet created with correct columns
- [ ] Google Apps Script created with your Sheet ID
- [ ] Script deployed as Web App
- [ ] Web App URL copied
- [ ] Environment variable added to `.env.local`
- [ ] Next.js server restarted
- [ ] Test booking submitted
- [ ] Data appears in Google Sheet

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Script not found" error:**

   - Make sure you deployed the script as a Web App
   - Check that the URL is correct

2. **"Permission denied" error:**

   - Make sure "Who has access" is set to "Anyone"
   - Redeploy the script

3. **Data not appearing:**

   - Check the Sheet ID in the script
   - Make sure the sheet has the correct column headers
   - Check the Apps Script logs

4. **"Script execution failed":**
   - Check the Apps Script logs in the Google Apps Script editor
   - Make sure your Google Sheet is accessible

### **Testing the Script:**

1. Go to your Google Apps Script project
2. Click "Run" to test the `doGet` function
3. Check the logs for any errors
4. Test with a sample booking data

## 📊 **Data Format**

Your Google Sheet will receive data in this format:

| Timestamp            | Name     | Contact       | Pick-up       | Drop-off       | Trip Type | Passengers | Date       | Time  | Special Requests  | Status |
| -------------------- | -------- | ------------- | ------------- | -------------- | --------- | ---------- | ---------- | ----- | ----------------- | ------ |
| 2024-01-15T10:30:00Z | John Doe | +201234567890 | Cairo Airport | Downtown Hotel | One Way   | 2          | 2024-01-20 | 14:00 | Child seat needed | New    |

## 🎯 **Benefits of This Approach**

- ✅ **No OAuth2 setup required**
- ✅ **No API keys needed**
- ✅ **Free to use**
- ✅ **Easy to modify**
- ✅ **Real-time data updates**
- ✅ **Automatic error handling**

## 🔄 **Current Status**

Your system now:

- ✅ Sends booking data to Google Apps Script
- ✅ Apps Script adds data to Google Sheet
- ✅ No more 401 authentication errors
- ✅ Simple and reliable integration

## 📝 **Next Steps**

1. Follow the setup guide above
2. Test with a few bookings
3. Customize the Google Sheet as needed
4. Set up automated notifications if desired

**You're all set!** Your Google Sheets integration will work perfectly once you complete the setup steps above. 🚗📊
