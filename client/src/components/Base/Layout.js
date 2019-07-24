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
import CombatConduit from "../Combat/CombatConduit";

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

    this.setArena = (Arena, Warrior) => {
      this.setState({
        Arena,
        Warrior
      });
    };

    this.startCombat = (Arena, Battle) => {
      this.setState({
        Arena,
        Battle
      });
    };

    this.handleRedirect = (func1, obj1, obj2) => {
      func1(obj2.Arena, obj2);
      obj1.authenticate();
    };

    this.state = {
      Arena: null,
      Warrior: null,
      Battle: null,
      setArena: this.setArena,
      RoadAuth: RoadAuth,
      MONEY_CONVERTER: 10,
      handleRedirect: this.handleRedirect,
      startCombat: this.startCombat
    };
  }

  componentDidMount() {
    localStorage.setItem("whereWasI", "/arena");
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
              <WarriorHome exact path="/combat" component={CombatConduit} />

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
