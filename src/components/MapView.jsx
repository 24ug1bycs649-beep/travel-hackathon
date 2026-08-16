import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

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

export default function MapView({ hotspots, onSelectPlace, tripPlaces = [] }) {
  return (
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

      {tripPlaces.length > 1 && <RouteFitter places={tripPlaces} />}
    </MapContainer>
  );
}
