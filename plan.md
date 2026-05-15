# Plan: Olympics DataViz Challenge – AI-Assisted HTML + Plotly.js Dashboard

## Context
- **Challenge**: HU internal Datavisualisatie Challenge
- **Dataset**: Olympic Games 1896–2016 (athlete-level rows per event)
- **Deadline**: 1 June 2026, 17:00
- **Goal**: Demonstrate AI speed + quality in data viz, with the process documented
- **Tool**: HTML + Plotly.js, hosted on GitHub Pages (username: Fraukje)
- **Story angle**: Gender Equality in the Olympics — women's journey from 1900 to 2016
- **Submission confirmed**: Non-Power BI submission (GitHub Pages URL) approved

## Dashboard Narrative Structure
1. **Hero section** — bold title + key stat ("From 0% to 45% female athletes in 120 years")
2. **The Long Road** — line chart of % female participation per year, annotated milestones
3. **Breaking Barriers** — which sports opened to women first? Heatmap or stacked bar
4. **On the Map** — choropleth map of female medal wins by country
5. **The Athletes** — age/height profile changes over decades by gender
6. **Built with AI** — meta-section: prompts used, time saved

## Phases

### Phase 1 — Setup (Day 1, ~30 min)
1. Create public GitHub repo: `olympics-dataviz-challenge` under user `Fraukje`
2. Enable GitHub Pages (Settings → Pages → `main` branch)
3. Create `index.html` with Plotly.js CDN — Copilot scaffolds the skeleton
4. Verify: `https://fraukje.github.io/olympics-dataviz-challenge`

### Phase 2 — Data Preparation with AI (Day 1–2, ~2 hours)
5. Copilot-generated Python script: preprocess CSVs → lightweight JSON files
6. Pre-compute: % female per year, medals by country/year, sports by female participation, athlete stats by gender
7. Document: prompts used + time taken

### Phase 3 — Design (Day 2–3, ~2 hours)
8. Scrollytelling layout — charts animate into view on scroll
9. Copilot generates HTML/CSS layout from narrative outline
10. Color theme: navy `#002868`, gold `#FFD700`, silver `#C0C0C0`, white

### Phase 4 — Build (Days 3–13)
11. One Copilot session per chart section
12. Describe chart → Copilot generates Plotly.js config → verify
13. CSS animations via Intersection Observer
14. Running AI log: prompt → quality → minutes taken
15. Commit to GitHub after each section

### Phase 5 — Polish (Days 13–16)
16. Consistent color theme
17. Mobile-responsive CSS (Copilot-generated)
18. "Built with AI" panel with process documentation
19. Final check on GitHub Pages (desktop + mobile)

### Phase 6 — Submit (by June 1, 17:00)
20. Screenshots of each section
21. Post in Teams: Power BI Community → Datavisualisatie Challenge + GitHub Pages URL

## Key Technical Considerations
- Pre-compute all data to small JSON files — raw CSV (~270k rows) is too large for the browser
- Pure HTML + Plotly.js CDN — no framework, fully Copilot-friendly
- Document prompts and timestamps live — the AI log is the meta-story
- Commit after every section — the commit history tells the speed story

## GitHub
- **Username**: Fraukje
- **Repo**: olympics-dataviz-challenge
- **Live URL**: https://fraukje.github.io/olympics-dataviz-challenge