// Static hotspot data for Phase 1 — real Jharkhand eco/cultural locations.
// Will later be replaced/augmented by Firestore data (see src/services/firebase.js).

export const hotspots = [
  {
    id: "netarhat",
    name: "Netarhat",
    category: "eco",
    season: "Oct–Mar",
    lat: 23.4691,
    lng: 84.2661,
    photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    tagline: "Queen of Chotanagpur — sunrise point over rolling hills",
    description:
      "A hill station known for its cool climate, pine forests, and one of the finest sunrise/sunset points in the region. Popular for short treks and viewpoints.",
    weather: { temp: "18°C", condition: "Clear" },
    crowd: "Moderate",
  },
  {
    id: "betla",
    name: "Betla National Park",
    category: "eco",
    season: "Nov–Apr",
    lat: 23.8859,
    lng: 84.1911,
    photo: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=600&q=80",
    tagline: "Tiger reserve and wildlife sanctuary in the Palamu hills",
    description:
      "Part of Palamu Tiger Reserve, home to tigers, elephants, bison and deer. Offers jeep safaris and watchtowers for wildlife spotting.",
    weather: { temp: "22°C", condition: "Sunny" },
    crowd: "Low",
  },
  {
    id: "hundru",
    name: "Hundru Falls",
    category: "eco",
    season: "Jul–Feb",
    lat: 23.4362,
    lng: 85.6591,
    photo: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80",
    tagline: "98m waterfall on the Subarnarekha river",
    description:
      "One of the highest waterfalls in Jharkhand, at its most dramatic just after monsoon. A short trek down leads to the pool at the base.",
    weather: { temp: "24°C", condition: "Partly cloudy" },
    crowd: "High",
  },
  {
    id: "sohrai-village",
    name: "Hazaribagh Sohrai Villages",
    category: "cultural",
    season: "Year-round",
    lat: 23.9925,
    lng: 85.3616,
    photo: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80",
    tagline: "Home of the Sohrai & Khovar mural painting tradition",
    description:
      "Villages around Hazaribagh where women artists paint Sohrai and Khovar murals on mud walls using natural pigments — a tradition with GI-tag recognition.",
    weather: { temp: "20°C", condition: "Clear" },
    crowd: "Low",
  },
  {
    id: "deoghar",
    name: "Deoghar",
    category: "cultural",
    season: "Year-round",
    lat: 24.4823,
    lng: 86.6961,
    photo: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
    tagline: "Baidyanath Jyotirlinga temple town",
    description:
      "One of the twelve Jyotirlingas, and a major pilgrimage site especially during Shravani Mela. Rich in temple architecture and local craft markets.",
    weather: { temp: "26°C", condition: "Sunny" },
    crowd: "High",
  },
];

export const categories = ["all", "eco", "cultural"];
