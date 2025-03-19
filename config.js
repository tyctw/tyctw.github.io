// Configuration settings for the form system
const CONFIG = {
  // API endpoint for form submission
  apiEndpoint: 'https://script.google.com/macros/s/AKfycbxQcTd_LzijWQokSEEgy9QQB6v70ftcJt00GNDJeWQ2FPGgNnY-pr1Cs--QZyBpI8OJnQ/exec',
  
  // Captcha settings
  captcha: {
    siteKey: '0x4AAAAAABBmAhaW1rWD_-LL',
    secretKey: '0x4AAAAAABBmAnAWA7c5kmt9o7XzxdpAQvI',
    maxAttempts: 3,
  },
  
  // Form validation settings
  validation: {
    minDescriptionLength: 10,
    emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  
  // Report code generation settings
  reportCode: {
    length: 8,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  },
  
  // File upload settings
  fileUpload: {
    maxSizeMB: 5,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  
  // Status definitions
  status: {
    pending: {
      code: 'pending',
      label: '處理中',
      color: '#f39c12'
    },
    reviewing: {
      code: 'reviewing',
      label: '審核中',
      color: '#3498db'
    },
    inProgress: {
      code: 'inProgress',
      label: '修復中',
      color: '#9b59b6'
    },
    resolved: {
      code: 'resolved',
      label: '已解決',
      color: '#2ecc71'
    },
    closed: {
      code: 'closed',
      label: '已關閉',
      color: '#7f8c8d'
    }
  }
};