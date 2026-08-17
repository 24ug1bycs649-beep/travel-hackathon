import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const DAY_COLORS = ["#C1502E", "#2F4B3C", "#D9A441", "#8C2F1B", "#3E624F"];

// Splits an ordered list of trip places into day-wise groups (max 3 stops/day).
export function splitIntoDays(places, perDay = 3) {
  const days = [];
  for (let i = 0; i < places.length; i += perDay) {
    days.push(places.slice(i, i + perDay));
  }
  return days;
}

const JHARKHAND_CENTER = [23.6102, 85.2799];

function makeIcon(category) {
  const color = category === "eco" ? "#2F4B3C" : "#C1502E";
  const html = `
    <div class="hotspot-marker" style="background:${color}">
      <svg width="14" height="14" viewBox="0 0 14 14">
        <polygon points="7,1 13,7 7,13 1,7" fill="#F2E8D8" />
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "hotspot-marker-wrapper",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function RouteFitter({ places }) {
  const map = useMap();
  if (places.length > 1) {
    const bounds = places.map((p) => [p.lat, p.lng]);
    map.fitBounds(bounds, { padding: [60, 60] });
  }
  return null;
}

export default function MapView({ hotspots, onSelectPlace, tripPlaces = [], routeMode = "full" }) {
  const dayGroups = routeMode === "daywise" ? splitIntoDays(tripPlaces) : [tripPlaces];
  const showLegend = routeMode === "daywise" && dayGroups.filter((g) => g.length > 1).length > 1;

  return (
    <div className="map-wrapper">
      {showLegend && (
        <div className="map-day-legend">
          {dayGroups.map((group, i) =>
            group.length > 0 ? (
              <span key={i} className="map-day-legend__item">
                <span
                  className="map-day-legend__dot"
                  style={{ background: DAY_COLORS[i % DAY_COLORS.length] }}
                />
                Day {i + 1}
              </span>
            ) : null
          )}
        </div>
      )}
      <MapContainer
      center={JHARKHAND_CENTER}
      zoom={7}
      className="map-container"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hotspots.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={makeIcon(place.category)}
        >
          <Popup>
            <div className="hotspot-popup">
              <img src={place.photo} alt={place.name} />
              <h4>{place.name}</h4>
              <button
                className="btn-primary"
                onClick={() => onSelectPlace(place)}
              >
                View Location
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {tripPlaces.length > 1 &&
        dayGroups.map((group, i) =>
          group.length > 1 ? (
            <Polyline
              key={i}
              positions={group.map((p) => [p.lat, p.lng])}
              pathOptions={{
                color: routeMode === "daywise" ? DAY_COLORS[i % DAY_COLORS.length] : "#C1502E",
                weight: 4,
                opacity: 0.85,
                dashArray: routeMode === "daywise" ? "8 6" : null,
              }}
            />
          ) : null
        )}

      {tripPlaces.length > 1 && <RouteFitter places={tripPlaces} />}
    </MapContainer>
    </div>
  );
}
