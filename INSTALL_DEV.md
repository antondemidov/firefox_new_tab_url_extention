# Development Installation Guide

## ⚠️ Important: Don't Use the ZIP File!

The `dist/new-tab-url-1.0.0.zip` file is **only for publishing to AMO** (addons.mozilla.org).

For development/testing, you **must** load the extension from source files, not the zip.

## ✅ Correct Way to Install for Development

### Method 1: Load Temporary Add-on (Recommended)

1. **Open Firefox**

2. **Navigate to:** `about:debugging#/runtime/this-firefox`
   - Or type `about:debugging` in address bar
   - Click "This Firefox" in sidebar

3. **Click:** "Load Temporary Add-on..."

4. **Navigate to:** `/Users/antond/Documents/work/some_stuff/my_projects/firefox_extention/`

5. **Select:** `manifest.json` (NOT the .zip file!)

6. **Result:** Extension loads and appears in toolbar

### Method 2: Using web-ext (Auto-reload)

```bash
# Install web-ext first (one time)
npm install -g web-ext

# Run from extension directory
cd /Users/antond/Documents/work/some_stuff/my_projects/firefox_extention
web-ext run

# This will:
# - Open Firefox automatically
# - Load the extension
# - Auto-reload on file changes
```

## ❌ Why "Install Add-on From File" Doesn't Work

The "Install Add-on From File" option in `about:addons` requires:
- Extension to be **signed by Mozilla**
- Published on AMO or signed via web-ext sign

For development, Firefox intentionally doesn't allow installing unsigned .zip files this way (security feature).

## 🔍 Troubleshooting "Corrupt" Error

If you see "corrupt file" error, you're using the wrong method:

**Problem:** Trying to install `dist/new-tab-url-1.0.0.zip` via:
- Drag-and-drop onto Firefox
- File → "Install Add-on From File" in about:addons
- Double-clicking the .zip file

**Solution:** Use "Load Temporary Add-on" in about:debugging (Method 1 above)

## 📝 Development Workflow

### Initial Load
```bash
# 1. Open about:debugging
# 2. Load Temporary Add-on
# 3. Select manifest.json
```

### Making Changes
```bash
# After editing files:
# 1. Go to about:debugging
# 2. Find your extension
# 3. Click "Reload" button

# OR use web-ext run for auto-reload
```

### Testing
```bash
# 1. Make changes to code
# 2. Reload extension in about:debugging
# 3. Test functionality
# 4. Check console for errors
```

## 🚀 When to Use the ZIP File

The `dist/new-tab-url-1.0.0.zip` file is used for:

1. **Publishing to AMO** (addons.mozilla.org)
   - Submit for review
   - Mozilla signs it
   - Users can install from AMO

2. **Self-Distribution** (Advanced)
   ```bash
   # Sign the extension yourself
   web-ext sign --api-key=YOUR_KEY --api-secret=YOUR_SECRET

   # This creates a signed .xpi file
   # Users can install signed .xpi files
   ```

3. **Enterprise Deployment**
   - Deploy via Firefox Enterprise policies
   - No signature required in managed environment

## 📋 Quick Reference

| Method | Use When | File Type | Requires Signature |
|--------|----------|-----------|-------------------|
| Load Temporary Add-on | Development | manifest.json | No |
| web-ext run | Development | Source files | No |
| Install Add-on From File | Production | .xpi (signed) | Yes |
| AMO Installation | End users | N/A | Yes (auto) |

## ✅ Verify Installation

After loading as temporary add-on, you should see:

1. **Toolbar Icon** - Blue gradient icon appears in toolbar
2. **Extensions List** - Shows in about:addons
3. **No Errors** - No errors in about:debugging console
4. **Working** - New tabs redirect to your configured URL

## 🔧 Common Issues

### "This add-on is not signed"
- **Normal for temporary add-ons**
- Only appears when loading .xpi/.zip files
- Use "Load Temporary Add-on" instead

### "Corrupt file"
- **You're using the wrong method**
- Don't install the .zip file
- Load manifest.json via about:debugging

### "Extension doesn't appear"
- Check for errors in about:debugging console
- Verify all files are present
- Check manifest.json syntax

### Extension disappears after restart
- **This is normal for temporary add-ons**
- Reload via about:debugging after each Firefox restart
- Or use web-ext run
- For permanent installation, publish to AMO

## 💡 Pro Tips

1. **Use web-ext run** for faster development (auto-reload)
2. **Keep about:debugging open** to see reload button
3. **Check console logs** in about:debugging → Inspect
4. **Test in clean profile** to avoid conflicts
5. **Use web-ext lint** to validate before publishing

## 📞 Still Having Issues?

1. Check Firefox version (78+ required)
2. Verify all files exist (manifest.json, icons/, etc.)
3. Check file permissions
4. Look for errors in Browser Console (Ctrl+Shift+J)
5. Try in a new Firefox profile

---

**Remember:** For development, always use "Load Temporary Add-on" with manifest.json, never the .zip file!
