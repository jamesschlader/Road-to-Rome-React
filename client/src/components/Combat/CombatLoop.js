import React, { useState, useEffect } from "react";
import cardContent from "../../utilities/cardContent";
import ActionCard from "./ActionCard";
import { Row, Button } from "react-materialize";
import PlayerVitals from "./PlayerVitals";

export default ({ playerOne, playerTwo, setStep }) => {
  const [total, setTotal] = useState(0);
  const [currentTurn, setCurrentTurn] = useState();
  const [maxStaminaOne, setMaxStaminaOne] = useState();
  const [maxStaminaTwo, setMaxStaminaTwo] = useState();
  const [round, setRound] = useState(0);
  const [turn, setTurn] = useState(true);
  const [oneVitals, setOneVitals] = useState(playerOne);
  const [twoVitals, setTwoVitals] = useState(playerTwo);

  useEffect(() => {
    const newRound = round + 1;

    setRound(newRound);
  }, [turn]);

  useEffect(() => {
    return setMaxStaminaTwo(twoVitals.stamina);
  }, []);

  useEffect(() => {
    return setMaxStaminaOne(oneVitals.stamina);
  }, []);

  useEffect(() => {
    if (round !== 1) {
      const obj = currentTurn ? oneVitals : twoVitals;

      const max = currentTurn ? maxStaminaOne : maxStaminaTwo;

      const recovery = Math.floor((max - 10) / 2) + 1;
      const postRecovery = obj.stamina + recovery - total;
      obj.stamina = postRecovery > max ? max : postRecovery;

      if (round !== 1) {
        if (turn) {
          setOneVitals(obj);
        } else {
          setTwoVitals(obj);
        }
      }
    }
    setTotal(0);
    setCurrentTurn(turn);
  }, [turn]);

  const processCard = (name, value, speed = 3) => {
    const obj = currentTurn ? oneVitals : twoVitals;
    const amount = Math.floor(speed * parseInt(value));
    setTotal(total + amount);
    obj[name] = obj[name] + amount;

    return currentTurn ? setOneVitals(obj) : setTwoVitals(obj);
  };

  return (
    <>
      <Row>
        <Button className="btn" onClick={e => setTurn(!turn)}>
          Switch Turns
        </Button>
        <Button className="btn" onClick={e => setStep(4)}>
          Finish Battle
        </Button>
      </Row>
      <Row>
        <PlayerVitals
          playerOne={playerOne}
          playerTwo={playerTwo}
          turn={turn}
          setOneVitals={setOneVitals}
          setTwoVitals={setTwoVitals}
          oneVitals={oneVitals}
          twoVitals={twoVitals}
          round={round}
        />
      </Row>
      <Row>
        <ul className="center-align">
          {cardContent.map((card, index) => (
            <li key={index} className="inline-content tight">
              <ActionCard
                content={card}
                processCard={processCard}
                turn={turn}
              />
            </li>
          ))}
        </ul>
        <div>
          <h5>Accumulated total fatigue this turn: {total}</h5>
          <h5>
            Player's fatigue after this turn's actions:{" "}
            {currentTurn ? oneVitals.fatigue : twoVitals.fatigue}
          </h5>
        </div>
      </Row>
    </>
  );
};
