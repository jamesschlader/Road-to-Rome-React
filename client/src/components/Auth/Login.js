import React, { Component } from "react";
import { Row, Col, Button } from "react-materialize";
import { Mutation } from "react-apollo";
import { registerMutation, loginMutation } from "../../api/User/mutations";
import { Redirect } from "react-router";
import Spinner from "../Shared/Spinner";

export default class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    username: "",
    first: "",
    last: "",
    motto: "",
    password: "",
    loggedIn: false,
    noData: false,
    loading: false,
    errors: []
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  loggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  handleLogin = () => {
    const { first, last, username, password, email, motto, login } = this.state;
    const registration = {
      first,
      last,
      username,
      password,
      email,
      motto
    };
    const loginVariables = {
      username,
      password
    };

    return (
      <Mutation
        mutation={login ? loginMutation : registerMutation}
        variables={login ? { ...loginVariables } : { ...registration }}
        onError={error => {
          console.log(`oh snap, an error!`, error.graphQLErrors);
          const errors = error.graphQLErrors[0].message
            .split(",")
            .map(message => {
              const firstRun = message.slice(message.indexOf(":") + 1);

              return firstRun.includes(":")
                ? firstRun.slice(firstRun.indexOf(":") + 1)
                : firstRun;
            });
          this.setState({ loading: false, errors });
        }}
        onCompleted={async data => {
          this.setState({ loading: false });
          const result = login ? data.login : data.register;
          if (result) {
            await this.props.context.handleLogin(result, this.loggedIn);
          } else {
            this.setState({ noData: true });
          }
        }}
      >
        {mutation => {
          return (
            <Button
              onClick={() => {
                this.setState({ loading: true });
                mutation();
              }}
            >
              Login
            </Button>
          );
        }}
      </Mutation>
    );
  };

  render() {
    const {
      login,
      email,
      password,
      first,
      last,
      motto,
      username,
      loggedIn,
      noData,
      loading,
      errors
    } = this.state;

    return (
      <div>
        <h1 className="landing-title center-align ">
          {login ? "Login" : "Register"}
        </h1>
        <div>
          <Row>
            <Col s={5} className="input-field">
              <label for="username-field">username</label>
              <input
                type="text"
                className="col s12"
                id="username-field"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Col>

            <Col s={5} className="input-field">
              <label for="password-field">password</label>
              <input
                type="password"
                className="col s12"
                id="password-field"
                name="password"
                value={password}
                onChange={this.handleChange}
              ></input>
            </Col>
          </Row>
          {!login && (
            <Row>
              <Row>
                <Col s={5} className="input-field">
                  <label for="first-field">First Name</label>
                  <input
                    type="text"
                    className="col s12"
                    id="first-field"
                    name="first"
                    value={first}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col s={5} className="input-field">
                  <label for="last-field">Last Name</label>
                  <input
                    type="text"
                    className="col s12"
                    id="last-field"
                    name="last"
                    value={last}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col s={5} className="input-field">
                  <label for="email-field">email</label>
                  <input
                    type="text"
                    className="col s12"
                    id="email-field"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col s={5} className="input-field">
                  <label for="motto-field">Motto</label>
                  <textarea
                    type="textarea"
                    className="col s12"
                    rows={8}
                    id="motto-field"
                    name="motto"
                    value={motto}
                    onChange={this.handleChange}
                  />
                </Col>
              </Row>
            </Row>
          )}
          <Row>
            {loading && <Spinner></Spinner>}
            {noData && !loading && (
              <p>
                Something went wrong. Enter your username and password again or
                select Register to register a new account.
              </p>
            )}
          </Row>
          {!loading && (
            <>
              <Row>
                {errors.map((message, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {message}
                  </p>
                ))}
              </Row>
              <Row>
                <Col s={6}>{this.handleLogin()}</Col>
                <Button onClick={() => this.setState({ login: !login })}>
                  Register
                </Button>
              </Row>
            </>
          )}
        </div>
        {loggedIn && <Redirect to="/warrior"></Redirect>}
      </div>
    );
  }
}
