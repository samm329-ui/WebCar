# **App Name**: ScrollMotion Hero

## Core Features:

- Canvas Rendering: Render the image sequence animation using HTML5 Canvas for high performance.
- Scroll-Driven Animation: Animate the image sequence based on the user's scroll position.
- Configurable Frame Loading: Load image frames programmatically based on configurable constants for total frames, path, prefix, and extension.
- Preloading: Preload all image frames before rendering to ensure smooth animation.
- Text Overlays: Display scroll-based text overlays with configurable start, end, position, title, and subtitle.
- Loading Spinner: Show a loading spinner while preloading images.
- Responsive Scaling: Scale the animation and text overlays to fit different screen sizes, ensuring a mobile-friendly experience.

## Style Guidelines:

- Background color: Obsidian Black (#0B0D10) for a ultra-luxury, timeless feel.
- Text color: Platinum White (#F5F6F7) for high contrast and readability.
- Button color: Graphite Gray (#2A2E35) with a subtle hover glow.
- Optional Accent color: Gunmetal (#5C6168) for subtle highlights.
- Primary Headline Font: 'Bebas Neue' (or 'Anton' as alternative) - ALL CAPS, CONDENSED, for hero headlines and section titles. Settings: text-transform: uppercase; letter-spacing: 0.08em – 0.12em; font-weight: 400; line-height: 0.95 – 1.05.
- Secondary/UI/Body Font: 'Inter' (or 'Helvetica Neue' as alternative) - Used for navigation, buttons, paragraphs. Settings: Font-weight range: 400 / 500 / 600; letter-spacing: 0.01em; line-height: 1.4 – 1.6.
- Button Typography: Font-family: Inter; Font-weight: 600; Text-transform: uppercase; Letter-spacing: 0.08em; Font-size: 12–14px.
- Minimal, geometric icons for loading and other UI elements.
- Full-screen canvas with sticky positioning for the animation. Text overlays are positioned absolutely, above the canvas, and fade in/out based on scroll position.
- Smooth, lerp-smoothed animation of image frames based on scroll progress. Fade-in/out animations for text overlays.