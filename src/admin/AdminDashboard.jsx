import { useState } from "react";
import { hotspots } from "../data/hotspots";
import "./AdminDashboard.css";

const MOCK_VENDORS = [
  {
    id: "VND-A1B2C3D4E",
    name: "Sohrai Art Collective",
    type: "artisan",
    submittedAt: "17/08/2026",
    status: "pending",
  },
  {
    id: "VND-F5G6H7I8J",
    name: "Netarhat Homestay",
    type: "homestay",
    submittedAt: "18/08/2026",
    status: "pending",
  },
  {
    id: "VND-K9L0M1N2O",
    name: "Palamu Trail Guides",
    type: "guide",
    submittedAt: "18/08/2026",
    status: "pending",
  },
];

const TABS = [
  { id: "vendors", label: "Vendor Verification" },
  { id: "conditions", label: "Weather & Crowd" },
  { id: "alerts", label: "Push Alerts" },
  { id: "revenue", label: "Revenue Tracker" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("vendors");
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [alertLocation, setAlertLocation] = useState(hotspots[0]?.id || "");
  const [alertMessage, setAlertMessage] = useState("");
  const [toast, setToast] = useState(null);

  function handleVendorAction(id, action) {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: action } : v))
    );
    showToast(`Vendor ${action === "approved" ? "approved" : "rejected"}`);
  }

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }

  function handleSendAlert(e) {
    e.preventDefault();
    if (!alertMessage.trim()) return;
    const place = hotspots.find((h) => h.id === alertLocation);
    showToast(`Alert sent for ${place?.name || "location"}`);
    setAlertMessage("");
  }

  const pendingCount = vendors.filter((v) => v.status === "pending").length;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <span className="eyebrow">Government Admin</span>
        <h2>Platform Oversight</h2>
      </div>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`admin-tabs__btn ${activeTab === t.id ? "admin-tabs__btn--active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
            {t.id === "vendors" && pendingCount > 0 && (
              <span className="admin-tabs__badge">{pendingCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="admin-body">
        {activeTab === "vendors" && (
          <div className="admin-panel sohrai-border">
            <h3>Vendor Verification Queue</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vendor ID</th>
                  <th>Business Name</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id}>
                    <td className="mono">{v.id}</td>
                    <td>{v.name}</td>
                    <td className="capitalize">{v.type}</td>
                    <td>{v.submittedAt}</td>
                    <td>
                      <span className={`status-pill status-pill--${v.status}`}>
                        {v.status}
                      </span>
                    </td>
                    <td>
                      {v.status === "pending" ? (
                        <div className="admin-actions">
                          <button
                            className="admin-action admin-action--approve"
                            onClick={() => handleVendorAction(v.id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="admin-action admin-action--reject"
                            onClick={() => handleVendorAction(v.id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="admin-actions-done">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "conditions" && (
          <div className="admin-panel sohrai-border">
            <h3>Live Weather &amp; Crowd Status</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Weather</th>
                  <th>Crowd</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((h) => (
                  <tr key={h.id}>
                    <td>{h.name}</td>
                    <td className="capitalize">{h.category}</td>
                    <td>{h.weather.temp} · {h.weather.condition}</td>
                    <td>
                      <span className={`crowd-pill crowd-pill--${h.crowd.toLowerCase()}`}>
                        {h.crowd}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="admin-panel sohrai-border admin-panel--narrow">
            <h3>Push Alert to Tourists</h3>
            <p className="admin-panel__hint">
              Send a condition alert (e.g. bad weather, overcrowding) for a specific location.
            </p>
            <form onSubmit={handleSendAlert} className="alert-form">
              <div className="form-group">
                <label>Location</label>
                <select value={alertLocation} onChange={(e) => setAlertLocation(e.target.value)}>
                  {hotspots.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  placeholder="e.g. Heavy rainfall expected — trails may be slippery"
                  rows={3}
                />
              </div>
              <button type="submit" className="btn-primary">Send Alert</button>
            </form>
          </div>
        )}

        {activeTab === "revenue" && (
          <div className="admin-panel sohrai-border">
            <h3>Micro-Economy Revenue Tracker</h3>
            <p className="admin-panel__hint">
              Money flowing into rural artisan villages and homestays via the platform.
            </p>
            <div className="revenue-stats">
              <div className="revenue-stat">
                <span className="eyebrow">This month</span>
                <p>₹2,84,500</p>
              </div>
              <div className="revenue-stat">
                <span className="eyebrow">Active vendors</span>
                <p>{vendors.filter((v) => v.status === "approved").length + 12}</p>
              </div>
              <div className="revenue-stat">
                <span className="eyebrow">Transactions</span>
                <p>1,204</p>
              </div>
            </div>
            <div className="revenue-chart-stub">
              <span className="eyebrow">Monthly trend</span>
              <div className="revenue-bars">
                {[45, 62, 58, 71, 84, 76, 95].map((h, i) => (
                  <div key={i} className="revenue-bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}
