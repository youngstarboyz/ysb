# YOUNG STAR BOYZ — Royal Devotional Website

A responsive, dependency-free static website for the YOUNG STAR BOYZ Ganesh Puja Committee, Binjharpur, Bachhol, Odisha. This edition uses a royal maroon, vermillion, antique-gold and warm-ivory devotional visual identity.

## Project structure

```text
Young-Star-Boyz-main/
├── index.html             # Homepage, metadata and Organization structured data
├── 404.html               # Custom not-found page
├── style.css              # Responsive design system and components
├── script.js              # Navigation, scroll UI, reveals and countdown
├── robots.txt             # Crawler policy
├── committee-puja.jpg     # Royal devotional artwork master (2048 × 1152, 16:9)
├── committee-puja.webp    # WebP artwork used by the website (2048 × 1152, 16:9)
├── g.png                  # Original logo master
└── logo.webp              # Optimized WebP logo used by the website
```

## Audit and implementation

The supplied ZIP was extracted and reviewed before changes. It contained a static single-page site, no package manifest, no server, no database, and no authentication service. The existing structure and content were retained.

Changes in this pass:

- Corrected the mobile hero contrast issue: the mobile overlay now remains dark behind the white headline and copy.
- Refined hero image positioning and sizing for narrow screens.
- Corrected image alternative text to describe the actual devotional artwork rather than claiming the image showed a crowd or flowers.
- Marked the Odia invitation paragraph with `lang="or"` for assistive technology and language-aware rendering.
- Added social preview image metadata and descriptive Open Graph image alt text.
- Replaced the main devotional artwork with a custom royal red-and-gold Ganesha visual; both JPG and WebP website assets are exactly 2048 × 1152 px (16:9).
- Added an accessible festival FAQ, an Add to Calendar (.ics) reminder, and native Share support with a clipboard fallback.
- Preserved the original committee logo and all existing programme, contribution, contact and no-gallery decisions.
- Kept the no-gallery direction, existing navigation, programme, contribution information, countdown, contact locality, and custom 404 page.
- Kept the countdown target supplied in the project: 4 September 2027. Confirm this date with the committee before publishing.

## Run locally

No dependency installation or build step is required.

