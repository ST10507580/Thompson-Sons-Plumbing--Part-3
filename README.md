# Thompson & Sons Plumbing — Website Project

## Student Information

- **Full Name:** Neo Maleka
- **Student Number:** ST10507580
- **Module:** WEDE5020 – Web Development
- **Group:** 1
- **Year:** 2026

## Project Overview

Thompson & Sons Plumbing is a small, family-run plumbing business founded in 2011 by David Thompson, serving homeowners, property managers, and small commercial clients across the greater Johannesburg area. The business has grown from a one-man operation into a team of four qualified plumbers offering installation, maintenance, and emergency repair services, but currently has no website — relying solely on a Facebook page and word-of-mouth referrals.

This project delivers a responsive, mobile-first website that gives Thompson & Sons a professional web presence, makes it easy for customers to request a quote online (including a photo of the issue), and builds trust through visible credentials, testimonials, and clear service information — reducing the business's reliance on phone-only enquiries.

## Website Goals and Objectives

- Generate qualified leads through an online enquiry and quote-request form.
- Build trust with new customers through visible testimonials, certifications, and service guarantees.
- Provide clear information on services offered and emergency contact availability.
- **KPIs:** number of quote requests per month, average time-on-site, and reduction in phone-only enquiries.

## Key Features and Functionality

- **Homepage** with a clear call-to-action for emergency callouts, a "Recent Work" photo gallery with a lightbox, and dynamically-loaded customer testimonials.
- **Services page** detailing installations, repairs & maintenance, and emergency callouts, with a live search/filter bar and an FAQ accordion.
- **Online quote-request form** (`enquiries.html`) with validated fields and a file upload for photos of the issue.
- **General message form** (`contact.html`) for enquiries, feedback, and complaints, separate from the quote-request form.
- **About Us page** featuring the company history, mission, vision, and team credentials.
- **Contact page** with a map placeholder, phone number, email, and WhatsApp click-to-chat link.
- **Sticky call-to-action** button on mobile for one-tap emergency calling.
- **Mobile-first, single-column layout** with large, tap-friendly buttons, since most enquiries are expected from customers on their phones during an emergency.

## Design and User Experience

