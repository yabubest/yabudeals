// validate.js – vor jedem Deploy laufen lassen: node validate.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let fail = false;
const files = fs.readdirSync('.');

console.log('== JSON-Dateien (Syntax) ==');
files.filter(f => f.endsWith('.json')).forEach(f => {
    try {
        JSON.parse(fs.readFileSync(f, 'utf8'));
        console.log('OK   ' + f);
    } catch (e) {
        console.log('FEHLER  ' + f + '  ->  ' + e.message);
        fail = true;
    }
});

console.log('\n== JSON-Dateien (Struktur) ==');
const requiredDealFields = ['Produkt-Titel', 'Angebotspreis (€)', 'Bild-URL (Optional)'];
const requiredBlogFields = ['Titel', 'Link'];

files.filter(f => f.endsWith('.json')).forEach(f => {
    try {
        const data = JSON.parse(fs.readFileSync(f, 'utf8'));
        if (!Array.isArray(data) || data.length === 0) {
            console.log('WARNUNG  ' + f + '  ->  Leer oder kein Array');
            return;
        }
        const isDeals = f.includes('deals');
        const isBlog = f.includes('blog');
        const required = isDeals ? requiredDealFields : (isBlog ? requiredBlogFields : []);

        let emptyFields = 0;
        data.forEach((item, idx) => {
            required.forEach(field => {
                if (!item[field] || String(item[field]).trim() === '') {
                    emptyFields++;
                    if (emptyFields <= 3) {
                        console.log('FEHLER  ' + f + '  Eintrag ' + idx + '  ->  Feld "' + field + '" fehlt oder ist leer');
                    }
                }
            });
        });
        if (emptyFields > 3) {
            console.log('FEHLER  ' + f + '  ->  ... und ' + (emptyFields - 3) + ' weitere leere Pflichtfelder');
        }
        if (emptyFields > 0) fail = true;
        else console.log('OK   ' + f + '  (' + data.length + ' Einträge)');
    } catch (e) {
        // Bereits oben gemeldet
    }
});

console.log('\n== JS-Syntax ==');
files.filter(f => f.endsWith('.js') && f !== 'validate.js').forEach(f => {
    try {
        execSync(`node --check "${f}"`, { stdio: 'pipe' });
        console.log('OK   ' + f);
    } catch (e) {
        console.log('FEHLER  ' + f);
        fail = true;
    }
});

console.log('\n== Interne Links (href + src) ==');
const htmlFiles = files.filter(f => f.endsWith('.html'));
const linkRegex = /(?:href|src)="\/([a-zA-Z0-9_.-]+\.(html|css|js|json|xml|txt|jpg|jpeg|png|webp|svg))"/g;
const seen = new Set();

htmlFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        seen.add(match[1]);
    }
});

// auch Links innerhalb von components.js prüfen
if (fs.existsSync('components.js')) {
    const content = fs.readFileSync('components.js', 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        seen.add(match[1]);
    }
}

seen.forEach(f => {
    if (fs.existsSync(f)) {
        console.log('OK   ' + f);
    } else {
        console.log('FEHLT  ' + f);
        fail = true;
    }
});

console.log('');
if (fail) {
    console.log('❌ Validierung fehlgeschlagen – NICHT deployen.');
    process.exit(1);
} else {
    console.log('✅ Alles sauber – Deploy ok.');
}
