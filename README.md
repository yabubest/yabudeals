# YabuDeals

Statische Deal-/Schnäppchen-Website für den DACH-Markt (yabubest.de), gehostet über Cloudflare Pages / GitHub Pages. Keine Server, kein Build-Step – reines HTML/CSS/JS, Daten kommen aus JSON-Dateien, die automatisiert (n8n) befüllt werden.

## Seiten
- `index.html` – Startseite, alle Deals (Amazon + AliExpress), Suche, Kategorie-Filter, Shop-Tabs, Pagination
- `amazon.html` – Nur Amazon-Deals aus `deals.json`
- `aliexpress.html` – Nur AliExpress-Deals aus `aliexpress-deals.json`
- `deal.html` – Dynamische Produkt-Detailseite, aufgerufen als `deal.html?shop=amazon&id=<ASIN>` oder `deal.html?shop=ali&id=<Link>`
- `blog.html` – Übersicht aller Blogbeiträge aus `blog-posts.json`
- `ratgeber-post.html` – Dynamische Blogbeitrags-Detailseite, aufgerufen als `ratgeber-post.html?post=<Link-Wert aus blog-posts.json>`
- `impressum.html` / `datenschutz.html` – Pflichtseiten, verlinkt im Footer jeder Seite

## Gemeinsame Dateien
- `style.css` – einziges Stylesheet, von allen Seiten genutzt
- `components.js` – globaler Header/Footer + gemeinsame Deal-Render-Funktionen (`formatPrice`, `dealCardHTML`), von allen Seiten eingebunden

## Daten
- `deals.json` – Amazon-Angebote (automatisiert befüllt)
- `aliexpress-deals.json` – AliExpress-Angebote (automatisiert befüllt)
- `blog-posts.json` – Blogbeiträge inkl. `Content_HTML` (automatisiert befüllt)

## SEO
- `robots.txt`, `sitemap.xml` – nur statisch erreichbare Seiten gelistet (dynamische Detailseiten sind über Query-Parameter erreichbar und daher nicht einzeln aufgeführt)
