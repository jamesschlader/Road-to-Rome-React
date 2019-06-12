import React, { useState } from "react";
import { Row, Button, Col } from "react-materialize";
import AddBattleMutation from "./AddBattleMutation";

export default ({ openSchedule, warrior, arena }) => {
  const defaultMessage = { name: "Select an opponent" };

  const [opponent, setOpponent] = useState(defaultMessage);

  const opponents = arena.warriorList.filter(item => {
    if (item !== null) {
      return item.alive ? item.id !== warrior.id : null;
    } else return null;
  });

  return (
    <div>
      <p>Schedule a Battle</p>
      <Row className="small-padding">
        <h5>
          {warrior.name} vs. {opponent.name}
        </h5>
        {opponent !== defaultMessage.name ? (
          <div style={{ display: "inline-block", margin: "4px" }}>
            <AddBattleMutation
              playerOne={warrior.id}
              playerTwo={opponent.id}
              purse={
                arena.battleQuantity *
                arena.gamesFrequency *
                (opponent.battleIdList ? opponent.battlesIdList.length : 1)
              }
              arena={arena}
            />
          </div>
        ) : null}
      </Row>
      <Row>
        <ul style={{ display: "inline-block" }}>
          {opponents.map(candidate => (
            <li key={candidate.id}>
              <p
                onClick={e => setOpponent(candidate)}
                style={{
                  cursor: "pointer",
                  color: opponent.name === candidate.name ? "red" : "green",
                  display: "inline-block"
                }}
              >
                {candidate.name}
              </p>
            </li>
          ))}
        </ul>
      </Row>
      <Row>
        <Col s={6}>
          <Button onClick={openSchedule}>
            <i className="material-icons">keyboard_backspace</i>
          </Button>
        </Col>
        <Col s={6}>
          <Button onClick={openSchedule}>
            <i className="material-icons">assignment</i>
          </Button>
        </Col>
      </Row>
    </div>
  );
};
