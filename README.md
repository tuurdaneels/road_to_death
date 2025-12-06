# 🍺 Kroegentocht Webapp

Een moderne webapplicatie voor het beheren van een kroegentocht met 3 teams en 6 zones.

## Functies

- **3 Teams** met elk een eigen startzone:
  - Team A start in Zone 1 (Grote Markt)
  - Team B start in Zone 2 (Torfbrug)
  - Team C start in Zone 3 (Kortekoekpoort)

- **6 Zones** met cafés en opdrachten:
  - Zone 1: Grote Markt
  - Zone 2: Torfbrug
  - Zone 3: Kortekoekpoort
  - Zone 4: Ossemarkt
  - Zone 5: Mechelsplein
  - Zone 6: Zuid

- **Zone Progression**: Teams kunnen alleen naar de volgende zone wanneer alle opdrachten in de huidige zone zijn voltooid

- **Progress Tracking**: Voortgang wordt opgeslagen in localStorage (persistent tussen sessies)

- **Mobiel-vriendelijk**: Responsive design met Tailwind CSS

## Technologie Stack

- **React 18** met TypeScript
- **Vite** (build tool)
- **React Router** (routing)
- **Tailwind CSS** (styling)

## Installatie

1. **Installeer dependencies:**
   ```bash
   npm install
   ```

2. **Start de development server:**
   ```bash
   npm run dev
   ```

3. **Open de applicatie:**
   Navigeer naar [http://localhost:5173](http://localhost:5173) (of de poort die Vite aangeeft)

## Gebruik

### Startpagina
De hoofdpagina toont drie knoppen voor de teams. Klik op een team om te beginnen.

### Team Links
Elk team heeft een eigen URL:
- **Team A**: `/teamA`
- **Team B**: `/teamB`
- **Team C**: `/teamC`

### Zone Voltooiing
1. Elk café heeft een checkbox
2. Vink cafés af wanneer de opdracht is voltooid
3. Wanneer alle cafés in een zone zijn voltooid, verschijnt de "Volgende Zone" knop
4. Klik op "Volgende Zone" om door te gaan naar de volgende zone in de volgorde

### Zone Volgorde per Team

Elk team doorloopt alle 6 zones, maar in een andere volgorde:

**Team A**: Zone 1 → Zone 2 → Zone 3 → Zone 4 → Zone 5 → Zone 6
**Team B**: Zone 2 → Zone 3 → Zone 4 → Zone 5 → Zone 6 → Zone 1
**Team C**: Zone 3 → Zone 4 → Zone 5 → Zone 6 → Zone 1 → Zone 2

## Project Structuur

```
├── src/
│   ├── components/
│   │   └── ZoneDisplay.tsx          # Zone weergave component
│   ├── pages/
│   │   ├── HomePage.tsx              # Startpagina
│   │   └── TeamPage.tsx              # Team pagina
│   ├── hooks/
│   │   └── useTeamProgress.ts        # Custom hook voor team progress
│   ├── data/
│   │   └── zones.ts                  # Zones data en configuratie
│   ├── App.tsx                       # Main app component met routing
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuratie
└── package.json
```

## State Management

De applicatie gebruikt React hooks en localStorage voor state management:

- **useTeamProgress**: Custom hook die team progress beheert
- **localStorage**: Voortgang wordt opgeslagen in de browser (persistent)
- **React Router**: Client-side routing tussen pagina's

## Veiligheid

- Zone progressie wordt client-side gecontroleerd via React state
- Teams kunnen niet naar willekeurige zones springen - de volgorde wordt bepaald door de `getZoneOrderForTeam` functie
- Elke zone moet volledig voltooid zijn voordat de volgende zone beschikbaar is
- Voortgang wordt gevalideerd voordat een zone als compleet wordt gemarkeerd

## Data Opslag

Voortgang wordt opgeslagen in **localStorage**:
- ✅ Data blijft behouden tussen browser sessies
- ✅ Data is per team gescheiden
- ✅ Data wordt automatisch geladen bij het openen van een team pagina

Om de voortgang te resetten, verwijder de localStorage items:
```javascript
// In browser console:
localStorage.clear()
```

## Uitbreiden

### Nieuwe Zone Toevoegen
Voeg een nieuwe zone toe in `src/data/zones.ts`:

```typescript
{
  id: 7,
  name: "Nieuwe Zone",
  cafes: [
    { id: "7-1", name: "Café Naam", task: "Opdracht" },
  ],
}
```

### Team Configuratie Aanpassen
Wijzig de startzones in `src/data/zones.ts`:

```typescript
export const TEAM_START_ZONES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};
```

## Build voor Productie

```bash
npm run build
```

Dit genereert een `dist/` folder met de productie build. De build kan worden geserveerd met elke statische file server:

```bash
npm run preview
```

Of deploy naar services zoals:
- Vercel
- Netlify
- GitHub Pages
- Elke andere statische hosting service
