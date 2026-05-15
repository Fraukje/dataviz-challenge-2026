# Plan Iteratie 3: Olympisch Gevoel — Visuele Verbeteringen

## Overzicht
Vier visuele elementen die de site herkenbaar Olympisch maken. De vijf officiële ringkleuren vormen de rode draad:

| Ring | Kleur | Hex |
|---|---|---|
| Blauw | Sectie 01 / Ring 1 | `#0085C7` |
| Geel | Sectie 02 / Ring 2 | `#F4C300` |
| Zwart | Sectie 03 / Ring 3 | `#1A2C4E` |
| Groen | Sectie 04 / Ring 4 | `#009F6B` |
| Rood | Sectie 05 / Ring 5 | `#DF0024` |

---

## Element 1 — Vijf-ringen logo in de navigatiebalk
Inline SVG van de vijf interlocked ringen (44×27px) links van de merknaam in de nav. `.nav-brand` krijgt `display: flex` zodat het SVG-logo en de tekst netjes naast elkaar staan.

**Wijzigingen:**
- `index.html`: SVG toevoegen vóór de merknaam-tekst in `.nav-brand`
- `css/styles.css`: `.nav-brand` uitbreiden met flex-layout, `.nav-rings` toevoegen

---

## Element 2 — Sectienummers als gekleurde ringcirkels
Elk sectienummer wordt een cirkelvormige badge in de kleur van één olympische ring:
- `01` → blauw `#0085C7` (witte tekst)
- `02` → geel `#F4C300` (donkere tekst)
- `03` → donker `#1A2C4E` (witte tekst)
- `04` → groen `#009F6B` (witte tekst)
- `05` → rood `#DF0024` (witte tekst)

**Wijzigingen:**
- `index.html`: `data-ring="1"` t/m `data-ring="5"` op elke `.section-number` span
- `css/styles.css`: `.section-number` wordt een inline-flex cirkel (36×36px), kleurvarianten via `[data-ring]`

---

## Element 3 — Ringen-watermerk in de hero
Vijf grote overlappende ringen (stroke-only, 8% opaciteit) als sfeervol achtergrondwatermerk onderin de hero. Pointer-events uitgeschakeld zodat het de interactiviteit niet hindert.

**Wijziging:**
- `index.html`: inline SVG toegevoegd aan `.hero-bg`
- `css/styles.css`: `.hero-rings-watermark` stijlregel toegevoegd

---

## Element 4 — Vijfkleurige sectieverdelers
Een 4px hoog lint van vijf gelijke gekleurde segmenten als visuele overgang vóór elke content-sectie.

**Wijzigingen:**
- `index.html`: `<div class="rings-divider"></div>` vóór elke van de vijf content-secties
- `css/styles.css`: `.rings-divider` stijlregel met vijfkleurige `linear-gradient`

---

## Gewijzigde bestanden
- `index.html`
- `css/styles.css`

## Verificatie
1. Nav: vijf gekleurde ringen zichtbaar links van de merknaam
2. Secties: elk sectienummer heeft zijn eigen ringkleur als cirkel-badge
3. Hero: vage ringcontour zichtbaar als watermerk op de achtergrond
4. Tussen secties: vijfkleurig lint zichtbaar als overgang
5. Mobiel (≤768px): nav-ringen krimpen mee, geen overflow
