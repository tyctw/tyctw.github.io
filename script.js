// Vocational groups data definition
const vocationalGroups = {
  '機械群': ['機械科', '鑄造科', '板金科', '機械木模科', '配管科', '模具科', '機電科', '製圖科', '生物產業機電科', '電腦機械製圖科'],
  '動力機械群': ['汽車科', '重機科', '飛機修護科', '動力機械科', '農業機械科', '軌道車輛科'],
  '電機與電子群': ['資訊科', '電子科', '控制科', '電機科', '冷凍空調科', '航空電子科', '電機空調科'],
  '化工群': ['化工科', '紡織科', '染整科'],
  '土木與建築群': ['建築科', '土木科', '消防工程科', '空間測繪科'],
  '商業與管理群': ['商業經營科', '國際貿易科', '會計事務科', '資料處理科', '不動產事務科', '電子商務科', '流通管理科', '農產行銷科', '航運管理科'],
  '外語群': ['應用外語科（英文組）', '應用外語科（日文組）'],
  '設計群': ['家具木工科', '美工科', '陶瓷工程科', '室內空間設計科', '圖文傳播科', '金屬工藝科', '家具設計科', '廣告設計科', '多媒體設計科', '多媒體應用科', '室內設計科'],
  '農業群': ['農場經營科', '園藝科', '森林科', '野生動物保育科', '造園科', '畜產保健科'],
  '食品群': ['食品加工科', '食品科', '水產食品科', '烘焙科'],
  '家政群': ['家政科', '服裝科', '幼兒保育科', '美容科', '時尚模特兒科', '流行服飾科', '時尚造型科', '照顧服務科'],
  '餐旅群': ['觀光事業科', '餐飲管理科']
};

// Utility functions and event handlers

function toggleVocationalGroup() {
  const schoolType = document.getElementById('schoolType').value;
  const vocationalGroupContainer = document.getElementById('vocationalGroupContainer');
  const vocationalGroup = document.getElementById('vocationalGroup');

  if (schoolType === '職業類科') {
    vocationalGroupContainer.style.display = 'block';
  } else {
    vocationalGroupContainer.style.display = 'none';
    vocationalGroup.value = 'all';
  }
}

function toggleInstructions() {
  var instructionsModal = document.getElementById('instructionsModal');
  instructionsModal.style.display = 'block';
  
  // Log this action
  logUserActivity('view_instructions');
}

function closeInstructions() {
  var instructionsModal = document.getElementById('instructionsModal');
  instructionsModal.style.display = 'none';
}

// Close instructions modal when clicking outside of it
window.addEventListener('click', function(event) {
  var instructionsModal = document.getElementById('instructionsModal');
  if (event.target == instructionsModal) {
    closeInstructions();
  }
});

function showDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  modal.style.display = 'block';
}

function closeDisclaimer() {
  var modal = document.getElementById('disclaimerModal');
  modal.style.display = 'none';
}

function showInvitationValidationAnimation() {
  const invitationGroup = document.getElementById('invitationCode').closest('.form-group');
  if (!invitationGroup) return;
  invitationGroup.style.position = 'relative';
  const overlay = document.createElement('div');
  overlay.id = 'invitationValidationOverlay';
  overlay.className = 'validation-overlay';
  overlay.innerHTML = `
    <div class="validation-spinner"></div>
    <div class="validation-text">驗證邀請碼中...</div>
  `;
  invitationGroup.appendChild(overlay);
}

