import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/">Home</Link>
      <Link to="/itinerary">Itinerary</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
