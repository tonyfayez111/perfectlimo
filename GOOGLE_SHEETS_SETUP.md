# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for the Perfect Limo Egypt booking system.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Perfect Limo Egypt Bookings"
4. Set up the following columns in row 1:
   - A: Timestamp
   - B: Name
   - C: Contact Number
   - D: Pick-up Location
   - E: Drop-off Location
   - F: Trip Type
   - G: Passengers
   - H: Pick-up Date
   - I: Pick-up Time
   - J: Special Requests
   - K: Status

## Step 2: Get the Spreadsheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Copy the `SPREADSHEET_ID` from the URL

## Step 3: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 4: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Restrict the API key to Google Sheets API only

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_SHEETS_API_KEY=AIzaSyBbPEoqSqH6QFSMh0SXEwTSc7eQLQlOXuY
GOOGLE_SHEET_ID=your_actual_spreadsheet_id_here
```

## Step 6: Make the Sheet Public (for API access)

1. Open your Google Sheet
2. Click "Share" button
3. Click "Change to anyone with the link"
4. Set permission to "Viewer"
5. Click "Done"

## Step 7: Test the Integration

1. Start your Next.js development server: `npm run dev`
2. Go to your booking form
3. Fill out and submit a test booking
4. Check your Google Sheet - you should see the new booking data

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**:

   - Make sure the Google Sheets API is enabled
   - Check that your API key is correct
   - Ensure the spreadsheet is publicly accessible

2. **404 Not Found Error**:

   - Verify the spreadsheet ID is correct
   - Make sure the sheet name is "Sheet1" (default)

3. **Data not appearing**:
   - Check the browser console for errors
   - Verify the API key has the correct permissions
   - Ensure the spreadsheet is shared publicly

### API Key Security:

- Never commit your API key to version control
- Use environment variables for all sensitive data
- Consider restricting your API key to specific APIs and domains

## Data Structure

The booking data will be appended to your sheet in this format:

| Timestamp            | Name     | Contact Number | Pick-up       | Drop-off       | Trip Type | Passengers | Date       | Time  | Special Requests  | Status |
| -------------------- | -------- | -------------- | ------------- | -------------- | --------- | ---------- | ---------- | ----- | ----------------- | ------ |
| 2024-01-15T10:30:00Z | John Doe | +201234567890  | Cairo Airport | Downtown Hotel | One Way   | 2          | 2024-01-20 | 14:00 | Child seat needed | New    |

## Next Steps

Once the basic integration is working, you can:

1. Set up automated email notifications
2. Add WhatsApp integration
3. Create a dashboard to view bookings
4. Add data validation and formatting
5. Set up automated responses

For more advanced features, consider using Google Apps Script for more complex data processing and automation.