function hideInvitationValidationAnimation() {
  const overlay = document.getElementById('invitationValidationOverlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

function showLoading() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  
  loadingOverlay.innerHTML = `
    <div class="loading-spinner-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">分析中，請稍候...</div>
      <div class="loading-progress"></div>
      <div class="loading-steps">
        <div class="loading-step" data-step="1">
          <i class="fas fa-check-circle"></i>
          <span>驗證邀請碼</span>
        </div>
        <div class="loading-step" data-step="2">
          <i class="fas fa-check-circle"></i>
          <span>計算總積分</span>
        </div>
        <div class="loading-step" data-step="3">
          <i class="fas fa-check-circle"></i>
          <span>分析落點區間</span>
        </div>
        <div class="loading-step" data-step="4">
          <i class="fas fa-check-circle"></i>
          <span>生成分析報告</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(loadingOverlay);
  
  requestAnimationFrame(() => {
    loadingOverlay.style.display = 'flex';
    simulateLoadingSteps();
  });
}

function simulateLoadingSteps() {
  const steps = document.querySelectorAll('.loading-step');
  const stepDelay = 500; // Time between each step

  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('active');
    }, stepDelay * (index + 1));
  });
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.opacity = '0';
    loadingOverlay.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      loadingOverlay.remove();
    }, 300);
  }
}

async function logUserActivity(action, details = {}) {
  try {
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const viewportSize = `${window.innerWidth}x${window.innerHeight}`;
    const timestamp = new Date().toISOString();
    const language = navigator.language;
    const platform = navigator.platform;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const colorDepth = window.screen.colorDepth;
    const hardwareConcurrency = navigator.hardwareConcurrency || null;
    const connection = navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData
    } : {};

    const data = {
      timestamp,
      action,
      userAgent,
      screenResolution,
      viewportSize,
      darkMode: document.body.classList.contains('dark-mode'),
      language,
      platform,
      timeZone,
      colorDepth,
      hardwareConcurrency,
      connection,
      ...details
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbyTQFk7R5Tuthm9Y2oVIMpz3c7vR-BEHxa9X9gEgZio_cLgxZgi8LD3aonQUMLIKZDC/exec', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to log activity');
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

async function analyzeScores() {
  const analyzeButton = document.getElementById('analyzeButton');
  if (analyzeButton) {
    analyzeButton.disabled = true;
    analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 分析中...';
  }

  try {
    const invitationCode = document.getElementById('invitationCode').value;
    if (!invitationCode.trim()) {
      alert("請填寫邀請碼");
      return;
    }
    
    // Validate invitation code with animation
    showInvitationValidationAnimation();
    let validationResponse;
    try {
      validationResponse = await fetch('https://script.google.com/macros/s/AKfycbx8_7mRA3AhKoq_GUuoeYrlxCVKIqzBPJg4335_bIbpYg-mGCkmppvXNSZwyVXERWXA/exec', {
        method: 'POST',
        body: JSON.stringify({
          action: 'validateInvitationCode',
          invitationCode: invitationCode
        })
      });
    } catch (error) {
      hideInvitationValidationAnimation();
      throw error;
    }
    hideInvitationValidationAnimation();

    if (!validationResponse.ok) {
      throw new Error('邀請碼驗證失敗');
    }

    const validationResult = await validationResponse.json();
    if (!validationResult.valid) {
      alert('邀請碼錯誤或已過期，請確認最新的邀請碼。');
      return;
    }
    
    showLoading();

    const schoolOwnership = document.getElementById('schoolOwnership').value;
    const schoolType = document.getElementById('schoolType').value;
    const vocationalGroup = document.getElementById('vocationalGroup').value;
    const analysisIdentity = document.getElementById('analysisIdentity').value;

    const fields = ['chinese', 'english', 'math', 'science', 'social', 'composition'];
    let isAllFieldsFilled = true;
    let emptyFields = [];

    fields.forEach(field => {
      const value = document.getElementById(field).value;
      if (value === "") {
        isAllFieldsFilled = false;
        emptyFields.push(field);
      }
    });

    if (!isAllFieldsFilled) {
      let errorMessage = '請填寫以下欄位會考成績：\n';
      const fieldNames = {
        'chinese': '國文',
        'english': '英文',
        'math': '數學',
        'science': '自然',
        'social': '社會',
        'composition': '作文'
      };
      emptyFields.forEach(field => {
        errorMessage += `- ${fieldNames[field]}\n`;
      });
      alert(errorMessage);
      return;
    }

    await logUserActivity('analyze_scores', {
      scores: {
        chinese: document.getElementById('chinese').value,
        english: document.getElementById('english').value,
        math: document.getElementById('math').value,
        science: document.getElementById('science').value,
        social: document.getElementById('social').value,
        composition: document.getElementById('composition').value
      },
      filters: {
        schoolOwnership,
        schoolType,
        vocationalGroup,
        analysisIdentity
      }
    });

    const scores = {
      chinese: document.getElementById('chinese').value,
      english: document.getElementById('english').value,
      math: document.getElementById('math').value,
      science: document.getElementById('science').value,
      social: document.getElementById('social').value,
      composition: parseInt(document.getElementById('composition').value)
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycby1jUbZpuv5ltuQiGpsFCziEdTJJt9CyrQYG8vGdsu_PSpTk7VaYGbJUM01J-_l4_fcnQ/exec', {
      method: 'POST',
      body: JSON.stringify({
        scores,
        filters: {
          schoolOwnership,
          schoolType,
          vocationalGroup,
          analysisIdentity
        }
      })
    });

    if (!response.ok) {
      throw new Error('無法取得學校資料');
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    await logUserActivity('analyze_error', { error: error.message });
    alert('發生錯誤：' + error.message);
  } finally {
    if (analyzeButton) {
      analyzeButton.disabled = false;
      analyzeButton.innerHTML = '<i class="fas fa-search icon"></i>分析落點';
    }
    setTimeout(hideLoading, 2000);
  }
}

document.getElementById('exportResults').onclick = showExportOptions;

function printResults() {
  logUserActivity('print_results');
  
  // Create a print-friendly version
  const resultsElement = document.getElementById('results');
  const printWindow = window.open('', '_blank');
  
  // Get current date and time
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false 
  });
  
  // Create print content with styling
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>桃聯區會考落點分析結果</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
        body {
          font-family: 'Noto Sans TC', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 10px;
          border-bottom: 2px solid #3498db;
          position: relative;
        }
        .header-logo {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          background-color: #3498db;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .watermark {
          text-align: center;
          border: 2px solid #3498db;
          padding: 15px;
          margin-bottom: 30px;
          background-color: #f8f9fa;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }
        .watermark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 25%, transparent 25%, transparent 50%, rgba(52, 152, 219, 0.1) 50%, rgba(52, 152, 219, 0.1) 75%, transparent 75%);
          background-size: 20px 20px;
          opacity: 0.3;
          z-index: -1;
        }
        /* Floating watermark */
        .floating-watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 60px;
          color: rgba(52, 152, 219, 0.1);
          white-space: nowrap;
          pointer-events: none;
          z-index: 1000;
          font-weight: bold;
          text-transform: uppercase;
        }
        h1, h2, h3 {
          color: #3498db;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 5px;
        }
        h2 {
          font-size: 22px;
          margin-top: 30px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        h3 {
          font-size: 18px;
          margin-top: 25px;
        }
        .result-card {
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .school-item {
          margin: 10px 0;
          padding: 15px;
          border-left: 3px solid #3498db;
          background-color: #f8f9fa;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          page-break-inside: avoid;
        }
        .school-name {
          font-weight: bold;
          color: #2c3e50;
          font-size: 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        .school-name i {
          margin-right: 8px;
          color: #3498db;
        }
        .school-ownership {
          display: inline-block;
          background-color: #eef2f7;
          color: #7f8c8d;
          font-size: 12px;
          padding: 2px 6px;
          margin-left: 8px;
          border-radius: 3px;
        }
        .school-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
          color: #7f8c8d;
          font-size: 14px;
        }
        .cutoff-score {
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          padding: 3px 8px;
          border-radius: 3px;
        }
        .cutoff-score i {
          margin-right: 5px;
          color: #e74c3c;
        }
        .school-type-card {
          margin-bottom: 25px;
          padding: 15px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: white;
          page-break-inside: avoid;
        }
        .school-type-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        .school-type-header h4 {
          margin: 0 10px;
          color: #2c3e50;
        }
        .school-count {
          background: #3498db;
          color: white;
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 12px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          margin-top: 50px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          color: #7f8c8d;
        }
        .scores-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .score-item {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 2px solid #3498db;
        }
        .score-value {
          font-weight: bold;
          padding: 3px 8px;
          border-radius: 3px;
        }
        .score-excellent { background: #2ecc71; color: white; }
        .score-great { background: #3498db; color: white; }
        .score-good { background: #9b59b6; color: white; }
        .score-above-average { background: #f1c40f; color: black; }
        .score-average { background: #e67e22; color: white; }
        .score-below-average { background: #e74c3c; color: white; }
        .score-needs-improvement { background: #c0392b; color: white; }
        .page-number {
          text-align: center;
          font-size: 12px;
          color: #95a5a6;
          margin-top: 20px;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
          .floating-watermark {
            display: block !important;
            color: rgba(52, 152, 219, 0.1);
          }
          .school-item, .school-type-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          @page {
            margin: 1.5cm;
          }
          .page-number:before {
            content: "第 " counter(page) " 頁";
          }
        }
      </style>
    </head>
    <body>
      <div class="floating-watermark">TYCTW 桃聯區會考落點分析系統</div>
      <div class="header">
        <div class="header-logo"><i class="fas fa-chart-line"></i></div>
        <h1>桃聯區會考落點分析結果</h1>
        <p>產生時間: ${dateTime}</p>
      </div>
      <div class="watermark">
        <p><strong>TYCTW 桃聯區會考落點分析系統</strong></p>
        <p>以下資料僅供參考，不代表實際錄取結果</p>
        <p>更多資訊請訪問: <a href="https://rcpett.vercel.app/" target="_blank">https://rcpett.vercel.app/</a></p>
      </div>
      <div class="content">
        ${resultsElement.innerHTML}
      </div>
      <div class="footer">
        <p> 2023 TYCTW桃聯區會考落點分析系統. All rights reserved.</p>
        <p>本分析結果僅供參考，不代表實際錄取結果。</p>
        <p>更多資訊: <a href="https://rcpett.vercel.app/" target="_blank">https://rcpett.vercel.app/</a></p>
      </div>
      <div class="page-number"></div>
      <div class="no-print">
        <button onclick="window.print();return false;" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 20px 0; display: block; width: 100%; font-size: 16px;">
          <i class="fas fa-print" style="margin-right: 8px;"></i> 列印此頁
        </button>
        <button onclick="window.close();" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 20px 0; display: block; width: 100%; font-size: 16px;">
          <i class="fas fa-times" style="margin-right: 8px;"></i> 關閉
        </button>
      </div>
    </body>
    </html>
  `);
  
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.focus();
  }, 300);
}

