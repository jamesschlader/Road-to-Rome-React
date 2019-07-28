import React, { useState } from "react";
import { Col, Row, Button } from "react-materialize";
import ScheduleBattle from "./ScheduleBattle";
import DisplayBattle from "./DisplayBattle";
import futureBattles from "../../utilities/futureBattles";
import DeleteBattleMutation from "./DeleteBattleMutation";
import BattlePrep from "./BattlePrep";

export default ({ arena, warrior, close, context }) => {
  const [schedule, setSchedule] = useState(false);
  const [details, setDetails] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const [fight, setFight] = useState(false);
  const [selectedForFight, setSelectedForFight] = useState(false);

  const openSchedule = () => {
    setSchedule(!schedule);
  };

  const openDetails = () => {
    setDetails(!details);
  };

  const handleSelectedToDelete = id => {
    setSelectedToDelete([...selectedToDelete, id]);
  };

  const removeSelectedToDelete = id => {
    const newSelections = selectedToDelete.filter(item => {
      return item !== id;
    });
    setSelectedToDelete(newSelections);
  };

  const chooseFight = () => {
    setFight(!fight);
  };

  const selectForFight = id => {
    setSelectedForFight(id);
  };

  const warriorBattles = arr => {
    return arr.filter(battle => {
      if (battle) {
        if (battle.playerOne && battle.playerTwo) {
          return (
            battle.playerOne.id === warrior.id ||
            battle.playerTwo.id === warrior.id
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  };

  return (
    <div className="ludus">
      <h5 className="landing-title">Ludus Magnus</h5>
      {!schedule && (
        <Row>
          <Col s={8} offset="s2">
            <Button className="btn create-btn" onClick={e => openSchedule()}>
              Schedule a Battle
            </Button>
          </Col>{" "}
        </Row>
      )}

      {schedule && (
        <Row>
          <Col s={10} offset="s1">
            <ScheduleBattle
              openSchedule={e => openSchedule()}
              warrior={warrior}
              arena={arena}
              close={close}
            />
          </Col>
        </Row>
      )}

      <Row>
        <Col s={8} offset="s2">
          <Button className="btn create-btn" onClick={e => openDetails()}>
            {details ? "Close Battle Details" : "Show My Upcoming Battles"}
          </Button>
        </Col>

        {arena.scheduledBattles && details && (
          <Col s={10} offset="s1">
            <table>
              <thead>
                <tr>
                  <DeleteBattleMutation
                    ids={selectedToDelete}
                    removeSelectedToDelete={removeSelectedToDelete}
                  >
                    {selectedToDelete.length > 0 ? (
                      <i
                        className="material-icons hovered"
                        style={{
                          backgroundColor:
                            selectedToDelete.length > 0 ? "red" : "",
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
                {fight ? (
                  <BattlePrep
                    battle={
                      futureBattles(
                        warriorBattles(arena.scheduledBattles)
                      ).filter(battle => {
                        return battle.id === selectedForFight;
                      })[0]
                    }
                    setFight={chooseFight}
                    context={context}
                  />
                ) : (
                  futureBattles(warriorBattles(arena.scheduledBattles)).map(
                    battle => (
                      <DisplayBattle
                        key={battle.id}
                        battle={battle}
                        handleSelectedToDelete={handleSelectedToDelete}
                        removeSelectedToDelete={removeSelectedToDelete}
                        fight={fight}
                        setFight={chooseFight}
                        selectForFight={selectForFight}
                      />
                    )
                  )
                )}
              </tbody>
            </table>
          </Col>
        )}
      </Row>
    </div>
  );
};
