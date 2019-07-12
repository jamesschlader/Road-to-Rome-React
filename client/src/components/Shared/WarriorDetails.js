import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-materialize";
import GetWarrior from "../Warrior/GetWarrior";
import ShowAbilities from "./ShowAbilities";
import ShowWinnings from "./ShowWinnings";
import ShowNextBattle from "./ShowNextBattle";
import ShowCash from "./ShowCash";
import ShowArmor from "./ShowArmor";
import ShowWeapons from "./ShowWeapons";

export default ({ warrior, MONEY_CONVERTER }) => {
  const [activeWarrior, setActiveWarrior] = useState(warrior);

  useEffect(() => {
    console.log(activeWarrior);
    setActiveWarrior(warrior);
  }, [warrior]);
  return (
    <Fragment>
      <GetWarrior id={warrior.id} setWarrior={setActiveWarrior} />
      <Row>
        <div className="warrior-card">
          <img
            src={warrior.image}
            alt={warrior.name}
            className="card-img"
            style={{
              background: `${warrior.alive ? "green" : "#b71c1c"}`,
              borderRadius: "50%",
              padding: "2vw"
            }}
          />
          <h4>{warrior.name}</h4>
        </div>
      </Row>
      <Row>
        <div className="inline-content">
          <h5>Current Arena</h5>
          <p>{activeWarrior.Arena.name}</p>
        </div>
        <ShowCash warrior={activeWarrior} MONEY_CONVERTER={MONEY_CONVERTER} />
        <ShowWinnings
          warrior={activeWarrior}
          MONEY_CONVERTER={MONEY_CONVERTER}
        />
      </Row>
      <Row>
        <Col s={6}>
          <ShowAbilities warrior={activeWarrior} />
        </Col>
        <Col s={6}>
          <ShowNextBattle warrior={activeWarrior} />
        </Col>
      </Row>
      <Row>
        <Col s={6}>
          <ShowArmor warrior={activeWarrior} />
        </Col>
        <Col s={6}>
          <ShowWeapons warrior={activeWarrior} />
        </Col>
      </Row>
    </Fragment>
  );
};
