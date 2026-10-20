# Bombay Toyz — Website

React + Vite + TypeScript + Tailwind CSS v4.

A wholesale B2B catalogue for **Bombay Toyz** — retailers and distributors browse
products by category, filter and search the catalogue, open product detail pages,
and build a multi-product enquiry basket sent via WhatsApp or the enquiry form.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Script            | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server                      |
| `npm run build`   | Type-check then build to `dist/`               |
| `npm run preview` | Preview the production build                   |
| `npm run images`  | Re-optimise `assets/images/` into `src/assets/products/` |

## Structure

```
src/
  App.tsx           # All pages + components (home, catalogue, product detail, enquiry drawer)
  products.ts       # The catalogue: 124 products (Bottles, Gifts, Toys), one image each + image registry + helpers
  assets/products/  # Generated WebP product photos + manifest.json (do not hand-edit)
  index.css         # Design tokens (:root), component styles, responsive breakpoints
  main.tsx          # React entry point
assets/images/      # Raw supplier photos (source of truth, 69 MB — not deployed)
scripts/
  optimize-images.mjs    # assets/images -> src/assets/products (WebP, 1200px)
  rename-source-images.ps1  # One-off rename of supplier filenames to slugs
```

## Images

Raw supplier photos live in `assets/images/`. They are **not** deployed — the site
serves the optimised copies in `src/assets/products/`.

```bash
npm run images
```

That script resizes to 1200px wide and converts to WebP at quality 80, writing
clean URL-safe slugs plus `manifest.json` (which records the original filename for
every asset). It takes the folder from **69.3 MB to 7.2 MB**. The largest source
file was 32 MB.

Images are resolved with `import.meta.glob` rather than static imports, so adding
a product is a one-line change and every file is still fingerprinted by Vite.
Referencing a slug with no matching file throws at module load — the catalogue
fails loudly instead of shipping a broken `<img>`.

`scripts/rename-source-images.ps1` is a one-off utility that renamed the supplier
filenames (`BATMINTON.png`, `WhatsApp Image 2026-10-03 at 4.17.31 PM.jpeg`, …)
to descriptive ones. Original names are preserved in the manifest.

## Adding or changing a product

Edit the `products` array in `src/products.ts`:

```ts
{
  id: "url-safe-slug",          // becomes /products/<id>
  name: "Display Name",
  category: "Bottles",          // one of Category
  subcategory: "Sports Bottles",
  sku: "BT-B-021",              // must be unique
  image: img("my-new-photo"),   // filename slug in src/assets/products, no extension
  gallery: [img("second-angle")],   // optional extra shots
  imageAlt: "Descriptive alt text",
  material: "Stainless steel",
  specs: [["Capacity", "500 ml"]],
  colors: ["#3457FF", "#FFD93D"],
  description: "One sentence, B2B tone.",
}
```

Drop the new photo in `assets/images/`, run `npm run images`, then add the entry.

Category and subcategory filter lists are **derived from the data**, so adding a
category needs no UI change. Subcategory names should stay unique across
categories — the detail page picks "related products" from the same collection
first.

## Categories

| Category   | Lines | Notes                                       |
| ---------- | ----- | ------------------------------------------- |
| Bottles    | 20    | Steel, sports, insulated, collapsible       |
| Toys       | 15    | Fidgets, sports, electronics, learning      |
| Appliances | 29    | Kitchen + home electrical                   |
| Gifts      | 5     | Night lights, candles, keychains, bags      |
| Essentials | 3     | Pantry, personal care, desk                 |

## Deployment

Static build, cPanel / Apache hosting. `public/.htaccess` is copied to `dist/` on
every build and handles the SPA fallback — this app routes with the History API,
so without the rewrite, refreshing or sharing `/products/<id>` returns a 404.

```bash
npm run build
```

Upload the **contents** of `dist/` into `public_html` so the layout is:

```
public_html/
  .htaccess
  index.html
  assets/
```

Then in cPanel: run **AutoSSL**, enable **Force HTTPS Redirect**, and uncomment
your preferred www / non-www block in the `.htaccess`.

Re-uploads should overwrite but **never delete** `assets/` — filenames are
content-hashed per build, so cached HTML still references older files.

## Before going live

- Replace the placeholder contact details (`+91 00000 00000`,
  `hello@bombaytoyz.example`) and the `wa.me` number.
- **Third-party trademarks:** several lines carry other companies' brands
  (Stanley, Davidoff, Owala, Sanrio characters, My Little Pony, Power Smash).
  Confirm you have distribution rights for each, or rename/remove the line.
- Product imagery is presentation-only. Verify specifications, MOQ, packaging and
  certifications against your actual stock.
