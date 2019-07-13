import React, { Component } from "react";
import RtoRBtn from "../Shared/RtoRBtn";
import { Row, Col, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";
import AllWarriors from "./AllWarriors";
import WarriorDelete from "./WarriorDelete";

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

  showDetails = obj => {
    this.setState({
      card: obj
    });
    this.setState((state, props) => {
      return { show: !state.show };
    });
  };

  render() {
    const {
      MONEY_CONVERTER,

      handleRedirect,
      setArena,
      RoadAuth
    } = this.props.context;

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
          <React.Fragment>
            <WarriorDelete
              warrior={this.state.card}
              showDetails={this.showDetails}
              show={this.state.show}
              handleDelete={this.handleDelete}
              MONEY_CONVERTER={MONEY_CONVERTER}
              context={this.props.context}
              handleRedirect={handleRedirect}
            />

            <Col s={2}>
              <RtoRBtn
                clickAction={this.showDetails}
                icon="keyboard_backspace"
                data={this.state.card}
              />
            </Col>
          </React.Fragment>
        ) : !this.state.show ? (
          this.state.create ? null : (
            <Row className="center-align">
              <ul>
                <AllWarriors
                  showDetails={this.showDetails}
                  setArena={setArena}
                  handleRedirect={handleRedirect}
                  RoadAuth={RoadAuth}
                />
              </ul>
            </Row>
          )
        ) : null}
      </div>
    );
  }
}
