import "./Navbar.css";

const ROLES = [
  { id: "tourist", label: "Tourist" },
  { id: "vendor", label: "Local Vendor" },
  { id: "admin", label: "Govt Admin" },
];

export default function Navbar({ role, onRoleChange }) {
  return (
    <header className="navbar sohrai-border">
      <div className="navbar__brand">
        <span className="navbar__mark" />
        <span className="navbar__title">Jharkhand Yatra</span>
      </div>

      <div className="navbar__roles">
        {ROLES.map((r) => (
          <button
            key={r.id}
            className={`navbar__role-btn ${role === r.id ? "navbar__role-btn--active" : ""}`}
            onClick={() => onRoleChange(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>
    </header>
  );
}
