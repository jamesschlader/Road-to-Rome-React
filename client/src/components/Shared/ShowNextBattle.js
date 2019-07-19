import React from "react";
import nextBattle from "../../utilities/nextBattle";
import parseDate from "../../utilities/parseDate";

export default ({ warrior }) => {
  return (
    <div className="inline-content expand-content">
      <h5>Next Battle</h5>

      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Arena</th>
              <th>Opponent</th>
            </tr>
          </thead>
          <tbody>
            {warrior && nextBattle(warrior.nextScheduledBattle) ? (
              <tr key={nextBattle(warrior.nextScheduledBattle).id}>
                <td>
                  {parseDate(nextBattle(warrior.nextScheduledBattle).date)}
                </td>
                <td>{nextBattle(warrior.nextScheduledBattle).Arena.name}</td>
                <td>
                  {nextBattle(warrior.nextScheduledBattle).playerOne.name ===
                  warrior.name
                    ? nextBattle(warrior.nextScheduledBattle).playerTwo.name
                    : nextBattle(warrior.nextScheduledBattle).playerOne.name}
                </td>
              </tr>
            ) : (
              <tr>
                <td>No Scheduled Battles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
