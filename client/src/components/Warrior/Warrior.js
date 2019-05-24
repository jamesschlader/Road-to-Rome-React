import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import getWarriorsQuery from "../../api/Warrior/queries/getWarriorsQuery";
import { Row, Col, Card, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";
import { addWarriorMutation } from "../../api/Warrior/mutations/addWarrior";
import { Link } from "react-router-dom";
import { ArenaContext } from "../Base/Layout";
import { addWarriorToArena } from "../../api/Arena/mutations/addWarriorToArena";

class Warrior extends Component {
  state = {
    clicked: false,
    name: "",
    creating: false
  };
  displayWarriors = () => {
    let { getWarriorsQuery } = this.props;

    if (getWarriorsQuery.loading) {
      return <li>Loading Warriors...</li>;
    } else {
      if (getWarriorsQuery.warriors) {
        return getWarriorsQuery.warriors.map(warrior => (
          <li key={warrior.id} style={{ display: "inline-block", padding: 8 }}>
            <Card
              onClick={e => this.selectCard(warrior.id, warrior.ArenaId)}
              className="card-layout"
              title={warrior.name}
              style={{
                background: `${
                  this.state.card === warrior.id ? "green" : "white"
                }`
              }}
            >
              <img
                src={warrior.image}
                alt={warrior.name}
                className="card-img"
              />
              <div>
                <p>
                  Current Arena: <strong>{warrior.Arena.name}</strong>
                </p>
              </div>
            </Card>
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

  selectCard = (id, ArenaId) => {
    this.setState({
      card: id,
      ArenaId: ArenaId
    });
  };

  handleClick = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      clicked: !this.state.clicked
    });
  };

  createWarrior = data => {
    console.log(data);
    this.setState({
      data: data
    });
    this.props.addWarriorMutation({
      variables: { ...data },
      refetchQueries: [{ query: getWarriorsQuery }]
    });
    this.props.addWarriorToArena({
      variables: { arenaId: this.state.ArenaId, warriorId: this.state.card },
      refetchQueries: [{ query: getWarriorsQuery }]
    });
    this.setState({
      clicked: !this.state.clicked
    });
  };

  handleRedirect = (func1, obj) => {
    func1(this.state.ArenaId, this.state.card);
    obj.authenticate();
  };

  render() {
    return (
      <ArenaContext.Consumer>
        {({ ArenaId, setArena, RoadAuth }) => (
          <div>
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
              {this.state.card ? (
                <Link to="/arena">
                  <Button
                    className="btn create-btn"
                    style={{ background: "green" }}
                    onClick={e => this.handleRedirect(setArena, RoadAuth)}
                  >
                    Continue Journey
                  </Button>
                  <h1>{ArenaId}</h1>
                </Link>
              ) : null}
            </Row>

            {this.state.clicked ? null : (
              <Row>
                <ul>{this.displayWarriors()}</ul>
              </Row>
            )}
          </div>
        )}
      </ArenaContext.Consumer>
    );
  }
}

export default compose(
  graphql(getWarriorsQuery, { name: "getWarriorsQuery" }),
  graphql(addWarriorMutation, { name: "addWarriorMutation" }),
  graphql(addWarriorToArena, { name: "addWarriorToArena" })
)(Warrior);
