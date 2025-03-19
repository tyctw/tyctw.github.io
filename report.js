// Global variables
let captchaToken = '';
const MAX_CAPTCHA_ATTEMPTS = CONFIG.captcha.maxAttempts;

/**
 * Callback function when Turnstile captcha is completed successfully
 * @param {string} token The turnstile token from verification
 */
function onCaptchaSuccess(token) {
  captchaToken = token;
  hideError(document.querySelector('.cf-turnstile'));
}

/**
 * Generates a unique report code
 * @returns {string} The generated report code
 */
function generateReportCode() {
  const characters = CONFIG.reportCode.characters;
  let result = '';
  for (let i = 0; i < CONFIG.reportCode.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Validates an email address
 * @param {string} email The email to validate
 * @returns {boolean} Whether the email is valid
 */
function validateEmail(email) {
  return CONFIG.validation.emailPattern.test(String(email).toLowerCase());
}

/**
 * Shows an error message for a form field
 * @param {HTMLElement} inputElement The input element with the error
 * @param {string} errorMessage The error message to display
 */
function showError(inputElement, errorMessage) {
  const errorElement = document.getElementById(inputElement.id + 'Error');
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    inputElement.classList.add('invalid');
  }
}

/**
 * Hides the error message for a form field
 * @param {HTMLElement} inputElement The input element
 */
function hideError(inputElement) {
  const errorElement = document.getElementById(inputElement.id + 'Error');
  if (errorElement) {
    errorElement.style.display = 'none';
    inputElement.classList.remove('invalid');
  }
}

/**
 * Shows the confirmation dialog
 * @param {Function} callback Function to call when confirmed
 */
function showConfirmDialog(callback) {
  const confirmDialog = document.getElementById('confirmDialog');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');
  
  // Update progress steps
  document.getElementById('step1').classList.add('completed');
  document.getElementById('step2').classList.add('active');

  confirmDialog.style.display = 'flex';

  confirmYes.onclick = function() {
    confirmDialog.style.display = 'none';
    callback();
  };

  confirmNo.onclick = function() {
    confirmDialog.style.display = 'none';
    document.getElementById('step1').classList.remove('completed');
    document.getElementById('step2').classList.remove('active');
  };

  confirmDialog.onclick = function(event) {
    if (event.target === confirmDialog) {
      confirmDialog.style.display = 'none';
      document.getElementById('step1').classList.remove('completed');
      document.getElementById('step2').classList.remove('active');
    }
  };
}

/**
 * Updates the progress steps
 * @param {number} step The current step (1-3)
 */
function updateProgressSteps(step) {
  const steps = document.querySelectorAll('.step');
  
  steps.forEach((stepEl, index) => {
    if (index + 1 < step) {
      stepEl.classList.add('completed');
      stepEl.classList.remove('active');
    } else if (index + 1 === step) {
      stepEl.classList.add('active');
      stepEl.classList.remove('completed');
    } else {
      stepEl.classList.remove('active', 'completed');
    }
  });
}

/**
 * Copies text to clipboard
 * @param {string} text The text to copy
 * @returns {Promise<boolean>} Whether the copy was successful
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

/**
 * Uploads an image to Imgur and returns the URL
 * @param {File} file The image file to upload
 * @returns {Promise<string>} The URL of the uploaded image
 */
async function uploadImageToImgur(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64data = reader.result.split(',')[1];
      
      try {
        const response = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            'Authorization': 'Client-ID 4409588f10776f7',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64data,
            type: 'base64'
          })
        });
        
        const data = await response.json();
        if (data.success) {
          resolve(data.data.link);
        } else {
          reject(new Error('Failed to upload image'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Validates the file upload
 * @param {File} file The file to validate
 * @returns {boolean} Whether the file is valid
 */
function validateFileUpload(file) {
  if (!file) return true; // No file is valid (optional upload)
  
  // Check file type
  if (!CONFIG.fileUpload.acceptedFormats.includes(file.type)) {
    return false;
  }
  
  // Check file size (convert MB to bytes)
  const maxSizeBytes = CONFIG.fileUpload.maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return false;
  }
  
  return true;
}

/**
 * Displays a preview of the uploaded image
 * @param {File} file The image file to preview
 */
function displayImagePreview(file) {
  const previewContainer = document.getElementById('imagePreview');
  previewContainer.innerHTML = '';
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-image';
      previewContainer.appendChild(img);
      
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<i class="fas fa-times"></i>';
      removeBtn.className = 'remove-image';
      removeBtn.onclick = function() {
        document.getElementById('imageUpload').value = '';
        previewContainer.innerHTML = '';
      };
      previewContainer.appendChild(removeBtn);
    };
    reader.readAsDataURL(file);
    previewContainer.style.display = 'block';
  } else {
    previewContainer.style.display = 'none';
  }
}

