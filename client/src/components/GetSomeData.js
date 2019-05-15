import React, { Component } from "react";
import {
  getArenasQuery,
  getArmorsQuery,
  getWeaponsQuery
} from "../queries/queries";
import { graphql, compose } from "react-apollo";

class GetSomeData extends Component {
  displayArenas = () => {
    console.log(this.props);
    let { getArmorsQuery } = this.props;
    if (getArmorsQuery.loading) {
      return <li>Loading Arenas...</li>;
    } else {
      if (getArmorsQuery.armors) {
        return getArmorsQuery.armors.map(armor => (
          <li key={armor.id}>
            <p>ID: {armor.id}</p>
            <p>Name: {armor.name}</p>
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

  render() {
    return (
      <div className="rounded-content-box">
        <h3>Yo data</h3>
        <ul>{this.displayArenas()}</ul>
      </div>
    );
  }
}

export default compose(graphql(getArmorsQuery, { name: "getArmorsQuery" }))(
  GetSomeData
);
