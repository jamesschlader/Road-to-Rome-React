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

export default ({ context }) => {
  const [location, setLocation] = useState(null);
  const { Battle, Arena, Warrior, MONEY_CONVERTER } = context;
  const [currentBattle, setCurrentBattle] = useState(Battle);
  const [showPlayerOneStats, setShowPlayerOneStats] = useState(false);
  const [showPlayerTwoStats, setShowPlayerTwoStats] = useState(false);
  const { playerOne, playerTwo } = currentBattle;
  const [step, setStep] = useState(steps.arms);
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

  return (
    <Fragment>
      <GetCurrentBattle
        setCurrentBattle={setCurrentBattle}
        battle={context.Battle}
      />
      <Row className="page-padding battlefield">
        {Arena && Battle ? (
          <>
            <StaticElements staticProps={staticProps} />

            {step === steps.arms && <SetArms setStep={setStep} />}

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
                    playerOne={playerOne}
                    playerTwo={playerTwo}
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
