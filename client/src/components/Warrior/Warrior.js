import React, { useState, useEffect } from "react";
import RtoRBtn from "../Shared/RtoRBtn";
import { Row, Col, Button } from "react-materialize";
import CreateWarrior from "./CreateWarrior";
import UserWarriors from "./UserWarriors";
import WarriorDelete from "./WarriorDelete";
import GetArenaIds from "./GetArenaIds";
import GetUserWarriors from "./GetUserWarriors";

export default ({ location, context }) => {
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [card, setCard] = useState();
  const [alive, setAlive] = useState(true);
  const [stable, setStable] = useState([]);

  useEffect(() => {
    setStable(context.User.stable);
  }, []);

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

  const handleArenas = data => {
    if (context.Arenas.length < 1) {
      context.setArenas(data);
    }
  };

  const activeWarriors =
    stable &&
    stable.filter(warrior => {
      return warrior.show && warrior.alive;
    });

  return (
    <div>
      <h1 className="landing-title center-align">Warriors</h1>

      <GetArenaIds handleArenas={handleArenas}></GetArenaIds>

      <GetUserWarriors
        setStable={setStable}
        username={context.User.username}
      ></GetUserWarriors>

      <Row>
        <Col s={8} offset="s2">
          {create && (
            <CreateWarrior handleQuit={handleQuit} context={context} />
          )}
          {!create && context.Arenas.length > 0 && (
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
      ) : (
        !show &&
        !create && (
          <Row className="center-align">
            {alive && (
              <Button className="btn" onClick={e => setAlive(!alive)}>
                Show all warriors
              </Button>
            )}
            {!alive && (
              <Button className="btn" onClick={e => setAlive(!alive)}>
                Show only living warriors
              </Button>
            )}
            {alive
              ? stable && (
                  <ul>
                    <UserWarriors
                      showDetails={showDetails}
                      stable={activeWarriors}
                    ></UserWarriors>
                  </ul>
                )
              : stable && (
                  <ul>
                    <UserWarriors showDetails={showDetails} stable={stable} />
                  </ul>
                )}
          </Row>
        )
      )}
    </div>
  );
};
