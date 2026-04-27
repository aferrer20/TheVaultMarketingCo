# Website UI Kit — The Vault Marketing Co

## Overview
Hi-fidelity interactive prototype of the marketing website. Click-through navigation across 5 pages: Home, Services, Our Work, About, Contact.

## Design Width
1280px (full-bleed desktop). Responsive via `clamp()` for type scaling.

## Components
| File | Description |
|---|---|
| `Header.jsx` | Fixed nav with scroll-aware transparency, logo lockup, CTA |
| `Hero.jsx` | Full-bleed green hero, headline, stats bar, scroll indicator |
| `Services.jsx` | 2×2 grid of service cards with hover state (cream→green) |
| `Footer.jsx` | 4-column footer with brand, nav, services, CTA |
| `WorkPage.jsx` | Case study grid with hover image zoom + result badges |
| `ContactPage.jsx` | Split-panel contact form with success state |

## Colors Used
- Background hero: `#2C4A3E` (Forest Green 800)
- Light sections: `#F2EAD3` (Cream 100), `#FAF7F0` (Cream 50)
- Blush accent: `#F7EAE5` (Pink 100)
- Gold accent: `#C9A96E` (Gold 500)
- Text on light: `#2A2A2A`, secondary `#6B5C4E`, muted `#8C7B68`

## Fonts
- Cormorant Garamond (display, headings, quotes) — Google Fonts
- Cormorant SC (small caps, eyebrows, logo sub) — Google Fonts
- Jost (body, nav, buttons, labels) — Google Fonts

## Notes
- No real backend — form submit shows a success state
- Logo is a CSS/HTML recreation of the business card lockup
- Imagery placeholders use brand colors and large type watermarks
