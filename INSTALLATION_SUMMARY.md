# Installation Methods - Quick Reference

## 🔧 Development Installation (Testing Your Code)

**Method:** Load from source files  
**File:** `manifest.json` (from project root)  
**Location:** `about:debugging` → "Load Temporary Add-on"  
**Signature Required:** No  
**Stays After Restart:** No (must reload each time)  
**Documentation:** See [INSTALL_DEV.md](INSTALL_DEV.md)

### Steps:
```
1. Open about:debugging
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select manifest.json
5. Done!
```

## 📦 Production Installation (Publishing)

### For Developers (Submitting to AMO)
**Method:** Upload package to AMO  
**File:** `dist/new-tab-url-1.0.0.zip`  
**Location:** https://addons.mozilla.org/developers/  
**Signature Required:** Yes (AMO signs it)  
**Documentation:** See [PUBLISHING.md](PUBLISHING.md)

### For End Users (Installing from AMO)
**Method:** Install from Firefox Add-ons store  
**File:** None (installed via browser)  
**Location:** AMO listing page  
**Signature Required:** Yes (auto-signed by AMO)  
**Stays After Restart:** Yes (permanent)

## ❌ Common Mistake: "Corrupt File" Error

**Problem:** Trying to install `dist/new-tab-url-1.0.0.zip` locally

**Why it fails:**
- Firefox requires extensions to be signed
- .zip files can't be installed directly (security feature)
- Only signed .xpi files work for direct installation

**Solution:** Use development installation method above

## 📊 Comparison Table

| Feature | Development | Production (AMO) | Self-Distribution |
|---------|-------------|------------------|-------------------|
| **Installation file** | manifest.json | N/A (from AMO) | .xpi (signed) |
| **Method** | about:debugging | AMO website | File or URL |
| **Signature** | Not needed | Auto-signed | Manual signing |
| **Persistent** | No | Yes | Yes |
| **Auto-update** | No | Yes | Optional |
| **Best for** | Testing code | End users | Enterprise |

## 🔄 Development Workflow

### Initial Setup
```bash
# Load extension
about:debugging → Load Temporary Add-on → manifest.json
```

### Making Changes
```bash
# 1. Edit code files
# 2. Go to about:debugging
# 3. Click "Reload" next to extension
# 4. Test changes
```

### Auto-Reload (Advanced)
```bash
npm install -g web-ext
cd /Users/antond/Documents/work/some_stuff/my_projects/firefox_extention
web-ext run
# Opens Firefox with extension and auto-reloads on changes
```

## 🚀 Publishing Workflow

### Prepare
```bash
# Update version in manifest.json
# Update author info
# Test thoroughly
```

### Package
```bash
./package.sh
# Creates dist/new-tab-url-{version}.zip
```

### Submit
```
1. Go to https://addons.mozilla.org/developers/
2. Submit new add-on
3. Upload .zip file
4. Fill out details
5. Submit for review
```

### After Approval
```
- Extension goes live on AMO
- Users can install normally
- Automatic updates work
```

## 🆘 Troubleshooting

### "This add-on is corrupt"
→ You're trying to install the .zip file directly  
→ Use development installation method instead

### "Extension not signed"
→ Normal for temporary add-ons  
→ Only applies when installing .xpi/.zip files  
→ Use "Load Temporary Add-on" instead

### "Extension disappears after restart"
→ Normal for temporary add-ons  
→ Reload via about:debugging  
→ Or publish to AMO for permanent installation

### "Can't find Load Temporary Add-on button"
→ Make sure you're on `about:debugging#/runtime/this-firefox`  
→ Click "This Firefox" in left sidebar  
→ Button should be visible at top

## 📚 Documentation Index

- **[INSTALL_DEV.md](INSTALL_DEV.md)** - Detailed development installation guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start for first-time users
- **[PUBLISHING.md](PUBLISHING.md)** - How to publish to AMO
- **[TESTING.md](TESTING.md)** - Testing checklist
- **[README.md](README.md)** - Project overview

## 🎯 Quick Decision Guide

**I want to:** → **You should:**

- Test my code → Load from source (about:debugging)
- Share with friends → Publish to AMO first
- Publish extension → Use dist/*.zip file on AMO
- Deploy in company → Use Enterprise policies or AMO
- Distribute myself → Sign with web-ext, distribute .xpi

---

**Remember:** 
- Development = Load manifest.json via about:debugging
- Production = Publish .zip to AMO
- Never try to install .zip locally (it won't work!)