function showExportOptions() {
  const exportMenu = document.createElement('div');
  exportMenu.className = 'export-menu';
  exportMenu.innerHTML = `
    <div class="export-menu-content">
      <h3><i class="fas fa-file-export"></i> 選擇匯出格式</h3>
      <button onclick="exportResults('txt')">
        <i class="fas fa-file-alt"></i> 文字檔 (.txt)
      </button>
      <button onclick="exportResults('pdf')">
        <i class="fas fa-file-pdf"></i> PDF檔 (.pdf)
      </button>
      <button onclick="exportResults('csv')">
        <i class="fas fa-file-csv"></i> CSV檔 (.csv)
      </button>
      <button onclick="exportResults('json')">
        <i class="fas fa-file-code"></i> JSON檔 (.json)
      </button>
      <button onclick="printResults()">
        <i class="fas fa-print"></i> 列印結果
      </button>
      <button onclick="closeExportMenu()" class="cancel-button">
        <i class="fas fa-times"></i> 取消
      </button>
    </div>
  `;
  document.body.appendChild(exportMenu);
  
  requestAnimationFrame(() => {
    exportMenu.classList.add('show');
  });
}

function closeExportMenu() {
  const exportMenu = document.querySelector('.export-menu');
  if (exportMenu) {
    exportMenu.classList.remove('show');
    setTimeout(() => exportMenu.remove(), 300);
  }
}

