import os
import requests
import time

# 🔐 API Token sicher aus den GitHub Secrets laden
API_TOKEN = os.getenv("CF_API_TOKEN")

# Prüfung: Bricht ab, wenn das Secret fehlt
if not API_TOKEN:
    print("❌ FEHLER: Das Secret 'CF_API_TOKEN' wurde nicht gefunden oder ist leer!")
    print("Bitte erstelle 'CF_API_TOKEN' unter Settings -> Secrets and variables -> Actions in deinem GitHub Repo.")
    exit(1)

ACCOUNT_ID = "3acbd681eee777bf83a5d0779ef47886"
PROJECT_NAME = "yabudeals"
KEEP_LATEST = 10

BASE_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects/{PROJECT_NAME}/deployments"
HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}

def get_all_deployments():
    """Holt alle Deployments ab."""
    deployments = []
    page = 1
    per_page = 25
    
    print("Lade Cloudflare Deployments...")
    while True:
        try:
            params = {"page": page, "per_page": per_page}
            response = requests.get(BASE_URL, headers=HEADERS, params=params, timeout=30)
            
            if response.status_code != 200:
                print(f"Fehler beim Abrufen: Status {response.status_code}")
                break
            
            data = response.json()
            if not data.get("success"):
                print(f"Cloudflare API Fehler: {data.get('errors')}")
                break
            
            result = data.get("result", [])
            if not result:
                break
            
            deployments.extend(result)
            if len(result) < per_page:
                break
            page += 1
            time.sleep(0.3)
        except Exception as e:
            print(f"Netzwerk/API Fehler: {e}")
            break
            
    return deployments

def delete_deployment(deployment_id):
    """Löscht ein einzelnes Deployment."""
    url = f"{BASE_URL}/{deployment_id}"
    try:
        response = requests.delete(url, headers=HEADERS, timeout=30)
        if response.status_code == 200:
            return response.json().get("success", False)
        return False
    except Exception:
        return False

def main():
    print("=" * 60)
    print("Cloudflare Pages Deployment Cleanup (Automated)")
    print("=" * 60)
    
    deployments = get_all_deployments()
    total = len(deployments)
    print(f"Gesamt gefunden: {total} Deployments")
    
    if total <= KEEP_LATEST:
        print(f"Nur {total} Deployments vorhanden. Nichts zu löschen.")
        return
    
    # Sortiere nach Erstellungsdatum (neueste zuerst)
    deployments.sort(key=lambda x: x.get("created_on", ""), reverse=True)
    to_delete = deployments[KEEP_LATEST:]
    
    print(f"Behalte: {KEEP_LATEST} neueste | Lösche: {len(to_delete)} alte")
    print("=" * 60)
    
    deleted = 0
    failed = 0
    
    for i, dep in enumerate(to_delete, 1):
        dep_id = dep["id"]
        dep_env = dep.get("environment", "unknown")
        dep_date = dep.get("created_on", "unknown")[:19]
        
        print(f"[{i}/{len(to_delete)}] Lösche {dep_id[:12]}... ({dep_env}, {dep_date})", end=" ")
        
        if delete_deployment(dep_id):
            print("✅")
            deleted += 1
        else:
            print("❌")
            failed += 1
            
        time.sleep(0.25)
        
    print("=" * 60)
    print(f"FERTIG! Gelöscht: {deleted}, Fehler: {failed}")
    print("=" * 60)

if __name__ == "__main__":
    main()
