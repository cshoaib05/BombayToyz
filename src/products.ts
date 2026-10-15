/**
 * Bombay Toyz product catalogue.
 *
 * Every product here maps to a real photograph in `src/assets/products/`.
 * Those files are generated from the raw supplier shots in `assets/images/`
 * by `npm run images` (see scripts/optimize-images.mjs) — source images are
 * resized to 1200px and converted to WebP, taking the folder from ~69 MB
 * down to ~7 MB.
 *
 * Images are resolved through `import.meta.glob` rather than 70+ static
 * imports so that adding a product is a one-line change and every asset is
 * still fingerprinted and cache-busted by Vite.
 */

export type Category =
  | "Toys"
  | "Gifts"
  | "Bottles"
  | "Appliances"
  | "Essentials";

export type Product = {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  sku: string;
  /** Slug of the primary image in src/assets/products (no extension). */
  image: string;
  /** Extra angles of the same product, used to build the detail gallery. */
  gallery?: string[];
  imageAlt: string;
  badge?: "New" | "Popular";
  material?: string;
  specs?: Array<[string, string]>;
  colors: string[];
  description: string;
};

/* ------------------------------------------------------------------ */
/* Image registry                                                      */
/* ------------------------------------------------------------------ */

const modules = import.meta.glob("./assets/products/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const registry: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const slug = path.split("/").pop()!.replace(/\.webp$/, "");
  registry[slug] = url;
}

