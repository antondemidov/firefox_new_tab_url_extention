#!/usr/bin/env python3
"""
Simple script to generate placeholder icons for the Firefox extension.
Requires: pip install pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Error: Pillow is not installed.")
    print("Install it with: pip install pillow")
    exit(1)

def create_icon(size, filename):
    """Create a simple icon with a tab symbol."""
    # Firefox blue color
    bg_color = (0, 96, 223)  # #0060df
    fg_color = (255, 255, 255)

    # Create image with blue background
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw a simple tab/window icon
    padding = size // 4

    # Draw rectangle representing a browser tab
    rect_coords = [
        padding,
        padding + size // 6,
        size - padding,
        size - padding
    ]
    draw.rectangle(rect_coords, fill=fg_color)

    # Draw tab "handle" on top
    tab_coords = [
        padding + size // 6,
        padding,
        padding + size // 3,
        padding + size // 6
    ]
    draw.rectangle(tab_coords, fill=fg_color)

    # Save the image
    img.save(filename, 'PNG')
    print(f"Created {filename}")

if __name__ == '__main__':
    create_icon(48, 'icon-48.png')
    create_icon(96, 'icon-96.png')
    print("\nIcons created successfully!")
    print("You can now load the extension in Firefox.")
