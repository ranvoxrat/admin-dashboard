# Design Brief

**Purpose**: Premium admin dashboard for team coordination—data-forward, precise, command-center aesthetic.

**Tone**: Refined minimalism with functional elegance. Tech-forward, not cold. Inspired by Linear and Vercel design discipline.

**Differentiation**: Inverted button authority (dark backgrounds, light text) creates "control center" feel. Metric cards feature left-aligned teal accent bars. Geometric typography (Space Grotesk) grounds the interface.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
| --- | --- | --- | --- |
| Primary | 0.62 0.22 230 | 0.7 0.2 230 | Buttons, links, accents—vibrant teal, tech-forward |
| Secondary | 0.85 0.08 230 | 0.22 0.08 230 | Navigation, borders, secondary UI |
| Accent | 0.65 0.2 35 | 0.72 0.18 35 | Alerts, metric bars—warm orange |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Delete, danger states—red |
| Foreground | 0.15 0 0 | 0.92 0 0 | Body text—high contrast |
| Muted | 0.88 0 0 | 0.22 0 0 | Secondary text, disabled states |
| Border | 0.92 0 0 | 0.22 0 0 | Subtle dividers, card boundaries |

**Mode**: Dark-first design (primary), light mode supported.

## Typography

| Scale | Font | Weight | Size | Usage |
| --- | --- | --- | --- | --- |
| Display | Space Grotesk | 600 | 28–32px | Page titles, section headers |
| Heading | Space Grotesk | 600 | 16–20px | Card titles, table headers |
| Body | Inter | 400 | 14px | Body text, table data |
| Label | Inter | 500 | 12px | Form labels, badges |
| Mono | JetBrains Mono | 400 | 13px | Data, IDs, code snippets |

## Elevation & Depth

| Layer | Background | Border | Shadow | Usage |
| --- | --- | --- | --- | --- |
| Base | --background | none | none | Page background |
| Card | --card | --border | shadow-sm | Metric cards, panels |
| Elevated | --card | --border | shadow-lg | Modals, open panels |
| Input | --input | --border | shadow-xs | Form inputs, textareas |

## Structural Zones

| Zone | Background | Border | Interaction |
| --- | --- | --- | --- |
| Header | --sidebar (light) / --card (dark) | bottom border-border | Logo, search, avatar dropdown |
| Sidebar | --sidebar | right border-border | Collapsible nav, logo, sections |
| Main Content | --background | none | Scrollable, metric grid + tables |
| Card | --card | border-border | Hover: shadow-lg, smooth transition |
| Footer | --background | top border-border | Help links, version info |

## Component Patterns

- **Buttons**: Inverted style (dark bg, light text). Primary CTA: `button-inverted`. Secondary: outline. Size: sm (32px), md (40px).
- **Forms**: Clean inputs with subtle focus ring. Labels above fields. Validation on blur.
- **Tables**: Striped rows (alternate muted-20% bg). Hoverable rows. Sort indicators.
- **Cards**: 6px border-radius, left accent bar (primary or accent). Metric cards show value, label, trend.
- **Dropdowns**: Slide-out from top-right. Dark overlay. Smooth animation.

## Motion & Animation

- **Smooth transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive states.
- **Slide-in-right**: 0.3s for side panels, dropdowns.
- **Fade-in**: 0.3s for overlays, modals.
- **Micro-interactions**: Button hover lift (+2px shadow), loading pulse, status indicators.

## Constraints & Rules

- No decorative gradients or blur effects.
- Data tables: monospace font for numeric data.
- Dark mode as primary; light mode maintains same contrast ratios.
- Mobile-first responsive: hamburger sidebar toggle at `md` breakpoint.
- Accessibility: AA+ contrast enforced, semantic HTML, focus indicators visible.

## Signature Detail

**Left-aligned accent bar on metric cards** — teal (primary) for growth, orange (accent) for alerts. Subtle but distinctive. Signals data importance at a glance.

