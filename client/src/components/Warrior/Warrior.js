import React, { Component } from "react";

import { Row, Col, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";

import AllWarriors from "./AllWarriors";

import WarriorDetails from "./WarriorDetails";

export default class Warrior extends Component {
  state = {
    create: false,
    show: false
  };

  handleQuit = e => {
    e.preventDefault();

    this.setState({
      create: !this.state.create
    });
  };

  handleDelete = e => {
    e.preventDefault();
    this.setState({
      card: null,
      show: false
    });
  };

  handleRedirect = (func1, obj1, obj2) => {
    func1(obj2.Arena.id, obj2.id);
    obj1.authenticate();
  };

  showDetails = obj => {
    this.setState({
      card: obj
    });

    this.setState((state, props) => {
      return { show: !state.show };
    });
  };

  render() {
    return (
      <div>
        <h1 className="landing-title center-align">Warriors</h1>

        <Row>
          <Col s={8} offset="s2">
            {this.state.create ? (
              <CreateWarrior handleQuit={this.handleQuit} />
            ) : this.state.show ? null : (
              <Button className="btn create-btn" onClick={this.handleQuit}>
                Create a Warrior
              </Button>
            )}
          </Col>
        </Row>

        {this.state.show && this.state.card ? (
          <WarriorDetails
            warrior={this.state.card}
            showDetails={this.showDetails}
            handleDelete={this.handleDelete}
          />
        ) : !this.state.show ? (
          this.state.create ? null : (
            <Row className="center-align">
              <ul>
                <AllWarriors
                  handleRedirect={this.handleRedirect}
                  showDetails={this.showDetails}
                  context={this.props.context}
                />
              </ul>
            </Row>
          )
        ) : null}
      </div>
    );
  }
}