/**
 * Shows the success message with report code and hides the form
 * @param {string} reportCode The generated report code
 * @param {string} imageUrl The URL of the uploaded image (if any)
 */
function showSuccessMessage(reportCode, imageUrl) {
  document.getElementById('reportCode').textContent = reportCode;
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('errorMessage').style.display = 'none';
  document.getElementById('reportForm').style.display = 'none';
  
  // Display image in success message if provided
  const successImage = document.getElementById('successImage');
  if (imageUrl) {
    successImage.innerHTML = `<img src="${imageUrl}" alt="上傳的截圖" class="success-image">`;
    successImage.style.display = 'block';
  } else {
    successImage.style.display = 'none';
  }
  
  // Add status indicator to success message
  const statusIndicator = document.getElementById('statusIndicator');
  statusIndicator.textContent = CONFIG.status.pending.label;
  statusIndicator.style.backgroundColor = CONFIG.status.pending.color;
  statusIndicator.style.display = 'inline-block';
  
  // Update progress steps
  document.getElementById('step2').classList.add('completed');
  document.getElementById('step3').classList.add('active');
}

/**
 * Checks the status of a report
 * @param {string} reportCode The report code to check
 * @returns {Promise<Object>} The report data
 */
async function checkReportStatus(reportCode) {
  try {
    const response = await fetch(`${CONFIG.apiEndpoint}?reportCode=${reportCode}`);
    return await response.json();
  } catch (error) {
    console.error('Error checking status:', error);
    return { found: false };
  }
}

