// background.js - Handles Basic Authentication header injection and toolbar button

// Handle toolbar button click - open options page
browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

// Cache for settings to avoid repeated storage reads
let settingsCache = {
  customUrl: null,
  enableBasicAuth: false,
  authUsername: '',
  authPassword: ''
};

// Load settings from storage on startup
loadSettings();

// Listen for storage changes and update cache
browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    loadSettings();
  }
});

// Load settings from storage
async function loadSettings() {
  try {
    const result = await browser.storage.local.get([
      'customUrl',
      'enableBasicAuth',
      'authUsername',
      'authPassword'
    ]);

    settingsCache = {
      customUrl: result.customUrl || null,
      enableBasicAuth: result.enableBasicAuth || false,
      authUsername: result.authUsername || '',
      authPassword: result.authPassword || ''
    };

    console.log('Settings loaded:', {
      customUrl: settingsCache.customUrl,
      enableBasicAuth: settingsCache.enableBasicAuth,
      hasCredentials: !!(settingsCache.authUsername && settingsCache.authPassword)
    });
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Listen to web requests to inject Basic Auth header
browser.webRequest.onBeforeSendHeaders.addListener(
  injectAuthHeader,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
);

function injectAuthHeader(details) {
  // Only inject if auth is enabled and we have credentials
  if (!settingsCache.enableBasicAuth || !settingsCache.customUrl) {
    return {};
  }

  if (!settingsCache.authUsername || !settingsCache.authPassword) {
    return {};
  }

  try {
    // Parse both URLs to compare origins
    const requestUrl = new URL(details.url);
    const customUrl = new URL(settingsCache.customUrl);

    // Only inject auth header if the request is to the same origin as the custom URL
    if (requestUrl.origin === customUrl.origin) {
      // Check if Authorization header already exists
      const hasAuthHeader = details.requestHeaders.some(
        header => header.name.toLowerCase() === 'authorization'
      );

      // Only add if not already present
      if (!hasAuthHeader) {
        // Create Basic Auth header
        const credentials = `${settingsCache.authUsername}:${settingsCache.authPassword}`;
        const base64Credentials = btoa(credentials);
        const authHeader = `Basic ${base64Credentials}`;

        // Add Authorization header
        details.requestHeaders.push({
          name: 'Authorization',
          value: authHeader
        });

        console.log('Injected Basic Auth header for:', requestUrl.origin);
      }
    }
  } catch (error) {
    console.error('Error injecting auth header:', error);
  }

  return { requestHeaders: details.requestHeaders };
}
