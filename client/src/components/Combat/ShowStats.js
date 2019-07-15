import React from "react";
import { Row } from "react-materialize";

export default ({ warrior }) => {
  return (
    <>
      <Row>
        <table>
          <caption className="table-heading">Abilities</caption>
          <thead>
            <tr>
              <th>Strength</th>
              <th>Stamina</th>
              <th>Speed</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{warrior.strength}</td>
              <td>{warrior.stamina}</td>
              <td>{warrior.speed}</td>
              <td>{warrior.skill}</td>
            </tr>
          </tbody>
        </table>
      </Row>
      <Row>
        <table>
          <caption className="table-heading">Armor</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Strength</th>
              <th>Weight</th>
              <th>Size</th>
              <th>Shield?</th>
            </tr>
          </thead>
          <tbody>
            {warrior.armorList.map(armor => (
              <tr>
                <td>{armor.name}</td>
                <td>{armor.strength}</td>
                <td>{armor.weight}</td>
                <td>{armor.size}</td>
                <td>
                  {armor.shield ? <i className="material-icons">check</i> : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <Row>
        <table>
          <caption className="table-heading">Weapons</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Damage</th>
              <th>Weight</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {warrior.weaponList.map(weapon => (
              <tr>
                <td>{weapon.name}</td>
                <td>{weapon.damage}</td>
                <td>{weapon.weight}</td>
                <td>{weapon.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </>
  );
};
