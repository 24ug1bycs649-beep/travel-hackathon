import { createContext, useContext, useState } from "react";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [tripPlaces, setTripPlaces] = useState([]);

  function addToTrip(place) {
    setTripPlaces((prev) =>
      prev.some((p) => p.id === place.id) ? prev : [...prev, place]
    );
  }

  function removeFromTrip(placeId) {
    setTripPlaces((prev) => prev.filter((p) => p.id !== placeId));
  }

  function reorderTrip(newOrder) {
    setTripPlaces(newOrder);
  }

  return (
    <TripContext.Provider
      value={{ tripPlaces, addToTrip, removeFromTrip, reorderTrip }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}
