import React from "react";
import Button from "react-materialize/lib/Button";
import Row from "react-materialize/lib/Row";
import Col from "react-materialize/lib/Col";

export default ({ showDetails, warrior }) => {
  console.log(warrior);
  return (
    <React.Fragment>
      <Row>
        <Col s={12}>
          <div>
            <div style={{ display: "inline-block", width: "25vw" }}>
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
            </div>
            <div style={{ display: "inline-block", padding: "2vw" }}>
              <h5>Current Arena</h5>
              <p>{warrior.Arena.name}</p>
              <h5>Abilities</h5>
              <p>Strength: {warrior.strength}</p>
              <p>Stamina: {warrior.stamina}</p>
              <p>Speed: {warrior.speed}</p>
              <p>Skill: {warrior.skill}</p>
            </div>
            <div style={{ display: "inline-block", padding: "2vw" }}>
              <h5>Next Battle</h5>
              {warrior.nextScheduledBattle.length > 0 ? (
                <p>{warrior.nextScheduledBattle[0]}</p>
              ) : (
                <p>No Battle Scheduled</p>
              )}
              <h5> Available Cash</h5>
              <p>{warrior.wallet} gp</p>
              <h5>Total Winnings</h5>
              {warrior.winnings ? (
                <p>{warrior.winnings}</p>
              ) : (
                <p>No Battles Won</p>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Button onClick={e => showDetails(warrior)}>Back</Button>
      </Row>
    </React.Fragment>
  );
};
