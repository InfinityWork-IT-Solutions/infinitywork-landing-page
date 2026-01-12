# Troubleshooting Google Sheets Integration

## Your Current Issue

Your form is submitting successfully (I can see the data in the console logs), but the Google Apps Script isn't receiving or processing it. Here's how to fix it:

## Step 1: Verify Apps Script Deployment

1. Go to your Google Apps Script project
2. Click **Deploy** > **Manage deployments**
3. Make sure:
   - ✅ Type is "Web app"
   - ✅ Execute as: **Me (your email)**
   - ✅ Who has access: **Anyone** (this is critical!)
   - ✅ The deployment is active (not disabled)

**Common Issue**: If "Who has access" is NOT set to "Anyone", the script will reject requests from your website.

## Step 2: Test the Apps Script Directly

Open a new browser tab and paste your Apps Script URL:
```
https://script.google.com/macros/s/AKfycbyKEKljnsOKzk_3WimSD-Jgx2VeXa7ApNyLP7FDYUyEvAD4vFde03YWm-eZHYCmK9hKrQ/exec
```

You should see: **"InfinityWork Lead Form Handler is Active"**

If you see an error or nothing happens, the deployment has issues.

## Step 3: Check Apps Script Code

Make sure the code in your Google Apps Script EXACTLY matches `google-apps-script.js`:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Leads') || spreadsheet.insertSheet('Leads');
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }
    
    // Add the form data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.company,
      data.service,
      data.message
    ]);
    
    // Send email
    MailApp.sendEmail({
      to: 'mpumelelo@infinityworkitsolutions.com',
      subject: \`🚀 New Lead: \${data.name} - \${data.service}\`,
      body: \`
New Lead Submission from InfinityWork Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: \${data.name}
📧 Email: \${data.email}
📞 Phone: \${data.phone}
🏢 Company: \${data.company || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Service Interested In:
\${data.service}

💬 Message:
\${data.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Submitted: \${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This lead has been automatically added to your Google Sheets.
Please respond within 24 hours for best conversion rates.
      \`
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('InfinityWork Lead Form Handler is Active');
}
```

## Step 4: Redeploy the Apps Script

If you made any changes:

1. Click **Deploy** > **Manage deployments**
2. Click the pencil/edit icon ✏️ on your existing deployment
3. Click **Version** > **New version**
4. Add description: "Fixed permissions"
5. Click **Deploy**
6. **Important**: The URL will stay the same, so you don't need to update `script.js`

## Step 5: Check Email Settings

Make sure:
- ✅ Your Google account can send emails via Apps Script
- ✅ The email `mpumelelo@infinityworkitsolutions.com` is correctly spelled
- ✅ Check your Gmail spam/junk folder

## Step 6: View Execution Logs

To see what's happening when forms are submitted:

1. In Google Apps Script editor
2. Click **Executions** (clock icon on the left sidebar)
3. You should see a log entry for each form submission
4. If there's an error, click on it to see details

## Common Errors and Fixes

### Error: "Exception: You do not have permission"
**Fix**: Redeploy with "Who has access" set to "Anyone"

### Error: "Cannot read property 'contents'"
**Fix**: Make sure the `doPost` function is spelled exactly as shown (case-sensitive)

### No error, but nothing happens
**Fix**: 
1. Check the spreadsheet is the one where the script is attached
2. Make sure you're not using a different Google account
3. Clear browser cache and try again

### Email not received
**Fix**:
1. Check spam folder
2. Verify email address in the code is correct
3. Try sending a test email from Apps Script:
   ```javascript
   function testEmail() {
     MailApp.sendEmail('mpumelelo@infinityworkitsolutions.com', 'Test', 'This is a test');
   }
   ```
   Then run this function from the Apps Script editor

## Step 7: Test Again

After making the fixes:

1. Go to your website
2. Fill out the contact form
3. Submit it
4. Check:
   - ✅ Google Sheet should have new row
   - ✅ Email should arrive within 1-2 minutes
   - ✅ Apps Script **Executions** log should show successful run

## Still Not Working?

If none of this works, try these advanced fixes:

1. **Create a brand new Apps Script deployment**:
   - Delete the old deployment
   - Create new deployment
   - Copy the NEW URL to `script.js` line 1
   - Restart your web server

2. **Check CORS issues**:
   - Open browser console (F12)
   - Look for CORS errors (red text)
   - If you see CORS errors, this is actually NORMAL with `mode: 'no-cors'` - the form should still work

3. **Test with a simpler version**:
   - Temporarily simplify the `doPost` function to just add to sheet (remove email)
   - See if that works
   - Then add email functionality back

## Need More Help?

If you're still stuck, please check the Apps Script execution logs and let me know what error message appears there. That will tell us exactly what's going wrong!