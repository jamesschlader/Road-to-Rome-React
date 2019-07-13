import React from "react";

export default ({ battle }) => {
  const showName = name => {
    return name || "No name available";
  };
  const event = new Date(battle.date);

  return (
    <tr>
      <td>{event.toDateString()}</td>
      <td>{showName(battle.playerOne.name)}</td>
      <td>{showName(battle.playerTwo.name)}</td>
      <td>{battle.purse} sp</td>
    </tr>
  );
};
