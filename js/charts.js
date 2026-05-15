'use strict';

// ── Common Plotly theme ───────────────────────────────────────────────────
const C = {
  gold:    '#D4A500',
  silver:  '#8A9AB8',
  blue:    '#0081C8',
  bg:      '#FFFFFF',
  text:    '#1A2C4E',
  muted:   '#5C6E8A',
  border:  'rgba(0,129,200,0.2)'
};

const baseLayout = {
  paper_bgcolor: C.bg,
  plot_bgcolor:  '#F5F7FA',
  font:   { family: 'Inter, sans-serif', color: C.text, size: 12 },
  margin: { t: 24, r: 24, b: 52, l: 64 },
  legend: { font: { color: C.text }, bgcolor: 'rgba(0,0,0,0)', orientation: 'h', y: 1.1 },
  hoverlabel: { bgcolor: '#FFFFFF', bordercolor: C.blue, font: { color: C.text, size: 12 } }
};

const baseAxis = {
  gridcolor:     'rgba(0,0,0,0.06)',
  linecolor:     'rgba(0,0,0,0.12)',
  tickcolor:     'rgba(0,0,0,0.15)',
  tickfont:      { color: C.muted, size: 11 },
  titlefont:     { color: C.muted, size: 12 },
  zerolinecolor: 'rgba(0,0,0,0.1)'
};

const cfg = { responsive: true, displayModeBar: false };

// ── Key milestones for participation chart ────────────────────────────────
const MILESTONES = [
  { year: 1900, label: 'Vrouwen doen<br>voor het eerst mee' },
  { year: 1928, label: 'Debuut<br>vrouwenatletiek' },
  { year: 1984, label: 'Marathon voor<br>vrouwen toegevoegd' },
  { year: 2012, label: 'Alle landen sturen<br>vrouwelijke atleten' }
];


// ── 1. Female participation line chart ────────────────────────────────────
function renderParticipation(data) {
  const annotations = MILESTONES.map(m => {
    const pt   = data.find(d => d.year === m.year);
    const yVal = pt ? pt.pct_female : 1;
    return {
      x: m.year, y: yVal,
      xref: 'x', yref: 'y',
      text: m.label,
      showarrow: true,
      arrowhead: 2, arrowcolor: C.blue, arrowwidth: 1,
      font: { color: C.blue, size: 10 },
      ax: 0, ay: -52,
      bgcolor: 'rgba(245,247,250,0.95)',
      bordercolor: 'rgba(0,129,200,0.4)',
      borderwidth: 1, borderpad: 6,
      align: 'center'
    };
  });

  const shapes = MILESTONES.map(m => ({
    type: 'line',
    x0: m.year, x1: m.year, y0: 0, y1: 1,
    xref: 'x', yref: 'paper',
    line: { color: 'rgba(0,129,200,0.2)', width: 1, dash: 'dot' }
  }));

  Plotly.newPlot('chart-participation', [{
    x: data.map(d => d.year),
    y: data.map(d => d.pct_female),
    type: 'scatter', mode: 'lines+markers',
    fill: 'tozeroy', fillcolor: 'rgba(0,129,200,0.07)',
    line:   { color: C.blue, width: 2.5, shape: 'spline' },
    marker: { color: C.blue, size: 5 },
    customdata: data.map(d => [d.total, d.female]),
    hovertemplate:
      '<b>%{x} Olympische Spelen</b><br>' +
      'Vrouwenaandeel: <b>%{y}%</b><br>' +
      'Vrouwelijke atleten: %{customdata[1]:,}<br>' +
      'Totaal atleten: %{customdata[0]:,}' +
      '<extra></extra>'
  }], {
    ...baseLayout,
    height: 430,
    xaxis: { ...baseAxis, title: 'Olympisch jaar', dtick: 8 },
    yaxis: { ...baseAxis, title: '% Vrouwelijke atleten', range: [0, 52], ticksuffix: '%' },
    annotations,
    shapes
  }, cfg);
}


// ── 2. Sports opening to women (bubble chart) ─────────────────────────────
function renderSports(data) {
  const d = data.filter(r => r.n_female >= 3);

  Plotly.newPlot('chart-sports', [{
    x: d.map(r => r.first_year),
    y: d.map(r => r.sport),
    mode: 'markers',
    type: 'scatter',
    marker: {
      size:  d.map(r => Math.max(8, Math.min(36, r.n_female / 4))),
      color: d.map(r => r.pct_female),
      colorscale: [
        [0,    '#BFD9F0'],
        [0.3,  '#0081C8'],
        [0.65, '#C8860A'],
        [1,    '#D4A500']
      ],
      showscale: true,
      colorbar: {
        title: '% Vrouwen<br>(recente Spelen)',
        titlefont: { color: C.muted, size: 11 },
        tickfont:  { color: C.muted, size: 10 },
        ticksuffix: '%', thickness: 14
      },
      line: { color: 'rgba(0,0,0,0.08)', width: 0.5 }
    },
    text: d.map(r => r.n_female),
    hovertemplate:
      '<b>%{y}</b><br>' +
      'Vrouwen deden eerst mee in: <b>%{x}</b><br>' +
      'Vrouwelijke atleten (recent): %{text}<br>' +
      '% Vrouwen: %{marker.color}%' +
      '<extra></extra>'
  }], {
    ...baseLayout,
    height: Math.max(520, d.length * 22 + 80),
    margin: { t: 24, r: 120, b: 52, l: 180 },
    xaxis: { ...baseAxis, title: 'Jaar eerste deelname vrouwen', range: [1888, 2020] },
    yaxis: { ...baseAxis, autorange: 'reversed', tickfont: { color: C.muted, size: 10 } }
  }, cfg);
}


