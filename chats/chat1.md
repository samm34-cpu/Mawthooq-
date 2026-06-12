# Arabic Brand Reviews

_Started 2026-06-12 01:39 UTC_

---

## User

a Ux like Airbnb for a trustpilot of arabic brands, users can see reviews they can see the brand reviews with images / videos / text reviews, seo optimized using this style

## Assistant

_[tool: questions_v2]_

I'd love to build this — a Trustpilot-for-Arabic-brands with Airbnb-grade polish and that clean, glassy qclay aesthetic (soft lavender-blue, Inter Tight, translucent cards, ambient pixel-grid). Before I start, a few quick questions so I build the right thing rather than guessing.

## User

Questions answered:
- language: Bilingual (Arabic UI, RTL) with some English brand names
- primary_screen: Home / discovery (Airbnb-style brand grid + search)
- categories: E-commerce / online shops, Services (banking, telecom, etc.), Fashion & beauty, Electronics & tech
- media_emphasis: pinterest style images
- trust_signals: Star rating breakdown / distribution bars, TrustScore-style aggregate number, Verified purchase badges
- aesthetic_fidelity: Use it heavily as inspiration (glassy blue, ambient grid, soft shadows)
- ambient_grid: No, keep it calm
- variations: Yes — a few directions for the main screen
- tweaks: Decide for me

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

Got it — here's my read on the brief before I build:

**Mawthooq (موثوق)** — a Trustpilot-for-Arabic-brands with Airbnb-grade discovery UX. RTL Arabic UI (English brand names allowed), Pinterest-style masonry of brand + review-media cards, glassy-blue aesthetic with soft shadows (no animated grid — keeping it calm), and trust signals front and center: TrustScore, star-distribution bars, verified-purchase badges. I'll ship one fully interactive prototype and expose the "few directions" as a **Layout** tweak (Masonry / Grid / Editorial) so you can compare live, plus accent/font/density/RTL tweaks.

A note on assets: I'll use **real Arabic brand names** as listings (that's the actual job of a reviews aggregator), but I won't fake their logos — monogram tiles + honest media placeholders instead. Let me set up.

_[tool: write_file]_

Now let me build. Starting with the design tokens and styles.

_[tool: write_file]_

_[tool: write_file]_

Now the shared primitives (icons via Lucide UMD, stars, TrustScore, badges, placeholders).

_[tool: write_file]_

Now the card components and the detail lightbox.

_[tool: write_file]_

_[tool: write_file]_

Now the main app — navbar, hero search, filters, the three layout directions, and tweaks.

_[tool: write_file]_

Now the root component with tweaks, plus the HTML shell.

_[tool: grep]_

Let me verify the tweak control APIs before wiring the HTML.

_[tool: read_file]_

_[tool: write_file]_

Now the HTML shell that wires it all together.Let me preview and check for errors.

_[tool: show_html]_

_[tool: show_html]_

Black screen — let me check the console logs.

_[tool: get_webview_logs]_

_[tool: str_replace_edit]_

The Lucide UMD node format isn't what my `Icon` expected — it crashes on destructure. I'll replace it with a self-contained inline icon set (standard simple UI glyphs) and drop the Lucide dependency.Now remove the Lucide dependency from the HTML.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: str_replace_edit]_

Renders cleanly — RTL, glass, masonry, trust signals all working. One visible bug: the navbar "اكتب مراجعة" button is wrapping and colliding with the avatar. Let me fix that and tidy the SHEIN monogram.

_[tool: str_replace_edit]_

_[tool: show_html]_

Let me verify the navbar fix and test the interactions (lightbox, layouts).

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

Navbar fixed. Let me verify the lightbox opens (brand detail + media detail) and the alternate layouts.

_[tool: eval_js_user_view]_

The lightbox click test isn't triggering. Let me probe the actual DOM to see why.

_[tool: eval_js_user_view]_

_[tool: save_screenshot]_

The modal does open — the screenshot tool just wasn't capturing the fixed overlay. Let me verify visually with a real pixel capture of the brand detail and a media detail.

_[tool: save_screenshot]_

_[tool: eval_js_user_view]_

Capture tools re-render via html-to-image and drop the `backdrop-filter` overlay — but the DOM proves the modal mounts. Let me read its structure/dimensions to confirm it lays out correctly.

_[tool: eval_js_user_view]_

_[tool: eval_js_user_view]_

_[tool: eval_js_user_view]_

_[tool: eval_js_user_view]_

The modal is open (just had the wrong child path — first child is the `<style>`). Let me measure it correctly.

_[tool: delete_file]_

Brand modal opens at 960×438, fits the viewport, content correct. The lightbox, masonry, RTL, trust signals, and tweaks all work — the capture tools just can't render the blurred overlay. Let me clean up the scratch screenshot and finalize.

_[tool: update_todos]_

_[tool: done]_

No console errors. Let me kick off background verification.

_[tool: fork_verifier_agent]_

**موثوق · Mawthooq** is live — a Trustpilot-for-Arabic-brands with Airbnb-grade discovery UX.

**What's there**
- **Full RTL Arabic** UI with English brand names; glassy-blue aesthetic, soft shadows, calm aurora background (no animated grid, as you asked).
- **Hero search** with an Arabic typewriter placeholder + quick-search chips.
- **Pinterest masonry feed** mixing three card types: brand summaries, text reviews, and photo/video review cards (honest media placeholders, not faked logos — monogram tiles instead).
- **Trust signals** front and center: TrustScore aggregate (with Arabic verdicts like "ممتاز/جيد جدًا"), animated star-distribution bars, and "عملية شراء موثّقة" verified badges.
- **Working interactions**: live category filter, sort (الأعلى تقييمًا / الأكثر مراجعةً / الأحدث), search filtering, hover lift, and a click-through **detail lightbox** for both brands (rating + distribution + latest reviews) and media reviews.
- **Tweaks panel** (toolbar toggle) with the "few directions" baked in as a live **Layout** switch — Masonry / Grid / Editorial — plus accent color, Arabic font, density, and RTL↔LTR.

**Worth knowing**
- All review content and brand stats are realistic mock data.
- The brand/review media are striped gradient placeholders — drop in real photos/logos when you have them.
- Background verification is running; I'll flag anything it catches.

**Possible next steps** (say the word): a full **brand profile page**, a **write-a-review flow**, or a real **search-results** screen.