async function exportResults(format = 'txt') {
  logUserActivity('export_results', { format });
  const resultsElement = document.getElementById('results');
  const resultsText = resultsElement.innerText;
  
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const watermark =
    "********************************\n" +
    "*                              *\n" +
    "*  TYCTW 桃聯區會考落點分析系統  *\n" +
    "*       以下資料僅供參考      *\n" +
    "*                              *\n" +
    `*   產生時間: ${dateTime}   *\n` +
    "*                              *\n" +
    "* https://rcpett.vercel.app/  *\n" +
    "*                              *\n" +
    "********************************\n\n";
  
  const contentWithWatermark = watermark + resultsText;
  
  switch (format) {
    case 'txt':
      exportTxt(contentWithWatermark);
      break;
    case 'pdf':
      await exportPdf(contentWithWatermark);
      break;
    case 'csv':
      exportCsv(resultsText);
      break;
    case 'json':
      exportJson(resultsText);
      break;
  }
}

async function exportPdf(content) {
  try {
    // Check if jsPDF is already loaded
    if (!window.jspdf) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    }
    
    // Create new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add fancy header with logo
    doc.setFillColor(52, 152, 219);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('桃聯區會考落點分析結果', 105, 15, { align: 'center' });
    
    // Add decoration line
    doc.setDrawColor(231, 76, 60);
    doc.setLineWidth(1);
    doc.line(20, 35, 190, 35);
    
    // Add metadata
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`產生日期: ${new Date().toLocaleString('zh-TW')}`, 20, 42);
    
    // Reset text properties for content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    const websiteInfo = "更多資訊請訪問: https://rcpett.vercel.app/";
    const splitText = doc.splitTextToSize(content, 170);
    let y = 50;
    
    // Add watermark to first page
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(60);
    doc.setTextColor(230, 230, 230);
    doc.saveGraphicsState();
    doc.rotate(-45, 105, 150);
    doc.text('TYCTW', 70, 150);
    doc.restoreGraphicsState();
    
    // Reset for content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    // Add scores summary box
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(20, y, 170, 50, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(52, 152, 219);
    doc.text('成績摘要', 105, y + 10, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    y += 65;
    
    splitText.forEach(line => {
      if (y > 270) {
        doc.addPage();
        // Add header to new page
        doc.setFillColor(52, 152, 219);
        doc.rect(0, 0, 210, 15, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('桃聯區會考落點分析結果', 105, 10, { align: 'center' });
        
        // Add watermark to new page
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(60);
        doc.setTextColor(230, 230, 230);
        doc.saveGraphicsState();
        doc.rotate(-45, 105, 150);
        doc.text('TYCTW', 70, 150);
        doc.restoreGraphicsState();
        
        // Reset for content
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        y = 30;
      }
      doc.text(line, 20, y);
      y += 7;
    });
    
    // Add fancy footer with page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 280, 210, 17, 'F');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('第 ' + i + ' 頁，共 ' + pageCount + ' 頁', 105, 285, { align: 'center' });
      doc.text(websiteInfo, 105, 290, { align: 'center' });
      doc.text(' 2023 TYCTW桃聯區會考落點分析系統', 105, 295, { align: 'center' });
    }
    
    doc.save('桃聯區會考落點分析結果.pdf');
  } catch (error) {
    console.error('PDF export error:', error);
    alert('PDF匯出發生錯誤，請確認您的瀏覽器支援此功能或嘗試其他格式。');
  }
}

