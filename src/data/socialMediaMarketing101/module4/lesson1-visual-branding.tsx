import type { Lesson } from '@/types/course';

export const lesson1VisualBranding: Lesson = {
  id: 1,
  title: 'Visual Branding Guide',
  duration: '55 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/y_2P5o_msuo',
    textContent: `
# Visual Branding Guide 🎨


This guide outlines the key components of visual branding, including colors, fonts, and imagery, to ensure a consistent and impactful brand identity. A strong visual brand enhances recognition, communicates values, and builds trust with your audience.

## Colors

A well-defined color palette is essential for creating a cohesive brand identity. Colors evoke emotions, convey meaning, and ensure visual consistency across all brand touchpoints.

### Primary Color Palette

The primary colors are the foundation of the brand's visual identity and should be used prominently in logos, backgrounds, and key design elements.

**Brand Blue:**
* Hex: #0057B8
* RGB: (0, 87, 184)
* CMYK: (100%, 53%, 0%, 28%)
* Usage: Main brand elements like logos, headers, and call-to-action buttons.
* Emotion: Trust, professionalism, reliability.

**Brand White:**
* Hex: #FFFFFF
* RGB: (255, 255, 255)
* CMYK: (0%, 0%, 0%, 0%)
* Usage: Backgrounds, text, and negative space for clean, modern aesthetics.
* Emotion: Simplicity, clarity, openness.

### Secondary Color Palette

Secondary colors complement the primary palette and add depth to designs. Use sparingly for accents, highlights, or supporting elements.

**Sunset Orange:**
* Hex: #FF6200
* RGB: (255, 98, 0)
* CMYK: (0%, 62%, 100%, 0%)
* Usage: Accents, buttons, or highlights to draw attention.
* Emotion: Energy, creativity, warmth.

**Slate Gray:**
* Hex: #4A4A4A
* RGB: (74, 74, 74)
* CMYK: (0%, 0%, 0%, 71%)
* Usage: Secondary text, borders, or subtle backgrounds.
* Emotion: Neutrality, sophistication, balance.

### Color Guidelines

* **Consistency**: Use the primary palette for 70-80% of designs, with secondary colors for accents (20-30%).
* **Accessibility**: Ensure sufficient contrast ratios (e.g., Brand Blue text on Brand White background meets WCAG 2.1 AA standards with a contrast ratio of 4.5:1 for text).
* **Cultural Sensitivity**: Consider color meanings in different cultures (e.g., white symbolizes purity in Western cultures but mourning in some Eastern cultures).
* **Testing**: Test colors across digital (RGB) and print (CMYK) mediums to ensure consistency.

## Fonts

Typography establishes the brand's tone and ensures readability. A combination of fonts creates hierarchy and visual interest while maintaining consistency.

### Primary Font: Roboto

* **Type**: Sans-serif
* **Weights**: Light (300), Regular (400), Medium (500), Bold (700)
* **Usage**:
  * Headings: Roboto Bold (700) for titles and H1-H2 headings.
  * Subheadings: Roboto Medium (500) for H3-H4 headings.
  * Body Text: Roboto Regular (400) for paragraphs and captions.
* **Why Roboto?**: Clean, modern, and highly legible across digital and print mediums. Its versatility supports a professional yet approachable tone.
* **Source**: Available via Google Fonts (free for commercial use).

### Secondary Font: Lora

* **Type**: Serif
* **Weights**: Regular (400), Italic, Bold (700)
* **Usage**:
  * Quotes or Pull Text: Lora Italic for emphasis or testimonials.
  * Decorative Elements: Lora Bold for special callouts or print materials.
* **Why Lora?**: Adds warmth and elegance, contrasting with Roboto's modernity for a balanced look.
* **Source**: Available via Google Fonts.

### Typography Guidelines

* **Hierarchy**: Use font weights and sizes to create clear visual hierarchy (e.g., H1: 32px Roboto Bold, Body: 16px Roboto Regular).
* **Line Spacing**: Maintain 1.5x line height for body text to improve readability.
* **Pairing**: Avoid using more than two font families to maintain cohesion.
* **Accessibility**: Ensure font sizes are legible (minimum 16px for body text) and avoid low-contrast text-background combinations.
* **Licensing**: Confirm fonts are licensed for commercial use in both digital and print formats.

## Imagery

Imagery shapes the brand's narrative and emotional impact. It includes photography, illustrations, icons, and other visual elements.

### Photography

* **Style**: Authentic, candid, and high-resolution imagery that reflects real-world scenarios.
* **Subject Matter**:
  * People: Diverse, inclusive representations of individuals or teams in natural settings.
  * Environments: Modern workspaces, urban landscapes, or minimalistic backgrounds.
  * Products/Services: Showcase products in use or services in action to highlight value.
* **Editing Guidelines**:
  * Filters: Use subtle, natural filters to enhance lighting without altering authenticity.
  * Aspect Ratios: Standardize to 16:9 for digital, 4:3 for print, or square (1:1) for social media.
  * Resolution: Minimum 300 DPI for print, 72 DPI for digital (optimized for web).

### Illustrations

* **Style**: Clean, flat design with a minimalist aesthetic.
* **Color Palette**: Use colors from the primary and secondary palettes (e.g., Brand Blue for main elements, Sunset Orange for accents).
* **Usage**: Ideal for infographics, icons, or explainer visuals to simplify complex ideas.
* **Tools**: Create using vector-based software like Adobe Illustrator or Figma for scalability.

### Icons

* **Style**: Simple, monochromatic line icons with consistent stroke width (e.g., 2px).
* **Usage**: Navigation menus, UI elements, or to highlight key features/services.
* **Source**: Use open-source libraries like FontAwesome or create custom icons matching the brand's aesthetic.

### Imagery Guidelines

* **Consistency**: Maintain a unified style across all visuals (e.g., avoid mixing cartoonish illustrations with realistic photography).
* **Branding**: Incorporate brand colors or logo watermarks subtly in imagery for recognition.
* **Accessibility**: Include alt text for all digital images (e.g., "Team collaborating in modern office, Brand Blue background").
* **Diversity**: Reflect inclusivity in imagery, representing various demographics and cultures.
* **Licensing**: Use royalty-free or custom imagery to avoid legal issues. Sources like Unsplash or Pexels are recommended for free stock photos.

## Application Across Platforms

* **Digital**: Websites, social media, and emails should prioritize the primary color palette, Roboto font, and high-resolution imagery optimized for fast loading (e.g., compress images to under 200KB).
* **Print**: Business cards, brochures, and posters should use CMYK colors, high-DPI imagery, and ensure fonts are embedded for consistent rendering.
* **Merchandise**: Apply the logo and primary colors to items like t-shirts or mugs, ensuring scalability and legibility.

## Tools and Resources

* **Color Management**: Use tools like Coolors or Adobe Color to refine palettes and check accessibility.
* **Font Management**: Google Fonts for sourcing Roboto and Lora; FontSquirrel for additional free fonts.
* **Image Editing**: Adobe Photoshop for photography, Figma or Canva for quick design iterations.
* **Brand Guidelines**: Create a style guide document (e.g., in Figma or PDF) to share with teams for consistent application.

By adhering to these guidelines, the brand will maintain a professional, cohesive, and memorable visual identity across all touchpoints.
    `
  }
};

