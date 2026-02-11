#!/bin/bash
# Package script for Firefox extension submission

echo "📦 Packaging New Tab URL Extension..."

# Create output directory if it doesn't exist
mkdir -p dist

# Get version from manifest.json
VERSION=$(grep -o '"version": "[^"]*' manifest.json | cut -d'"' -f4)
OUTPUT_FILE="dist/new-tab-url-${VERSION}.zip"

echo "Version: ${VERSION}"

# Remove old package if exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
    echo "Removed old package"
fi

# Create the zip file with only necessary files
zip -r "$OUTPUT_FILE" \
  manifest.json \
  background.js \
  newtab.html \
  newtab.js \
  options.html \
  options.js \
  icons/icon-16.png \
  icons/icon-32.png \
  icons/icon-48.png \
  icons/icon-96.png \
  icons/icon-128.png \
  -x "*.DS_Store" \
  -x "__MACOSX/*"

echo ""
echo "✅ Package created: $OUTPUT_FILE"
echo ""
echo "📋 Package contents:"
unzip -l "$OUTPUT_FILE"

echo ""
echo "📊 Package size:"
ls -lh "$OUTPUT_FILE" | awk '{print $5}'

echo ""
echo "🚀 Ready for submission to addons.mozilla.org!"
echo "📖 See PUBLISHING.md for submission instructions"
