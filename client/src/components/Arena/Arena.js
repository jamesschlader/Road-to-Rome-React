import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-materialize";
import LudusMagnus from "./LudusMagnus";
import Market from "./Market";
import WarriorDetails from "../Shared/WarriorDetails";
import GetArena from "./GetArena";
import WarriorCard from "../Warrior/WarriorCard";

export default ({
  arena,
  warrior,
  MONEY_CONVERTER,
  handleRedirect,
  RoadAuth,
  setArena
}) => {
  const [ludus, setLudus] = useState(false);
  const [market, setMarket] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [activeArena, setActiveArena] = useState();
  const [show, setShow] = useState(false);

  const context = { RoadAuth, setArena };

  useEffect(() => {
    setActiveArena(arena);
  }, [arena]);

  const goBack = e => {
    e.preventDefault();
    window.history.back();
  };

  const openShop = () => {
    setShow(false);
    setMarket(!market);
  };

  const openLudus = () => {
    setShow(false);
    setLudus(!ludus);
  };

  const addToCart = obj => {
    const item = {
      name: obj.name,
      id: obj.id,
      cost: obj.cost,
      costType: obj.costType,
      armor: obj.strength ? true : false
    };
    setShoppingCart([...shoppingCart, item]);
  };

  const removeFromCart = obj => {
    const targetId = this.state.shoppingCart.filter(item => {
      return item.id === obj.id;
    });
    targetId.pop();
    const theRest = this.state.shoppingCart.filter(item => {
      return item.id !== obj.id;
    });
    const updatedArray = [...theRest, ...targetId];
    setShoppingCart(updatedArray);
  };

  const showDetails = obj => {
    setShow(!show);
  };

  return (
    <React.Fragment>
      <GetArena arena={arena} setActiveArena={setActiveArena} />
      <Row className="page-padding ">
        <Col s={4}>
          <Button
            onClick={goBack}
            style={{ position: "relative", left: "40%", height: "54px" }}
          >
            <span>
              <i className="material-icons">keyboard_backspace</i>
            </span>
          </Button>
        </Col>
        <Col s={4}>
          <Button
            name="market"
            onClick={openShop}
            style={{ position: "relative", left: "40%", height: "54px" }}
          >
            <i className="material-icons">shopping_cart</i>
          </Button>
        </Col>
        <Col s={4}>
          <Button
            name="ludus"
            onClick={openLudus}
            style={{ position: "relative", left: "40%", height: "54px" }}
          >
            <img
              src="./img/erics-images/ludus-home.png"
              alt="ludus-magnus"
              className="card-img center-align"
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <h1 className="landing-title center-align"> {arena.name}</h1>
      </Row>

      <Row>
        {!show ? (
          <WarriorCard warrior={warrior} showDetails={showDetails} />
        ) : (
          <WarriorDetails
            warrior={warrior}
            MONEY_CONVERTER={MONEY_CONVERTER}
            handleRedirect={handleRedirect}
            context={context}
            showDetails={showDetails}
            show={show}
          />
        )}
      </Row>

      {ludus ? (
        <Row>
          <LudusMagnus
            arena={activeArena}
            warrior={warrior}
            close={openLudus}
          />
        </Row>
      ) : null}

      {market ? (
        <Row>
          <Market
            market={activeArena.Market}
            cart={shoppingCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            warrior={warrior}
            openShop={openShop}
            MONEY_CONVERTER={MONEY_CONVERTER}
          />
        </Row>
      ) : null}
    </React.Fragment>
  );
};
