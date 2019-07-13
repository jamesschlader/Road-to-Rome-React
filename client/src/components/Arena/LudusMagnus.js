import React, { Component } from "react";
import { Col, Row, Button } from "react-materialize";
import ScheduleBattle from "./ScheduleBattle";
import WarriorTinyCard from "../Shared/WarriorTinyCard";
import ScrollingBattles from "../Shared/ScrollingBattles";
import DisplayBattle from "./DisplayBattle";
import futureBattles from "../../utilities/futureBattles";

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
    const warriors = arena.livingWarriors.filter(item => {
      return item != null && item.id !== warrior.id ? item : null;
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

        <Row style={{ overflow: "hidden" }}>
          <h5>{arena.name} Scheduled Battles</h5>
          <ul className="scrolling-event">
            {arena.scheduledBattles ? (
              futureBattles(arena.scheduledBattles).map(item => (
                <ScrollingBattles key={item.id} battle={item} />
              ))
            ) : (
              <div>
                <p>No battles scheduled</p>
              </div>
            )}
          </ul>
        </Row>

        <Row>
          {arena.scheduledBattles ? (
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
                {futureBattles(arena.scheduledBattles).map(battle => (
                  <DisplayBattle battle={battle} />
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p>No battles scheduled</p>
            </div>
          )}
        </Row>

        <Row>
          <h5>{arena.name}'s warriors:</h5>
          <ul>
            {warriors.map(item => (
              <WarriorTinyCard key={item.id} warrior={item} />
            ))}
          </ul>
        </Row>
      </div>
    );
  }
}
