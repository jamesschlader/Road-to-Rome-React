import React, { Component } from "react";
import { Container } from "react-materialize";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GetSomeData from "../GetSomeData";
import LandingPage from "./LandingPage";
import BottomSpacer from "./BottomSpacer";
import ArenaConduit from "../Arena/ArenaConduit";
import WarriorConduit from "../Warrior/WarriorConduit";

const RoadAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut() {
    console.log(
      `Running RoadAuth.signOut() and isAuthenticated = ${this.isAuthenticated}`
    );
    this.isAuthenticated = false;
  }
};

export const ArenaContext = React.createContext();

const WarriorHome = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      RoadAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/warrior" />
      )
    }
  />
);

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.setArena = (ArenaId, id) => {
      this.setState({
        ArenaId: ArenaId,
        WarriorId: id
      });
    };

    this.state = {
      ArenaId: null,
      setArena: this.setArena,
      RoadAuth: RoadAuth
    };
  }

  render() {
    return (
      <ArenaContext.Provider value={this.state}>
        <Router>
          <div className="body-padding">
            <header>
              <Header />
            </header>

            <Container>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/getdata" component={GetSomeData} />
              <Route exact path="/warrior" component={WarriorConduit} />

              <WarriorHome exact path="/arena" component={ArenaConduit} />
            </Container>
            <BottomSpacer />
            <Footer />
          </div>
        </Router>
      </ArenaContext.Provider>
    );
  }
}
