/* ============================================================
   YABUDEALS – LIGHT & RESPONSIVE FULLSCREEN DESIGN SYSTEM
   ============================================================ */

/* Globaler Datenspeicher */
window.allLoadedDeals = window.allLoadedDeals || [];
window.allLoadedBlogPosts = window.allLoadedBlogPosts || [];

/* ---------- 1. DESIGN-SYSTEM STYLES INJIZIEREN ---------- */
function injectGlobalStyles() {
  if (document.getElementById('yabudeals-global-styles')) return;

  const style = document.createElement('style');
  style.id = 'yabudeals-global-styles';
  style.textContent = `
    /* HELLES GRUND-LAYOUT & PLATZHALTER FÜR FIXED BARS */
    body {
      padding-top: 70px !important;
      padding-bottom: 45px !important;
      background-color: #f8fafc !important; /* Helles, augenschonendes Off-White */
      color: #0f172a !important; /* Dunkle, perfekt lesbare Schrift */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      margin: 0 !important;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
    }

    /* GESAMTE BILDSCHIRMBREITE NUTZEN */
    .container, main, section, .page-wrapper {
      width: 100% !important;
      max-width: 98vw !important; /* Nutzt fast die volle Monitorbreite */
      margin: 0 auto !important;
      padding: 0 10px !important;
      box-sizing: border-box !important;
    }

    h1, h2, h3, h4, h5, h6 { color: #0f172a !important; font-weight: 800 !important; }

    /* SYMMETRISCHE FILTER-LEISTE */
    #filter-bar, .filter-container {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 10px !important;
      padding: 10px 14px !important;
      display: flex !important;
      gap: 10px !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03) !important;
      margin-bottom: 15px !important;
    }

    /* EINHEITLICHE EINGABEFELDER */
    input[type="text"], input[placeholder*="suchen"], select, #category-select {
      background: #ffffff !important;
      color: #0f172a !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 10px !important;
      padding: 8px 12px !important;
      font-size: 13px !important;
      outline: none !important;
      transition: border-color 0.2s ease !important;
      flex-grow: 1 !important;
    }
    input[type="text"]:focus, select:focus {
      border-color: #2563eb !important;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15) !important;
    }

    /* OEN-BUTTONS & PAGINATION */
    .btn-filter, button.filter-btn, .page-btn {
      background: #ffffff !important;
      color: #475569 !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 10px !important;
      padding: 8px 14px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }
    .btn-filter.active, button.filter-btn.active, .page-btn.active {
      background: #2563eb !important;
      color: #ffffff !important;
      border-color: #2563eb !important;
      box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25) !important;
    }

    /* ULTRA-RESPONSIVES GRID (FULLSCREEN DESKTOP & PERFECT MOBILE) */
    .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr)) !important;
      gap: 12px !important;
      width: 100% !important;
      margin-top: 15px !important;
    }

    @media (min-width: 1400px) {
      .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
        grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)) !important;
      }
    }

    @media (max-width: 600px) {
      body {
        padding-top: 60px !important;
        padding-bottom: 40px !important;
      }
      .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
        grid-template-columns: repeat(2, 1fr) !important; /* Perfekte 2 Spalten auf Smartphones */
        gap: 8px !important;
      }
    }

    /* KARTEN-DESIGN (HARMONISCH & CLEAN) */
    .deal-card, .blog-card, article.card {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 10px !important;
      padding: 10px !important;
      display: flex !important;
      flex-direction: column !important;
      position: relative !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.03) !important;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
      box-sizing: border-box !important;
      height: 100% !important;
    }
    .deal-card:hover, .blog-card:hover {
      transform: translateY(-3px) !important;
      border-color: #cbd5e1 !important;
      box-shadow: 0 8px 16px rgba(0,0,0,0.08) !important;
    }

    /* BILD CONTAINER */
    .img-container {
      width: 100% !important;
      aspect-ratio: 1 / 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: #f1f5f9 !important;
      border-radius: 10px !important;
      padding: 6px !important;
      margin-bottom: 8px !important;
      box-sizing: border-box !important;
    }
    .img-container img {
      max-width: 100% !important;
      max-height: 100% !important;
      object-fit: contain !important;
    }

    /* BADGES */
    .badge-top-left, .badge-top-right {
      position: absolute !important;
      top: 8px !important;
      font-size: 8.5px !important;
      font-weight: 700 !important;
      padding: 3px 6px !important;
      border-radius: 6px !important;
      z-index: 2 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.3px !important;
    }
    .badge-top-left { left: 8px !important; }
    .badge-top-right { right: 8px !important; }

    .shop-amazon { background: #fff3e0 !important; color: #d97706 !important; border: 1px solid #fcd34d !important; }
    .shop-ali { background: #eff6ff !important; color: #2563eb !important; border: 1px solid #93c5fd !important; }
    .shop-blog { background: #f3e8ff !important; color: #7e22ce !important; border: 1px solid #d8b4fe !important; }
    .badge-discount { background: #dc2626 !important; color: #ffffff !important; }

    /* TEXT & TITEL */
    .category-tag {
      font-size: 9.5px !important;
      color: #64748b !important;
      text-transform: uppercase !important;
      font-weight: 600 !important;
      margin-bottom: 3px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
    .card-title {
      font-size: 11.5px !important;
      font-weight: 600 !important;
      color: #0f172a !important;
      line-height: 1.35 !important;
      height: 2.7em !important;
      overflow: hidden !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      margin-bottom: 8px !important;
    }

    /* PERFEKTE SYMMETRIE (UNTERER BEREICH AN DESIGN-BODEN GEBUNDEN) */
    .card-bottom-wrapper {
      margin-top: auto !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 6px !important;
    }

    .price-row {
      display: flex !important;
      align-items: baseline !important;
      gap: 5px !important;
      flex-wrap: wrap !important;
    }
    .offer-price {
      font-size: 13.5px !important;
      font-weight: 800 !important;
      color: #b91c1c !important;
    }
    .regular-price {
      font-size: 9.5px !important;
      color: #94a3b8 !important;
      text-decoration: line-through !important;
    }

    /* KAUF-BUTTONS */
    .btn-action {
      display: block !important;
      width: 100% !important;
      padding: 7px 0 !important;
      text-align: center !important;
      font-size: 11px !important;
      font-weight: 700 !important;
      border-radius: 10px !important;
      text-decoration: none !important;
      transition: filter 0.2s ease !important;
      box-sizing: border-box !important;
      border: none !important;
    }
    .btn-action:hover { filter: brightness(0.92) !important; }

    .bg-amazon { background: #f59e0b !important; color: #000000 !important; }
    .bg-ali { background: #ef4444 !important; color: #ffffff !important; }
    .bg-blog { background: #2563eb !important; color: #ffffff !important; }
  `;
  document.head.appendChild(style);
}

