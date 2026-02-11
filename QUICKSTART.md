# Quick Start Guide

This guide will help you load and test the New Tab URL extension in Firefox.

⚠️ **IMPORTANT:** If you're seeing a "corrupt file" error, see [INSTALL_DEV.md](INSTALL_DEV.md) for the correct installation method. Don't use the .zip file for development!

## Step 1: Load the Extension

⚠️ **Important:** Don't try to install the .zip file from `dist/` - it will show a "corrupt" error! For development, you must load from source files.

1. Open Firefox
2. Type `about:debugging` in the address bar and press Enter
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on..."** button
5. Navigate to this directory: `/Users/antond/Documents/work/some_stuff/my_projects/firefox_extention/`
6. Select **`manifest.json`** (NOT the .zip file!)
7. Click "Open"
8. The extension should now appear in the list of temporary extensions
9. The toolbar icon (blue gradient) should appear in your Firefox toolbar

## Step 2: Configure the Extension

### Option A: Using the Toolbar Button (Easiest!)
1. Look for the **New Tab URL icon** in your Firefox toolbar (blue icon with browser tab symbol)
2. Click the icon
3. Settings page opens automatically

### Option B: Using the Add-ons Manager
1. Type `about:addons` in the address bar
2. Find "New Tab URL" in the list
3. Click the **gear icon** next to the extension
4. Select **"Options"** or **"Preferences"**

### Option C: Direct URL
Open this URL in Firefox:
```
about:addons?search=New%20Tab%20URL
```

## Step 3: Set Your Custom URL

1. In the options page, enter your desired URL in the "Custom URL" field
   - Example: `https://example.com`
   - Example: `https://dashboard.internal.company.com`
   - Must include `https://` or `http://`

2. Click **"Save Settings"**

3. Open a new tab (Ctrl+T or Cmd+T)
   - You should be redirected to your custom URL

## Step 4: Test Basic Authentication (Optional)

If your URL requires HTTP Basic Authentication:

1. Open the extension options page again
2. Check **"Enable HTTP Basic Authentication"**
3. Enter your **username**
4. Enter your **password**
5. Read the security warning
6. Click **"Save Settings"**
7. Open a new tab
   - You should be automatically authenticated (no password prompt)

## Troubleshooting

### Extension doesn't load
- **Check file structure**: Ensure all files are present (manifest.json, newtab.html, newtab.js, background.js, options.html, options.js)
- **Check for errors**: Look for error messages in the "This Firefox" page in about:debugging
- **Missing icons**: Icons are optional - the extension will work without them

### New tab doesn't redirect
- **Verify URL is saved**: Open options page and check if your URL is there
- **Check URL format**: Must start with `https://` or `http://`
- **Open browser console**: Press F12 in the new tab and look for errors in the console
- **Check storage**: In the console, type: `browser.storage.local.get().then(console.log)`

### Basic Auth not working
- **Verify settings**: Open options and ensure auth is enabled with username/password
- **Check background console**:
  1. Go to `about:debugging#/runtime/this-firefox`
  2. Find "New Tab URL" extension
  3. Click **"Inspect"** to open the background page console
  4. Look for auth-related messages
- **Check URL matches**: Auth headers are only injected for the same origin as your custom URL
- **Test with curl**: Verify your credentials work:
  ```bash
  curl -u username:password https://your-url.com
  ```

### Extension stops working after restart
- Temporary extensions are removed when Firefox closes
- For permanent installation, you need to:
  1. Package the extension: `web-ext build`
  2. Submit to Firefox Add-ons (addons.mozilla.org)
  3. Or use a Firefox Developer Edition/Nightly with an unbranded build to load unsigned extensions

## Quick Test URLs

### Without Authentication
- `https://example.com` - Simple test page
- `https://duckduckgo.com` - Search engine
- `https://news.ycombinator.com` - Hacker News

### With Authentication
You'll need your own basic-auth protected URL to test this feature. You can set up a test server:

```bash
# Using Python with http.server
python3 -c "
from http.server import HTTPServer, SimpleHTTPRequestHandler
import base64

class AuthHandler(SimpleHTTPRequestHandler):
    def do_HEAD(self):
        self.send_auth_header()
    def do_GET(self):
        if self.headers.get('Authorization') == 'Basic ' + base64.b64encode(b'user:pass').decode():
            return SimpleHTTPRequestHandler.do_GET(self)
        self.send_auth_header()
    def send_auth_header(self):
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm=\"Test\"')
        self.end_headers()

HTTPServer(('', 8000), AuthHandler).serve_forever()
"
# Then use http://localhost:8000 with user:pass
```

## Development Workflow

For active development with auto-reload:

```bash
# Install web-ext (one time)
npm install -g web-ext

# Run with auto-reload
cd /Users/antond/Documents/work/some_stuff/my_projects/firefox_extention
web-ext run

# In another terminal, make changes to files
# web-ext will automatically reload the extension
```

## Next Steps

- Add custom icons (see `icons/README.md`)
- Customize the new tab loading page in `newtab.html`
- Add more configuration options in `options.html`
- Package for distribution with `web-ext build`

## Useful Firefox URLs

- `about:debugging` - Load and debug extensions
- `about:addons` - Manage installed extensions
- `about:config` - Advanced Firefox settings
- `about:support` - Troubleshooting information

## Support

If you encounter issues:
1. Check the browser console (F12) for errors
2. Check the background page console in about:debugging
3. Review the README.md for detailed documentation
4. Check Firefox extension documentation: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
