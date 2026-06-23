---
name: Nexus Learning Ethos
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#46464a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#77777b'
  outline-variant: '#c7c6ca'
  surface-tint: '#5f5e5f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1c'
  on-primary-container: '#858384'
  inverse-primary: '#c8c6c7'
  secondary: '#00677f'
  on-secondary: '#ffffff'
  secondary-container: '#00ccf9'
  on-secondary-container: '#005266'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271900'
  on-tertiary-container: '#ac7b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e3'
  primary-fixed-dim: '#c8c6c7'
  on-primary-fixed: '#1c1b1c'
  on-primary-fixed-variant: '#474647'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#ffba20'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  slate-gray: '#4B5563'
  surface-off-white: '#F9FAFB'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  section-padding: 96px
---

## Brand & Style
The design system is engineered for high-conversion educational environments, blending the authority of an established institution with the agility of a modern AI startup. The aesthetic is **Corporate / Modern** with a strong leaning toward **Minimalism**.

The visual narrative focuses on clarity and momentum. We utilize generous white space to reduce cognitive load, allowing the high-contrast typography to guide the user through the curriculum. The "Premium Educational" feel is achieved through precision alignment, a restricted color palette, and the removal of unnecessary decorative elements. The interface should feel expensive, curated, and intellectually rigorous.

## Colors
The palette is built on a foundation of "Deep Slate/Black" (#0A0A0B) to establish immediate trust and authority. This is contrasted against a pure white background to maintain an "educational" feel.

- **Primary:** Used for the heaviest typographic elements and core branding. It represents the "Launchpad" base.
- **Secondary (Electric Blue):** Reserved exclusively for primary Calls to Action (CTAs), progress indicators, and interactive highlights.
- **Tertiary (Gold):** Used sparingly for "Premium" callouts, trust badges, and specific success markers within the curriculum.
- **Neutral:** Pure white is the primary canvas, with `surface-off-white` used for section breaks to define content blocks without using heavy lines.

## Typography
The typography strategy uses a "High-Contrast Pairing." 

**Montserrat** is used for all headlines to provide a bold, geometric, and modern presence. Tighten letter-spacing on larger display sizes to increase visual impact and professional tension.

**Inter** is the workhorse for all body copy and labels. It provides exceptional legibility for educational content. Use the `label-md` style for "Four Pillars" headers and small eyebrows above main headlines to establish a clear information hierarchy. All body text should maintain a 1.5x line-height ratio at minimum to ensure readability.

## Layout & Spacing
The layout follows a **Fixed Grid** system (12 columns) on desktop to maintain the "editorial" quality of the brand.

- **Desktop:** 12-column grid, 1280px max width. Focus on centered content or 6/6 splits for landing page heroes.
- **Section Breaks:** Use 96px to 128px of vertical padding to clearly separate the "Four Pillars" from the "Curriculum" and "Testimonials."
- **Rhythm:** Use an 8px base unit. All internal component spacing (padding/margins) should be multiples of 8.
- **Mobile:** Transition to a single-column fluid layout with 16px horizontal margins and reduced vertical section padding (64px).

## Elevation & Depth
This design system uses **Tonal Layers** and **Ambient Shadows** to create a sense of quality without clutter.

- **Surface Levels:** The main background is white. Secondary content blocks (like the Curriculum list) should sit on `surface-off-white` backgrounds with no borders.
- **Shadows:** Use extremely soft, high-diffusion shadows for cards (e.g., `box-shadow: 0 20px 40px rgba(10, 10, 11, 0.05)`). The shadows should be barely perceptible, serving only to separate the element from the background.
- **CTAs:** Primary buttons should have a slight "lift" shadow using a tinted version of the accent color to make them feel interactable and prominent.

## Shapes
A **Rounded** (0.5rem / 8px) shape language is applied across the system. 

This specific radius strikes a balance between "Software/Modern" and "Professional/Stable." Apply this 8px radius to buttons, input fields, and featured cards. For larger containers (like the main Curriculum block), use `rounded-xl` (1.5rem / 24px) to create a "container" feel that anchors the page content. Iconography containers within the "Four Pillars" section should use a circular/pill shape to contrast against the rectangular grid.

## Components
- **Buttons:** Primary CTAs must use `#00D1FF` with white text, bold weight, and a 56px height for prominence. Secondary buttons use an outline of `#0A0A0B`.
- **Cards (The Four Pillars):** Use a white background, 8px rounded corners, and a subtle ambient shadow. Icons should be placed in a 48x48px `#F9FAFB` square with a 12px radius.
- **Curriculum List:** Use a "Timeline" style vertical line. Each module should be a list item with a `label-md` module number (e.g., MODULE 01) in `#00D1FF`.
- **Trust Badges:** Render logos in monochrome (using `slate-gray`) to prevent visual noise while maintaining the premium aesthetic.
- **Input Fields:** 48px height, 1px border of `#E5E7EB`. On focus, the border transitions to `#00D1FF`.
- **Chips:** For "Live" or "New" status markers, use small pill-shaped badges with the `#FFB800` background and `#0A0A0B` text for high-contrast urgency.