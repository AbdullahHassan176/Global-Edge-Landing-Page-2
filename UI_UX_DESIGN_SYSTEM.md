# Global Chain — UI/UX Design System
> **For AI models working on this codebase:** This document is the single source of truth for all frontend design decisions. Read this before touching any UI file. Everything here is deliberate.

---

## 1. Design Philosophy

The Global Chain UI is a **luxury-grade SaaS interface** inspired by high-end product passport and supply-chain verification platforms. The aesthetic sits at the intersection of:

- **Premium fintech dashboards** — muted, confident, data-dense
- **Luxury brand identity** — cream parchment tones, burgundy authority, gold accents
- **Cryptographic trust UX** — monospace data elements, sealed/locked iconography, chain visualisations

Two distinct surface contexts exist:
| Context | Feel | Palette |
|---|---|---|
| **Public / Landing** | Editorial, warm, inviting | Cream + Burgundy + Gold on off-white |
| **Admin Dashboard** | Dark authority, data-dense | Near-black sidebar, cream content area, dark mode support |

---

## 2. Color System

All tokens live in `apps/web-vue/src/styles/tokens.css`.

### Brand Palette (Four-Color System)

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary | Parchment Cream | `#F5EFE6` | Main bg, card surfaces |
| Secondary | Imperial Burgundy | `#6B1F2A` | Brand identity, CTA buttons, headers |
| Tertiary | Deep Emerald | `#1F6F54` | Success states, verified indicators, trust |
| Fourth | Antique Gold | `#C6A15B` | Luxury accents, seals, hover highlights |

### Extended Palette

```
--gc-cream:           #F5EFE6   Parchment Cream
--gc-cream-soft:      #FBF7F1   Soft Cream — main page background
--gc-ivory:           #EFE6DA   Warm Ivory — card surface

--gc-burgundy:        #6B1F2A   Imperial Burgundy
--gc-wine:            #4A141D   Deep Wine — darker variant
--gc-burgundy-light:  #8B2F3A   Light burgundy — hover states

--gc-emerald:         #1F6F54   Deep Emerald
--gc-emerald-light:   #2D8F6F   Hover states
--gc-emerald-glow:    rgba(31,111,84,0.15)

--gc-gold:            #C6A15B   Antique Gold
--gc-gold-light:      #E5D199   Light Gold
--gc-charcoal:        #121212   Obsidian Charcoal — dark mode base
```

### Semantic Tokens (CSS Variables)

```
--bg:            #FBF7F1   Light / #0F1117 Dark
--surface-1:     rgba(245,239,230,0.65) / rgba(26,26,26,0.8)
--surface-2:     rgba(239,230,218,0.75) / rgba(31,31,31,0.9)
--surface-3:     rgba(255,255,255,0.8) / rgba(40,40,40,0.95)

--text:          #1A1A1A   Light / #F5EFE6 Dark
--text-muted:    #5F5A55   Light / #B8AEA1 Dark
--text-subtle:   #B8AEA1   Light / #8B7D6F Dark

--border:        rgba(214,195,163,0.18)
--border-hover:  rgba(198,161,91,0.30)
--border-active: rgba(198,161,91,0.40)

--accent:        #C6A15B   Antique Gold
--success:       #1F6F54   Deep Emerald
--danger:        #8C1D18   Imperial Crimson
--warning:       #C9972B   Burnished Amber
--info:          #3F5E73   Slate Blue
```

### Dark Mode

Dark mode is triggered by adding `.dark` class to the `<html>` element. The system uses CSS variable overrides — no Tailwind dark: prefixes on component internals. Background shifts to near-black `#0F1117`. Borders become burgundy-tinted (`rgba(107,31,42,0.3)`). Text inverts to cream.

---

## 3. Typography

### Font Stack

```
Primary: "Inter", system-ui, -apple-system, sans-serif  → var(--font-sans)
Monospace: "JetBrains Mono", "Fira Code", monospace       → var(--font-mono)
```

Both are loaded via Google Fonts. Inter at weights 300/400/500/600/700/800/900.

