import React, { Component } from "react";

import WarriorDetails from "../Shared/WarriorDetails";

export default class WarriorInArena extends Component {
  componentDidMount() {
    this.props.setWarrior(this.props.warrior);
  }
  render() {
    const { warrior, MONEY_CONVERTER } = this.props;

    return (
      <React.Fragment>
        <WarriorDetails warrior={warrior} MONEY_CONVERTER={MONEY_CONVERTER} />
      </React.Fragment>
    );
  }
}
