# AGENTS.md

This file provides guidance to AI agents (including Claude Code) when working with this Firefox extension codebase.

## Project Type: Firefox WebExtension

This is a **Firefox WebExtension** (browser extension) that overrides the default new tab page with a custom URL configured by the user.

## Core Capabilities

1. **New Tab Override:** Replaces Firefox's default new tab with a custom URL
2. **HTTP Basic Authentication:** Optional automatic authentication for protected URLs
3. **Toolbar Button:** Quick access to settings via browser toolbar
4. **Settings Management:** User-friendly configuration interface

## Architecture Overview

### Extension Components

```
manifest.json          # Extension configuration (Manifest V2)
├── browser_action     # Toolbar button that opens settings
├── chrome_url_override # New tab page override
├── background.js      # Background script for auth & toolbar
├── newtab.html/js     # New tab redirect logic
└── options.html/js    # Settings configuration UI
```

### Data Flow

```
User clicks new tab → newtab.html loads → newtab.js reads storage → redirects to customUrl
                                                                    ↓
User navigates to URL ← background.js intercepts request ← injects auth header (if enabled)
```

### Storage Schema

Uses `browser.storage.local`:

```javascript
{
  customUrl: string,           // The URL to redirect new tabs to
  enableBasicAuth: boolean,    // Whether to inject auth headers
  authUsername: string,        // Basic auth username
  authPassword: string         // Basic auth password (plaintext)
}
```

## Key Technical Decisions

### 1. Manifest V2 vs V3
**Decision:** Use Manifest V2
**Reason:** Simpler `webRequest` blocking API for header injection. V3 requires more complex `declarativeNetRequest` which is harder to implement for dynamic auth.

### 2. Storage Type
**Decision:** Use `browser.storage.local` (not `sync`)
**Reason:** Privacy - credentials should not sync across devices

### 3. Browser Action vs Page Action
**Decision:** Browser Action (toolbar button)
**Reason:** Settings should be accessible from any page, not just specific URLs

### 4. Auth Header Injection
**Decision:** Origin-based matching
**Reason:** Only inject auth headers for requests to the same origin as the configured URL, preventing credential leakage

## Code Patterns & Conventions

### File Structure
- **manifest.json:** Extension metadata, permissions, entry points
- **background.js:** Long-running background tasks (auth injection, toolbar handler)
- **newtab.js:** Runs once per new tab, performs redirect
- **options.js:** Runs on options page, handles settings UI

### JavaScript Style
- Modern async/await syntax
- Browser API using `browser.*` namespace (not `chrome.*`)
- Error handling with try/catch blocks
- Console logging for debugging

### HTML/CSS Style
- Clean, minimal design
- Responsive forms
- Inline styles (no external CSS files)
- Accessibility considerations (labels, ARIA)

## Working with This Codebase

### When Making Changes

1. **Always test in Firefox** after changes:
   ```bash
   web-ext run  # Auto-reload during development
   ```

2. **Check browser consoles:**
   - New tab console (F12 in new tab)
   - Background page console (about:debugging)
   - Options page console (F12 in options)

3. **Validate manifest changes:**
   ```bash
   web-ext lint
   ```

4. **Update version number** in manifest.json for releases

### Adding New Features

#### Adding a New Setting

1. Update `browser.storage.local` schema in background.js
2. Add form field to options.html
3. Add validation logic to options.js
4. Update `loadSettings()` in background.js to read new setting
5. Use the setting in relevant component (background/newtab)
6. Update CLAUDE.md with new setting details

#### Adding New Permissions

1. Add permission to manifest.json
2. Document WHY it's needed (for review process)
3. Update privacy policy template in PUBLISHING.md
4. Add explanation to README.md

#### Adding New Icons/UI

1. Update icon generation scripts in `icons/`
2. Regenerate all icon sizes (16, 32, 48, 96, 128)
3. Update manifest.json icon references
4. Test in different contexts (toolbar, addons page, etc.)

### Common Tasks

#### Update Extension Version
```bash
# 1. Edit manifest.json
vim manifest.json  # Update "version": "x.y.z"

# 2. Package for distribution
./package.sh

# 3. Test the package
web-ext run --source-dir dist/
```

#### Debug Auth Issues
```bash
# 1. Open background console
# about:debugging → This Firefox → New Tab URL → Inspect

# 2. Check settings cache
console.log(settingsCache)

# 3. Monitor auth injection
# Look for "Injected Basic Auth header for:" messages

# 4. Check network tab
# Verify Authorization header in request headers
```

#### Test New Tab Redirect
```bash
# 1. Load extension
web-ext run

# 2. Configure URL in options

# 3. Open new tab (Cmd/Ctrl+T)

# 4. Check console for errors
# Press F12 immediately after opening tab
```

## Security Considerations

### ⚠️ Critical Security Notes

1. **Credentials are NOT encrypted**
   - Stored in plaintext in `browser.storage.local`
   - Accessible to anyone with filesystem access
   - Always warn users in UI and documentation

2. **Broad permissions required**
   - `<all_urls>` needed for auth injection
   - Only inject headers for matching origin
   - Clearly document permission usage

3. **XSS Prevention**
   - Validate and sanitize all user inputs
   - Use textContent, not innerHTML
   - Proper URL parsing before redirect

