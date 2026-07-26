import os
import sys
import json
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

print("🚀 Starte automatische Sheet-Bereinigung & JSON-Aktualisierung...")

# 🔑 Secrets & Zugangsdaten aus GitHub Actions auslesen
SERVICE_ACCOUNT_JSON = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
SHEET_ID = os.getenv("GOOGLE_SHEET_ID")

if not SERVICE_ACCOUNT_JSON or not SHEET_ID:
    print("⚠️ GOOGLE_SERVICE_ACCOUNT_JSON oder GOOGLE_SHEET_ID fehlt. Überspringe Sheet-Export.")
    sys.exit(0)

try:
    creds_dict = json.loads(SERVICE_ACCOUNT_JSON)
    scopes = ["https://www.googleapis.com/auth/spreadsheets"]
    creds = Credentials.from_service_account_info(creds_dict, scopes=scopes)
    gc = gspread.authorize(creds)
    spreadsheet = gc.open_by_key(SHEET_ID)
    print("✅ Erfolgreich mit Google Sheets verbunden.")
except Exception as e:
    print(f"❌ Fehler bei der Verbindung zu Google Sheets: {e}")
    sys.exit(1)

# -------------------------------------------------------------
# 1. BEREINIGUNG VON UNVOLLSTÄNDIGEN DEALS DIREKT IM SHEET
# -------------------------------------------------------------

def clean_worksheet(worksheet_name):
    try:
        ws = spreadsheet.worksheet(worksheet_name)
        rows = ws.get_all_values()
        
        if not rows or len(rows) <= 1:
            print(f"ℹ️ Tabellenblatt '{worksheet_name}' ist leer.")
            return

        header = rows[0]
        valid_rows = [header]
        deleted_count = 0

        title_idx = -1
        price_idx = -1
        img_idx = -1

        for i, col in enumerate(header):
            col_lower = col.lower()
            if "titel" in col_lower or "title" in col_lower:
                title_idx = i
            elif "preis" in col_lower or "price" in col_lower:
                price_idx = i
            elif "bild" in col_lower or "image" in col_lower:
                img_idx = i

        for row in rows[1:]:
            title = row[title_idx].strip().lower() if title_idx != -1 and len(row) > title_idx else ""
            price = str(row[price_idx]).strip().lower() if price_idx != -1 and len(row) > price_idx else ""
            img = row[img_idx].strip() if img_idx != -1 and len(row) > img_idx else ""

            if title == "amazon produkt" or title == "" or price == "n/a" or price == "" or img == "":
                deleted_count += 1
                continue
            
            valid_rows.append(row)

        if deleted_count > 0:
            print(f"🧹 '{worksheet_name}': {deleted_count} fehlerhafte/unvollständige Deals gelöscht.")
            ws.clear()
            ws.update("A1", valid_rows)
        else:
            print(f"✨ '{worksheet_name}': Alle Deals sind vollständig & sauber.")

    except Exception as e:
        print(f"⚠️ Warnung bei Bereinigung von '{worksheet_name}': {e}")

# Beides säubern (Amazon & AliExpress Blätter)
clean_worksheet("AMZ")
clean_worksheet("Aliexpress")

# -------------------------------------------------------------
# 2. EXPORT ALLER SHEET-TABELLEN ALS KORREKTE JSON-DATEIEN
# -------------------------------------------------------------

def export_json(worksheet_name, output_filename):
    try:
        ws = spreadsheet.worksheet(worksheet_name)
        records = ws.get_all_records()
        
        # Bereinigung der String-Werte
        clean_records = []
        for r in records:
            clean_item = {}
            for k, v in r.items():
                if isinstance(v, str):
                    clean_item[k] = v.strip()
                else:
                    clean_item[k] = v
            clean_records.append(clean_item)

        with open(output_filename, "w", encoding="utf-8") as f:
            json.dump(clean_records, f, ensure_ascii=False, indent=2)
            
        print(f"📄 '{output_filename}' erfolgreich exportiert ({len(clean_records)} Einträge).")
    except Exception as e:
        print(f"⚠️ Fehler beim Export von '{output_filename}': {e}")

# Exporte ausführen
export_json("AMZ", "deals.json")
export_json("Aliexpress", "aliexpress-deals.json")
export_json("Blog", "blog-posts.json")

print("🎉 Fertig! Alle JSON-Dateien wurden sauber generiert.")
