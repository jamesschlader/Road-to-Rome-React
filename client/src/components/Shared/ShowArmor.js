import React from "react";

export default ({ warrior }) => {
  return (
    <div className="inline-content expand-content">
      <h5>Armor</h5>
      {warrior.armorList ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Size</th>
              <th>Strength</th>
              <th>Shield?</th>
            </tr>
          </thead>
          <tbody>
            {warrior.armorList.map((armor, index) => (
              <tr key={armor.id + index}>
                <td>{armor.name}</td>
                <td>{armor.weight}</td>
                <td>{armor.size}</td>
                <td>{armor.strength}</td>
                <td>
                  {armor.shield ? (
                    <i className="material-icons">check</i>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No armor to display</p>
      )}
    </div>
  );
};
