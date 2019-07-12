import React, { useState } from "react";
import { Row, Button, Col } from "react-materialize";
import AddBattleMutation from "./AddBattleMutation";
import BattleCard from "../Warrior/BattleCard";
import EventPicker from "./EventPicker";

export default ({ openSchedule, warrior, arena, close }) => {
  const defaultMessage = { name: "Select an opponent" };

  const [opponent, setOpponent] = useState(defaultMessage);
  const [event, setEvent] = useState(new Date());

  const opponents = arena.livingWarriors.filter(item => {
    return item.id !== warrior.id;
  });

  return (
    <div>
      <h3>Schedule a Battle</h3>
      <Row className="small-padding">
        <Row s={6}>
          <EventPicker arena={arena} setEvent={setEvent} />
        </Row>
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
              date={event.toString()}
              arena={arena}
              close={close}
            />
          </div>
        ) : null}
      </Row>
      <Row>
        <ul style={{ display: "inline-block" }}>
          {opponents.map(candidate => (
            <BattleCard
              candidate={candidate}
              opponent={opponent}
              setOpponent={setOpponent}
            />
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
