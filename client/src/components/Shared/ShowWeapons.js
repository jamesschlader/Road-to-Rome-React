import React from "react";

export default ({ warrior }) => {
  return (
    <div className="inline-content expand-content">
      <h5>Weapons</h5>
      {warrior.armorList ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Size</th>
              <th>Damage</th>
            </tr>
          </thead>
          <tbody>
            {warrior.weaponList.map((weapon, index) => (
              <tr key={weapon.id + index}>
                <td>{weapon.name}</td>
                <td>{weapon.weight}</td>
                <td>{weapon.size}</td>
                <td>{weapon.damage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No weapons to display</p>
      )}
    </div>
  );
};
