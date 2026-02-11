// options.js - Handles extension configuration

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('optionsForm').addEventListener('submit', saveOptions);
document.getElementById('enableBasicAuth').addEventListener('change', toggleAuthFields);

// Load saved options
async function loadOptions() {
  try {
    const result = await browser.storage.local.get([
      'customUrl',
      'enableBasicAuth',
      'authUsername',
      'authPassword'
    ]);

    if (result.customUrl) {
      document.getElementById('customUrl').value = result.customUrl;
    }

    if (result.enableBasicAuth) {
      document.getElementById('enableBasicAuth').checked = true;
      document.getElementById('authUsername').value = result.authUsername || '';
      document.getElementById('authPassword').value = result.authPassword || '';
    }

    toggleAuthFields();
  } catch (error) {
    console.error('Error loading options:', error);
    showStatus('Failed to load settings', 'error');
  }
}

// Save options
async function saveOptions(e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  const customUrl = document.getElementById('customUrl').value.trim();
  const enableBasicAuth = document.getElementById('enableBasicAuth').checked;
  const authUsername = document.getElementById('authUsername').value.trim();
  const authPassword = document.getElementById('authPassword').value;

  // Validate URL
  if (!customUrl) {
    showError('urlError', 'Please enter a URL');
    return;
  }

  try {
    new URL(customUrl);
  } catch (error) {
    showError('urlError', 'Please enter a valid URL (e.g., https://example.com)');
    return;
  }

  // Validate auth credentials if enabled
  if (enableBasicAuth) {
    if (!authUsername) {
      showError('usernameError', 'Username is required when authentication is enabled');
      return;
    }
    if (!authPassword) {
      showError('passwordError', 'Password is required when authentication is enabled');
      return;
    }
  }

  // Save to storage
  try {
    await browser.storage.local.set({
      customUrl: customUrl,
      enableBasicAuth: enableBasicAuth,
      authUsername: enableBasicAuth ? authUsername : '',
      authPassword: enableBasicAuth ? authPassword : ''
    });

    showStatus('Settings saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving options:', error);
    showStatus('Failed to save settings', 'error');
  }
}

// Toggle auth fields visibility and state
function toggleAuthFields() {
  const enabled = document.getElementById('enableBasicAuth').checked;
  const authFields = document.getElementById('authFields');
  const usernameInput = document.getElementById('authUsername');
  const passwordInput = document.getElementById('authPassword');

  if (enabled) {
    authFields.style.display = 'block';
    usernameInput.disabled = false;
    passwordInput.disabled = false;
  } else {
    authFields.style.display = 'none';
    usernameInput.disabled = true;
    passwordInput.disabled = true;
  }
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

// Clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll('.error');
  errors.forEach(error => {
    error.textContent = '';
    error.classList.remove('show');
  });
}

// Show status message
function showStatus(message, type) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = message;
  statusElement.className = `status show ${type}`;

  // Auto-hide success messages after 3 seconds
  if (type === 'success') {
    setTimeout(() => {
      statusElement.classList.remove('show');
    }, 3000);
  }
}
