import React from "react";
import { Row, Col } from "react-materialize";

export default ({ warrior, MONEY_CONVERTER }) => {
  return (
    <div>
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
                <p>{warrior.winnings * MONEY_CONVERTER}</p>
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
              <p>{warrior.wallet * MONEY_CONVERTER} sp</p>
              <h5>Armor</h5>
              <ul>
                {warrior.armorList.map((armor, index) => (
                  <li key={armor.id + index}>
                    <p>{armor.name}</p>
                  </li>
                ))}
              </ul>
              <h5>Weapons</h5>
              <ul>
                {warrior.weaponList.map((weapon, index) => (
                  <li key={weapon.id + index}>
                    <p>{weapon.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
