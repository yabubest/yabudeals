// GLOBALER HEADER & FOOTER FÜR ALLE SEITEN (yabubest.de)

document.addEventListener("DOMContentLoaded", function () {
    // 1. HEADER EINBAUEN
    const headerElement = document.getElementById("global-header");
    if (headerElement) {
        headerElement.innerHTML = `
            <header class="site-header">
                <div class="header-content">
                    <a href="/" class="logo">🚀 YabuDeals</a>
                    <nav class="main-nav">
                        <a href="/" id="nav-home">Startseite</a>
                        <a href="/blog.html" id="nav-blog">Blog & Ratgeber</a>
                    </nav>
                </div>
            </header>
        `;

        // Aktiven Menüpunkt markieren
        const path = window.location.pathname;
        if (path.includes("blog")) {
            const blogNav = document.getElementById("nav-blog");
            if (blogNav) blogNav.classList.add("active");
        } else {
            const homeNav = document.getElementById("nav-home");
            if (homeNav) homeNav.classList.add("active");
        }
    }

    // 2. FOOTER EINBAUEN
    const footerElement = document.getElementById("global-footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="footer-left">
                        <p>© 2026 YabuDeals (yabubest.de). Alle Rechte vorbehalten. Preise inkl. MwSt. zzgl. Versandkosten. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.</p>
                    </div>
                    <div class="footer-center">
                        <a href="#" target="_blank" class="social-icon svg-icon-telegram"></a>
                        <a href="#" target="_blank" class="social-icon svg-icon-tiktok"></a>
                        <a href="#" target="_blank" class="social-icon svg-icon-youtube"></a>
                    </div>
                    <div class="footer-right">
                        <a href="#" onclick="openGlobalModal('impressumModal'); return false;">Impressum</a>
                        <span> | </span>
                        <a href="#" onclick="openGlobalModal('datenschutzModal'); return false;">Datenschutzerklärung</a>
                    </div>
                </div>
            </footer>

            <!-- IMPRESSUM MODAL -->
            <div id="impressumModal" class="modal-overlay">
                <div class="modal-body">
                    <span class="close-modal-btn" onclick="closeGlobalModal('impressumModal')">&times;</span>
                    <h2>Impressum</h2><br>
                    <p><strong>Angaben gemäß § 5 TMG:</strong></p><br>
                    <p>Yavuz Gülec<br>YabuDeals / Yabubest<br>Deutschland</p><br>
                    <p><strong>Kontakt:</strong><br>E-Mail: info@yabubest.de</p><br>
                    <p><strong>Haftungsausschluss:</strong><br>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                </div>
            </div>

            <!-- DATENSCHUTZ MODAL -->
            <div id="datenschutzModal" class="modal-overlay">
                <div class="modal-body">
                    <span class="close-modal-btn" onclick="closeGlobalModal('datenschutzModal')">&times;</span>
                    <h2>Datenschutzerklärung</h2><br>
                    <p><strong>1. Datenschutz auf einen Blick</strong><br>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO).</p><br>
                    <p><strong>2. Datenerfassung auf unserer Website</strong><br>Diese Website nutzt statische Serverressourcen (Cloudflare Pages). Es werden keine personenbezogenen Daten ohne Ihre Zustimmung gespeichert oder verarbeitet.</p><br>
                    <p><strong>3. Affiliate-Links</strong><br>Unsere Links zu Online-Shops (z.B. Amazon) sind sogenannte Affiliate-Links. Wenn Sie auf einen solchen Link klicken und einkaufen, erhalten wir eine kleine Provision. Für Sie ändert sich der Preis nicht.</p>
                </div>
            </div>
        `;
    }
});

// globale Funktionen für Rechts-Modals
function openGlobalModal(id) { 
    const el = document.getElementById(id);
    if(el) el.style.display = 'flex'; 
}
function closeGlobalModal(id) { 
    const el = document.getElementById(id);
    if(el) el.style.display = 'none'; 
}
