import React from "react";

export default ({ vitals, player, round }) => {
  console.log(round);

  const recovery = Math.floor((player.stamina - 10) / 2) + 1;
  const currentSpeed =
    player.speed > vitals.stamina ? vitals.stamina : player.speed;
  const harm = vitals.fatigue + vitals.wounds;

  const calcDanger = () => {
    if (harm > player.stamina) {
      return "#ccc";
    } else if (harm > vitals.stamina + recovery) {
      return "#b71c1c";
    } else {
      return "green";
    }
  };
  return (
    <div className="inline-content" style={{ margin: "auto" }}>
      <table>
        <tr>
          <th>Stamina</th>
          <td>{vitals.stamina}</td>
        </tr>
        <tr>
          <th>Recovery</th>
          <td>{recovery}</td>
        </tr>
        <tr>
          <th style={{ color: calcDanger() }}>Speed</th>
          <td>{currentSpeed}</td>
        </tr>
        <tr>
          <th
            style={{
              color: calcDanger()
            }}
          >
            Net Fatigue
          </th>
          <td>
            {vitals.fatigue - round * recovery > 0
              ? vitals.fatigue - round * recovery
              : 0}
          </td>
        </tr>
        <tr>
          <th
            style={{
              color: calcDanger()
            }}
          >
            Wounds
          </th>
          <td>{vitals.wounds}</td>
        </tr>
      </table>
    </div>
  );
};
