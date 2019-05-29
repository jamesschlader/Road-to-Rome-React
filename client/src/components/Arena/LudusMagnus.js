import React, { Component } from "react";
import { Col } from "react-materialize";

export default class LudusMagnus extends Component {
  render() {
    const { arena, warrior } = this.props;
    console.log(warrior.ArenaId);
    console.log(warrior);
    arena.userWarrior = [warrior.id];
    return (
      <div>
        <h5 className="landing-title">Ludus Magnus</h5>
        <p>Arena Id = {arena.id}</p>
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
                    {warrior.nextScheduledBattle.length > 0
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
            {arena.scheduledBattles > 0
              ? arena.scheduledBattles.map(battle => (
                  <li key={battle.id}>
                    <p>{battle.id}</p>
                  </li>
                ))
              : "No battles scheduled."}
          </ul>
          <p>Show me all your finished Battles</p>
          <ul>
            {arena.battleArchive.length > 0
              ? arena.battleArchive.map(battle => (
                  <li key={battle.id}>
                    <p>{arena.battleArchive.id}</p>
                  </li>
                ))
              : "No battle history."}
          </ul>
        </Col>
      </div>
    );
  }
}
