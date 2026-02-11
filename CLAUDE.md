# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**New Tab URL** is a Firefox extension that overrides the default new tab page with a custom URL. It includes optional basic authentication support for accessing protected URLs.

## Architecture

This is a Firefox WebExtension that uses the browser extension APIs. The extension should follow this structure:

### Core Components

1. **manifest.json** - Extension manifest defining:
   - Required permissions: `tabs`, `storage`, `webRequest`, `webRequestBlocking`, `<all_urls>`
   - Override for `chrome_url_overrides.newtab`
   - Background script for handling auth injection and toolbar button
   - Browser action (toolbar button) for quick settings access
   - Icons in multiple sizes (16, 32, 48, 96, 128)

2. **newtab.html / newtab.js** - The new tab page that redirects to the configured URL

3. **background.js** - Background script that handles:
   - Basic authentication header injection when enabled
   - Toolbar button click → opens options page
   - Settings caching and management
   - HTTP request interception for auth

4. **options.html / options.js** - User interface for:
   - Setting custom URL
   - Enabling/disabling basic auth
   - Configuring username and password for basic auth
   - Form validation and error handling

5. **Toolbar Button** - Browser action in toolbar:
   - Provides quick access to settings
   - Shows extension icon (gradient design with browser tab symbol)
   - Click opens options page in new tab

### Data Storage

Use `browser.storage.local` (NOT sync for privacy) to store:
- `customUrl` - The URL to open in new tabs
- `enableBasicAuth` - Boolean flag
- `authUsername` - Username for basic auth
- `authPassword` - Password for basic auth (stored in plaintext, warn users!)

### Icons

Modern gradient icons created with Python/Pillow in multiple sizes:
- 16x16 - Toolbar icon
- 32x32 - Toolbar @2x
- 48x48 - Extension management
- 96x96 - Extension management @2x
- 128x128 - AMO listing

Regenerate icons:
```bash
cd icons
python3 generate_fancy_icons.py
```

## Development Commands

### Testing the Extension

Firefox doesn't require a build step for development. Test directly:

```bash
# Open Firefox and navigate to about:debugging
# Click "This Firefox" → "Load Temporary Add-on"
# Select the manifest.json file
```

### Packaging for Distribution

Use the provided packaging script (recommended):
```bash
./package.sh
# Creates dist/new-tab-url-{version}.zip with only necessary files
```

Or use web-ext tool:
```bash
npm install -g web-ext
web-ext build
```

Or manually:
```bash
zip -r new-tab-url.zip manifest.json newtab.html newtab.js background.js options.html options.js icons/*.png -x ".*" -x "__MACOSX"
```

### Running with web-ext

```bash
# Auto-reload during development
web-ext run

# Run with specific Firefox profile
web-ext run --firefox-profile=/path/to/profile
```

## Security Considerations

- Basic auth credentials stored in extension storage are not encrypted by default
- Consider warning users about credential storage in the UI
- Use `webRequest` API with `blocking` permission carefully to inject auth headers
- The extension needs `<all_urls>` permission to inject auth headers for any URL

## Firefox-Specific APIs

- Use `browser.*` namespace (WebExtensions API) not `chrome.*`
- `browser.browserAction.onClicked` - Handle toolbar button clicks
- `browser.runtime.openOptionsPage()` - Open options page
- `browser.webRequest.onBeforeSendHeaders` - Inject auth headers (blocking mode)
- `browser.storage.local` - Store settings locally (not synced)
- `browser.storage.onChanged` - Listen for settings changes
- `chrome_url_overrides.newtab` - Override new tab page

## File Structure

```
firefox_extention/
├── manifest.json           # Extension manifest (Manifest V2)
├── background.js           # Auth injection & toolbar handler
├── newtab.html/newtab.js  # New tab redirect logic
├── options.html/options.js # Settings UI
├── icons/                  # Extension icons (16-128px)
│   ├── icon-*.png         # Generated icons
│   └── generate_fancy_icons.py  # Icon generator script
├── package.sh              # Packaging script
├── dist/                   # Built packages (git-ignored)
├── README.md               # User documentation
├── CLAUDE.md               # This file (Claude Code guidance)
├── AGENTS.md               # AI agent architecture guidance
├── QUICKSTART.md           # Quick start guide
├── TESTING.md              # Testing checklist
└── PUBLISHING.md           # AMO submission guide
```

## Documentation Hierarchy

When working on this project, consult documentation in this order:

1. **AGENTS.md** - Architecture, patterns, and AI agent guidance (detailed)
2. **CLAUDE.md** - This file (quick reference for Claude Code)
3. **Code comments** - Inline documentation
4. **README.md** - User-facing documentation
5. **QUICKSTART.md** / **TESTING.md** / **PUBLISHING.md** - Specific guides

## Key Features

- ✅ Custom URL new tab override
- ✅ HTTP Basic Authentication support
- ✅ Toolbar button for quick settings access
- ✅ Modern gradient icons (5 sizes)
- ✅ Settings validation and error handling
- ✅ Origin-based auth header injection
- ✅ Comprehensive documentation
