import React, { Fragment, useState } from "react";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";
import GetCurrentBattle from "./GetCurrentBattle";
import DisplayPlayer from "./DisplayPlayer";
import PlayerVitals from "./PlayerVitals";

import Button from "react-materialize/lib/Button";
import CombatLoop from "./CombatLoop";

export default ({ context }) => {
  const { Battle, Arena, Warrior, MONEY_CONVERTER } = context;
  const [currentBattle, setCurrentBattle] = useState(Battle);
  const [showPlayerOneStats, setShowPlayerOneStats] = useState(false);
  const [showPlayerTwoStats, setShowPlayerTwoStats] = useState(false);
  const [turn, setTurn] = useState(null);
  const [start, setStart] = useState(false);
  const { playerOne, playerTwo } = currentBattle;
  const [oneVitals, setOneVitals] = useState(playerOne);
  const [twoVitals, setTwoVitals] = useState(playerTwo);

  return (
    <Fragment>
      <Row className="page-padding ">
        {Arena && Battle ? (
          <>
            <h3 className="landing-title center-align">Combat</h3>
            <Row>
              <Col s={6} className="left-align">
                <h5>{Arena.name} Arena</h5>
                <p>User player: {Warrior.name}</p>
              </Col>
              <Col s={6} className="right-align">
                <h5 className="inline-content">Purse: </h5>
                <h4 className="inline-content" style={{ color: "green" }}>
                  {Battle.purse * MONEY_CONVERTER}
                </h4>
                <h5 className="inline-content">sp</h5>
              </Col>
            </Row>
            <h3 className="center-align">
              {Battle.playerOne.name} vs {Battle.playerTwo.name}
            </h3>
            <Link className="center-align" to="/arena">
              <Button>Exit</Button>
            </Link>

            <Row>
              {start ? (
                <>
                  <Button className="btn" onClick={e => setTurn(!turn)}>
                    Switch Turns
                  </Button>
                  <Button className="btn" onClick={e => setStart(!start)}>
                    Finish Battle
                  </Button>
                </>
              ) : (
                <Col s={4} offset="s4">
                  <Button
                    className="btn expand-content selection-button create-btn fancy"
                    onClick={e => setStart(!start)}
                  >
                    start battle
                  </Button>
                </Col>
              )}
            </Row>
          </>
        ) : null}
      </Row>

      <GetCurrentBattle
        setCurrentBattle={setCurrentBattle}
        battle={context.Battle}
      />
      <Row className="battlefield">
        <Row>
          <PlayerVitals
            playerOne={playerOne}
            playerTwo={playerTwo}
            turn={turn}
            setOneVitals={setOneVitals}
            setTwoVitals={setTwoVitals}
          />
        </Row>
        {start ? <CombatLoop /> : null}
      </Row>

      <Row className="side-content side-left rounded-content-box btn-row">
        <DisplayPlayer
          show={showPlayerOneStats}
          toggleShow={setShowPlayerOneStats}
          player={playerOne}
        />
      </Row>

      <Row className="side-content side-right rounded-content-box btn-row">
        <DisplayPlayer
          show={showPlayerTwoStats}
          toggleShow={setShowPlayerTwoStats}
          player={playerTwo}
        />
      </Row>
    </Fragment>
  );
};
