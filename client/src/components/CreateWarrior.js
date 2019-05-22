import React, { Component } from "react";
import Button from "react-materialize/lib/Button";
import { Row, Col } from "react-materialize";
import maleImages from "../utilities/maleImages";
import femalesImages from "../utilities/femaleImages";

export default class CreateWarrior extends Component {
  state = {
    male: true,
    position: -10,
    strength: 10,
    stamina: 10,
    speed: 5,
    skill: 2
  };
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSex = e => {
    e.preventDefault();
    let { name } = e.target;
    this.setState({
      [name]: !this.state.male
    });
  };

  movePic = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleImagePick = e => {
    e.preventDefault();

    this.setState({
      image: e.target.alt
    });
  };

  displayPics = () => {
    const primary = "#b71c1c";
    return this.state.male
      ? maleImages.map((image, index) => (
          <div
            key={index}
            className="layout-img-box"
            onClick={this.handleImagePick}
            style={{
              transform: `translateX(${this.state.position * 10}vw)`,
              background: `${this.state.image === image ? primary : "green"}`
            }}
          >
            <img src={image} alt={image} className="layout-img" />
          </div>
        ))
      : femalesImages.map((image, index) => (
          <div
            key={index}
            className="layout-img-box"
            onClick={this.handleImagePick}
            style={{
              transform: `translateX(${this.state.position * 10}vw)`,
              background: `${this.state.image === image ? primary : "green"}`
            }}
          >
            <img src={image} alt={image} className="layout-img" />
          </div>
        ));
  };

  handleAbility = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleStatMethod = e => {
    e.preventDefault();
    const { name } = e.target;
    this.setState({
      [name]: !this.state.roll
    });
  };

  injectSex = () => {
    return <span>, {this.state.male ? `man` : `woman`} of awesome power</span>;
  };

  createWarrior = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      male: this.state.male,
      image: this.state.image,
      strength: this.state.strength,
      stamina: this.state.stamina,
      speed: this.state.speed,
      skill: this.state.skill
    };
    console.log(data);
    this.props.createWarrior(data);
  };

  render() {
    return (
      <div>
        <h3>Start making your warrior </h3>
        <form>
          <div className="row">
            <input
              className="col s5"
              id="name-field"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <div className="col s5 offset-s1">
              <Button
                name="male"
                value={true}
                onClick={this.handleSex}
                style={{ background: this.state.male ? "green" : null }}
              >
                Male
              </Button>
              <Button
                name="male"
                value={false}
                onClick={this.handleSex}
                style={{ background: !this.state.male ? "green" : null }}
              >
                Female
              </Button>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ width: "400vw" }}>{this.displayPics()}</div>
          </div>

          <p>
            Images
            <input
              className="range-field"
              type="range"
              name="position"
              min="-23"
              max="3"
              value={this.state.position}
              onChange={this.movePic}
            />
          </p>

          <Row>
            <p>Abilities</p>
            <Col s={5}>
              <Button
                name="roll"
                value={true}
                onClick={this.handleStatMethod}
                style={{ background: this.state.roll ? "green" : null }}
              >
                Roll your stats
              </Button>
            </Col>
            <Col s={5}>
              <Button
                name="roll"
                value={false}
                onClick={this.handleStatMethod}
                style={{ background: !this.state.roll ? "green" : null }}
              >
                Balance
              </Button>
            </Col>
          </Row>
          <div className="row">
            <div className="col s5">
              <p>
                Strength: <span> {this.state.strength}</span>
                <input
                  className="range-field"
                  type="range"
                  name="strength"
                  min="3"
                  max="18"
                  value={this.state.strength}
                  onChange={this.handleAbility}
                />
              </p>
            </div>
            <div className="col s5">
              <p>
                Stamina: <span>{this.state.stamina}</span>
                <input
                  className="range-field"
                  type="range"
                  name="stamina"
                  min="3"
                  max="18"
                  value={this.state.stamina}
                  onChange={this.handleAbility}
                />
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col s5">
              <p>
                Speed: <span>{this.state.speed}</span>
                <input
                  className="range-field"
                  type="range"
                  name="speed"
                  min="1"
                  max="8"
                  value={this.state.speed}
                  onChange={this.handleAbility}
                />
              </p>
            </div>
            <div className="col s5">
              <p>
                Skill: <span>{this.state.skill}</span>
                <input
                  className="range-field"
                  type="range"
                  name="skill"
                  min="1"
                  max="5"
                  value={this.state.skill}
                  onChange={this.handleAbility}
                />
              </p>
            </div>
          </div>
        </form>

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

        <Row>
          <Col s={6}>
            <Button
              className="btn"
              onClick={this.createWarrior}
              style={{ background: "green" }}
            >
              Save
            </Button>
          </Col>
          <Col s={6}>
            <Button className="btn" onClick={this.props.handleClick}>
              Nevermind
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
