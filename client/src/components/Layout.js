import React, { Component } from "react";
import { Container } from "react-materialize";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GetSomeData from "./GetSomeData";
import LandingPage from "./LandingPage";
import BottomSpacer from "./BottomSpacer";
import Warrior from "./Warrior";
import Arena from "./Arena";
import LudusMagnus from "./LudusMagnus";
import Market from "./Market";

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div className="body-padding">
          <header>
            <Header />
          </header>

          <Container>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/getdata" component={GetSomeData} />
            <Route exact path="/warrior" component={Warrior} />
            <Route exact path="/arena" component={Arena} />
            <Route exact path="/market" component={Market} />
            <Route exact path="/ludus-magnus" component={LudusMagnus} />
          </Container>
          <BottomSpacer />
          <Footer />
        </div>
      </Router>
    );
  }
}
