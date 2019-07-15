import React from "react";
import { Col, Row } from "react-materialize";
import CombatCard from "./CombatCard";
import ShowCombatState from "./ShowCombatState";

export default ({ playerOne, playerTwo, turn, setOneVitals, setTwoVitals }) => {
  console.log(`playerOne = `, playerOne);
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
          <ShowCombatState vitals={playerOne} />
        </Col>
        <Col s={6}>
          <ShowCombatState vitals={playerTwo} />
          <div className="inline-content">
            <CombatCard
              player={playerTwo}
              turn={!turn}
              style={{ backgroundColor: turn ? "green" : "#ccc" }}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