const missing = new Set<string>();
/** Resolve a product slug to a bundled asset URL. */
function img(slug: string): string {
  const url = registry[slug];
  if (!url) missing.add(slug);
  return url ?? "";
}

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---------------------------- Bottles ---------------------------- */
  {
    id: "mini-bullet-steel-bottle",
    name: "Mini Bullet Stainless Steel Sip Bottle",
    category: "Bottles",
    subcategory: "Steel",
    sku: "BT-B-001",
    image: img("mini-bullet-steel-bottle"),
    imageAlt:
      "Six small matte bullet-shaped steel bottles with flip-top spout lids in cream, teal, sage, rose gold, black and orange",
    badge: "Popular",
    material: "Stainless steel",
    specs: [
      ["Capacity", "300 ml"],
      ["Lid", "Leak-proof flip-lock spout"],
      ["Finish", "Powder-coated matte"],
    ],
    colors: ["#F2E7B8", "#17B8B0", "#7E9C86", "#E85A12"],
    description:
      "Compact bullet-shaped steel bottles with leak-proof flip-lock spout lids in matte powder-coated colours, an easy low-price gift item for drinkware and hamper counters.",
  },
  {
    id: "printed-floral-steel-bottle",
    name: "Printed Vintage Floral Bullet Steel Bottle",
    category: "Bottles",
    subcategory: "Steel",
    sku: "BT-B-002",
    image: img("printed-floral-steel-bottle"),
    imageAlt:
      "Mini bullet steel bottles covered in vintage floral and butterfly printed artwork with polished steel lids",
    material: "Stainless steel",
    specs: [
      ["Capacity", "300 ml"],
      ["Lid", "Flip-lock spout"],
      ["Print", "Vintage floral decal"],
    ],
    colors: ["#3E8E7E", "#D9C7A8", "#C6506B", "#5B8FC9"],
    description:
      "The same mini bullet steel bottle as the plain colour range, wrapped in vintage floral, butterfly and bird decals — a print-forward variant that lifts gift-basket pricing.",
  },
  {
    id: "gradient-sports-bottle-3pc",
    name: "3 Piece Gradient Sports Bottle Set",
    category: "Bottles",
    subcategory: "Sports Bottles",
    sku: "BT-B-003",
    image: img("3pc-gradient-sports-bottle-set"),
    imageAlt:
      "Three blue-to-orange gradient sports bottles with carry handle, printed volume scale and motivational quote graphics",
    badge: "Popular",
    material: "Food-grade plastic",
    specs: [
      ["Set size", "2000 ml, 900 ml and slim steel-lid bottle"],
      ["Closure", "Flip-lock spout with carry handle on 2000 ml"],
      ["Packing", "Retail-ready 3-piece carton"],
    ],
    colors: ["#39BCE8", "#F07A1E", "#C9CFD6"],
    description:
      "Three-piece blue-to-orange gradient sports bottle set covering a 2000 ml handled bottle, a 900 ml time-marked bottle and a slim steel-lid bottle, sold as one ready-to-retail bundle.",
  },
  {
    id: "time-marker-sports-bottle",
    name: "Time Marker Printed Sports Water Bottle",
    category: "Bottles",
    subcategory: "Sports Bottles",
    sku: "BT-B-004",
    image: img("900ml-time-marker-sports-bottle"),
    imageAlt:
      "Five clear sports bottles with hour-by-hour refill tracking print, flip-top spouts and carrying straps",
    material: "Food-grade plastic",
    specs: [
      ["Print", "8 AM to 7 PM hour-marker scale"],
      ["Closure", "Flip-lock spout"],
      ["Extras", "Neck carrying strap"],
    ],
    colors: ["#1A1A1A", "#1FA796", "#F0B7C0", "#2B7FD4", "#8E6FD1"],
    description:
      "Clear sports bottles printed with an 8 AM to 7 PM hour-marker scale and motivational phrases, plus flip-lock spout and neck strap, across five transparent colourways.",
  },
  {
    id: "gradient-900ml-sports-bottle",
    name: "Gradient 900ml Sports Water Bottle",
    category: "Bottles",
    subcategory: "Sports Bottles",
    sku: "BT-B-005",
    image: img("900ml-gradient-sports-bottle"),
    imageAlt:
      "Gradient 900ml sports bottles with printed volume scale, flip-lock spouts and carrying straps",
    material: "Food-grade plastic",
    specs: [
      ["Capacity", "900 ml"],
      ["Print", "Dual volume scale in ml and oz"],
      ["Closure", "Flip-lock spout"],
    ],
    colors: ["#8E6FD1", "#F07A1E", "#2B7FD4", "#F0B7C0"],
    description:
      "Opaque gradient 900 ml sports bottles with a dual ml and oz volume scale, flip-lock spout and neck strap — the premium-looking finish in the time-marker sports range.",
  },
  {
    id: "gradient-time-marker-bottle",
    name: "Gradient Time Marker Sports Bottle",
    category: "Bottles",
    subcategory: "Sports Bottles",
    sku: "BT-B-006",
    image: img("900ml-gradient-time-marker-bottle"),
    imageAlt:
      "Three gradient sports bottles with hour-marker refill print, flip-top spouts and carrying straps",
    material: "Food-grade plastic",
    specs: [
      ["Print", "8 AM to 7 PM hour-marker scale"],
      ["Closure", "Flip-lock spout"],
      ["Extras", "Neck carrying strap"],
    ],
    colors: ["#F2A0B0", "#3FBFA8", "#8E6FD1", "#F07A1E"],
    description:
      "Gradient colourway of the hour-marker sports bottle with flip-lock spout and neck strap, an attractive alternate finish for the same retail listing.",
  },
  {
    id: "matte-insulated-handle-bottle",
    name: "Matte Insulated Bottle With Carry Handle",
    category: "Bottles",
    subcategory: "Insulated",
    sku: "BT-B-007",
    image: img("matte-insulated-handle-bottle"),
    imageAlt:
      "Matte insulated bottles with carry handles in white, black, pink, cream, grey, lilac and magenta",
    badge: "Popular",
    material: "Stainless steel",
    specs: [
      ["Lid", "Twist cap with carry handle"],
      ["Finish", "Matte powder-coated"],
      ["Range", "Seven colourways"],
    ],
    colors: ["#FFFFFF", "#1C1C1C", "#F3C1D8", "#C9C9C9", "#C6A8DC", "#D6246E"],
    description:
      "Double-wall matte bottles with an integrated carry handle and steel rim, supplied across seven colourways for gym, campus and corporate gifting buyers.",
  },
  {
    id: "animal-character-bottle",
    name: "Animal Character Water Bottle",
    category: "Bottles",
    subcategory: "Kids Bottles",
    sku: "BT-B-008",
    image: img("animal-character-bottle"),
    imageAlt:
      "Animal-shaped bottles with bear, dog, rabbit, fox, koala, elephant, deer and panda character caps",
    badge: "New",
    material: "Food-grade plastic",
    specs: [
      ["Designs", "Eight animal characters"],
      ["Closure", "Character-head screw cap"],
      ["Colours", "Matching bottle and cap"],
    ],
    colors: ["#8E6FD1", "#E8894C", "#F3C1D8", "#BFD8B4", "#4A90D9"],
    description:
      "Eight animal-character bottles — bear, dog, rabbit, fox, koala, elephant, deer and panda — where the moulded cap doubles as the character, built for kids gifting and school counters.",
  },
  {
    id: "collapsible-silicone-bottle",
    name: "Collapsible Silicone Water Bottle",
    category: "Bottles",
    subcategory: "Collapsible",
    sku: "BT-B-009",
    image: img("collapsible-silicone-bottle"),
    imageAlt:
      "Light blue collapsible silicone bottle shown extended, folded flat in a hand, and tucked into a shoulder bag",
    material: "Food-grade silicone",
    specs: [
      ["Closure", "Screw cap with carabiner"],
      ["Packing", "Collapses to pocket size"],
      ["Care", "Hand wash recommended"],
    ],
    colors: ["#8FC5DC", "#F2F2F2", "#B0B0B0"],
    description:
      "Fold-flat silicone bottle with screw cap and carabiner strap that collapses to pocket size, a practical low-cost item for stationery, gym and travel retail.",
  },
  {
    id: "nice-400ml-sip-tumbler",
    name: "NICE 400ml Printed Plastic Sip Tumbler",
    category: "Bottles",
    subcategory: "Printed",
    sku: "BT-B-010",
    image: img("nice-400ml-sip-tumbler"),
    imageAlt:
      "NICE branded 400ml plastic tumblers with flip lids in pink, cream and white, standing on their matching printed boxes",
    material: "Food-grade plastic",
    specs: [
      ["Capacity", "400 ml"],
      ["Closure", "Flip sip lid"],
      ["Packing", "Matching printed carton"],
    ],
    colors: ["#F58494", "#F5E4C3", "#F2F2F0", "#8F1F4B"],
    description:
      "NICE branded 400 ml plastic tumbler with flip sip lid, supplied in four pastel shades with matching printed gift cartons for easy shelf merchandising.",
  },
  {
    id: "handled-travel-tumbler",
    name: "Handled Plastic Travel Tumbler",
    category: "Bottles",
    subcategory: "Tumblers",
    sku: "BT-B-011",
    image: img("handled-travel-tumbler"),
    imageAlt:
      "Light blue plastic travel tumbler with side handle, sliding lid and narrow base sized for a car cup holder",
    material: "Food-grade plastic",
    specs: [
      ["Closure", "Sliding lid"],
      ["Handle", "Side carry loop"],
      ["Base", "Fits car cup holders"],
    ],
    colors: ["#9CC4E8", "#F5F5F5"],
    description:
      "Slim handled travel tumbler with sliding lid and tapered car-cup-holder base, a mainstream low-priced item for office, campus and auto accessory counters.",
  },
  {
    id: "space-cartoon-bottle",
    name: "Space Cartoon Printed Sports Water Bottle",
    category: "Bottles",
    subcategory: "Printed",
    sku: "BT-B-012",
    image: img("space-cartoon-bottle"),
    imageAlt:
      "Four clear sports bottles printed with cartoon astronauts, rockets and rainbows under the word SPACE",
    badge: "New",
    material: "Food-grade plastic",
    specs: [
      ["Print", "Astronaut, rocket and rainbow graphics"],
      ["Closure", "Flip-lock spout"],
      ["Extras", "Neck carrying strap"],
    ],
    colors: ["#BFE3D2", "#5BA7E0", "#F7C4C4", "#9B7FD4"],
    description:
      "Clear sports bottles with cartoon astronaut, rocket and rainbow SPACE prints, flip-lock spouts and neck straps, aimed at school bags and kids gift counters.",
  },
  {
    id: "brushed-steel-bottle",
    name: "Brushed Stainless Steel Water Bottle",
    category: "Bottles",
    subcategory: "Steel",
    sku: "BT-B-013",
    image: img("brushed-steel-bottle"),
    imageAlt:
      "Two brushed stainless steel water bottles with screw caps, one fitted with a silicone carry strap",
    material: "Stainless steel",
    specs: [
      ["Closure", "Screw cap"],
      ["Extras", "Silicone carry loop"],
      ["Finish", "Brushed"],
    ],
    colors: ["#C9CCD1", "#BFC3C8"],
    description:
      "Slim brushed stainless steel bottles with leak-resistant screw caps and silicone carry loops, a durable mid-tier replacement for plastic drinkware.",
  },
  {
    id: "stanley-straw-tumbler",
    name: "Stanley Handled Tumbler With Straw Lid",
    category: "Bottles",
    subcategory: "Insulated",
    sku: "BT-B-014",
    image: img("stanley-straw-tumbler"),
    imageAlt:
      "Five Stanley branded handled insulated tumblers with straw lids in lavender, pink, cream, green and blue, shown with a branded gift box",
    material: "Stainless steel",
    specs: [
      ["Insulation", "Vacuum insulated"],
      ["Lid", "Straw lid with handle"],
      ["Packing", "Branded presentation box"],
    ],
    colors: ["#C3AEDC", "#E8447F", "#F2EDE0", "#A8CE8E", "#1E4FA3"],
    description:
      "Stanley branded vacuum-insulated handled tumblers with straw lids, supplied in five colours with a printed presentation box that supports premium gifting sales.",
  },
  {
    id: "stanley-straw-tumbler-alt",
    name: "Stanley Handled Tumbler With Straw Lid — Alt Colours",
    category: "Bottles",
    subcategory: "Insulated",
    sku: "BT-B-015",
    image: img("stanley-straw-tumbler-alt"),
    imageAlt:
      "Five Stanley branded handled insulated tumblers with straw lids in black, hot pink, cream, sage and turquoise",
    material: "Stainless steel",
    specs: [
      ["Insulation", "Vacuum insulated"],
      ["Lid", "Straw lid with handle"],
      ["Range", "Darker and brighter colour run"],
    ],
    colors: ["#000000", "#EE2E86", "#EFE3C4", "#B9CC9C", "#2FBFDF"],
    description:
      "Identical Stanley style insulated handled tumbler in a second colour run including black and turquoise, letting retailers reorder in darker and brighter shades.",
  },
  {
    id: "push-button-travel-mug",
    name: "300ml Push Button Travel Coffee Mug",
    category: "Bottles",
    subcategory: "Mugs",
    sku: "BT-B-016",
    image: img("push-button-travel-mug"),
    imageAlt:
      "Matte black cylindrical travel mug with a push button sip lid, labelled 300ml capacity, on an office desk",
    material: "Stainless steel",
    specs: [
      ["Capacity", "300 ml"],
      ["Closure", "Push-button sip lid"],
      ["Finish", "Matte black"],
    ],
    colors: ["#1C1C1C", "#000000"],
    description:
      "Matte black 300 ml travel mug with push-button sip lid, sized for desk and commute use and easy to pair with coffee bundles in convenience retail.",
  },
  {
    id: "vacuum-flask-mug-set",
    name: "4 Piece Vacuum Flask And Mug Gift Set",
    category: "Bottles",
    subcategory: "Insulated",
    sku: "BT-B-017",
    image: img("vacuum-flask-mug-set"),
    imageAlt:
      "Green vacuum flask and three matching handled mugs arranged in a black presentation gift bag box with rope handles",
    badge: "Popular",
    material: "Stainless steel",
    specs: [
      ["Set size", "1 flask plus 3 mugs"],
      ["Insulation", "Vacuum insulated"],
      ["Packing", "Rope-handle gift box"],
    ],
    colors: ["#3E8E7E", "#1A1A1A", "#C0C0C0"],
    description:
      "Gift-boxed set pairing one handled vacuum flask with three matching steel-rimmed mugs in green, a ready-to-gift corporate and festive hamper pack.",
  },
  {
    id: "beer-pint-tumbler",
    name: "40oz Gold Accent Beer Pint Tumbler",
    category: "Bottles",
    subcategory: "Mugs",
    sku: "BT-B-018",
    image: img("beer-pint-tumbler"),
    imageAlt:
      "Six large handled insulated tumblers with gold base bands in black, pink, white, maroon and blue, stacked on printed beer pint retail boxes",
    material: "Stainless steel",
    specs: [
      ["Capacity", "40 oz / 1208 ml"],
      ["Handle", "Side carry handle"],
      ["Trim", "Gold-effect base and rim"],
    ],
    colors: ["#1A1A1A", "#E8175D", "#F5F2EE", "#7A2038", "#A8CBE8"],
    description:
      "Large 40 oz handled insulated tumblers with gold-effect base and rim bands, boxed as beer pints for pub-supply, party and corporate gifting counters.",
  },
  {
    id: "hot-cold-vacuum-bottle",
    name: "Stainless Steel Hot & Cold Vacuum Bottle",
    category: "Bottles",
    subcategory: "Vacuum Flasks",
    sku: "BT-B-019",
    image: img("hot-cold-vacuum-bottle"),
    imageAlt:
      "Five insulated stainless steel bottles in gold, black, blue, silver and red with rope carry straps",
    badge: "Popular",
    material: "Stainless steel",
    specs: [
      ["Insulation", "Double-wall vacuum"],
      ["Retention", "Up to 30 hours hot or cold"],
      ["Extras", "Rope carry strap"],
    ],
    colors: ["#c9a227", "#1c1c1c", "#1f3f7a", "#b02a37"],
    description:
      "Double-walled stainless steel vacuum bottles in gold, black, navy, silver and red with rope carry straps, marketed on 30-hour hot and cold retention.",
  },
  {
    id: "owala-flip-straw-bottle",
    name: "Owala 710ml Insulated Flip Straw Water Bottle",
    category: "Bottles",
    subcategory: "Water Bottles",
    sku: "BT-B-020",
    image: img("owala-flip-straw-bottle"),
    imageAlt:
      "Six Owala insulated 710ml bottles in plum, mint, yellow and teal lined up on a shelf",
    material: "Stainless steel",
    specs: [
      ["Capacity", "710 ml"],
      ["Insulation", "Vacuum insulated"],
      ["Lid", "Leakproof flip straw with carry loop"],
    ],
    colors: ["#7B5E7B", "#C8E6C0", "#F5C518", "#4E8B8B"],
    description:
      "Owala 710 ml stainless steel insulated water bottles with leakproof flip straw lids and carry loops, shown across plum, mint, yellow and teal colourways.",
  },

  /* ----------------------------- Toys ------------------------------ */
  {
    id: "pop-it-fidget-4-model",
    name: "4 Model Rainbow Pop-It Fidget Set",
    category: "Toys",
    subcategory: "Fidgets",
    sku: "BT-T-001",
    image: img("pop-it-fidget-set"),
    imageAlt:
      "Four rainbow pop-it fidget toys in heart, circle, hexagon and square shapes",
    badge: "Popular",
    material: "Food-grade silicone",
    specs: [
      ["Shapes", "Heart, circle, hexagon, square"],
      ["Packing", "500 pieces per carton"],
      ["Age", "3 years and above"],
    ],
    colors: ["#e53935", "#fdd835", "#42a5f5", "#8e24aa"],
    description:
      "Rainbow silicone Pop-It fidget toys in four shapes — heart, circle, hexagon and square — supplied 500 pieces per carton for high-turnover counter sales.",
  },
  {
    id: "power-smash-badminton",
    name: "Power Smash Badminton Racket With Carry Case",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-002",
    image: img("power-smash-badminton"),
    imageAlt: "Badminton racket with matching carry case",
    badge: "Popular",
    specs: [
      ["Set", "Racket plus zip carry case"],
      ["Strings", "Pre-strung"],
      ["Age", "6 years and above"],
    ],
    colors: ["#1b3fa0", "#e63946", "#1c1c1c", "#ffffff"],
    description:
      "Pre-strung POWER SMASH badminton racket with matching zip carry case, a ready-to-gift sports set that moves quickly with school and club buyers.",
  },
  {
    id: "alphabet-print-football-pair",
    name: "Alphabet Print Football — Pink & Blue Pair",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-003",
    image: img("alphabet-print-football"),
    imageAlt: "Pair of printed alphabet footballs in pink and blue",
    material: "Rubber",
    specs: [
      ["Packing", "Sold as a pair"],
      ["Print", "Full alphabet panels"],
      ["Age", "3 years and above"],
    ],
    colors: ["#ec4899", "#22c55e", "#2563eb", "#ffffff"],
    description:
      "Two printed rubber footballs with full alphabet panels in pink-white and blue-green colourways, kid-safe bouncy balls that sell in pairs off the sports rack.",
  },
  {
    id: "sei-edt-printed-football",
    name: "SEI EDT Printed Football — Four Colour Assortment",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-004",
    image: img("sei-edt-printed-football"),
    imageAlt: "Four printed footballs with SEI EDT branding in four colourways",
    material: "Rubber",
    specs: [
      ["Colours", "Red-black, yellow-orange, navy-yellow, blue-red"],
      ["Print", "Full graphic panels"],
      ["Age", "3 years and above"],
    ],
    colors: ["#e11d48", "#facc15", "#1e3a8a", "#ffffff"],
    description:
      "SEI EDT branded printed footballs in four colourways — red-black, yellow-orange, navy-yellow and blue-red — a graphic-heavy design set for shelf display.",
  },
  {
    id: "silhouette-print-football-5pack",
    name: "Silhouette Print Football — Five Colour Pack",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-005",
    image: img("silhouette-print-football"),
    imageAlt: "Five footballs with black panels and white player silhouettes",
    material: "Rubber",
    specs: [
      ["Pack", "Five assorted colours"],
      ["Print", "Player silhouette panels"],
      ["Age", "3 years and above"],
    ],
    colors: ["#111827", "#ef4444", "#22c55e", "#facc15"],
    description:
      "Football pack of five in red, orange, yellow, blue and green, each with black panels carrying white player silhouettes printed across the surface.",
  },
  {
    id: "1989-crest-football",
    name: "1989 Crest Print Football — Four Colour",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-006",
    image: img("1989-crest-football"),
    imageAlt: "Four colour options of printed 1989 crest footballs",
    material: "Rubber",
    specs: [
      ["Colours", "White, black, blue, red"],
      ["Print", "Vintage crest graphics"],
      ["Age", "3 years and above"],
    ],
    colors: ["#ffffff", "#111827", "#0ea5e9", "#dc2626"],
    description:
      "Printed 1989 crest footballs offered in white, black, blue and red, packed as a four-colour assortment for straightforward shelf and counter merchandising.",
  },
  {
    id: "glossy-graphic-football-6pack",
    name: "Glossy Graphic Print Football — Six Piece Assortment",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-007",
    image: img("glossy-graphic-football"),
    imageAlt:
      "Six glossy printed footballs in assorted colours and graphic patterns",
    material: "Rubber",
    specs: [
      ["Pack", "Six assorted designs"],
      ["Print", "Swirl and hexagonal graphics"],
      ["Finish", "High gloss"],
    ],
    colors: ["#ffffff", "#f97316", "#16a34a", "#111827"],
    description:
      "Six high-gloss printed footballs with abstract swirl and hexagonal graphics in white, orange, green, blue, multi-colour and black for bulk ball assortments.",
  },
  {
    id: "retro-handheld-game-console",
    name: "Retro TV-Style Handheld Game Console",
    category: "Toys",
    subcategory: "Electronics",
    sku: "BT-T-008",
    image: img("retro-handheld-game-console"),
    imageAlt:
      "Purple handheld retro game console showing a platform game on screen",
    badge: "New",
    material: "ABS plastic",
    specs: [
      ["Controls", "Dual RGB-lit thumbsticks"],
      ["Audio", "Built-in speaker"],
      ["Games", "Preloaded platform titles"],
    ],
    colors: ["#3b2fbf", "#7c3aed", "#111827", "#22d3ee"],
    description:
      "Retro TV-style handheld console with dual RGB-lit thumbsticks, built-in speaker and preloaded platform games, a dependable gifting item across festive and school seasons.",
  },
  {
    id: "magic-practice-copybook",
    name: "SANK Magic Practice Copybook Preschool Set",
    category: "Toys",
    subcategory: "Learning",
    sku: "BT-T-009",
    image: img("magic-practice-copybook"),
    imageAlt: "Four SANK Sank Magic copybooks with a pen and eraser",
    material: "Paper",
    specs: [
      ["Titles", "Drawing, Math, Alphabet, Number"],
      ["Includes", "Pen and eraser"],
      ["Age", "3 years and above"],
    ],
    colors: ["#f9a8d4", "#86efac", "#a5d8ff", "#fef3c7"],
    description:
      "SANK Sank Magic Practice Copybook preschool series covering Drawing, Math, Alphabet and Number, supplied with pen and eraser for repeat-activity stationery sales.",
  },
  {
    id: "motion-sensing-racing-game",
    name: "Running Sport Motion Sensing Racing Game",
    category: "Toys",
    subcategory: "Racing Games",
    sku: "BT-T-010",
    image: img("motion-sensing-racing-game"),
    imageAlt:
      "Tabletop motion sensing racing game with track, figures and two wrist controllers",
    material: "ABS plastic",
    specs: [
      ["Players", "Two player"],
      ["Control", "Wrist-strapped motion sensors"],
      ["Age", "3 years and above"],
    ],
    colors: ["#38bdf8", "#fde047", "#f472b6", "#ffffff"],
    description:
      "Running Sport wireless motion-sensing tabletop racing game for two players, with track, car figures and wrist-strapped controllers, social play that encourages group purchase.",
  },
  {
    id: "uv-shield-swimming-goggles",
    name: "UV Shield Anti-Fog Swimming Goggles",
    category: "Toys",
    subcategory: "Sports",
    sku: "BT-T-011",
    image: img("uv-shield-swimming-goggles"),
    imageAlt:
      "Three pairs of swimming goggles in a black hard case plus a red pair",
    material: "Silicone",
    specs: [
      ["Lens", "UV shield with anti-fog coating"],
      ["Trim", "Black, white, blue, red"],
      ["Packing", "Hard carry case"],
    ],
    colors: ["#dc2626", "#ffffff", "#2563eb", "#111827"],
    description:
      "UV-shield anti-fog swimming goggles packed in a hard carry case, supplied in black, white, blue and red trims for pool season and swim-school sales.",
  },
  {
    id: "childrens-video-walkie-talkie",
    name: "Children's Video Walkie Talkie Set",
    category: "Toys",
    subcategory: "Electronics",
    sku: "BT-T-012",
    image: img("childrens-video-walkie-talkie"),
    imageAlt:
      "Pink and blue children's video walkie talkies in blister packaging with cables",
    material: "ABS plastic",
    specs: [
      ["Set", "Two units"],
      ["Charging", "USB cable included"],
      ["Age", "6 years and above"],
    ],
    colors: ["#f7b6c2", "#bfe3f5", "#f472b6", "#7dd3fc"],
    description:
      "Children's video walkie talkie set in pink and blue with colour screens, USB charging cables and lanyards, boxed and ready for gift and toy counters.",
  },
  {
    id: "kids-instant-print-camera",
    name: "Kids Instant Print Digital Camera Kit",
    category: "Toys",
    subcategory: "Electronics",
    sku: "BT-T-013",
    image: img("kids-instant-print-camera"),
    imageAlt:
      "Pink and blue kids instant print cameras with USB cable, markers, manual and window display boxes",
    badge: "Popular",
    material: "ABS plastic",
    specs: [
      ["Includes", "USB cable, paper roll, coloured markers"],
      ["Packing", "50 units per carton"],
      ["Age", "6 years and above"],
    ],
    colors: ["#f5a8c4", "#8fc9f0", "#ffffff", "#4a90d9"],
    description:
      "Children's instant print digital camera kit with USB cable, six coloured markers and colour screen, shipped 50 units per carton in window display boxes.",
  },
  {
    id: "animal-fidget-spinner-bands",
    name: "Animal Character Fidget Spinner Wristbands",
    category: "Toys",
    subcategory: "Fidget Toys",
    sku: "BT-T-014",
    image: img("animal-fidget-spinner-bands"),
    imageAlt:
      "Colourful animal fidget spinners with long strap bands held over boxed items outdoors",
    material: "ABS plastic",
    specs: [
      ["Feature", "Flexible wrist strap band"],
      ["Packing", "Window box display"],
      ["Age", "3 years and above"],
    ],
    colors: ["#e53935", "#4fc3f7", "#fde74e", "#7cb342"],
    description:
      "Animal-character fidget spinner wristbands with flexible plastic strap and boxed window display, sold loose as low-cost impulse toys for stationery and gift counters.",
  },
  {
    id: "pony-slot-machine-keychains",
    name: "My Little Pony Mini Slot Machine Keychains",
    category: "Toys",
    subcategory: "Keychains",
    sku: "BT-T-015",
    image: img("pony-slot-machine-keychains"),
    imageAlt:
      "Four pastel mini slot machine toys with pony character reels and wrist straps held in a palm",
    material: "ABS plastic",
    specs: [
      ["Feature", "Three spinning character reels"],
      ["Includes", "Silicone wrist strap"],
      ["Packing", "Boxed per colour"],
    ],
    colors: ["#f5de5a", "#f3a9be", "#9fd3ee", "#c6a8dc"],
    description:
      "My Little Pony mini slot-machine keychains with three spinning character reels and silicone wrist straps, boxed per colour for party-bag and stationery sales.",
  },

  /* ----------------------------- Gifts ----------------------------- */
  {
    id: "squishy-panda-night-light",
    name: "Squishy Panda LED Night Light",
    category: "Gifts",
    subcategory: "Night Lights",
    sku: "BT-G-001",
    image: img("squishy-panda-night-light"),
    imageAlt: "Glowing white panda night light with a red and green scarf",
    badge: "Popular",
    material: "Squishy silicone",
    specs: [
      ["Lighting", "Warm-glow LED"],
      ["Colours", "Seven variants"],
      ["Power", "Button cell"],
    ],
    colors: ["#ffffff", "#f9a8d4", "#a78bfa", "#86efac"],
    description:
      "Squishy silicone panda LED night light with knitted scarf and warm glow, available in seven colour variants, a strong impulse buy for gift counters.",
  },
  {
    id: "led-novelty-glasses",
    name: "LED Light-Up Novelty Glasses",
    category: "Gifts",
    subcategory: "Accessories",
    sku: "BT-G-002",
    image: img("led-novelty-glasses"),
    imageAlt:
      "Wraparound glasses lit with glowing purple and blue LED strips, shown in four colours",
    material: "ABS plastic",
    specs: [
      ["Lighting", "RGB colour-changing LED strip"],
      ["Colours", "Four variants"],
      ["Use", "Parties, fairs, costume nights"],
    ],
    colors: ["#8b00ff", "#0000ff", "#ff0000", "#00c000"],
    description:
      "LED light-up novelty glasses with RGB colour-changing strip lighting along the frame, sold as four colour variants for parties, fairs and costume nights.",
  },
  {
    id: "soy-wax-scented-candle",
    name: "Hand-Poured Soy Wax Scented Candle",
    category: "Gifts",
    subcategory: "Home Decor",
    sku: "BT-G-003",
    image: img("soy-wax-scented-candle"),
    imageAlt:
      "Lit white candle in a glass jar labelled cedar and lavender, on a stone slab with dried lavender",
    material: "Soy wax, glass jar",
    specs: [
      ["Fill", "8 oz"],
      ["Wick", "Cotton"],
      ["Label", "Minimal kraft"],
    ],
    colors: ["#f5efe6", "#d9c7a7", "#e8dcc8"],
    description:
      "Hand-poured soy wax candle in a clear glass jar with cotton wick and minimal kraft label, 8 oz fill, ideal for gift sets and home fragrance racks.",
  },
  {
    id: "cartoon-camera-keychain",
    name: "Cartoon Camera Keychain With Gold Ring",
    category: "Gifts",
    subcategory: "Keychains",
    sku: "BT-G-004",
    image: img("cartoon-camera-keychain"),
    imageAlt:
      "Four pastel camera-shaped character keychains with gold keyrings held in a hand",
    material: "ABS plastic",
    specs: [
      ["Hardware", "Gold-tone split ring"],
      ["Designs", "Character motifs"],
      ["Price point", "Budget gift"],
    ],
    colors: ["#f5a8c4", "#5fc8f5", "#b39ddb", "#e8e44a"],
    description:
      "Moulded plastic camera-shaped keychains with gold-tone split rings in character designs, selling well at budget gift price points.",
  },
  {
    id: "plush-cat-crossbody-bag",
    name: "Plush Cat Crossbody Backpack Bag",
    category: "Gifts",
    subcategory: "Bags",
    sku: "BT-G-005",
    image: img("plush-cat-crossbody-bag"),
    imageAlt:
      "Cream plush cat bag with lace collar worn on a person's back in a street market",
    material: "Plush fabric",
    specs: [
      ["Style", "Crossbody with long tail"],
      ["Trim", "Lace collar and bow"],
      ["Colours", "Cream and tabby"],
    ],
    colors: ["#f7f1e4", "#c88b4a", "#4a90d9", "#e8b4c8"],
    description:
      "Plush cat crossbody backpack bag with lace collar, bow and long tail, sold in cream and tabby colourways as a novelty gift for teens.",
  },

  /* -------------------------- Essentials -------------------------- */
  {
    id: "davidoff-instant-coffee",
    name: "Davidoff Instant Coffee Jar 105g",
    category: "Essentials",
    subcategory: "Pantry",
    sku: "BT-E-001",
    image: img("davidoff-instant-coffee"),
    imageAlt:
      "Four Davidoff instant coffee jars labelled Crema Intense, Rich Aroma, Espresso Intense and Fine Aroma beside a cup of black coffee",
    material: "Instant coffee granules",
    specs: [
      ["Weight", "105 g"],
      ["Variants", "Crema, Rich Aroma, Espresso, Fine Aroma"],
      ["Packing", "Glass jar"],
    ],
    colors: ["#1a1a1a", "#c8963e", "#8b2e1f", "#1f4e3d"],
    description:
      "Davidoff branded 105 g instant coffee jars in Crema, Rich Aroma, Espresso and Fine Aroma variants, a high-impulse grocery item for hampers and gifting counters.",
  },
  {
    id: "dissolvable-paper-soap",
    name: "Dissolvable Paper Soap Sheets In Tubes",
    category: "Essentials",
    subcategory: "Personal Care",
    sku: "BT-E-002",
    image: img("dissolvable-paper-soap"),
    imageAlt:
      "Six clear tubes of coloured paper soap sheets with fruit labels including cherry, pear and strawberry",
    badge: "New",
    material: "Water-soluble paper",
    specs: [
      ["Format", "Compressed discs in tubes"],
      ["Flavours", "Cherry, pear, strawberry"],
      ["Use", "Travel and gifting"],
    ],
    colors: ["#f7c8d8", "#9fd8e8", "#f7e07a", "#a8d888"],
    description:
      "Water-dissolvable paper soap sheets compressed into discs and packed in screw-cap tubes, with fruit-themed labels in cherry, pear and strawberry flavours.",
  },
  {
    id: "wooden-desk-organiser",
    name: "Wooden Desktop Pen And Card Organiser",
    category: "Essentials",
    subcategory: "Office & Desk",
    sku: "BT-E-003",
    image: img("wooden-desk-organiser"),
    imageAlt:
      "Light oak desk organiser with pen cup, sticky notes and card compartments on a white desk",
    material: "Solid wood",
    specs: [
      ["Compartments", "Pen cup, sticky-note slot, card slots"],
      ["Finish", "Natural light oak"],
      ["Use", "Office and corporate gifting"],
    ],
    colors: ["#c79a63", "#ffffff", "#efe7d8"],
    description:
      "Solid wood desktop organiser with pen cup, sticky-note slot and card compartments for office desks, a practical gift for corporates and stationery buyers.",
  },

  /* -------------------------- Appliances -------------------------- */
  {
    id: "sokany-contact-grill-750w",
    name: "SOKANY SK-08168 Contact Grill Maker 750W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-001",
    image: img("sokany-contact-grill-750w"),
    imageAlt: "SOKANY 750W black contact grill maker with open cooking plates",
    material: "ABS housing, non-stick plates",
    specs: [
      ["Power", "750 W, mains powered"],
      ["Plates", "Double-sided non-stick"],
      ["Model", "SK-08168"],
    ],
    colors: ["#1a1a1a", "#b91c1c", "#ffffff", "#d4d4d4"],
    description:
      "SOKANY SK-08168 750 W double-sided contact grill with non-stick plates, supplied with a printed retail carton for kitchen and gifting sections.",
  },
  {
    id: "sokany-canister-vacuum-2000w",
    name: "SOKANY SK-13015 Canister Vacuum Cleaner 2000W",
    category: "Appliances",
    subcategory: "Home Appliances",
    sku: "BT-A-002",
    image: img("sokany-canister-vacuum-2000w"),
    imageAlt: "SOKANY red and black canister vacuum cleaner with wand and floor brush",
    material: "ABS plastic, stainless tube",
    specs: [
      ["Power", "2000 W, mains powered"],
      ["Dust bin", "1.5 L canister"],
      ["Model", "SK-13015"],
    ],
    colors: ["#b91c1c", "#111827", "#9ca3af", "#f5f5f5"],
    description:
      "SOKANY SK-13015 2000 W canister vacuum cleaner with 1.5 L dust container, adjustable metal tube and floor brush, serving general household appliance demand.",
  },
  {
    id: "cordless-coffee-bean-grinder",
    name: "Cordless Portable Coffee Bean Grinder",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-003",
    image: img("cordless-coffee-bean-grinder"),
    imageAlt:
      "Navy blue portable coffee grinder with transparent lid pressed by a hand, surrounded by coffee beans",
    material: "ABS plastic, steel burr",
    specs: [
      ["Operation", "One-touch button, cordless"],
      ["Lid", "Transparent viewing window"],
      ["Use", "Travel and office"],
    ],
    colors: ["#1f2a44", "#c0c6ce", "#b87333", "#ffffff"],
    description:
      "Cordless portable coffee bean grinder with clear lid and one-touch button, sized for travel and office use and shipped in a printed retail carton.",
  },
  {
    id: "portable-blender-juicer",
    name: "Rechargeable Portable Blender Juicer",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-004",
    image: img("portable-blender-juicer"),
    imageAlt:
      "Black cordless blender juicer filled with fruit, with a power button on the base",
    material: "Tritan cup, ABS base",
    specs: [
      ["Power", "Rechargeable, cordless"],
      ["Controls", "On/off base button"],
      ["Extras", "Carry loop"],
    ],
    colors: ["#1a1a1a", "#d9d9d9", "#7cb342", "#e53935"],
    description:
      "Rechargeable electric portable blender juicer with on/off power button, clear blending cup and carry loop, a cordless design suited to gym, office and travel retail.",
  },
  {
    id: "contact-grill-sandwich-maker",
    name: "Electric Contact Grill Sandwich Maker",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-005",
    image: img("contact-grill-sandwich-maker"),
    imageAlt:
      "Open black sandwich maker grilling two stuffed sandwiches on ribbed plates",
    material: "Metal, non-stick plates",
    specs: [
      ["Power", "Mains powered"],
      ["Plates", "Ribbed non-stick"],
      ["Indicator", "LED power light"],
    ],
    colors: ["#111111", "#2b2b2b", "#c0c0c0"],
    description:
      "Electric mains-powered contact grill and sandwich maker with hinged lid, ribbed non-stick plates and LED indicator, a compact countertop appliance for kitchenware retailers.",
  },
  {
    id: "sokany-waffle-maker-800w",
    name: "Sokany 800W Electric Waffle Maker",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-006",
    image: img("sokany-waffle-maker-800w"),
    imageAlt:
      "Sokany SK-08177 waffle maker open with two fruit-topped waffles and its printed retail box",
    material: "Metal, non-stick plates",
    specs: [
      ["Power", "800 W, mains powered"],
      ["Plates", "Double-sided non-stick"],
      ["Model", "SK-08177"],
    ],
    colors: ["#1a1a1a", "#c0c0c0", "#c1272d"],
    description:
      "Sokany SK-08177 electric waffle maker, 800 W mains-powered with double-sided heating plates, non-stick coating and LED lamp, supplied in a retail gift box.",
  },
  {
    id: "sokany-grill-maker-1000w",
    name: "Sokany 1000W Electric Grill Maker",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-007",
    image: img("sokany-grill-maker-1000w"),
    imageAlt:
      "Sokany SK-08001 grill maker open with triangular sandwich plates and two toasted sandwiches",
    material: "Aluminium, non-stick plates",
    specs: [
      ["Power", "1000 W, mains powered"],
      ["Plates", "Four triangular ribbed plates"],
      ["Model", "SK-08001"],
    ],
    colors: ["#1c1c1c", "#e8590c", "#f5efe6"],
    description:
      "Sokany SK-08001 1000 W mains-powered sandwich press with four triangular ribbed plates that cooks panini, burgers and toasted sandwiches.",
  },
  {
    id: "usb-ceramic-mug-warmer",
    name: "USB Ceramic Mug Warmer Set With Lid And Spoon",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-008",
    image: img("usb-ceramic-mug-warmer"),
    imageAlt:
      "Dark green ceramic mug with lid and gold spoon on a USB heating base beside its gift box",
    material: "Ceramic, ABS base",
    specs: [
      ["Power", "USB powered, 55 °C"],
      ["Set", "Mug, lid, spoon, heating base"],
      ["Packing", "Gift boxed"],
    ],
    colors: ["#0b3b2e", "#000000", "#ffffff", "#c9a227"],
    description:
      "Gift-boxed ceramic mug warmer set with 55 °C USB-powered heating base, lid and gold spoon, a ready-to-gift desk accessory for office and home use.",
  },
  {
    id: "lumabella-upright-vacuum-2000w",
    name: "LumaBella LB-63006 Upright Vacuum Cleaner 2000W",
    category: "Appliances",
    subcategory: "Home Appliances",
    sku: "BT-A-009",
    image: img("lumabella-upright-vacuum-2000w"),
    imageAlt: "Black upright vacuum cleaner with silver tube shown in a living room",
    material: "ABS plastic, stainless steel tube",
    specs: [
      ["Power", "2000 W, mains powered"],
      ["Tube", "Stainless steel"],
      ["Model", "LB-63006"],
    ],
    colors: ["#1c1c1c", "#c0c4c8", "#7a2e2e"],
    description:
      "LumaBella LB-63006 2000 W upright vacuum cleaner with stainless steel tube, flexible hose and floor head, a fast-moving household appliance line.",
  },
  {
    id: "sokany-round-waffle-750w",
    name: "Sokany SK-08039 Round Waffle Maker 750W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-010",
    image: img("sokany-round-waffle-750w"),
    imageAlt: "Black round waffle maker open with a cooked waffle and retail box",
    material: "Aluminium plate, ABS housing",
    specs: [
      ["Power", "750 W, mains powered"],
      ["Plate", "Round hinged non-stick"],
      ["Model", "SK-08039"],
    ],
    colors: ["#1f1f1f", "#d9d9d9", "#f5821f", "#ffffff"],
    description:
      "Sokany SK-08039 750 W round waffle maker with hinged non-stick plates and LED lamp, supplied in a retail gift box for kitchenware wholesale.",
  },
  {
    id: "sokany-rice-cooker-18l",
    name: "Sokany SK-07056 Electric Rice Cooker 1.8L",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-011",
    image: img("sokany-rice-cooker-18l"),
    imageAlt:
      "Stainless steel and black rice cooker with rice bowl and function icons",
    badge: "Popular",
    material: "Stainless steel body, ABS lid",
    specs: [
      ["Capacity", "1.8 L"],
      ["Power", "700 W, mains powered"],
      ["Modes", "Cook, stew, steam, keep warm"],
    ],
    colors: ["#c7c9cb", "#1a1a1a", "#d22630", "#f5f5f5"],
    description:
      "Sokany SK-07056 1.8 L 700 W electric rice cooker with cook, stew, steam and keep-warm modes, a dependable volume seller for modern kitchens.",
  },
  {
    id: "sokany-air-fryer-6l",
    name: "Sokany SK-10141 Digital Air Fryer 6L",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-012",
    image: img("sokany-air-fryer-6l"),
    imageAlt:
      "Black 6 litre digital air fryer filled with fried chicken beside feature icons",
    badge: "New",
    material: "PP housing, aluminium basket",
    specs: [
      ["Capacity", "6 L"],
      ["Controls", "LCD touch panel"],
      ["Model", "SK-10141"],
    ],
    colors: ["#17181a", "#c8102e", "#f5f5f5", "#f5821f"],
    description:
      "Sokany SK-10141 6 L digital air fryer with LCD touch control and oil-free hot air cooking, positioned as a premium gift-set kitchen appliance.",
  },
  {
    id: "sokany-salad-machine-200w",
    name: "Sokany SK-06059 Six-In-One Salad Machine 200W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-013",
    image: img("sokany-salad-machine-200w"),
    imageAlt:
      "Black electric salad machine ejecting shredded vegetables into a white bowl",
    material: "ABS, stainless steel blades",
    specs: [
      ["Power", "200 W, mains powered"],
      ["Functions", "Slice, shred, julienne, grate"],
      ["Model", "SK-06059"],
    ],
    colors: ["#141414", "#c9c9c9", "#f5f5f5", "#7b1113"],
    description:
      "Sokany SK-06059 200 W six-in-one salad machine covering slicing, shredding, julienne and grating, supplied with collection bowl and food pusher.",
  },
  {
    id: "dsp-vegetable-chopper-400w",
    name: "DSP KJ3053 Four-In-One Vegetable Chopper 400W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-014",
    image: img("dsp-vegetable-chopper-400w"),
    imageAlt: "White DSP vegetable chopper set with jars of diced fruit and cut vegetables",
    material: "Tritan bowl, stainless steel blades",
    specs: [
      ["Power", "400 W, mains powered"],
      ["Bowls", "1200 ml, 600 ml and 300 ml"],
      ["Model", "KJ3053"],
    ],
    colors: ["#f2f2f2", "#8a9a1f", "#1a1a1a", "#c9c9c9"],
    description:
      "DSP KJ3053 400 W four-in-one vegetable cutter with 1200 ml bowl plus 600 ml and 300 ml choppers, supplied with interchangeable blades for daily prep.",
  },
  {
    id: "sokany-waffle-grill-1500w",
    name: "Sokany SK-08145 Waffle And Grill Maker 1500W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-015",
    image: img("sokany-waffle-grill-1500w"),
    imageAlt:
      "Black waffle and grill maker open with steak, waffles and vegetables cooking on plates",
    material: "Cast aluminium plates, ABS",
    specs: [
      ["Power", "1500 W, mains powered"],
      ["Plates", "Reversible non-stick"],
      ["Hinge", "180 degree, folds upright"],
    ],
    colors: ["#1a1a1a", "#c8c8c8", "#c8102e", "#f5821f"],
    description:
      "Sokany SK-08145 1500 W two-in-one waffle maker and grill maker with reversible non-stick plates and 180-degree hinge for upright storage.",
  },
  {
    id: "digital-kettle-wooden-handle",
    name: "Digital Electric Kettle With Wooden Handle",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-016",
    image: img("digital-kettle-cream"),
    gallery: [img("digital-kettle-black")],
    imageAlt:
      "Cream and black electric kettle pouring hot water into a cup, with a wood-effect handle",
    material: "Stainless steel, ABS",
    specs: [
      ["Control", "Digital temperature display"],
      ["Spout", "Push-button pour"],
      ["Handle", "Wood-effect"],
    ],
    colors: ["#ede4d8", "#1b1b1b", "#c0855c", "#8b5e3c"],
    description:
      "Electric kettle with digital temperature display, push-button pouring spout and wood-effect handle, offered in champagne and matte black for gift-set and modern kitchen retail.",
  },
  {
    id: "dsp-food-chopper-4l",
    name: "DSP KM4115 Stainless Steel Food Chopper 4L 600W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-017",
    image: img("dsp-food-chopper-4l"),
    imageAlt:
      "Stainless steel DSP food chopper with steel jug, blades and scraper on white background",
    material: "Stainless steel jug, steel blade",
    specs: [
      ["Power", "600 W, mains powered"],
      ["Capacity", "4.0 L"],
      ["Menus", "Nine presets, LED display"],
    ],
    colors: ["#c6c8ca", "#1a1a1a", "#0e7a3c", "#f5f5f5"],
    description:
      "DSP KM4115 600 W 4.0 L stainless steel food chopper with safety switch, nine preset menus, LED display, steel blade and cleaning scraper.",
  },
  {
    id: "insulated-food-container",
    name: "Insulated Handled Food And Water Container",
    category: "Appliances",
    subcategory: "Kitchenware",
    sku: "BT-A-018",
    image: img("insulated-food-container"),
    imageAlt:
      "Two pastel lilac and mint handled insulated containers held in hands",
    material: "Stainless steel inner, PP outer",
    specs: [
      ["Lid", "Ball-knob with pouring spout"],
      ["Handle", "Carry handle"],
      ["Colours", "Lilac and mint"],
    ],
    colors: ["#c9a9dc", "#bff0f0", "#f5c518", "#ffffff"],
    description:
      "Pastel insulated food and water containers with carry handles, ball-knob lids and pouring spouts, offered in lilac and mint colourways.",
  },
  {
    id: "lumabella-frying-pan-1500w",
    name: "LumaBella LB-57017 Electric Frying Pan 1500W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-019",
    image: img("lumabella-frying-pan-1500w"),
    imageAlt: "Black square electric frying pan with glass lid and boxed packaging",
    material: "Cast aluminium pan, glass lid",
    specs: [
      ["Power", "1500 W, mains powered"],
      ["Capacity", "6 L"],
      ["Model", "LB-57017"],
    ],
    colors: ["#1a1a1a", "#c4c6c8", "#f5f5f5", "#f5821f"],
    description:
      "LumaBella LB-57017 1500 W 6-litre electric frying pan with deep non-stick square body and glass lid, a strong gifting and utility line.",
  },
  {
    id: "raf-induction-cooker-3500w",
    name: "RAF R.8102 Induction Cooker 3500W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-020",
    image: img("raf-induction-cooker-3500w-a"),
    gallery: [img("raf-induction-cooker-3500w-b")],
    imageAlt:
      "Silver and black 3500W induction cooker with packaging box and cookware options",
    badge: "Popular",
    material: "Tempered glass top, ABS",
    specs: [
      ["Power", "3500 W"],
      ["Burners", "Single"],
      ["Controls", "Digital LED display"],
    ],
    colors: ["#c8cacd", "#1a1a1a", "#f5821f", "#c8102e"],
    description:
      "RAF R.8102 3500 W single-burner induction cooker with digital LED display and curved surface, boxed and ready for kitchen appliance dealers.",
  },
  {
    id: "lumabella-sandwich-set-1000w",
    name: "LumaBella LB-58067 3-In-1 Sandwich Maker Set 1000W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-021",
    image: img("lumabella-sandwich-set-1000w"),
    imageAlt:
      "Cream and black sandwich maker set shown with sandwich, grill and waffle plates",
    material: "Aluminium plates, ABS",
    specs: [
      ["Power", "1000 W, mains powered"],
      ["Plates", "Interchangeable sandwich, grill, waffle"],
      ["Model", "LB-58067"],
    ],
    colors: ["#e8e4dc", "#1a1a1a", "#f5821f", "#c8102e"],
    description:
      "LumaBella LB-58067 1000 W three-in-one sandwich maker set with interchangeable sandwich, grill and waffle plates, ideal for gift bundling.",
  },
  {
    id: "sokany-fold-flat-grill-2100w",
    name: "Sokany SK-08050 Fold-Flat Electric Grill Maker 2100W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-022",
    image: img("sokany-fold-flat-grill-2100w"),
    imageAlt:
      "Open electric grill maker cooking steak, sausages and vegetables on ribbed plates",
    material: "Cast aluminium ribbed plates",
    specs: [
      ["Power", "2100 W, mains powered"],
      ["Plates", "180 degree fold-flat ribbed"],
      ["Model", "SK-08050"],
    ],
    colors: ["#c8cacd", "#1a1a1a", "#f5821f", "#e2231a"],
    description:
      "Sokany SK-08050 2100 W electric grill maker with large 180-degree fold-flat ribbed plates, retail boxed and easy for dealers to display.",
  },
  {
    id: "sonifer-clothes-dryer-1000w",
    name: "Sonifer SF-6538 Foldable Electric Clothes Dryer 1000W",
    category: "Appliances",
    subcategory: "Home Appliances",
    sku: "BT-A-023",
    image: img("sonifer-clothes-dryer-1000w"),
    imageAlt:
      "Blue foldable clothes drying rack with cover and hanging laundry",
    badge: "New",
    material: "Steel frame, polyester cover",
    specs: [
      ["Power", "1000 W"],
      ["Capacity", "15 kg hanging"],
      ["Model", "SF-6538"],
    ],
    colors: ["#1b2e63", "#f5f5f5", "#b9bcc0", "#1a1a1a"],
    description:
      "Sonifer SF-6538 1000 W foldable clothes dryer with 15 kg hanging capacity and cover, a practical monsoon-season and small-appliance wholesale item.",
  },
  {
    id: "cordless-stick-vacuum-15000pa",
    name: "Cordless Stick Vacuum Cleaner 15000Pa 4-In-1 Kit",
    category: "Appliances",
    subcategory: "Home Appliances",
    sku: "BT-A-024",
    image: img("cordless-stick-vacuum-15000pa"),
    imageAlt:
      "Grey and purple cordless stick vacuum with floor head and charging dock",
    material: "ABS plastic, aluminium tube",
    specs: [
      ["Suction", "15000 Pa"],
      ["Battery", "1800 mAh"],
      ["Kit", "Four-in-one accessories"],
    ],
    colors: ["#9aa0a6", "#7b1fa2", "#1a1a1a", "#f5f5f5"],
    description:
      "Cordless stick vacuum cleaner, 15000 Pa suction with 1800 mAh battery and a four-in-one accessory kit for modern home appliance retail.",
  },
  {
    id: "dsp-round-waffle-1000w",
    name: "DSP KC1359 Round Waffle Maker 1000W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-025",
    image: img("dsp-round-waffle-1000w"),
    imageAlt: "Black round waffle maker open with cooked waffles and retail box",
    material: "Aluminium plate, ABS",
    specs: [
      ["Power", "1000 W, mains powered"],
      ["Plate", "20 cm round non-stick"],
      ["Warranty", "One year"],
    ],
    colors: ["#1a1a1a", "#f5a623", "#c9a227", "#f5f5f5"],
    description:
      "DSP KC1359 1000 W round waffle maker with 20 cm non-stick aluminium plate, temperature control, dual indicators and one-year warranty packaging.",
  },
  {
    id: "dsp-citrus-juicer-07l",
    name: "DSP KJ1082 Citrus Juicer 0.7L 40W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-026",
    image: img("dsp-citrus-juicer-07l"),
    imageAlt:
      "Black and silver citrus juicer with orange juice and two reamer attachments",
    material: "Tritan jug, steel filter",
    specs: [
      ["Power", "40 W, mains powered"],
      ["Capacity", "0.7 L"],
      ["Includes", "Two interchangeable reamers"],
    ],
    colors: ["#1a1a1a", "#c8cacd", "#f5821f", "#f5f5f5"],
    description:
      "DSP KJ1082 40 W 0.7-litre citrus juicer with two interchangeable reamers, supplied boxed for breakfast and juicer assortments.",
  },
  {
    id: "dsp-heart-waffle-1000w",
    name: "DSP KC1368 Heart-Shaped Waffle Maker 1000W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-027",
    image: img("dsp-heart-waffle-1000w"),
    imageAlt:
      "Black heart-shaped waffle maker open with a heart waffle topped with ice cream",
    material: "Aluminium plate, ABS",
    specs: [
      ["Power", "1000 W, mains powered"],
      ["Plate", "19 cm heart-shaped non-stick"],
      ["Model", "KC1368"],
    ],
    colors: ["#1a1a1a", "#1f6fb5", "#f5a623", "#c9a227"],
    description:
      "DSP KC1368 1000 W heart-shaped waffle maker with 19 cm non-stick aluminium plate and temperature control, a novelty gift item for festive gifting.",
  },
  {
    id: "sokany-clamshell-grill-800w",
    name: "Sokany SK-08176 Clamshell Grill Maker 800W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-028",
    image: img("sokany-clamshell-grill-800w"),
    imageAlt:
      "Black and silver clamshell grill maker open with grilled steak and vegetables",
    material: "Aluminium plates, stainless body",
    specs: [
      ["Power", "800 W, mains powered"],
      ["Plates", "Double-sided non-stick"],
      ["Model", "SK-08176"],
    ],
    colors: ["#1a1a1a", "#c8cacd", "#c8102e", "#f5f5f5"],
    description:
      "Sokany SK-08176 800 W clamshell grill maker with double-sided non-stick plates and indicator lights, a compact countertop grill for retail.",
  },
  {
    id: "sokany-hand-blender-1200w",
    name: "Sokany SK-02044 4-In-1 Hand Blender 1200W",
    category: "Appliances",
    subcategory: "Kitchen Appliances",
    sku: "BT-A-029",
    image: img("sokany-hand-blender-1200w"),
    imageAlt:
      "Stainless steel hand blender with whisk, chopper bowl and pink smoothie",
    material: "Stainless steel shaft, glass bowl",
    specs: [
      ["Power", "1200 W, mains powered"],
      ["Attachments", "Blender, whisk, chopper bowl"],
      ["Model", "SK-02044"],
    ],
    colors: ["#c6c8ca", "#1a1a1a", "#1f6fb5", "#f5f5f5"],
    description:
      "Sokany SK-02044 1200 W four-in-one hand blender with stainless steel shaft, whisk and chopper bowl attachments, with a copper motor for blending and whisking.",
  },
];

if (missing.size) {
  // Fails the dev build loudly rather than shipping a broken <img src="">.
  throw new Error(
    `Catalogue references ${missing.size} image(s) with no matching file in src/assets/products: ${[...missing].join(", ")}. Run \`npm run images\` to regenerate.`,
  );
}

/** Category list, derived from the data so filters can never drift. */
export const categories: Category[] = [
  ...new Set(products.map((p) => p.category)),
];

/** Subcategory collections for the currently selected category. */
export function subcategoriesFor(category: string): string[] {
  return [
    ...new Set(
      products
        .filter((p) => category === "All" || p.category === category)
        .map((p) => p.subcategory),
    ),
  ].sort();
}

/**
 * Image pool for a product detail gallery: its own shots first, then
 * matching siblings, so every page has four real photographs instead of
 * generic placeholders.
 */
export function galleryFor(product: Product): string[] {
  const own = [product.image, ...(product.gallery ?? [])].filter(Boolean);
  const siblings = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .map((p) => p.image);
  return [...new Set([...own, ...siblings])].slice(0, 4);
}
