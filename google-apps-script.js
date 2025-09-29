/**
 * Google Apps Script for Perfect Company Limousine Booking
 * This script receives booking data from the website and stores it in Google Sheets
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Add headers in row 1: Timestamp, Name, Pick-up Location, Drop-off Location, Trip Type, Passengers, Date, Time, Special Requests, Status
 * 3. Go to script.google.com and create a new project
 * 4. Replace the default code with this script
 * 5. Update the SHEET_ID constant below with your Google Sheet ID
 * 6. Deploy as a web app with execute permissions for "Anyone"
 * 7. Copy the web app URL to your Next.js environment variables
 */

// Replace with your Google Sheet ID
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name || '',
      data.startPoint || '',
      data.endPoint || '',
      data.tripType || '',
      data.passengers || '',
      data.pickupDate || '',
      data.pickupTime || '',
      data.specialRequests || '',
      'New' // Status
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Booking received successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing booking:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  try {
    const emailSubject = `New Limousine Booking - ${data.name}`;
    const emailBody = `
New limousine booking received:

Customer Details:
- Name: ${data.name}
- Pick-up Location: ${data.startPoint}
- Drop-off Location: ${data.endPoint}
- Trip Type: ${data.tripType === '1-way' ? 'One Way' : 'Round Trip'}
- Number of Passengers: ${data.passengers}
- Date: ${data.pickupDate}
- Time: ${data.pickupTime}
- Special Requests: ${data.specialRequests || 'None'}

Booking received at: ${new Date().toLocaleString()}

Please contact the customer to confirm the booking.

---
Perfect Company - Excellence in providing Limousine services
Phone: 01200272020
    `;
    
    // Send email to admin
    MailApp.sendEmail({
      to: 'info@perfectcompany.com', // Update with your email
      subject: emailSubject,
      body: emailBody
    });
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Test function - you can run this to test the script
function testBooking() {
  const testData = {
    name: 'John Doe',
    startPoint: 'Airport Terminal 1',
    endPoint: 'Downtown Hotel',
    tripType: '1-way',
    passengers: '2',
    pickupDate: '2024-01-15',
    pickupTime: '14:30',
    specialRequests: 'Need child seat'
  };
  
  const testEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(testEvent);
  console.log('Test result:', result.getContent());
}

// Function to get all bookings (useful for dashboard)
function getAllBookings() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Convert to JSON format
    const headers = data[0];
    const bookings = data.slice(1).map(row => {
      const booking = {};
      headers.forEach((header, index) => {
        booking[header] = row[index];
      });
      return booking;
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
}

// Function to update booking status
function updateBookingStatus(rowNumber, status) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const statusColumn = 10; // Assuming status is in column J (10th column)
    
    sheet.getRange(rowNumber, statusColumn).setValue(status);
    
    return {
      success: true,
      message: `Booking status updated to ${status}`
    };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Web app entry point for GET requests (optional - for status checking)
function doGet(e) {
  const action = e.parameter.action;
  
  switch (action) {
    case 'status':
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'active',
          timestamp: new Date().toISOString(),
          message: 'Perfect Company Booking System is running'
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    case 'bookings':
      const bookings = getAllBookings();
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          bookings: bookings
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    default:
      return ContentService
        .createTextOutput(JSON.stringify({
          error: 'Invalid action parameter'
        }))
        .setMimeType(ContentService.MimeType.JSON);
  }
}