function exportTxt(content) {
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW');
  
  const websiteInfo = "更多資訊請訪問: https://rcpett.vercel.app/\n\n";
  const formattedContent = 
    "====================================================================\n" +
    "                  桃聯區會考落點分析結果                            \n" +
    "====================================================================\n\n" +
    "產生日期: " + dateTime + "\n\n" +
    "--------------------------------------------------------------------\n" +
    "                           成績摘要                                 \n" +
    "--------------------------------------------------------------------\n" +
    "國文: " + document.getElementById('chinese').value + "\n" +
    "英文: " + document.getElementById('english').value + "\n" +
    "數學: " + document.getElementById('math').value + "\n" +
    "自然: " + document.getElementById('science').value + "\n" +
    "社會: " + document.getElementById('social').value + "\n" +
    "作文: " + document.getElementById('composition').value + "\n\n" +
    "--------------------------------------------------------------------\n" +
    "                           分析結果                                 \n" +
    "--------------------------------------------------------------------\n" +
    content + 
    "\n\n====================================================================\n" +
    websiteInfo +
    " 2023 TYCTW桃聯區會考落點分析系統\n" +
    "此文件僅供參考，不代表實際錄取結果\n" +
    "====================================================================";
  const blob = new Blob([formattedContent], { type: 'text/plain;charset=utf-8' });
  downloadFile(blob, '桃聯區會考落點分析結果.txt');
}

function exportCsv(content) {
  const now = new Date();
  const dateTime = now.toLocaleString('zh-TW');
  
  // Add header rows with nice formatting
  let csvContent = '';
  csvContent += '"==================================================="\n';
  csvContent += '"桃聯區會考落點分析結果"\n';
  csvContent += '"==================================================="\n';
  csvContent += '"產生時間","' + dateTime + '"\n';
  csvContent += '"TYCTW桃聯區會考落點分析系統 - 僅供參考"\n';
  csvContent += '"更多資訊請訪問: https://rcpett.vercel.app/"\n\n';
  
  // Add scores with better organization
  csvContent += '"==================================================="\n';
  csvContent += '"成績資訊","分數","等級說明"\n';
  csvContent += '"==================================================="\n';
  csvContent += '"國文","' + document.getElementById('chinese').value + '","A++/A+/A為優良,B++/B+/B為中等,C為需加強"\n';
  csvContent += '"英文","' + document.getElementById('english').value + '","A++/A+/A為優良,B++/B+/B為中等,C為需加強"\n';
  csvContent += '"數學","' + document.getElementById('math').value + '","A++/A+/A為優良,B++/B+/B為中等,C為需加強"\n';
  csvContent += '"自然","' + document.getElementById('science').value + '","A++/A+/A為優良,B++/B+/B為中等,C為需加強"\n';
  csvContent += '"社會","' + document.getElementById('social').value + '","A++/A+/A為優良,B++/B+/B為中等,C為需加強"\n';
  csvContent += '"作文","' + document.getElementById('composition').value + '","滿分為6級分"\n\n';
  
  // Add main content with better organization
  csvContent += '"==================================================="\n';
  csvContent += '"分析結果","學校類型","備註"\n';
  csvContent += '"==================================================="\n';
  const lines = content.split('\n');
  lines.forEach(line => {
    const cleanLine = line.replace(/[*]/g, '').trim();
    if (cleanLine) {
      csvContent += `"${cleanLine}","",""\n`;
    }
  });
  
  // Add footer with metadata
  csvContent += '\n"==================================================="\n';
  csvContent += '"' + new Date().toISOString() + '","' + navigator.userAgent + '"\n';
  csvContent += '"TYCTW桃聯區會考落點分析系統 版權所有"\n';
  csvContent += '"==================================================="\n';
  
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8' });
  downloadFile(blob, '桃聯區會考落點分析結果.csv');
}

function exportJson(content) {
  const scores = {
    chinese: document.getElementById('chinese').value,
    english: document.getElementById('english').value,
    math: document.getElementById('math').value,
    science: document.getElementById('science').value,
    social: document.getElementById('social').value,
    composition: document.getElementById('composition').value
  };
  
  // Get filter values
  const filters = {
    schoolOwnership: document.getElementById('schoolOwnership').value,
    schoolType: document.getElementById('schoolType').value,
    vocationalGroup: document.getElementById('vocationalGroup').value,
    analysisIdentity: document.getElementById('analysisIdentity').value
  };
  
  // Create a more structured and detailed JSON with schema version
  const jsonData = {
    schema_version: "1.1.0",
    metadata: {
      title: 'TYCTW 桃聯區會考落點分析結果',
      description: 'TYCTW 桃聯區會考落點分析系統 - 僅供參考',
      generateTime: new Date().toISOString(),
      timestamp: Date.now(),
      websiteUrl: 'https://rcpett.vercel.app/',
      exportVersion: '1.1.0',
      disclaimer: '此分析結果僅供參考，不代表實際錄取結果'
    },
    userInput: {
      scores: scores,
      filters: filters,
      scoreExplanation: {
        grades: {
          "A++": "優良(頂標)",
          "A+": "優良(前標)",
          "A": "優良",
          "B++": "中等(均標)",
          "B+": "中等",
          "B": "中等",
          "C": "需加強(底標)"
        },
        composition: "作文分為0-6級分",
        calculationMethod: "總積分根據各科等第轉換後加總計算"
      }
    },
    results: {
      content: content.split('\n').filter(line => line.trim()),
      generatedAt: new Date().toLocaleString('zh-TW'),
      deviceInfo: {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: navigator.language
      }
    },
    copyright: {
      year: new Date().getFullYear(),
      owner: "TYCTW桃聯區會考落點分析系統",
      rights: "版權所有，不得未經授權轉載或使用"
    }
  };
  
  // Pretty print the JSON with 2-space indentation
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json;charset=utf-8' });
  downloadFile(blob, '桃聯區會考落點分析結果.json');
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize identity cards
  const identityCards = document.querySelectorAll('.identity-card');
  const identityInput = document.getElementById('analysisIdentity');
  
  identityCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      identityCards.forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      this.classList.add('selected');
      
      // Update hidden input value
      identityInput.value = this.getAttribute('data-identity');
      
      // Log selection
      logUserActivity('identity_selection', { 
        identity: identityInput.value 
      });
    });
  });
  
  // Initialize other components
  initRating();
});

