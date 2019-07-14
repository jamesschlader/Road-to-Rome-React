import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-materialize";
import LudusMagnus from "./LudusMagnus";
import Market from "./Market";
import WarriorDetails from "../Shared/WarriorDetails";
import GetArena from "./GetArena";
import WarriorCard from "../Warrior/WarriorCard";
import WarriorTinyCard from "../Shared/WarriorTinyCard";
import opponentWarriors from "../../utilities/opponentWarriors";
import scrollFunction from "../../utilities/scrollFunction";

export default ({ arena, context, warrior, location }) => {
  const [ludus, setLudus] = useState(false);
  const [market, setMarket] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [activeArena, setActiveArena] = useState();
  const [show, setShow] = useState(false);
  const [detailWarrior, setDetailWarrior] = useState();

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
    scrollFunction("landing-title");
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
    setDetailWarrior(obj);
    setShow(!show);
  };

  return (
    <React.Fragment>
      <Row className="page-padding ">
        <Col s={4}>
          <Button onClick={goBack} className="create-btn">
            <span>
              <i className="material-icons">keyboard_backspace</i>
            </span>
          </Button>
        </Col>
        <Col s={4}>
          <Button name="market" onClick={openShop} className="create-btn">
            <i className="material-icons">shopping_cart</i>
          </Button>
        </Col>
        <Col s={4}>
          <Button name="ludus" onClick={openLudus} className="create-btn">
            <img
              height="100%"
              src="./img/erics-images/ludus-home.png"
              alt="ludus-magnus"
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <h1 className="landing-title center-align"> {arena.name}</h1>
      </Row>
      <GetArena arena={arena} setActiveArena={setActiveArena} />

      {market ? (
        <Row>
          <Market
            market={activeArena.Market}
            cart={shoppingCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            warrior={warrior}
            openShop={openShop}
            MONEY_CONVERTER={context.MONEY_CONVERTER}
          />
        </Row>
      ) : null}

      <Row>
        {!show ? (
          <>
            {ludus ? (
              <Row>
                <LudusMagnus
                  arena={activeArena}
                  warrior={warrior}
                  close={openLudus}
                />
              </Row>
            ) : null}

            <h5>Research {arena.name}'s warriors:</h5>
            <Col s={3}>
              <WarriorCard warrior={warrior} showDetails={showDetails} />
            </Col>
            {activeArena !== undefined && activeArena.livingWarriors ? (
              <ul>
                {opponentWarriors(activeArena, warrior).map(item => (
                  <WarriorTinyCard
                    key={item.id}
                    warrior={item}
                    showDetails={showDetails}
                  />
                ))}
              </ul>
            ) : null}

            <Col s={9} />
          </>
        ) : (
          <WarriorDetails
            warrior={detailWarrior}
            context={context}
            showDetails={showDetails}
            show={show}
            location={location}
          />
        )}
      </Row>
    </React.Fragment>
  );
};
