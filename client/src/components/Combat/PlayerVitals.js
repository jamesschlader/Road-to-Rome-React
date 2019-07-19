import React, { useEffect } from "react";
import { Col, Row } from "react-materialize";
import CombatCard from "./CombatCard";
import ShowCombatState from "./ShowCombatState";

export default ({
  playerOne,
  playerTwo,
  turn,
  setOneVitals,
  setTwoVitals,
  oneVitals,
  twoVitals,
  round
}) => {
  useEffect(() => {
    const newVitals = {
      stamina: playerOne.stamina,
      speed: playerOne.speed,
      fatigue: 0,
      wounds: 0
    };

    setOneVitals(newVitals);
  }, [playerOne]);

  useEffect(() => {
    const newVitals = {
      stamina: playerTwo.stamina,
      speed: playerTwo.speed,
      fatigue: 0,
      wounds: 0
    };

    setTwoVitals(newVitals);
  }, [playerTwo]);

  return (
    <>
      <Row>
        <Col
          s={6}
          style={{
            borderRight: "1px solid black"
          }}
        >
          <div className="inline-content">
            <CombatCard
              player={playerOne}
              turn={turn}
              style={{ backgroundColor: turn ? "green" : "#ccc" }}
            />
          </div>
          <ShowCombatState
            vitals={oneVitals}
            player={playerOne}
            round={round}
          />
        </Col>
        <Col s={6}>
          <ShowCombatState
            vitals={twoVitals}
            player={playerTwo}
            round={round}
          />
          <div className="inline-content">
            <CombatCard
              player={playerTwo}
              turn={!turn}
              style={{
                backgroundColor: turn ? "green" : "#ccc"
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
