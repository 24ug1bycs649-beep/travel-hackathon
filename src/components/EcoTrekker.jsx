import { useState } from "react";
import { hotspots } from "../data/hotspots";
import "./EcoTrekker.css";

const ECO_LOCATIONS = hotspots.filter((h) => h.category === "eco");

export default function EcoTrekker() {
  const [ecoPoints, setEcoPoints] = useState(120);
  const [checkedIn, setCheckedIn] = useState([]);
  const [checking, setChecking] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleCheckIn(place) {
    if (checkedIn.includes(place.id)) return;
    setChecking(place.id);
    // Simulates GPS proximity check (real version would use navigator.geolocation
    // and compare against the 100m radius described in the spec)
    setTimeout(() => {
      setCheckedIn((prev) => [...prev, place.id]);
      setEcoPoints((prev) => prev + 25);
      setChecking(null);
      showToast(`+25 eco points — checked in at ${place.name}!`);
    }, 1200);
  }

  function handlePay(e) {
    e.preventDefault();
    if (!payAmount) return;
    showToast(`₹${payAmount} paid successfully`);
    setPayAmount("");
    setScannerOpen(false);
  }

  return (
    <div className="eco-trekker">
      <div className="eco-header sohrai-border">
        <div>
          <span className="eyebrow">Eco Trekker</span>
          <h2>Your Impact</h2>
        </div>
        <div className="eco-points-badge">
          <span className="eco-points-badge__value">{ecoPoints}</span>
          <span className="eco-points-badge__label">eco points</span>
        </div>
      </div>

      <div className="eco-section">
        <h3>Pay with UPI</h3>
        <p className="eco-hint">Scan to pay bus conductors, homestays, or artisans directly</p>
        <button className="btn-primary eco-scan-btn" onClick={() => setScannerOpen(true)}>
          📷 Open Scanner
        </button>
      </div>

      <div className="eco-section">
        <h3>Check In at Eco Locations</h3>
        <p className="eco-hint">Earn 25 points when you're within 100m of a verified eco-friendly site</p>

        <div className="eco-location-list">
          {ECO_LOCATIONS.map((place) => {
            const done = checkedIn.includes(place.id);
            const isChecking = checking === place.id;
            return (
              <div key={place.id} className="eco-location-card">
                <img src={place.photo} alt={place.name} />
                <div className="eco-location-info">
                  <h4>{place.name}</h4>
                  <p>{place.tagline}</p>
                </div>
                <button
                  className={`eco-checkin-btn ${done ? "eco-checkin-btn--done" : ""}`}
                  onClick={() => handleCheckIn(place)}
                  disabled={done || isChecking}
                >
                  {done ? "✓ Checked In" : isChecking ? "Locating..." : "Check In"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {scannerOpen && (
        <div className="scanner-overlay" onClick={() => setScannerOpen(false)}>
          <div className="scanner-modal sohrai-border" onClick={(e) => e.stopPropagation()}>
            <button className="scanner-close" onClick={() => setScannerOpen(false)}>✕</button>
            <span className="eyebrow">UPI Scanner</span>
            <h3>Scan &amp; Pay</h3>
            <div className="scanner-viewfinder">
              <div className="scanner-corner scanner-corner--tl" />
              <div className="scanner-corner scanner-corner--tr" />
              <div className="scanner-corner scanner-corner--bl" />
              <div className="scanner-corner scanner-corner--br" />
              <p>Point camera at vendor QR code</p>
            </div>
            <form onSubmit={handlePay} className="scanner-pay-form">
              <input
                type="number"
                placeholder="Enter amount (₹)"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
              />
              <button type="submit" className="btn-primary">Pay Now</button>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
