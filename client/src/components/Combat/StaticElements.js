import React from "react";
import { Row, Col, Button } from "react-materialize";
import { Link } from "react-router-dom";
import DisplayPlayer from "./DisplayPlayer";

export default ({ staticProps }) => {
  const {
    Arena,
    Warrior,
    Battle,
    MONEY_CONVERTER,
    playerOne,
    playerTwo,
    showPlayerOneStats,
    showPlayerTwoStats,
    setShowPlayerOneStats,
    setShowPlayerTwoStats
  } = staticProps;
  return (
    <div>
      <Link className="center-align" to="/arena">
        <Button>Exit</Button>
      </Link>
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
      <Row>
        <Col s={4}>
          <DisplayPlayer
            show={showPlayerOneStats}
            toggleShow={setShowPlayerOneStats}
            player={playerOne}
            opponent={playerTwo}
            left={true}
          />
        </Col>
        <Col s={4}>
          <h3 className="center-align">
            {Battle.playerOne.name} vs {Battle.playerTwo.name}
          </h3>
        </Col>
        <Col s={4} className="right-align">
          <DisplayPlayer
            show={showPlayerTwoStats}
            toggleShow={setShowPlayerTwoStats}
            player={playerTwo}
            opponent={playerOne}
            left={false}
          />
        </Col>
      </Row>
    </div>
  );
};