// When the DOM is loaded, initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Add Turnstile script
  const turnstileScript = document.createElement('script');
  turnstileScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  turnstileScript.async = true;
  turnstileScript.defer = true;
  document.head.appendChild(turnstileScript);
  
  // Add event listener for copy button
  document.getElementById('copyBtn').addEventListener('click', async function() {
    const reportCode = document.getElementById('reportCode').textContent;
    const tooltip = document.getElementById('copyTooltip');
    
    const success = await copyToClipboard(reportCode);
    
    if (success) {
      tooltip.textContent = '已複製!';
      setTimeout(() => {
        tooltip.textContent = '複製代碼';
      }, 2000);
    } else {
      tooltip.textContent = '複製失敗';
      setTimeout(() => {
        tooltip.textContent = '複製代碼';
      }, 2000);
    }
  });
  
  // Add event listener for check status button
  document.getElementById('checkStatusBtn').addEventListener('click', async function() {
    const reportCode = document.getElementById('reportCode').textContent;
    const statusIndicator = document.getElementById('statusIndicator');
    const statusMessage = document.getElementById('statusMessage');
    
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 檢查中...';
    
    const result = await checkReportStatus(reportCode);
    
    if (result.found) {
      // Determine status - for now, use pending as default
      // In a real application, you would get this from the server response
      const status = result.status || CONFIG.status.pending.code;
      const statusConfig = CONFIG.status[status] || CONFIG.status.pending;
      
      statusIndicator.textContent = statusConfig.label;
      statusIndicator.style.backgroundColor = statusConfig.color;
      
      // Optional: Show the last update time if available
      if (result.lastUpdated) {
        statusMessage.textContent = `最後更新: ${new Date(result.lastUpdated).toLocaleString()}`;
        statusMessage.style.display = 'block';
      }
    } else {
      statusIndicator.textContent = '找不到報告';
      statusIndicator.style.backgroundColor = '#e74c3c';
      statusMessage.textContent = '無法找到此回報代碼的記錄。';
      statusMessage.style.display = 'block';
    }
    
    this.disabled = false;
    this.innerHTML = '<i class="fas fa-sync-alt"></i> 檢查進度';
  });

  // Add event listener for image upload
  document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (!validateFileUpload(file)) {
        showError(this, `檔案格式或大小不符。請上傳 ${CONFIG.fileUpload.maxSizeMB}MB 以下的圖片檔案。`);
        this.value = '';
        return;
      }
      hideError(this);
      displayImagePreview(file);
    }
  });

  // Form submission handler
  document.getElementById('reportForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    let isValid = true;

    const email = document.getElementById('email');
    const category = document.getElementById('category');
    const description = document.getElementById('description');
    const imageUpload = document.getElementById('imageUpload');
    const submitBtn = document.getElementById('submitBtn');

    // Validate email
    if (!validateEmail(email.value)) {
      showError(email, '請輸入有效的電子郵件地址');
      isValid = false;
    } else {
      hideError(email);
    }

    // Validate category
    if (category.value === '') {
      showError(category, '請選擇異常類別');
      isValid = false;
    } else {
      hideError(category);
    }

    // Validate description
    if (description.value.trim().length < CONFIG.validation.minDescriptionLength) {
      showError(description, `問題描述至少需要${CONFIG.validation.minDescriptionLength}個字符`);
      isValid = false;
    } else {
      hideError(description);
    }

    // Validate Turnstile captcha
    if (!captchaToken) {
      showError(document.querySelector('.cf-turnstile'), '請完成驗證');
      isValid = false;
    }

    // Validate file upload
    if (imageUpload.files.length > 0 && !validateFileUpload(imageUpload.files[0])) {
      showError(imageUpload, `檔案格式或大小不符。請上傳 ${CONFIG.fileUpload.maxSizeMB}MB 以下的圖片檔案。`);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Show confirmation dialog
    showConfirmDialog(async () => {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

      var reportCode = generateReportCode();
      let imageUrl = '';
      
      // Upload image if provided
      if (imageUpload.files.length > 0) {
        try {
          imageUrl = await uploadImageToImgur(imageUpload.files[0]);
        } catch (error) {
          console.error('Error uploading image:', error);
          // Continue without image if upload fails
        }
      }

      var data = {
        email: email.value,
        category: category.value,
        description: description.value,
        reportCode: reportCode,
        captchaToken: captchaToken,
        imageUrl: imageUrl
      };

      fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result === 'success') {
          showSuccessMessage(reportCode, imageUrl);
          document.getElementById('reportForm').reset();
          captchaToken = '';
          document.getElementById('imagePreview').innerHTML = '';
          document.getElementById('imagePreview').style.display = 'none';
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        
        // Reset progress steps
        updateProgressSteps(1);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '提交回報';
      });
    });
  });

  // Add interactivity to form inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.querySelector('label').style.color = '#4a90e2';
    });
    input.addEventListener('blur', function() {
      this.parentElement.querySelector('label').style.color = '#333';
    });
    input.addEventListener('input', function() {
      hideError(this);
    });
  });

  // Full-page menu toggle
  const menuIcon = document.getElementById('menuIcon');
  const fullPageMenu = document.getElementById('fullPageMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const closeMenuButton = document.getElementById('closeMenuButton');
  const navItems = document.querySelectorAll('.nav-item');

  function toggleMenu() {
    fullPageMenu.classList.toggle('active');
    document.body.style.overflow = fullPageMenu.classList.contains('active') ? 'hidden' : '';
    
    // Animate menu items when menu is active
    if (fullPageMenu.classList.contains('active')) {
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 50 + index * 50); // Faster animation for mobile
      });
    } else {
      navItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
      });
    }
  }
  
  menuIcon.addEventListener('click', toggleMenu);
  closeMenuButton.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      fullPageMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when window is resized
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && fullPageMenu.classList.contains('active')) {
      fullPageMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Add smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add custom animations - disable on small screens
  const container = document.querySelector('.container');
  container.addEventListener('mousemove', (e) => {
    // Only apply hover effects on non-touch devices with wider screens
    if (window.innerWidth > 768 && window.matchMedia('(hover: hover)').matches) {
      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = container;
      const moveX = (offsetX / offsetWidth - 0.5) * 10; // Reduced movement
      const moveY = (offsetY / offsetHeight - 0.5) * 10;
      container.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    }
  });

  container.addEventListener('mouseleave', () => {
    container.style.transform = 'translateX(0) translateY(0)';
  });

  // Security measures
  // 防止複製
  document.addEventListener('copy', function(e) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage.style.display === 'block') {
      // Allow copying only when success message is shown
      return true;
    }
    e.preventDefault();
    return false;
  });

  // 防止截圖 (僅適用於部分瀏覽器)
  document.addEventListener('keyup', function(e) {
    if (e.key == 'PrintScreen') {
      navigator.clipboard.writeText('');
      alert('截圖功能已被禁用');
    }
  });

  // 防止右鍵點擊
  document.addEventListener('contextmenu', function(e) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage.style.display === 'block' && 
        e.target.closest('.success-message')) {
      // Allow right-click only in success message
      return true;
    }
    e.preventDefault();
  });

  // 防止拖曳選擇文字
  document.onselectstart = function(e) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage.style.display === 'block' && 
        e.target.closest('.success-message')) {
      // Allow text selection only in success message
      return true;
    }
    return false;
  };
});