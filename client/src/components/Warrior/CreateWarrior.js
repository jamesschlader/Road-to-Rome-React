import React, { Component } from "react";
import Button from "react-materialize/lib/Button";
import { Row, Col } from "react-materialize";
import maleImages from "../../utilities/maleImages";
import femalesImages from "../../utilities/femaleImages";
import { Mutation } from "react-apollo";
import d6 from "../../utilities/d6";

import { addWarriorMutation } from "../../api/Warrior/mutations/addWarrior";

class CreateWarrior extends Component {
  state = {
    male: true,
    position: 0,
    valid: false,
    roll: true,
    DropDownSelect: false
  };

  componentDidMount() {
    this.setState({
      Arena: this.props.Arenas.filter(arena => {
        return arena.name === "Carthago";
      })[0]
    });
  }

  handleChange = async e => {
    e.preventDefault();
    let { name, value, alt } = e.target;
    console.log(`name = ${name}, value = ${value}`);
    if (alt) {
      await this.setState({
        image: alt
      });
    } else {
      await this.setState({
        [name]: value,
        wallet: name === "skill" ? value * 6 : this.state.skill * 6
      });
    }

    this.validateData();
  };

  rollWallet = async value => {
    await this.setState({
      wallet: value
    });
    this.validateData();
  };

  handleToggle = async e => {
    e.preventDefault();
    let { name } = e.target;
    await this.setState({
      [name]: !this.state[name],
      image: "",
      wallet: name === "roll" && this.state.roll ? 0 : this.state.wallet
    });
    this.validateData();
  };