| Element | Choice |
|---|---|
| Colour scheme | Navy blue (#0B2545) and safety orange (#FF6A2B) — conveying trust and urgency |
| Typography | Oswald (headings) paired with Open Sans (body text) |
| Layout | Single-column, mobile-first |
| Signature detail | A "pipe route" SVG divider between sections, echoing the copper pipework installed on every job |
| Wireframes | Low-fidelity wireframes for the Homepage, Services page, and Contact page are included in the Website Project Proposal document |

## Timeline and Milestones

| Week | Milestone |
|---|---|
| Week 1–2 | Research, wireframing, and content gathering |
| Week 3–4 | Homepage and core page development |
| Week 5 | Forms, testing, and mobile responsiveness checks |
| Week 6 | Client review, revisions, and final submission |

## Part 1 Details

Part 1 covered the **Website Project Proposal** (including low-fidelity wireframes for the Homepage, Services page, and Contact page) and the initial **static HTML build**: `index.html`, `about.html`, `services.html`, `enquiries.html`, `contact.html`.

## Part 2 Details

Part 2 applied CSS styling to the desktop solution, all in the single external stylesheet `style.css`: a CSS reset and base style, an Oswald/Open Sans typography scale, Flexbox and CSS Grid layout structure, visual styles with `:hover`/`:focus-visible`/`:active` states, a three-tier breakpoint system (desktop/tablet/mobile), `rem`-based relative units, and responsive images via `object-fit: cover`.

## Part 3 Details

Part 3 adds JavaScript functionality and SEO to the Part 2 solution, in line with the module brief.

### 2. Functionality

**2.1 Interactive Elements** (all in `script.js`)
- **Accordion:** an FAQ accordion on `services.html` (`.accordion-item` / `.accordion-trigger` / `.accordion-panel`), with only one panel open at a time and `aria-expanded` kept in sync for screen readers.
- **Lightbox:** clicking a photo in the homepage "Recent Work" gallery opens it full-size in a modal (`#lightbox`), closable by clicking outside, the close button, or <kbd>Esc</kbd>.
- **Animations/transitions:** cards and testimonials fade and slide into view on scroll, using an `IntersectionObserver` to toggle a `.is-visible` class (CSS handles the actual transition) — demonstrates DOM manipulation driving a dynamic page without a heavy animation library.

**2.2 Dynamic Content**
- The homepage's "What Customers Say" section is populated entirely by JavaScript from a `testimonials` array in `script.js` — nothing is hard-coded in the HTML, so adding a review means adding one object to the array.
- `services.html` has a live **search/filter** box (`#service-filter`) that filters the visible service cards by keyword as the user types (e.g. typing "leak" narrows the page to the Leak Detection card). Cards are hidden with CSS rather than removed from the DOM, so the content remains crawlable for SEO even without JavaScript.

### 3. Search Engine Optimisation (SEO)

**3.1 On-Page SEO**
- **Keyword research:** each page targets a distinct phrase relevant to local search intent — e.g. "Johannesburg plumbers" (home), "plumbing installations Johannesburg" (services), "request a plumbing quote" (enquiries).
- **Title tags & meta descriptions:** unique, descriptive `<title>` and `<meta name="description">` on every page.
- **Header tags:** a single `<h1>` per page with `<h2>`/`<h3>` structuring the content underneath it.
- **Image optimisation:** descriptive `alt` text on every image (e.g. *"Geyser installation in a Johannesburg home"*); `loading="lazy"` on gallery photos. Replace the placeholder filenames in `images/` with similarly descriptive file names (e.g. `geyser-installation-johannesburg.jpg`) once real photos are added.
- **URL structure:** flat, lower-case, hyphen-free file names (`services.html`, `enquiries.html`) that double as clean URLs once hosted.
- **Internal linking:** every page links to Services and the quote-request form from its navigation and in-page calls to action.
- **Mobile-friendliness:** carried over from Part 2's responsive breakpoints.
- **Canonical tags:** each page now declares `<link rel="canonical">` pointing at its own URL, to avoid duplicate-content issues once the site is live.

**3.2 Off-Page SEO** *(business actions to take once live — not implemented in code)*
- List the business on Google Business Profile and relevant local directories for backlinks and local SEO signal.
- Share each new page on the business's social media accounts.
- Encourage satisfied customers to leave Google reviews, which strengthens local search ranking.

**3.3 Additional Requests**
- **`robots.txt`** — at the project root, allows all crawlers and points to the sitemap.
- **`sitemap.xml`** — lists all five pages with priority and change frequency.
- **Page speed:** Google Fonts are preconnected (`<link rel="preconnect">`), images are lazy-loaded, and the site ships no JavaScript frameworks — just one small `script.js` file.
- **Security:** a Netlify `_headers` file sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a `Content-Security-Policy` to reduce the site's attack surface (clickjacking, MIME-sniffing, mixed content). On GitHub Pages, the equivalent headers would need to be set via a `<meta http-equiv>` fallback or a custom server, since GitHub Pages doesn't support custom response headers — see Deployment below.

### 4. Form Functionality and Validation

- **`enquiries.html`** — the quote-request form, for enquiries about services, pricing, or availability.
- **`contact.html`** — a separate, shorter general-message form, for feedback, complaints, or anything that isn't a quote request.
- **Form elements:** both forms use appropriate `input`, `select`, and `textarea` elements with `label`s for every field.
- **Form validation:** handled in `script.js` (`validateField` / `validateForm`) — required fields, an email-format check, a South African phone-number pattern, and a minimum character count on free-text fields, each with an inline error message under the field (`.field-error`) and `aria-invalid` set for assistive tech. HTML5 attributes (`required`, `type="email"`, `type="tel"`, `pattern`, `minlength`) back this up; `novalidate` is set on both forms so the custom JavaScript messages are what the user sees, instead of the browser's native validation bubble.
- **Form submission:** once a form validates, its data is compiled into an email (subject + body) and handed to the user's email client via a `mailto:` link addressed to the recipient hard-coded in `script.js` (`EMAIL_RECIPIENT`). A short `setTimeout` simulates the asynchronous "Sending…" state an AJAX call to a real backend would give.
  - **This project has no backend**, so `mailto:` is the mechanism that fits a site deployed to a free static host (Netlify/GitHub Pages) with no server to receive a POST request. The `wireForm()` function in `script.js` is written so the `setTimeout` block can be swapped for a real `fetch()` POST to an email API (e.g. [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com)) without changing anything else in the form markup or validation logic, if true AJAX submission is required.

### Deployment

The site is deployed as a static site (no build step) to **[Netlify / GitHub Pages — update once deployed]**.

**To deploy on Netlify:**
1. Create a free account at [netlify.com](https://netlify.com).
2. Drag the project folder (containing `index.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml`, `_headers`, and the `images/` folder) onto the Netlify dashboard, **or** connect the GitHub repository for continuous deployment on every push.
3. Netlify auto-detects `index.html` as the homepage and applies the `_headers` file automatically — no further configuration needed.
4. Copy the live `.netlify.app` URL (or a connected custom domain) into this README and the proposal document.

**To deploy on GitHub Pages instead:**
1. In the repository, go to **Settings → Pages**.
2. Set the source to the `main` branch, root folder.
3. The site publishes at `https://<username>.github.io/<repo-name>/`.
4. GitHub Pages ignores the `_headers` file (Netlify-only); if the security headers above are required, add them via a `<meta http-equiv="Content-Security-Policy">` tag in each page's `<head>` instead.

## Sitemap

```
Home (index.html)
├── About (about.html)
├── Services (services.html)
├── Get a Quote (enquiries.html)
└── Contact (contact.html)
```

## Technical Requirements

- **Hosting and domain:** Shared hosting package with a .co.za domain (e.g., thompsonplumbing.co.za) for the commercial version; deployed to a free static host (Netlify/GitHub Pages) for this student project.
- **Languages and frameworks:** HTML5, CSS3, and vanilla JavaScript (no frameworks), built as a responsive static site.

## Changelog

All notable changes to this project are documented below, newest first.

### [Unreleased]
- Pending: update the Deployment section above with the live site URL once published.
- Pending: once Part 2 marks and feedback are released, add a dedicated changelog entry here listing the specific corrections made in response — this entry is a placeholder until that feedback is available.

### [0.5.0] — Part 3 (Functionality, Forms & SEO)
- Added an FAQ accordion to `services.html` (`.accordion-item`/`.accordion-trigger`/`.accordion-panel`) with keyboard-accessible, single-open-panel behaviour.
- Added a lightbox to the homepage photo gallery for viewing images full-size.
- Added a dynamically-loaded "What Customers Say" testimonials section on the homepage, rendered from a JavaScript data array.
- Added a live search/filter bar to `services.html` that filters service cards by keyword without removing them from the DOM.
- Added scroll-reveal animation on cards and testimonials via `IntersectionObserver`.
- Added a new general "Send a Message" form to `contact.html`, distinct in purpose from the `enquiries.html` quote-request form.
- Rebuilt form handling in `script.js`: required-field, email-format, SA phone-format, and minimum-length validation with inline error messages; forms now compile validated data into an email via a `mailto:` link, with a simulated async "Sending…" state.
- Added `robots.txt` and `sitemap.xml` at the project root.
- Added canonical tags, Google Fonts preconnect, and a `robots` meta tag to every page.
- Added a Netlify `_headers` file with security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`).

### [0.4.0] — Part 2 (Responsive & Interactive Styling)
- Restructured `style.css` into clearly labelled sections matching the module brief (external stylesheet, base style, typography, layout structure, visual styles, breakpoints, relative units, responsive images, testing).
- Converted font sizes and spacing to `rem` units for accessibility and consistency; fluid headings via `clamp()`.
- Added an explicit three-tier breakpoint system: Desktop (≥1024px), Tablet (768–1023px), Mobile (<768px).
- Added `:hover`, `:focus-visible`, and `:active` interaction states to all buttons, nav links, and form fields.
- Added a CSS reset and consolidated colour variables (`:root` custom properties).

### [0.3.0] — Part 1 Feedback Edits
- Added low-fidelity wireframes (Homepage, Services page, Contact page) to the Website Project Proposal document, addressing formative feedback ("No wireframes provided — 0/2").
- Reviewed and confirmed proposed features, design aesthetic, technical requirements, timeline, and budget sections against formative feedback; no further changes required as these sections scored full marks.

### [0.2.0] — Part 1 (Services Page)
- Added `services.html` detailing Installations, Repairs & Maintenance, and Emergency Callouts.
- Updated navigation and footer links across all pages to include Services.
- Added a "Recent Work" photo gallery container (`.photo-grid` / `.photo-frame`) to the homepage, using `object-fit: cover` and `aspect-ratio` so photos of any size fit consistently.

### [0.1.0] — Part 1 (Initial Build)
- Created `index.html`, `about.html`, `contact.html`, and `enquiries.html`.
- Implemented shared `style.css` design system (navy/safety-orange palette, Oswald + Open Sans typography).
- Implemented `script.js` for mobile nav toggle, quote form submission, and photo file-upload interaction.
- Added sticky mobile call-to-action button and 24/7 emergency strip.

## References

- Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability*. New Berkeley: New Riders.
- MDN Web Docs. (2026). *CSS Flexible Box Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout [Accessed 2026].
- MDN Web Docs. (2026). *CSS Grid Layout*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout [Accessed 2026].
- MDN Web Docs. (2026). *Using Media Queries*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries [Accessed 2026].
- MDN Web Docs. (2026). *IntersectionObserver API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API [Accessed 2026].
- MDN Web Docs. (2026). *Constraint Validation (HTML5 form validation)*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation [Accessed 2026].
- Google Search Central. (2026). *SEO Starter Guide*. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed 2026].
- W3Schools. (2026). *HTML and CSS Responsive Web Design*. Available at: https://www.w3schools.com [Accessed 2026].
