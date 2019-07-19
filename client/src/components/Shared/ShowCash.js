import React from "react";

export default ({ warrior, MONEY_CONVERTER }) => {
  return (
    <div className="inline-content">
      <h5>Available Cash</h5>
      <p>{warrior.wallet * MONEY_CONVERTER} sp</p>
    </div>
  );
};
