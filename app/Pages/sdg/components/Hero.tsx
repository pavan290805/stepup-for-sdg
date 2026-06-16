"use client";

import { useState } from "react";
import EarthAnimation from "./EarthAnimation";
import SDGGrid from "./SDGGrid";

export default function Hero() {
  const [showCards, setShowCards] = useState(false);

  return (
    <>
      {showCards ? (
        <SDGGrid />
      ) : (
        <EarthAnimation
          onExplore={() => setShowCards(true)}
        />
      )}
    </>
  );
}