/**
 * One-off generator: rewrites the product array in src/products.ts from the
 * table below. Every image in src/assets/products is exactly one product with
 * exactly one image. Rows: [fileIndex, name, subcategory, description, opts].
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const files = readdirSync("src/assets/products").filter((f) => f.endsWith(".webp")).sort().map((f) => f.replace(/\.webp$/, ""));

const B = [
[0,"Mini Vacuum Flask Bottles 300ml","Steel Bottles","Compact bullet-shaped steel bottles with screw-on caps in soft matte colours, an easy low-price gift item for drinkware counters.",{badge:"Popular",material:"Stainless steel",colors:["#F2E7B8","#17B8B0","#7E9C86","#E85A12"],specs:[["Capacity","300 ml"]]}],
[1,"Printed Vintage Floral Mini Steel Bottles","Steel Bottles","Mini steel bottles wrapped in vintage floral, butterfly and bird decals with polished steel caps.",{material:"Stainless steel",colors:["#3E8E7E","#D9C7A8","#C6506B","#5B8FC9"]}],
[2,"3 Piece Gradient Sports Bottle Set","Sports Bottles","Blue-to-orange gradient bottle set in three sizes with a handled large bottle, a time-marked bottle and a slim bottle.",{id:"gradient-sports-bottle-3pc",badge:"Popular",material:"Food-grade plastic",colors:["#39BCE8","#F07A1E","#C9CFD6"],specs:[["Set","3 pieces"]]}],
[3,"Time Marker Gradient Sports Bottle 900ml","Sports Bottles","Gradient sports bottles with printed hourly water targets, straw lid and carry strap.",{material:"Food-grade plastic",colors:["#39BCE8","#8D5FD3","#F07A1E"],specs:[["Capacity","900 ml"]]}],
[4,"Orange-Teal Gradient Time Marker Bottle","Sports Bottles","Tall gradient bottles with a millilitre and time scale and a flip-top spout lid.",{badge:"Popular",material:"Food-grade plastic",colors:["#F58A3A","#8D5FD3","#17B8B0"]}],
[5,"900ml Steel Handle Tumbler","Tumblers","Large steel tumblers with a fold-over carry handle in pastel and solid colours.",{id:"steel-handle-tumbler-900ml",material:"Stainless steel",colors:["#F5F5F5","#1a1a1a","#F2A6C8","#B7A3D9"],specs:[["Capacity","900 ml"]]}],
[6,"Animal Character Water Bottles","Kids Bottles","Pastel kids bottles topped with bear, dog, rabbit, fox, koala, elephant, deer and panda lids.",{id:"animal-character-bottle",badge:"New",colors:["#9ED8C0","#F2B5A0","#F6E27A","#C7B3E6"]}],
[7,"Handled Insulated Tumbler Mugs","Tumblers","Large insulated tumbler mugs with handle and lid in bold solid colours.",{material:"Stainless steel",colors:["#1a1a1a","#E58AB0","#7A1F2B","#F5F5F5"]}],
[8,"Collapsible Silicone Water Bottle","Travel Bottles","Foldable silicone bottle that collapses small enough for a bag pocket, with a spout lid and carry loop.",{material:"Silicone",colors:["#8CCBEA"]}],
[9,"Vacuum Steel Bottles with Gift Box","Steel Bottles","Slim vacuum steel bottles in white, black, navy and red, each in its own retail box.",{material:"Stainless steel",colors:["#F5F5F5","#1a1a1a","#1F3A6B","#C8102E"]}],
[10,"Flip-Straw Insulated Bottles","Straw Bottles","Insulated bottles with a flip-up straw lid in jewel colours, a popular one-hand sipping format.",{badge:"Popular",material:"Stainless steel",colors:["#8A4B8F","#B6D86A","#F2C23A","#2AA6A0"]}],
[11,"Hot and Cold Vacuum Bottle","Steel Bottles","Double-wall vacuum bottles in gold, black, blue, silver and berry that keep drinks hot or cold.",{id:"hot-cold-vacuum-bottle",material:"Stainless steel",colors:["#C9A227","#1a1a1a","#1F3A9B","#C0C0C0"]}],
[12,"NICE 400ml Sip Tumblers","Tumblers","Boxed pastel sip tumblers sold in colour-mixed display cartons.",{id:"matte-insulated-handle-bottle",material:"Stainless steel",colors:["#F2A6B0","#F3E5C8","#B6BDC4"],specs:[["Capacity","400 ml"]]}],
[13,"Handled Travel Tumbler with Lid","Tumblers","Large pale blue travel tumbler with carry handle and lid for car cup holders and desks.",{colors:["#A8C4E0"]}],
[14,"Kids Cartoon Pocket Bottles","Kids Bottles","Small flip-lid bottles with cartoon characters, sized for lunchboxes.",{colors:["#9ED8C0","#8CCBEA","#C9CFD6","#F2A6B0"]}],
[15,"Space Print Kids Water Bottles 900ml","Kids Bottles","Clear kids bottles with astronaut and space prints, straw lids and carry straps.",{badge:"New",material:"Food-grade plastic",colors:["#8FD3A8","#7CC4EA","#F2A6B0","#B7A3D9"],specs:[["Capacity","900 ml"]]}],
[16,"40oz Straw Tumbler with Handle","Tumblers","Forty-ounce straw tumblers with handle in on-trend colours.",{badge:"Popular",material:"Stainless steel",colors:["#B7A3D9","#F3E5C8","#7FB88A","#4FB3D9"]}],
[17,"Single Wall Stainless Steel Bottle","Steel Bottles","Plain brushed steel bottles with screw cap and wrist loop, suited to printing or branding.",{id:"brushed-steel-bottle",material:"Stainless steel",colors:["#C0C0C0"]}],
[18,"Thermosip Push-Button Travel Mug 300ml","Tumblers","Compact black travel mug with push-button lid.",{id:"thermosip-travel-mug",material:"Stainless steel",colors:["#1a1a1a"],specs:[["Capacity","300 ml"]]}],
[19,"Vacuum Flask Gift Set with 3 Cups","Gift Sets","Vacuum flask with three steel cups in a branded gift box with carry bag.",{badge:"Popular",material:"Stainless steel",colors:["#2F7D5B","#1a1a1a"]}],
[20,"Kids Vacuum Straw Bottle with Strap","Kids Bottles","Kids straw bottles with cartoon characters and shoulder strap, shown with retail packaging.",{colors:["#E85A5A","#4FB3D9","#7FB88A"]}],
[21,"NICE Insulated Bottles Retail Carton","Steel Bottles","Pastel insulated bottles supplied in NICE brand cartons.",{material:"Stainless steel",colors:["#F2A6B0","#F3E5C8","#9ED8C0"]}],
[22,"1200ml Tumbler with Handle and Straw","Tumblers","1200 ml tumblers with handle, lid and straw in five colours, 24 pieces per carton.",{material:"Stainless steel",colors:["#1a1a1a","#7A1F2B","#1F6FB5","#7FB88A","#F3E5C8"],specs:[["Capacity","1200 ml"],["Packing","24 pcs per carton"]]}],
[23,"750ml Sports Insulated Bottle","Steel Bottles","750 ml sports bottles in white, black, navy and red, 100 pieces per carton.",{material:"Stainless steel",colors:["#F5F5F5","#1a1a1a","#1F3A9B","#C8102E"],specs:[["Capacity","750 ml"],["Packing","100 pcs per carton"]]}],
[24,"Kids Straw Bottles with Handle","Kids Bottles","Kids straw bottles with loop handle and straw lid in soft colours.",{colors:["#B7A3D9","#B6D86A","#F2A6B0","#1a1a1a"]}],
];

const G = [
[25,"LED Tea Lights Assorted Colours 24 pcs","Candles and Lights","Flameless LED tea lights in a 24-piece box of assorted colours.",{colors:["#E85A12","#7FB88A","#C8102E","#F5F5F5"],specs:[["Pack","24 pieces"]]}],
[50,"Colour-Changing LED Tea Lights 24 pcs","Candles and Lights","Tea lights that cycle through colours, 24 to a box.",{specs:[["Pack","24 pieces"]]}],
[29,"Heart Shaped LED Candle Set","Candles and Lights","Warm white flameless LED candles shown in a heart arrangement.",{}],
[41,"Diya Style Flameless LED Candles","Candles and Lights","Battery-operated flameless diya-style candles with a warm glow, a festive favourite.",{id:"diya-led-candles",badge:"Popular"}],
[62,"Scented Soy Candle Jar","Candles and Lights","Glass-jar scented candle with wooden wick and cedar and lavender fragrance.",{}],
[26,"Panda Night Light Colour Changing","Lamps","Soft silicone panda lamp that changes colour with a tap.",{id:"squishy-panda-night-light",badge:"Popular",material:"Silicone",colors:["#F2A6B0","#8CCBEA","#F2C23A"]}],
[30,"Scarf Panda Silicone Night Light","Lamps","Seated silicone panda lamp in a striped scarf with a soft warm glow.",{material:"Silicone"}],
[33,"Sleeping Panda Silicone Lamp","Lamps","Lying silicone panda lamp with a diffused glow.",{material:"Silicone"}],
[56,"Touch Control Panda Lamp","Lamps","Tap-control panda lamp with multiple colour modes.",{material:"Silicone"}],
[63,"Panda Lamp Multi Pose Set","Lamps","Panda night lamp range shown in several poses.",{material:"Silicone"}],
[98,"Panda Night Light Gift Box","Lamps","Panda night light supplied in a decorated retail gift box.",{material:"Silicone"}],
[53,"Lighthouse Lamp Kit with Remote","Lamps","Lighthouse-shaped LED lamp with remote control and accessories in a gift box.",{}],
[51,"Rechargeable LED Lantern Lamp","Lamps","Portable rechargeable LED lantern lamp with USB charging cable.",{}],
[93,"Crystal Texture LED Table Lamp","Lamps","Textured crystal-effect table lamp with a warm golden glow.",{}],
[94,"Acrylic Pillar Lamps with Gold Base","Lamps","Acrylic pillar table lamps with gold bases and decorative interiors.",{}],
[96,"3D Crystal Ball Night Lights","Lamps","Engraved 3D crystal ball night lights in twelve models, 60 pieces per carton.",{specs:[["Models","12"],["Packing","60 pcs per carton"]]}],
[95,"LED Wireless Charging Speaker","Gadgets","Colourful LED Bluetooth speaker with a wireless charging pad, model BT-2301.",{badge:"New",specs:[["Model","BT-2301"]]}],
[45,"Fascial Massage Gun with Heads","Wellness","Rechargeable fascial massage gun with interchangeable heads.",{colors:["#1a1a1a"]}],
[52,"Mini Fascial Massage Gun White","Wellness","White mini fascial massage gun with interchangeable heads.",{colors:["#F5F5F5"]}],
[57,"Pastel Rainbow Plush Earmuffs","Fashion Gifts","Plush winter earmuffs with soft arms in pastel rainbow colours.",{badge:"New"}],
[47,"DIY Instant Digital Camera for Kids","Kids Gifts","Kids digital camera with DIY stickers in several colours.",{colors:["#F2A6B0","#8CCBEA","#B7A3D9"]}],
[99,"Kids Digital Camera Pink Blue Teal","Kids Gifts","Kids digital cameras with colour screen in pastel colours.",{colors:["#F2A6B0","#8CCBEA","#9ED8C0"]}],
[97,"Inflatable Flocked Sofa Chair with Ottoman","Home and Living","Inflatable flocked lounge chair and ottoman supplied with an air pump.",{}],
[100,"Wooden Desk Organiser","Home and Living","Wooden desk organiser with compartments for pens and notes.",{material:"Wood"}],
[28,"Black Vacuum Bottle in Gift Box","Drinkware Gifts","Black vacuum bottle packed in a retail gift box.",{material:"Stainless steel"}],
[31,"Kettle and Flask Gift Set with Cups","Gift Sets","Steel electric kettle, flask and two cups tied with a red ribbon.",{material:"Stainless steel"}],
[36,"Kettle Flask and Mug Gift Set","Gift Sets","Steel kettle, vacuum flask and four cups gift set.",{material:"Stainless steel"}],
[60,"Flask and Mug Gift Box Sets","Gift Sets","Colour-coded gift boxes each holding a vacuum flask and two mugs.",{colors:["#1F3A9B","#F5F5F5","#6B6F76","#C8102E"]}],
[38,"Ceramic Mug Warmer Gift Set","Gift Sets","Ceramic mug with USB mug warmer in a gift box, with touch control.",{badge:"New"}],
[48,"Personalised Name Flip-Straw Bottles","Drinkware Gifts","Flip-straw insulated bottles with custom printed names.",{badge:"Popular"}],
[65,"Personalised Engraved Handle Tumblers","Drinkware Gifts","Handle tumblers that can be engraved with names or logos.",{badge:"Popular"}],
[64,"Pastel Handle Tumblers Plain Range","Drinkware Gifts","Plain pastel handle tumblers in six colours, ready for personalisation.",{}],
[40,"Davidoff Instant Coffee Jars","Food and Beverage Gifts","Davidoff instant coffee in glass jars, a premium gifting favourite.",{}],
[77,"Push to Dispense Thermal Kettle","Drinkware Gifts","Thermal insulated kettle with a push-to-dispense lid.",{colors:["#F3E5C8"]}],
[81,"Vintage Thermal Vacuum Pots","Drinkware Gifts","Vintage styled thermal vacuum pots with wooden handles.",{colors:["#1a1a1a","#C9A227"]}],
[79,"Insulated Lunch Container with Handle","Lunchware","Pastel insulated lunch containers with carry handles.",{colors:["#F2A6B0","#8CCBEA"]}],
[32,"Compact Coffee Bean Grinder","Home and Kitchen","Compact electric grinder for coffee beans, seeds and spices.",{colors:["#1F3A6B"]}],
[39,"Coffee Grinder with Bean Jars","Home and Kitchen","Compact blue coffee grinder styled with glass jars of beans.",{colors:["#1F3A6B"]}],
[58,"Stainless Steel Electric Kettle","Home and Kitchen","Stainless steel electric kettle with black handle.",{material:"Stainless steel"}],
[42,"Portable Rechargeable Juicer Blender","Home and Kitchen","USB rechargeable portable blender for fresh juice.",{badge:"Popular"}],
[43,"Portable Juicer Blender Fruit Splash","Home and Kitchen","Black portable juicer blender shown with splashing fruit.",{}],
[89,"DSP KJ1002 Citrus Juicer 0.7L","Home and Kitchen","40 W citrus juicer with a 0.7 litre jug.",{specs:[["Model","DSP KJ1002"],["Power","40 W"],["Capacity","0.7 L"]]}],
[75,"DSP KJ3053 4-in-1 Blender 400W","Home and Kitchen","400 W four-in-one blender with a 1200 ml jug.",{specs:[["Model","DSP KJ3053"],["Power","400 W"]]}],
[78,"DSP KM4115 Food Chopper 4.0L","Home and Kitchen","600 W 4.0 litre electric food chopper.",{specs:[["Model","DSP KM4115"],["Power","600 W"],["Capacity","4.0 L"]]}],
[92,"Sokany SK-02044 Hand Blender 1200W","Home and Kitchen","1200 W four-in-one hand blender set.",{specs:[["Model","SK-02044"],["Power","1200 W"]]}],
[74,"Sokany SK-06059 Salad Machine 6-in-1","Home and Kitchen","Six-in-one electric salad machine.",{specs:[["Model","SK-06059"]]}],
[72,"Sokany SK-07056 Rice Cooker 1.8L","Home and Kitchen","1.8 litre Sokany rice cooker.",{specs:[["Model","SK-07056"],["Capacity","1.8 L"]]}],
[73,"Sokany SK-10141 Air Fryer 6L","Home and Kitchen","6 litre air fryer with digital display.",{specs:[["Model","SK-10141"],["Capacity","6 L"]]}],
[80,"LumaBella LB-57017 Electric Frying Pan","Home and Kitchen","1500 W 6.0 litre electric frying pan.",{specs:[["Model","LB-57017"],["Power","1500 W"],["Capacity","6.0 L"]]}],
[82,"RAF R.8102 Induction Cooker 3500W (A)","Home and Kitchen","3500 W induction cooker.",{specs:[["Model","R.8102"],["Power","3500 W"]]}],
[83,"RAF R.8102 Induction Cooker 3500W (B)","Home and Kitchen","3500 W induction cooker with curved cooking surface.",{specs:[["Model","R.8102"],["Power","3500 W"]]}],
[37,"Sokany SK-08001 Grill Maker 1000W","Home and Kitchen","1000 W sandwich grill maker.",{specs:[["Model","SK-08001"],["Power","1000 W"]]}],
[44,"Sokany Grill Maker with Grill Plates","Home and Kitchen","Sokany contact grill with removable plates.",{}],
[55,"Orbit Sandwich Toaster 800W","Home and Kitchen","800 W non-stick sandwich toaster.",{specs:[["Power","800 W"]]}],
[61,"Panini Grill Sandwich Maker","Home and Kitchen","Contact grill sandwich maker.",{}],
[84,"LumaBella LB-58067 Sandwich Maker Set 1000W","Home and Kitchen","1000 W multi-function sandwich maker with swappable plates.",{specs:[["Model","LB-58067"],["Power","1000 W"]]}],
[85,"Sokany Electric Grill Maker","Home and Kitchen","Sokany electric grill with open flat plates.",{}],
[91,"Sokany SK-08176 Grill Maker 800W","Home and Kitchen","800 W grill maker.",{specs:[["Model","SK-08176"],["Power","800 W"]]}],
[76,"Sokany SK-08145 Waffle and Grill Maker 1500W","Home and Kitchen","1500 W 2-in-1 waffle and grill maker.",{specs:[["Model","SK-08145"],["Power","1500 W"]]}],
[71,"Sokany SK-08039 Waffle Maker","Home and Kitchen","Sokany round waffle maker.",{specs:[["Model","SK-08039"]]}],
[101,"Sokany SK-08177 Waffle Maker","Home and Kitchen","Sokany waffle maker with deep plates.",{specs:[["Model","SK-08177"]]}],
[88,"DSP Waffle Maker 1000W","Home and Kitchen","1000 W non-stick DSP waffle maker.",{specs:[["Power","1000 W"]]}],
[90,"DSP Heart Shaped Waffle Maker 1000W","Home and Kitchen","1000 W heart-shaped waffle maker.",{specs:[["Power","1000 W"]]}],
[54,"Sokany SK-T3015 Vacuum Cleaner 2000W","Home and Kitchen","2000 W canister vacuum cleaner.",{specs:[["Model","SK-T3015"],["Power","2000 W"]]}],
[70,"LumaBella LB-63006 Vacuum Cleaner 2000W","Home and Kitchen","2000 W canister vacuum cleaner.",{specs:[["Model","LB-63006"],["Power","2000 W"]]}],
[87,"Wireless Handheld Vacuum Gift Pack","Home and Kitchen","Cordless stick vacuum with accessories.",{}],
[86,"Foldable Electric Clothes Dryer","Home and Kitchen","Foldable electric clothes dryer with cover.",{}],
[27,"3 Piece Gradient Bottle Set Gift Pack","Drinkware Gifts","Three-piece gradient sports bottle set packed as a gift.",{colors:["#39BCE8","#F07A1E","#C9CFD6"]}],
[34,"Gradient Time Marker Bottle Gift Edition","Drinkware Gifts","Gradient time marker bottles with straw lid, a gifting favourite.",{colors:["#39BCE8","#8D5FD3","#F07A1E"]}],
[35,"900ml Steel Handle Tumbler Gift Edition","Drinkware Gifts","Large steel handle tumblers in assorted colours for gifting.",{material:"Stainless steel"}],
[46,"Flip-Straw Insulated Bottles Teal Range","Drinkware Gifts","Flip-straw insulated bottles in teal, yellow, green and purple.",{material:"Stainless steel"}],
[49,"Pale Blue Travel Tumbler Gift Edition","Drinkware Gifts","Pale blue travel tumbler with handle and lid.",{colors:["#A8C4E0"]}],
[59,"Pale Blue Handled Tumbler Outdoor","Drinkware Gifts","Pale blue handled tumbler shown in an outdoor setting.",{colors:["#A8C4E0"]}],
[66,"40oz Straw Tumblers Colour Range","Drinkware Gifts","Straw tumblers with handles in pink, cream, green, blue and black.",{}],
[67,"40oz Straw Tumbler Black Edition","Drinkware Gifts","Black straw tumbler with handle beside coloured options.",{}],
[68,"Thermosip Travel Mug Gift Edition","Drinkware Gifts","Compact black push-button travel mug.",{colors:["#1a1a1a"]}],
[69,"Green Vacuum Flask Set with Cups","Gift Sets","Green vacuum flask with three cups in a black gift box and bag.",{colors:["#2F7D5B"]}],
];

const T = [
[102,"4 Model Pop-It Fidget Set","Fidget Toys","Rainbow silicone pop-it fidget toys in four shapes.",{id:"pop-it-fidget-4-model",badge:"Popular",colors:["#E85A5A","#F2C23A","#4FB3D9","#8D5FD3"]}],
[103,"Power Smash Badminton Racket Set","Sports","Badminton racket set with carry bag and shuttlecocks.",{}],
[104,"Cartoon Camera Keychains","Keychains","Cartoon camera keychains in bright colours.",{id:"cartoon-camera-keychain"}],
[105,"Plush Cat Crossbody Bag","Plush","Cat-shaped plush crossbody bag.",{}],
[106,"LED Light-Up Futuristic Glasses","Novelty","LED novelty glasses glowing in many colours.",{badge:"New"}],
[107,"Alphabet Print Football","Sports","Footballs printed with letters in bright colours.",{id:"alphabet-print-football"}],
[108,"SEIEDT Football","Sports","SEIEDT branded black and white footballs.",{}],
[109,"Two-Tone Graphic Football","Sports","Two-tone footballs in bold colours.",{}],
[110,"1989 Crest Football","Sports","Footballs with a 1989 crest in four colours.",{id:"1989-crest-football"}],
[111,"Glossy Graphic Football 6 Pack","Sports","Six glossy footballs with different designs.",{id:"glossy-graphic-football-6pack"}],
[112,"Retro Handheld Game Console","Games","Retro handheld game console with RGB sticks.",{badge:"Popular"}],
[113,"Sank Magic Practice Copybook Set","Learning","Reusable magic practice copybooks with pen and refills.",{id:"magic-practice-copybook"}],
[114,"Dissolvable Paper Soap Tubes","Novelty","Paper soap sheets in travel tubes.",{}],
[115,"Pony Slot Machine Keychains","Keychains","Pony slot machine keychains in pastel colours.",{id:"pony-slot-machine-keychains"}],
[116,"Kids DIY Instant Print Camera","Learning","Kids instant print camera with pens and accessories.",{id:"kids-instant-print-camera",badge:"Popular"}],
[117,"Motion Sensing Racing Game","Games","Wireless motion sensing racing game with track and controllers.",{id:"motion-sensing-racing-game"}],
[118,"Animal Fidget Spinner Wrist Bands","Fidget Toys","Slap wrist bands with animal spinners.",{id:"animal-fidget-spinner-bands"}],
[119,"Swimming Goggles","Sports","Swimming goggles with carry cases.",{}],
[120,"Kids Video Walkie-Talkies","Games","Kids video walkie-talkies in pink and blue.",{id:"childrens-video-walkie-talkie"}],
[121,"Squishy Fidget Bun Toys","Fidget Toys","Squishy bun toys in a display box.",{badge:"New"}],
[122,"Fun DIY Rail Car Set","Games","DIY rail car track set.",{}],
[123,"Squishy Toy Display Box","Fidget Toys","Squishy food toys in a display box.",{}],
];

const q = (s) => JSON.stringify(s);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const seen = new Set();
const used = new Set();
let out = "";
const emit = (list, category, code, prefix) => {
  list.forEach(([idx, name, sub, desc, o], n) => {
    const slug = files[idx];
    if (!slug.startsWith(prefix)) throw new Error(`index ${idx} -> ${slug}, expected ${prefix}`);
    if (used.has(idx)) throw new Error(`image ${idx} used twice`);
    used.add(idx);
    const id = o.id ?? slugify(name);
    if (seen.has(id)) throw new Error(`duplicate id ${id}`);
    seen.add(id);
    out += `  {
    id: ${q(id)},
    name: ${q(name)},
    category: ${q(category)},
    subcategory: ${q(sub)},
    sku: ${q(`BT-${code}-${String(n + 1).padStart(3, "0")}`)},
    image: img(${q(slug)}),
    imageAlt: ${q(name)},
${o.badge ? `    badge: ${q(o.badge)},\n` : ""}${o.material ? `    material: ${q(o.material)},\n` : ""}${o.specs ? `    specs: ${JSON.stringify(o.specs)},\n` : ""}    colors: ${JSON.stringify(o.colors ?? [])},
    description: ${q(desc)},
  },
`;
  });
};
out += "  /* ---------------------------- Bottles ---------------------------- */\n";
emit(B, "Bottles", "B", "bottles-");
out += "  /* ----------------------------- Gifts ----------------------------- */\n";
emit(G, "Gifts", "G", "giftsitems-");
out += "  /* ------------------------------ Toys ----------------------------- */\n";
emit(T, "Toys", "T", "toys-");
if (used.size !== files.length) throw new Error(`${files.length - used.size} images have no product`);

const src = readFileSync("src/products.ts", "utf8").split("\r\n").join("\n");
const head = "export const products: Product[] = [\n";
const start = src.indexOf(head) + head.length;
const end = src.indexOf("];\n\nif (missing.size)");
let next = src.slice(0, start) + out + src.slice(end);
next = next.replace(/export type Category =[\s\S]*?;\n/, 'export type Category = "Toys" | "Gifts" | "Bottles";\n');
next = next.replace(/export function galleryFor[\s\S]*$/, "export function galleryFor(product: Product): string[] {\n  return [product.image];\n}\n");
next = next.replace(/\/\*\*\n \* Image pool for a product detail gallery[\s\S]*?\*\/\n(?=export function galleryFor)/, "/** Every product has exactly one image. */\n");
writeFileSync("src/products.ts", next);
console.log("products:", used.size);