  handleBalance = e => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "strength" || name === "stamina") {
      const second = name === "strength" ? "stamina" : "strength";
      const balance = 26;
      this.setState({
        [name]: value,
        [second]: balance - value >= 18 ? 18 : balance - value
      });
    } else {
      const second = name === "speed" ? "skill" : "speed";
      const balance = 6;

      this.setState({
        [name]: value,
        [second]: balance - value
      });
      const walletValue = name === "skill" ? value * 6 : (balance - value) * 6;
      this.setState({
        wallet: walletValue
      });
    }
  };

  displayPics = () => {
    const primary = "green";
    const clear = "rgba(0,0,0,0)";
    return this.state.male
      ? maleImages.map((image, index) => (
          <div
            key={index}
            className="layout-img-box"
            onClick={this.handleChange}
            style={{
              transform: `translateX(${this.state.position * 10}vw)`,
              background: `${this.state.image === image ? primary : clear}`
            }}
          >
            <img src={image} alt={image} className="slide-img" />
          </div>
        ))
      : femalesImages.map((image, index) => (
          <div
            key={index}
            className="layout-img-box"
            onClick={this.handleChange}
            style={{
              transform: `translateX(${this.state.position * 10}vw)`,
              background: `${this.state.image === image ? primary : clear}`
            }}
          >
            <img src={image} alt={image} className="slide-img" />
          </div>
        ));
  };

  injectSex = () => {
    return <span>, {this.state.male ? `man` : `woman`} of awesome power</span>;
  };

  validateData = () => {
    const data = {
      name: this.state.name,
      image: this.state.image,
      strength: parseInt(this.state.strength),
      stamina: parseInt(this.state.stamina),
      speed: parseInt(this.state.speed),
      skill: parseInt(this.state.skill),
      wallet: parseInt(this.state.wallet)
    };

    const result = Object.values(data).filter(item => {
      return !item;
    });

    if (result.length > 0) {
      this.setState({
        valid: false
      });
    } else {
      this.setState({
        valid: true
      });
    }
  };

  createWarrior = () => {
    const {
      name,
      male,
      image,
      strength,
      stamina,
      speed,
      skill,
      wallet,
      Arena
    } = this.state;
    const obj = {
      name,
      male,
      image,
      strength: parseInt(strength),
      stamina: parseInt(stamina),
      speed: parseInt(speed),
      skill: parseInt(skill),
      wallet: parseInt(wallet),
      ArenaId: Arena.id,
      living: true
    };
    console.log(obj);
    return (
      <Mutation
        mutation={addWarriorMutation}
        variables={{
          ...obj
        }}
      >
        {postMutation => (
          <Button
            className="btn"
            onClick={e => {
              postMutation();
              this.props.handleQuit(e);
            }}
            style={{ background: "green" }}
          >
            Save
          </Button>
        )}
      </Mutation>
    );
  };

  handleArena = arena => {
    this.setState({ Arena: arena });
  };

  render() {
    const { handleQuit, Arenas } = this.props;
    const displayArenaOptions = Arenas.map(arena => (
      <li
        key={arena.id}
        style={{ listStyle: "none", cursor: "pointer", margin: "0 1em" }}
        onClick={() => this.handleArena(arena)}
      >
        {arena.name}
      </li>
    ));
    return (
      <div>
        <h3>Make a warrior </h3>
        <form>
          <Row>
            <input
              type="text"
              className="col s5"
              id="name-field"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <Col s={5}>
              <Button
                name="male"
                value={true}
                onClick={this.handleToggle}
                style={{ background: this.state.male && "green" }}
              >
                Male
              </Button>
              <Button
                name="male"
                value={false}
                onClick={this.handleToggle}
                style={{ background: !this.state.male && "green" }}
              >
                Female
              </Button>
            </Col>
          </Row>

          <Row style={{ overflow: "hidden" }}>
            <div style={{ width: "400vw" }}>{this.displayPics()}</div>
          </Row>

          <p>
            Images
            <input
              className="range-field"
              type="range"
              name="position"
              min="-23"
              max="3"
              value={this.state.position}
              onChange={this.handleChange}
            />
          </p>

          <Row>
            <p>Abilities</p>
            <Col s={5}>
              <Button
                name="roll"
                value={true}
                onClick={this.handleToggle}
                style={{ background: this.state.roll && "green" }}
              >
                Roll your stats
              </Button>
            </Col>
            <Col s={5}>
              <Button
                name="roll"
                value={false}
                onClick={this.handleToggle}
                style={{ background: !this.state.roll && "green" }}
              >
                Balance
              </Button>
            </Col>
          </Row>

          <Row>
            <Col s={5}>
              <p>
                Strength: <span> {this.state.strength} </span>
              </p>

              {this.state.roll && !this.state.strength && (
                <Button
                  name="strength"
                  value={this.state.male ? d6(3) + 2 : d6(3)}
                  onClick={this.handleChange}
                >
                  Roll it
                </Button>
              )}
              {!this.state.roll && (
                <input
                  className="range-field"
                  type="range"
                  name="strength"
                  min="3"
                  max="20"
                  value={this.state.strength}
                  onChange={this.handleBalance}
                />
              )}
            </Col>
            <Col s={5}>
              <p>
                Stamina: <span>{this.state.stamina}</span>
              </p>
              {this.state.roll && !this.state.stamina && (
                <Button
                  name="stamina"
                  value={d6(3) + 2}
                  onClick={this.handleChange}
                >
                  Roll it
                </Button>
              )}
              {!this.state.roll && (
                <input
                  className="range-field"
                  type="range"
                  name="stamina"
                  min="3"
                  max="20"
                  value={this.state.stamina}
                  onChange={this.handleBalance}
                />
              )}
            </Col>
          </Row>

          <Row>
            <Col s={5}>
              <p>
                Speed: <span>{this.state.speed}</span>{" "}
              </p>

              {this.state.roll && !this.state.speed && (
                <Button name="speed" value={d6()} onClick={this.handleChange}>
                  Roll it
                </Button>
              )}
              {!this.state.roll && (
                <input
                  className="range-field"
                  type="range"
                  name="speed"
                  min="1"
                  max="5"
                  value={this.state.speed}
                  onChange={this.handleBalance}
                />
              )}
            </Col>
            <Col s={5}>
              <p>
                Skill: <span>{this.state.skill}</span>{" "}
              </p>

              {this.state.roll && !this.state.skill && (
                <Button name="skill" value={d6()} onClick={this.handleChange}>
                  Roll it
                </Button>
              )}
              {!this.state.roll && (
                <input
                  className="range-field"
                  type="range"
                  name="skill"
                  min="1"
                  max="5"
                  value={this.state.skill}
                  onChange={this.handleBalance}
                />
              )}
            </Col>
          </Row>
          <Row>
            <p>
              Wallet:{" "}
              <span>
                {this.state.wallet
                  ? `${this.state.wallet}`
                  : "Roll or select a Skill rating"}
              </span>{" "}
            </p>

            {this.state.roll && !this.state.wallet && (
              <Button name="wallet" onClick={() => this.rollWallet(d6(5))}>
                Roll it
              </Button>
            )}
          </Row>
        </form>
        {this.state.image && this.state.name && (
          <Row>
            <p>
              Name: {this.state.name}
              {this.injectSex()}
            </p>
            <img
              src={this.state.image}
              alt={this.state.image}
              className="layout-img"
            />
          </Row>
        )}

        {this.state.valid && this.state.Arena && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <ul>
              <li>Choose an Arena to start</li>
              {displayArenaOptions}
            </ul>
            <p style={{ margin: "0 2em" }}>{this.state.Arena.name}</p>
          </div>
        )}

        <Row style={{ borderTop: "1px solid black", margin: "2em 0" }}>
          {this.state.valid && (
            <Col s={6} style={{ marginTop: "2em" }}>
              {this.createWarrior()}
            </Col>
          )}

          <Col s={6}>
            <Button
              className="btn"
              onClick={handleQuit}
              style={{ marginTop: "2em" }}
            >
              Nevermind
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateWarrior;
