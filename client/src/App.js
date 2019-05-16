import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Layout from "./components/Layout";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Layout />
      </ApolloProvider>
    );
  }
}

export default App;
