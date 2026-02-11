# New Tab URL - Firefox Extension

A Firefox extension that overrides the default new tab page with a custom URL. Includes optional HTTP Basic Authentication support for accessing protected URLs.

## Features

- Replace Firefox's default new tab with any custom URL
- Optional HTTP Basic Authentication for protected resources
- **Toolbar button** for quick access to settings
- Simple, user-friendly configuration interface
- Modern gradient icons in multiple sizes
- Secure credential storage using browser storage API
- Works with any URL (dashboards, intranet pages, web apps, etc.)

## Installation

### Development/Testing

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to this directory and select `manifest.json`

The extension will be loaded temporarily and will remain active until you restart Firefox.

### Using web-ext (Recommended for Development)

```bash
# Install web-ext globally
npm install -g web-ext

# Run the extension with auto-reload
web-ext run

# Run with a specific Firefox profile
web-ext run --firefox-profile=/path/to/profile

# Lint the extension
web-ext lint
```

### Packaging for Distribution

```bash
# Using the packaging script (recommended)
./package.sh

# Or using web-ext
web-ext build

# Or manually create a zip file
zip -r new-tab-url.zip manifest.json newtab.html newtab.js background.js options.html options.js icons/*.png -x ".*" -x "__MACOSX"
```

## Usage

### Basic Setup

1. After installing the extension, open settings:
   - **Click the toolbar button** (blue icon with browser tab symbol), OR
   - Go to `about:addons` → Find "New Tab URL" → Click gear icon, OR
   - Right-click the extension in toolbar → "Manage Extension" → "Options"
2. Enter your desired URL (e.g., `https://example.com`)
3. Click "Save Settings"
4. Open a new tab (Cmd/Ctrl+T) - it will redirect to your custom URL

### With Basic Authentication

For URLs that require HTTP Basic Authentication:

1. Open the extension options page
2. Enter your custom URL
3. Check "Enable HTTP Basic Authentication"
4. Enter your username and password
5. Click "Save Settings"

**Security Warning:** Credentials are stored unencrypted in browser storage. Only use with HTTPS URLs and trusted services.

## Architecture

### Files

- **manifest.json** - Extension configuration and permissions
- **newtab.html/newtab.js** - New tab page that redirects to custom URL
- **background.js** - Background script that injects Basic Auth headers and handles toolbar button
- **options.html/options.js** - Configuration UI for settings
- **icons/** - Modern gradient extension icons (16, 32, 48, 96, 128px)

### How It Works

1. **New Tab Override:** When you open a new tab, `newtab.html` loads and immediately runs `newtab.js`
2. **URL Redirection:** `newtab.js` reads the custom URL from storage and redirects the page
3. **Auth Injection:** If Basic Auth is enabled, `background.js` intercepts HTTP requests to the custom URL's origin and injects the Authorization header
4. **Settings:** All configuration is stored using `browser.storage.local` API

### Permissions

- `tabs` - Required to override new tab page
- `storage` - Store configuration settings
- `webRequest` - Intercept HTTP requests for auth injection
- `webRequestBlocking` - Modify request headers (for auth)
- `<all_urls>` - Inject auth headers for any URL

## Security Considerations

1. **Credential Storage:** Passwords are stored in plain text in browser storage (not encrypted). This is a limitation of the browser extension storage API.

2. **HTTPS Only:** Always use HTTPS URLs when Basic Auth is enabled to prevent credentials from being sent over unencrypted connections.

3. **Scope of Permissions:** The extension requires `<all_urls>` permission to inject auth headers, but only injects headers for requests matching your custom URL's origin.

4. **Best Practices:**
   - Use only with trusted, internal services
   - Consider using API keys or tokens instead of passwords when possible
   - Regularly update credentials
   - Be aware that anyone with access to your Firefox profile can read stored credentials

## Troubleshooting

### New tab doesn't redirect

- Check that you've saved a valid URL in the options page
- Ensure the URL includes the protocol (https:// or http://)
- Check the browser console (F12) for error messages

### Basic Auth not working

- Verify that auth is enabled in options
- Check that username and password are set
- Ensure the URL uses HTTPS
- Check the background page console in `about:debugging` for errors

### Extension not loading

- Verify all files are present (manifest.json, newtab.html, newtab.js, background.js, options.html, options.js)
- Check `about:debugging` for error messages
- Run `web-ext lint` to check for manifest errors

## Development

### Project Structure

```
firefox_extention/
├── manifest.json         # Extension manifest (Manifest V2)
├── background.js         # Background script for auth injection
├── newtab.html          # New tab page HTML
├── newtab.js            # New tab redirect logic
├── options.html         # Settings page HTML
├── options.js           # Settings page logic
├── icons/               # Extension icons
│   └── README.md        # Icon creation instructions
├── CLAUDE.md            # Claude Code instructions
└── README.md            # This file
```

### Testing

1. **Manual Testing:**
   - Test with a simple URL (e.g., https://example.com)
   - Test with no URL configured
   - Test with Basic Auth enabled/disabled
   - Test with invalid URLs
   - Test saving/loading settings

2. **Testing Basic Auth:**
   - Use a test server with Basic Auth enabled
   - Verify headers are only sent to matching origins
   - Test with different origins to ensure no header leakage

3. **Browser Console:**
   - Check `newtab.js` console in new tab
   - Check `background.js` console in about:debugging
   - Look for any errors or warnings

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
