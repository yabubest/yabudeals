// validate.js – vor jedem Deploy laufen lassen: node validate.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let fail = false;
const files = fs.readdirSync('.');

console.log('== JSON-Dateien ==');
files.filter(f => f.endsWith('.json')).forEach(f => {
    try {
        JSON.parse(fs.readFileSync(f, 'utf8'));
        console.log('OK   ' + f);
    } catch (e) {
        console.log('FEHLER  ' + f + '  ->  ' + e.message);
        fail = true;
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

console.log('\n== Interne Links (href="/...") ==');
const htmlFiles = files.filter(f => f.endsWith('.html'));
const linkRegex = /href="\/([a-zA-Z0-9_.-]+\.(html|css|js|json|xml|txt))"/g;
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
