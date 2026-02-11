#!/usr/bin/env python3
"""
Generate fancy icons for the Firefox extension.
Creates a modern, gradient design with a tab/link symbol.
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
import math

def create_gradient_background(size, color1, color2):
    """Create a radial gradient background."""
    img = Image.new('RGB', (size, size), color1)
    draw = ImageDraw.Draw(img)

    center = size // 2
    max_radius = size * 0.7

    for radius in range(int(max_radius), 0, -1):
        # Calculate color interpolation
        t = radius / max_radius
        r = int(color1[0] * t + color2[0] * (1 - t))
        g = int(color1[1] * t + color2[1] * (1 - t))
        b = int(color1[2] * t + color2[2] * (1 - t))

        # Draw circle
        bbox = [
            center - radius,
            center - radius,
            center + radius,
            center + radius
        ]
        draw.ellipse(bbox, fill=(r, g, b))

    return img

def add_rounded_rectangle(draw, coords, radius, fill):
    """Draw a rounded rectangle."""
    x1, y1, x2, y2 = coords

    # Draw main rectangles
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)

    # Draw corners
    draw.pieslice([x1, y1, x1 + radius * 2, y1 + radius * 2], 180, 270, fill=fill)
    draw.pieslice([x2 - radius * 2, y1, x2, y1 + radius * 2], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - radius * 2, x1 + radius * 2, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - radius * 2, y2 - radius * 2, x2, y2], 0, 90, fill=fill)

def create_fancy_icon(size, filename):
    """Create a fancy icon with gradient and modern design."""
    # Colors - Firefox blue gradient
    bg_color1 = (0, 96, 223)    # #0060df (Firefox blue)
    bg_color2 = (0, 150, 255)   # Lighter blue
    fg_color = (255, 255, 255)  # White
    accent_color = (0, 200, 255) # Light cyan accent

    # Create gradient background
    img = create_gradient_background(size, bg_color2, bg_color1)
    draw = ImageDraw.Draw(img)

    # Calculate proportional sizes
    padding = size // 5
    corner_radius = size // 16

    # Draw browser window frame (rounded rectangle)
    window_coords = [
        padding,
        padding + size // 8,
        size - padding,
        size - padding
    ]
    add_rounded_rectangle(draw, window_coords, corner_radius, fg_color)

    # Draw tab shape on top with shadow effect
    tab_width = size // 3
    tab_height = size // 7
    tab_x = padding + size // 8
    tab_y = padding

    # Shadow
    shadow_offset = size // 40
    shadow_color = (0, 0, 0, 50)
    shadow_coords = [
        tab_x + shadow_offset,
        tab_y + shadow_offset,
        tab_x + tab_width + shadow_offset,
        tab_y + tab_height + shadow_offset
    ]

    # Draw tab with rounded top corners
    tab_coords = [tab_x, tab_y, tab_x + tab_width, tab_y + tab_height]
    add_rounded_rectangle(draw, tab_coords, corner_radius, fg_color)

    # Add a subtle link/arrow icon inside the window
    # Draw a simple arrow/forward symbol
    arrow_size = size // 6
    arrow_x = size // 2 - arrow_size // 2
    arrow_y = size // 2 + size // 10

    # Arrow shaft
    draw.rectangle(
        [arrow_x, arrow_y, arrow_x + arrow_size - arrow_size // 4, arrow_y + arrow_size // 8],
        fill=accent_color
    )

    # Arrow head (triangle)
    arrow_head = [
        (arrow_x + arrow_size - arrow_size // 4, arrow_y - arrow_size // 8),
        (arrow_x + arrow_size, arrow_y + arrow_size // 16),
        (arrow_x + arrow_size - arrow_size // 4, arrow_y + arrow_size // 4)
    ]
    draw.polygon(arrow_head, fill=accent_color)

    # Add subtle highlight on top left
    highlight = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    highlight_draw = ImageDraw.Draw(highlight)
    highlight_draw.ellipse(
        [size // 4, size // 4, size // 2, size // 2],
        fill=(255, 255, 255, 30)
    )
    img = Image.alpha_composite(img.convert('RGBA'), highlight).convert('RGB')

    # Save the image
    img.save(filename, 'PNG')
    print(f"Created fancy icon: {filename}")

def create_all_sizes():
    """Create icons in all required sizes."""
    sizes = {
        'icon-16.png': 16,   # Toolbar
        'icon-32.png': 32,   # Toolbar @2x
        'icon-48.png': 48,   # Extension management
        'icon-96.png': 96,   # Extension management @2x
        'icon-128.png': 128  # Firefox Add-ons site
    }

    for filename, size in sizes.items():
        create_fancy_icon(size, filename)

    print("\n✅ All fancy icons created successfully!")
    print("📦 Icon sizes: 16x16, 32x32, 48x48, 96x96, 128x128")
    print("🎨 Design: Modern gradient with browser tab and link symbol")

if __name__ == '__main__':
    create_all_sizes()
