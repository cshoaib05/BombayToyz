import { ReactNode, useEffect, useMemo, useState } from "react";
import { categories, galleryFor, products, subcategoriesFor } from "@/products";
import type { Product } from "@/products";

export type { Product };

/** Look up a product's primary image by id, for the marketing sections. */
function byId(id: string): string {
  return products.find((product) => product.id === id)?.image ?? "";
}

/**
 * Decorative imagery for the marketing sections, drawn from the real
 * catalogue rather than hotlinked stock photography.
 */
const images = {
  blocks: byId("pop-it-fidget-4-model"),
  activity: byId("motion-sensing-racing-game"),
  toys: byId("glossy-graphic-football-6pack"),
  letters: byId("magic-practice-copybook"),
  car: byId("kids-instant-print-camera"),
  scooter: byId("animal-fidget-spinner-bands"),
  bottles: byId("matte-insulated-handle-bottle"),
  bottle: byId("gradient-sports-bottle-3pc"),
  gift: byId("cartoon-camera-keychain"),
  giftRed: byId("squishy-panda-night-light"),
  giftPink: byId("pony-slot-machine-keychains"),
};


function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    check: <path d="m5 12 4 4L19 6" />,
    whatsapp: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8c.5 3 2 4.5 5 5" />
      </>
    ),
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    zoom: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 4 4M10.5 8v5M8 10.5h5" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <button className="brand" onClick={() => goTo("/")}>
      <span className="brand-mark">B</span>
      <span>Bombay Toyz</span>
    </button>
  );
}

function goTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Action({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button className={`action ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function Header({ basketCount, openBasket }: { basketCount: number; openBasket: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">Wholesale Made Wonderful — Explore Our Latest Collections!</div>
      <header className="header">
        <div className="nav-shell">
          <Brand />
          <nav className={open ? "nav-links is-open" : "nav-links"}>
            <button onClick={() => { goTo("/"); setOpen(false); }}>Home</button>
            <button onClick={() => { goTo("/#categories"); setOpen(false); }}>Categories</button>
            <button onClick={() => { goTo("/products"); setOpen(false); }}>All Products</button>
            <button onClick={() => { goTo("/#about"); setOpen(false); }}>About Us</button>
            <button onClick={() => { goTo("/#contact"); setOpen(false); }}>Contact Us</button>
          </nav>
          <div className="nav-actions">
            <button aria-label="Search products" className="icon-button" onClick={() => goTo("/products?focus=search")}>
              <Icon name="search" />
            </button>
            <button aria-label={`Enquiry basket with ${basketCount} items`} className="icon-button basket-button" onClick={openBasket}>
              <Icon name="bag" />
              {basketCount > 0 && <span>{basketCount}</span>}
            </button>
            <Action className="primary nav-cta" onClick={() => goTo("/#contact")}>Get Wholesale Quote</Action>
            <button aria-label="Toggle navigation" className="icon-button menu-button" onClick={() => setOpen(!open)}>
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-title ${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function ProductCard({ product, add }: { product: Product; add: (product: Product) => void }) {
  return (
    <article className="product-card">
      <button className="product-image" onClick={() => goTo(`/products/${product.id}`)}>
        <img alt={product.imageAlt} src={product.image} />
        {product.badge && <span className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
      </button>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.sku}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="swatches" aria-label="Available color directions">
          {product.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}
        </div>
        <div className="card-actions">
          <Action className="text-action" onClick={() => goTo(`/products/${product.id}`)}>
            View details <Icon name="arrow" size={17} />
          </Action>
          <Action className="add-action" onClick={() => add(product)}>Add to enquiry</Action>
        </div>
      </div>
    </article>
  );
}

function Home({ add }: { add: (product: Product) => void }) {
  const [faq, setFaq] = useState<number | null>(0);
  const faqs = [
    ["Does Bombay Toyz accept bulk orders?", "Yes. Our product experience is designed around bulk and wholesale enquiries for businesses."],
    ["How can I request wholesale pricing?", "Add products to your enquiry basket or send your requirements through the enquiry basket. Pricing is shared after discussing your needs."],
    ["Can I enquire about multiple products?", "Absolutely. Add as many products as you need to one enquiry and include expected quantities for each."],
    ["What product categories are available?", "We supply toys, gifts, drinkware, home appliances and everyday essentials across roughly 70 wholesale lines."],
    ["Can I enquire through WhatsApp?", "Yes. Use any WhatsApp enquiry button to open a pre-filled message that you can review before sending."],
    ["How do I confirm product availability?", "Send an enquiry with the product SKU and quantity. Our team can then discuss current availability and order details."],
  ];


  return (
    <main>
      <section className="hero">
        <div className="hero-shape shape-one" />
        <div className="hero-shape shape-two" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Your wholesale partner</p>
          <h1>
            Big Variety.<br />
            Bigger <span>Smiles.</span><br />
            Better <em>Business.</em>
          </h1>
          <p className="hero-copy">
            Discover an exciting wholesale collection of toys, gifts, drinkware, home appliances and everyday essentials - all in one place, built for your business.
          </p>
          <div className="hero-actions">
            <Action className="primary large" onClick={() => goTo("/products")}>Explore Products <Icon name="arrow" /></Action>
            <Action className="secondary large" onClick={() => goTo("/#contact")}>Enquire for Bulk Orders</Action>
          </div>
          <div className="trust-row">
            <span><Icon name="check" size={16} /> Business-first catalogue</span>
            <span><Icon name="check" size={16} /> Multi-product enquiries</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card card-main"><img alt="Colorful wooden toys arranged for play" src={images.activity} /></div>
          <div className="hero-card card-small card-toy"><img alt="Bright toy blocks" src={images.blocks} /></div>
          <div className="hero-card card-small card-gift"><img alt="Colorful gift boxes" src={images.gift} /></div>
          <div className="hero-sticker">100%<small>colourful finds</small></div>
          <div className="spark spark-a">✦</div>
          <div className="spark spark-b">✦</div>
        </div>
        <button className="scroll-cue" onClick={() => document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" })}>
          <span>Scroll to discover</span><i />
        </button>
      </section>

      <div className="marquee" aria-label="Product categories">
        <div>TOYS ✦ GIFTS ✦ BOTTLES ✦ WHOLESALE ✦ NEW ARRIVALS ✦ EVERYDAY ESSENTIALS ✦ TOYS ✦ GIFTS ✦ BOTTLES ✦ WHOLESALE ✦</div>
      </div>

      <section className="section categories-section" id="categories">
        <SectionTitle eyebrow="Shop by category" title="A World of Products, One Destination." copy="Explore diverse collections carefully selected for your business." />
        <div className="category-grid">
          {[
            ["Toys", "Little wonders. Endless fun.", images.toys, "coral"],
            ["Gifts", "Thoughtful picks for every occasion.", images.giftRed, "purple"],
            ["Bottles", "Everyday essentials with a splash of style.", images.bottles, "mint"],
            ["More Collections", "More discoveries for every shelf.", images.scooter, "yellow"],
          ].map(([name, copy, image, color], index) => (
            <button className={`category-card ${color} category-${index + 1}`} key={name} onClick={() => goTo(name === "More Collections" ? "/products" : `/products?category=${name}`)}>
              <div>
                <span>0{index + 1}</span>
                <h3>{name}</h3>
                <p>{copy}</p>
                <b>{index === 3 ? "Discover More" : `Explore ${name}`} <Icon name="arrow" /></b>
              </div>
              <img alt={`${name} collection`} src={image} />
            </button>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <SectionTitle eyebrow="Curated for business" title="Fresh Finds. Business Favorites." copy="Browse live wholesale lines across toys, gifts and drinkware." />
        <div className="product-grid home-products">
          {products.slice(0, 8).map((product) => <ProductCard add={add} key={product.id} product={product} />)}
        </div>
        <div className="center-action"><Action className="primary large" onClick={() => goTo("/products")}>View All Products <Icon name="arrow" /></Action></div>
        <p className="demo-note">Product imagery is presentation-only. Pricing, stock and specifications are confirmed on enquiry.</p>
      </section>

      <section className="section why-section">
        <SectionTitle eyebrow="The Bombay Toyz difference" title="Your Business Deserves More Than Just Products." copy="We make wholesale sourcing simpler, more exciting, and more convenient." />
        <div className="benefit-grid">
          {[
            ["01", "Wide Product Variety", "Discover multiple product categories under one roof.", "blue"],
            ["02", "Bulk Order Friendly", "Find products suited to retailers, distributors, and growing businesses.", "yellow"],
            ["03", "Fresh Collections", "Explore exciting product styles and new discoveries.", "mint"],
            ["04", "Easy Business Enquiries", "Connect with our team for product information and wholesale requirements.", "coral"],
          ].map(([number, title, copy, color]) => (
            <article className={`benefit-card ${color}`} key={title}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p><i><Icon name="arrow" /></i>
            </article>
          ))}
        </div>
      </section>

      <section className="section steps-section">
        <SectionTitle eyebrow="How it works" title="Sourcing Made Simple." />
        <div className="steps">
          {[
            ["01", "Explore Products", "Browse our diverse wholesale collections."],
            ["02", "Select Your Favorites", "Choose products that match your business needs."],
            ["03", "Send an Enquiry", "Share requirements and expected quantities."],
            ["04", "Connect & Confirm", "Discuss availability and order details with our team."],
          ].map(([number, title, copy]) => (
            <article className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="section serve-section">
        <SectionTitle eyebrow="Built for wholesale" title="Made for Businesses Like Yours." />
        <div className="serve-grid">
          {[
            ["Retail Stores", "Fresh products to keep shelves interesting.", "store"],
            ["Toy Shops", "Play-led ranges for curious customers.", "blocks"],
            ["Gift Shops", "Colorful gifting for every occasion.", "gift"],
            ["Corporate Buyers", "Thoughtful options for planned gifting.", "brief"],
            ["Distributors", "A broad catalog made for exploration.", "route"],
            ["Resellers", "Discover flexible additions to your range.", "spark"],
          ].map(([title, copy, icon], index) => (
            <article className={`serve-card serve-${index + 1}`} key={title}><div>{icon.slice(0, 1).toUpperCase()}</div><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="wholesale-banner">
        <div className="banner-orb orb-one" /><div className="banner-orb orb-two" />
        <img alt="Colorful bottle selection" src={images.bottles} />
        <div>
          <p className="eyebrow">Let’s talk wholesale</p>
          <h2>Have a Big Order in Mind?</h2>
          <p>Let's find the right products for your business. Connect with Bombay Toyz for wholesale enquiries.</p>
          <div className="hero-actions">
            <Action className="yellow large" onClick={() => goTo("/#contact")}>Request a Wholesale Quote <Icon name="arrow" /></Action>
            <Action className="outline-light large" onClick={() => window.open("https://wa.me/918767931996?text=Hello%20Bombay%20Toyz%2C%20I%27d%20like%20to%20discuss%20a%20wholesale%20order.", "_blank")}>
              <Icon name="whatsapp" /> Chat on WhatsApp
            </Action>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-collage">
          <img alt="Colorful product assortment" className="about-main" src={images.toys} />
          <img alt="Bright wrapped gifts" className="about-float" src={images.giftPink} />
          <span>Big variety.<br />Bigger possibilities.</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Bombay Toyz</p>
          <h2>A Colorful World of Wholesale.</h2>
          <p>At Bombay Toyz, we believe product sourcing should be exciting and effortless. From playful toys and thoughtful gifts to stylish bottles and everyday essentials, we bring diverse collections together to support growing businesses.</p>
          <Action className="text-action" onClick={() => goTo("/products")}>Discover the collection <Icon name="arrow" /></Action>
        </div>
      </section>

      <section className="section faq-section">
        <div className="faq-intro">
          <p className="eyebrow">Questions, answered</p>
          <h2>Wholesale, without the guesswork.</h2>
          <p>Everything you need to start a product enquiry with confidence.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={faq === index ? "faq-item open" : "faq-item"} key={question}>
              <button aria-expanded={faq === index} onClick={() => setFaq(faq === index ? null : index)}>
                <span>{question}</span><Icon name={faq === index ? "minus" : "plus"} />
              </button>
              <div><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}

function ProductsPage({ add }: { add: (product: Product) => void }) {
  const params = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("Newest");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [visible, setVisible] = useState(12);
  const filtered = useMemo(() => {
    const result = products.filter((product) =>
      (category === "All" || product.category === category) &&
      `${product.name} ${product.sku} ${product.subcategory}`.toLowerCase().includes(search.toLowerCase())
    );
    return [...result].sort((a, b) => sort === "Name A–Z" ? a.name.localeCompare(b.name) : sort === "Name Z–A" ? b.name.localeCompare(a.name) : Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
  }, [search, category, sort]);

  useEffect(() => {
    if (params.get("focus") === "search") document.querySelector<HTMLInputElement>("#catalog-search")?.focus();
  }, []);

  // Collapse back to page one whenever the result set changes.
  useEffect(() => setVisible(12), [search, category, sort]);

  const filterContent = (
    <>
      <div className="filter-head"><h3>Filters</h3><button onClick={() => { setCategory("All"); setSearch(""); }}>Clear all</button></div>
      <div className="filter-group"><h4>Category</h4>
        {["All", ...categories].map((item) => (
          <label key={item}><input checked={category === item} name="category" onChange={() => setCategory(item)} type="radio" /><span>{item}</span><b>{item === "All" ? products.length : products.filter((p) => p.category === item).length}</b></label>
        ))}
      </div>
      <div className="filter-group"><h4>Available collections</h4>
        {subcategoriesFor(category).map((item) => <p key={item}>{item}</p>)}
      </div>
      <div className="filter-note"><b>Need help sourcing?</b><p>Tell us what you need and we’ll help shape your enquiry.</p><button onClick={() => goTo("/#contact")}>Talk to us <Icon name="arrow" size={16} /></button></div>
    </>
  );

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div><p className="breadcrumb"><button onClick={() => goTo("/")}>Home</button> / Products</p><p className="eyebrow">The wholesale catalogue</p><h1>Explore Our<br /><span>Product Universe.</span></h1><p>Over 70 wholesale lines across toys, gifts and drinkware.</p></div>
        <div className="catalog-orbit"><img alt="Colorful building toys" src={images.blocks} /><span className="orbit-label label-one">Toys</span><span className="orbit-label label-two">Gifts</span><span className="orbit-label label-three">Bottles</span></div>
      </section>
      <section className="catalog-shell">
        <aside className="filters">{filterContent}</aside>
        <div className="catalog-main">
          <div className="catalog-tools">
            <label className="search-field"><Icon name="search" /><input id="catalog-search" onChange={(e) => setSearch(e.target.value)} placeholder="Search by product name or SKU" value={search} /></label>
            <button className="mobile-filter-button" onClick={() => setMobileFilters(true)}>Filters <Icon name="chevron" /></button>
            <label className="sort-field"><span>Sort by</span><select onChange={(e) => setSort(e.target.value)} value={sort}><option>Newest</option><option>Name A–Z</option><option>Name Z–A</option></select></label>
          </div>
          <div className="result-row"><p><b>{filtered.length}</b> products found</p><span>Wholesale catalogue — enquire to confirm availability</span></div>
          {filtered.length ? (
            <>
              <div className="product-grid catalog-grid">{filtered.slice(0, visible).map((product) => <ProductCard add={add} key={product.id} product={product} />)}</div>
              {visible < filtered.length && <div className="center-action"><Action className="secondary large" onClick={() => setVisible(visible + 12)}>Load More Products</Action></div>}
            </>
          ) : (
            <div className="empty-state"><span><Icon name="search" size={32} /></span><h2>No colorful finds yet.</h2><p>Try a different search or clear your filters.</p><Action className="primary" onClick={() => { setSearch(""); setCategory("All"); }}>Clear Filters</Action></div>
          )}
        </div>
      </section>
      {mobileFilters && <div className="filter-drawer"><button className="drawer-backdrop" aria-label="Close filters" onClick={() => setMobileFilters(false)} /><div><button className="drawer-close" onClick={() => setMobileFilters(false)}><Icon name="close" /></button>{filterContent}<Action className="primary" onClick={() => setMobileFilters(false)}>Show {filtered.length} products</Action></div></div>}
    </main>
  );
}

function ProductDetail({ product, add }: { product: Product; add: (product: Product, qty?: number) => void }) {
  const gallery = galleryFor(product);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState("Standard assortment");
  const [lightbox, setLightbox] = useState(false);
  const [detail, setDetail] = useState("description");
  // Stay inside the product's own category: same collection first, then the
  // rest of the category. Never cross categories — "Sports" toys and
  // "Sports Bottles" are unrelated despite the shared word.
  const siblings = products.filter((item) => item.id !== product.id && item.category === product.category);
  const related = [
    ...siblings.filter((item) => item.subcategory === product.subcategory),
    ...siblings,
  ]
    .filter((item, index, all) => all.findIndex((x) => x.id === item.id) === index)
    .slice(0, 4);
  const whatsapp = `https://wa.me/918767931996?text=${encodeURIComponent(`Hello Bombay Toyz, I'd like to enquire about ${product.name} (${product.sku}), variant: ${variant}, expected quantity: ${qty}.`)}`;
  return (
    <main className="detail-page">
      <div className="detail-breadcrumb"><button onClick={() => goTo("/")}>Home</button><span>/</span><button onClick={() => goTo("/products")}>Products</button><span>/</span><button onClick={() => goTo(`/products?category=${product.category}`)}>{product.category}</button><span>/</span><b>{product.name}</b></div>
      <section className="product-detail">
        <div className="gallery">
          <div className="gallery-main">
            <img alt={product.imageAlt} src={gallery[active]} />
            <button aria-label="Zoom image" className="zoom-button" onClick={() => setLightbox(true)}><Icon name="zoom" /></button>
            {gallery.length > 1 && <button aria-label="Previous image" className="gallery-arrow previous" onClick={() => setActive((active + gallery.length - 1) % gallery.length)}><Icon name="left" /></button>}
            {gallery.length > 1 && <button aria-label="Next image" className="gallery-arrow next" onClick={() => setActive((active + 1) % gallery.length)}><Icon name="right" /></button>}
          </div>
          {gallery.length > 1 && <div className="thumbnails">{gallery.map((image, index) => <button className={active === index ? "active" : ""} key={image} onClick={() => setActive(index)}><img alt={`${product.name} view ${index + 1}`} src={image} /></button>)}</div>}
        </div>
        <div className="detail-info">
          <div className="detail-label-row"><span>{product.category}</span>{product.badge && <b>{product.badge}</b>}</div>
          <h1>{product.name}</h1>
          <p className="sku">SKU: {product.sku} <span>Wholesale enquiry item</span></p>
          <p className="detail-description">{product.description} Enquire with our team to confirm current specifications, options, and availability.</p>
          <div className="quote-status"><span>Wholesale pricing</span><b>Request a Quote</b><small>Pricing is shared based on your business requirements.</small></div>
          <div className="option-block"><label htmlFor="variant">Select variant</label><select id="variant" onChange={(e) => setVariant(e.target.value)} value={variant}><option>Standard assortment</option><option>Mixed color assortment</option><option>Custom requirement</option></select></div>
          <div className="option-block"><span>Available color directions</span><div className="large-swatches">{product.colors.map((color, index) => <button aria-label={`Select color ${index + 1}`} key={color} style={{ backgroundColor: color }} />)}</div></div>
          <div className="quantity-row"><span>Expected quantity</span><div><button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" /></button><input aria-label="Expected quantity" min="1" onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} type="number" value={qty} /><button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}><Icon name="plus" /></button></div><small>No minimum quantity is implied.</small></div>
          <div className="detail-actions">
            <Action className="primary large" onClick={() => { add(product, qty); }}>Enquire for Bulk Order <Icon name="arrow" /></Action>
            <Action className="secondary large" onClick={() => add(product, qty)}><Icon name="bag" /> Add to Enquiry Basket</Action>
            <Action className="whatsapp-action large" onClick={() => window.open(whatsapp, "_blank")}><Icon name="whatsapp" /> WhatsApp Enquiry</Action>
          </div>
          <p className="availability-note"><Icon name="check" size={16} /> Availability, pricing, packaging, and order details are confirmed after enquiry.</p>
        </div>
      </section>
      <section className="detail-tabs">
        <div className="tab-buttons">
          {["description", "specifications", "packaging", "ordering"].map((item) => <button className={detail === item ? "active" : ""} key={item} onClick={() => setDetail(item)}>{item === "ordering" ? "Wholesale & Ordering" : item[0].toUpperCase() + item.slice(1)}</button>)}
        </div>
        <div className="tab-content">
          {detail === "description" && <><h2>Made to be discovered.</h2><p>{product.description}</p><p>Product imagery is presentation-only. Final specifications, colours and inventory availability are confirmed with the Bombay Toyz team at enquiry.</p></>}
          {detail === "specifications" && <><h2>Product specifications</h2><dl><div><dt>Category</dt><dd>{product.category}</dd></div><div><dt>Collection</dt><dd>{product.subcategory}</dd></div>{(product.material || product.specs?.length) && (product.specs?.length ? product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>) : <div><dt>Material</dt><dd>{product.material}</dd></div>)}</dl><p className="detail-description">Specifications shown are indicative. Confirm exact dimensions, certifications and packaging with the Bombay Toyz team before ordering.</p></>}
          {detail === "packaging" && <><h2>Packaging information</h2><p>Carton configuration, inner packing and master carton details vary by model and order quantity. Share your expected quantity in an enquiry and our team will confirm the relevant packaging.</p></>}
          {detail === "ordering" && <><h2>Wholesale & ordering</h2><p>This is an enquiry-led wholesale experience, not a retail checkout. Select your preferred variant, share an expected quantity, and submit an enquiry so availability and commercial details can be discussed.</p></>}
        </div>
      </section>
      <section className="section related-section"><SectionTitle eyebrow="Keep exploring" title="You Might Also Like." /><div className="product-grid">{related.map((item) => <ProductCard add={add} key={item.id} product={item} />)}</div></section>
      <section className="detail-cta"><div><p className="eyebrow">Wholesale enquiries</p><h2>Need This Product in Bulk?</h2><p>Share your quantity and product requirements to start a wholesale enquiry.</p></div><Action className="yellow large" onClick={() => add(product, qty)}>Get Wholesale Quote <Icon name="arrow" /></Action></section>
      {lightbox && <div className="lightbox"><button aria-label="Close image" onClick={() => setLightbox(false)}><Icon name="close" size={28} /></button><img alt={product.imageAlt} src={gallery[active]} /></div>}
    </main>
  );
}

function EnquiryDrawer({ basket, close, remove, update }: { basket: Record<string, number>; close: () => void; remove: (id: string) => void; update: (id: string, qty: number) => void }) {
  const selected = products.filter((product) => basket[product.id]);
  const message = selected.length
    ? `Hello Bombay Toyz, I'd like to enquire about:\n${selected.map((product) => `• ${product.name} (${product.sku}) — expected qty: ${basket[product.id]}`).join("\n")}`
    : "Hello Bombay Toyz, I'd like to discuss a wholesale enquiry.";
  return (
    <div className="enquiry-drawer">
      <button aria-label="Close enquiry basket" className="drawer-backdrop" onClick={close} />
      <aside>
        <div className="enquiry-head"><div><p>Your selections</p><h2>Enquiry Basket</h2></div><button aria-label="Close basket" onClick={close}><Icon name="close" /></button></div>
        <p className="drawer-copy">Build one simple enquiry for multiple products. Nothing here is a purchase or checkout.</p>
        <div className="enquiry-items">
          {selected.length ? selected.map((product) => (
            <article key={product.id}><img alt={product.imageAlt} src={product.image} /><div><span>{product.category}</span><h3>{product.name}</h3><small>{product.sku}</small><label>Expected qty <input min="1" onChange={(e) => update(product.id, Math.max(1, Number(e.target.value)))} type="number" value={basket[product.id]} /></label><button onClick={() => remove(product.id)}>Remove</button></div></article>
          )) : <div className="basket-empty"><span><Icon name="bag" size={30} /></span><h3>Your basket is ready for ideas.</h3><p>Add products to start a multi-product enquiry.</p><Action className="primary" onClick={() => { close(); goTo("/products"); }}>Explore Products</Action></div>}
        </div>
        {selected.length > 0 && <div className="enquiry-footer"><p><b>{selected.length} product{selected.length > 1 ? "s" : ""}</b> selected for enquiry</p><Action className="primary large" onClick={() => window.open(`https://wa.me/918767931996?text=${encodeURIComponent(message)}`, "_blank")}><Icon name="whatsapp" /> Send via WhatsApp</Action></div>}
      </aside>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div className="footer-top">
        <div className="footer-brand"><Brand /><p>Bright products, thoughtful sourcing, and easy wholesale enquiries for growing businesses.</p></div>
        <div><h3>Explore</h3><button onClick={() => goTo("/")}>Home</button><button onClick={() => goTo("/products")}>All Products</button><button onClick={() => goTo("/#about")}>About Us</button><button onClick={() => goTo("/#contact")}>Contact</button></div>
        <div><h3>Categories</h3>{categories.map((item) => <button key={item} onClick={() => goTo(`/products?category=${item}`)}>{item}</button>)}</div>
        <div><h3>Get in touch</h3><p>Business Number: <a href="tel:+918767931996">8767931996</a></p><p>Email: <a href="mailto:Info@bombaytoyz.in">Info@bombaytoyz.in</a></p><div className="socials"><a href="https://www.facebook.com/Bombaytoyz/" rel="noopener noreferrer" target="_blank">Facebook</a></div></div>
      </div>
      <div className="footer-wordmark">Bombay Toyz</div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Bombay Toyz.</span><span>Big Variety. Bigger Possibilities.</span></div>
    </footer>
  );
}

export default function App() {
  const [location, setLocation] = useState(window.location.pathname + window.location.search + window.location.hash);
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [basketOpen, setBasketOpen] = useState(false);

  useEffect(() => {
    const onLocation = () => setLocation(window.location.pathname + window.location.search + window.location.hash);
    window.addEventListener("popstate", onLocation);
    return () => window.removeEventListener("popstate", onLocation);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }));
  }, [location]);

  function add(product: Product, qty = 1) {
    setBasket((current) => ({ ...current, [product.id]: (current[product.id] || 0) + qty }));
    setBasketOpen(true);
  }

  const detailMatch = window.location.pathname.match(/^\/products\/([^/]+)$/);
  const detailProduct = detailMatch ? products.find((product) => product.id === detailMatch[1]) : undefined;
  return (
    <div className="app">
      <Header basketCount={Object.keys(basket).length} openBasket={() => setBasketOpen(true)} />
      {detailProduct ? <ProductDetail add={add} key={location} product={detailProduct} /> : window.location.pathname === "/products" ? <ProductsPage add={add} key={location} /> : <Home add={add} key={location} />}
      <Footer />
      <button aria-label="Open enquiry basket" className="floating-basket" onClick={() => setBasketOpen(true)}><Icon name="bag" /><span>{Object.keys(basket).length}</span><b>Enquiry</b></button>
      {basketOpen && <EnquiryDrawer basket={basket} close={() => setBasketOpen(false)} remove={(id) => setBasket((current) => { const next = { ...current }; delete next[id]; return next; })} update={(id, qty) => setBasket((current) => ({ ...current, [id]: qty }))} />}
    </div>
  );
}
