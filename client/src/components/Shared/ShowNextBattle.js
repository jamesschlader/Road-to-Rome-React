import React from "react";
import parseDate from "../../utilities/parseDate";

export default ({ warrior }) => {
  const today = Date.now();
  let nextBattle = [];

  if (warrior.nextScheduledBattle && warrior.nextScheduledBattle.length > 0) {
    let nearest = new Date(warrior.nextScheduledBattle[0].date).getTime();
    warrior.nextScheduledBattle.forEach(battle => {
      const time = new Date(battle.date).getTime();

      if (time - today <= nearest) {
        nearest = time;
      }
      return time;
    });

    nextBattle = warrior.nextScheduledBattle.filter(battle => {
      const time = new Date(battle.date).getTime();
      return time === nearest ? battle : null;
    });
  }

  return (
    <div className="inline-content expand-content">
      <h5>Next Battle</h5>
      {nextBattle.length > 0 ? (
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
              {nextBattle.map(battle => (
                <tr key={battle.id}>
                  <td>{parseDate(battle.date)}</td>
                  <td>{battle.Arena.name}</td>
                  <td>
                    {battle.playerOne.name === warrior.name
                      ? battle.playerTwo.name
                      : battle.playerOne.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>No upcoming battle</p>
        </div>
      )}
    </div>
  );
};
