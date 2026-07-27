/* ============================================================
   YABUDEALS – GLOBALE KOMPONENTEN & DEAL-ENGINE
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
          <a href="/amazon.html">Amazon Deals</a>
          <a href="/aliexpress.html">AliExpress Deals</a>
          <a href="/blog.html">Blog & Ratgeber</a>
        </nav>
      </div>
    </header>
  `;
}

/* ---------- GLOBALER FOOTER ---------- */
function loadGlobalFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer || footerContainer.dataset.rendered === "true") return;

  footerContainer.style.display = 'block';

  const mapsLink = "https://www.google.com/maps/place/Yabubest/@49.1154652,9.718036,17z";
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
          <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Google Maps" aria-label="Google Maps Standort">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5 2.5z"/></svg>
          </a>
          <a href="${tiktokLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="TikTok" aria-label="TikTok Profil">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.48A6.29 6.29 0 0 0 15.84 15V8.56a8.27 8.27 0 0 0 4.75 1.51V6.69z"/></svg>
          </a>
          <a href="${instagramLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="Instagram" aria-label="Instagram Profil">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="${youtubeLink}" target="_blank" rel="noopener noreferrer" class="social-icon" title="YouTube" aria-label="YouTube Kanal">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 0 12s0 3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
  footerContainer.dataset.rendered = "true";
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadGlobalHeader();
    loadGlobalFooter();
  });
} else {
  loadGlobalHeader();
  loadGlobalFooter();
}

/* ---------- DATUMS-PARSER ---------- */
function parseGermanDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 0;
  try {
    const cleanStr = dateStr.replace('Uhr', '').trim();
    const [datePart, timePart] = cleanStr.split(',');
    if (!datePart) return 0;

    const [day, month, year] = datePart.trim().split('.');
    let hours = '00', minutes = '00', seconds = '00';

    if (timePart) {
      const times = timePart.trim().split(':');
      hours = times[0] || '00';
      minutes = times[1] || '00';
      seconds = times[2] || '00';
    }

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
    const dateA = parseGermanDate(a['DATUM'] || a['Datum'] || '');
    const dateB = parseGermanDate(b['DATUM'] || b['Datum'] || '');
    return dateB - dateA;
  });
}

/* ---------- BILD- & PREIS-HELPER ---------- */
function optimizeImageUrl(url, size = 300) {
  const fallback = 'https://via.placeholder.com/300x300?text=Kein+Bild';
  if (!url || typeof url !== 'string') return fallback;

  let clean = url.trim();
  if (!clean || clean.length < 5) return fallback;

  // Repariere unvollständige Amazon-Bild-Pfade
  if (clean.startsWith('//')) {
    clean = 'https:' + clean;
  } else if (clean.startsWith('/images/') || clean.startsWith('images/')) {
    clean = 'https://m.media-amazon.com/' + clean.replace(/^\//, '');
  } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }

  // Amazon blockiert den Proxy weserv.nl -> Amazon-Bilder direkt laden!
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

function getDealDetailHref(deal) {
  const isAli = deal._shop === 'ali';
  if (isAli) {
    const link = deal['Affiliate Link'] || deal['Link'] || deal['Produkt-ID / AliExpress Link'] || deal['Produkt-ID'] || '';
    return link ? `/deal.html?shop=ali&id=${encodeURIComponent(link)}` : '#';
  }
  const asin = deal['ASIN / Amazon Link'] || deal['Produkt-ID'] || deal['Link: ybbst-21'] || '';
  return asin ? `/deal.html?shop=amazon&id=${encodeURIComponent(asin)}` : '#';
}

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
  const detailHref = getDealDetailHref(deal);

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
    if (startPage > 2) html += `<span class="page-dots">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChangeFnName}(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="page-dots">...</span>`;
    html += `<button class="page-btn" onclick="${onPageChangeFnName}(${onPageChangeFnName === 'goToPage' ? totalPages : totalPages})">${totalPages}</button>`;
  }

  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage + 1})">Weiter &raquo;</button>`;

  containerEl.innerHTML = html;
}

function populateCategorySelect(selectEl, deals) {
  if (!selectEl) return;
  selectEl.innerHTML = '<option value="">Alle Kategorien</option>';

  const uniqueCategories = [...new Set(
    deals
      .map(d => d['Kategorie'] || d.category)
      .filter(c => c && String(c).trim() !== '')
  )].sort();

  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    selectEl.appendChild(option);
  });
}
