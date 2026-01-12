// Google Apps Script for InfinityWork Lead Generation Form
// Deploy this as a web app to receive form submissions

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (create one first or specify by ID)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Leads') || spreadsheet.insertSheet('Leads');
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Add the form data to the sheet
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.company,
      data.service,
      data.message
    ]);
    
    // Send email notification to mpumelelo@infinityworkitsolutions.com
    const emailBody = `
New Lead Submission from InfinityWork Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
🏢 Company: ${data.company || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Service Interested In:
${data.service}

💬 Message:
${data.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Submitted: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This lead has been automatically added to your Google Sheets.
Please respond within 24 hours for best conversion rates.
    `;
    
    MailApp.sendEmail({
      to: 'mpumelelo@infinityworkitsolutions.com',
      subject: `🚀 New Lead: ${data.name} - ${data.service}`,
      body: emailBody
    });
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('InfinityWork Lead Form Handler is Active');
}