import React, { useState } from "react";
import cleanDate from "../../utilities/cleanDate";

export default ({ battle, handleSelectedToDelete, removeSelectedToDelete }) => {
  const [selected, setSelected] = useState(false);
  const handleSelection = () => {
    selected
      ? removeSelectedToDelete(battle.id)
      : handleSelectedToDelete(battle.id);
  };

  const showName = name => {
    return name || "No name available";
  };
  const event = new Date(battle.date);

  return (
    <tr>
      <td
        onClick={e => {
          setSelected(!selected);
          handleSelection();
        }}
      >
        {selected ? (
          <i className="material-icons hovered">check_box</i>
        ) : (
          <i className="material-icons hovered">check_box_outline_blank</i>
        )}
      </td>
      <td>{cleanDate(event)}</td>
      {battle.playerOne ? (
        <td>{showName(battle.playerOne.name)}</td>
      ) : (
        <td>No warrior!</td>
      )}
      {battle.playerTwo ? (
        <td>{showName(battle.playerTwo.name)}</td>
      ) : (
        <td>No warrior!</td>
      )}

      <td>{battle.purse} sp</td>
    </tr>
  );
};
