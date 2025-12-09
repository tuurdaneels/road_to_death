export interface Cafe {
  id: string;
  name: string;
  task: string;
}

export interface Zone {
  id: number;
  name: string;
  cafes: Cafe[];
  code: string;
  image?: string;
  clue?: string;
}

export const zones: Zone[] = [
  {
    id: 1,
    name: "Grote Markt",
    cafes: [
      { id: "1-1", name: "Bar Patron", task: "Tequilla Time" },
      { id: "1-2", name: "Den Engel", task: "Pils PP" },
      { id: "1-3", name: "Den Bengel", task: "Sterk Bier" },
      { id: "1-4", name: "Irish Pub", task: "Split the G" },
    ],
    code: "",
    clue: "1) Laat een teamfoto maken bij het Brabo beeld\n 2) Vraag aan een random om een shotje mee te doen op de kerstmarkt in de Brüderschaft houding",
    image: "bruderschaft.png"
  },
  {
    id: 2,
    name: "Torfbrug",
    cafes: [
      { id: "2-1", name: "Das Boot", task: "Duvel" },
      { id: "2-2", name: "La Parisien", task: "Pils PP" },
      { id: "2-3", name: "Cabron", task: "Pils PP" },
    ],
    code: "Hennything is possible at hennytime with hennyone",
    image: "rebus2.svg"
  },
  {
    id: 3,
    name: "Kortekoekpoort",
    cafes: [
      { id: "3-1", name: "De Muze", task: "Speciaal Bier" },
      { id: "3-2", name: "Pelikaan", task: "Pils PP" },
      { id: "3-3", name: "Nachtwinkel", task: "Vodka Redbull (blikje)" },
    ],
    code: "",
    clue: "Doe de extra enveloppe open",
  },
  {
    id: 4,
    name: "Ossemarkt",
    cafes: [
      { id: "4-1", name: "Kassa 4", task: "Jenever Shot" },
      { id: "4-2", name: "Barracuda", task: "Pils PP" },
      { id: "4-3", name: "Spoor 8", task: "Fruitbier" },
      { id: "4-4", name: "De Prof", task: "Jagerbomb" },
      { id: "4-5", name: "Nachtwinkel", task: "Rum Cola (blikje)" },
    ],
    code: "1716",
    image: "ossemarkt.png",
  },
  {
    id: 5,
    name: "Mechelsplein",
    cafes: [
      { id: "5-1", name: "Den Boer", task: "Chouffe" },
      { id: "5-2", name: "Korsakov", task: "Triple" },
      { id: "5-3", name: "Pallieter", task: "Pils PP" },
      { id: "5-4", name: "Nachtwinkel", task: "Eristoff Mix (blikje)" },
    ],
    clue: "Tip 1) 🏨⭐️⭐️⭐️⭐️⭐️ Tip 2)🧔🏽‍♂️🏠👩🏼",
    code: "GASTHUIS S’ELISABETH",
  },
  {
    id: 6,
    name: "Zuid",
    cafes: [
      { id: "6-1", name: "Baron", task: "Pils PP" },
      { id: "6-2", name: "Patine", task: "Pils PP" },
      { id: "6-3", name: "Bas", task: "Fuzee" },
      { id: "6-4", name: "Vischmijn", task: "Pils PP" },
    ],
    code: "MAGRITTE",
    clue: "In het Zuid staat een gebouw dat zich verbergt achter licht.\n\nHet is niet gebouwd om te wonen, maar om te bewaren wat niet sterft.\n\nHet telt meer ramen dan sommige straten huizen hebben,\nen toch kijkt niemand eruit.\n\nWie voor dit huis staat, zal merken dat het tijdelijk\nin de ban is van één naam.\n\nAan wie behoort dit huis nu – voorlopig – toe?\n\nSchrijf die naam op als jullie code.",
  },
];

export const TEAM_START_ZONES: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

export function getZoneOrderForTeam(teamId: string): number[] {
  const startZone = TEAM_START_ZONES[teamId];
  if (!startZone) return [];

  const order: number[] = [];
  for (let i = 0; i < zones.length; i++) {
    const zoneIndex = ((startZone - 1 + i) % zones.length);
    order.push(zones[zoneIndex].id);
  }
  return order;
}

