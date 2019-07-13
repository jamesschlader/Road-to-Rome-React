import React, { Fragment } from "react";
import parseDate from "../../utilities/parseDate";

export default function ScrollingBattles({ battle }) {
  const { playerOne, playerTwo, date, id, purse } = battle;

  return (
    <Fragment>
      <li key={id} className="inline-content">
        <p>
          <span>{parseDate(date)} </span>
          <span>{playerOne.name} </span> vs <span>{playerTwo.name}</span> for{" "}
          <span>{purse}</span> sp
        </p>
      </li>
    </Fragment>
  );
}
