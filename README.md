# YRT Production Website — Project Documentation

This guide documents the website as it is currently implemented: its files, visual system, sections, assets, interactions, responsive behavior, accessibility choices, and ways to run and maintain it.

## 1. Project at a glance

| Item | Details |
|---|---|
| Project | YRT Production promotional website |
| Type | Static, responsive, single-page website |
| Main entry point | [`index.html`](./index.html) |
| Main stylesheet | [`style.css`](./style.css) |
| Local assets | [`img/`](./img/) |
| Framework | None |
| Build system | None |
| Server/backend | None |
| Forms/database | None |
| Main languages | HTML, CSS, vanilla JavaScript |

The page introduces YRT Production, presents its services and past work, explains its jersey-ordering process, and links visitors to Instagram and Discord to start a conversation.

## 2. A–Z feature index

| Letter | Website component |
|---|---|
| A | About section and company highlights |
| B | Barlow Condensed display typography |
| C | Contact and project-brief section |
| D | Dark-only color scheme |
| E | Esports portfolio and event cards |
| F | Footer with navigation and contact links |
| G | Google Fonts integration |
| H | Hero banner with production photography |
| I | Instagram links for work and inquiries |
| J | Jersey-order process and checklist |
| K | Keyboard-accessible focus outlines and Escape-to-close menu |
| L | Local image assets |
| M | Mobile navigation menu |
| N | Navigation links, active-section state, and next-section overlay |
| O | Open-in-new-tab external links |
| P | Page metadata for title, description, favicon, and browser theme color |
| Q | Quick links to project inquiry channels |
| R | Reduced-motion support |
| S | Six service cards |
| T | Typography and visual treatments |
| U | User-interface animations and scroll reveals |
| V | Viewport-specific layouts and breakpoints |
| W | Work gallery with event imagery |
| X | eXternal dependencies kept to Google Fonts |
| Y | Year in the footer is set automatically |
| Z | Zero package installation or compilation required |

## 3. Files and assets

```text
project-root/
├── index.html
├── style.css
├── PROJECT-DOCUMENTATION.md
└── img/
    ├── logo.jpg
    ├── production-hero.webp
    ├── event-badda.jpg
    ├── event-finals.jpg
    ├── event-ghost.jpg
    ├── event-lan.jpg
    ├── event-league.jpg
    └── event-tdm.jpg
```

### File responsibilities

- **`index.html`** contains page content, semantic structure, SVG icons, metadata, links, and the site's inline JavaScript.
- **`style.css`** contains the dark design system, responsive layouts, and motion effects.
- **`img/logo.jpg`** is used for the header and footer brand marks and the favicon.
- **`img/production-hero.webp`** is used for the hero background and the About image.
- **`img/event-*.jpg`** files are used by the portfolio cards.
- **`PROJECT-DOCUMENTATION.md`** is this project guide.

## 4. Technology and external services

### Core technologies

- HTML5 landmarks and elements
- CSS custom properties, Grid, Flexbox, gradients, filters, and media queries
- Vanilla JavaScript; no frontend framework or JavaScript package is required
- Inline SVG for service and play icons

### External requests

- Google Fonts is requested from `fonts.googleapis.com` and `fonts.gstatic.com`.
- Instagram links open public profile posts, reels, or the YRT Production profile.
- Discord links open the YRT Esports invite.

The site does not use a CMS, analytics SDK, payment provider, API, backend, or form submission service. The contact calls to action link out to Instagram or Discord.

## 5. Page structure and content

The page is arranged as a single document with hash-link navigation:

1. **Header and navigation** — brand, desktop links, and compact mobile controls.
2. **Hero (`.hero`)** — positioning statement, short description, work link, and services link.
3. **Services (`#services`)** — six service cards:
   - Video Production
   - Content Creation
   - Social Media Management
   - Graphic Design
   - Motion Graphics
   - Advertisements
4. **Portfolio (`#events`)** — six linked event cards and a link to Instagram.
5. **About (`#about`)** — company description, production image, and three animated highlights.
6. **Jersey production (`#jerseys`)** — three ordering steps, a customer checklist, and product details.
7. **Contact (`#contact`)** — project inquiry links and a short brief checklist.
8. **Footer (`#footer`)** — brand summary, internal links, and social/contact links.
9. **Fixed section navigator (`#sectionNavigator`)** — bottom overlay linking to the next page section or back to the top.
10. **Responsive action bar (`.action-bar`)** — Instagram and Discord shortcuts at supported tablet widths.

Most navigation is handled with regular HTML anchors; no client-side router is used.

## 6. Design system

### Typography

- **Barlow Condensed** is used for large headings, card titles, and other display text.
- **DM Sans** is used for body text and interface labels.
- Fonts are loaded from Google Fonts. The CSS declares system-font fallbacks if the remote fonts are unavailable.

### Color and theme

The design uses a charcoal, white, and esports-red palette. CSS variables near the top of `style.css` define the core colors and font stacks. A later refined-layout block adjusts some of the original dark-theme token values; the final value in the cascade is the active value.

- The site uses a fixed dark color scheme across devices and does not offer a light-mode toggle.

### Layout and visual treatments

- A centered `.wrap` constrains content width.
- Grid and Flexbox are used for service cards, portfolio cards, process steps, About content, and contact content.
- The hero pairs its production-photo background with a right-side collage of custom-shaped video-production and esports cards. The cards scale in on load, then float gently; reduced-motion preferences disable the animation.
- Portfolio images use `object-fit: cover`; cards add a dark text gradient over their images.
- Cards, buttons, and links use small hover transitions and red accent states.

## 7. Interactive behavior

### Mobile menu

