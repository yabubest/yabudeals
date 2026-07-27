/* ============================================================
 YABUDEALS – GLOBALE KOMPONENTEN
 Eingebunden auf JEDER Seite via: <script src="/components.js"></script>
 ============================================================ */

/* ---------- GLOBALER HEADER ---------- */
function loadGlobalHeader() {
  const headerContainer = document.getElementById('global-header');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
  <header class="site-header">
    <div class="header-container">
      <a href="/" class="logo">🚀 YabuDeals</a>
      <nav class="nav-links">
        <a href="/">Startseite</a>
        <a href="/blog.html">Blog & Ratgeber</a>
      </nav>
    </div>
  </header>
  `;
}
ANLEITUNG: Bild-Optimierung in components.js einbauen
========================================================

WARUM: build-ssr.js (das erste Laden / was Crawler sehen) optimiert
Bilder jetzt automatisch. Aber sobald dein JS übernimmt (Filter,
Suche, Kategorie-Wechsel, Pagination), rendert components.js die
Karten NEU - mit den rohen, unoptimierten Bild-URLs. Damit es
überall einheitlich und schnell bleibt, brauchst du denselben Trick
dort auch.

SCHRITT 1: Diese Funktion irgendwo VOR deiner dealCardHTML()-
Funktion in components.js einfügen:

--------------------------------------------------------------
function optimizeImageUrl(url, size = 300) {
  if (!url) return url;
  const clean = String(url).replace(/^https?:\/\//, '').trim();
  if (!clean) return url;
  return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=${size}&h=${size}&fit=contain&bg=white&output=webp&q=80`;
}
--------------------------------------------------------------

SCHRITT 2: In deiner bestehenden dealCardHTML()-Funktion die Zeile,
die das Bild vorbereitet (bei dir ungefähr so:

  let rawImage = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '';
  let image = String(rawImage).replace(/\s+/g, '').trim();

) ERSETZEN durch:

  let rawImage = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '';
  let image = optimizeImageUrl(String(rawImage).replace(/\s+/g, '').trim(), 300);

SCHRITT 3: Beim <img>-Tag in derselben Funktion width/height/decoding
ergänzen (verhindert Layout-Sprünge während des Ladens):

  <img src="${image}" alt="${title}" width="300" height="300"
       loading="lazy" decoding="async" style="cursor:pointer;"
       onerror="this.onerror=null;this.src='https://via.placeholder.com/300';">

FERTIG. Alle Bilder (egal ob von Amazon oder AliExpress, egal wie
groß das Original ist) kommen dann einheitlich als 300x300 WebP,
komprimiert und über ein globales CDN gecacht - spürbar schneller,
besonders beim ersten Besuch und auf Mobilgeräten.

HINWEIS: images.weserv.nl ist ein kostenloser, werbefreier Bild-Proxy-
Dienst (kein Anthropic-Produkt, keine Abhängigkeit von mir) - falls
du das lieber selbst hosten willst (z.B. via Cloudflare Images, das
du laut deinem CF_API_TOKEN eh schon nutzt), sag Bescheid, dann bauen
wir das stattdessen darüber.
/* ---------- GLOBALER FOOTER (IMMER SICHTBAR) ---------- */
function loadGlobalFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer) return;

  // Footer IMMER anzeigen (Desktop & Mobile)
  footerContainer.style.display = 'block';

  const mapsLink = "https://www.google.com/maps/place/Yabubest/@49.1154652,9.718036,17z/data=!4m17!1m10!3m9!1s0x479851322d8befcf:0x431899f4c419a2cd!2sYabubest!8m2!3d49.1155145!4d9.7178204!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11tj2bjwb7!3m5!1s0x479851322d8befcf:0x431899f4c419a2cd!8m2!3d49.1155145!4d9.7178204!16s%2Fg%2F11tj2bjwb7";
  const tiktokLink = "https://www.tiktok.com/@yabubests";
  const instagramLink = "https://www.instagram.com/yabubests/";
  const youtubeLink = "https://www.youtube.com/channel/UC7HEbymVzO__iHO1touYN-Q";

  footerContainer.innerHTML = `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-left">
        © 2026 YabuDeals · Alle Rechte vorbehalten · Inkl. MwSt. zzgl. Versand · Amazon- & AliExpress-Partner
      </div>

      <div class="footer-center">
        <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Google Maps / Standort">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </a>
        <a href="${tiktokLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="TikTok">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.48A6.29 6.29 0 0 0 15.84 15V8.56a8.27 8.27 0 0 0 4.75 1.51V6.69z"/></svg>
        </a>
        <a href="${instagramLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Instagram">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="${youtubeLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="YouTube">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>

      <div class="footer-right">
        <a href="/impressum.html">Impressum</a>
        <span class="sep">|</span>
        <a href="/datenschutz.html">Datenschutz</a>
      </div>
    </div>
  </footer>
  `;
}

