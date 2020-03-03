import React, { Component } from "react";
import { Container } from "react-materialize";
import Header from "./Header";
import Footer from "./Footer";
import AuthConduit from "../Auth/AuthConduit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GetSomeData from "../GetSomeData";
import LandingPage from "./LandingPage";
import BottomSpacer from "./BottomSpacer";
import ArenaConduit from "../Arena/ArenaConduit";
import WarriorConduit from "../Warrior/WarriorConduit";
import CombatConduit from "../Combat/CombatConduit";
import AccountConduit from "../Account/AccountConduit";

export const ArenaContext = React.createContext();

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

    this.handleLogin = (obj, cb = () => {}) => {
      this.setState({
        User: obj,
        loggedIn: true
      });
      this.props.RoadAuth.authenticate(cb);
    };

    this.setArenas = Arenas => {
      this.setState({ Arenas: Arenas });
    };

    this.setUser = obj => {
      this.setState({ User: obj });
    };

    this.setWarrior = obj => {
      this.setState({ Warrior: obj });
    };

    this.state = {
      Arena: null,
      Arenas: [],
      Warrior: null,
      Battle: null,
      setArena: this.setArena,
      setArenas: this.setArenas,
      setUser: this.setUser,
      setWarrior: this.setWarrior,
      handleLogin: this.handleLogin,
      RoadAuth: this.props.RoadAuth,
      MONEY_CONVERTER: 10,
      handleRedirect: this.handleRedirect,
      startCombat: this.startCombat,
      User: null,
      loggedIn: false
    };
  }

  componentDidMount() {
    localStorage.setItem("whereWasI", "/arena");
  }

  render() {
    const { WarriorHome } = this.props;
    return (
      <Router>
        <ArenaContext.Provider value={this.state}>
          <div className="body-padding">
            <header>
              <Header loggedIn={this.state.loggedIn} />
            </header>

            <Container>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/getdata" component={GetSomeData} />
                <Route exact path="/login" component={AuthConduit}></Route>
                <WarriorHome exact path="/warrior" component={WarriorConduit} />
                <WarriorHome exact path="/combat" component={CombatConduit} />
                <WarriorHome exact path="/arena" component={ArenaConduit} />
                <WarriorHome
                  exact
                  path="/account"
                  component={AccountConduit}
                ></WarriorHome>
              </Switch>
            </Container>
            <BottomSpacer />
            <Footer />
          </div>
        </ArenaContext.Provider>
      </Router>
    );
  }
}