- `#navToggle` opens and closes `#mobileMenu`.
- `aria-expanded` and the accessible button label are updated with the menu state.
- Clicking a menu link closes the menu.
- Clicking outside the menu closes it.
- Pressing Escape closes it and restores focus to the menu button.

### Section navigation

- An `IntersectionObserver` updates the active desktop/mobile navigation link for the primary page sections.
- The fixed section navigator selects the next item from this sequence:
  `Home → What we do → Our work → About YRT → Jerseys → Contact → Connect → Home`.
- The current section is inferred from its position relative to the viewport. At the end of the document, the navigator switches to “Back to top.”
- The overlay is an anchor, so it remains usable without JavaScript; JavaScript updates its label and destination while scrolling.

### Reveals, counters, and motion

- Hero copy enters with a short upward animation; the hero cards scale in and gently float at their final positions.
- The hero's red accent and badge dot animate.
- Cards and content blocks reveal as they enter the viewport.
- About statistics count up when revealed.
- A top-edge page progress indicator is enabled when the browser supports scroll-driven CSS animations.
- The section navigator arrow gently moves toward the next section and reverses direction on the return-to-top state.
- Hover effects add lift, color, or small movement to buttons, cards, and images.
- `prefers-reduced-motion` rules reduce or disable most animation and smooth scrolling.

## 8. Responsive behavior

The CSS uses several overlapping breakpoints. The later rules in `style.css` refine earlier layouts, so when changing a component, inspect all matching selectors and media queries.

| Breakpoint | Main behavior |
|---|---|
| `max-width: 900px` | Tablet adaptations; compact grids; fixed Instagram/Discord action bar; section navigator moves above the bottom edge |
| `max-width: 820px` | Main desktop navigation is replaced with the mobile menu and hamburger |
| `max-width: 680px` | Narrow mobile layouts; portfolio becomes a horizontally scrollable snap carousel; content grids simplify |
| `max-width: 380px` | Smaller typography and tighter layouts; mobile action bar is hidden and the section navigator moves near the screen bottom |

Safe-area insets (`env(safe-area-inset-bottom)`) are used for bottom overlays on supported devices.

## 9. Accessibility and metadata

- `lang="en"`, a viewport declaration, document title, description, favicon, and theme-color metadata are present.
- Main content uses header, navigation, main, section, and footer landmarks.
- Images in content have descriptive `alt` text. Decorative SVGs use `aria-hidden="true"`.
- Mobile menu state is exposed with `aria-expanded` and `aria-controls`.
- Service shortcuts use descriptive accessible names.
- Keyboard focus receives a visible outline.
- External links opened in a new tab use `rel="noopener"`.
- Reduced-motion preferences are considered in CSS and JavaScript.

## 10. Run locally

No dependency installation or build step is needed. The site can be opened directly, but serving it over HTTP is recommended for consistent browser behavior.

### Visual Studio Code

1. Open the project folder.
2. Start the page with the Live Server extension, if installed.
3. Open `index.html` in the browser.

### Python HTTP server

From PowerShell in the project directory:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Stop the server with `Ctrl+C`.

## 11. Common maintenance tasks

### Update page copy or links

Edit the relevant section in `index.html`. Use the existing IDs for internal links (`#services`, `#events`, `#about`, `#jerseys`, `#contact`, and `#footer`).

### Replace images

Keep the current filenames in `img/` or update every corresponding `src` and CSS `url(...)` reference. Use appropriately sized, compressed images to avoid unnecessary page weight. Preserve meaningful `alt` text when replacing content images.

### Add or remove a section

1. Add semantic section markup with a unique ID.
2. Add its navigation links where required.
3. Update the `scrollSections` array in `index.html` so the bottom navigator includes it in the desired order.
4. Check section active-state logic and adjust its observed sections if necessary.
5. Check anchor scrolling and footer clearance at mobile and desktop sizes.

### Change theme colors or layouts

Edit CSS variables for global palette changes. The site is intentionally dark-only. Responsive rules occur throughout `style.css`; update the final applicable rule rather than assuming an earlier declaration wins.

### Change contact destinations

Update the Instagram profile/post URLs and Discord invite wherever they appear in `index.html`, including the contact section, portfolio cards, footer, and mobile action bar.

## 12. Current limitations and deployment notes

- There is no contact form backend; visitors must use Instagram or Discord.
- Google Fonts requires a network connection; fallback fonts are provided.
- `localStorage` persistence is browser-specific and can be unavailable in restrictive browser contexts.
- Portfolio and company claims/content should be verified by YRT Production before launch.
- The website has no automated test suite or build pipeline in the current project.
- Before production deployment, confirm that all external URLs, image rights/permissions, business details, and privacy/legal requirements are appropriate.
- Because `style.css` has accumulated layered overrides, consider consolidating duplicate rules as a separate maintenance task rather than making broad cascade changes during small feature updates.

## 13. Quick reference

| Need | File or selector |
|---|---|
| Page title and description | `index.html` `<head>` |
| Main navigation | `index.html` `.nav-links` and `#mobileMenu` |
| Color scheme | `index.html` root `data-theme="dark"` and `style.css` `:root` |
| Site-wide colors and typography | `style.css` `:root` |
| Hero image | `img/production-hero.webp` and `.hero` background rules |
| Service cards | `index.html` `#services`, styled by `.service-grid` |
| Portfolio cards | `index.html` `#events`, styled by `.work-grid` and `.work-card` |
| Jersey order information | `index.html` `#jerseys` |
| Bottom section navigator | `index.html` `#sectionNavigator`; `style.css` `.section-navigator` |
| Footer spacing | `style.css` `footer` rules near the bottom of the file |
