# Olympics DataViz Challenge – AI-Assisted Dashboard

An interactive data visualization dashboard exploring **gender equality in the Olympic Games (1896–2016)**, built for the HU internal Datavisualisatie Challenge.

The central theme of this project is demonstrating how AI can be used to produce a high-quality, visually compelling dashboard in a fraction of the time it would normally take.

**Live dashboard:** https://fraukje.github.io/dataviz-challenge-2026/

---

## Story: Women in the Olympics

The dashboard tells the story of women's participation in the Olympics — from near-zero representation in 1900 to 45% of all athletes in 2016 — through five narrative sections:

1. **Hero** — key headline stat
2. **The Long Road** — % female participation per year with historical milestones
3. **Breaking Barriers** — which sports first opened to women
4. **On the Map** — female medal wins by country (choropleth)
5. **The Athletes** — age and height profiles by gender over the decades
6. **Built with AI** — the meta-story: how this dashboard was made, and how long it took

---

## Tech Stack

| Layer | Tool |
|---|---|
| Visualization | [Plotly.js](https://plotly.com/javascript/) (CDN) |
| Layout & styling | HTML5 + CSS3 (scroll animations via Intersection Observer) |
| Data preprocessing | Python (`preprocess/prepare_data.py`) |
| Hosting | GitHub Pages |
| AI assistance | Claude Sonnet 4.6 (planning + code generation) + GitHub Copilot (editing) |

No frameworks, no build step — pure HTML/CSS/JS, fully AI-generated.

---

## Repository Structure

```
index.html                  # Main dashboard (single page)
css/
  styles.css                # All styles and animations
js/
  charts.js                 # Plotly.js chart definitions
data/
  athlete_events.csv        # Source data: Olympic athletes 1896–2016 (~270k rows)
  country_definitions.csv   # ISO country codes and region mapping
  json/                     # Pre-computed JSON (loaded by the browser)
    female_participation.json
    female_medals_by_country.json
    sports_female.json
    athlete_stats.json
preprocess/
  prepare_data.py           # Python script: CSV → JSON
plan.md                     # Original project plan
plan-iteration*.md          # Iteration plans per development step
ontwikkel-stappen.txt       # Chronological development log
goal.txt                    # Project goals and motivation
```

---

## How to Run Locally

No installation needed. Just open `index.html` in a browser — all dependencies load from CDN.

To regenerate the JSON data files from the source CSVs:

```bash
python preprocess/prepare_data.py
```

Requires Python 3 with `pandas`.

---

## How It Was Built

Total hands-on time: **~1.5 hours**.

| Phase | Activity | Time |
|---|---|---|
| 🗂️ Preparation | Organise data and write `goal.txt` | ~10 min |
| 🧠 Planning | Brainstorm with Claude, define constraints, tweak `plan.md` | ~25 min |
| ☕ Build | One prompt → full dashboard generated while away from keyboard | ~0 min |
| ⚡ Refinement | Language, colours, Olympic rings, hosting, this overview | ~60 min |

The goal is not just to show the end result, but to demonstrate the *speed* and *quality* achievable when AI is used as a genuine development partner — not just an autocomplete tool.

---

## Data Source

[Kaggle – 120 years of Olympic history: athletes and results](https://www.kaggle.com/datasets/heesoo37/120-years-of-olympic-history-athletes-and-results)

---

## Submission

- **Challenge**: HU internal Datavisualisatie Challenge
- **Deadline**: 1 June 2026
- **Submission method**: GitHub Pages URL posted in Teams (Power BI Community channel)
