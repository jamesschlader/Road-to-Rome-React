import React from "react";

export default ({ warrior }) => {
  return (
    <div className="inline-content expand-content">
      <h5>Abilities</h5>
      <table>
        <thead>
          <tr>
            <th>Strength</th>
            <th>Stamina</th>
            <th>Speed</th>
            <th>Skill</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{warrior.strength}</td>
            <td>{warrior.stamina}</td>
            <td>{warrior.speed}</td>
            <td>{warrior.skill}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
