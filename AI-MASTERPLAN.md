# YabuDeals AI Modernization Master Plan v1.0

## 🎯 Projektziel
Modernisiere die gesamte YabuDeals-Website kontinuierlich, ohne jemals bestehende Funktionen, Datenstrukturen oder Integrationen zu beschädigen.

Das Projekt verfolgt vier gleichrangige Hauptziele:
1. **Modernes Premium-Design**
2. **Maximale Performance**
3. **Maximale Stabilität**
4. **Zukunftssichere Wartbarkeit**

**OBERSTE REGEL:** Alle Änderungen müssen vollständig rückverfolgbar, testbar und rückgängig machbar sein.

---

## 📌 Referenz: Bestehendes Design- & Safety-Regelwerk
Dieser Master Plan ergänzt (ersetzt nicht) das bestehende Design- und Sicherheitsregelwerk für YabuDeals:
- Technische Unantastbarkeit & Backend-Safety
- Strikter Light-Mode (Heller Hintergrund, hohes Kontrastverhältnis)
- Symmetrisches Grid-Layout & 10px-Border-Radius-Einheitsregel
- Fester Header & schlanker, einzeiliger Footer
- Symmetrische Kaufbuttons via Flex-Grow Alignment

*Jeder Agent, der diesen Plan ausführt, muss beide Regelwerke strikt beachten.*

---

## 🛑 Globale Verhaltensregeln für den KI-Agenten
- **Keine Annahmen treffen:** Wenn Informationen fehlen, dokumentieren und Rückfrage stellen.
- **Keine eigenmächtigen Änderungen:** Keine Änderungen an APIs, Datenmodellen (JSON) oder Integrationen (n8n, GitHub Actions) ohne ausdrückliche Freigabe.
- **Schritt-für-Schritt:** Änderungen in kleinen, nachvollziehbaren Schritten durchführen.
- **Risikomanagement:** Vor jeder Änderung Risiken dokumentieren.
- **Prüfpflicht:** Nach jeder Änderung automatische und manuelle Prüfungen durchführen.
- **Begründungspflicht:** Alle Entscheidungen begründen und dokumentieren.

---

## 🗂️ Projektphase 1 – Projektanalyse (Read-Only)
**Ziel:** Die Website vollständig verstehen, ohne Änderungen vorzunehmen.
**Verbot:** In dieser Phase darf KEINE Datei verändert werden.

**Aufgaben:**
- Repository analysieren
- Verzeichnisstruktur dokumentieren
- Alle HTML-, CSS-, JavaScript- und JSON-Dateien erfassen
- Alle Bilder und Assets erfassen
- Externe Bibliotheken und APIs dokumentieren
- GitHub-Workflows und n8n-Abhängigkeiten dokumentieren
- Build-Prozesse dokumentieren
- Dynamische Inhalte, Event-Listener und DOM-Manipulationen identifizieren
- Lokale Speicher (LocalStorage, SessionStorage) und Fetch-Requests dokumentieren
- Alle Datenflüsse grafisch/strukturell darstellen

**Ergebnis:** Ein vollständiger Analysebericht.

---

## 📐 Projektphase 2 – Architektur
Erstelle eine vollständige technische Dokumentation. Sie muss enthalten:
- Komponentenübersicht
- Datenflussdiagramm
- DOM-Struktur
- CSS-Architektur & JavaScript-Architektur
- API-Struktur
- Seitenstruktur & Routing
- Abhängigkeiten & Risiken

---

## 🔒 Projektphase 3 – Sicherheitsklassifizierung
Jede Datei erhält eine Sicherheitsklasse:

- **Klasse A — Darf niemals geändert werden:**
  API, JSON, n8n, GitHub Workflows, Affiliate Links, Suchfunktion, Filter, Sortierung.
- **Klasse B — Nur minimale Änderungen:**
  HTML-Struktur, Navigation, Footer, Header.
- **Klasse C — Kann vollständig optimiert werden:**
  CSS, Farben, Schatten, Animationen, Responsive Design, Abstände.

---

## 🎨 Projektphase 4 – Designanalyse
**Analysiere:**
Farben, Typografie, Buttons, Karten, Grid, Header, Footer, Navigation, Formulare, Suchfeld, Kategorien, Blog, Deals, Produktkarten.

**Bewerte:**
Konsistenz, Lesbarkeit, Symmetrie, Mobile UX, Desktop UX, Tablet UX.

---

## 📝 Projektphase 5 – Modernisierungskonzept
**Regel:** Die KI erstellt noch keinen Code, sondern ausschließlich einen Modernisierungsplan.

Für jedes Element gilt folgendes Schema:
`Aktueller Zustand` → `Probleme` → `Risiko` → `Verbesserung` → `Auswirkung` → `Begründung` → `Priorität`

---

## ✅ Projektphase 6 – Validierung
Vor jeder geplanten Änderung prüfen:
- HTML valide
- CSS valide
- JavaScript fehlerfrei
- Keine Console Errors / Warnings
- Keine toten Links, fehlenden Bilder oder fehlenden Dateien

---

## 💠 Projektphase 7 – Designsystem
Erstelle ein vollständiges Designsystem (Design Tokens/CSS Variables).
Es umfasst: Farben, Typografie, Spacing, Radius, Schatten, Animationen, Buttons, Badges, Karten, Grid, Icons, Formulare.
Alle Komponenten werden vollständig dokumentiert.

---

## 📦 Projektphase 8 – Komponenteninventar
Alle UI-Komponenten werden katalogisiert (Header, Navigation, Footer, Produktkarte, Blogkarte, Button, Badge, Input, Dropdown, Suchfeld, Pagination, Filter, Hero, Banner).

Jede Komponente erhält:
- Beschreibung
- CSS-Klassen
- HTML-Struktur
- Zustände (Hover, Active, Disabled)
- Responsive-Verhalten

---

## 🔄 Projektphase 9 – Refactoring-Plan
Die KI erstellt einen detaillierten Refactoring-Plan (**Noch kein Code**).

Schema:
`Datei` → `Problem` → `Lösung` → `Risiko` → `Abhängigkeiten` → `Reihenfolge`

---

## 💻 Projektphase 10 – Umsetzungsplan (Code Generation)
**ERST JETZT wird Code erstellt.** Dabei gilt:
1. Nur **eine Datei gleichzeitig** ändern.
2. Nach jeder Änderung Tests durchführen.
3. Erst nach bestandenen Tests mit der nächsten Datei fortfahren.
4. Jede Änderung einzeln dokumentieren.
5. Bei Fehlern sofort Rollback durchführen.

---

## 🧪 Projektphase 11 – Qualitätssicherung
Nach jeder Änderung:
- HTML & CSS validieren
- JavaScript testen
- Responsive Verhalten testen
- Lighthouse ausführen
- Accessibility prüfen
- Performance messen
- Layout auf Symmetrie vergleichen

---

## 🏁 Projektphase 12 – Abschluss
Erstelle:
- Änderungsprotokoll
- Testprotokoll
- Komponentenübersicht
- Architekturdiagramm
- Wartungsanleitung & Entwicklerhandbuch
- Benutzerhandbuch
- Roadmap für zukünftige Erweiterungen
