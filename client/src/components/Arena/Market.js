import React from "react";
import { Row, Col, Button } from "react-materialize";
import Table from "react-materialize/lib/Table";
import { Mutation } from "react-apollo";
import { updateWarriorMutation } from "../../api/Warrior/mutations/updateWarrior";

export default ({
  market,
  cart,
  addToCart,
  warrior,
  openShop,
  removeFromCart
}) => {
  console.log(`the cart is...`, cart);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const justCosts = cart.map(item =>
    item.costType === "gp" ? item.cost * 100 : item.cost
  );

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
      wallet: warrior.wallet * 100 - justCosts,
      armorIdList: [...warrior.armorIdList, ...armorInCart],
      weaponsIdList: [...warrior.weaponsIdList, ...weaponsInCart]
    };
    console.log(`obj is: `, obj);
    console.log(`weaponsInCart is: `, weaponsInCart);
    console.log(`armorInCart is: `, armorInCart);
    console.log(`justCosts `, justCosts);
    return (
      <Mutation mutation={updateWarriorMutation} variables={{ ...obj }}>
        {postMutation => (
          <Button
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
        <Col s={6}>
          <h5>Armor</h5>
          <p>
            Total in cart: <span>{justCosts.reduce(reducer, 0)}</span>
          </p>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <i className="material-icons">shopping_cart</i>
                </th>
                <th>Type</th>
                <th>Strength</th>
                <th>Weight</th>
                <th>Size</th>
                <th>Cost</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {market.armorList.map(armor => {
                return (
                  <tr key={armor.id}>
                    <td>
                      <span
                        onClick={e => {
                          e.preventDefault();
                          addToCart(armor);
                        }}
                      >
                        <i className="material-icons">keyboard_arrow_up</i>
                      </span>
                      {cart.filter(item => {
                        return item.id === armor.id;
                      }).length > 0 ? (
                        <span
                          onClick={e => {
                            e.preventDefault();
                            removeFromCart(armor);
                          }}
                        >
                          <i className="material-icons">keyboard_arrow_down</i>
                        </span>
                      ) : null}
                      <span>
                        {
                          cart.filter(item => {
                            return item.id === armor.id;
                          }).length
                        }
                      </span>
                    </td>
                    <td>{armor.name}</td>
                    <td>{armor.strength}</td>
                    <td>{armor.weight}</td>
                    <td>{armor.size}</td>
                    <td>
                      {armor.costType === "gp" ? armor.cost * 100 : armor.cost}
                    </td>
                    <td>sp</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col s={6}>
          <h5>Weapons</h5>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <i className="material-icons">shopping_cart</i>
                </th>
                <th>Name</th>
                <th>Damage</th>
                <th>Weight</th>
                <th>Size</th>
                <th>Cost</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {market.weaponList.map(weapon => {
                return (
                  <tr key={weapon.id}>
                    <td>
                      <span
                        onClick={e => {
                          e.preventDefault();
                          addToCart(weapon);
                        }}
                      >
                        <i className="material-icons">keyboard_arrow_up</i>
                      </span>
                      {cart.filter(item => {
                        return item.id === weapon.id;
                      }).length > 0 ? (
                        <span
                          onClick={e => {
                            e.preventDefault();
                            removeFromCart(weapon);
                          }}
                        >
                          <i className="material-icons">keyboard_arrow_down</i>
                        </span>
                      ) : null}
                      <span>
                        {
                          cart.filter(item => {
                            return item.id === weapon.id;
                          }).length
                        }
                      </span>
                    </td>
                    <td>{weapon.name}</td>
                    <td>{weapon.damage}</td>
                    <td>{weapon.weight}</td>
                    <td>{weapon.size}</td>
                    <td>
                      {weapon.costType === "gp"
                        ? weapon.cost * 100
                        : weapon.cost}
                    </td>
                    <td>sp</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>{updateWarrior()}</Row>
    </div>
  );
};
