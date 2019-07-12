import React, { Component } from "react";
import { Col, Row, Button } from "react-materialize";
import ScheduleBattle from "./ScheduleBattle";
import DisplayBattle from "./DisplayBattle";

export default class LudusMagnus extends Component {
  state = {
    schedule: false
  };

  openSchedule = e => {
    e.preventDefault();
    this.setState({
      schedule: !this.state.schedule
    });
  };

  render() {
    const { arena, warrior, close } = this.props;

    console.log(`arena`, arena);
    console.log(`warrior`, warrior);
    const warriors = arena.livingWarriors.filter(item => {
      return item != null && item.id !== arena.userWarrior;
    });

    return (
      <div>
        <h5 className="landing-title">Ludus Magnus</h5>
        {this.state.schedule ? null : (
          <Row>
            <Col s={8} offset="s2">
              <Button className="btn create-btn" onClick={this.openSchedule}>
                Schedule a Battle
              </Button>
            </Col>{" "}
          </Row>
        )}

        {this.state.schedule ? (
          <ScheduleBattle
            openSchedule={this.openSchedule}
            warrior={warrior}
            arena={arena}
            close={close}
          />
        ) : null}

        <Row>
          <Col s={6}>
            <p>{arena.name}'s warriors:</p>
            <ul>
              {warriors.map(item => (
                <li key={item.id}>
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </Col>
          <Col s={6}>
            <p>{arena.name}'s Scheduled Battles</p>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Player One</th>
                  <th>Player Two</th>
                  <th>Purse</th>
                </tr>
              </thead>
              <tbody>
                {arena.scheduledBattles
                  ? arena.scheduledBattles.map(battle => (
                      <DisplayBattle key={battle.id} battle={battle} />
                    ))
                  : "No battles scheduled."}
              </tbody>
            </table>
            <p>{arena.name}'s Finished Battles</p>
            <ul>
              {arena.battleArchive
                ? arena.battleArchive.map(battle => (
                    <li key={battle.id}>
                      <p>{arena.battleArchive.id}</p>
                    </li>
                  ))
                : "No battle history."}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}
