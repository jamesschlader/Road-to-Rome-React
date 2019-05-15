import React, { Component } from "react";
import { Row, Container } from "react-materialize";
import GetSomeData from "./components/GetSomeData";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Row>
            <h1 id="landing-title">Road to Rome</h1>
          </Row>
          <GetSomeData />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
