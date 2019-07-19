import React from "react";

export default ({ warrior, MONEY_CONVERTER }) => {
  return (
    <div className="inline-content ">
      <h5>Total Winnings</h5>
      {warrior.winnings ? (
        <p>{warrior.winnings * MONEY_CONVERTER}</p>
      ) : (
        <p>No battles won</p>
      )}
    </div>
  );
};
