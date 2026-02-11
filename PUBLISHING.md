# Publishing to Firefox Add-ons

This guide walks you through publishing your extension to addons.mozilla.org (AMO).

## Prerequisites

- [ ] Extension is fully tested and working
- [ ] All files are ready (manifest.json, source files, icons)
- [ ] You have a Firefox Account (create at https://accounts.firefox.com)

## Step 1: Prepare Your Extension

### 1.1 Review Your Manifest

Check your `manifest.json` for:
- Correct version number (start with `1.0.0`)
- Appropriate permissions (we're using: tabs, storage, webRequest, webRequestBlocking, <all_urls>)
- Proper metadata (name, description, author)

### 1.2 Add Author Information

Edit `manifest.json` to add author details:

```json
{
  "author": "Your Name",
  "homepage_url": "https://github.com/yourusername/firefox_extension",
  "developer": {
    "name": "Your Name",
    "url": "https://yourwebsite.com"
  }
}
```

### 1.3 Test Thoroughly

Run through the TESTING.md checklist to ensure everything works.

## Step 2: Package Your Extension

### Option A: Using web-ext (Recommended)

```bash
# Install web-ext if not already installed
npm install -g web-ext

# Build the extension (creates a .zip file)
cd /Users/antond/Documents/work/some_stuff/my_projects/firefox_extention
web-ext build

# This creates: web-ext-artifacts/new_tab_url-1.0.0.zip
```

### Option B: Manual Packaging

```bash
# Create a zip file with all necessary files
cd /Users/antond/Documents/work/some_stuff/my_projects/firefox_extention
zip -r new-tab-url-1.0.0.zip \
  manifest.json \
  background.js \
  newtab.html \
  newtab.js \
  options.html \
  options.js \
  icons/icon-48.png \
  icons/icon-96.png

# Verify the zip contents
unzip -l new-tab-url-1.0.0.zip
```

**Important:** Do NOT include:
- Documentation files (README.md, TESTING.md, etc.)
- Development files (.gitignore, CLAUDE.md)
- Source scripts (generate_icons.py)
- Hidden files (.DS_Store, .git)

## Step 3: Create Firefox Add-ons Account

1. Go to https://addons.mozilla.org
2. Click "Register or Log in" (top right)
3. Sign in with your Firefox Account
4. Accept the developer agreement

## Step 4: Submit Your Extension

### 4.1 Start Submission

1. Go to https://addons.mozilla.org/developers/
2. Click **"Submit a New Add-on"**
3. Choose **"On this site"** (for public listing) or **"On your own"** (for self-distribution)

**Recommendation:** Choose "On this site" for automatic updates and better discoverability.

### 4.2 Upload Your Extension

1. Click **"Select a file..."**
2. Upload the `.zip` file created in Step 2
3. Wait for automatic validation
4. Review any validation warnings/errors

**Common Issues:**
- **Large file size:** Our extension is small, should be fine
- **Missing icons:** Make sure icons are included in the zip
- **Invalid permissions:** Our permissions are standard and should pass

### 4.3 Fill Out Extension Details

#### Required Information:

**Add-on Name:**
```
New Tab URL
```

**Add-on Summary (250 characters max):**
```
Override Firefox's default new tab page with your custom URL. Includes optional HTTP Basic Authentication support for accessing protected internal dashboards and services.
```

**Categories:**
- Privacy & Security
- Tabs

**Support Email:**
```
your-email@example.com
```

**Support Website (optional):**
```
https://github.com/yourusername/new-tab-url
```

#### Description (Detailed):

```markdown
# New Tab URL

Replace Firefox's default new tab page with any custom URL of your choice.

## Features

- **Custom URL:** Set any URL to open when you create a new tab
- **Basic Authentication:** Built-in support for HTTP Basic Auth protected URLs
- **Secure Storage:** Settings are stored securely in Firefox's local storage
- **Simple Setup:** Easy-to-use options page for configuration
- **Lightweight:** Minimal resource usage with fast redirects

## Perfect For

- Opening your company's internal dashboard
- Accessing your favorite intranet page
- Redirecting to a custom start page
- Automatically authenticating to protected services

## Privacy

This extension:
- Does NOT collect any data
- Does NOT track your browsing
- Does NOT send any information externally
- Stores settings locally only in your browser

## How to Use

1. Click the extension icon or go to Add-ons settings
2. Enter your desired URL (e.g., https://example.com)
3. Optionally enable Basic Authentication if needed
4. Save settings
5. Open a new tab - enjoy your custom page!

## Permissions Explained

- **tabs:** Required to override the new tab page
- **storage:** Store your settings locally
- **webRequest/webRequestBlocking:** Inject authentication headers when enabled
- **<all_urls>:** Necessary to inject auth headers for any custom URL you configure

## Support

For issues or questions, please visit our support page or email us.
```

### 4.4 Privacy Policy

**Important:** Since the extension handles passwords, you should include a privacy policy.

Click **"Add Privacy Policy"** and enter:

```markdown
# Privacy Policy for New Tab URL

Last Updated: [Current Date]

## Data Collection

New Tab URL does NOT collect, transmit, or share any user data.

## Data Storage

All settings (custom URL, authentication credentials) are stored locally in your browser using Firefox's storage API. This data:
- Never leaves your device
- Is not transmitted to any external servers
- Is only accessible by this extension
- Can be cleared by removing the extension

## Authentication Credentials

If you enable Basic Authentication:
- Credentials are stored locally in your browser
- They are NOT encrypted by the browser storage API
- They are only used to authenticate with the URL you specify
- We recommend using HTTPS URLs only

## Permissions

The extension requests these permissions:
- **tabs:** Override new tab page
- **storage:** Store settings locally
- **webRequest/webRequestBlocking:** Inject auth headers when enabled
- **<all_urls>:** Required to inject auth headers for your custom URL

## Third-Party Services

This extension does not use any third-party services or analytics.

## Contact

For privacy concerns: your-email@example.com
```

### 4.5 Screenshots (Highly Recommended)

Take screenshots of:
1. **Options page** - Show the configuration interface
2. **New tab in action** - Show it redirecting to a custom URL
3. **Settings saved** - Show successful configuration

Requirements:
- Format: PNG or JPG
- Size: At least 1000px wide
- Show actual extension functionality

### 4.6 Version Notes

For version 1.0.0, enter:
```
Initial release with custom URL override and optional HTTP Basic Authentication support.
```

## Step 5: Select Distribution Channel

### On this site (Recommended)
- Public listing on addons.mozilla.org
- Automatic updates for users
- Better discoverability
- Requires Mozilla review (usually 1-7 days)

### On your own
- Self-hosted distribution
- Must manually distribute updates
- Still requires Mozilla signing
- Faster approval (automated)

**Choose:** "On this site" for best user experience

## Step 6: Submit for Review

1. Review all information
2. Check the agreement checkbox
3. Click **"Submit Version"**

## Step 7: Wait for Review

### Review Timeline
- **Automated review:** Few minutes to few hours
- **Manual review:** 1-7 days (typical: 2-3 days)
- **Weekends/holidays:** May take longer

### What Mozilla Reviews
- Code quality and security
- Permission usage appropriateness
- Description accuracy
- Privacy policy compliance

### Review Results

**Approved ✅**
- Extension goes live immediately
- Users can install it
- You'll receive email notification

**Rejected ❌**
- You'll receive reasons for rejection
- Fix issues and resubmit
- Common issues:
  - Missing privacy policy
  - Excessive permissions
  - Security vulnerabilities
  - Misleading description

## Step 8: After Approval

### Your Extension is Live!

Find it at:
```
https://addons.mozilla.org/firefox/addon/[your-extension-slug]/
```

### Promote Your Extension
- Share the link
- Add to your GitHub README
- Post on social media
- Add to your website

### Monitor Statistics
View in your developer dashboard:
- Download counts
- User ratings
- Reviews
- Daily active users

## Updating Your Extension

### When to Update
- Bug fixes
- New features
- Security patches
- Firefox API changes

### How to Update

1. **Update version in manifest.json:**
   ```json
   "version": "1.0.1"
   ```

2. **Package new version:**
   ```bash
   web-ext build
   ```

3. **Submit update:**
   - Go to your developer dashboard
   - Click "New Version" on your extension
   - Upload new package
   - Add version notes
   - Submit for review

4. **Version numbering:**
   - Bug fixes: 1.0.1, 1.0.2, etc.
   - New features: 1.1.0, 1.2.0, etc.
   - Major changes: 2.0.0, 3.0.0, etc.

### Auto-updates
Users with your extension installed will automatically receive updates after approval.

## Important Notes

### API Keys and Secrets
Our extension doesn't use any API keys or external services, but if you add them:
- Never hardcode API keys in source code
- Use browser.storage for user-provided credentials
- Include in privacy policy

### Permissions
The extension requires broad permissions (`<all_urls>`):
- **Justify in description:** Explain it's needed for auth injection
- **Be transparent:** Users will see a warning during installation
- **Privacy policy:** Clearly state how permissions are used

### Support
Provide good support:
- Monitor reviews and respond
- Check support email regularly
- Update extension to fix reported issues

## Troubleshooting Submission

### "Validation failed"
- Check manifest.json syntax
- Ensure all required files are included
- Verify icon files are valid PNG

### "Permissions require justification"
- Add detailed permission explanation in description
- Include privacy policy
- Explain in version notes why permissions are needed

### "Missing privacy policy"
- Our extension handles passwords
- Privacy policy is REQUIRED
- Use the template provided above

### "Extension doesn't work"
- Test in clean Firefox profile
- Check all console errors
- Verify manifest permissions match code usage

## Distribution Alternatives

### Self-Hosting
If you don't want AMO distribution:

1. Submit as "On your own"
2. Get signed .xpi file
3. Host on your server
4. Users install via direct download

**Limitations:**
- No automatic updates
- No AMO discovery
- Users see "unverified" warning

### Enterprise Distribution
For company-internal use only:
- Use Firefox Enterprise policies
- Deploy via GPO or MDM
- No AMO submission needed
- See: https://support.mozilla.org/kb/deploying-firefox-with-extensions

## Resources

- **Developer Hub:** https://addons.mozilla.org/developers/
- **Extension Workshop:** https://extensionworkshop.com/
- **Submission Guide:** https://extensionworkshop.com/documentation/publish/
- **Review Policies:** https://extensionworkshop.com/documentation/publish/add-on-policies/
- **Support Forum:** https://discourse.mozilla.org/c/add-ons/35

## Quick Command Reference

```bash
# Build extension
web-ext build

# Build and ignore certain files
web-ext build --ignore-files README.md TESTING.md CLAUDE.md

# Lint before submission
web-ext lint

# Sign for self-distribution (requires API keys)
web-ext sign --api-key=YOUR_KEY --api-secret=YOUR_SECRET
```

## Checklist Before Submission

- [ ] Tested extension thoroughly (TESTING.md)
- [ ] Updated manifest.json with author info
- [ ] Created clean package (no dev files)
- [ ] Prepared extension description
- [ ] Written privacy policy
- [ ] Created screenshots
- [ ] Firefox Account ready
- [ ] Support email configured

Good luck with your submission! 🚀