window.addEventListener('resize', loadGlobalFooter);

document.addEventListener('DOMContentLoaded', () => {
  loadGlobalHeader();
  loadGlobalFooter();
});

/* ============================================================
 DEAL-ENGINE
 ============================================================ */

function formatPrice(val) {
  if (!val && val !== 0) return '';
  if (val === 'N/A' || val === 'n/a') return 'Preis auf Anfrage';

  let str = String(val).replace('€', '').trim();
  let num = parseFloat(str.replace(',', '.'));
  if (isNaN(num)) return str + ' €';
  return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

function getDealDetailHref(deal) {
  const isAli = deal._shop === 'ali';
  if (isAli) {
    const link = deal['Affiliate Link'] || deal['Link'] || deal['Produkt-ID / AliExpress Link'] || '';
    return link ? `/deal.html?shop=ali&id=${encodeURIComponent(link)}` : '#';
  }
  const asin = deal['ASIN / Amazon Link'] || deal['Produkt-ID'] || '';
  return asin ? `/deal.html?shop=amazon&id=${encodeURIComponent(asin)}` : (deal['Link: ybbst-21'] || '#');
}

function dealCardHTML(deal) {
  const isAli = deal._shop === 'ali';
  const shopBadge = isAli
    ? `<div class="badge-shop-ali">🌐 AliExpress</div>`
    : `<div class="badge-shop-amazon">📦 Amazon</div>`;

  const btnClass = isAli ? 'btn-buy-ali' : 'btn-buy-amazon';
  
  const title = deal['Produkt-Titel'] || deal['Titel'] || deal.title || 'Angebot';
  
  let rawImage = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '';
  let image = String(rawImage).replace(/\s+/g, '').trim();
  if (!image) {
    image = 'https://via.placeholder.com/200';
  }

  const offerPriceFormatted = formatPrice(deal['Angebotspreis (€)'] || deal['Preis (€)'] || deal.offerPrice);
  const rawReg = deal['Regulärer Preis (€)'] || deal.regularPrice;
  const regPriceFormatted = rawReg ? formatPrice(rawReg) : '';

  const discount = deal['Rabatt (z.B. 30% Rabatt)'] || deal['Rabatt'] || deal.discount || '';
  const category = deal['Kategorie'] || deal.category || 'Angebote';
  
  const buyLink = deal['Link: ybbst-21'] || deal['Affiliate Link'] || deal['Link'] || '#';
  const detailHref = getDealDetailHref(deal);

  return `
  <div class="deal-card">
    ${shopBadge}
    ${discount ? `<div class="badge-discount">${discount}</div>` : ''}

    <!-- 🔗 KLICK AUFS BILD ÖFFNET DIREKT DEN PARTNER-LINK -->
    <a href="${buyLink}" target="_blank" rel="nofollow noopener sponsored" class="img-container" style="text-decoration:none;">
      <img src="${image}" alt="${title}" loading="lazy" style="cursor:pointer;" onerror="this.onerror=null;this.src='https://via.placeholder.com/200';">
    </a>

    <div>
      <div class="category-tag">${category}</div>
      <a href="${detailHref}" style="text-decoration:none; color: inherit;">
        <div class="deal-title" title="${title}">${title}</div>
      </a>
    </div>

    <div>
      <div class="price-row">
        <span class="offer-price">${offerPriceFormatted}</span>
        ${regPriceFormatted ? `<span class="regular-price">statt ${regPriceFormatted}</span>` : ''}
      </div>
      <a href="${buyLink}" target="_blank" rel="nofollow noopener sponsored" class="${btnClass}">Zum Angebot &rarr;</a>
    </div>
  </div>
  `;
}

/* ---------- SMART PAGINATION (MAX 5 SEITEN) ---------- */
function renderPaginationHTML(containerEl, totalItems, itemsPerPage, currentPage, onPageChangeFnName) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    containerEl.innerHTML = '';
    return;
  }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage - 1})">&laquo; Zurück</button>`;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  if (startPage > 1) {
    html += `<button class="page-btn" onclick="${onPageChangeFnName}(1)">1</button>`;
    if (startPage > 2) {
      html += `<span class="page-dots">...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChangeFnName}(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span class="page-dots">...</span>`;
    }
    html += `<button class="page-btn" onclick="${onPageChangeFnName}(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage + 1})">Weiter &raquo;</button>`;

  containerEl.innerHTML = html;
}

function populateCategorySelect(selectEl, deals) {
  selectEl.innerHTML = '<option value="">Alle Kategorien</option>';

  const uniqueCategories = [...new Set(
    deals
      .map(d => d['Kategorie'] || d.category)
      .filter(Boolean)
  )].sort();

  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    selectEl.appendChild(option);
  });
}
