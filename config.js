// Configuration settings for the form system
const CONFIG = {
  // API endpoint for form submission
  apiEndpoint: 'https://script.google.com/macros/s/AKfycbxQcTd_LzijWQokSEEgy9QQB6v70ftcJt00GNDJeWQ2FPGgNnY-pr1Cs--QZyBpI8OJnQ/exec',
  
  // Captcha settings
  captcha: {
    length: 6,
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
  }
};

