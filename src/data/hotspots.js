import netarhatImg from "../assets/locations/netarhat.jpg";
import betlaImg from "../assets/locations/betla.jpg";
import hundruImg from "../assets/locations/hundru.jpg";
import sohraiVillageImg from "../assets/locations/sohrai-village.jpg";
import deogharImg from "../assets/locations/deoghar.jpg";
import dassamImg from "../assets/locations/dassam.jpg";
import jonhaImg from "../assets/locations/jonha.jpg";
import lodhImg from "../assets/locations/lodh.jpg";
import deoriMandirImg from "../assets/locations/deori-mandir.jpg";
import netarhatViewpointImg from "../assets/locations/netarhat-viewpoint.jpg";
import patratuValleyImg from "../assets/locations/patratu-valley.jpg";

// Static hotspot data for Phase 1 — real Jharkhand eco/cultural locations.
// Will later be replaced/augmented by Firestore data (see src/services/firebase.js).

export const hotspots = [
  {
    id: "netarhat",
    name: "Netarhat",
    category: "eco",
    interests: ["nature", "adventure", "relaxation"],
    budgetTier: "low",
    visitHours: 4,
    season: "Oct–Mar",
    lat: 23.4691,
    lng: 84.2661,
    photo: netarhatImg,
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
    interests: ["nature", "wildlife", "adventure"],
    budgetTier: "medium",
    visitHours: 5,
    season: "Nov–Apr",
    lat: 23.8859,
    lng: 84.1911,
    photo: betlaImg,
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
    interests: ["nature", "adventure"],
    budgetTier: "low",
    visitHours: 3,
    season: "Jul–Feb",
    lat: 23.4362,
    lng: 85.6591,
    photo: hundruImg,
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
    interests: ["culture", "art", "relaxation"],
    budgetTier: "low",
    visitHours: 3,
    season: "Year-round",
    lat: 23.9925,
    lng: 85.3616,
    photo: sohraiVillageImg,
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
    interests: ["culture", "spiritual"],
    budgetTier: "medium",
    visitHours: 4,
    season: "Year-round",
    lat: 24.4823,
    lng: 86.6961,
    photo: deogharImg,
    tagline: "Baidyanath Jyotirlinga temple town",
    description:
      "One of the twelve Jyotirlingas, and a major pilgrimage site especially during Shravani Mela. Rich in temple architecture and local craft markets.",
    weather: { temp: "26°C", condition: "Sunny" },
    crowd: "High",
  },
  {
    id: "dassam",
    name: "Dassam Falls",
    category: "eco",
    interests: ["nature", "adventure"],
    budgetTier: "low",
    visitHours: 3,
    season: "Jul–Feb",
    lat: 23.2557,
    lng: 85.5911,
    photo: dassamImg,
    tagline: "Cascading falls on the Kanchi river near Taimara",
    description:
      "A dramatic multi-tiered waterfall on the Kanchi river, roughly 40km from Ranchi. Best visited just after monsoon when the flow is at its strongest.",
    weather: { temp: "23°C", condition: "Partly cloudy" },
    crowd: "Moderate",
  },
  {
    id: "jonha",
    name: "Jonha Falls (Gautamdhara)",
    category: "eco",
    interests: ["nature", "adventure", "spiritual"],
    budgetTier: "low",
    visitHours: 3,
    season: "Jul–Feb",
    lat: 23.3372,
    lng: 85.5975,
    photo: jonhaImg,
    tagline: "A serene falls with a small Buddhist temple nearby",
    description:
      "Also known as Gautamdhara, this falls has a steep stairway down to the pool and a small temple dedicated to Buddha overlooking the valley.",
    weather: { temp: "22°C", condition: "Clear" },
    crowd: "Low",
  },
  {
    id: "lodh",
    name: "Lodh Falls",
    category: "eco",
    interests: ["nature", "adventure"],
    budgetTier: "low",
    visitHours: 4,
    season: "Jul–Jan",
    lat: 23.6633,
    lng: 84.4783,
    photo: lodhImg,
    tagline: "Jharkhand's highest waterfall, deep in Netarhat forest",
    description:
      "At around 143m, Lodh (Burhaghagh) is the state's tallest waterfall, tucked inside dense sal forest near the Netarhat plateau. Best reached by a short trek.",
    weather: { temp: "19°C", condition: "Clear" },
    crowd: "Low",
  },
  {
    id: "deori-mandir",
    name: "Deori Mandir",
    category: "cultural",
    interests: ["culture", "spiritual"],
    budgetTier: "low",
    visitHours: 2,
    season: "Year-round",
    lat: 23.7808,
    lng: 85.9739,
    photo: deoriMandirImg,
    tagline: "Ancient Maa Deori Devi shakti peeth near Bokaro",
    description:
      "A revered temple dedicated to Maa Deori Devi, believed to be centuries old and built by tribal chiefs. Known for Durga Puja celebrations drawing large crowds.",
    weather: { temp: "25°C", condition: "Sunny" },
    crowd: "Moderate",
  },
  {
    id: "netarhat-viewpoint",
    name: "Netarhat Sunset Point (Magnolia)",
    category: "eco",
    interests: ["nature", "relaxation"],
    budgetTier: "low",
    visitHours: 2,
    season: "Oct–Mar",
    lat: 23.4735,
    lng: 84.2598,
    photo: netarhatViewpointImg,
    tagline: "Netarhat's iconic sunset viewpoint over the plateau",
    description:
      "The Magnolia Sunset Point is the most-photographed spot in Netarhat — a clifftop view over layered hills, best at golden hour.",
    weather: { temp: "17°C", condition: "Clear" },
    crowd: "High",
  },
  {
    id: "patratu-valley",
    name: "Patratu Valley",
    category: "eco",
    interests: ["nature", "relaxation", "adventure"],
    budgetTier: "medium",
    visitHours: 3,
    season: "Oct–Mar",
    lat: 23.6423,
    lng: 85.2891,
    photo: patratuValleyImg,
    tagline: "Winding valley road beside Patratu Dam reservoir",
    description:
      "A scenic hill road curving alongside the Patratu Dam reservoir, popular for its viewpoints, boating, and a dramatic Ghat road drive.",
    weather: { temp: "21°C", condition: "Clear" },
    crowd: "Moderate",
  },
];

export const categories = ["all", "eco", "cultural"];
