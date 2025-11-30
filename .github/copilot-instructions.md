## Purpose

This file tells AI coding agents how to work effectively in this repository: a small static portfolio site made from plain HTML/CSS/JS. The guidance below focuses on concrete, discoverable patterns and gotchas found in the codebase.

## Big Picture
- **Project Type:** Static single-page portfolio (no build toolchain). Serve as static files.
- **Primary assets:** `index.html`, `pages/` (extra pages), `css/` (styles), `js/` (scripts), `works/` (assets).
- **Why:** Lightweight, hand-authored site to showcase work; changes are applied directly to files and previewed in a browser.

## Key Files / Conventions
- **`index.html`**: The main entry — includes non-module `js/utils.js` (plain script) first, then module scripts with `defer` (`js/works.js`, `js/scroller.js`, `js/main.js`, `js/background.js`). Do not reorder or convert scripts to modules without adjusting import/exports.
- **`js/works.js`**: Controls the 3D carousel. Pattern: DOM ready (`DOMContentLoaded`) wrapper, calculates `radius`, `angle`, uses `translateZ` and `rotateY`. When adding works, keep the DOM structure used by this script (ul#works-grid > li.works-item > a > .works-image + .works-info).
- **`js/main.js`**: Uses `pageContainer` scrolling (the page uses a scrolling container, not window scroll). When adjusting scroll behavior, update `pageContainer` usage rather than `window`.
- **`css/` and filenames with spaces**: Some files and pages use spaces (e.g., `css/service price.css`, `pages/service price.html`). Preserve these names — if referencing in URLs or paths, wrap them in quotes or escape spaces. Prefer adding new files without spaces to avoid tooling issues.
- **Empty helper file:** `js/utils.js` exists but is currently empty — safe to use for shared helpers; keep it loaded as a plain script (not a module) to avoid execution ordering side-effects.

## Patterns & Examples
- **Add a new work item:** replicate this structure inside `ul#works-grid`:

```html
<li class="works-item">
  <a href="/path/to/work-page.html">
    <div class="works-image" style="background-color:#8fbc8f"></div>
    <div class="works-info"><h3>Title</h3><p class="works-section__text">タグ</p></div>
  </a>
</li>
```

- **Script loading rule:** `utils.js` (plain script) must load before module scripts. Module scripts use `type="module" defer`.

## Dev / Preview Workflow
- **No build step.** Edit files and preview in browser.
- **Quick local server (PowerShell):**

```
python -m http.server 8000
```

or, if Node available:

```
npx http-server . -p 8000
```

- Open `http://localhost:8000` and test interactions (carousel, header hide/show, contact form UI).

## Common Gotchas (do not change accidentally)
- **Relative path mismatches:** index links to `normaliza.css` (root) while actual styles live under `css/`. Verify relative paths before renaming or moving files.
- **Spaces in filenames:** The project currently contains files with spaces (`service price.html`, `service price.css`). Avoid renaming them silently — updating links and references is required.
- **Scroll handling:** Scrolling behavior is implemented on `#page-container`, not `window`. Changing this can break header/footer hide/show behavior.

## When to Modify What
- **HTML structural changes** (new sections, works items): safe and expected. Keep class names used by JS (`works-grid`, `works-item`, `page-header`, `page-footer`, `page-container`).
- **JS changes:** Be careful with script ordering and `type="module"`. If converting a plain script to a module, update import/exports and index.html accordingly.
- **CSS changes:** Add styles to `css/` files. Prefer adding new files without spaces; then update `index.html` references.

## PR Guidance for AI agents
- Keep changes minimal and isolated. Describe visual/behavioral changes in PR description.
- When updating file names or paths, include a checklist of places updated (HTML links, script tags).

## What is NOT present
- No automated tests or linting config were found. Expect manual verification steps.

## If you need more context
- Open `index.html`, `js/works.js`, and `js/main.js` to inspect interactive behavior.
- Ask the repo owner before renaming files or introducing a build/tooling step.

---
If any of these sections are unclear or you'd like examples expanded (e.g., exact carousel math or step-by-step of adding a new work page), tell me which part to expand and I'll update this file.
