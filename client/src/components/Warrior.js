import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import getWarriorsQuery from "../api/Warrior/queries/getWarriorsQuery";
import { Row, Col, Card, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";

class Warrior extends Component {
  state = {
    clicked: false,
    name: ""
  };
  displayWarriors = () => {
    let { getWarriorsQuery } = this.props;
    console.log(getWarriorsQuery);
    if (getWarriorsQuery.loading) {
      return <li>Loading Warriors...</li>;
    } else {
      if (getWarriorsQuery.warriors.length > 0) {
        return getWarriorsQuery.warriors.map(warrior => (
          <li key={warrior.id} style={{ display: "inline-block", padding: 8 }}>
            <Row>
              <Col s={4}>
                <Card header={<h5>{warrior.name}</h5>}>
                  <img src={warrior.image} alt={warrior.name} />
                  <p>Strength: {warrior.strength}</p>
                  <p>Stamina: {warrior.stamina}</p>
                  <p>Speed: {warrior.speed}</p>
                  <p>Skill: {warrior.skill}</p>
                  <p>Wallet: {warrior.wallet}</p>
                  <p>
                    Current Arena: <strong>{warrior.Arena.name}</strong>
                  </p>
                </Card>
              </Col>
            </Row>
          </li>
        ));
      } else {
        return (
          <li>
            <h5>No Warriors to display.</h5>
          </li>
        );
      }
    }
  };

  handleClick = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      clicked: !this.state.clicked
    });
  };

  createWarrior = data => {
    // TODO: call the mutation to create a warrior with data coming from the component.
    this.setState({
      data: data
    });
  };

  render() {
    return (
      <div className="rounded-content-box">
        <h1 className="landing-title center-align">Warriors</h1>
        <Row>
          <Col s={8} offset="s2">
            {this.state.clicked ? (
              <CreateWarrior
                data={this.state.data}
                handleClick={this.handleClick}
                close={this.state.clicked}
                createWarrior={this.createWarrior}
              />
            ) : (
              <Button className="btn create-btn" onClick={this.handleClick}>
                Create a Warrior
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <ul>{this.displayWarriors()}</ul>
        </Row>
      </div>
    );
  }
}

export default compose(graphql(getWarriorsQuery, { name: "getWarriorsQuery" }))(
  Warrior
);