/* ---------- 2. SCHLANKE, FESTE KOPFZEILE (DESKTOP & MOBILE) ---------- */
function loadGlobalHeader() {
  const headerContainer = document.getElementById('global-header');
  if (!headerContainer) return;

  const mapsLink = "https://www.google.com/maps/place/Yabubest/@49.1154652,9.718036,17z";
  const tiktokLink = "https://www.tiktok.com/@yabubests";
  const instagramLink = "https://www.instagram.com/yabubests/";
  const youtubeLink = "https://www.youtube.com/channel/UC7HEbymVzO__iHO1touYN-Q";

  headerContainer.innerHTML = `
    <header style="position: fixed; top: 0; left: 0; width: 100%; z-index: 99999; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.04);">
      <div style="width: 100%; max-width: 98vw; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 8px 15px; box-sizing: border-box;">
        <a href="/" style="font-size: 1.25rem; font-weight: 800; text-decoration: none; color: #0f172a; letter-spacing: -0.5px;">
          🚀 YabuDeals
        </a>

        <div style="display: flex; align-items: center; gap: 16px;">
          <nav style="display: flex; gap: 14px;">
            <a href="/" style="text-decoration: none; color: #334155; font-size: 0.88rem; font-weight: 600;">Startseite</a>
            <a href="/blog.html" style="text-decoration: none; color: #334155; font-size: 0.88rem; font-weight: 600;">Blog</a>
          </nav>

          <div style="display: flex; gap: 10px; align-items: center; border-left: 1px solid #cbd5e1; padding-left: 12px;">
            <a href="${mapsLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="Google Maps"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5 2.5z"/></svg></a>
            <a href="${tiktokLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="TikTok"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.48A6.29 6.29 0 0 0 15.84 15V8.56a8.27 8.27 0 0 0 4.75 1.51V6.69z"/></svg></a>
            <a href="${instagramLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="Instagram"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="${youtubeLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="YouTube"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 0 12s0 3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
        </div>
      </div>
    </header>
  `;
}

