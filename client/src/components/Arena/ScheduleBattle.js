import React, { useState } from "react";
import { Row, Button } from "react-materialize";
import AddBattleMutation from "./AddBattleMutation";
import BattleCard from "../Warrior/BattleCard";
import EventPicker from "./EventPicker";

export default ({ openSchedule, warrior, arena, close }) => {
  const defaultMessage = { name: "Select an opponent" };

  const [opponent, setOpponent] = useState(defaultMessage);
  const [event, setEvent] = useState(new Date());
  const [week, setWeek] = useState(false);

  const opponents = arena.livingWarriors.filter(item => {
    if (opponent.id) {
      return item.id === opponent.id;
    } else {
      return item.id !== warrior.id;
    }
  });

  const toggleWeek = () => {
    setWeek(!week);
  };

  return (
    <div>
      <h3>Schedule a Battle</h3>
      <Button className="btn inline-content" onClick={openSchedule}>
        Close
      </Button>
      <Button className="btn inline-content" onClick={toggleWeek}>
        {week ? "Show current week" : "Show following week"}
      </Button>
      <Row className="small-padding">
        <Row s={6}>
          <EventPicker arena={arena} setEvent={setEvent} week={week} />
        </Row>
        <h4 className="inline-content">{warrior.name}</h4>
        <h5 className="inline-content">vs</h5>
        <h5 className="inline-content">{opponent.name}</h5>

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
        {opponent.id && <Button>Change Opponent</Button>}
        <ul style={{ display: "inline-block" }}>
          {opponents.map(candidate => (
            <BattleCard
              key={candidate.id}
              candidate={candidate}
              opponent={opponent}
              setOpponent={setOpponent}
            />
          ))}
        </ul>
      </Row>
    </div>
  );
};
