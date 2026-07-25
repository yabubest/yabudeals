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
                    <a href="/amazon.html">📦 Amazon</a>
                    <a href="/aliexpress.html">🌐 AliExpress</a>
                    <a href="/blog.html">Blog & Ratgeber</a>
                </nav>
            </div>
        </header>
    `;
}

/* ---------- GLOBALER FOOTER ---------- */
/* Impressum/Datenschutz sind ECHTE, crawlbare Links auf eigene Seiten
   (keine JS-Modals mehr) – rechtlich sauberer & SEO-freundlich. */
function loadGlobalFooter() {
    const footerContainer = document.getElementById('global-footer');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-left">
                    © 2026 YabuDeals · Alle Rechte vorbehalten · Inkl. MwSt. zzgl. Versand · Amazon- & AliExpress-Partner
                </div>

                <div class="footer-center">
                    <a href="https://t.me/yabudeals" target="_blank" rel="noopener noreferrer" class="social-icon" title="Telegram">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-.99.53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.38z"/></svg>
                    </a>
                    <a href="https://tiktok.com/@yabudeals" target="_blank" rel="noopener noreferrer" class="social-icon" title="TikTok">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.48A6.29 6.29 0 0 0 15.84 15V8.56a8.27 8.27 0 0 0 4.75 1.51V6.69z"/></svg>
                    </a>
                    <a href="https://youtube.com/@yabudeals" target="_blank" rel="noopener noreferrer" class="social-icon" title="YouTube">
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

document.addEventListener('DOMContentLoaded', () => {
    loadGlobalHeader();
    loadGlobalFooter();
});

/* ============================================================
   DEAL-ENGINE – gemeinsam genutzt von index.html, amazon.html,
   aliexpress.html und deal.html, damit Design & Verhalten
   auf allen Seiten IDENTISCH sind.
   ============================================================ */

function formatPrice(val) {
    if (!val && val !== 0) return '';
    if (val === 'N/A' || val === 'n/a') return 'Preis auf Anfrage';

    let str = String(val).replace('€', '').trim();
    let num = parseFloat(str.replace(',', '.'));
    if (isNaN(num)) return str;
    return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

/* Eindeutige ID für die Detailseite ermitteln:
   - Amazon: ASIN
   - AliExpress: die Affiliate-Link-URL (da kein ASIN vorhanden ist) */
function getDealDetailHref(deal) {
    const isAli = deal._shop === 'ali';
    if (isAli) {
        const link = deal['Link'] || '';
        return link ? `/deal.html?shop=ali&id=${encodeURIComponent(link)}` : (deal['Link'] || '#');
    }
    const asin = deal['ASIN / Amazon Link'] || '';
    return asin ? `/deal.html?shop=amazon&id=${encodeURIComponent(asin)}` : (deal['Link: ybbst-21'] || '#');
}

/* Rendert EINE Deal-Karte. Wird von jeder Katalogseite identisch genutzt. */
function dealCardHTML(deal) {
    const isAli = deal._shop === 'ali';
    const shopBadge = isAli
        ? `<div class="badge-shop-ali">🌐 AliExpress</div>`
        : `<div class="badge-shop-amazon">📦 Amazon</div>`;

    const btnClass = isAli ? 'btn-buy-ali' : 'btn-buy-amazon';
    const title = deal['Produkt-Titel'] || deal.title || 'Angebot';
    const image = deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal.image || 'https://via.placeholder.com/200';

    const offerPriceFormatted = formatPrice(deal['Angebotspreis (€)'] || deal['Preis (€)'] || deal.offerPrice);
    const rawReg = deal['Regulärer Preis (€)'] || deal.regularPrice;
    const regPriceFormatted = rawReg ? formatPrice(rawReg) : '';

    const discount = deal['Rabatt (z.B. 30% Rabatt)'] || deal.discount || '';
    const category = deal['Kategorie'] || deal.category || 'Angebot';
    const buyLink = deal['Link: ybbst-21'] || deal['Link'] || deal.link_ybbst || '#';
    const detailHref = getDealDetailHref(deal);

    return `
        <div class="deal-card">
            ${shopBadge}
            ${discount ? `<div class="badge-discount">${discount}</div>` : ''}

            <a href="${detailHref}" class="img-container" style="text-decoration:none;">
                <img src="${image}" alt="${title}" loading="lazy">
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

/* Rendert die Pagination-Leiste. onPageChange ist der NAME (String) einer
   globalen Funktion, damit jede Seite ihre eigene Page-Change-Logik nutzen kann. */
function renderPaginationHTML(containerEl, totalItems, itemsPerPage, currentPage, onPageChangeFnName) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        containerEl.innerHTML = '';
        return;
    }

    let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage - 1})">&laquo; Zurück</button>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChangeFnName}(${i})">${i}</button>`;
    }

    html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeFnName}(${currentPage + 1})">Weiter &raquo;</button>`;

    containerEl.innerHTML = html;
}

/* Befüllt das Kategorie-Dropdown dynamisch aus den geladenen Deals. */
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