/* ---------- 3. SCHLANKE, FESTE FUSSZEILE (UNTERER RAND) ---------- */
function loadGlobalFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer || footerContainer.dataset.rendered === "true") return;

  footerContainer.style.display = 'block';

  footerContainer.innerHTML = `
    <footer style="position: fixed; bottom: 0; left: 0; width: 100%; z-index: 99999; background: #ffffff; border-top: 1px solid #e2e8f0; padding: 6px 15px; font-size: 11px; color: #64748b; box-shadow: 0 -2px 8px rgba(0,0,0,0.03);">
      <div style="width: 100%; max-width: 98vw; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; box-sizing: border-box;">
        <div style="text-align: left; font-weight: 500;">
          © 2026 YabuDeals · Inkl. MwSt. zzgl. Versand · Partnerprogramm
        </div>

        <div style="text-align: right;">
          <a href="/impressum.html" style="color:#0f172a; text-decoration:none; margin-right: 12px; font-weight: 600;">Impressum</a>
          <a href="/datenschutz.html" style="color:#0f172a; text-decoration:none; font-weight: 600;">Datenschutz</a>
        </div>
      </div>
    </footer>
  `;
  footerContainer.dataset.rendered = "true";
}

/* ---------- 4. DATUMS- & SORTIER-FUNKTIONEN ---------- */
function parseGermanDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0;
  try {
    const cleanStr = dateStr.replace('Uhr', '').trim();
    const parts = cleanStr.split(',');
    const datePart = parts[0] ? parts[0].trim() : '';
    const timePart = parts[1] ? parts[1].trim() : '00:00:00';

    if (!datePart) return 0;

    const [day, month, year] = datePart.split('.');
    const times = timePart.split(':');
    const hours = times[0] || '00';
    const minutes = times[1] || '00';
    const seconds = times[2] || '00';

    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    const timestamp = new Date(isoString).getTime();
    return isNaN(timestamp) ? 0 : timestamp;
  } catch (e) {
    return 0;
  }
}

function sortDealsByLatest(deals) {
  if (!Array.isArray(deals)) return [];
  return deals.sort((a, b) => {
    const dateA = parseGermanDate(a['DATUM'] || a['Datum'] || a.date || '');
    const dateB = parseGermanDate(b['DATUM'] || b['Datum'] || b.date || '');
    return dateB - dateA;
  });
}

function sortItemsByLatest(items) {
  return sortDealsByLatest(items);
}

