# Speicherort im Repo: .github/workflows/build-ssr.yml
#
# Rendert die ersten 24 Deals aus den AKTUELL im Repo liegenden
# deals.json / aliexpress-deals.json statisch in index.html.
#
# Kein Python-Schritt mehr nötig (cleanup_final.py wurde gelöscht) -
# daher werden auch KEINE Secrets benötigt.

name: Build SSR Deals

on:
  push:
    branches: [main]
    paths:
      - 'deals.json'
      - 'aliexpress-deals.json'
  workflow_dispatch: {}

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Deals statisch in index.html rendern
        run: node build-ssr.js

      - name: Änderungen committen & pushen
        run: |
          git config user.name "yabudeals-bot"
          git config user.email "actions@github.com"
          git add index.html
          git diff --quiet --cached || git commit -m "chore: SSR neu gerendert [skip ci]"
          git push
