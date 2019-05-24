import React, { Component } from "react";
import getSingleArena from "../../api/Arena/queries/getSingleArena";
import getSingleWarrior from "../../api/Warrior/queries/getSingleWarrior";
import { Query } from "react-apollo";
import { Row, Col, Button } from "react-materialize";

export default class Arena extends Component {
  goBack = e => {
    e.preventDefault();
    window.history.back();
  };

  render() {
    const { arenaId, warriorId } = this.props;
    console.log(`arena id = ${arenaId} and warrior id = ${warriorId}`);
    const ArenaResult = (id, warriorId) => (
      <Query query={getSingleArena} variables={{ id, warriorId }}>
        {({ loading: loadingArena, error: arenaError, data: { arena } }) => (
          <Query query={getSingleWarrior} variables={{ warriorId }}>
            {({
              loading: loadingWarrior,
              error: warriorError,
              data: { warrior }
            }) => {
              if (warriorError) return <h5>Error loading the warrior!</h5>;
              if (arenaError) return <h5>Error loading the warrior!</h5>;
              if (loadingArena)
                return <h4 className="center-align">Loading Arena...</h4>;
              if (loadingWarrior)
                return (
                  <Row className="page-padding">
                    <h5>Loading Warrior...</h5>
                  </Row>
                );

              return (
                <React.Fragment>
                  <Row className="page-padding ">
                    <Col s={1}>
                      <Button onClick={this.goBack}>
                        <span>
                          <i className="material-icons"> keyboard_backspace</i>
                        </span>
                      </Button>
                    </Col>

                    <h1 className="landing-title center-align">
                      {" "}
                      {arena.name}
                    </h1>
                    <ul>
                      {arena.warriorList.map(warrior => (
                        <li key={warrior.id}>{warrior.name}</li>
                      ))}
                    </ul>
                  </Row>
                  <Row>
                    <Col s={6}>
                      {" "}
                      <h3 className="center-align">{warrior.name}</h3>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            }}
          </Query>
        )}
      </Query>
    );

    return <React.Fragment>{ArenaResult(arenaId, warriorId)}</React.Fragment>;
  }
}
