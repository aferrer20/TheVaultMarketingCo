# The Vault Marketing Co — Design System

## Overview

**The Vault Marketing Co** is a boutique marketing agency based in St. Petersburg, FL. They engineer complete marketing ecosystems for businesses that don't just compete — they dominate. The team blends creative storytelling, data-driven strategy, and relationship-based influencer networks to deliver results that move the needle in awareness, foot traffic, and revenue.

**Positioning:** Boutique attention. Agency-level power.

### Sources
- **Brand photography / business card:** `uploads/IMG_4846.jpg` (primary brand reference)
- **GitHub repo:** https://github.com/aferrer20/TheVaultMarketingCo (minimal — only a README at time of system creation)
- **Note:** No live codebase or Figma file was accessible beyond the business card image.

---

## Products / Surfaces

1. **Marketing Website** — Primary public-facing website showcasing services, philosophy, case studies, and contact. See `ui_kits/website/`.

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Confident, commanding, and luxurious** — The Vault speaks with authority. No hedging, no filler.
- **"We" for the agency, "you" for the client.** E.g. "We engineer ecosystems. You dominate your market."
- **Short sentences. Punchy verbs.** Copy moves fast and hits hard.
- **Zero fluff.** Every word earns its place. Ruthlessly edited.
- **Aspirational but grounded** — The luxury feel is backed by real results. Claims are specific.

### Casing
- Headlines: **Title Case** or **ALL CAPS** for maximum impact
- Subheads: Sentence case
- Body: Sentence case
- CTAs: ALL CAPS (e.g. "BOOK A DISCOVERY CALL")
- Brand name always: **The Vault Marketing Co** (never "the vault" lowercase in formal contexts)

### Tone Examples
- "We don't run campaigns. We engineer ecosystems."
- "Your competitors are running ads. You're building a legacy."
- "Boutique attention. Agency-level power."
- "Results that move the needle — in awareness, foot traffic, and revenue."
- "Creative storytelling meets data-driven strategy."

### Emoji Usage
- **Never used** in primary brand copy or headlines
- May appear sparingly in social media / informal contexts only

### Writing Rules
- Em dashes (—) used for dramatic pauses and pivots
- Periods on standalone punchy statements
- Oxford comma always
- "We" not "I" — team-first voice

---

## VISUAL FOUNDATIONS

### Color Palette
- **Forest Green (Primary):** `#2C4A3E` — Deep, sophisticated anchor color. Used for backgrounds, hero sections, primary CTAs.
- **Sage Green (Secondary):** `#7A9A8A` — Softer, earthy green. Used for accents, dividers, hover states.
- **Gold (Accent):** `#C9A96E` — Warm metallic gold. Used for decorative elements, highlights, rule lines.
- **Blush Pink:** `#E8C4B4` — Soft, warm pink. Used for light backgrounds, subtle section breaks.
- **Cream / Sand:** `#F2EAD3` — Warm off-white. Primary light background.
- **Warm White:** `#FAF7F0` — Near-white for text blocks, card backgrounds.
- **Charcoal:** `#2A2A2A` — Body text on light backgrounds.
- **Warm Mid:** `#8C7B68` — Muted brown-taupe for secondary text.

### Typography
- **Display / Hero:** Cormorant Garamond — Elegant, high-contrast luxury serif. Used for "THE VAULT" style lockups, large headings, pull quotes.
- **Body / UI:** Jost — Clean, geometric sans-serif. Used for body copy, navigation, labels, buttons.
- **Accent / Small Caps:** Cormorant SC — Small caps variant for decorative subheadings like "— MARKETING CO —"

**Scale:**
- `--text-hero`: 96px / Cormorant Garamond Bold
- `--text-display`: 64px / Cormorant Garamond SemiBold
- `--text-h1`: 48px / Cormorant Garamond
- `--text-h2`: 36px / Cormorant Garamond
- `--text-h3`: 24px / Jost Medium
- `--text-body-lg`: 18px / Jost Regular
- `--text-body`: 16px / Jost Regular
- `--text-small`: 13px / Jost Regular
- `--text-label`: 11px / Jost Medium, letter-spacing 0.15em

### Backgrounds
- Full-bleed deep green sections for hero/impact moments
- Cream/sand for service sections — warm, tactile
- Blush pink for testimonials / soft moments
- Subtle texture overlays (noise/grain) add print-like premium feel
- No flat white — always slightly warm