/* ---------- 5. BILD- & PREIS-OPTIMIERUNG ---------- */
function optimizeImageUrl(url, size = 300) {
  const fallback = 'https://via.placeholder.com/300x300?text=Bild';
  if (!url || typeof url !== 'string') return fallback;

  let clean = url.trim();
  if (!clean || clean.length < 5) return fallback;

  if (clean.startsWith('//')) clean = 'https:' + clean;
  else if (clean.startsWith('/images/') || clean.startsWith('images/')) clean = 'https://m.media-amazon.com/' + clean.replace(/^\//, '');

  if (clean.includes('media-amazon.com') || clean.includes('amazon.com') || clean.includes('ssl-images-amazon.com')) return clean;

  const cleanHost = clean.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(cleanHost)}&w=${size}&h=${size}&fit=contain&bg=white&output=webp&q=80`;
}

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
    const link = deal['Affiliate Link'] || deal['Link'] || deal['Produkt-ID / AliExpress Link'] || deal['Produkt-ID'] || '';
    return link ? `/deal.html?shop=ali&id=${encodeURIComponent(link)}` : '#';
  }
  const asin = deal['ASIN / Amazon Link'] || deal['Produkt-ID'] || deal['Link: ybbst-21'] || '';
  return asin ? `/deal.html?shop=amazon&id=${encodeURIComponent(asin)}` : '#';
}

/* ---------- 6. DIE PERFEKT SYMMETRISCHEN KARTEN ---------- */
function dealCardHTML(deal) {
  const isAli = deal._shop === 'ali';
  
  const shopClass = isAli ? 'shop-ali' : 'shop-amazon';
  const shopName = isAli ? 'AliExpress' : 'Amazon';
  const btnClass = isAli ? 'bg-ali' : 'bg-amazon';
  
  const title = deal['Produkt-Titel'] || deal['Titel'] || deal.title || 'Angebot';
  let rawImage = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '';
  let image = optimizeImageUrl(String(rawImage).replace(/\s+/g, '').trim(), 300);

  const offerPriceFormatted = formatPrice(deal['Angebotspreis (€)'] || deal['Preis (€)'] || deal.offerPrice);
  const rawReg = deal['Regulärer Preis (€)'] || deal.regularPrice;
  const regPriceFormatted = rawReg ? formatPrice(rawReg) : '';

  const discount = deal['Rabatt (z.B. 30% Rabatt)'] || deal['Rabatt'] || deal.discount || '';
  const category = deal['Kategorie'] || deal.category || 'Angebote';

  const buyLink = deal['Affiliate Link'] || deal['Link: ybbst-21'] || deal['Link'] || '#';
  const detailHref = getDealDetailHref(deal);

  return `
    <article class="deal-card">
      <div class="badge-top-left ${shopClass}">${shopName}</div>
      ${discount ? `<div class="badge-top-right badge-discount">${discount}</div>` : ''}

      <a href="${detailHref}" class="img-container" style="text-decoration:none;">
        <img src="${image}" alt="${title}" width="300" height="300" decoding="async" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Bild';">
      </a>

      <div class="category-tag">${category}</div>
      <a href="${detailHref}" style="text-decoration:none;">
        <div class="card-title" title="${title}">${title}</div>
      </a>

      <div class="card-bottom-wrapper">
        <div class="price-row">
          <span class="offer-price">${offerPriceFormatted}</span>
          ${regPriceFormatted ? `<span class="regular-price">statt ${regPriceFormatted}</span>` : ''}
        </div>
        <a href="${buyLink}" target="_blank" rel="nofollow noopener sponsored" class="btn-action ${btnClass}">Zum Angebot</a>
      </div>
    </article>
  `;
}

function blogCardHTML(post) {
  const title = post.title || post['Titel'] || 'Blogbeitrag';
  const category = post.category || post['Kategorie'] || 'Ratgeber';
  const image = optimizeImageUrl(post.image || post['Bild-URL'] || '', 300);
  const slug = post.slug || post.id || '#';
  const detailHref = `/post.html?id=${encodeURIComponent(slug)}`;

  return `
    <article class="blog-card">
      <div class="badge-top-left shop-blog">Ratgeber</div>

      <a href="${detailHref}" class="img-container" style="text-decoration:none;">
        <img src="${image}" alt="${title}" width="300" height="300" decoding="async" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Bild';">
      </a>

      <div class="category-tag">${category}</div>
      <a href="${detailHref}" style="text-decoration:none;">
        <div class="card-title" title="${title}">${title}</div>
      </a>

      <div class="card-bottom-wrapper">
        <a href="${detailHref}" class="btn-action bg-blog">Beitrag lesen</a>
      </div>
    </article>
  `;
}

/* ---------- 7. ECHTZEIT-SMARTFILTER ---------- */
function filterDeals(deals, query = '', category = '') {
  if (!Array.isArray(deals)) return [];

  const cleanQuery = query.toLowerCase().trim();
  const cleanCat = category.trim();

  let filtered = deals.filter(deal => {
    const title = (deal['Produkt-Titel'] || deal['Titel'] || deal.title || '').toLowerCase();
    const cat = (deal['Kategorie'] || deal.category || '').toLowerCase();

    if (cleanQuery && !title.includes(cleanQuery) && !cat.includes(cleanQuery)) return false;
    if (cleanCat && (deal['Kategorie'] || deal.category) !== cleanCat) return false;
    return true;
  });

  return sortDealsByLatest(filtered);
}

function initSmartFilters() {
  const searchInput = document.querySelector('input[type="text"], input[placeholder*="suchen"], #search-input');
  const categorySelect = document.querySelector('select, #category-select');
  const dealsGrid = document.querySelector('.deals-grid, #deals-grid, #deals-container');
  const blogGrid = document.querySelector('.blog-grid, #blog-grid, #blog-posts-container');

  if (!searchInput && !categorySelect) return;

  function executeFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = categorySelect ? categorySelect.value.trim() : '';

    if (dealsGrid && window.allLoadedDeals && window.allLoadedDeals.length > 0) {
      let filteredDeals = filterDeals(window.allLoadedDeals, query, selectedCat);

      if (filteredDeals.length === 0) {
        dealsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b; font-size: 14px;">Keine passenden Angebote gefunden.</div>`;
      } else {
        dealsGrid.innerHTML = filteredDeals.slice(0, 36).map(d => dealCardHTML(d)).join('');
      }
    }

    if (blogGrid && window.allLoadedBlogPosts && window.allLoadedBlogPosts.length > 0) {
      let filteredPosts = window.allLoadedBlogPosts.filter(post => {
        const title = (post.title || post['Titel'] || '').toLowerCase();
        const cat = (post.category || post['Kategorie'] || '').toLowerCase();

        if (query && !title.includes(query) && !cat.includes(query)) return false;
        if (selectedCat && (post.category || post['Kategorie']) !== selectedCat) return false;
        return true;
      });

      filteredPosts = sortDealsByLatest(filteredPosts);

      if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b; font-size: 14px;">Keine passenden Beiträge gefunden.</div>`;
      } else {
        blogGrid.innerHTML = filteredPosts.map(p => blogCardHTML(p)).join('');
      }
    }
  }

  if (searchInput) searchInput.addEventListener('input', executeFilter);
  if (categorySelect) categorySelect.addEventListener('change', executeFilter);
}

