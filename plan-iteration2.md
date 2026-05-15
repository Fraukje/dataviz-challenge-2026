# Plan Iteratie 2: GitHub Pages Hosting

## Overzicht
Publieke GitHub-repository aanmaken voor `Fraukje/dataviz-challenge-2026`, alle projectbestanden committen (behalve ruwe CSV-data), en GitHub Pages inschakelen.

**Live URL na deployment:** `https://Fraukje.github.io/dataviz-challenge-2026`

---

## Wat zit er in de repository?

| Bestand / Map | In repo? | Toelichting |
|---|---|---|
| `index.html` | ✅ | De website zelf |
| `css/` | ✅ | Stijlen |
| `js/` | ✅ | Grafieken |
| `data/json/` | ✅ | Verwerkte data voor de grafieken |
| `preprocess/prepare_data.py` | ✅ | Transparantie: toont het Python-script |
| `plan-iteration1.md` | ✅ | Transparantie: toont het ontwerp- en bouwproces |
| `plan-iteration2.md` | ✅ | Dit bestand |
| `goal.txt` | ✅ | Transparantie: de originele opdrachtomschrijving |
| `Datavisualisatie_Challenge_Email.txt` | ✅ | Transparantie: originele e-mail |
| `Datavisualisatie_Challenge_Olympics.txt` | ✅ | Transparantie: bronmateriaal |
| `Datavisualisatie challenge - Olympics.pptx` | ✅ | Presentatie |
| `data/*.csv` | ❌ | Te groot; JSON-bestanden zijn al gegenereerd |

---

## Stappen

### Stap 1 — `.gitignore` aanmaken
Sluit ruwe CSV-bestanden uit:
```
data/*.csv
```

### Stap 2 — Git-repository initialiseren
```bash
git init
git add .
git commit -m "Initial commit: Vrouwen in de Olympische Spelen dashboard"
```

### Stap 3 — Repository aanmaken op GitHub.com
Handmatig op https://github.com/new:
- **Naam:** `dataviz-challenge-2026`
- **Zichtbaarheid:** Publiek
- **Geen** README / .gitignore / license toevoegen (we pushen zelf)

### Stap 4 — Remote koppelen en pushen
```bash
git remote add origin https://github.com/Fraukje/dataviz-challenge-2026.git
git branch -M main
git push -u origin main
```

### Stap 5 — GitHub Pages inschakelen
In de repo op GitHub:
**Settings → Pages → Branch: `main` → map: `/ (root)` → Save**

GitHub deployt de site automatisch. Na ~1 minuut is de URL live.

### Stap 6 — Verifiëren
Open `https://Fraukje.github.io/dataviz-challenge-2026` en scroll alle 5 secties.

---

## Beslissingen
- Repository: publiek (GitHub Pages gratis op publieke repo's)
- Naam: `dataviz-challenge-2026`
- Alle projectbestanden erbij voor volledige transparantie over het bouwproces
- Ruwe CSV-bestanden uitgesloten via `.gitignore` (te groot, JSON al gegenereerd)