### Imagery
- **Color grading:** Warm, earthy tones — greens, creams, sandy neutrals. Sunlight, shadows, natural textures.
- **Subjects:** Lush botanicals, stone/concrete textures, human hands at work, luxury interiors, local St. Petersburg scenes
- **Feel:** Editorial, high-contrast, intentional. Think VSCO A6 / warm film grain.
- **No stock-photo feel** — imagery feels curated, not generic

### Animation
- **Easing:** Ease-in-out, slow — luxury doesn't rush
- **Fades:** Opacity fade-ups on scroll (0 → 1, 600ms, ease)
- **No bounces or springs** — everything is smooth and controlled
- **Parallax:** Subtle on hero images
- **Hover states:** Opacity slightly reduced (0.85) on image overlays; gold underlines extend on links; CTAs shift background color by one shade

### Borders & Dividers
- Thin gold rule lines (`1px solid #C9A96E`) used as decorative dividers
- Em dashes flanking subheads (— MARKETING CO —)
- No harsh black borders — always warm

### Cards
- Rounded corners: `border-radius: 4px` — minimal rounding, not pill-shaped
- Subtle shadow: `0 2px 20px rgba(44,74,62,0.08)` — green-tinted shadow
- Background: Warm white or cream
- Gold accent line optional at top

### Spacing System
- Base unit: 8px
- Scale: 4, 8, 16, 24, 32, 48, 64, 96, 128px

### Corner Radii
- `--radius-sm`: 2px (pills, chips)
- `--radius-md`: 4px (cards, inputs)
- `--radius-lg`: 8px (modals)
- `--radius-full`: 9999px (tag pills, avatars)

### Shadows / Elevation
- `--shadow-sm`: `0 1px 4px rgba(44,74,62,0.10)`
- `--shadow-md`: `0 2px 20px rgba(44,74,62,0.12)`
- `--shadow-lg`: `0 8px 48px rgba(44,74,62,0.18)`

### Icons
- **Style:** Thin-stroke line icons (1.5px stroke), no fills. Clean and minimal.
- **Set:** Lucide Icons (CDN) — closest match to the brand's refinement
- See ICONOGRAPHY section below

---

## ICONOGRAPHY

- **Icon system:** Lucide Icons via CDN (`https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`) — thin stroke, geometric, no fills.
- **Size defaults:** 20px for UI icons, 32px for feature icons, 48px for hero icons
- **Color:** Forest green (`#2C4A3E`) on light backgrounds, gold (`#C9A96E`) as accent, cream on dark backgrounds
- **No emoji** used as icons in brand contexts
- **Brand logo:** Extracted from business card photo — see `assets/logo-card.jpg`
- **Primary usage:** Service icons, navigation, social links, feature callouts

### Key Logo Notes
- Logo lockup: "THE" (small, tracked) / "VAULT" (large, bold) / "— MARKETING CO —" (small caps with em-dash flankers)
- On dark: cream/gold text on forest green
- On light: forest green text on cream/white
- Minimum size: ~120px wide

---

## File Index

```
README.md                    — This file
SKILL.md                     — Agent skill descriptor
colors_and_type.css          — CSS design tokens (colors, type, spacing)
assets/
  logo-card.jpg              — Business card brand photo
fonts/                       — Google Fonts referenced (Cormorant Garamond, Jost)
preview/
  colors-primary.html        — Primary color swatches
  colors-neutral.html        — Neutral/earthy color swatches
  colors-semantic.html       — Semantic color tokens
  type-display.html          — Display / hero typography
  type-body.html             — Body & UI typography
  type-scale.html            — Full type scale specimen
  spacing-tokens.html        — Spacing scale tokens
  shadows-radii.html         — Shadow system & border radii
  buttons.html               — Button component states
  cards.html                 — Card components
  inputs.html                — Form input components
  badges.html                — Badges & tags
  logo-specimen.html         — Logo & brand mark specimens
ui_kits/
  website/
    README.md                — Website UI kit notes
    index.html               — Interactive website prototype
    Header.jsx               — Navigation header component
    Hero.jsx                 — Hero section component
    Services.jsx             — Services section
    Footer.jsx               — Footer component
```
