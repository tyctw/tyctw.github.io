/**
 * Handles POST requests from the form submission
 * @param {object} e - The event object from Google Apps Script
 * @returns {TextOutput} JSON response
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Verify Turnstile token
  var turnstileToken = data.turnstileToken;
  var turnstileVerified = verifyTurnstileToken(turnstileToken);
  
  if (!turnstileVerified) {
    return ContentService.createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'message': 'Invalid Turnstile verification' 
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var timestamp = new Date();
  var email = data.email;
  var category = data.category;
  var description = data.description;
  var reportCode = data.reportCode;
  var status = "pending"; // Initial status

  // Add data to Google Spreadsheet
  sheet.appendRow([timestamp, email, category, description, reportCode, status]);

  // Send notification to Discord admin
  sendNotificationToDiscord(timestamp, email, category, description, reportCode);

  // Send email confirmation to the reporter
  sendEmailToReporter(email, timestamp, category, description, reportCode);

  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles GET requests for status checking
 * @param {object} e - The event object from Google Apps Script
 * @returns {TextOutput} JSON response with report status
 */
function doGet(e) {
  if (e.parameter.reportCode) {
    // Query functionality
    var reportCode = e.parameter.reportCode;
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();

    for (var i = 0; i < data.length; i++) {
      if (data[i][4] == reportCode) { // Assuming report code is in column 5 (index 4)
        return ContentService.createTextOutput(JSON.stringify({
          found: true,
          timestamp: data[i][0],
          email: data[i][1],
          category: data[i][2],
          description: data[i][3],
          reportCode: data[i][4],
          status: data[i][5] || "pending", // Default to pending if no status
          lastUpdated: data[i][6] || new Date().toISOString() // Last update timestamp
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // If no matching report code is found
    return ContentService.createTextOutput(JSON.stringify({
      found: false
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    // Default response
    return HtmlService.createHtmlOutput(
      "This web app is functioning correctly, but it's designed to handle POST requests for form submissions."
    );
  }
}

/**
 * Sends a notification to Discord when a new report is submitted
 * @param {Date} timestamp - Time of submission
 * @param {string} email - Reporter's email
 * @param {string} category - Report category
 * @param {string} description - Report description
 * @param {string} reportCode - Unique report code
 */
function sendNotificationToDiscord(timestamp, email, category, description, reportCode) {
  var webhookUrl = "https://discord.com/api/webhooks/1348990875992199208/13SXUCjiDHtPjz1I0TLn_CniwsFy2JUWcjQZAgaVo3xiSMklEbTEpCmOBRQHkLZzd9pU"; // Replace with your Discord Webhook URL
  
  var formattedTime = timestamp.toLocaleString();
  
  var message = {
    "content": "@here 🚨 **新的回報通知** 🚨",
    "embeds": [{
      "title": "📌 新的回報通知",
      "description": 
        "**回報代碼:** `" + reportCode + "`\n\n" + 
        "🔹 **時間:** `" + formattedTime + "`\n" +
        "📧 **回報者 Email:** `" + email + "`\n" +
        "📂 **分類:** `" + category + "`\n\n" +
        "📝 **描述:**\n```" + description + "```",
      "color": 16753920, // Orange
      "timestamp": new Date().toISOString(),
      "thumbnail": {
        "url": "https://cdn-icons-png.flaticon.com/512/2098/2098563.png" // You can change to an appropriate icon
      },
      "footer": {
        "text": "請盡快處理此回報 ⚠️",
        "icon_url": "https://cdn-icons-png.flaticon.com/512/190/190411.png" // Discord warning icon
      }
    }]
  };

  var options = {
    "method": "post",
    "payload": JSON.stringify(message),
    "contentType": "application/json"
  };

  // Send request to Discord Webhook
  UrlFetchApp.fetch(webhookUrl, options);
}

/**
 * Sends a confirmation email to the reporter
 * @param {string} email - Reporter's email
 * @param {Date} timestamp - Time of submission
 * @param {string} category - Report category
 * @param {string} description - Report description
 * @param {string} reportCode - Unique report code
 */
function sendEmailToReporter(email, timestamp, category, description, reportCode) {
  var subject = "感謝您的回報 - 回報代碼: " + reportCode;
  
  var body = `
    <html>
      <body style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; background-color: #f4f8fb; padding: 20px;">
        <div style="max-width: 600px; margin: auto; padding: 30px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header Section -->
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #007bff; font-size: 24px; margin: 0;">感謝您的回報</h2>
            <p style="font-size: 16px; color: #555;">您的回報代碼：<strong style="color: #d9534f;">${reportCode}</strong></p>
            <hr style="border-top: 2px solid #007bff; width: 50%; margin: 20px auto;">
          </div>

          <!-- Info Table Section -->
          <table style="width: 100%; border-collapse: collapse; border-spacing: 0; margin-top: 20px;">
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 15px; font-size: 14px; font-weight: bold; color: #555; border: 1px solid #ddd;">時間</td>
              <td style="padding: 15px; font-size: 14px; color: #333; border: 1px solid #ddd;">${timestamp.toLocaleString()}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 15px; font-size: 14px; font-weight: bold; color: #555; border: 1px solid #ddd;">分類</td>
              <td style="padding: 15px; font-size: 14px; color: #333; border: 1px solid #ddd;">${category}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 15px; font-size: 14px; font-weight: bold; color: #555; border: 1px solid #ddd;">描述</td>
              <td style="padding: 15px; font-size: 14px; color: #333; border: 1px solid #ddd;">${description}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 15px; font-size: 14px; font-weight: bold; color: #555; border: 1px solid #ddd;">回報代碼</td>
              <td style="padding: 15px; font-size: 16px; font-weight: bold; color: #d9534f; border: 1px solid #ddd; text-align: center;">${reportCode}</td>
            </tr>
            <tr style="background-color: #f8f9fa;">
              <td style="padding: 15px; font-size: 14px; font-weight: bold; color: #555; border: 1px solid #ddd;">狀態</td>
              <td style="padding: 15px; font-size: 14px; color: #f39c12; font-weight: bold; border: 1px solid #ddd;">處理中</td>
            </tr>
          </table>

          <!-- Check Status Section -->
          <div style="text-align: center; margin-top: 25px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
            <p style="margin: 0; font-size: 15px;">您可以隨時查詢回報進度：</p>
            <a href="https://tyctw.github.io/search?code=${reportCode}" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">查詢進度</a>
          </div>

          <!-- Footer Section -->
          <p style="margin-top: 20px; font-size: 14px; color: #555;">我們將儘快處理您的回報。如有任何問題，隨時聯繫我們。</p>
          <p style="text-align: center; font-size: 12px; color: #888;"> 請妥善保存您的回報代碼，以便日後查詢進度。</p>

          <hr style="border-top: 2px solid #007bff; width: 50%; margin: 30px auto;">
          <p style="text-align: center; font-size: 14px; color: #333;">此致，<br><strong>TYCTW會考落點分析</strong></p>
        </div>
      </body>
    </html>
  `;

  GmailApp.sendEmail(email, subject, "", { htmlBody: body });
}

/**
 * Verifies a Turnstile token with Cloudflare's API
 * @param {string} token - The Turnstile token to verify
 * @returns {boolean} Whether the token is valid
 */
function verifyTurnstileToken(token) {
  if (!token) return false;
  
  var secretKey = '0x4AAAAAABBmAnAWA7c5kmt9o7XzxdpAQvI';
  var response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: {
      secret: secretKey,
      response: token
    }
  });
  
  var result = JSON.parse(response.getContentText());
  return result.success === true;
}

/**
 * Updates the status of a report
 * @param {string} reportCode - The report code to update
 * @param {string} status - The new status value
 * @returns {boolean} Success status
 */
function updateReportStatus(reportCode, status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][4] == reportCode) { // Find the row with matching report code
      sheet.getRange(i + 1, 6).setValue(status); // Update status column (column 6)
      sheet.getRange(i + 1, 7).setValue(new Date()); // Update last modified timestamp
      
      // Optionally send email notification about status update
      sendStatusUpdateEmail(data[i][1], reportCode, status);
      return true;
    }
  }
  return false; // Report not found
}

/**
 * Sends an email notification when a report status is updated
 * @param {string} email - Reporter's email
 * @param {string} reportCode - Report code
 * @param {string} status - New status
 */
function sendStatusUpdateEmail(email, reportCode, status) {
  var statusMap = {
    "pending": { label: "處理中", color: "#f39c12" },
    "reviewing": { label: "審核中", color: "#3498db" },
    "inProgress": { label: "修復中", color: "#9b59b6" },
    "resolved": { label: "已解決", color: "#2ecc71" },
    "closed": { label: "已關閉", color: "#7f8c8d" }
  };
  
  var statusInfo = statusMap[status] || statusMap.pending;
  
  var subject = "回報狀態更新 - " + reportCode;
  
  var body = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #007bff;">回報狀態已更新</h2>
          <p>您的回報 <strong>${reportCode}</strong> 狀態已更新：</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;">
              <span style="font-weight: bold;">新狀態：</span> 
              <span style="display: inline-block; padding: 5px 10px; background-color: ${statusInfo.color}; color: white; border-radius: 20px; font-size: 14px;">
                ${statusInfo.label}
              </span>
            </p>
          </div>
          
          <p>您可以隨時在以下連結查看最新進度：</p>
          <p style="text-align: center;">
            <a href="https://tyctw.github.io/search?code=${reportCode}" 
               style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
              查看詳情
            </a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #777; font-size: 14px; text-align: center;">TYCTW會考落點分析系統</p>
        </div>
      </body>
    </html>
  `;
  
  GmailApp.sendEmail(email, subject, "", { htmlBody: body });
}