4. **Auth Header Scope**
   - ONLY inject for matching origin
   - Check for existing Authorization header
   - Log injection events for debugging

### Best Practices

- Always use HTTPS URLs for auth-enabled sites
- Validate URLs before storing (use `new URL()`)
- Never log passwords/credentials
- Clear error messages without exposing sensitive data

## Testing Strategy

### Manual Testing Checklist
See TESTING.md for comprehensive checklist. Key areas:

1. **Basic Functionality**
   - New tab redirect works
   - Settings save/load correctly
   - Toolbar button opens settings

2. **Authentication**
   - Headers injected only for matching origin
   - No headers leaked to other sites
   - Credentials work with real auth endpoint

3. **Edge Cases**
   - Invalid URLs
   - Network errors
   - Missing configuration
   - Rapid tab opening

### Automated Testing
Currently no automated tests. Future consideration:
- Unit tests for URL validation
- Integration tests with web-ext
- E2E tests with Selenium/Playwright

## Browser Compatibility

### Target Platform
- **Primary:** Firefox 78+
- **API:** WebExtensions API
- **Manifest:** V2 (not compatible with Chrome)

### Browser APIs Used
- `browser.storage.local` - Settings storage
- `browser.tabs` - New tab override
- `browser.webRequest` - HTTP header injection
- `browser.browserAction` - Toolbar button
- `browser.runtime` - Options page opening

### Known Limitations
- Manifest V2 only (Firefox/older Chrome)
- No Chrome compatibility (uses blocking webRequest)
- Requires desktop Firefox (no mobile support)

## File Dependencies

### Critical Files (Never Delete)
- manifest.json
- background.js
- newtab.html
- newtab.js
- options.html
- options.js
- icons/icon-*.png (16, 32, 48, 96, 128)

### Documentation Files
- README.md - User documentation
- CLAUDE.md - Claude Code instructions
- AGENTS.md - This file (AI agent guidance)
- PUBLISHING.md - AMO submission guide
- QUICKSTART.md - Quick start guide
- TESTING.md - Testing checklist

### Development Files
- package.sh - Packaging script
- icons/generate_fancy_icons.py - Icon generator
- .gitignore - Git ignore rules

### Generated/Build Files
- dist/ - Packaged extension (created by package.sh)
- web-ext-artifacts/ - Created by web-ext build

## External Dependencies

### Runtime Dependencies
**None** - Pure JavaScript, no external libraries

### Development Dependencies
- **web-ext** (optional) - Extension development/testing tool
  ```bash
  npm install -g web-ext
  ```

- **Python 3 + Pillow** (optional) - For icon generation
  ```bash
  pip install pillow
  ```

## Documentation Updates

### When to Update Documentation

1. **CLAUDE.md:** Changes to architecture, APIs, or development workflow
2. **AGENTS.md:** Changes to code patterns, security considerations, or AI guidance
3. **README.md:** User-facing features, installation, usage
4. **PUBLISHING.md:** Distribution process, AMO requirements
5. **QUICKSTART.md:** Getting started steps, quick commands
6. **TESTING.md:** New test cases, testing procedures

### Documentation Priority
1. Code comments for complex logic
2. CLAUDE.md for development guidance
3. README.md for user documentation
4. Other docs as needed

## Getting Help

### For AI Agents
- This file (AGENTS.md) - Architecture and patterns
- CLAUDE.md - Specific Claude Code instructions
- Code comments - Inline explanations

### For Developers
- README.md - Project overview and usage
- QUICKSTART.md - Getting started quickly
- Mozilla Docs - https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions

### For Users
- QUICKSTART.md - Installation and setup
- README.md - Features and troubleshooting

## Version History

### v1.0.0 (Initial Release)
- Custom URL new tab override
- HTTP Basic Authentication support
- Toolbar button for quick settings access
- Modern gradient icons
- Comprehensive documentation

## Future Enhancements

### Potential Features
- Multiple URL profiles (work/home/etc.)
- Time-based URL switching
- Encrypted credential storage
- Import/export settings
- Statistics/usage tracking
- Dark mode for options page

### Migration Considerations
- Manifest V3 support (future)
- Chrome compatibility
- Mobile Firefox support
- OAuth authentication support

## AI Agent Tips

### When Asked to Add Features
1. Check existing patterns in the codebase
2. Follow the established file structure
3. Update all relevant documentation
4. Consider security implications
5. Add appropriate error handling
6. Test in Firefox before committing

### When Debugging Issues
1. Check browser console first (F12)
2. Verify manifest.json syntax
3. Check permissions match API usage
4. Test in clean Firefox profile
5. Review TESTING.md checklist

### When Refactoring
1. Maintain Manifest V2 compatibility
2. Keep storage schema backward compatible
3. Don't break existing functionality
4. Update documentation accordingly
5. Test thoroughly after changes

## Contact & Support

For questions about this codebase structure or architecture decisions, refer to:
- This file (AGENTS.md)
- CLAUDE.md for Claude-specific guidance
- Code comments for implementation details

---

**Last Updated:** Initial creation with v1.0.0
**Maintained By:** Project maintainer (see manifest.json author field)
