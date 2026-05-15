# Plan Iteratie 1: Nederlandse Vertaling + Olympic Light Kleurenschema

## Overzicht
Twee onafhankelijke wijzigingen aan het Olympics-dashboard: (1) volledige vertaling naar het Nederlands van alle UI-tekst (waarbij de AI-promptvoorbeelden in het Engels blijven), en (2) vervanging van het donkerblauwe thema door een "Olympic Light"-schema (wit/lichtgrijs achtergrond, Olympic-blauw #0081C8 + goudaccenten).

---

## Fase A: Nederlandse Vertaling

### A1. index.html — UI-tekstreeksen

**Navigatiebalk:**
- "Women in the Olympics" → "Vrouwen in de Olympische Spelen"
- "Participation" → "Deelname"
- "Barriers" → "Barrières"
- "Nations" → "Landen"
- "Athletes" → "Atleten"
- "Built with AI" → "Gebouwd met AI"

**Hero-sectie:**
- "Olympic Games · Athens 1896 – Rio 2016" → "Olympische Spelen · Athene 1896 – Rio 2016"
- "The Long Road to Equality" → "De Lange Weg naar Gelijkheid"
- Lange beschrijving → Nederlandse vertaling
- "female athletes Paris 1900" → "vrouwelijke atleten Parijs 1900"
- "female athletes Rio 2016" → "vrouwelijke atleten Rio 2016"
- "Begin the story" → "Begin het verhaal"

**Sectie 01:**
- "The Long Road" → "De Lange Weg"
- Bodytekst → Nederlands

**Sectie 02:**
- "Breaking Barriers" → "Barrières Doorbreken"
- Bodytekst → Nederlands

**Sectie 03:**
- "On the Map" → "Op de Kaart"
- Bodytekst → Nederlands

**Sectie 04:**
- "The Athletes" → "De Atleten"
- Bodytekst → Nederlands

**Sectie 05 (Gebouwd met AI):**
- Koppen en beschrijvende tekst → Nederlands
- Fasekoppen: "Phase 1 — Data Exploration" → "Fase 1 — Data-verkenning", etc.
- Tijdschattingen: "~10 minutes" → "~10 minuten"
- "The Result" → "Het Resultaat"
- Bodytekst → Nederlands
- **BEHOUD ENGELS**: de 3 "Prompt used:"-codevoorbeelden (beslissing gebruiker)

**Footer:**
- "Built by" → "Gebouwd door"
- "with" → "met"
- "Olympic Games 1896–2016" → "Olympische Spelen 1896–2016"
- Behoud: "Maven Analytics", "Fraukje Coopmans", "GitHub Copilot", "HU Datavisualisatie Challenge 2026" (eigennamen)

### A2. js/charts.js — Grafiektekstreeksen

**Mijlpaal-annotaties (deelname-lijngrafiek):**
- "Women first compete" → "Vrouwen doen voor het eerst mee"
- "Women's athletics debut" → "Debuut vrouwenatletiek"
- "Women's marathon added" → "Marathon voor vrouwen toegevoegd"
- "All nations field female athletes" → "Alle landen sturen vrouwelijke atleten"

**Astitels:**
- "Olympic Year" → "Olympisch jaar"
- "% Female Athletes" → "% Vrouwelijke atleten"
- "Year" → "Jaar"
- "Average age (years)" → "Gemiddelde leeftijd (jaren)"
- "Average height (cm)" → "Gemiddelde lengte (cm)"

**Tooltips:**
- "Female share: <b>%{y}%</b>" → "Vrouwenaandeel: <b>%{y}%</b>"
- "Female athletes: %{customdata[1]:,}" → "Vrouwelijke atleten: %{customdata[1]:,}"
- "Total athletes: %{customdata[0]:,}" → "Totaal atleten: %{customdata[0]:,}"
- "%{x} Olympics" → "%{x} Olympische Spelen"
- "Men avg age: <b>%{y}</b>" → "Gem. leeftijd mannen: <b>%{y}</b>"
- "Women avg age: <b>%{y}</b>" → "Gem. leeftijd vrouwen: <b>%{y}</b>"

**Kleurenbalk / legenda-titels:**
- "% Female\n(recent Games)" → "% Vrouwen\n(recente Spelen)"
- "Female medals\nwon (all time)" → "Vrouwelijke medailles\n(alltime)"
- "Total female medals: ..." → "Totaal vrouwelijke medailles: ..."
- "Women first competed: <b>%{x}</b>" → "Vrouwen deden eerst mee in: <b>%{x}</b>"
- "Female athletes (recent): %{text}" → "Vrouwelijke atleten (recent): %{text}"
- "% Female: %{marker.color}%" → "% Vrouwen: %{marker.color}%"

**Grafiektitels en legenda:**
- "Average Age of Athletes" → "Gemiddelde leeftijd van atleten"
- "Average Height of Athletes" → "Gemiddelde lengte van atleten"
- "Men" → "Mannen"
- "Women" → "Vrouwen"

---

## Fase B: Olympic Light Kleurenschema

### B1. css/styles.css — CSS-variabelen herzien

| Variabele | Donker (huidig) | Licht (nieuw) |
|-----------|-----------------|---------------|
| `--bg` | `#08101E` | `#F5F7FA` |
| `--bg-alt` | `#0D1A2D` | `#EAF0F8` |
| `--bg-card` | `#111F33` | `#FFFFFF` |
| `--border` | `rgba(255,215,0,0.15)` | `rgba(0,129,200,0.2)` |
| `--gold` | `#FFD700` | `#D4A500` (donkerder voor leesbaarheid op licht achtergrond) |
| `--gold-dim` | `rgba(255,215,0,0.6)` | `rgba(212,165,0,0.6)` |
| `--silver` | `#C0C0C0` | `#8A9AB8` |
| `--blue-accent` | `#4A9EFF` | `#0081C8` (klassiek Olympic-blauw) |
| `--text` | `#E8EFF8` | `#1A2C4E` (donker marineblauw) |
| `--text-muted` | `#8A9AB8` | `#5C6E8A` |

**Overige updates:**
- Hero-achtergrondradialen: donkerblauwe kleurverloop vervangen door wit → lichtblauw + zachte gouden/blauwe gloed
- Voortgangsbalk: goud→oranje behouden (goed contrast op lichte achtergrond)
- Navigatie-achtergrond: `rgba(245,247,250,0.95)` (licht, mat)
- Navigatiemerk + links: `#0081C8` (Olympic-blauw) in plaats van goud
- Randaccenten: `rgba(0,129,200,0.x)` in plaats van goud-opaciteitsvarianten
- Hover-vullingen: `rgba(0,129,200,0.06)` in plaats van goud-opaciteit
- Rasterlijnen in grafieken: `rgba(0,0,0,0.06)` (subtiele donkere lijnen op witte achtergrond)
- Sectienummerkleur: `#0081C8` in plaats van goud
- Grafiekcontainer-schaduwen: zacht `box-shadow: 0 2px 16px rgba(0,81,120,0.08)`

### B2. js/charts.js — Grafiek-kleurconstanten en -schalen

**Kleurobject `C`:**
- `bg`: `'#FFFFFF'`
- `text`: `'#1A2C4E'`
- `muted`: `'#5C6E8A'`
- `border`: `'rgba(0,129,200,0.2)'`
- `gold`: `'#D4A500'`
- `blue`: `'#0081C8'`
- `silver`: `'#8A9AB8'` (ongewijzigd)

**Bellendiagram sporten (kleurschaal blauw naar goud op witte achtergrond):**
```
[0,    '#BFD9F0']  // lichtblauw
[0.3,  '#0081C8']  // Olympic-blauw
[0.65, '#C8860A']  // amber
[1,    '#D4A500']  // rijk goud
```

**Choropleth-kaart kleurschaal:**
```
[0,    '#F0F5FA']  // bijna wit
[0.01, '#D9E8F5']  // zeer lichtblauw
[0.12, '#7BBDE0']  // middenblauw
[0.45, '#0081C8']  // Olympic-blauw
[1,    '#D4A500']  // goud
```

**Plotly-layout `paper_bgcolor` en `plot_bgcolor`:** wijzigen naar `'#FFFFFF'` / `'#F5F7FA'`

**Lettertype/as/rasterlijnen:** alle grafieklettertypekleuren → `C.text` (`#1A2C4E`), rasterkleur → `rgba(0,0,0,0.06)`

---

## Te wijzigen bestanden

- `index.html` — alle UI-tekst (Fase A1)
- `css/styles.css` — volledig kleurthema (Fase B1)
- `js/charts.js` — grafiektekstreeksen (Fase A2) + kleurconstanten en kleurschalen (Fase B2)

---

## Verificatie

1. Lokaal openen via server (`python -m http.server 8000`) en alle 5 secties controleren
2. Bevestigen dat er geen Engelse UI-tekst meer aanwezig is (behalve de 3 AI-promptcodeblokken)
3. Controleren of grafiek-tooltips, astitels en legendavermeldingen in het Nederlands zijn
4. Controleren op leesbaarheid kleurcontrast (donkerblauwe tekst op witte achtergrond)
5. Navigatiebalk, hero, kaarten en grafiekachtergronden moeten het lichte thema tonen
6. Kleurschalen in grafieken zijn geschikt voor lichte achtergrond (geen donkerblauwe vlekken)

---

## Beslissingen
- AI-promptcodevoorbeelden (3 "Prompt used:"-blokken) blijven in het Engels
- Eigennamen ongewijzigd: "Maven Analytics", "Fraukje Coopmans", "GitHub Copilot", "HU Datavisualisatie Challenge 2026"
- Olympic Light-schema gekozen: witte/lichtgrijze achtergrond, #0081C8 Olympic-blauw + aangepast goud (#D4A500 voor contrast)
- Goud aangepast van #FFD700 naar #D4A500 omdat felgeel moeilijk leesbaar is op witte achtergronden