function renderPaginationHTML(containerEl, totalItems, itemsPerPage, currentPage, onPageChangeFnName) {
  if (!containerEl) return;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) {
    containerEl.innerHTML = '';
    return;
  }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage - 1})">&laquo; Zurück</button>`;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

  if (startPage > 1) {
    html += `<button class="page-btn" onclick="${onPageChangeFnName}(1)">1</button>`;
    if (startPage > 2) html += `<span style="color:#64748b; margin:0 4px;">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChangeFnName}(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span style="color:#64748b; margin:0 4px;">...</span>`;
    html += `<button class="page-btn" onclick="${onPageChangeFnName}(${totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage + 1})">Weiter &raquo;</button>`;

  containerEl.innerHTML = html;
}

function populateCategorySelect(selectEl, items) {
  if (!selectEl) return;
  const currentVal = selectEl.value;
  selectEl.innerHTML = '<option value="">Alle Kategorien</option>';

  const uniqueCategories = [...new Set(
    items
      .map(d => d['Kategorie'] || d.category)
      .filter(c => c && String(c).trim() !== '')
  )].sort();

  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === currentVal) option.selected = true;
    selectEl.appendChild(option);
  });
}

/* ---------- 8. AUTOMATISCHER START ---------- */
function initGlobalComponents() {
  injectGlobalStyles();
  loadGlobalHeader();
  loadGlobalFooter();
  initSmartFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalComponents);
} else {
  initGlobalComponents();
}
