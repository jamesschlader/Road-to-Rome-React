import React, { Component } from "react";
import {
  getArmorsQuery,
  getWeaponsQuery,
  getArenasQuery
} from "../queries/queries";
import { graphql, compose } from "react-apollo";

class GetSomeData extends Component {
  displayArmors = () => {
    let { getArmorsQuery } = this.props;
    console.log(`getArmorsQuery: `, getArmorsQuery);
    if (getArmorsQuery.loading) {
      return <li>Loading Armors...</li>;
    } else {
      if (getArmorsQuery.armors) {
        return getArmorsQuery.armors.map(armor => (
          <li key={armor.id} style={{ display: "inline-block", padding: 8 }}>
            <p>{armor.name}</p>
            <p>Strength: {armor.strength}</p>
            <p>Cost: {armor.cost}</p>
            <p>Cost Type: {armor.costType}</p>
            <p>Weight in pounds: {armor.weight}</p>
            <p>Shield: {armor.shield ? `Yes` : `No`}</p>
            <p>Size: {armor.size}</p>
            <br />
          </li>
        ));
      }
    }
  };

  displayWeapons = () => {
    let { getWeaponsQuery } = this.props;
    console.log(`getWeaponsQuery`, getWeaponsQuery);
    if (getWeaponsQuery.loading) {
      return <li>Weapons loading...</li>;
    } else {
      if (getWeaponsQuery.weapons) {
        return getWeaponsQuery.weapons.map(weapon => (
          <li key={weapon.id} style={{ display: "inline-block", padding: 8 }}>
            <p>{weapon.name}</p>
            <p>Damage: {weapon.damage}</p>
            <p>Cost: {weapon.cost}</p>
            <p>CostType: {weapon.costType}</p>
            <p>Weight: {weapon.weight}</p>
            <p>Size: {weapon.size}</p>
          </li>
        ));
      }
    }
  };

  displayArenas = () => {
    let { getArenasQuery } = this.props;
    console.log(`getArenasQuery`, getArenasQuery);
    if (getArenasQuery.loading) {
      return <li>Loading Arenas...</li>;
    } else {
      if (getArenasQuery.arenas) {
        return getArenasQuery.arenas.map(arena => (
          <li key={arena.id} style={{ display: "inline-block", padding: 8 }}>
            <p>{arena.name}</p>

            <p>Games Frequency: {arena.gamesFrequency}</p>
            <p>Battles per Game day: {arena.battleQuantity}</p>

            <p>Market Skills Upgrade Cost: {arena.Market.skillsUpgradeCost}</p>
            <p>Market Gear Cost Factor: {arena.Market.gearCostFactor}</p>
            <p>Armors:</p>
            <p>Number of Armors: {arena.Market.armorIds.length}</p>

            <ul>
              {arena.Market.armorList.map(armor => (
                <li
                  key={armor.id}
                  style={{ display: "inline-block", padding: 8 }}
                >
                  <p>{armor.name}</p>
                  <p>Strength: {armor.strength}</p>
                  <p>Market Cost: {armor.cost}</p>
                  <p>Cost Type: {armor.costType}</p>
                  <p>Weight in pounds: {armor.weight}</p>
                  <p>Shield: {armor.shield ? `Yes` : `No`}</p>
                  <p>Size: {armor.size}</p>
                  <br />
                </li>
              ))}
            </ul>
            <p>Weapons:</p>
            <p>Number of Weapons: {arena.Market.weaponIds.length}</p>

            <ul>
              {arena.Market.weaponList.map(weapon => (
                <li
                  key={weapon.id}
                  style={{ display: "inline-block", padding: 8 }}
                >
                  <p>{weapon.name}</p>
                  <p>Damage: {weapon.damage}</p>
                  <p>Market Cost: {weapon.cost}</p>
                  <p>CostType: {weapon.costType}</p>
                  <p>Weight: {weapon.weight}</p>
                  <p>Size: {weapon.size}</p>
                  <br />
                </li>
              ))}
            </ul>
          </li>
        ));
      }
    }
  };

  render() {
    return (
      <div className="rounded-content-box">
        <h3>Yo data</h3>
        <h4>Arenas</h4>
        <ul>{this.displayArenas()}</ul>
        <h4>Armors</h4>
        <ul>{this.displayArmors()}</ul>
        <h4>Weapons</h4>
        <ul>{this.displayWeapons()}</ul>
      </div>
    );
  }
}

export default compose(
  graphql(getArmorsQuery, { name: "getArmorsQuery" }),
  graphql(getWeaponsQuery, { name: "getWeaponsQuery" }),
  graphql(getArenasQuery, { name: "getArenasQuery" })
)(GetSomeData);
