import React, { useState } from "react";
import RtoRBtn from "../Shared/RtoRBtn";
import { Row, Col, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";
import AllWarriors from "./AllWarriors";
import WarriorDelete from "./WarriorDelete";

export default ({ location, context }) => {
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [card, setCard] = useState();

  const handleQuit = e => {
    e.preventDefault();
    setCreate(!create);
  };

  const handleDelete = e => {
    e.preventDefault();
    setCard(null);
    setShow(false);
  };

  const showDetails = obj => {
    setCard(obj);
    setShow(!show);
  };

  return (
    <div>
      <h1 className="landing-title center-align">Warriors</h1>

      <Row>
        <Col s={8} offset="s2">
          {create ? (
            <CreateWarrior handleQuit={handleQuit} />
          ) : show ? null : (
            <Button className="btn create-btn" onClick={handleQuit}>
              Create a Warrior
            </Button>
          )}
        </Col>
      </Row>

      {show && card ? (
        <React.Fragment>
          <WarriorDelete
            warrior={card}
            showDetails={showDetails}
            show={show}
            handleDelete={handleDelete}
            context={context}
            location={location}
          />

          <Col s={2}>
            <RtoRBtn
              clickAction={showDetails}
              icon="keyboard_backspace"
              data={card}
            />
          </Col>
        </React.Fragment>
      ) : !show ? (
        create ? null : (
          <Row className="center-align">
            <ul>
              <AllWarriors showDetails={showDetails} />
            </ul>
          </Row>
        )
      ) : null}
    </div>
  );
};
