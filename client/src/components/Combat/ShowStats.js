import React from "react";
import { Row } from "react-materialize";

export default ({ warrior, opponent }) => {
  const colorize = property => {
    if (warrior[property] > opponent[property]) {
      return "green";
    } else if (opponent[property] > warrior[property]) {
      return "#b71c1c";
    } else {
      return "yellow";
    }
  };

  const slimmedWeaponsList = () => {
    const current = warrior.weaponList;
    let list = [current[0]];
    for (let i = 1; i < current.length; i++) {
      const filtered = list
        .map(item => item.id)
        .filter(id => {
          return id === current[i].id && id;
        });
      console.log(
        `current[${i}] = ${current[i].name} id = ${current[i].id}`,
        filtered
      );
      console.log(!filtered.includes(current[i].id));
      if (!filtered.includes(current[i].id)) {
        list.push(current[i]);
      }
    }
    return list;
  };

  const speedRanges = size => {
    if (size === "light") return [1, 2, 3];
    if (size === "medium") return [2, 3, 4];
    if (size === "heavy") return [3, 4, 5];
  };

  const weaponDamageBySize = (speed, dmg) => {
    const block = Math.floor((warrior.strength + dmg) / 5);
    if (speed === 5) {
      return warrior.strength + dmg;
    } else {
      return speed * block;
    }
  };

  return (
    <>
      <Row>
        <table className="highlighted responsive">
          <caption className="table-heading">Abilities</caption>
          <thead>
            <tr>
              <th>Strength</th>
              <th>Wound Threshold</th>
              <th>Stamina</th>
              <th>Speed</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: colorize("strength") }}>
                {warrior.strength}
              </td>
              <td>{Math.floor(warrior.strength / 2)}</td>
              <td style={{ color: colorize("stamina") }}>{warrior.stamina}</td>
              <td style={{ color: colorize("speed") }}>{warrior.speed}</td>
              <td style={{ color: colorize("skill") }}>{warrior.skill}</td>
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
              <th>Armor Rating</th>
              <th>Weight</th>
              <th>Size</th>
              <th>Shield?</th>
            </tr>
          </thead>
          <tbody>
            {warrior.armorList.map(armor => (
              <tr key={armor.id}>
                <td>{armor.name}</td>
                <td>{armor.strength}</td>
                <td>{armor.strength - 10}</td>
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
              <th colSpan="3">Speed: DMG</th>
            </tr>
          </thead>
          <tbody>
            {slimmedWeaponsList().map(weapon => (
              <tr key={weapon.id}>
                <td>{weapon.name}</td>
                <td>{weapon.damage}</td>
                <td>{weapon.weight} lbs</td>
                <td>{weapon.size}</td>
                {speedRanges(weapon.size).map((item, index) => (
                  <td key={index}>
                    <span>{item}:</span>
                    <span>{weaponDamageBySize(item, weapon.damage)}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </>
  );
};
