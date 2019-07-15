import React, { Fragment, useState } from "react";
import { Row, Col } from "react-materialize";
import { Link } from "react-router-dom";
import GetCurrentBattle from "./GetCurrentBattle";
import DisplayPlayer from "./DisplayPlayer";
import PlayerVitals from "./PlayerVitals";
import cardContent from "../../utilities/cardContent";
import Button from "react-materialize/lib/Button";
import ActionCard from "./ActionCard";

export default ({ context }) => {
  console.log(context);
  const { Battle, Arena, Warrior, MONEY_CONVERTER } = context;
  const [showPlayerOneStats, setShowPlayerOneStats] = useState(false);
  const [showPlayerTwoStats, setShowPlayerTwoStats] = useState(false);
  const [currentBattle, setCurrentBattle] = useState(Battle);
  const [turn, setTurn] = useState(true);
  const { playerOne, playerTwo } = currentBattle;

  const switchTurns = e => {
    e.preventDefault();
    setTurn(!turn);
  };

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
              <Button>The battle is over</Button>
            </Link>
            <Button className="btn" onClick={e => switchTurns(e)}>
              Switch Turns
            </Button>
          </>
        ) : null}
      </Row>
      <Row className="battlefield">
        <Row>
          <PlayerVitals
            playerOne={playerOne}
            playerTwo={playerTwo}
            turn={turn}
          />
        </Row>
        <Row>
          <ul className="center-align">
            {cardContent.map((card, index) => (
              <li key={index} className="inline-content tight">
                <ActionCard content={card} />
              </li>
            ))}
          </ul>
        </Row>
      </Row>

      <GetCurrentBattle
        setCurrentBattle={setCurrentBattle}
        battle={context.Battle}
      />
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
