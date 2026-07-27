function optimizeImageUrl(url, size = 300) {
  const fallback = 'https://via.placeholder.com/300x300?text=Kein+Bild';
  if (!url || typeof url !== 'string') return fallback;

  let clean = url.trim();
  if (!clean || clean.length < 5) return fallback;

  // Repariere unvollständige Amazon-Bild-Pfade aus Google Sheets
  if (clean.startsWith('//')) {
    clean = 'https:' + clean;
  } else if (clean.startsWith('/images/') || clean.startsWith('images/')) {
    clean = 'https://m.media-amazon.com/' + clean.replace(/^\//, '');
  } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://' + clean;
  }

  // 🔥 WICHTIG: Amazon blockiert Bild-Proxys (weserv.nl). 
  // Deshalb Amazon-Bilder DIREKT laden ohne weserv.nl!
  if (clean.includes('media-amazon.com') || clean.includes('amazon.com') || clean.includes('ssl-images-amazon.com')) {
    return clean;
  }

  // Für AliExpress und andere Shops weiterhin optimieren
  const cleanHost = clean.replace(/^https?:\/\//, '');
  return `https://images.weserv.nl/?url=${encodeURIComponent(cleanHost)}&w=${size}&h=${size}&fit=contain&bg=white&output=webp&q=80`;
}
