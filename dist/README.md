# Distribution Package

## ⚠️ This .zip file is NOT for local installation!

The `new-tab-url-*.zip` file in this directory is **only for publishing to addons.mozilla.org (AMO)**.

## For Development/Testing

**Don't use this .zip file!** It will show a "corrupt" error.

Instead, load the extension from source files:
1. Open Firefox
2. Go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select `manifest.json` from the parent directory

See [../INSTALL_DEV.md](../INSTALL_DEV.md) for detailed instructions.

## For Publishing

This .zip file is ready to submit to addons.mozilla.org:
1. Create account at https://addons.mozilla.org
2. Go to https://addons.mozilla.org/developers/
3. Click "Submit a New Add-on"
4. Upload this .zip file
5. Fill out listing details
6. Submit for review

See [../PUBLISHING.md](../PUBLISHING.md) for complete publishing guide.

## For End Users

End users should NOT download this .zip file directly.

Instead, they should:
- Install from AMO after you publish it
- Get the signed .xpi file from AMO

## Package Contents

This package contains:
- manifest.json
- background.js
- newtab.html/newtab.js
- options.html/options.js
- icons/ (5 sizes: 16, 32, 48, 96, 128px)

Total size: ~14KB
