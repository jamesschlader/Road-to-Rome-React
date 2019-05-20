import React, { Component } from "react";
import { Container } from "react-materialize";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GetSomeData from "./GetSomeData";
import LandingPage from "./LandingPage";

export default class Layout extends Component {
  render() {
    return (
      <Router>
        <div className="body-padding">
          <Header />
          <Container>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/getdata" component={GetSomeData} />
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}
