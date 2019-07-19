import React, { Component } from "react";
import { Col, Row, Button } from "react-materialize";
import ScheduleBattle from "./ScheduleBattle";
// import ScrollingBattles from "../Shared/ScrollingBattles";
import DisplayBattle from "./DisplayBattle";
import futureBattles from "../../utilities/futureBattles";
import DeleteBattleMutation from "./DeleteBattleMutation";
import BattlePrep from "./BattlePrep";

export default class LudusMagnus extends Component {
  state = {
    schedule: false,
    details: false,
    selectedToDelete: [],
    fight: false
  };

  openSchedule = e => {
    e.preventDefault();
    this.setState({
      schedule: !this.state.schedule
    });
  };

  openDetails = e => {
    e.preventDefault();
    this.setState({
      details: !this.state.details
    });
  };

  handleSelectedToDelete = id => {
    this.setState({
      selectedToDelete: [...this.state.selectedToDelete, id]
    });
  };

  removeSelectedToDelete = id => {
    const newSelections = this.state.selectedToDelete.filter(item => {
      return item !== id;
    });
    this.setState({
      selectedToDelete: newSelections
    });
  };

  setFight = () => {
    this.setState({
      fight: !this.state.fight
    });
  };

  selectForFight = id => {
    this.setState({
      selectedForFight: id
    });
  };

  render() {
    const { arena, warrior, close, context } = this.props;

    return (
      <div className="ludus">
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
          <Row>
            <Col s={10} offset="s1">
              <ScheduleBattle
                openSchedule={this.openSchedule}
                warrior={warrior}
                arena={arena}
                close={close}
              />
            </Col>
          </Row>
        ) : null}

        {/* <Row style={{ overflow: "hidden" }}>
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
        </Row> */}

        <Row>
          <Col s={8} offset="s2">
            <Button className="btn create-btn" onClick={this.openDetails}>
              {this.state.details
                ? "Close Battle Details"
                : "Show Battle Details"}
            </Button>
          </Col>

          {arena.scheduledBattles && this.state.details ? (
            <Col s={10} offset="s1">
              <table>
                <thead>
                  <tr>
                    <DeleteBattleMutation
                      ids={this.state.selectedToDelete}
                      removeSelectedToDelete={this.removeSelectedToDelete}
                    >
                      {this.state.selectedToDelete.length > 0 ? (
                        <i
                          className="material-icons hovered"
                          style={{
                            backgroundColor:
                              this.state.selectedToDelete.length > 0
                                ? "red"
                                : "",
                            borderRadius: "3px"
                          }}
                        >
                          clear
                        </i>
                      ) : (
                        "Delete?"
                      )}
                    </DeleteBattleMutation>
                    <th>Fight!</th>
                    <th>Date</th>
                    <th>Player One</th>
                    <th>Player Two</th>
                    <th>Purse</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.fight ? (
                    <BattlePrep
                      battle={
                        futureBattles(arena.scheduledBattles).filter(battle => {
                          return battle.id === this.state.selectedForFight;
                        })[0]
                      }
                      setFight={this.setFight}
                      context={context}
                    />
                  ) : (
                    futureBattles(arena.scheduledBattles).map(battle => (
                      <DisplayBattle
                        key={battle.id}
                        battle={battle}
                        handleSelectedToDelete={this.handleSelectedToDelete}
                        removeSelectedToDelete={this.removeSelectedToDelete}
                        fight={this.state.fight}
                        setFight={this.setFight}
                        selectForFight={this.selectForFight}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </Col>
          ) : null}
        </Row>
      </div>
    );
  }
}
