import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-materialize";
import GetWarrior from "../Warrior/GetWarrior";
import ShowAbilities from "./ShowAbilities";
import ShowWinnings from "./ShowWinnings";
import ShowNextBattle from "./ShowNextBattle";
import ShowCash from "./ShowCash";
import ShowArmor from "./ShowArmor";
import ShowWeapons from "./ShowWeapons";
import { Link } from "react-router-dom";
import Button from "react-materialize/lib/Button";

export default ({ warrior, context, showDetails, show, location }) => {
  const [activeWarrior, setActiveWarrior] = useState(warrior);

  useEffect(() => {
    setActiveWarrior(warrior);
  }, [warrior]);

  return (
    <Fragment>
      {!warrior.strength ? (
        <GetWarrior id={warrior.id} setWarrior={setActiveWarrior} />
      ) : null}

      <Row>
        {show ? <Button onClick={showDetails}>Done</Button> : null}

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
          {location.pathname === "/arena" ? null : (
            <>
              <h5>Current Arena</h5>
              <Link
                key={warrior.Arena.id}
                to="/arena"
                style={{ color: "green" }}
              >
                <h2
                  onClick={e => {
                    context.handleRedirect(
                      context.setArena,
                      context.RoadAuth,
                      activeWarrior
                    );
                  }}
                >
                  {warrior.Arena.name}
                </h2>
              </Link>
            </>
          )}
        </div>

        {activeWarrior ? (
          <>
            <ShowCash
              warrior={activeWarrior}
              MONEY_CONVERTER={context.MONEY_CONVERTER}
            />
            <ShowWinnings
              warrior={activeWarrior}
              MONEY_CONVERTER={context.MONEY_CONVERTER}
            />
          </>
        ) : (
          <p>Waiting for warrior details...</p>
        )}
      </Row>
      {activeWarrior ? (
        <>
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
        </>
      ) : (
        <p>Waiting for warrior details...</p>
      )}
    </Fragment>
  );
};
