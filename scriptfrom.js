// Global variables
let captchaText = '';
let captchaAttempts = 0;
const MAX_CAPTCHA_ATTEMPTS = CONFIG.captcha.maxAttempts;

/**
 * Generates a random captcha text
 */
function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  captchaText = '';
  for (let i = 0; i < CONFIG.captcha.length; i++) {
    captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('captchaImage').textContent = captchaText;
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

// When the DOM is loaded, initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Generate initial captcha
  generateCaptcha();

  // Add event listener to refresh the captcha
  document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);

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

  // Form submission handler
  document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    const email = document.getElementById('email');
    const category = document.getElementById('category');
    const description = document.getElementById('description');
    const captchaInput = document.getElementById('captchaInput');
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

    // Validate captcha
    if (captchaInput.value.toLowerCase() !== captchaText.toLowerCase()) {
      captchaAttempts++;
      if (captchaAttempts >= MAX_CAPTCHA_ATTEMPTS) {
        showError(captchaInput, '驗證碼錯誤次數過多，請稍後再試');
        submitBtn.disabled = true;
      } else {
        showError(captchaInput, `驗證碼不正確，還有 ${MAX_CAPTCHA_ATTEMPTS - captchaAttempts} 次機會`);
      }
      isValid = false;
      generateCaptcha();
    } else {
      hideError(captchaInput);
    }

    if (!isValid) {
      return;
    }

    // Show confirmation dialog
    showConfirmDialog(() => {
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';

      var reportCode = generateReportCode();

      var data = {
        email: email.value,
        category: category.value,
        description: description.value,
        reportCode: reportCode
      };

      fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result === 'success') {
          document.getElementById('reportCode').textContent = reportCode;
          document.getElementById('successMessage').style.display = 'block';
          document.getElementById('errorMessage').style.display = 'none';
          document.getElementById('reportForm').reset();
          document.getElementById('reportForm').style.display = 'none';
          generateCaptcha();
          captchaAttempts = 0;
          
          // Update progress steps
          document.getElementById('step2').classList.add('completed');
          document.getElementById('step3').classList.add('active');
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
        submitBtn.textContent = '提交回報';
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
        }, index * 100);
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

  // Add custom animations
  const container = document.querySelector('.container');
  container.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e;
    const { offsetWidth, offsetHeight } = container;
    const moveX = (offsetX / offsetWidth - 0.5) * 20;
    const moveY = (offsetY / offsetHeight - 0.5) * 20;
    container.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
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