### Type Scale & Usage

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | `clamp(2.5rem, 6vw, 5rem)` | 900 | `.narrative-headline`, tracking -0.03em, leading 1.05 |
| Section H2 | `clamp(2rem, 4vw, 3rem)` | 700 | With gradient text fill on landing |
| Subsection H3 | `1.8em` | 600 | Brand cyan/emerald colored in docs |
| Card title | `text-lg` / `text-xl` | 700 | `text-[#1A1A1A]` |
| Body | `text-sm`–`text-base` | 400 | `text-[#5F5A55]`, `line-height: 1.8` |
| Labels/Caps | `text-xs` | 600 | `uppercase tracking-wider font-mono` |
| Monospace data | `text-xs`–`text-sm` | 400–600 | Hash strings, IDs, timestamps |

### Gradient Text (Landing)

```css
background: linear-gradient(135deg, #ffffff 0%, var(--brand-cyan) 50%, var(--brand-violet) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

On the actual Vue app landing, the gradient runs `from-[#6B1F2A] via-[#1F6F54] to-[#C6A15B]` — Burgundy → Emerald → Gold. Always apply this to the key headline keyword (e.g., "authenticity").

---

## 4. Spacing & Layout

### Spacing Scale

```
--spacing-xs:  4px
--spacing-sm:  8px
--spacing-md:  16px
--spacing-lg:  24px
--spacing-xl:  32px
```

### Layout Rules

- **Max content width**: `max-w-7xl` (1280px) centered with `mx-auto`
- **Page padding**: `px-4 sm:px-6 lg:px-8`
- **Card padding**: 20–24px (`p-4` to `p-6` to `p-8` for hero cards)
- **Card gap**: 24px (`gap-6`)
- **Section vertical rhythm**: `py-32` for major landing sections

### Admin Layout

```
┌─────────────────────────────────────────────────────┐
│  Sidebar (260px expanded / 72px collapsed)          │
│  ┌────────────────────────────────────────────────┐ │
│  │ Header (64px h-16) — logo + quick create + user│ │
│  │ Status bar (32px h-8) — system active pill     │ │
│  │ Main content (flex-1, overflow-auto, p-6)      │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

The main content area margin-left is dynamic: `72px` when sidebar collapsed, `260px` when expanded. This uses `:style` binding, not a static class.

---

## 5. Border Radius

```
--radius-sm:   8px    small elements, icon buttons
--radius-md:  12px    inputs, secondary buttons
--radius-lg:  18px    cards (standard)
--radius-xl:  22px    large/hero cards, liquid-metal cards
--radius-full: 9999px  pills, badges, status dots
```

**Never** mix radius values randomly. The card border radius is always 18–22px. Never use `rounded-md` (8px) on a card-sized element.

---

## 6. Shadow System

```
--shadow-sm:  0 2px 8px rgba(0,0,0,0.3)
--shadow-md:  0 4px 16px rgba(0,0,0,0.4)
--shadow-lg:  0 8px 32px rgba(0,0,0,0.5)
--shadow-xl:  0 16px 48px rgba(0,0,0,0.6)
--highlight-inset: inset 0 1px 0 rgba(255,255,255,0.05)
```

Cards always combine a drop shadow with an inset top-highlight to create physical depth. Example:

```css
box-shadow:
  0 8px 30px rgba(0,0,0,0.06),
  inset 0 1px 0 rgba(255,255,255,0.6),
  0 0 0 1px rgba(198,161,91,0.1) inset;
```

---

## 7. Glass & Surface Utilities

Defined in `apps/web-vue/src/style.css` under `@layer utilities`.

### `.glass-card`
Ultra-premium card style. 70px blur + saturate + gold border:
```css
background: rgba(0,0,0,0.45);
backdrop-filter: blur(70px) saturate(180%) brightness(0.92);
border: 1px solid rgba(255,215,0,0.18);
box-shadow: 0 8px 32px 0 rgba(0,0,0,0.8), inset 0 1px 2px 0 rgba(255,215,0,0.12), ...;
```
Has `::before` shimmer overlay (top 45% gold gradient) and `::after` radial specular highlights. On hover: lift `-2px`, increased border opacity, outer gold glow.

### `.glass-nav`
Navigation bar surface. 80px blur + dark semi-transparent base. Gold bottom border + top gradient shimmer.

### `.holographic-card`
Used on landing page for lifecycle checkpoint and feature cards:
```css
background: rgba(245,239,230,0.92);
backdrop-filter: blur(24px);
border: 1px solid rgba(107,31,42,0.35);
box-shadow: 0 0 30px rgba(107,31,42,0.15), inset 0 0 30px rgba(31,111,84,0.08);
```
Has rotating `::before` scanline animation (`hologram-scan`, 4s linear infinite).

### `.liquid-metal-card`
Used for product/feature cards in landing hero sections. Cream glassmorphic with shimmer sweep on hover:
```css
background: linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(245,239,230,0.7) 50%, rgba(239,230,218,0.75) 100%);
backdrop-filter: blur(14px) saturate(180%);
border-radius: 22px;
border: 1px solid rgba(198,161,91,0.18);
animation: float 6s ease-in-out infinite;
```
On hover: `translateY(-2px) scale(1.02)`, animation pauses, `::before` shimmer sweeps left-to-right.

### `.liquid-metal-gold`
Same structure as `liquid-metal-card` but amber/gold gradient. Used for gold-accent cards.

### `.marble-bg`
Deep black marble texture via stacked radial gradients with gold veins. Used on DPP twin pages.

---

## 8. Animation Library

All animations respect `prefers-reduced-motion: reduce` (tokens set to 0ms, complex animations disabled).

### Background & Structural Animations

| Name | Duration | Purpose |
|---|---|---|
| `rotate` | 20s linear ∞ | Rotating glow orb behind headers |
| `float` | 6s ease-in-out ∞ | `.liquid-metal-card` gentle bob (0–8px Y) |
| `float-delayed` | 6s, 1.5s delay | Staggered card float |
| `float-delayed-2/3` | 6s, 3s/4.5s delay | Further stagger for grids |

### Network / Supply Chain Visualisation

| Name | Duration | Purpose |
|---|---|---|
| `node-pulse` | 2.5s ease-in-out ∞ | Network node scale 1→1.3, opacity 1→0.7 |
| `connected-glow` | 2s ease-in-out ∞ | Emerald node double glow intensify |
| `disconnected-dim` | 2.5s ease-in-out ∞ | Grey node dim pulse (opacity 0.4→0.25) |
| `line-pulse` | 3s ease-in-out ∞ | Connection line opacity 0.3→0.5 |
| `dash-animate` | 30s linear ∞ | SVG `stroke-dashoffset` march on pipeline paths |
| `arc-flow` | 20s linear ∞ | Global map arc dashes |
| `hub-pulse` | 3s ease-in-out ∞ | SVG hub node opacity + scale |

### Floating Elements

| Name | Duration | Purpose |
|---|---|---|
| `chip-float` | 3s ease-in-out ∞ | `.evidence-chip` 0→-8px Y float |
| `badge-float` | 4s ease-in-out ∞ | `.compliance-badge` 0→-10px + scale 1.05 |
| `ecosystem-float` | 4s ease-in-out ∞ | Ecosystem node -12px Y + 5px X |
| `card-float` | 3s ease-in-out ∞ | `.event-card` 0→-8px Y |

### Particle & Data Flow

| Name | Duration | Purpose |
|---|---|---|
| `orbit-particle` | 6s ease-in-out ∞ | CSS variable-driven particle orbit |
| `stream-flow` | 4s linear ∞ | Data stream line sweeps left→right, fades |
| `packet-travel` | 5s cubic-bezier ∞ | Telemetry packet travels along path |
| `micro-flow` | 3s linear ∞ | Tiny particles flow along ribbon |
| `hologram-scan` | 4s linear ∞ | `.holographic-card::before` 300% diagonal scan |

### Entry / Reveal Animations

| Name | Duration | Purpose |
|---|---|---|
| `badge-pop` | 0.8s `cubic-bezier(0.34,1.56,0.64,1)` | Verified badge scale-rotate in |
| `seal-lock` | 1s `cubic-bezier(0.34,1.56,0.64,1)` | Blockchain seal scale 0→1.2→1, -90deg rotate |
| `blockchain-seal` (class) | Same | Applied to lock icons for staggered seal effect |
| `thread-extend` | 2.5s ease-out forwards | Branching thread grows height 0→100% |
| `checkpoint-ring` | 2s ease-out ∞ | Holographic ring scale 1→2.5, opacity fade |
| `pulse-ring` | 4s ease-in-out ∞ | Same but slower, for checkpoint nodes |
| `verification-badge` | 0.8s spring | Applied on verified status display |

### Scroll-Triggered Reveal

`.scroll-reveal` elements start `opacity: 0; transform: translateY(40px)`. When `.visible` is added by `IntersectionObserver`:
```css
transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1);
```

`.story-content` uses a more dramatic entry: `translateY(60px) scale(0.95)` → normal, over `1.8s`.

### Status & Utility Animations

| Name | Duration | Purpose |
|---|---|---|
| `status-blink` | 2s ease-in-out ∞ | Status indicator opacity 1→0.4 |
| `badge-glow` | 3s ease-in-out ∞ | Box-shadow glow pulse on `.compliance-badge` |
| `chip-pulse` | 2s ease-in-out ∞ | Burgundy glow pulse on condition chips |
| `logic-flow` | 3s ease-in-out ∞ | Logic path opacity breathe 0.3→1 |
| `smart-contract-flash` | 1.5s ease-out | Ring expands from 0→20px, fades |
| `product-pulse` | Keyframed | Product icon scale 1→1.1 in 3D translateZ |
| `qr-pulse` | 3s ease-in-out ∞ | QR glow overlay opacity 0.5→1 |

---

## 9. Easing Reference

The project uses a custom easing vocabulary:

```
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)   → micro interactions
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1)   → standard transitions
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1)   → layout changes

