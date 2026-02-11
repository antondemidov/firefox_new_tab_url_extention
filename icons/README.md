# Extension Icons

This directory should contain the extension icons referenced in `manifest.json`:

- `icon-48.png` - 48x48 pixel icon
- `icon-96.png` - 96x96 pixel icon

The extension will work without these icons, but they improve the user experience in:
- Extension management pages (about:addons)
- Browser toolbar
- Permission prompts

## Creating Icons

You can create simple placeholder icons using any image editor, or use ImageMagick:

```bash
# Create simple colored square icons
convert -size 48x48 xc:#0060df icon-48.png
convert -size 96x96 xc:#0060df icon-96.png
```

Or use online tools like:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/

Recommended design:
- Simple, recognizable symbol (like a tab or link icon)
- Firefox blue (#0060df) or custom brand color
- Clear at small sizes
