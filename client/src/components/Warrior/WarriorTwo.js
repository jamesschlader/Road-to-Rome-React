import React, { Component } from "react";

import { Row, Col, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";
import ActiveWarrior from "./ActiveWarrior";
import AllWarriors from "./AllWarriors";

import WarriorDetails from "./WarriorDetails";

export default class Warrior extends Component {
  state = {
    clicked: false,
    show: false
  };

  handleClick = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      clicked: !this.state.clicked
    });
  };

  selectCard = (id, ArenaId) => {
    this.setState((state, props) => {
      return {
        card: id,
        ArenaId: ArenaId
      };
    });
  };

  handleRedirect = (func1, obj1, obj2) => {
    func1(obj2.Arena.id, obj2.id);
    obj1.authenticate();
  };

  showDetails = obj => {
    console.log(obj.name);
    this.setState((state, props) => {
      console.log(state.card);
      return { card: obj };
    });
    this.setState((state, props) => {
      return { show: !state.show };
    });
  };

  render() {
    const { ArenaId, WarriorId } = this.props.context;
    console.log(`WarriorId = ${WarriorId}`);
    return (
      <div>
        <h1 className="landing-title center-align">Warriors</h1>
        <h3>Arena id = {ArenaId}</h3>
        <h3>Warrior id = {WarriorId}</h3>
        <Row>
          <Col s={8} offset="s2">
            {this.state.clicked ? (
              <CreateWarrior
                data={this.state.data}
                handleClick={this.handleClick}
                close={this.state.clicked}
              />
            ) : (
              <Button className="btn create-btn" onClick={this.handleClick}>
                Create a Warrior
              </Button>
            )}
          </Col>
        </Row>

        {WarriorId ? (
          <Row>
            <ActiveWarrior warrior={WarriorId} />
          </Row>
        ) : null}

        {this.state.show ? (
          <WarriorDetails
            warrior={this.state.card}
            showDetails={this.showDetails}
          />
        ) : this.state.clicked ? null : (
          <Row>
            <ul>
              <AllWarriors
                card={this.state.card}
                selectCard={this.selectCard}
                handleRedirect={this.handleRedirect}
                showDetails={this.showDetails}
                context={this.props.context}
              />
            </ul>
          </Row>
        )}
      </div>
    );
  }
}
