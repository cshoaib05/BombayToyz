/**
 * Image optimization pipeline.
 *
 * Source photos in assets/images are raw supplier shots: mixed formats,
 * non-descriptive filenames, and a total weight of ~69 MB (the largest single
 * file is 32 MB). That is unhostable as-is on shared cPanel hosting and
 * unusable on mobile data.
 *
 * This script normalizes every image into web-optimised WebP under
 * src/assets/products/ with a clean, URL-safe filename, and writes a manifest
 * so the product catalogue can reference stable keys.
 *
 * Run:  npm run images
 */
import { mkdir, readdir, rm, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets", "images");
const OUT_DIR = path.join(ROOT, "src", "assets", "products");
const MANIFEST = path.join(ROOT, "src", "assets", "products", "manifest.json");

const MAX_WIDTH = 1200;
const QUALITY = 80;

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".jfif", ".avif", ".gif"]);

/** Turn a messy supplier filename into a stable, URL-safe slug. */
function slugify(name) {
  return path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });

  // Each sub-folder of assets/images is one catalogue category; its name is
  // used as a slug prefix so identically named files never collide.
  const entries = [];
  for (const dir of (await readdir(SRC_DIR, { withFileTypes: true })).filter((d) => d.isDirectory())) {
    for (const f of (await readdir(path.join(SRC_DIR, dir.name))).sort()) {
      if (SUPPORTED.has(path.extname(f).toLowerCase())) entries.push(path.join(dir.name, f));
    }
  }
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const manifest = {};
  let before = 0;
  let after = 0;
  const used = new Map();

  for (const file of entries) {
    const input = path.join(SRC_DIR, file);
    const originalBytes = (await stat(input)).size;
    before += originalBytes;

    // Guarantee unique output names (e.g. "Stanley.jpg" vs "Stanley.jfif").
    let slug = `${path.dirname(file).toLowerCase()}-${slugify(file) || "image"}`.slice(0, 70);
    if (used.has(slug)) {
      const n = used.get(slug) + 1;
      used.set(slug, n);
      slug = `${slug}-${n}`;
    } else {
      used.set(slug, 1);
    }

    const outName = `${slug}.webp`;
    const output = path.join(OUT_DIR, outName);

    await sharp(input)
      .rotate() // honour EXIF orientation before stripping metadata
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);

    const outBytes = (await stat(output)).size;
    after += outBytes;

    const meta = await sharp(input).metadata();
    manifest[outName.replace(/\.webp$/, "")] = {
      source: file,
      width: meta.width ?? null,
      height: meta.height ?? null,
      originalKB: Math.round(originalBytes / 1024),
      optimizedKB: Math.round(outBytes / 1024),
    };

    const saved = Math.round((1 - outBytes / originalBytes) * 100);
    console.log(
      `${file.padEnd(52)} ${String(Math.round(originalBytes / 1024)).padStart(6)}KB -> ${String(
        Math.round(outBytes / 1024),
      ).padStart(5)}KB  (${slug})`,
    );
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log(
    `\n${entries.length} images  |  ${(before / 1024 / 1024).toFixed(1)} MB -> ${(
      after /
      1024 /
      1024
    ).toFixed(1)} MB  (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
  console.log(`Output:  ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