Spring easing: cubic-bezier(0.34, 1.56, 0.64, 1)  → bouncy/physical (badge-pop, seal-lock, checkpoint hover)
Expo out: cubic-bezier(0.16, 1, 0.3, 1)           → ultra-smooth reveals (scroll-reveal, network transitions)
```

---

## 10. Component Patterns

### Badges / Pills

```css
/* Status badge anatomy */
background: rgba([statusColor], 0.10);
border: 1px solid rgba([statusColor], 0.30);
color: [statusColor];
border-radius: 9999px;
padding: 6px 14px;
font-size: 0.85em;
font-weight: 600;
box-shadow: 0 0 10px rgba([statusColor], 0.30);
```

Status color map:
- `#1F6F54` Emerald — verified, success, active
- `#6B1F2A` Burgundy — brand, primary action, in-progress alerts
- `#C6A15B` Gold — pending, neutral-luxury, warnings
- `#8C1D18` Crimson — errors, damage, fraud
- `#C9972B` Amber — warning, in-review

### Network Nodes (`.network-node`)

Round dots with colored glow. Three states:
- **Default**: `node-pulse` animation (scale 1→1.3)
- **`.connected`**: Emerald `#1F6F54`, double layered glow, `connected-glow` animation
- **`.disconnected`**: Grey `#6B7280`, dim glow, `disconnected-dim` animation

