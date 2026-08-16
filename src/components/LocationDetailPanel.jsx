import { useTrip } from "../context/TripContext";
import "./LocationDetailPanel.css";

export default function LocationDetailPanel({ place, isOpen, onClose }) {
  const { addToTrip, tripPlaces } = useTrip();
  const alreadyAdded = place && tripPlaces.some((p) => p.id === place.id);

  if (!place) return null;

  return (
    <div className={`detail-panel ${isOpen ? "detail-panel--open" : ""}`}>
      <button className="detail-panel__handle" onClick={onClose} aria-label="Collapse panel">
        <span className="detail-panel__handle-bar" />
      </button>

      <div className="detail-panel__content">
        <div className="detail-panel__video-stub">
          <span className="eyebrow">Video</span>
          <p>10–20s clip about {place.name} plays here</p>
        </div>

        <div className="detail-panel__header">
          <div>
            <span className="eyebrow">{place.category === "eco" ? "Eco spot" : "Cultural site"}</span>
            <h2>{place.name}</h2>
            <p className="detail-panel__tagline">{place.tagline}</p>
          </div>
        </div>

        <div className="detail-panel__gallery">
          <img src={place.photo} alt={place.name} />
          <div className="detail-panel__gallery-stub">+ more photos</div>
        </div>

        <div className="detail-panel__audio">
          <span className="eyebrow">AI audio companion</span>
          <div className="detail-panel__audio-bar">
            <button className="detail-panel__play">▶</button>
            <span>Narrating history &amp; highlights of {place.name}...</span>
          </div>
        </div>

        <p className="detail-panel__description">{place.description}</p>

        <div className="detail-panel__stats">
          <div>
            <span className="eyebrow">Weather</span>
            <p>{place.weather.temp} · {place.weather.condition}</p>
          </div>
          <div>
            <span className="eyebrow">Crowd</span>
            <p>{place.crowd}</p>
          </div>
          <div>
            <span className="eyebrow">Best season</span>
            <p>{place.season}</p>
          </div>
        </div>

        <button
          className="btn-primary detail-panel__add-btn"
          onClick={() => addToTrip(place)}
          disabled={alreadyAdded}
        >
          {alreadyAdded ? "Added to trip ✓" : "Add to Trip"}
        </button>
      </div>
    </div>
  );
}
