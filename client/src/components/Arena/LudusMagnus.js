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
    const { arena, warrior } = this.props;
    arena.userWarrior = warrior.id;
    console.log(`arena`, arena);
    console.log(`warrior`, warrior);
    const warriors = arena.warriorList.filter(item => {
      return item != null && item.alive && item.id !== arena.userWarrior;
    });
    console.log(`warriors length is ${warriors.length}`, warriors);

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
            <ul>
              {arena.scheduledBattles
                ? arena.scheduledBattles.map(battle => (
                    <DisplayBattle battle={battle} />
                  ))
                : "No battles scheduled."}
            </ul>
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
