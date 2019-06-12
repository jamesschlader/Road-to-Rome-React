import React, { Component } from "react";
import getSingleArena from "../../api/Arena/queries/getSingleArena";
import ArenaWarrior from "./ArenaWarrior";
import { Query } from "react-apollo";
import { Row, Col, Button } from "react-materialize";
import LudusMagnus from "./LudusMagnus";
import Market from "./Market";

export default class Arena extends Component {
  state = {
    ludus: false,
    market: false,
    shoppingCart: []
  };

  goBack = e => {
    e.preventDefault();
    window.history.back();
  };

  openShop = e => {
    this.setState({
      market: !this.state.market
    });
  };
  openLudus = e => {
    this.setState({
      ludus: !this.state.ludus
    });
  };
  addToCart = obj => {
    const item = {
      name: obj.name,
      id: obj.id,
      cost: obj.cost,
      costType: obj.costType,
      armor: obj.strength ? true : false
    };
    this.setState((state, props) => {
      return { shoppingCart: [...this.state.shoppingCart, item] };
    });
  };
  removeFromCart = obj => {
    const targetId = this.state.shoppingCart.filter(item => {
      return item.id === obj.id;
    });
    targetId.pop();
    const theRest = this.state.shoppingCart.filter(item => {
      return item.id !== obj.id;
    });
    const updatedArray = [...theRest, ...targetId];
    this.setState((state, props) => {
      return { shoppingCart: updatedArray };
    });
  };
  setWarrior = obj => {
    this.setState((state, props) => {
      return {
        activeWarrior: obj
      };
    });
  };

  render() {
    const { id, warriorId, MONEY_CONVERTER } = this.props;

    const ArenaResult = (id, warriorId) => (
      <Query query={getSingleArena} variables={{ id: id }}>
        {({ loading, error, data: { arena } }) => {
          console.log(arena);
          if (error) return <h4>There was an error loading the Arena.</h4>;
          if (loading)
            return <h4 className="center-align">Loading Arena...</h4>;

          return (
            <React.Fragment>
              <Row className="page-padding ">
                <Col s={4}>
                  <Button onClick={this.goBack} style={{ height: "54px" }}>
                    <span>
                      <i className="material-icons"> keyboard_backspace</i>
                    </span>
                  </Button>
                </Col>
                <Col s={4}>
                  <Button
                    name="market"
                    onClick={this.openShop}
                    style={{ height: "54px" }}
                  >
                    <i className="material-icons">shopping_cart</i>
                  </Button>
                </Col>
                <Col s={4}>
                  <Button
                    name="ludus"
                    onClick={this.openLudus}
                    style={{ padding: "0 auto", height: "54px" }}
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

              {this.state.ludus ? (
                <Row>
                  <LudusMagnus
                    arena={arena}
                    warrior={this.state.activeWarrior}
                  />
                </Row>
              ) : null}

              {this.state.market ? (
                <Row>
                  <Market
                    market={getSingleArena.Market}
                    cart={this.state.shoppingCart}
                    addToCart={this.addToCart}
                    removeFromCart={this.removeFromCart}
                    warrior={this.state.activeWarrior}
                    openShop={this.openShop}
                    MONEY_CONVERTER={MONEY_CONVERTER}
                  />
                </Row>
              ) : null}

              <Row>
                <ArenaWarrior
                  warriorKey={warriorId}
                  setWarrior={this.setWarrior}
                  MONEY_CONVERTER={MONEY_CONVERTER}
                />
              </Row>
            </React.Fragment>
          );
        }}
      </Query>
    );

    return <React.Fragment>{ArenaResult(id, warriorId)}</React.Fragment>;
  }
}
