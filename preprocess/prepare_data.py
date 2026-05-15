"""
prepare_data.py
Converts the Olympics CSV files into lightweight JSON files for the dashboard.

Run from the project root:
    python preprocess/prepare_data.py
"""

import os, json
import pandas as pd
import numpy as np

# ── Paths ──────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
JSON_DIR = os.path.join(DATA_DIR, 'json')
os.makedirs(JSON_DIR, exist_ok=True)


# ── JSON encoder that handles numpy / pandas NA types ──────────────────────
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):  return int(obj)
        if isinstance(obj, np.floating): return None if np.isnan(obj) else round(float(obj), 2)
        if isinstance(obj, np.ndarray):  return obj.tolist()
        if pd.isna(obj):                 return None
        return super().default(obj)


def save(data, filename):
    path = os.path.join(JSON_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=NpEncoder, ensure_ascii=False, separators=(',', ':'))
    kb = os.path.getsize(path) / 1024
    print(f"  ✓ {filename}  ({kb:.1f} KB)")


# ── Load data ──────────────────────────────────────────────────────────────
print("Loading data…")
df  = pd.read_csv(os.path.join(DATA_DIR, 'athlete_events.csv'))
noc = pd.read_csv(os.path.join(DATA_DIR, 'country_definitions.csv'))
print(f"  {len(df):,} rows · {df['ID'].nunique():,} unique athletes · {df['Year'].nunique()} editions\n")

summer = df[df['Season'] == 'Summer'].copy()


# ── 1. Female participation per year (Summer Olympics) ────────────────────
print("1. Female participation per year…")
athletes = summer.drop_duplicates(['ID', 'Year'])
participation = []
for year, g in athletes.groupby('Year'):
    total  = len(g)
    female = int((g['Sex'] == 'F').sum())
    participation.append({
        'year':       int(year),
        'total':      int(total),
        'female':     female,
        'pct_female': round(female / total * 100, 1)
    })
save(participation, 'female_participation.json')


# ── 2. Female medals by country (all time, all seasons) ───────────────────
print("2. Female medals by country…")
medals = df[(df['Medal'].notna()) & (df['Sex'] == 'F')].copy()
medals = medals.merge(noc[['NOC', 'region']], on='NOC', how='left')
medals = medals[medals['region'].notna()]
medal_rows = []
for country, g in medals.groupby('region'):
    medal_rows.append({
        'country': str(country),
        'total':   int(len(g)),
        'gold':    int((g['Medal'] == 'Gold').sum()),
        'silver':  int((g['Medal'] == 'Silver').sum()),
        'bronze':  int((g['Medal'] == 'Bronze').sum())
    })
medal_rows.sort(key=lambda r: r['total'], reverse=True)
save(medal_rows, 'female_medals_by_country.json')


# ── 3. Sports opening to women (Summer Olympics) ──────────────────────────
print("3. Sports opening to women…")
summer_athletes = summer.drop_duplicates(['ID', 'Year', 'Sport'])
first_year = (
    summer_athletes[summer_athletes['Sex'] == 'F']
    .groupby('Sport')['Year'].min()
    .reset_index()
    .rename(columns={'Year': 'first_year'})
)
sport_rows = []
for _, row in first_year.iterrows():
    sport      = row['Sport']
    sport_data = summer_athletes[summer_athletes['Sport'] == sport]
    last_year  = int(sport_data['Year'].max())
    last_data  = sport_data[sport_data['Year'] == last_year]
    total      = len(last_data)
    n_female   = int((last_data['Sex'] == 'F').sum())
    pct_female = round(n_female / total * 100, 1) if total > 0 else 0
    sport_rows.append({
        'sport':      sport,
        'first_year': int(row['first_year']),
        'last_year':  last_year,
        'pct_female': pct_female,
        'n_female':   n_female,
        'n_total':    int(total)
    })
sport_rows.sort(key=lambda r: r['first_year'])
save(sport_rows, 'sports_female.json')


# ── 4. Athlete stats by gender over time (Summer Olympics) ────────────────
print("4. Athlete stats by gender…")
stats = (
    summer.drop_duplicates(['ID', 'Year'])
    .groupby(['Year', 'Sex'])
    .agg(avg_age=('Age', 'mean'), avg_height=('Height', 'mean'),
         avg_weight=('Weight', 'mean'), count=('ID', 'count'))
    .round(1)
    .reset_index()
)
stat_rows = []
for _, row in stats.iterrows():
    stat_rows.append({
        'year':       int(row['Year']),
        'sex':        row['Sex'],
        'avg_age':    None if pd.isna(row['avg_age'])    else round(float(row['avg_age']), 1),
        'avg_height': None if pd.isna(row['avg_height']) else round(float(row['avg_height']), 1),
        'avg_weight': None if pd.isna(row['avg_weight']) else round(float(row['avg_weight']), 1),
        'count':      int(row['count'])
    })
save(stat_rows, 'athlete_stats.json')

print(f"\n✅  All done – JSON files written to: {JSON_DIR}")
