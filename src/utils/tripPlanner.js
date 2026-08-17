// Rule-based trip planner. Parses free-text prompts for days/budget/interests,
// scores hotspots against them, and slots the top matches into a day-wise plan.
// NOTE: this is intentionally rule-based (keyword parsing + scoring), not real
// ML/NLP — flagged here for transparency if this comes up in review.

const INTEREST_KEYWORDS = {
  nature: ["nature", "forest", "hill", "green", "outdoors", "scenic"],
  adventure: ["adventure", "trek", "trekking", "hike", "hiking", "waterfall"],
  wildlife: ["wildlife", "animal", "safari", "tiger", "forest"],
  culture: ["culture", "cultural", "heritage", "tribal", "art", "craft", "sohrai", "khovar"],
  spiritual: ["spiritual", "temple", "pilgrimage", "religious"],
  relaxation: ["relax", "relaxation", "calm", "peaceful", "chill"],
};

function parseDays(prompt) {
  const match = prompt.match(/(\d+)\s*day/i);
  return match ? Math.min(Math.max(parseInt(match[1], 10), 1), 7) : 3;
}

function parseBudget(prompt) {
  const match = prompt.match(/₹?\s?(\d{3,6})/);
  if (!match) return "medium";
  const amount = parseInt(match[1], 10);
  if (amount <= 5000) return "low";
  if (amount <= 15000) return "medium";
  return "high";
}

function parseInterests(prompt) {
  const lower = prompt.toLowerCase();
  const found = [];
  for (const [interest, keywords] of Object.entries(INTEREST_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) found.push(interest);
  }
  return found.length > 0 ? found : ["nature", "culture"]; // sensible default
}

function scorePlace(place, interests, budgetTier) {
  let score = 0;
  place.interests.forEach((tag) => {
    if (interests.includes(tag)) score += 3;
  });
  const budgetOrder = { low: 0, medium: 1, high: 2 };
  const diff = Math.abs(budgetOrder[place.budgetTier] - budgetOrder[budgetTier]);
  score += diff === 0 ? 2 : diff === 1 ? 1 : 0;
  return score;
}

/**
 * Generates a day-wise trip plan from a free-text prompt.
 * @param {string} prompt - user's natural language request
 * @param {Array} hotspots - full hotspot dataset
 * @returns {{ days: number, budgetTier: string, interests: string[], itinerary: Array<Array> }}
 */
export function generateTripPlan(prompt, hotspots) {
  const days = parseDays(prompt);
  const budgetTier = parseBudget(prompt);
  const interests = parseInterests(prompt);

  const ranked = [...hotspots]
    .map((place) => ({ place, score: scorePlace(place, interests, budgetTier) }))
    .sort((a, b) => b.score - a.score)
    .map((r) => r.place);

  // Slot into days — max ~8 hours of visiting per day
  const itinerary = [];
  let dayBucket = [];
  let dayHours = 0;
  const maxHoursPerDay = 8;

  for (const place of ranked) {
    if (itinerary.length >= days) break;
    if (dayHours + place.visitHours > maxHoursPerDay && dayBucket.length > 0) {
      itinerary.push(dayBucket);
      dayBucket = [];
      dayHours = 0;
      if (itinerary.length >= days) break;
    }
    dayBucket.push(place);
    dayHours += place.visitHours;
  }
  if (dayBucket.length > 0 && itinerary.length < days) {
    itinerary.push(dayBucket);
  }

  return { days, budgetTier, interests, itinerary };
}
