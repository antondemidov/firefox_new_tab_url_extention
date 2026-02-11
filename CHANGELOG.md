# Changelog

All notable changes to the New Tab URL extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-11

### Added
- **Toolbar Button** - Quick access to settings via browser toolbar icon
  - Click the icon to open settings instantly
  - Shows tooltip "New Tab URL Settings"
  - Visible in Firefox toolbar alongside other extensions

- **Modern Fancy Icons** - Professional gradient design
  - 5 icon sizes: 16px, 32px, 48px, 96px, 128px
  - Blue gradient background with browser tab and arrow symbol
  - Looks great in toolbar, add-ons manager, and AMO listing
  - Generated with Python script (icons/generate_fancy_icons.py)

- **Comprehensive Documentation**
  - AGENTS.md - Detailed AI agent/developer guidance
  - CLAUDE.md - Claude Code specific instructions
  - README.md - User documentation
  - QUICKSTART.md - Getting started guide
  - TESTING.md - Complete testing checklist
  - PUBLISHING.md - AMO submission guide
  - CHANGELOG.md - This file

- **Automated Packaging** - package.sh script
  - Automatically creates dist/new-tab-url-{version}.zip
  - Includes only necessary files for distribution
  - Shows package contents and size

### Core Features (Initial Release)
- Custom URL new tab override
- HTTP Basic Authentication support
- Settings page with validation
- Origin-based auth header injection
- Settings persistence across sessions
- Security warnings for credential storage
- Clean, responsive UI

### Technical Details
- Manifest V2 for better webRequest API support
- Browser action (toolbar button) for quick access
- Background script for auth injection and toolbar handling
- Local storage (not synced) for privacy
- Multiple icon sizes for all contexts
- Proper error handling and validation

### Files Included
- manifest.json - Extension configuration
- background.js - Auth injection & toolbar button handler
- newtab.html/newtab.js - New tab redirect logic
- options.html/options.js - Settings interface
- icons/ - 5 icon sizes (16, 32, 48, 96, 128px)
- Documentation files (README, AGENTS, CLAUDE, QUICKSTART, TESTING, PUBLISHING)
- package.sh - Packaging script

### Package Size
- ~14KB zipped
- ~21KB unzipped
- Very lightweight and fast

---

## Future Versions

### Planned Features
- [ ] Multiple URL profiles (work/personal/etc.)
- [ ] Time-based URL switching (morning/evening URLs)
- [ ] URL templates with variables
- [ ] Keyboard shortcuts for quick profile switching
- [ ] Import/export settings
- [ ] Statistics tracking (optional)
- [ ] Dark mode for options page
- [ ] OAuth authentication support
- [ ] Encrypted credential storage

### Under Consideration
- [ ] Manifest V3 migration (future Firefox requirement)
- [ ] Chrome compatibility (requires V3)
- [ ] Mobile Firefox support
- [ ] Sync settings across devices (opt-in)
- [ ] Custom CSS injection for new tab page
- [ ] Bookmark/history quick access
- [ ] Weather widget
- [ ] Custom shortcuts/bookmarks on new tab

### Known Limitations
- Credentials stored in plaintext (browser.storage limitation)
- Requires broad <all_urls> permission for auth injection
- Manifest V2 only (not Chrome compatible)
- No mobile Firefox support
- No encrypted storage option

---

## Version History

### v1.0.0 (2026-02-11)
Initial public release with:
- Custom URL new tab override
- HTTP Basic Authentication
- Toolbar button
- Modern gradient icons
- Comprehensive documentation

---

## Upgrade Notes

### Upgrading to v1.0.0
This is the initial release. No upgrade needed.

### Future Upgrades
When upgrading:
1. Extension will update automatically if installed from AMO
2. Settings will be preserved (stored in browser.storage.local)
3. No manual action required
4. Check CHANGELOG for new features and changes

---

## Reporting Issues

Found a bug or have a feature request?
- Check existing issues first
- Provide Firefox version and OS
- Include console errors if applicable
- Describe steps to reproduce
- Include screenshots if relevant

---

## Contributing

Contributions are welcome! Before submitting:
1. Read AGENTS.md for architecture guidance
2. Follow existing code patterns
3. Test thoroughly (see TESTING.md)
4. Update documentation as needed
5. Add entry to CHANGELOG.md

---

## Links

- **Source Code:** [GitHub Repository URL]
- **Firefox Add-ons:** [AMO URL after publication]
- **Support:** [Support URL or Email]
- **Documentation:** README.md, AGENTS.md, QUICKSTART.md

---

**Note:** This extension is under active development. Version numbers follow semantic versioning (major.minor.patch).
