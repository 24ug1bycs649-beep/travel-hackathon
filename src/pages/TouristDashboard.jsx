import { useState, useMemo } from "react";
import MapView from "../components/MapView";
import LocationDetailPanel from "../components/LocationDetailPanel";
import CustomTripPanel from "../components/CustomTripPanel";
import { hotspots, categories } from "../data/hotspots";
import { useTrip } from "../context/TripContext";
import "./TouristDashboard.css";

const TABS = [
  { id: "home", label: "Home" },
  { id: "planner", label: "AI Trip Planner" },
  { id: "eco", label: "Eco Trekker" },
  { id: "marketplace", label: "Marketplace" },
];

export default function TouristDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [viewMode, setViewMode] = useState("map"); // map | list
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [routeMode, setRouteMode] = useState("full");
  const { tripPlaces } = useTrip();

  const filtered = useMemo(() => {
    return hotspots.filter((h) => {
      const matchesCategory = category === "all" || h.category === category;
      const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  function handleSelectPlace(place) {
    setSelectedPlace(place);
    setPanelOpen(true);
  }

  return (
    <div className="tourist-dashboard">
      <nav className="tourist-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tourist-tabs__btn ${activeTab === t.id ? "tourist-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {activeTab === "home" && (
        <div className="home-tab">
          <div className="home-tab__controls">
            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="home-tab__search"
            />
            <div className="home-tab__filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`home-tab__filter ${category === c ? "home-tab__filter--active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c === "all" ? "All" : c === "eco" ? "Eco" : "Cultural"}
                </button>
              ))}
            </div>
            <div className="home-tab__view-toggle">
              <button
                className={viewMode === "map" ? "active" : ""}
                onClick={() => setViewMode("map")}
              >
                Map
              </button>
              <button
                className={viewMode === "list" ? "active" : ""}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>

          <div className="home-tab__body">
            {viewMode === "map" ? (
              <div className="home-tab__map-wrap">
                <MapView
                  hotspots={filtered}
                  onSelectPlace={handleSelectPlace}
                  tripPlaces={tripPlaces}
                />
                <CustomTripPanel routeMode={routeMode} onRouteModeChange={setRouteMode} />
              </div>
            ) : (
              <ul className="home-tab__list">
                {filtered.map((place) => (
                  <li key={place.id} onClick={() => handleSelectPlace(place)}>
                    <img src={place.photo} alt={place.name} />
                    <div>
                      <h4>{place.name}</h4>
                      <p>{place.tagline}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === "planner" && (
        <div className="stub-tab">
          <span className="eyebrow">Phase 3</span>
          <h3>AI Trip Planner</h3>
          <p>Coming next — rule-based trip generation from your budget, days, and interests.</p>
        </div>
      )}
      {activeTab === "eco" && (
        <div className="stub-tab">
          <span className="eyebrow">Phase 6</span>
          <h3>Eco Trekker</h3>
          <p>Coming later — eco-points, GPS check-ins, and the UPI scanner flow.</p>
        </div>
      )}
      {activeTab === "marketplace" && (
        <div className="stub-tab">
          <span className="eyebrow">Phase 7</span>
          <h3>Marketplace</h3>
          <p>Coming later — artisan crafts, AR preview, and artist profiles.</p>
        </div>
      )}

      <LocationDetailPanel
        place={selectedPlace}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  );
}
