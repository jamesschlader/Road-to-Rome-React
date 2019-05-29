import React from "react";
import { Row, Col, Table } from "react-materialize";

export default ({
  totalCost,
  market,
  validator,
  cart,
  removeFromCart,
  MONEY_CONVERTER
}) => {
  return (
    <div>
      <Row>
        <Col s={6}>
          <h5>Armor</h5>

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
                    <td style={{ cursor: "pointer" }}>
                      {validator(armor)}

                      {cart.filter(item => {
                        return item.id === armor.id;
                      }).length > 0 ? (
                        <span
                          onClick={e => {
                            e.preventDefault();
                            removeFromCart(armor);
                          }}
                        >
                          <i
                            className="material-icons"
                            style={{ color: "red" }}
                          >
                            keyboard_arrow_down
                          </i>
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
                      {armor.costType === "gp"
                        ? armor.cost * MONEY_CONVERTER
                        : armor.cost}
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
                    <td style={{ cursor: "pointer" }}>
                      {validator(weapon)}

                      {cart.filter(item => {
                        return item.id === weapon.id;
                      }).length > 0 ? (
                        <span
                          onClick={e => {
                            e.preventDefault();
                            removeFromCart(weapon);
                          }}
                        >
                          <i
                            className="material-icons"
                            style={{ color: "red" }}
                          >
                            keyboard_arrow_down
                          </i>
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
                        ? weapon.cost * MONEY_CONVERTER
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
    </div>
  );
};
