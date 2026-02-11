// newtab.js - Handles redirection to custom URL

(async function() {
  try {
    // Read the custom URL from storage
    const result = await browser.storage.local.get('customUrl');

    if (result.customUrl) {
      // Redirect to the custom URL
      window.location.href = result.customUrl;
    } else {
      // No URL configured, show message
      showConfigMessage();
    }
  } catch (error) {
    console.error('Error loading custom URL:', error);
    showConfigMessage();
  }
})();

function showConfigMessage() {
  const message = document.getElementById('message');
  const linkContainer = document.getElementById('linkContainer');
  const optionsLink = document.getElementById('optionsLink');

  message.textContent = 'No custom URL configured.';
  linkContainer.style.display = 'block';

  optionsLink.addEventListener('click', (e) => {
    e.preventDefault();
    browser.runtime.openOptionsPage();
  });
}