window.onload = function() {
  showDisclaimer();
};

document.oncontextmenu = function () {
  return false;
};

document.body.onkeydown = function(e) {
  var keyCode = e.keyCode || e.which || e.charCode;
  if (
    keyCode === 123 ||
    (e.ctrlKey && e.shiftKey && (keyCode === 73 || keyCode === 74 || keyCode === 67)) ||
    (e.ctrlKey && keyCode === 85)
  ) {
    e.preventDefault();
    return false;
  }
};

(function() {
  var threshold = 160;
  setInterval(function() {
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
      document.body.innerHTML = "<h1>禁止使用開發者工具</h1>";
      throw "開發者工具被禁用";
    }
  }, 1000);
})();

let userRating = 0;

function initRating() {
  const stars = document.querySelectorAll("#starsContainer .star");
  
  stars.forEach((star, index) => {
    star.addEventListener("click", function() {
      userRating = Number(this.getAttribute("data-value"));
      updateStarDisplay(userRating);
      
      stars.forEach((s, i) => {
        if (i <= index) {
          s.style.animationDelay = `${i * 0.1}s`;
          s.classList.add('active');
        }
      });
    });
    
    star.addEventListener("mouseover", function() {
      const rating = Number(this.getAttribute("data-value"));
      stars.forEach((s, i) => {
        if (i < rating) {
          s.style.transform = `scale(${1 + (rating - i) * 0.1})`;
        } else {
          s.style.transform = 'scale(1)';
        }
      });
    });
    
    star.addEventListener("mouseout", function() {
      stars.forEach(s => {
        s.style.transform = s.classList.contains('active') ? 'scale(1.2)' : 'scale(1)';
      });
    });
  });

  const submitRatingButton = document.getElementById("submitRating");
  submitRatingButton.addEventListener("click", async function() {
    if (userRating === 0) {
      alert("請選擇評分星數！");
      return;
    }
    
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
    
    try {
      await logUserActivity("user_rating", { rating: userRating });
      
      const ratingMsg = document.getElementById("ratingMessage");
      ratingMsg.textContent = "感謝您的評分！您的意見對我們很重要。";
      ratingMsg.classList.add('show');
      ratingMsg.style.display = "block";
      
      this.innerHTML = '<i class="fas fa-check-circle"></i> 評分成功';
      this.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    } catch (error) {
      console.error('Rating submission error:', error);
      this.disabled = false;
      this.innerHTML = '<i class="fas fa-paper-plane"></i> 重新提交';
      alert('評分提交失敗，請稍後再試！');
    }
  });
}

function updateStarDisplay(rating) {
  const stars = document.querySelectorAll("#starsContainer .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function toggleMenu() {
  var menu = document.getElementById("fullscreenMenu");
  var overlay = document.getElementById("menuOverlay");
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
  
  var links = menu.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].style.animationDelay = (i * 0.1) + 's';
  }
}

function closeMenu() {
  var menu = document.getElementById("fullscreenMenu");
  var overlay = document.getElementById("menuOverlay");
  menu.classList.remove("show");
  overlay.classList.remove("show");
}

document.addEventListener('click', function(event) {
  var menu = document.getElementById("fullscreenMenu");
  var menuIcon = document.querySelector(".menu-icon");
  if (menu.classList.contains('show') && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
    closeMenu();
  }
});

const html5QrCode = new Html5Qrcode("qr-reader");
const qrConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

document.getElementById('scanQRCode').addEventListener('click', () => {
  const qrReader = document.getElementById('qr-reader');
  if (qrReader.style.display === 'none' || qrReader.style.display === '') {
    qrReader.style.display = 'block';
    html5QrCode.start({ facingMode: "environment" }, qrConfig, onScanSuccess);
  } else {
    qrReader.style.display = 'none';
    html5QrCode.stop();
  }
});

function onScanSuccess(decodedText, decodedResult) {
  document.getElementById('invitationCode').value = decodedText;
  html5QrCode.stop();
  document.getElementById('qr-reader').style.display = 'none';
  document.getElementById('qr-result').textContent = `您的邀請碼是：${decodedText}`;

  logUserActivity('qr_scan_success', { invitationCode: decodedText });
}

