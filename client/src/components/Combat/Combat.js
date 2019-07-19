import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-materialize";
import { Redirect } from "react-router-dom";
import GetCurrentBattle from "./GetCurrentBattle";
import steps from "../../utilities/combatSteps";
import Button from "react-materialize/lib/Button";
import CombatLoop from "./CombatLoop";
import StaticElements from "./StaticElements";
import SetArms from "./SetArms";
import GameOverModal from "./GameOverModal";
import SaveBattleResults from "./SaveBattleResults";
import Player from "../../utilities/Player";

export default ({ context }) => {
  const [location, setLocation] = useState(null);
  const { Battle, Arena, Warrior, MONEY_CONVERTER } = context;
  const [currentBattle, setCurrentBattle] = useState(Battle);
  const [showPlayerOneStats, setShowPlayerOneStats] = useState(false);
  const [showPlayerTwoStats, setShowPlayerTwoStats] = useState(false);
  const { playerOne, playerTwo } = currentBattle;
  const [step, setStep] = useState(steps.arms);
  const [playerOneObj, setPlayerOneObj] = useState(null);
  const [playerTwoObj, setPlayerTwoObj] = useState(null);

  const staticProps = {
    Battle,
    Arena,
    Warrior,
    MONEY_CONVERTER,
    showPlayerOneStats,
    showPlayerTwoStats,
    setShowPlayerOneStats,
    setShowPlayerTwoStats,
    playerOne,
    playerTwo
  };

  useEffect(() => {
    const whereIWas = localStorage.getItem("whereWasI");
    setLocation(whereIWas);
  }, []);

  const buildPlayerOneObject = player => {
    if (player && !playerOneObj) {
      const {
        id,
        name,
        image,
        male,
        wallet,
        strength,
        speed,
        stamina,
        skill,
        winnings,
        alive,
        show,
        armorList,
        weaponList
      } = player;
      setPlayerOneObj(
        new Player(
          id,
          name,
          image,
          male,
          wallet,
          strength,
          speed,
          stamina,
          skill,
          winnings,
          alive,
          show,
          armorList,
          weaponList
        )
      );
    } else {
      // console.log(`Waiting for updated battle data for playerOne..`);
    }
  };

  const buildPlayerTwoObject = player => {
    if (player && !playerTwoObj) {
      const {
        id,
        name,
        image,
        male,
        wallet,
        strength,
        speed,
        stamina,
        skill,
        winnings,
        alive,
        show,
        armorList,
        weaponList
      } = player;
      setPlayerTwoObj(
        new Player(
          id,
          name,
          image,
          male,
          wallet,
          strength,
          speed,
          stamina,
          skill,
          winnings,
          alive,
          show,
          armorList,
          weaponList
        )
      );
    } else {
      // console.log(`Waiting for updated battle data for playerTwo...`);
    }
  };
  const players = [playerOneObj, playerTwoObj];

  return (
    <Fragment>
      <GetCurrentBattle
        buildPlayerOneObject={buildPlayerOneObject}
        buildPlayerTwoObject={buildPlayerTwoObject}
        setCurrentBattle={setCurrentBattle}
        battle={context.Battle}
      />
      <Row className="page-padding battlefield">
        {Arena && Battle ? (
          <>
            <StaticElements staticProps={staticProps} />

            {step === steps.arms && (
              <SetArms players={players} setStep={setStep} />
            )}

            {step === steps.start && (
              <Col s={4} offset="s4">
                <Button
                  className="btn expand-content selection-button create-btn fancy"
                  onClick={e => setStep(3)}
                >
                  start battle
                </Button>
              </Col>
            )}

            {step === steps.loop && (
              <>
                <Row>
                  <CombatLoop
                    playerOne={playerOneObj}
                    playerTwo={playerTwoObj}
                    setStep={setStep}
                  />
                </Row>
              </>
            )}

            {step === steps.done && <GameOverModal setStep={setStep} />}

            {step === steps.recap && (
              <SaveBattleResults setStep={setStep} setLocation={setLocation} />
            )}

            {step === steps.exit && <Redirect to={location} />}
          </>
        ) : null}
      </Row>
    </Fragment>
  );
};
