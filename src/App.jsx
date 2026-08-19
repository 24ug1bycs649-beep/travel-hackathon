import { useState } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import TouristDashboard from "./pages/TouristDashboard";
import VendorDashboard from "./vendor/VendorDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import { TripProvider } from "./context/TripContext";
import "./styles/theme.css";

function App() {
  const [role, setRole] = useState("tourist");
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <SplashScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <TripProvider>
      <Navbar role={role} onRoleChange={setRole} />
      {role === "tourist" && <TouristDashboard />}
      {role === "vendor" && <VendorDashboard />}
      {role === "admin" && <AdminDashboard />}
    </TripProvider>
  );
}

export default App;
