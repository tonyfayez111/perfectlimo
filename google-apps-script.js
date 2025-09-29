/**
 * Google Apps Script for Perfect Limo Egypt Booking System
 * This script receives booking data via POST request and adds it to Google Sheets
 */

// Replace this with your actual Google Sheet ID
const SHEET_ID = '1Zxq9grRx5tAX6x8OvxeROHmXoZdsOH9T5PkfI6f84yc';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      new Date().toISOString(), // Timestamp
      data.name || '',
      data.contactNumber || '',
      data.startPoint || '',
      data.endPoint || '',
      data.tripType === '1-way' ? 'One Way' : 'Round Trip',
      data.passengers || '',
      data.pickupDate || '',
      data.pickupTime || '',
      data.specialRequests || '',
      'New' // Status
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Booking added successfully',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Perfect Limo Egypt Booking API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}