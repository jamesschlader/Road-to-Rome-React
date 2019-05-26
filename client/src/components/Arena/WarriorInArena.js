import React, { Component } from "react";

import Row from "react-materialize/lib/Row";
import Col from "react-materialize/lib/Col";

export default class WarriorInArena extends Component {
  componentDidMount() {
    this.props.setWarrior(this.props.warrior);
  }
  render() {
    const { warrior } = this.props;
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
                <h4>{warrior.name}</h4>
              </div>
              <div style={{ display: "inline-block", padding: "2vw" }}>
                <h5>Current Arena</h5>
                <p>{warrior.Arena.name}</p>
                <h5>Abilities</h5>
                <p>Strength: {warrior.strength}</p>
                <p>Stamina: {warrior.stamina}</p>
                <p>Speed: {warrior.speed}</p>
                <p>Skill: {warrior.skill}</p>
                <h5>Total Winnings</h5>
                {warrior.winnings ? (
                  <p>{warrior.winnings}</p>
                ) : (
                  <p>No Battles Won</p>
                )}
              </div>
              <div style={{ display: "inline-block", padding: "2vw" }}>
                <h5>Next Battle</h5>
                {warrior.nextScheduledBattle.length > 0 ? (
                  <p>{warrior.nextScheduledBattle[0]}</p>
                ) : (
                  <p>No Battle Scheduled</p>
                )}
                <h5> Available Cash</h5>
                <p>{warrior.wallet * 100} sp</p>
                <h5>Armor</h5>
                <ul>
                  {warrior.armorList.map(armor => (
                    <li key={armor.id}>
                      <p>{armor.name}</p>
                    </li>
                  ))}
                </ul>
                <h5>Weapons</h5>
                <ul>
                  {warrior.weaponList.map(weapon => (
                    <li key={weapon.id}>
                      <p>{weapon.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
