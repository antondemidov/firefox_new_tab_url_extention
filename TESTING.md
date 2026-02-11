# Testing Checklist

Use this checklist to verify the extension works correctly.

## Pre-Testing Setup

- [ ] Firefox is installed (version 78 or later recommended)
- [ ] All extension files are present in the directory
- [ ] You have a test URL ready (e.g., https://example.com)

## Basic Functionality Tests

### 1. Extension Loading
- [ ] Open `about:debugging` in Firefox
- [ ] Click "This Firefox"
- [ ] Click "Load Temporary Add-on"
- [ ] Select `manifest.json` from this directory
- [ ] Extension appears in the list without errors
- [ ] No error messages in the console

### 2. Initial State (No Configuration)
- [ ] Open a new tab (Cmd/Ctrl + T)
- [ ] See "No custom URL configured" message
- [ ] See link to "Configure New Tab URL"
- [ ] Click link opens options page
- [ ] No errors in browser console (F12)

### 3. Options Page Access
- [ ] Can open options from about:addons
- [ ] Can open options via link from new tab
- [ ] Options page displays correctly
- [ ] All form fields are visible and functional

### 3.5. Toolbar Button
- [ ] Extension icon visible in Firefox toolbar (blue gradient with tab symbol)
- [ ] Icon displays correctly (not broken/missing)
- [ ] Click toolbar button opens options page
- [ ] Options page opens in new tab (not popup)
- [ ] Hover shows tooltip "New Tab URL Settings"
- [ ] Right-click shows context menu with "Manage Extension" option

### 4. Basic URL Configuration
- [ ] Enter a valid URL: `https://example.com`
- [ ] Click "Save Settings"
- [ ] See "Settings saved successfully!" message
- [ ] Message auto-hides after 3 seconds
- [ ] Refresh options page - URL is still there

### 5. New Tab Redirect
- [ ] Open a new tab
- [ ] Browser redirects to configured URL
- [ ] No error messages
- [ ] Redirect happens quickly (under 1 second)

### 6. URL Validation
- [ ] Try to save without URL - see error message
- [ ] Try to save invalid URL (e.g., "not a url") - see error
- [ ] Try to save URL without protocol (e.g., "example.com") - see error
- [ ] Error messages are clear and helpful
- [ ] Errors don't prevent fixing and resubmitting

### 7. Changing URLs
- [ ] Save a different URL
- [ ] Open new tab - redirects to new URL
- [ ] Change URL again
- [ ] Verify redirect updates immediately

## Basic Authentication Tests

### 8. Auth UI Toggle
- [ ] Check "Enable HTTP Basic Authentication"
- [ ] Username and password fields become enabled
- [ ] Security warning is visible and readable
- [ ] Uncheck auth checkbox
- [ ] Username and password fields become disabled
- [ ] Username and password fields are hidden

### 9. Auth Validation
- [ ] Enable auth
- [ ] Try to save without username - see error
- [ ] Try to save without password - see error
- [ ] Enter both username and password
- [ ] Save succeeds
- [ ] Reload options page - credentials are preserved

### 10. Auth Functionality
**Note: Requires a basic-auth protected URL**

- [ ] Configure URL that requires basic auth
- [ ] Enable auth and enter valid credentials
- [ ] Save settings
- [ ] Open new tab
- [ ] Page loads without authentication prompt
- [ ] Check background console for "Injected Basic Auth header" message

### 11. Auth Security
- [ ] Auth headers only sent to configured origin
- [ ] Navigate to different origin - no auth header sent
- [ ] Background console shows selective injection
- [ ] Credentials not visible in network inspector

## Edge Cases & Error Handling

### 12. Special URLs
- [ ] Try URL with port: `http://localhost:8080`
- [ ] Try URL with path: `https://example.com/dashboard`
- [ ] Try URL with query: `https://example.com?tab=home`
- [ ] Try URL with hash: `https://example.com#section`
- [ ] All redirect correctly

### 13. Network Errors
- [ ] Configure URL to non-existent domain
- [ ] Open new tab
- [ ] Browser shows normal "can't connect" error
- [ ] Extension doesn't crash

### 14. Storage Persistence
- [ ] Configure extension
- [ ] Close and reopen Firefox
- [ ] Load extension again (about:debugging)
- [ ] Settings are preserved
- [ ] New tab still redirects correctly

### 15. Multiple New Tabs
- [ ] Open multiple new tabs rapidly (Cmd/Ctrl+T several times)
- [ ] All tabs redirect correctly
- [ ] No race conditions or errors
- [ ] Background script handles concurrent requests

## Browser Console Checks

### 16. New Tab Console
Open new tab and check console (F12):
- [ ] No JavaScript errors
- [ ] No CSP (Content Security Policy) violations
- [ ] No CORS errors

### 17. Background Page Console
In about:debugging, click "Inspect" on extension:
- [ ] "Settings loaded" message appears
- [ ] Settings object looks correct
- [ ] If auth enabled: "Injected Basic Auth header" for matching URLs
- [ ] No errors or warnings

### 18. Options Page Console
With options page open, check console (F12):
- [ ] No JavaScript errors
- [ ] Storage operations complete successfully
- [ ] Form validation works correctly

## Performance Tests

### 19. Redirect Speed
- [ ] New tab redirect feels instant (< 100ms)
- [ ] No visible flash or loading delay
- [ ] Comparable to typing URL manually

### 20. Memory Usage
In about:performance:
- [ ] Extension doesn't consume excessive memory
- [ ] No memory leaks after opening many tabs
- [ ] Background page memory stable

## Cleanup Tests

### 21. Removing Configuration
- [ ] Open options
- [ ] Clear the URL field
- [ ] Try to save - see validation error
- [ ] This is correct behavior (URL required)

### 22. Disabling Extension
- [ ] In about:debugging, click "Remove" on extension
- [ ] Open new tab
- [ ] Firefox default new tab page appears
- [ ] Extension fully unloaded

## Final Checks

- [ ] All tests passed
- [ ] No console errors throughout testing
- [ ] Extension behaves predictably
- [ ] Ready for regular use or distribution

## Test Results

Date: _______________

Tester: _______________

Firefox Version: _______________

OS: _______________

Overall Result: ☐ Pass  ☐ Fail

Notes:
_______________________________________________________
_______________________________________________________
_______________________________________________________

## Known Limitations

- Temporary extension is removed on browser restart
- Credentials stored unencrypted in browser storage
- Requires `<all_urls>` permission for auth injection
- Cannot inject auth for already-established connections
