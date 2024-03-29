import React from "react";
import { ArenaContext } from "./Layout";
import LandingCard from "./LandingCard";

const pics = [
  "/img/game-weapon-images/battle-axe.svg",
  "/img/game-weapon-images/shortsword.svg",
  "/img/game-weapon-images/cutlass.svg",
  "/img/game-weapon-images/advanced-shield.svg",
  "/img/game-weapon-images/gladius.svg",
  "/img/game-weapon-images/arabian-dagger.svg"
];

export default ({ location }) => {
  return (
    <ArenaContext>
      {context => (
        <div>
          <h1 id="landing-title" className="center-align rounded-content-box">
            Road to Rome
          </h1>
          <LandingCard
            src="/img/game-character-images/Lagertha.svg"
            text="Your tactics count"
            details="Defend yourself or go for a knock-out blow. Use your skills, abilities, and gear to your best advantage. But watch out! Your opponent will do the same to you!"
          />
          <LandingCard
            src={pics}
            text="Customize your equipment"
            details="Use your winnings to buy new armor and weapons in the Market. As you advance through the Arenas, you gain access to more and better equipment."
          />
          <LandingCard
            src="/img/game-character-images/Alexander.svg"
            text="Advance your warrior"
            details="Upgrade your skills as you win to improve your chances for glory."
          />
        </div>
      )}
    </ArenaContext>
  );
};