### Checkpoint Nodes (3D Corridor)

```css
.checkpoint-node {
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);  /* spring */
}
.checkpoint-node:hover {
  transform: translateZ(60px) scale(1.15);
  z-index: 100;
}
```

Inner circle: `w-14 h-14 rounded-full bg-[#EFE6DA]` + colored border + glow class. Each has two `.holographic-ring` divs at different sizes and delays, creating a ripple effect. Orbiting particles use CSS variables for path.

### Holographic Cards (Landing)

Content cards with a scanning light effect, burgundy border glow, and emerald inner shadow. The `::before` pseudo-element is a 300×300% element rotating infinitely to create a light-scan effect across the card surface.

### Liquid Metal Cards (Hero Grids)

Four cards animate with staggered float delays (0s, 1.5s, 3s, 4.5s via `:nth-child`). On hover: shimmer sweep (`::before` slides left→right over 0.6s), slight lift + scale, animation pauses. Dark mode: dark charcoal gradient with burgundy border.

### Event Cards (`.event-card`)

Mini floating data chips that appear at supply chain checkpoints. Semi-transparent cream background, burgundy border, continuous `card-float` bob. Contain icon + monospace label + check seal icon.

### Evidence Chips (`.evidence-chip`)

Absolutely positioned, monospace font, `backdrop-filter: blur(20px)`, border + glow matching `currentColor`. Float animation 3s. Grey variant for inactive state.

---

## 11. Landing Page Layout

### Navigation Bar

Fixed top, `z-50`, `bg-[#FBF7F1]/90 backdrop-blur-xl`. Height `h-16`. Bordered bottom `border-[#D6C3A3]/20`. Logo (burgundy→emerald→gold gradient icon) + wordmark. Nav links in muted text hover burgundy. CTA: secondary muted cream button.

### Hero Section

Two-column layout (`42% / 58%` split at `lg:`):

