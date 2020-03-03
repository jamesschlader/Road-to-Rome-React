import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Layout from "./components/Base/Layout";
import { Route, Redirect } from "react-router-dom";
require("dotenv").config({ path: "../.env" });

const appURI = process.env.APP_URI || "http://localhost:3001/graphql";

const client = new ApolloClient({
  uri: appURI
});

const RoadAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    RoadAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut() {
    RoadAuth.isAuthenticated = false;
  }
};

const WarriorHome = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        RoadAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Layout RoadAuth={RoadAuth} WarriorHome={WarriorHome} />
      </ApolloProvider>
    );
  }
}

export default App;