// ── 3. Choropleth map ─────────────────────────────────────────────────────
function renderMap(data) {
  Plotly.newPlot('chart-map', [{
    type: 'choropleth',
    locationmode: 'country names',
    locations: data.map(d => d.country),
    z: data.map(d => d.total),
    text: data.map(d =>
      `<b>${d.country}</b><br>` +
      `Totaal vrouwelijke medailles: ${d.total.toLocaleString()}<br>` +
      `🥇 ${d.gold} · 🥈 ${d.silver} · 🥉 ${d.bronze}`
    ),
    hovertemplate: '%{text}<extra></extra>',
    colorscale: [
      [0,    '#F0F5FA'],
      [0.01, '#D9E8F5'],
      [0.12, '#7BBDE0'],
      [0.45, '#0081C8'],
      [1,    '#D4A500']
    ],
    showscale: true,
    colorbar: {
      title: 'Vrouwelijke medailles<br>(alltime)',
      titlefont: { color: C.muted, size: 11 },
      tickfont:  { color: C.muted, size: 10 },
      thickness: 14
    },
    zmin: 0
  }], {
    ...baseLayout,
    height: 480,
    margin: { t: 0, r: 0, b: 0, l: 0 },
    geo: {
      projection:     { type: 'natural earth' },
      showframe:      false,
      showcoastlines: true,
      coastlinecolor: '#A0B8CC',
      showland:       true,
      landcolor:      '#EAF0F8',
      showocean:      true,
      oceancolor:     '#D9E8F5',
      showlakes:      true,
      lakecolor:      '#D9E8F5',
      bgcolor:        C.bg
    }
  }, cfg);
}


// ── 4. Athlete stats (age + height) ───────────────────────────────────────
function renderAthleteCharts(data) {
  const male   = data.filter(d => d.sex === 'M');
  const female = data.filter(d => d.sex === 'F');

  const maleTrace   = (field, name) => ({
    x: male.map(d => d.year),
    y: male.map(d => d[field]),
    name: 'Mannen', type: 'scatter', mode: 'lines',
    line: { color: C.blue, width: 2.5, shape: 'spline' },
    connectgaps: true,
    hovertemplate: `<b>%{x}</b> · Gem. ${name} mannen: <b>%{y}</b><extra></extra>`
  });

  const femaleTrace = (field, name) => ({
    x: female.map(d => d.year),
    y: female.map(d => d[field]),
    name: 'Vrouwen', type: 'scatter', mode: 'lines',
    line: { color: C.gold, width: 2.5, shape: 'spline' },
    connectgaps: true,
    hovertemplate: `<b>%{x}</b> · Gem. ${name} vrouwen: <b>%{y}</b><extra></extra>`
  });

  Plotly.newPlot('chart-age', [maleTrace('avg_age', 'leeftijd'), femaleTrace('avg_age', 'leeftijd')], {
    ...baseLayout,
    height: 360,
    title: { text: 'Gemiddelde leeftijd van atleten', font: { color: C.text, size: 14, family: 'Oswald, sans-serif' } },
    xaxis: { ...baseAxis, title: 'Jaar' },
    yaxis: { ...baseAxis, title: 'Gemiddelde leeftijd (jaren)' }
  }, cfg);

  Plotly.newPlot('chart-height', [maleTrace('avg_height', 'lengte'), femaleTrace('avg_height', 'lengte')], {
    ...baseLayout,
    height: 360,
    title: { text: 'Gemiddelde lengte van atleten', font: { color: C.text, size: 14, family: 'Oswald, sans-serif' } },
    xaxis: { ...baseAxis, title: 'Jaar' },
    yaxis: { ...baseAxis, title: 'Gemiddelde lengte (cm)' }
  }, cfg);
}


// ── Scroll progress bar ───────────────────────────────────────────────────
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });
}


// ── Intersection Observer for scroll animations ───────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
}


// ── Load data & render all charts ─────────────────────────────────────────
async function loadAndRender() {
  const BASE = 'data/json/';

  // Show file:// warning for local development without a server
  if (location.protocol === 'file:') {
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="position:fixed;top:63px;left:0;right:0;background:#7B2000;color:#fff;' +
      'padding:12px 24px;z-index:9999;font-size:13px;text-align:center">' +
      '&#9888; Charts require a local server. Run: <code>python -m http.server 8000</code> ' +
      'then open <a href="http://localhost:8000" style="color:#FFD700">localhost:8000</a></div>'
    );
    return;
  }

  try {
    const [participation, medals, sports, stats] = await Promise.all([
      fetch(BASE + 'female_participation.json').then(r => r.json()),
      fetch(BASE + 'female_medals_by_country.json').then(r => r.json()),
      fetch(BASE + 'sports_female.json').then(r => r.json()),
      fetch(BASE + 'athlete_stats.json').then(r => r.json())
    ]);

    renderParticipation(participation);
    renderSports(sports);
    renderMap(medals);
    renderAthleteCharts(stats);
  } catch (err) {
    console.error('Failed to load data:', err);
  }
}


// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initScrollAnimations();
  loadAndRender();
});
