import React from "react";
import { Row } from "react-materialize";
import LandingCard from "./LandingCard";

export default () => {
  return (
    <div>
      <Row className="rounded-content-box">
        <h1 id="landing-title" className="center-align">
          Road to Rome
        </h1>
      </Row>
      <LandingCard
        src="/img/game-weapon-images/battle-axe.svg"
        text="Customize your equipment"
        details="Use your winnings to buy new armor and weapons in the Market. As you advance through the Arenas, you gain access to more and better equipment."
      />
      <LandingCard
        src="/img/game-character-images/Alexander.svg"
        text="Advance your warrior"
        details="Upgrade your skills with as you win to improve your chances for glory."
      />
      <LandingCard
        src="/img/game-character-images/Lagertha.svg"
        text="Your tactics count"
        details="Defend yourself or go for a knock-out blow. Use your skills, abilities, and gear to your best advatage. But watch out! Your opponent will do the same to you!"
      />
    </div>
  );
};