**Left column (42%)**:
- Animated ping badge (emerald, "DPP Active")
- H1 with gradient keyword
- Body copy in muted ash-brown
- Two CTAs: Burgundy filled (full shimmer on hover) + transparent outlined (hover emerald)
- Three trust bullets with emerald icon circles
- Three metric panels (`.metric-panel`) — glass background, monospace numbers

**Right column (58%) — 3D Corridor**:
- `perspective: 2000px` wrapper
- `corridor-scene` with `rotateX(8deg) rotateY(-12deg)` persistent transform
- Five checkpoint nodes positioned absolutely at different depths (translateZ 0–55px)
- SVG pipeline paths with animated dash offsets
- Floating holographic DPP card in top-right corner
- Event cards floating near checkpoints
- Particle ribbons and telemetry packets traveling between nodes

### Section Structure

All content sections use `scroll-reveal` for entrance. Pattern:
```
section.py-32.scroll-reveal
  div.max-w-7xl.mx-auto.px-4...
    div.text-center.mb-16
      h2.narrative-headline
      p.text-lg.text-muted
    [content grid / component]
```

Background alternates: sections on slightly tinted `bg-[#F5EFE6]/30` and on the base cream.

---

## 12. Admin Dashboard UI

### Sidebar

```
Width: 260px expanded / 72px collapsed
Background: bg-[#1A1A1A]/95 backdrop-blur-xl
Right border: border-r border-[#6B1F2A]/30
Logo area: h-16, logo icon (burgundy bg, gold icon), wordmark in cream
Nav items: NavItem component, active = highlighted + left accent
Theme toggle: burgundy-tinted segmented control, gold active state
```

The sidebar is **always dark** regardless of theme — it acts as an anchor element. The toggle at the bottom switches light/dark for the main content area.

### Top Header (Admin)

`h-16`, cream/dark bg `backdrop-blur-xl`. Contains:
1. Logo + back chevron
2. Centered `<QuickCreateMenu />`
3. Notification bell (with red dot badge)
4. User pill (avatar initials + email + role)
5. Logout button

### System Status Bar

`h-8` bar below header. Contains the "System Active" animated ping pill (emerald, monospace caps).

### Content Cards (Admin)

Cards in admin use `bg-white/80 dark:bg-[#1F1F1F]/80 backdrop-blur-sm` with subtle borders. Status pills use emerald/crimson/amber.

---

## 13. DPP Twin Page

Uses the `marble-bg` class — deep black with layered gold vein radial gradients. The `MarbleBackground` component renders three layered radial-gradient overlays:
- Top-left: `#6B1F2A` 8% tint
- Bottom-right: `#1F6F54` 6% tint
- Center: `#C6A15B` 4% tint

All pulsing independently with staggered animation-delay.

---

## 14. Interaction Design Principles

### Hover States

Every interactive element has a clear hover:
- Cards: `translateY(-5px)` + increased border opacity + glow
- Buttons: shimmer sweep + scale + shadow expansion
- Nav links: color transition (muted → burgundy/emerald)
- Sidebar nav: background fill + left border accent
- Checkpoint nodes: `translateZ(60px) scale(1.15)` (3D push forward)

### Focus / Active States

Use `border-active` token for active borders. Buttons use `hover:scale-105`. All transitions use `--transition-base` (250ms) unless micro (150ms) or layout (350ms).

### State Animations

- **Verified**: `verification-badge` spring pop (`badge-pop` keyframe)
- **Locked/Sealed**: `blockchain-seal` rotate-in with overshoot
- **Loading**: `animate-ping` on status dot
- **Connecting**: `connected-glow` replaces `node-pulse`

---

## 15. Responsive Design

| Breakpoint | Key Changes |
|---|---|
| `< 768px` | Corridor 3D reduced to `rotateX(3deg) rotateY(-5deg)`. Checkpoint hover reduced to `translateZ(30px)`. All animations simplified. |
| `< 1024px` | Corridor at `rotateX(5deg) rotateY(-8deg)`. Hero becomes single column. |
| `>= 1024px` | Full two-column hero, full 3D corridor, all animations active. |

Reduced motion (`prefers-reduced-motion: reduce`):
- All `--transition-*` tokens set to `0ms`
- `.liquid-metal-card` and `.liquid-metal-gold` animations disabled
- All checkpoint, particle, stream, packet, card-float, badge, hub animations disabled
- `corridor-scene` loses 3D transform

