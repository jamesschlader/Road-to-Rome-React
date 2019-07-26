import React, { Fragment, useState } from "react";
import { Row, Col } from "react-materialize";
import GetWarrior from "../Warrior/GetWarrior";
import ShowAbilities from "./ShowAbilities";
import ShowWinnings from "./ShowWinnings";
import ShowNextBattle from "./ShowNextBattle";
import ShowCash from "./ShowCash";
import ShowArmor from "./ShowArmor";
import ShowWeapons from "./ShowWeapons";
import Button from "react-materialize/lib/Button";
import { Link } from "react-router-dom";

export default ({ warrior, context, showDetails, show, location }) => {
  const [activeWarrior, setActiveWarrior] = useState(warrior);

  return (
    <Fragment>
      <GetWarrior id={warrior.id} setWarrior={setActiveWarrior} />

      <Row>{show && <Button onClick={showDetails}>Done</Button>}</Row>
      <Row>
        <Col s={6} className="inline-content">
          {location.pathname !== "/arena" && (
            <div>
              <h5>Current Arena</h5>
              {warrior.Arena && warrior.alive ? (
                <div className="highlight-header">
                  <Link key={warrior.Arena.id} to="/arena">
                    <h2
                      className="center-align"
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
                </div>
              ) : (
                <h2>{warrior.Arena.name}</h2>
              )}
            </div>
          )}
        </Col>
        <Col s={6} className="warrior-card">
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
        </Col>
      </Row>
      <Row>
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
