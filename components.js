/* ============================================================
   YABUDEALS – UNIFIED DESIGN SYSTEM, SMARTFILTER & FIXED HEADER
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
    /* Header Fixierung & Platzhalter */
    body {
      padding-top: 60px !important;
    }

    /* EINHEITLICHES GRID FÜR DEALS & BLOGS */
    .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)) !important;
      gap: 10px !important;
      width: 100% !important;
      margin-top: 15px !important;
    }

    @media (min-width: 1200px) {
      .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
        grid-template-columns: repeat(9, 1fr) !important;
      }
    }

    @media (max-width: 768px) {
      .deals-grid, .blog-grid, #deals-grid, #blog-grid, #blog-posts-container {
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)) !important;
        gap: 8px !important;
      }
    }

    /* UNIFIED CARD STYLING (DEALS & BLOG) */
    .deal-card, .blog-card, article.card {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px !important;
      padding: 8px !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      position: relative !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
      transition: transform 0.15s ease, box-shadow 0.15s ease !important;
      box-sizing: border-box !important;
      height: 100% !important;
    }

    .deal-card:hover, .blog-card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
    }

    /* BADGES */
    .badge-shop-amazon, .badge-shop-ali, .badge-blog {
      position: absolute !important;
      top: 6px !important;
      left: 6px !important;
      font-size: 9px !important;
      font-weight: bold !important;
      padding: 2px 5px !important;
      border-radius: 4px !important;
      z-index: 2 !important;
      text-transform: uppercase !important;
    }
    .badge-shop-amazon { background: #fff3e0 !important; color: #d97706 !important; border: 1px solid #fcd34d !important; }
    .badge-shop-ali { background: #eff6ff !important; color: #2563eb !important; border: 1px solid #93c5fd !important; }
    .badge-blog { background: #f3e8ff !important; color: #7e22ce !important; border: 1px solid #d8b4fe !important; }

    .badge-discount {
      position: absolute !important;
      top: 6px !important;
      right: 6px !important;
      background: #dc2626 !important;
      color: #ffffff !important;
      font-size: 9px !important;
      font-weight: bold !important;
      padding: 2px 5px !important;
      border-radius: 4px !important;
      z-index: 2 !important;
    }

    /* BILD CONTAINER */
    .img-container {
      width: 100% !important;
      aspect-ratio: 1 / 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      margin-bottom: 6px !important;
      background: #fafafa !important;
      border-radius: 4px !important;
    }

    .img-container img {
      max-width: 100% !important;
      max-height: 100% !important;
      object-fit: contain !important;
    }

    /* TITEL & KATEGORIE */
    .category-tag {
      font-size: 9px !important;
      color: #64748b !important;
      text-transform: uppercase !important;
      font-weight: 600 !important;
      margin-bottom: 2px !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .deal-title, .blog-title {
      font-size: 11px !important;
      font-weight: 700 !important;
      color: #1e293b !important;
      line-height: 1.3 !important;
      height: 2.6em !important;
      overflow: hidden !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
      margin-bottom: 6px !important;
    }

    /* PREISE & BUTTONS */
    .price-row {
      display: flex !important;
      align-items: baseline !important;
      gap: 4px !important;
      margin-bottom: 6px !important;
      flex-wrap: wrap !important;
    }

    .offer-price {
      font-size: 12px !important;
      font-weight: 800 !important;
      color: #b91c1c !important;
    }

    .regular-price {
      font-size: 9px !important;
      color: #94a3b8 !important;
      text-decoration: line-through !important;
    }

    .btn-buy-amazon, .btn-buy-ali, .btn-read-blog {
      display: block !important;
      width: 100% !important;
      padding: 5px 0 !important;
      text-align: center !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      border-radius: 4px !important;
      text-decoration: none !important;
      transition: background 0.2s !important;
      box-sizing: border-box !important;
    }

    .btn-buy-amazon { background: #f59e0b !important; color: #000000 !important; }
    .btn-buy-amazon:hover { background: #d97706 !important; }
    .btn-buy-ali { background: #ef4444 !important; color: #ffffff !important; }
    .btn-buy-ali:hover { background: #dc2626 !important; }
    .btn-read-blog { background: #2563eb !important; color: #ffffff !important; }
    .btn-read-blog:hover { background: #1d4ed8 !important; }
  `;
  document.head.appendChild(style);
}

/* ---------- 2. GLOBALER HEADER (FIXED OBEN + SOCIAL ICONS) ---------- */
function loadGlobalHeader() {
  const headerContainer = document.getElementById('global-header');
  if (!headerContainer) return;

  const mapsLink = "https://www.google.com/maps/place/Yabubest/@49.1154652,9.718036,17z";
  const tiktokLink = "https://www.tiktok.com/@yabubests";
  const instagramLink = "https://www.instagram.com/yabubests/";
  const youtubeLink = "https://www.youtube.com/channel/UC7HEbymVzO__iHO1touYN-Q";

  headerContainer.innerHTML = `
    <header class="site-header" style="position: fixed; top: 0; left: 0; width: 100%; z-index: 99999; background-color: #ffffff; box-shadow: 0 1px 5px rgba(0,0,0,0.08);">
      <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 10px 20px;">
        <a href="/" class="logo" style="font-size: 1.3rem; font-weight: 800; text-decoration: none; color: #0f172a;">🚀 YabuDeals</a>

        <div style="display: flex; align-items: center; gap: 20px;">
          <nav style="display: flex; gap: 18px;">
            <a href="/" style="text-decoration: none; color: #334155; font-size: 0.9rem; font-weight: 600;">Startseite</a>
            <a href="/blog.html" style="text-decoration: none; color: #334155; font-size: 0.9rem; font-weight: 600;">Blog & Ratgeber</a>
          </nav>

          <!-- SOCIAL ICONS IN DER KOPFZEILE -->
          <div style="display: flex; gap: 12px; align-items: center; border-left: 1px solid #e2e8f0; padding-left: 15px;">
            <a href="${mapsLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="Google Maps"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5 2.5z"/></svg></a>
            <a href="${tiktokLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="TikTok"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.48A6.29 6.29 0 0 0 15.84 15V8.56a8.27 8.27 0 0 0 4.75 1.51V6.69z"/></svg></a>
            <a href="${instagramLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="Instagram"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="${youtubeLink}" target="_blank" rel="noopener" style="color:#64748b; text-decoration:none; display:flex;" title="YouTube"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 0 12s0 3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          </div>
        </div>
      </div>
    </header>
  `;
}

/* ---------- 3. GLOBALER FOOTER (ULTRA-MINIMALISTISCH EINZEILIG) ---------- */
function loadGlobalFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer || footerContainer.dataset.rendered === "true") return;

  footerContainer.style.display = 'block';

  footerContainer.innerHTML = `
    <footer style="background: #0f172a; color: #94a3b8; padding: 10px 20px; font-size: 11px; margin-top: 30px; border-top: 1px solid #1e293b;">
      <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <!-- LINKSBÜNDIG -->
        <div style="text-align: left;">
          © 2026 YabuDeals · Inkl. MwSt. zzgl. Versand · Partnerprogramm
        </div>

        <!-- RECHTSBÜNDIG -->
        <div style="text-align: right;">
          <a href="/impressum.html" style="color:#94a3b8; text-decoration:none;">Impressum</a> | 
          <a href="/datenschutz.html" style="color:#94a3b8; text-decoration:none;">Datenschutz</a>
        </div>
      </div>
    </footer>
  `;
  footerContainer.dataset.rendered = "true";
}

/* ---------- 4. HELFERFUNKTIONEN ---------- */
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

function sortItemsByLatest(items) {
  if (!Array.isArray(items)) return [];
  return items.sort((a, b) => {
    const dateA = parseGermanDate(a['DATUM'] || a['Datum'] || a.date || '');
    const dateB = parseGermanDate(b['DATUM'] || b['Datum'] || b.date || '');
    return dateB - dateA;
  });
}

function optimizeImageUrl(url, size = 300) {
  const fallback = 'https://via.placeholder.com/300x300?text=Kein+Bild';
  if (!url || typeof url !== 'string') return fallback;

  let clean = url.trim();
  if (!clean || clean.length < 5) return fallback;

  if (clean.startsWith('//')) {
    clean = 'https:' + clean;
  } else if (clean.startsWith('/images/') || clean.startsWith('images/')) {
    clean = 'https://m.media-amazon.com/' + clean.replace(/^\//, '');
  } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }

  if (clean.includes('media-amazon.com') || clean.includes('amazon.com') || clean.includes('ssl-images-amazon.com')) {
    return clean;
  }

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

/* ---------- 5. KARTEN-GENERATOREN ---------- */
function dealCardHTML(deal) {
  const isAli = deal._shop === 'ali';
  const shopBadge = isAli
    ? `<div class="badge-shop-ali">🌐 AliExpress</div>`
    : `<div class="badge-shop-amazon">📦 Amazon</div>`;

  const btnClass = isAli ? 'btn-buy-ali' : 'btn-buy-amazon';
  const title = deal['Produkt-Titel'] || deal['Titel'] || deal.title || 'Angebot';

  let rawImage = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '';
  let image = optimizeImageUrl(String(rawImage).replace(/\s+/g, '').trim(), 300);

  const offerPriceFormatted = formatPrice(deal['Angebotspreis (€)'] || deal['Preis (€)'] || deal.offerPrice);
  const rawReg = deal['Regulärer Preis (€)'] || deal.regularPrice;
  const regPriceFormatted = rawReg ? formatPrice(rawReg) : '';

  const discount = deal['Rabatt (z.B. 30% Rabatt)'] || deal['Rabatt'] || deal.discount || '';
  const category = deal['Kategorie'] || deal.category || 'Angebote';

  const buyLink = deal['Affiliate Link'] || deal['Link: ybbst-21'] || deal['Link'] || '#';
  const asin = deal['ASIN / Amazon Link'] || deal['Produkt-ID'] || '';
  const detailHref = isAli 
    ? `/deal.html?shop=ali&id=${encodeURIComponent(buyLink)}` 
    : `/deal.html?shop=amazon&id=${encodeURIComponent(asin)}`;

  return `
    <article class="deal-card">
      ${shopBadge}
      ${discount ? `<div class="badge-discount">${discount}</div>` : ''}

      <a href="${detailHref}" class="img-container" style="text-decoration:none;">
        <img src="${image}" alt="${title}" width="300" height="300" decoding="async" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Bild+Fehler';">
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
      <div class="badge-blog">📖 RATGEBER</div>

      <a href="${detailHref}" class="img-container" style="text-decoration:none;">
        <img src="${image}" alt="${title}" width="300" height="300" decoding="async" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x300?text=Blog+Bild';">
      </a>

      <div>
        <div class="category-tag">${category}</div>
        <a href="${detailHref}" style="text-decoration:none; color: inherit;">
          <div class="blog-title" title="${title}">${title}</div>
        </a>
      </div>

      <div>
        <a href="${detailHref}" class="btn-read-blog">Beitrag lesen &rarr;</a>
      </div>
    </article>
  `;
}

/* ---------- 6. UNIVERSAL ECHTZEIT-SMARTFILTER ---------- */
function initSmartFilters() {
  const searchInput = document.querySelector('input[type="text"], input[placeholder*="suchen"], #search-input');
  const categorySelect = document.querySelector('select, #category-select');
  
  const dealsGrid = document.querySelector('.deals-grid, #deals-grid, #deals-container');
  const blogGrid = document.querySelector('.blog-grid, #blog-grid, #blog-posts-container');

  if (!searchInput && !categorySelect) return;

  function executeFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = categorySelect ? categorySelect.value.trim() : '';

    /* DEALS FILTERN */
    if (dealsGrid && window.allLoadedDeals && window.allLoadedDeals.length > 0) {
      let filteredDeals = window.allLoadedDeals.filter(deal => {
        const title = (deal['Produkt-Titel'] || deal['Titel'] || deal.title || '').toLowerCase();
        const cat = (deal['Kategorie'] || deal.category || '').toLowerCase();

        if (query && !title.includes(query) && !cat.includes(query)) return false;
        if (selectedCat && (deal['Kategorie'] || deal.category) !== selectedCat) return false;
        return true;
      });

      filteredDeals = sortItemsByLatest(filteredDeals);

      if (filteredDeals.length === 0) {
        dealsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b; font-size: 13px;">Keine passenden Angebote gefunden.</div>`;
      } else {
        dealsGrid.innerHTML = filteredDeals.slice(0, 36).map(d => dealCardHTML(d)).join('');
      }
    }

    /* BLOG FILTERN */
    if (blogGrid && window.allLoadedBlogPosts && window.allLoadedBlogPosts.length > 0) {
      let filteredPosts = window.allLoadedBlogPosts.filter(post => {
        const title = (post.title || post['Titel'] || '').toLowerCase();
        const cat = (post.category || post['Kategorie'] || '').toLowerCase();

        if (query && !title.includes(query) && !cat.includes(query)) return false;
        if (selectedCat && (post.category || post['Kategorie']) !== selectedCat) return false;
        return true;
      });

      filteredPosts = sortItemsByLatest(filteredPosts);

      if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b; font-size: 13px;">Keine passenden Beiträge gefunden.</div>`;
      } else {
        blogGrid.innerHTML = filteredPosts.map(p => blogCardHTML(p)).join('');
      }
    }
  }

  if (searchInput) searchInput.addEventListener('input', executeFilter);
  if (categorySelect) categorySelect.addEventListener('change', executeFilter);
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

/* ---------- 7. AUTOMATISCHER START ---------- */
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
