import { useTrip } from "../context/TripContext";
import "./CustomTripPanel.css";

export default function CustomTripPanel({ routeMode, onRouteModeChange }) {
  const { tripPlaces, removeFromTrip, reorderTrip } = useTrip();

  if (tripPlaces.length === 0) return null;

  function moveUp(index) {
    if (index === 0) return;
    const next = [...tripPlaces];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    reorderTrip(next);
  }

  function moveDown(index) {
    if (index === tripPlaces.length - 1) return;
    const next = [...tripPlaces];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    reorderTrip(next);
  }

  return (
    <div className="trip-panel sohrai-border">
      <div className="trip-panel__header">
        <span className="eyebrow">My Custom Trip</span>
        <span className="trip-panel__count">{tripPlaces.length} places</span>
      </div>

      {tripPlaces.length > 1 && (
        <div className="trip-panel__toggle">
          <button
            className={routeMode === "full" ? "active" : ""}
            onClick={() => onRouteModeChange("full")}
          >
            Entire Trip
          </button>
          <button
            className={routeMode === "daywise" ? "active" : ""}
            onClick={() => onRouteModeChange("daywise")}
          >
            Day-wise
          </button>
        </div>
      )}

      <ul className="trip-panel__list">
        {tripPlaces.map((place, i) => (
          <li key={place.id}>
            <span className="trip-panel__order">{i + 1}</span>
            <span className="trip-panel__name">{place.name}</span>
            <div className="trip-panel__actions">
              <button onClick={() => moveUp(i)} aria-label="Move up">↑</button>
              <button onClick={() => moveDown(i)} aria-label="Move down">↓</button>
              <button onClick={() => removeFromTrip(place.id)} aria-label="Remove">✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
