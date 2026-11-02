# Taschenrechner

Responsive Browser-Anwendung mit deutschen Beschriftungen ohne externe Abhängigkeiten. Node.js liefert ausschließlich statische Dateien aus; kein Backend-Dienst, Build oder Zugangsdaten nötig.

## Starten

Node.js ab Version 22 und npm werden benötigt.

```sh
cd /workspace/codex-cloud-test
npm ci
npm test
npm start
```

Standardport: 3000, über PORT konfigurierbar.

## Bedienung

- Ziffern und +, -, *, / per Tastatur oder Schaltfläche.
- Komma oder Punkt für Dezimalzahlen, Enter oder = für das Ergebnis.
- ± oder F9 wechselt das Vorzeichen.
- Rücktaste löscht eine Ziffer; AC, Escape oder Entf setzt zurück.
- Tab navigiert, Enter und Leertaste aktivieren fokussierte Schaltflächen.

Kettenrechnungen werden von links nach rechts ausgewertet, ohne Punkt-vor-Strich-Regel. Eine neue Rechenart ersetzt eine noch nicht ausgeführte Rechenart. Nach einem Ergebnis startet eine Ziffer eine neue Rechnung. Wiederholtes Gleichheitszeichen wiederholt die letzte Operation nicht.

Division durch null und zu große Ergebnisse zeigen verständliche Fehler; die nächste Eingabe beginnt neu. Eingaben sind auf 15 Ziffern begrenzt, Ergebnisse auf 15 signifikante Stellen gerundet. JavaScript-Zahlen eignen sich nicht für exakte Finanzberechnungen.

## Prüfen

npm test prüft Rechenlogik, Eingabefolgen, Fehler und HTTP-Auslieferung. Manuell im Browser prüfen: schmale und breite Fenster, Tab-Fokus, Tastatur und Touch.

## Auf GitHub Pages veröffentlichen

Der Workflow `.github/workflows/pages.yml` prüft die Anwendung und veröffentlicht nur `index.html` und `src/`. Im Repository unter **Settings → Pages → Build and deployment → Source** einmalig **GitHub Actions** wählen. Danach den Workflow **Website veröffentlichen** unter **Actions** starten (oder nach der Aktivierung auf `main` pushen).

Die erwartete Website-Adresse ist `https://nini.github.io/codex-cloud-test/`. Sie funktioniert erst nach einem erfolgreichen Pages-Deployment. Relative Dateipfade unterstützen den Projekt-Unterpfad.