---

## 16. Icon System

Uses **Font Awesome 6 Pro** (`fa-solid` prefix) loaded via CDN. Icons are sized `text-xs` to `text-2xl` depending on context. Colors always match the brand palette:
- `text-[#6B1F2A]` — burgund/brand actions
- `text-[#1F6F54]` — verified/success
- `text-[#C6A15B]` — gold/luxury/neutral
- `text-[#8C1D18]` — error/warning

Common icon vocabulary:
- `fa-lock` / `fa-lock-open` — chain sealed / unsealed
- `fa-shield-check` — verified
- `fa-qrcode` / `fa-wifi` — QR / NFC scan
- `fa-industry` — birth/manufacture
- `fa-handshake` — ownership transfer
- `fa-warehouse` / `fa-store` — custody locations
- `fa-circle-check` — success confirmation

---

## 17. Do's and Don'ts

### DO

- Use the four-color system (cream/burgundy/emerald/gold) consistently
- Always combine `backdrop-filter: blur()` with a semi-transparent background
- Apply `inset 0 1px 0` top-highlight on cards for physical depth
- Use monospace font for all data: IDs, hashes, timestamps, scores
- Animate with `cubic-bezier(0.4,0,0.2,1)` for standard transitions
- Use spring easing `cubic-bezier(0.34,1.56,0.64,1)` for entry/pop animations
- Keep glow shadows at 0.2–0.4 opacity — subtle, not neon
- Pair every icon with appropriate brand color
- Maintain the `scroll-reveal` pattern for all landing sections
- Respect the staggered float delay pattern for card grids

### DON'T

- Use pure white (#FFF) as background — always cream (#FBF7F1)
- Use blue-heavy color schemes anywhere — this is not a tech-blue SaaS
- Mix border-radius values — cards are always 18–22px, never less
- Add animations without `prefers-reduced-motion` fallback
- Use flat shadows — always add inset highlight and glow
- Create dense UI without breathing room (min 16px gap between elements)
- Use `font-weight: 400` for headings — minimum 600 for anything headline
- Apply `text-white` directly — use `text-[#F5EFE6]` (cream) in dark mode
- Remove the glow from status nodes/badges — it's essential to the brand
- Break the 3D corridor's `perspective` + `transform-style: preserve-3d` chain

---

## 18. Background Layers (Landing Page)

The landing page stacks these fixed background layers (z-index 0–1):

1. **`.global-topology`** / **`.network-corridor`**: Faint grid (60px × 60px) of emerald horizontal lines + burgundy vertical lines, opacity 0.5, masked to center ellipse
2. **`.network-dots`**: Radial-gradient dot pattern (50px grid), emerald 12% opacity dots, opacity 0.3
3. **`.maritime-routes`** (SVG): Curved bezier paths with gradient strokes, animated `stroke-dasharray`, connecting port-like circles
4. **`.corridor-spine`**: 2px vertical centerline with multi-stop gradient (emerald → burgundy → gold → burgundy → emerald)

These layers create depth without competing with content. All use `pointer-events: none`.

---

## 19. Logo & Brand Mark

Logo mark: hexagon/cube icon rendered as inline SVG. On light: `bg-gradient-to-br from-[#6B1F2A] via-[#1F6F54] to-[#C6A15B]` background, white icon. On sidebar (always dark): `bg-[#6B1F2A]` background, `text-[#C6A15B]` gold icon.

Wordmark: "Global**Chain**" — "Global" in `#1A1A1A`, "Chain" in `#6B1F2A`.

---

## 20. Key Files Reference

| File | Purpose |
|---|---|
| `apps/web-vue/src/styles/tokens.css` | All CSS custom properties |
| `apps/web-vue/src/style.css` | Global styles, animation keyframes, utility classes |
| `apps/web-vue/src/views/Home.vue` | Landing page — master reference for design patterns |
| `apps/web-vue/src/views/admin/Layout.vue` | Admin shell — header + sidebar structure |
| `apps/web-vue/src/components/admin/Sidebar.vue` | Sidebar — nav, theme toggle |
| `apps/web-vue/src/components/dpp-twin/MarbleBackground.vue` | Marble bg component |
| `docs/architecture-walkthrough.html` | Standalone HTML with design patterns in isolation |
| `apps/web-vue/docs/STYLEGUIDE.md` | Component usage rules |
