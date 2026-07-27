/**
 * build-ssr.js
 * -------------------------------------------------------
 * Rendert die ersten 24 Deals statisch in index.html, damit
 * Crawler (Seobility, Google) echten Produkt-Content sehen
 * statt "Lade aktuelle Angebote...".
 *
 * Diese Version nutzt 1:1 dieselben Funktionen wie dein
 * components.js (formatPrice, getDealDetailHref, dealCardHTML),
 * damit das Markup exakt zum CSS und zur Client-Logik passt.
 *
 * Nutzung lokal:   node build-ssr.js
 * Automatisch via: .github/workflows/build.yml
 * -------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ITEMS_TO_RENDER = 24;

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  } catch (e) {
    console.warn(`⚠️  Konnte ${file} nicht lesen/parsen:`, e.message);
    return [];
  }
}

function isValidDeal(deal) {
  const title = (deal['Produkt-Titel'] || deal['Titel'] || deal.title || '').trim().toLowerCase();
  const price = String(deal['Angebotspreis (€)'] || deal['Preis (€)'] || deal.offerPrice || '').trim().toLowerCase();
  const image = (deal['Bild-URL (Optional)'] || deal['Bild-URL'] || deal['Bildvorschau'] || deal.image || '').trim();
  return !(title === 'amazon produkt' || title === '' || price === 'n/a' || price === '' || image === '');
}

// ---------- 1:1 aus components.js übernommen ----------

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
  if (!image) image = 'https://via.placeholder.com/200';

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
  `.trim();
}

// ---------- Build-Logik ----------

function main() {
  const amazon = readJSON('deals.json').map(d => ({ ...d, _shop: 'amazon' })).filter(isValidDeal);
  const ali = readJSON('aliexpress-deals.json').map(d => ({ ...d, _shop: 'ali' })).filter(isValidDeal);

  const all = [...amazon, ...ali].slice(0, ITEMS_TO_RENDER);

  if (all.length === 0) {
    console.warn('⚠️  Keine gültigen Deals gefunden – index.html wird nicht verändert.');
    return;
  }

  const staticCardsHTML = all.map(dealCardHTML).join('\n');

  const indexPath = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  const startMarker = '<!-- SSR_DEALS_START -->';
  const endMarker = '<!-- SSR_DEALS_END -->';

  if (!html.includes(startMarker) || !html.includes(endMarker)) {
    console.error('❌ Marker SSR_DEALS_START/END fehlen in index.html.');
    process.exit(1);
  }

  const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
  html = html.replace(pattern, `${startMarker}\n${staticCardsHTML}\n${endMarker}`);

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✅ ${all.length} Deals statisch in index.html gerendert (Markup 1:1 aus components.js).`);
}

main();
