# Google Sheets & Email Integration Setup Guide

Follow these steps to connect your contact form to Google Sheets and receive email notifications.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "InfinityWork Leads" or any name you prefer
4. The script will automatically create a "Leads" sheet with headers when the first form is submitted

## Step 2: Open Apps Script Editor

1. In your Google Spreadsheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of the `google-apps-script.js` file from this project
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) and name your project "Lead Form Handler"

## Step 3: Deploy as Web App

1. Click on **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "InfinityWork Lead Form"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Important**: Copy the **Web app URL** that appears - you'll need this!
   - It will look like: `https://script.google.com/macros/s/AKfycbxxx.../exec`

## Step 4: Update Your Website

1. Open the `script.js` file in your Replit project
2. Find this line near the top of the file:
   ```javascript
   const FORM_SUBMISSION_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web app URL (keep the quotes)
4. Save the file

## Step 5: Test Your Form

1. Go to your website
2. Fill out the contact form with test data
3. Submit the form
4. Check:
   - ✅ Your Google Sheet should have a new row with the submission
   - ✅ You should receive an email at mpumelelo@infinityworkitsolutions.com
   - ✅ The form should show a success message

## Troubleshooting

### Form doesn't submit
- Make sure you've updated the `FORM_SUBMISSION_URL` in `script.js`
- Check that you deployed the Apps Script as "Anyone" can access
- Open browser console (F12) to check for errors

### Not receiving emails
- Check your Gmail spam folder
- Verify the email address in `google-apps-script.js` is correct (mpumelelo@infinityworkitsolutions.com)
- Make sure your Google account has permission to send emails via Apps Script

### Data not appearing in Google Sheets
- Make sure the spreadsheet is the one where you created the Apps Script
- Check the "Leads" sheet tab (it's created automatically)
- Review Apps Script execution logs: In Apps Script editor, click **Executions** on the left

## What Happens When Someone Submits the Form

1. **Form Data is Collected**: Name, email, phone, company, service, and message
2. **Sent to Google Apps Script**: Via HTTPS POST request
3. **Added to Google Sheets**: New row with timestamp and all form data
4. **Email Sent**: Formatted notification email sent to mpumelelo@infinityworkitsolutions.com
5. **Success Confirmation**: User sees success message on the website

## Security Note

The Google Apps Script web app URL is public but can only:
- Receive form submissions
- Write to your specific Google Sheet
- Send emails on your behalf

It cannot:
- Access other Google Drive files
- Delete or modify existing data (only append)
- Access any other Google services

## Viewing Your Leads

Simply open your "InfinityWork Leads" Google Spreadsheet anytime to see all submissions with:
- Timestamp (South African time)
- Full contact details
- Service interested in
- Message from potential client

You can sort, filter, and analyze this data just like any spreadsheet!