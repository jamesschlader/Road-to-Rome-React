import React from "react";
import { Row, Col, Button } from "react-materialize";
import { Mutation } from "react-apollo";
import { updateWarriorMutation } from "../../api/Warrior/mutations/updateWarrior";
import DisplayMarket from "./DisplayMarket";

export default ({
  market,
  cart,
  addToCart,
  warrior,
  openShop,
  removeFromCart,
  MONEY_CONVERTER
}) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const justCosts = cart.map(item =>
    item.costType === "gp" ? item.cost * MONEY_CONVERTER : item.cost
  );
  const totalCost = justCosts.reduce(reducer, 0);
  const validator = obj => {
    return warrior.wallet * MONEY_CONVERTER >=
      totalCost +
        (obj.costType === "gp" ? obj.cost * MONEY_CONVERTER : obj.cost) ? (
      <span
        onClick={e => {
          e.preventDefault();
          addToCart(obj);
        }}
      >
        <i className="material-icons" style={{ color: "green" }}>
          keyboard_arrow_up
        </i>
      </span>
    ) : null;
  };

  const updateWarrior = () => {
    const weaponsInCart = cart
      .filter(item => {
        return item.armor ? null : item.id;
      })
      .map(item => item.id);

    const armorInCart = cart
      .filter(item => {
        return item.armor ? item.id : null;
      })
      .map(item => item.id);

    const obj = {
      id: warrior.id,
      wallet: warrior.wallet - totalCost / MONEY_CONVERTER,
      armorIdList: [...warrior.armorIdList, ...armorInCart],
      weaponsIdList: [...warrior.weaponsIdList, ...weaponsInCart]
    };

    return (
      <Mutation mutation={updateWarriorMutation} variables={{ ...obj }}>
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation();
              openShop();
            }}
          >
            <i className="material-icons">payment</i>
          </Button>
        )}
      </Mutation>
    );
  };

  return (
    <div>
      <h4 className="landing-title">{market.name} Market</h4>
      <Row>
        <Col>
          <p>Total in cart: {totalCost}</p>
        </Col>
        <Col>
          <p> Remaining Cash: {warrior.wallet * MONEY_CONVERTER - totalCost}</p>
        </Col>
      </Row>
      <DisplayMarket
        totalCost={totalCost}
        market={market}
        validator={validator}
        cart={cart}
        removeFromCart={removeFromCart}
        MONEY_CONVERTER={MONEY_CONVERTER}
      />

      <Row>{updateWarrior()}</Row>
    </div>
  );
};
