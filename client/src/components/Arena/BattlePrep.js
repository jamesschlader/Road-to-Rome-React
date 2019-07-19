import React from "react";
import { Button } from "react-materialize";
import { Link } from "react-router-dom";

export default ({ battle, setFight, context }) => {
  return (
    <tr>
      <td>
        <Button onClick={setFight} className="inline-content">
          <i className="material-icons ">arrow_back</i>
        </Button>

        <Link
          to="/combat"
          onClick={e => context.startCombat(context.Arena, battle)}
        >
          <Button className="inline-content">
            <i className="material-icons">send</i>
          </Button>
        </Link>
        <h5 className="inline-content">
          {battle.playerOne.name} vs {battle.playerTwo.name}
        </h5>
      </td>
    </tr>
  );
};
