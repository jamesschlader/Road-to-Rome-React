import React from "react";
import { Col, Row } from "react-materialize";
import CombatCard from "./CombatCard";

export default ({ playerOne, playerTwo, turn }) => {
  console.log(turn);
  return (
    <>
      <Row>
        <Col s={2} offset="s1">
          <div >
            <CombatCard
              player={playerOne}
         turn={turn}
            
            />
          </div>
        </Col>
        <Col s={2} offset="s6">
          <div>
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