function handleQRCodeImage(file) {
  logUserActivity('qr_image_upload', { fileName: file.name });

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        document.getElementById('invitationCode').value = code.data;
        document.getElementById('qr-result').textContent = `您的邀請碼是：${code.data}`;
      } else {
        document.getElementById('qr-result').textContent = '無法識別 QR 碼，請嘗試其他圖片';
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById('fileInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    handleQRCodeImage(file);
  }
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  const icon = document.querySelector('#darkModeToggle i');
  icon.classList.add('transitioning');
  
  setTimeout(() => {
    if (isDarkMode) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    
    setTimeout(() => {
      icon.classList.remove('transitioning');
    }, 600);
  }, 300);

  logUserActivity('toggle_dark_mode', { enabled: isDarkMode });
}

const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  document.body.classList.add('dark-mode');
  const icon = document.querySelector('#darkModeToggle i');
  icon.classList.remove('fa-moon');
  icon.classList.add('fa-sun');
}

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

document.getElementById('currentYear').textContent = new Date().getFullYear();

function displayResults(data) {
  const { totalPoints, totalCredits, eligibleSchools } = data;

  let results = `
    <div class="results-container">
      <div class="results-header">
        <h2><i class="fas fa-clipboard-check icon"></i>分析結果總覽</h2>
        <div class="results-summary">
          <div class="result-card total-points" style="background: linear-gradient(135deg, #3498db, #2980b9);">
            <i class="fas fa-star icon"></i>
            <div class="result-value">${totalPoints}</div>
            <div class="result-label">總積分</div>
          </div>
          <div class="result-card total-credits" style="background: linear-gradient(135deg, #2ecc71, #27ae60);">
            <i class="fas fa-award icon"></i>
            <div class="result-value">${totalCredits}</div>
            <div class="result-label">總積點</div>
          </div>
          <div class="result-card schools-count" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);">
            <i class="fas fa-school icon"></i>
            <div class="result-value">${eligibleSchools ? eligibleSchools.length : 0}</div>
            <div class="result-label">符合條件學校數</div>
          </div>
        </div>
      </div>

      <div class="results-details">
        <h3><i class="fas fa-chart-bar icon"></i>成績分析</h3>
        <div class="scores-summary">
          <div class="score-item">
            <span class="score-label"><i class="fas fa-book icon"></i> 國文：</span>
            <span class="score-value ${getScoreClass(document.getElementById('chinese').value)}">
              ${document.getElementById('chinese').value}
            </span>
          </div>
          <div class="score-item">
            <span class="score-label"><i class="fas fa-language icon"></i> 英文：</span>
            <span class="score-value ${getScoreClass(document.getElementById('english').value)}">
              ${document.getElementById('english').value}
            </span>
          </div>
          <div class="score-item">
            <span class="score-label"><i class="fas fa-calculator icon"></i> 數學：</span>
            <span class="score-value ${getScoreClass(document.getElementById('math').value)}">
              ${document.getElementById('math').value}
            </span>
          </div>
          <div class="score-item">
            <span class="score-label"><i class="fas fa-flask icon"></i> 自然：</span>
            <span class="score-value ${getScoreClass(document.getElementById('science').value)}">
              ${document.getElementById('science').value}
            </span>
          </div>
          <div class="score-item">
            <span class="score-label"><i class="fas fa-globe icon"></i> 社會：</span>
            <span class="score-value ${getScoreClass(document.getElementById('social').value)}">
              ${document.getElementById('social').value}
            </span>
          </div>
          <div class="score-item">
            <span class="score-label"><i class="fas fa-pen-nib icon"></i> 作文：</span>
            <span class="score-value composition-score">
              ${document.getElementById('composition').value} 級分
            </span>
          </div>
        </div>`;
  
  if (eligibleSchools && eligibleSchools.length > 0) {
    // Group schools by type
    let groupedSchools = {};
    eligibleSchools.forEach(school => {
      if (!groupedSchools[school.type]) {
        groupedSchools[school.type] = [];
      }
      groupedSchools[school.type].push(school);
    });
    
    // Add a summary of total schools by type
    results += `
      <div class="schools-summary" style="margin: 2rem 0; padding: 1rem; background: rgba(52, 152, 219, 0.05); border-radius: 10px;">
        <h4 style="margin-bottom: 1rem;"><i class="fas fa-chart-pie icon"></i> 符合條件學校類型統計</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
          ${Object.entries(groupedSchools).map(([type, schools]) => `
            <div style="background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 0.8rem 1.5rem; border-radius: 50px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-${type === '普通科' ? 'graduation-cap' : 'tools'} icon"></i>
              ${type}: <strong>${schools.length}</strong> 所
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="schools-analysis">
        <h3><i class="fas fa-university icon"></i>學校分析</h3>
        <div class="school-type-summary">
          ${Object.entries(groupedSchools).map(([type, schools]) => `
            <div class="school-type-card">
              <div class="school-type-header">
                <i class="fas fa-${type === '普通科' ? 'graduation-cap' : 'tools'} icon"></i>
                <h4>${type}</h4>
                <span class="school-count">${schools.length}所</span>
              </div>
              <div class="school-list">
                ${schools.map(school => {
                  // Calculate admission chance color
                  let chanceColor = '#e74c3c'; // default red
                  if (school.admissionChance >= 80) chanceColor = '#2ecc71'; // green
                  else if (school.admissionChance >= 60) chanceColor = '#f1c40f'; // yellow
                  
                  return `
                  <div class="school-item" data-id="${school.id || Math.random().toString(36).substring(2, 15)}">
                    <div class="school-name">
                      <i class="fas fa-graduation-cap icon"></i>
                      ${school.name}
                    </div>
                    ${school.ownership ? `
                      <div class="school-ownership">
                        <i class="fas fa-building icon"></i>
                        ${school.ownership}
                      </div>
                    ` : ''}
                    <div class="school-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 15px;">
                      ${school.lastYearCutoff ? `
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <i class="fas fa-chart-line icon" style="color: #e74c3c;"></i>
                          <span>去年最低: <strong>${school.lastYearCutoff}</strong></span>
                        </div>
                      ` : ''}
                      ${school.historicalTrend ? `
                        <div style="display: flex; align-items: center; gap: 5px;">
                          <i class="fas fa-history icon" style="color: #9b59b6;"></i>
                          <span>近三年: <strong>${school.historicalTrend}</strong></span>
                        </div>
                      ` : ''}
                    </div>
                    ${school.notes ? `
                      <div class="school-notes" style="margin-top: 15px; padding: 10px; background: rgba(52, 152, 219, 0.1); border-radius: 5px; font-size: 0.95rem;">
                        <i class="fas fa-info-circle icon" style="color: #3498db;"></i>
                        ${school.notes}
                      </div>
                    ` : ''}
                  </div>
                `}).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="analysis-notes">
        <h3><i class="fas fa-info-circle icon"></i>分析說明</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <div style="background: rgba(46, 204, 113, 0.1); padding: 1.5rem; border-radius: 10px; text-align: left; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <h4 style="margin-bottom: 1rem; color: #2ecc71; display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-lightbulb" style="color: #f1c40f;"></i> 您可以嘗試：
            </h4>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                調整篩選條件，選擇「全部」查看更多選項
              </li>
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                考慮更多類型的學校，包括公私立或不同科別
              </li>
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                諮詢老師獲取更多建議和升學輔導
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  } else {
    results += `
      <div class="no-results" style="text-align: center; padding: 3rem; background: rgba(231, 76, 60, 0.05); border-radius: 15px; margin: 2rem 0;">
        <i class="fas fa-search icon" style="font-size: 4rem; color: #e74c3c; margin-bottom: 1.5rem; display: block;"></i>
        <h3 style="color: #e74c3c; margin-bottom: 1rem;">根據您的成績，暫時沒有符合條件的學校。</h3>
        <div style="max-width: 500px; margin: 0 auto;">
          <div class="suggestions" style="background: white; padding: 1.5rem; border-radius: 10px; text-align: left; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <h4 style="margin-bottom: 1rem; color: #3498db; display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-lightbulb" style="color: #f1c40f;"></i> 您可以嘗試：
            </h4>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                調整篩選條件，選擇「全部」查看更多選項
              </li>
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                考慮更多類型的學校，包括公私立或不同科別
              </li>
              <li style="margin: 10px 0; padding-left: 25px; position: relative;">
                <i class="fas fa-check-circle" style="color: #2ecc71; position: absolute; left: 0;"></i>
                諮詢老師獲取更多建議和升學輔導
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  }
  
  results += '<div class="data-update-time">資料更新時間：' + new Date().toLocaleString('zh-TW') + '</div>';
  
  results += '</div></div>';
  
  const resultsElement = document.getElementById('results');
  resultsElement.innerHTML = results;
  resultsElement.style.display = 'none';
  
  setTimeout(() => {
    resultsElement.style.display = 'block';
    resultsElement.style.animation = 'fadeIn 0.5s ease-out';
    document.getElementById('exportResults').style.display = 'inline-block';
    
    // Add a toast notification for successful analysis
    showToast('分析完成！您可以查看結果或匯出報告。');
  }, 100);
}

// Add toast notification function
function showToast(message) {
  // Create toast if it doesn't exist
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }
  
  // Update message and show
  toast.innerText = message;
  toast.className = 'show';
  
  // Hide after 3 seconds
  setTimeout(() => { 
    toast.className = toast.className.replace('show', ''); 
  }, 3000);
}

function getScoreClass(score) {
  const scoreClasses = {
    'A++': 'score-excellent',
    'A+': 'score-great',
    'A': 'score-good',
    'B++': 'score-above-average',
    'B+': 'score-average',
    'B': 'score-below-average',
    'C': 'score-needs-improvement'
  };
  return scoreClasses[score] || '';
}