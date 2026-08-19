import { useState } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  function handleEnter() {
    setExiting(true);
    // Matches the CSS transition duration below
    setTimeout(onEnter, 850);
  }

  return (
    <div
      className={`splash ${exiting ? "splash--exiting" : ""}`}
      onClick={handleEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleEnter()}
    >
      <div className="splash__pattern" aria-hidden="true" />

      <div className="splash__content">
        <span className="splash__eyebrow">Welcome to</span>
        <h1 className="splash__title">
          <span className="splash__title-line">Johar</span>
          <span className="splash__title-line splash__title-line--accent">Jharkhand</span>
        </h1>
        <p className="splash__tagline">Eco &amp; Cultural Tourism, reimagined</p>
        <div className="splash__enter-hint">Tap anywhere to enter</div>
      </div>
    </div>
  );
}