1. Extract the ZIP.
2. Open `index.html` in a modern browser, or run the following command from this folder:

   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`.

## Content requiring committee confirmation

The site retains information supplied in the project. Confirm the event date, programme dates and timings, exact venue, committee contact details and contribution process with the committee before publication. No phone number, WhatsApp account, social profile, payment handle, donation account or exact venue address has been invented.

The countdown date is retained from the existing code. The programme explicitly indicates that unconfirmed timings and details will be announced later.

## Why there is no admin backend

The supplied project has no server, database, hosting configuration or administrator identity workflow. A secure admin panel cannot be honestly implemented as frontend-only HTML and JavaScript. A local-storage login would not provide real authentication or authorization.

The current static architecture is suitable for a small informational website and can be hosted on GitHub Pages, Netlify or Cloudflare Pages. If committee members need to update content themselves, a future backend can use a managed database and server-side API with password hashing, role-based authorization, CSRF protection where applicable, rate limiting, secure sessions, audit logging, backups and server-managed secrets. Select the host and administrator ownership process before choosing the backend stack.

## SEO and deployment notes

- Semantic HTML, page description, Open Graph and Twitter metadata, and Organization JSON-LD are present.
- `robots.txt` is included.
- A canonical URL and absolute sitemap URL are not set because the production domain has not been confirmed. Do not publish guessed URLs. After the final domain is confirmed, add a canonical link, create `sitemap.xml` with the final absolute URL, add that sitemap URL to `robots.txt`, and make the social preview image URL absolute.
- The Organization structured data contains only the committee name and locality already present in the project. Review its claims before publication.

### GitHub Pages

1. Push the contents of this folder to the repository's publishing branch.
2. Open repository **Settings → Pages**.
3. Select the publishing branch and root folder, then save.
4. Wait for GitHub Pages to provide the public URL.
5. Add the confirmed canonical URL, sitemap and absolute social image URL.

## Security

- There are no frontend administrator credentials or API secrets.
- Do not place passwords, private keys, payment credentials or personal phone numbers in public frontend files.
- If a backend is added, validate and authorize every protected operation on the server. Frontend checks are not security controls.
- Use HTTPS and maintain backups for any future database.

## Verification report

Automated checks performed for this delivery:

- JavaScript syntax validation with `node --check`.
- HTML parsing, duplicate-ID checks and internal-anchor checks.
- Confirmed both devotional artwork files are exactly 2048 × 1152 px (16:9).

- ZIP extraction and source inspection.
- HTML parsing for `index.html` and `404.html`.
- Asset format and dimension inspection.

Not claimed as completed: physical Android/iPhone testing, cross-browser visual QA, screen-reader testing, Lighthouse/Core Web Vitals measurement, hosted deployment verification, or backend/API tests. The supplied project has no backend and no browser/device lab was available in this run.


## Royal Edition maintenance update (16 November 2026)

- `committee-puja.jpg` and `committee-puja.webp` are now exactly **16:9 (2048 × 1152 px)**, cropped so the crown, eyes and lamp stay in frame. The About-section image uses `aspect-ratio: 16 / 9`, and the HTML `width`/`height` attributes match.
- Replaced inconsistent text symbols (♧ ♟ ♨ ▦ ▶ ♡), which render differently across phones, with clean inline SVG icons.
- Programme numbering made sequential (01, 02, 03) and the About kicker numbered 01 to match the other sections.
- Removed an empty decorative `<span>` in the top bar.
- Improved calendar reminder download reliability and added a link-copy fallback for browsers without the secure Clipboard API.
- Rechecked JavaScript syntax, CSS braces and variables, duplicate HTML IDs, in-page anchors, and local asset references.


## Fix pass (16 November 2026)

- **About photo now truly 16:9.** The `height="1152"` HTML attribute was overriding CSS `aspect-ratio`, so the image rendered tall and portrait on desktop. Added `height: auto`; measured ratio is 1.778 on desktop, tablet and mobile. `committee-puja.jpg` and `.webp` remain 2048 × 1152.
- **Hero seam removed.** The hero image began at 40% width, leaving a hard vertical edge; it now covers the full hero and the existing gradient handles the fade.
- **Tablet layout.** The About section now stacks below 900 px so the photo is shown at a proper size.
- **Odia text** now uses the already-loaded Noto Sans Oriya font via `[lang="or"]`.
- **Social preview** now uses `committee-puja.jpg` (wider compatibility than WebP on WhatsApp/Facebook) with image width/height and `og:site_name`.
- **404 page** restyled to the royal palette, loads its fonts, and the "404" numeral no longer loses its colour to a more specific paragraph rule.
- **About value cards:** removed the double border/rounded-card clash.
- **Cleanup:** removed unused CSS (event gallery, social icons, heart icon) and replaced the inconsistent ❖ glyph.


## Professional polish pass (16 November 2026)

- **Section order now matches the navigation.** The "Info" (FAQ) section moved from above About to after the Puja Programme, so scrolling follows Home → About → Programme → Info → Contribute → Contact and the active menu highlight no longer jumps backwards.
- **Footer quick links.** Replaced the lone "Contact · Back to top" pair with a full footer navigation (About, Programme, Info, Contribute, Contact). The floating back-to-top button already covers "Back to top".
- No new content, contact details, images or features were added.


## Install on a phone (PWA)

This project now includes Progressive Web App support. Once the website is published over **HTTPS** (GitHub Pages provides HTTPS), visitors can install it from the **＋ Install App** button. The installed app opens in its own app-like window. The service worker also caches the app shell for repeat visits and basic offline access.

- **Android / Chrome:** Open the published website and tap **＋ Install App**. If the browser does not show the native prompt, open Chrome's ⋮ menu and choose **Install app** or **Add to Home screen**.
- **iPhone / iPad:** Open the published website in Safari, tap **Share**, then **Add to Home Screen**. iOS does not expose the same automatic install prompt as Android, so the button displays these instructions.
- Installation cannot work by opening `index.html` directly from a phone's file manager. Publish the site to an HTTPS host first.
- After publishing updates, browsers may take a moment to refresh cached files. If needed, close and reopen the installed app.


## Syntax and deployment fix (17 November 2026)

- Replaced six literal `\\n` sequences in `index.html` with real line breaks. These were being emitted as visible text between HTML elements and could interfere with document parsing.
- Incremented the service-worker cache name to `young-star-boyz-v2` so deployed browsers refresh the corrected app shell instead of continuing to serve the old cached files.
- Validation completed: `script.js` and `service-worker.js` pass Node.js syntax checks; `manifest.webmanifest` parses as valid JSON; all local HTML asset references exist; in-page links resolve; IDs are unique; and the CSS brace counts match.


## Premium cinematic upgrade (19 November 2026)

**New files:** `premium.css` (dark crimson/gold theme layer over `style.css`), `premium.js` (animation and interaction layer). The original `script.js` (menu, countdown, notice board, calendar, share, PWA) is unchanged. The original ZIP is preserved as `ysb-main-ORIGINAL-backup.zip` next to this project.

**Added:** logo + Ganesha preloader with 4.5 s safety timeout; cinematic hero ("Where Devotion Meets Celebration", Est. 2008, #SabuReadyTa); rotating mandala, light rays, golden particle sparks, subtle marigold petals; Puja Programme section; About timeline and mission/vision; gallery with full-screen lightbox (keyboard, swipe, focus trap); GSAP + ScrollTrigger reveals, hero parallax, magnetic buttons, countdown tick pulse; Cinzel headings; Gallery/Programme/Notices nav links; structured-data additions; PWA cache bump (v4).

**Graceful fallback:** GSAP loads from cdnjs (pinned 3.12.5). If it is blocked, content is never hidden; the site uses CSS/IntersectionObserver reveals. All motion is disabled under `prefers-reduced-motion`.

### Run / deploy
`python -m http.server 8000` then open http://localhost:8000. Deploy by uploading the folder to GitHub Pages, Netlify or Cloudflare Pages (HTTPS required for PWA install). No build step.

### Still required from the committee (nothing was invented)
- **Programme timings/dates** (all marked "to be announced").
- **WhatsApp number:** set `CONFIG.whatsappNumber` at the top of `premium.js`; the button stays hidden until set.
- **Contact form / payment:** intentionally not added; there is no backend or payment account. Needs e.g. Formspree/Netlify Forms and a UPI/payment handle supplied by the committee.
- **Gallery photos:** only the existing artwork and emblem are shown. Add `<button class="gallery-item" data-full="…" data-caption="…"><img …></button>` entries to `#gallery-grid`.
- **Social links, production domain** (canonical, absolute OG image, `sitemap.xml`), **Odia translations** of new sections.
- Confirm the 4 Sep 2027 date.

### Testing report (what was actually run)
Headless Chromium 157 via Playwright at 1440×900 and 390×844 (mobile emulation), served locally:
- JS syntax (`node --check`) for script.js, premium.js: pass. No duplicate IDs; all local assets and in-page anchors resolve.
- Zero horizontal overflow on both viewports; preloader dismisses and unlocks scroll; no JS runtime errors.
- Verified working: countdown (288 days on test date, ticking), mobile menu open/close/navigate, notice board next, FAQ accordion, gallery lightbox open/next/Escape, back-to-top, programme/gallery reveals not stuck hidden.
- **Not verified:** the GSAP path (sandbox had no internet, so only the fallback path ran), Google Fonts rendering (fallback fonts shown in screenshots), Firefox/Safari/Edge, real Android/iPhone devices, Lighthouse scores, screen readers. Please test on a real device after deploying.


## Latest visual update — Indian devotional theme

- Removed the Gallery section, image lightbox, and Gallery navigation links.
- Updated the visual palette to warm ivory, sindoor red, saffron, antique gold, and subtle leaf green accents.
- Retained the existing programme, countdown, notices, about, contribution, contact, PWA, and motion features.
- Bumped the service-worker cache to `young-star-boyz-v5` so installed visitors receive the refreshed styles and page.
