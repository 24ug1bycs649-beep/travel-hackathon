import { useState } from "react";
import { generateTripPlan } from "../utils/tripPlanner";
import { hotspots } from "../data/hotspots";
import { useTrip } from "../context/TripContext";
import "./AiTripPlanner.css";

const EXAMPLE_PROMPTS = [
  "I have 3 days, my budget is ₹10,000, I love nature",
  "2 day cultural trip, budget ₹5,000",
  "5 days, ₹20,000, adventure and wildlife",
];

export default function AiTripPlanner({ onSelectPlace, onPlanGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToTrip } = useTrip();

  function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    // Small artificial delay so it reads as "processing" rather than instant lookup
    setTimeout(() => {
      const result = generateTripPlan(prompt, hotspots);
      setPlan(result);
      setLoading(false);
    }, 600);
  }

  function removeFromPlan(dayIndex, placeId) {
    setPlan((prev) => {
      const itinerary = prev.itinerary.map((day, i) =>
        i === dayIndex ? day.filter((p) => p.id !== placeId) : day
      );
      return { ...prev, itinerary };
    });
  }

  function useThisPlan() {
    plan.itinerary.flat().forEach((place) => addToTrip(place));
    onPlanGenerated?.();
  }

  return (
    <div className="ai-planner">
      <div className="ai-planner__intro">
        <span className="eyebrow">AI Trip Planner</span>
        <h2>Tell us what you're looking for</h2>
        <p>Describe your days, budget, and interests — we'll build a day-wise plan.</p>
      </div>

      <div className="ai-planner__input-row">
        <textarea
          className="ai-planner__input"
          placeholder='e.g. "I have 3 days, my budget is ₹10,000, I love nature"'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
        />
        <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
          {loading ? "Planning..." : "Generate Trip"}
        </button>
      </div>

      <div className="ai-planner__examples">
        {EXAMPLE_PROMPTS.map((ex) => (
          <button key={ex} className="ai-planner__example-chip" onClick={() => setPrompt(ex)}>
            {ex}
          </button>
        ))}
      </div>

      {plan && (
        <div className="ai-planner__result sohrai-border">
          <div className="ai-planner__result-header">
            <div>
              <span className="eyebrow">Generated plan</span>
              <h3>{plan.days}-day trip · {plan.budgetTier} budget</h3>
              <p className="ai-planner__tags">
                {plan.interests.map((i) => (
                  <span key={i} className="ai-planner__tag">{i}</span>
                ))}
              </p>
            </div>
            <button className="btn-primary" onClick={useThisPlan}>
              Use This Plan
            </button>
          </div>

          {plan.itinerary.map((day, i) => (
            <div key={i} className="ai-planner__day">
              <h4>Day {i + 1}</h4>
              <ul>
                {day.map((place) => (
                  <li key={place.id}>
                    <img src={place.photo} alt={place.name} />
                    <div className="ai-planner__day-info">
                      <button className="ai-planner__place-link" onClick={() => onSelectPlace(place)}>
                        {place.name}
                      </button>
                      <span>{place.visitHours}h visit</span>
                    </div>
                    <button
                      className="ai-planner__remove"
                      onClick={() => removeFromPlan(i, place.id)}
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </li>
                ))}
                {day.length === 0 && <li className="ai-planner__empty-day">No places — removed</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
