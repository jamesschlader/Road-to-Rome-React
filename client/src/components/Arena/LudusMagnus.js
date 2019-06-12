import React, { Component } from "react";
import { Col, Row, Button } from "react-materialize";
import ScheduleBattle from "./ScheduleBattle";

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
    console.log(arena);
    arena.userWarrior = [warrior.id];
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
            <p>Show me all your warriors:</p>
            <ul>
              {arena.warriorList
                .filter(item => {
                  return item !== null && item.alive;
                })
                .map(warrior => (
                  <li key={warrior.id}>
                    <p>
                      {warrior.name} is{" "}
                      {warrior.nextScheduledBattle
                        ? `is scheduled to battle at ${
                            warrior.nextScheduledBattle.Arena.name
                          } against ${
                            warrior.nextScheduledBattle.playerOne === warrior.id
                              ? warrior.nextScheduledBattle.playerTwo
                              : warrior.nextScheduledBattle.playerOne
                          }`
                        : "not on the battle schedule."}
                    </p>
                  </li>
                ))}
            </ul>
          </Col>
          <Col s={6}>
            <p>Show me all your Scheduled Battles</p>
            <ul>
              {arena.scheduledBattles
                ? arena.scheduledBattles.map(battle => (
                    <li key={battle.id}>
                      <p>
                        {battle.playerOne} vs {battle.playerTwo} for{" "}
                        {battle.purse} on {battle.date}
                      </p>
                    </li>
                  ))
                : "No battles scheduled."}
            </ul>
            <p>Show me all your Finished Battles</p>
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
